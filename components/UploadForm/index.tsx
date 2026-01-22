"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ResultModal from "../ResultModal";
import { DICTIONARY, Locale } from "@/dictionary";

type OutFormat =
  | "webp"
  | "jpeg"
  | "png"
  | "avif"
  | "tiff"
  | "gif"
  | "ico"
  | "pdf";

type Props = {
  locale?: Locale;
  defaultFormat?: string;
  hideFormatSelect?: boolean;
  title?: string;
};

function detectInputLabel(file: File | null) {
  if (!file) return null;

  const t = (file.type || "").toLowerCase();

  if (t === "image/png") return "PNG";
  if (t === "image/jpeg") return "JPEG";
  if (t === "image/webp") return "WebP";
  if (t === "image/avif") return "AVIF";
  if (t === "image/heic" || t === "image/heif") return "HEIC";
  if (t === "image/tiff") return "TIFF";
  if (t === "image/gif") return "GIF";
  if (t === "image/x-icon" || t === "image/vnd.microsoft.icon") return "ICO";

  // fallback по расширению
  const name = file.name.toLowerCase();
  if (name.endsWith(".png")) return "PNG";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "JPEG";
  if (name.endsWith(".webp")) return "WebP";
  if (name.endsWith(".avif")) return "AVIF";
  if (name.endsWith(".heic") || name.endsWith(".heif")) return "HEIC";
  if (name.endsWith(".tif") || name.endsWith(".tiff")) return "TIFF";
  if (name.endsWith(".gif")) return "GIF";
  if (name.endsWith(".ico")) return "ICO";

  return "Unknown";
}

function showVignette() {
  const customWindow = window as Window & {
    __vignetteLoaded?: boolean;
    __pushLoaded?: boolean;
  };

  if (!customWindow.__vignetteLoaded) {
    const s = document.createElement("script");
    s.src = "https://gizokraijaw.net/vignette.min.js";
    s.dataset.zone = "10484844";
    s.async = true;

    document.body.appendChild(s);
    customWindow.__vignetteLoaded = true;
  }

  if (!customWindow.__pushLoaded) {
    const s = document.createElement("script");
    s.src = "https://nap5k.com/tag.min.js";
    s.dataset.zone = "10481781";
    s.async = true;

    document.body.appendChild(s);

    document.body.appendChild(s);
    customWindow.__pushLoaded = true;
  }
}

