import { NextResponse } from "next/server";
import sharp from "sharp";
import convert from "@qs-coder/heic-convert";
import { PDFDocument } from "pdf-lib";
import {
  ALLOWED_IN_EXT,
  ALLOWED_IN_MIME,
  ALLOWED_OUT,
  MAX_FILE_SIZE_MB,
} from "@/constants";
import JSZip from "jszip";

export const runtime = "nodejs";

/* helpers */

function safeExt(format: string) {
  return format === "jpeg" ? "jpg" : format;
}

function getExt(name: string) {
  const i = name.lastIndexOf(".");
  return i !== -1 ? name.slice(i + 1).toLowerCase() : "";
}

/* HEIC converters */

export async function heicToPng(input: Buffer) {
  return convert({ buffer: input, format: "PNG", quality: 1 });
}

export async function heicToJpeg(input: Buffer) {
  return convert({ buffer: input, format: "JPEG", quality: 0.95 });
}

export async function heicToPdf(input: Buffer) {
  const png = await heicToPng(input);
  return imageToPdf(png);
}

export async function heicToWebp(input: Buffer) {
  const png = await heicToPng(input);
  return sharp(png).webp({ quality: 85 }).toBuffer();
}

export async function heicToAvif(input: Buffer) {
  const png = await heicToPng(input);
  return sharp(png).avif({ quality: 50 }).toBuffer();
}

export async function heicToTiff(input: Buffer) {
  const png = await heicToPng(input);
  return sharp(png).tiff({ compression: "lzw" }).toBuffer();
}

export async function heicToGif(input: Buffer) {
  const png = await heicToPng(input);
  return sharp(png).gif().toBuffer();
}

export async function heicToIco(input: Buffer) {
  const png = await heicToPng(input);
  return sharp(png)
    .resize(32, 32, { fit: "contain", background: "#0000" })
    .png()
    .toBuffer();
}

/* shared */

async function imageToPdf(input: Buffer) {
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

/* API */

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const format = String(formData.get("format") || "").toLowerCase();

  if (!files.length)
    return NextResponse.json({ error: "No files" }, { status: 400 });

  if (!ALLOWED_OUT.has(format))
    return NextResponse.json({ error: "Wrong format" }, { status: 400 });

  /* MULTI → ZIP */
  if (files.length > 1) {
    const zip = new JSZip();

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const ext = getExt(file.name);
      const buf = Buffer.from(await file.arrayBuffer());

      if (buf.length > MAX_FILE_SIZE_MB * 1024 * 1024) continue;

      const mime = (file.type || "").toLowerCase();
      const mimeOk =
        ALLOWED_IN_MIME.has(mime) ||
        mime === "" ||
        mime === "application/octet-stream";

      const extOk = ALLOWED_IN_EXT.has(ext);
      if (!mimeOk || !extOk) continue;

      let out: Buffer;
      const isHeic = ext === "heic" || ext === "heif";

      if (isHeic) {
        if (format === "png") out = await heicToPng(buf);
        else if (format === "jpeg") out = await heicToJpeg(buf);
        else if (format === "webp") out = await heicToWebp(buf);
        else if (format === "avif") out = await heicToAvif(buf);
        else if (format === "tiff") out = await heicToTiff(buf);
        else if (format === "gif") out = await heicToGif(buf);
        else if (format === "pdf") out = await heicToPdf(buf);
        else if (format === "ico") out = await heicToIco(buf);
        else continue;
      } else {
        if (format === "pdf") out = await imageToPdf(buf);
        else {
          const fmt = format as
            | "png"
            | "jpeg"
            | "webp"
            | "avif"
            | "tiff"
            | "gif";
          out = await sharp(buf).toFormat(fmt).toBuffer();
        }
      }

      const base = file.name.replace(/\.[^/.]+$/, "");
      zip.file(`${base}.${safeExt(format)}`, out);
    }

    const zipBuf = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(new Uint8Array(zipBuf), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=converted-images.zip",
      },
    });
  }

  /* SINGLE */
  const file = files[0];
  const ext = getExt(file.name);
  const buf = Buffer.from(await file.arrayBuffer());

  if (buf.length > MAX_FILE_SIZE_MB * 1024 * 1024)
    return NextResponse.json({ error: "File too large" }, { status: 413 });

  const mime = (file.type || "").toLowerCase();
  const mimeOk =
    ALLOWED_IN_MIME.has(mime) ||
    mime === "" ||
    mime === "application/octet-stream";

  const extOk = ALLOWED_IN_EXT.has(ext);
  if (!mimeOk || !extOk)
    return NextResponse.json({ error: "Wrong type" }, { status: 400 });

  const isHeic = ext === "heic" || ext === "heif";

  let out: Buffer;
  let contentType = "";

  if (isHeic) {
    if (format === "png") {
      out = await heicToPng(buf);
      contentType = "image/png";
    } else if (format === "jpeg") {
      out = await heicToJpeg(buf);
      contentType = "image/jpeg";
    } else if (format === "webp") {
      out = await heicToWebp(buf);
      contentType = "image/webp";
    } else if (format === "avif") {
      out = await heicToAvif(buf);
      contentType = "image/avif";
    } else if (format === "tiff") {
      out = await heicToTiff(buf);
      contentType = "image/tiff";
    } else if (format === "gif") {
      out = await heicToGif(buf);
      contentType = "image/gif";
    } else if (format === "pdf") {
      out = await heicToPdf(buf);
      contentType = "application/pdf";
    } else if (format === "ico") {
      out = await heicToIco(buf);
      contentType = "image/png";
    } else
      return NextResponse.json(
        { error: "Unsupported output format for HEIC" },
        { status: 400 },
      );
  } else {
    if (format === "pdf") {
      out = await imageToPdf(buf);
      contentType = "application/pdf";
    } else {
      const fmt = format as "png" | "jpeg" | "webp" | "avif" | "tiff" | "gif";

      out = await sharp(buf).toFormat(fmt).toBuffer();
      contentType = format === "ico" ? "image/x-icon" : `image/${format}`;
    }
  }

  return new NextResponse(new Uint8Array(out), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename=converted.${safeExt(format)}`,
      "Cache-Control": "no-store",
    },
  });
}
