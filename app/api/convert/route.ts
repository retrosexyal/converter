import { NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

const ALLOWED_OUT = new Set(["webp", "jpeg", "png"]);
const ALLOWED_IN_MIME = new Set(["image/webp", "image/jpeg", "image/png"]);

function safeExt(format: string) {
  if (format === "jpeg") return "jpg";
  return format;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const format = String(formData.get("format") || "").toLowerCase();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }
  if (!ALLOWED_OUT.has(format)) {
    return NextResponse.json({ error: "Недопустимый формат" }, { status: 400 });
  }
  if (!ALLOWED_IN_MIME.has(file.type)) {
    return NextResponse.json(
      { error: "Поддерживаются только WebP/JPEG/PNG" },
      { status: 400 },
    );
  }

  const input = Buffer.from(await file.arrayBuffer());

  // базовая защита по размеру (можешь увеличить)
  const MAX_MB = 15;
  if (input.length > MAX_MB * 1024 * 1024) {
    return NextResponse.json(
      { error: `Слишком большой файл (>${MAX_MB}MB)` },
      { status: 413 },
    );
  }

  let img = sharp(input, { failOn: "none" });

  if (format === "webp") img = img.webp({ quality: 85 });
  if (format === "jpeg") img = img.jpeg({ quality: 85, mozjpeg: true });
  if (format === "png") img = img.png({ compressionLevel: 9 });

  const out = await img.toBuffer();

  return new NextResponse(new Uint8Array(out), {
    headers: {
      "Content-Type": `image/${format}`,
      "Content-Disposition": `attachment; filename=converted.${safeExt(format)}`,
      "Cache-Control": "no-store",
    },
  });
}
