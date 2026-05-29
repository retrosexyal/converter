# Client-side image converter

This project is a static Next.js image converter. The conversion API route was removed: files are converted directly in the browser with Canvas, `pdf-lib`, and `jszip`.

## What changed

- Removed `app/api/convert/route.ts`.
- Removed direct server conversion dependencies (`sharp` and `@qs-coder/heic-convert`).
- Added `lib/clientImageConverter.ts` for client-side conversion.
- Updated `components/UploadForm` so it no longer sends files to `/api/convert`.
- Enabled static export with `output: "export"`; `npm run build` creates the `out/` folder.

## Supported browser-side outputs

- PNG, JPEG, WebP via Canvas.
- AVIF if the current browser supports Canvas AVIF export.
- PDF via `pdf-lib`.
- ZIP for multiple files via `jszip`.
- Static GIF via a small browser encoder.
- TIFF as uncompressed RGB TIFF.
- ICO as a PNG-based 32×32 `.ico` file.

## Important browser limitation

Input decoding now depends on the browser. Common formats such as PNG, JPEG, WebP, GIF, BMP, AVIF and ICO work in browsers that support them. HEIC/HEIF and TIFF are not reliably decoded by most browsers without a WASM decoder or server-side processing, so the UI shows a clear error if the browser cannot read them.

## Development

```bash
npm install
npm run dev
```

## Advertising

The site uses only inline Yandex RTB banner slots. Create a Banner unit in Yandex Partner, copy its RTB `blockId`, and set it at build time:

```bash
NEXT_PUBLIC_YANDEX_RTB_INLINE_BLOCK_ID=R-A-19353529-1
```

Fullscreen, Top Ad, Floor Ad, push, and pop-up formats are intentionally not used because this converter should not interrupt file selection, conversion, or download.

## Static build

```bash
npm run build
```

The static site is generated into `out/` and can be hosted without a Node.js server.
