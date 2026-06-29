import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import {
  ALLOWED_OUT,
  ALLOWED_OUT_FORMAT,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "@/constants";

export type OutFormat = (typeof ALLOWED_OUT_FORMAT)[number];

type DecodedImage = {
  source: CanvasImageSource;
  width: number;
  height: number;
  close?: () => void;
};

type ConversionResult = {
  blob: Blob;
  name: string;
};

export type ConversionOptions = {
  quality?: number;
  backgroundColor?: string;
};

const MIME_BY_FORMAT: Record<OutFormat, string> = {
  webp: "image/webp",
  jpeg: "image/jpeg",
  png: "image/png",
  avif: "image/avif",
  tiff: "image/tiff",
  gif: "image/gif",
  ico: "image/x-icon",
  pdf: "application/pdf",
};

export function safeExt(format: string) {
  return format === "jpeg" ? "jpg" : format;
}

function getBaseName(name: string) {
  return name.replace(/\.[^/.]+$/, "") || "converted";
}

function isFormat(value: string): value is OutFormat {
  return ALLOWED_OUT.has(value);
}

function browserDecodeError(file: File) {
  const ext = file.name.split(".").pop()?.toUpperCase() || "этот формат";
  return new Error(
    `Браузер не смог прочитать ${ext}. PNG, JPEG, WebP, AVIF, GIF, BMP и ICO зависят от поддержки браузера; HEIC/HEIF и TIFF часто не декодируются без серверной или WASM-библиотеки.`,
  );
}

async function decodeImage(file: File): Promise<DecodedImage> {
  if ("createImageBitmap" in window) {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });

      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close(),
      };
    } catch {
      // Fallback ниже иногда помогает Safari/старым браузерам.
    }
  }

  const url = URL.createObjectURL(file);

  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;

    await img.decode();

    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      close: () => URL.revokeObjectURL(url),
    };
  } catch {
    URL.revokeObjectURL(url);
    throw browserDecodeError(file);
  }
}

function canvasFromImage(decoded: DecodedImage, background?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = decoded.width;
  canvas.height = decoded.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas недоступен в этом браузере");

  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(decoded.source, 0, 0, canvas.width, canvas.height);
  decoded.close?.();

  return canvas;
}

function getCanvasImageData(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas недоступен в этом браузере");
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}


function blobFromBytes(bytes: Uint8Array, type: string) {
  const arrayBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(arrayBuffer).set(bytes);
  return new Blob([arrayBuffer], { type });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(`Браузер не смог создать файл ${type}`));
          return;
        }

        if (blob.type !== type) {
          reject(
            new Error(
              `Браузер не поддерживает экспорт в ${type}. Попробуйте PNG, JPEG или WebP.`,
            ),
          );
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function canvasToPdf(canvas: HTMLCanvasElement) {
  const png = await canvasToBlob(canvas, "image/png");
  const pdf = await PDFDocument.create();
  const embedded = await pdf.embedPng(await png.arrayBuffer());
  const page = pdf.addPage([canvas.width, canvas.height]);

  page.drawImage(embedded, {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  });

  const bytes = await pdf.save();
  return blobFromBytes(bytes, "application/pdf");
}

function writeAscii(bytes: number[], value: string) {
  for (let i = 0; i < value.length; i += 1) bytes.push(value.charCodeAt(i));
}

function writeUint16LE(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value, true);
}

function writeUint32LE(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value, true);
}

