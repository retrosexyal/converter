"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ResultModal from "../ResultModal";
import { DICTIONARY } from "@/dictionary";
import { OutFormat, UploadFormProps } from "./models";
import { convertFilesInBrowser } from "@/lib/clientImageConverter";
import {
  ALLOWED_IN,
  ALLOWED_IN_EXT,
  ALLOWED_IN_MIME,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "@/constants";
import { showPropellerVignette } from "../PropellerVignette";

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
  const w = window as Window & {
    __vignetteLoaded?: boolean;
    __pushLoaded?: boolean;
  };

  if (!w.__vignetteLoaded) {
    const s = document.createElement("script");
    s.src = "https://gizokraijaw.net/vignette.min.js";
    s.dataset.zone = "10484844";
    s.async = true;
    document.body.appendChild(s);
    w.__vignetteLoaded = true;
  }

  if (!w.__pushLoaded) {
    const s = document.createElement("script");
    s.src = "https://nap5k.com/tag.min.js";
    s.dataset.zone = "10481781";
    s.async = true;
    document.body.appendChild(s);
    w.__pushLoaded = true;
  }
}

export default function UploadForm({
  locale = "ru",
  defaultFormat = "webp",
  hideFormatSelect = false,
  title,
}: UploadFormProps) {
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

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [format, setFormat] = useState<string>(defaultFormat);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState<string>("");

  const [showModal, setShowModal] = useState(false);

  const accept = useMemo(() => ALLOWED_IN.join(","), []);

  useEffect(() => setFormat(defaultFormat), [defaultFormat]);

  const firstFile = files[0] ?? null;
  const formats: Record<string, string> = {};
  files.forEach((newFile) => {
    const label = detectInputLabel(newFile);

    if (label) {
      formats[label] = label;
    }
  });

  function pickFile() {
    inputRef.current?.click();
  }

  function setFilesSafe(list: File[]) {
    setError(null);
    setResultBlob(null);

    if (list.length > MAX_FILES) {
      setError(`You can upload no more than ${MAX_FILES} files`);
      return;
    }

    const ok: File[] = [];

    for (const f of list) {
      const typeOk = ALLOWED_IN_MIME.has((f.type || "").toLowerCase());
      const ext = f.name.split(".").pop()?.toLowerCase() || "";
      const extOk = ALLOWED_IN_EXT.has(ext);

      if (!typeOk && !extOk) continue;
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) continue;

      ok.push(f);
    }

    if (!ok.length) {
      setError(errors.unsupported);
      return;
    }

    setFiles(ok);
  }

  async function onConvert() {
    showPropellerVignette();
    if (!files.length) {
      setError(errors.noFile);
      return;
    }

    setLoading(true);

    try {
      const result = await convertFilesInBrowser(files, format);

      setDownloadName(result.name);
      setResultBlob(result.blob);
      showVignette();
      setShowModal(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : errors.unknown);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!resultBlob) return;

    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    setFilesSafe(Array.from(e.dataTransfer.files || []));
  }

  return (
    <div className="border rounded p-5 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title ?? blockTitle}</h2>
      <p className="text-sm text-neutral-600">{subtitle}</p>

      <div
        className={`rounded border-2 border-dashed p-6 cursor-pointer select-none ${
          isDragging ? "bg-neutral-50 border-neutral-400" : "border-neutral-200"
        }`}
        onClick={pickFile}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => setFilesSafe(Array.from(e.target.files || []))}
        />

        {!files.length ? (
          <div className="text-center">
            <div className="text-sm font-medium">{dragTitle}</div>
            <div className="text-xs text-neutral-600">{dragHint}</div>
          </div>
        ) : (
          <div className="text-sm">
            <div className="font-medium">{files.length} file(s) selected</div>
            {firstFile && (
              <div className="text-xs text-neutral-600">
                {info.inputFormat}:{" "}
                {Object.keys(formats).map((label, ind) => (
                  <span className="font-medium" key={label}>
                    {ind === 0 ? "" : ", "}
                    {label}
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              className="text-xs underline mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setFiles([]);
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
            value={format}
            onChange={(e) => setFormat(e.target.value as OutFormat)}
            className="border rounded px-3 py-2 text-sm"
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
              <option key={val} value={val}>
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

      {loading && (
        <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
          <div className="h-full w-1/3 bg-black animate-pulse" />
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