export default function UploadForm({
  locale = "ru",
  defaultFormat = "webp",
  hideFormatSelect = false,
  title,
}: Props) {
  const {
    uploadForm: {
      blockTitle,
      subtitle,
      dragTitle,
      dragHint,
      removeFile,
      outputFormatLabel,
      errors,
      info,
      buttons,
    },
  } = DICTIONARY[locale];

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [format, setFormat] = useState<string>(defaultFormat);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [showModal, setShowModal] = useState(false);

  const accept = useMemo(
    () =>
      [
        "image/webp",
        "image/jpeg",
        "image/png",
        "image/avif",
        "image/heic",
        "image/heif",
        "image/tiff",
        "image/gif",
        "image/x-icon",
        "image/vnd.microsoft.icon",
      ].join(","),
    [],
  );

  useEffect(() => {
    setFormat(defaultFormat);
  }, [defaultFormat]);

  const inputLabel = detectInputLabel(file);

  function pickFile() {
    inputRef.current?.click();
  }

  function setFileSafe(f: File | null) {
    setError(null);
    setResultBlob(null);

    if (!f) {
      setFile(null);
      return;
    }

    const allowed = new Set([
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/avif",
      "image/heic",
      "image/heif",
      "image/tiff",
      "image/gif",
      "image/x-icon",
      "image/vnd.microsoft.icon",
    ]);
    const typeOk = allowed.has((f.type || "").toLowerCase());

    // иногда type может быть пустым, проверим по расширению
    const name = f.name.toLowerCase();
    const extOk =
      name.endsWith(".png") ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".webp") ||
      name.endsWith(".avif") ||
      name.endsWith(".heic") ||
      name.endsWith(".heif") ||
      name.endsWith(".tif") ||
      name.endsWith(".tiff") ||
      name.endsWith(".gif") ||
      name.endsWith(".ico");

    if (!typeOk && !extOk) {
      setError(errors.unsupported);
      setFile(null);
      return;
    }

    const MAX_MB = 5;
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`${errors.tooLarge} (>${MAX_MB}MB)`);
      setFile(null);
      return;
    }

    setFile(f);
  }

  async function onConvert() {
    setError(null);
    setResultBlob(null);

    if (!file) {
      setError(errors.noFile);
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("format", format);

      const res = await fetch("/api/convert", { method: "POST", body: fd });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        throw new Error(data?.error || errors.convert);
      }

      const blob = await res.blob();
      setResultBlob(blob);

      showVignette();
      setShowModal(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.message || errors.unknown);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!resultBlob) return;

    const extMap: Record<string, string> = {
      jpeg: "jpg",
      webp: "webp",
      png: "png",
      avif: "avif",
      tiff: "tiff",
      gif: "gif",
      ico: "ico",
      pdf: "pdf",
    };

    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${extMap[format]}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setShowModal(false);
  }

  // Drag & Drop handlers
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const f = e.dataTransfer.files?.[0] || null;
    setFileSafe(f);
  }

  return (
    <div className="border rounded p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{title ?? blockTitle}</h2>
        <p className="text-sm text-neutral-600">{subtitle}</p>
      </div>

      <div
        className={[
          "rounded border-2 border-dashed p-6 cursor-pointer select-none",
          isDragging
            ? "bg-neutral-50 border-neutral-400"
            : "border-neutral-200",
        ].join(" ")}
        onClick={pickFile}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => setFileSafe(e.target.files?.[0] || null)}
        />

        {!file ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-sm font-medium">{dragTitle}</div>
            <div className="text-xs text-neutral-600">{dragHint}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">{file.name}</div>
            <div className="text-xs text-neutral-600">
              {info.size}: {Math.round(file.size / 1024)} KB •{" "}
              {info.inputFormat}:{" "}
              <span className="font-medium">{inputLabel}</span>
            </div>
            <button
              type="button"
              className="text-xs underline text-neutral-700 w-fit mt-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFile(null);
              }}
            >
              {removeFile}
            </button>
          </div>
        )}
      </div>

      {!hideFormatSelect && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">{outputFormatLabel}</label>
          <select
            className="
    border rounded px-3 py-2 text-sm
    bg-white text-black
    dark:bg-neutral-900 dark:text-white
    border-neutral-300 dark:border-neutral-700
    focus:outline-none focus:ring-2 focus:ring-neutral-500
  "
            value={format}
            onChange={(e) => setFormat(e.target.value as OutFormat)}
          >
            {[
              { val: "webp", label: "WebP" },
              { val: "jpeg", label: "JPEG" },
              { val: "png", label: "PNG" },
              { val: "avif", label: "AVIF" },
              { val: "tiff", label: "TIFF" },
              { val: "gif", label: "GIF (static)" },
              { val: "ico", label: "Favicon (ICO)" },
              { val: "pdf", label: "PDF" },
            ].map(({ val, label }) => (
              <option
                value={val}
                className="bg-white text-black dark:bg-neutral-900 dark:text-white"
                key={val}
              >
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {hideFormatSelect && (
        <div className="text-sm text-neutral-700">
          {outputFormatLabel}{" "}
          <span className="font-semibold">{format.toUpperCase()}</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </div>
      )}

      <button
        disabled={loading}
        onClick={onConvert}
        className="rounded bg-black text-white px-4 py-2 text-sm disabled:opacity-60"
      >
        {loading ? buttons.converting : buttons.convert}
      </button>

      <ResultModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onDownload={download}
        locale={locale}
      />
    </div>
  );
}