function imageDataToTiff(imageData: ImageData) {
  const { width, height, data } = imageData;
  const entries = 10;
  const ifdOffset = 8;
  const ifdSize = 2 + entries * 12 + 4;
  const bitsPerSampleOffset = ifdOffset + ifdSize;
  const pixelOffset = bitsPerSampleOffset + 6;
  const pixelByteCount = width * height * 3;
  const buffer = new ArrayBuffer(pixelOffset + pixelByteCount);
  const view = new DataView(buffer);

  view.setUint8(0, 0x49);
  view.setUint8(1, 0x49);
  writeUint16LE(view, 2, 42);
  writeUint32LE(view, 4, ifdOffset);
  writeUint16LE(view, ifdOffset, entries);

  let entryOffset = ifdOffset + 2;

  function writeEntry(tag: number, type: number, count: number, value: number) {
    writeUint16LE(view, entryOffset, tag);
    writeUint16LE(view, entryOffset + 2, type);
    writeUint32LE(view, entryOffset + 4, count);

    if (type === 3 && count === 1) {
      writeUint16LE(view, entryOffset + 8, value);
      writeUint16LE(view, entryOffset + 10, 0);
    } else {
      writeUint32LE(view, entryOffset + 8, value);
    }

    entryOffset += 12;
  }

  writeEntry(256, 4, 1, width); // ImageWidth
  writeEntry(257, 4, 1, height); // ImageLength
  writeEntry(258, 3, 3, bitsPerSampleOffset); // BitsPerSample
  writeEntry(259, 3, 1, 1); // Compression: none
  writeEntry(262, 3, 1, 2); // PhotometricInterpretation: RGB
  writeEntry(273, 4, 1, pixelOffset); // StripOffsets
  writeEntry(277, 3, 1, 3); // SamplesPerPixel
  writeEntry(278, 4, 1, height); // RowsPerStrip
  writeEntry(279, 4, 1, pixelByteCount); // StripByteCounts
  writeEntry(284, 3, 1, 1); // PlanarConfiguration

  writeUint32LE(view, entryOffset, 0); // next IFD
  writeUint16LE(view, bitsPerSampleOffset, 8);
  writeUint16LE(view, bitsPerSampleOffset + 2, 8);
  writeUint16LE(view, bitsPerSampleOffset + 4, 8);

  const pixels = new Uint8Array(buffer, pixelOffset);
  let p = 0;

  for (let i = 0; i < data.length; i += 4) {
    pixels[p] = data[i];
    pixels[p + 1] = data[i + 1];
    pixels[p + 2] = data[i + 2];
    p += 3;
  }

  return new Blob([buffer], { type: "image/tiff" });
}

function quantize332(data: Uint8ClampedArray) {
  const indices = new Uint8Array(data.length / 4);

  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    const alpha = data[i + 3] / 255;
    const r = Math.round(data[i] * alpha + 255 * (1 - alpha));
    const g = Math.round(data[i + 1] * alpha + 255 * (1 - alpha));
    const b = Math.round(data[i + 2] * alpha + 255 * (1 - alpha));

    indices[p] = ((r >> 5) << 5) | ((g >> 5) << 2) | (b >> 6);
  }

  return indices;
}

function buildGifPalette() {
  const palette = new Uint8Array(256 * 3);

  for (let i = 0; i < 256; i += 1) {
    palette[i * 3] = Math.round((((i >> 5) & 7) * 255) / 7);
    palette[i * 3 + 1] = Math.round((((i >> 2) & 7) * 255) / 7);
    palette[i * 3 + 2] = Math.round(((i & 3) * 255) / 3);
  }

  return palette;
}

