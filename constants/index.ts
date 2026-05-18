export const MAX_FILE_SIZE_MB = 7;
export const MAX_FILES = 7;

export const ALLOWED_OUT_FORMAT = [
  "webp",
  "jpeg",
  "png",
  "avif",
  "tiff",
  "gif",
  "ico",
  "pdf",
] as const;

export const ALLOWED_OUT: ReadonlySet<string> = new Set(ALLOWED_OUT_FORMAT);

export const ALLOWED_IN = [
  "image/webp",
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/heic",
  "image/heif",
  "image/tiff",
  "image/gif",
  "image/bmp",
  "image/x-ms-bmp",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]

export const ALLOWED_IN_MIME = new Set(ALLOWED_IN);

export const ALLOWED_IN_EXT = new Set([
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
  "bmp",
]);
