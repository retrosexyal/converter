declare module "@qs-coder/heic-convert" {
  type HeicConvertOptions = {
    buffer: Buffer;
    format: "JPEG" | "PNG";
    quality?: number;
  };

  export default function convert(
    options: HeicConvertOptions
  ): Promise<Buffer>;
}