function lzwEncode(indices: Uint8Array) {
  const minCodeSize = 8;
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  const bytes: number[] = [];
  let codeSize = minCodeSize + 1;
  let nextCode = endCode + 1;
  let bitBuffer = 0;
  let bitCount = 0;
  let dictionary = new Map<string, number>();

  function resetDictionary() {
    dictionary = new Map<string, number>();
    codeSize = minCodeSize + 1;
    nextCode = endCode + 1;
  }

  function writeCode(code: number) {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;

    while (bitCount >= 8) {
      bytes.push(bitBuffer & 0xff);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  }

  function getCode(sequence: string) {
    if (!sequence.includes(",")) return Number(sequence);
    return dictionary.get(sequence) ?? 0;
  }

  resetDictionary();
  writeCode(clearCode);

  if (!indices.length) {
    writeCode(endCode);
    return bytes;
  }

  let prefix = String(indices[0]);

  for (let i = 1; i < indices.length; i += 1) {
    const k = indices[i];
    const next = `${prefix},${k}`;

    if (dictionary.has(next)) {
      prefix = next;
      continue;
    }

    writeCode(getCode(prefix));

    if (nextCode < 4096) {
      dictionary.set(next, nextCode);
      nextCode += 1;

      if (nextCode === 1 << codeSize && codeSize < 12) {
        codeSize += 1;
      }
    } else {
      writeCode(clearCode);
      resetDictionary();
    }

    prefix = String(k);
  }

  writeCode(getCode(prefix));
  writeCode(endCode);

  if (bitCount > 0) bytes.push(bitBuffer & 0xff);

  return bytes;
}

function imageDataToGif(imageData: ImageData) {
  const { width, height, data } = imageData;
  const indices = quantize332(data);
  const palette = buildGifPalette();
  const lzw = lzwEncode(indices);
  const bytes: number[] = [];

  writeAscii(bytes, "GIF89a");
  bytes.push(width & 0xff, (width >> 8) & 0xff);
  bytes.push(height & 0xff, (height >> 8) & 0xff);
  bytes.push(0xf7, 0x00, 0x00); // global 256-color table
  bytes.push(...palette);
  bytes.push(0x2c, 0x00, 0x00, 0x00, 0x00);
  bytes.push(width & 0xff, (width >> 8) & 0xff);
  bytes.push(height & 0xff, (height >> 8) & 0xff);
  bytes.push(0x00, 0x08); // no local palette, LZW minimum code size

  for (let i = 0; i < lzw.length; i += 255) {
    const chunk = lzw.slice(i, i + 255);
    bytes.push(chunk.length, ...chunk);
  }

  bytes.push(0x00, 0x3b);

  return blobFromBytes(new Uint8Array(bytes), "image/gif");
}

async function canvasToIco(source: HTMLCanvasElement) {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas недоступен в этом браузере");

  const scale = Math.min(size / source.width, size / source.height);
  const width = Math.round(source.width * scale);
  const height = Math.round(source.height * scale);
  const x = Math.round((size - width) / 2);
  const y = Math.round((size - height) / 2);

  ctx.drawImage(source, x, y, width, height);

  const png = await canvasToBlob(canvas, "image/png");
  const pngBytes = new Uint8Array(await png.arrayBuffer());
  const headerSize = 6 + 16;
  const ico = new Uint8Array(headerSize + pngBytes.length);
  const view = new DataView(ico.buffer);

  writeUint16LE(view, 0, 0); // reserved
  writeUint16LE(view, 2, 1); // icon
  writeUint16LE(view, 4, 1); // images count

  ico[6] = size;
  ico[7] = size;
  ico[8] = 0;
  ico[9] = 0;
  writeUint16LE(view, 10, 1);
  writeUint16LE(view, 12, 32);
  writeUint32LE(view, 14, pngBytes.length);
  writeUint32LE(view, 18, headerSize);
  ico.set(pngBytes, headerSize);

  return blobFromBytes(ico, "image/x-icon");
}

function normalizeQuality(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.min(1, Math.max(0.1, value));
}

async function convertOne(
  file: File,
  format: OutFormat,
  options: ConversionOptions = {},
): Promise<ConversionResult> {
  const flatten = format === "jpeg" || format === "gif" || format === "tiff";
  const decoded = await decodeImage(file);
  const canvas = canvasFromImage(
    decoded,
    flatten ? options.backgroundColor || "#ffffff" : undefined,
  );
  let blob: Blob;

  if (format === "png") {
    blob = await canvasToBlob(canvas, "image/png");
  } else if (format === "jpeg") {
    blob = await canvasToBlob(
      canvas,
      "image/jpeg",
      normalizeQuality(options.quality, 0.92),
    );
  } else if (format === "webp") {
    blob = await canvasToBlob(
      canvas,
      "image/webp",
      normalizeQuality(options.quality, 0.85),
    );
  } else if (format === "avif") {
    blob = await canvasToBlob(
      canvas,
      "image/avif",
      normalizeQuality(options.quality, 0.8),
    );
  } else if (format === "pdf") {
    blob = await canvasToPdf(canvas);
  } else if (format === "ico") {
    blob = await canvasToIco(canvas);
  } else if (format === "tiff") {
    blob = imageDataToTiff(getCanvasImageData(canvas));
  } else if (format === "gif") {
    blob = imageDataToGif(getCanvasImageData(canvas));
  } else {
    throw new Error("Неподдерживаемый формат");
  }

  return {
    blob,
    name: `${getBaseName(file.name)}.${safeExt(format)}`,
  };
}

export async function convertFilesInBrowser(
  files: File[],
  rawFormat: string,
  options: ConversionOptions = {},
): Promise<ConversionResult> {
  const format = rawFormat.toLowerCase();

  if (!isFormat(format)) throw new Error("Неверный выходной формат");
  if (!files.length) throw new Error("Файлы не выбраны");
  if (files.length > MAX_FILES) {
    throw new Error(`Можно загрузить не больше ${MAX_FILES} файлов`);
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error(`Файл ${file.name} больше ${MAX_FILE_SIZE_MB} MB`);
    }
  }

  if (files.length === 1) return convertOne(files[0], format, options);

  const zip = new JSZip();

  for (const file of files) {
    const converted = await convertOne(file, format, options);
    zip.file(converted.name, converted.blob);
  }

  return {
    blob: await zip.generateAsync({ type: "blob" }),
    name: "converted-images.zip",
  };
}

export { MIME_BY_FORMAT };
