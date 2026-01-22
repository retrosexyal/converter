import { NextResponse } from "next/server";
import sharp from "sharp";
import convert from "@qs-coder/heic-convert";
import { PDFDocument } from "pdf-lib";

/* toDo сделать массовую конвертацию */

export const runtime = "nodejs";

const ALLOWED_OUT = new Set([
  "webp",
  "jpeg",
  "png",
  "avif",
  "tiff",
  "gif",
  "ico",
  "pdf",
]);
const ALLOWED_IN_MIME = new Set([
  "image/webp",
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/heic",
  "image/heif",
  "image/tiff",
  "image/gif",
  "image/bmp",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);

function safeExt(format: string) {
  if (format === "jpeg") return "jpg";
  return format;
}

const ALLOWED_IN_EXT = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "avif",
  "heic",
  "heif",
  "tif",
  "tiff",
  "gif",
  "ico",
]);

function getExt(name: string) {
  const i = name.lastIndexOf(".");
  return i !== -1 ? name.slice(i + 1).toLowerCase() : "";
}

export async function heicToPng(input: Buffer): Promise<Buffer> {
  return convert({
    buffer: input,
    format: "PNG",
    quality: 1,
  });
}

/** HEIC → JPEG */
export async function heicToJpeg(input: Buffer): Promise<Buffer> {
  return convert({
    buffer: input,
    format: "JPEG",
    quality: 0.95,
  });
}

export async function heicToPdf(input: Buffer): Promise<Buffer> {
  const png = await heicToPng(input);

  const pdf = await PDFDocument.create();
  const page = pdf.addPage();

  const img = await pdf.embedPng(png);
  const { width, height } = img.scale(1);

  page.setSize(width, height);
  page.drawImage(img, { x: 0, y: 0, width, height });

  return Buffer.from(await pdf.save());
}

export async function heicToWebp(input: Buffer): Promise<Buffer> {
  const png = await heicToPng(input);

  return sharp(png).webp({ quality: 85 }).toBuffer();
}

export async function heicToAvif(input: Buffer): Promise<Buffer> {
  const png = await heicToPng(input);
  return sharp(png).avif({ quality: 50 }).toBuffer();
}

/** 5️⃣ HEIC → TIFF */
export async function heicToTiff(input: Buffer): Promise<Buffer> {
  const png = await heicToPng(input);
  return sharp(png).tiff({ compression: "lzw" }).toBuffer();
}

/** 6️⃣ HEIC → GIF (static, first frame) */
export async function heicToGif(input: Buffer): Promise<Buffer> {
  const png = await heicToPng(input);
  return sharp(png).gif().toBuffer();
}

export async function heicToIco(input: Buffer): Promise<Buffer> {
  const png = await heicToPng(input);

  // favicon best practice: 32x32
  return sharp(png)
    .resize(32, 32, { fit: "contain", background: "#0000" })
    .toFormat("png")
    .toBuffer();
}

async function imageToPdf(input: Buffer): Promise<Buffer> {
  const meta = await sharp(input).metadata();
  const png = await sharp(input).png().toBuffer();

  const pdf = await PDFDocument.create();
  const page = pdf.addPage();

  const img = await pdf.embedPng(png);

  const w = meta.width || img.width;
  const h = meta.height || img.height;

  page.setSize(w, h);
  page.drawImage(img, { x: 0, y: 0, width: w, height: h });

  return Buffer.from(await pdf.save());
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const format = String(formData.get("format") || "").toLowerCase();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fail not found" }, { status: 400 });
  }
  if (!ALLOWED_OUT.has(format)) {
    return NextResponse.json({ error: "Wrong format" }, { status: 400 });
  }
  const mime = (file.type || "").toLowerCase();
  const ext = getExt(file.name);

  const mimeOk =
    ALLOWED_IN_MIME.has(mime) ||
    mime === "" ||
    mime === "application/octet-stream";

  const extOk = ALLOWED_IN_EXT.has(ext);

  if (!mimeOk || !extOk) {
    return NextResponse.json({ error: "Wrong type" }, { status: 400 });
  }

  const input = Buffer.from(await file.arrayBuffer());

  const isHeic = ext === "heic" || ext === "heif";

  if (isHeic) {
    let out: Buffer;
    let contentType = "";

    switch (format) {
      case "png":
        out = await heicToPng(input);
        contentType = "image/png";
        break;
      case "jpeg":
        out = await heicToJpeg(input);
        contentType = "image/jpeg";
        break;
      case "webp":
        out = await heicToWebp(input);
        contentType = "image/webp";
        break;
      case "avif":
        out = await heicToAvif(input);
        contentType = "image/avif";
        break;
      case "tiff":
        out = await heicToTiff(input);
        contentType = "image/tiff";
        break;
      case "gif":
        out = await heicToGif(input);
        contentType = "image/gif";
        break;
      case "pdf":
        out = await heicToPdf(input);
        contentType = "application/pdf";
        break;
      case "ico":
        out = await heicToIco(input);
        contentType = "image/png";
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported output format for HEIC" },
          { status: 400 },
        );
    }

    return new NextResponse(new Uint8Array(out), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=converted.${format === "jpeg" ? "jpg" : format}`,
        "Cache-Control": "no-store",
      },
    });
  }

  try {
    await sharp(input).metadata();
  } catch {
    return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
  }

  const MAX_MB = 5;
  if (input.length > MAX_MB * 1024 * 1024) {
    return NextResponse.json(
      { error: `Слишком большой файл (>${MAX_MB}MB)` },
      { status: 413 },
    );
  }

  let img = sharp(input, { failOn: "none", animated: false });

  if (format === "webp") img = img.webp({ quality: 85 });
  if (format === "jpeg") img = img.jpeg({ quality: 85, mozjpeg: true });
  if (format === "png") img = img.png({ compressionLevel: 9 });
  if (format === "avif") {
    img = img.avif({
      quality: 50, // sweet spot
      effort: 4, // баланс CPU / size
    });
  }
  if (format === "pdf") {
    const pdf = await imageToPdf(input);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=converted.pdf",
        "Cache-Control": "no-store",
      },
    });
  }

  if (format === "tiff") {
    img = img.tiff({
      compression: "lzw",
    });
  }

  if (format === "gif") {
    img = img.gif(); // статичный GIF
  }

  if (format === "ico") {
    img = img
      .resize(64, 64, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png();
  }

  const out = await img.toBuffer();

  const notIconFormat =
    format === "pdf" ? "application/pdf" : `image/${format}`;

  const contentType = format === "ico" ? "image/x-icon" : notIconFormat;

  return new NextResponse(new Uint8Array(out), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename=converted.${safeExt(format)}`,
      "Cache-Control": "no-store",
    },
  });
}
