"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ResultModal from "../ResultModal";
import { Locale } from "@/dictionary";
import { showPropellerVignette } from "../PropellerVignette";

const MAX_VIDEO_SIZE_MB = 500;

type OutputFormat = {
  value: string;
  label: string;
  extension: "webm" | "mp4";
};

type VideoConverterCopy = {
  blockTitle: string;
  subtitle: string;
  dragTitle: string;
  dragHint: string;
  removeFile: string;
  fileLabel: string;
  formatLabel: string;
  bitrateLabel: string;
  bitrateHint: string;
  resolutionLabel: string;
  customWidthLabel: string;
  fpsLabel: string;
  audioLabel: string;
  progressLabel: string;
  resultLabel: string;
  download: string;
  convert: string;
  converting: string;
  unsupportedBrowser: string;
  unsupportedFile: string;
  tooLarge: string;
  noFile: string;
  noFormats: string;
  unknown: string;
  realtimeNote: string;
  supportNote: string;
};

const VIDEO_COPY: Record<Locale, VideoConverterCopy> = {
  ru: {
    blockTitle: "Конвертация видео",
    subtitle:
      "Выберите видео и настройте выходной формат, битрейт, ширину кадра и FPS. Все выполняется в браузере.",
    dragTitle: "Перетащите видео сюда",
    dragHint: "или нажмите, чтобы выбрать файл",
    removeFile: "Убрать файл",
    fileLabel: "Файл",
    formatLabel: "Формат",
    bitrateLabel: "Битрейт видео",
    bitrateHint: "кбит/с",
    resolutionLabel: "Разрешение",
    customWidthLabel: "Своя ширина",
    fpsLabel: "FPS",
    audioLabel: "Сохранить аудио, если браузер может его декодировать",
    progressLabel: "Прогресс",
    resultLabel: "Готовый файл",
    download: "Скачать",
    convert: "Конвертировать видео",
    converting: "Конвертация...",
    unsupportedBrowser:
      "Этот браузер не поддерживает MediaRecorder или захват canvas.",
    unsupportedFile:
      "Файл не похож на видео или не поддерживается вашим браузером.",
    tooLarge: `Файл больше ${MAX_VIDEO_SIZE_MB} MB.`,
    noFile: "Сначала выберите видео.",
    noFormats: "В этом браузере нет доступных выходных видеоформатов.",
    unknown: "Не удалось конвертировать видео.",
    realtimeNote:
      "Обработка идет в реальном времени: ролик длиной 2 минуты обычно конвертируется около 2 минут.",
    supportNote:
      "MP4 доступен только в браузерах, где MediaRecorder поддерживает запись MP4. WebM обычно работает стабильнее.",
  },
  en: {
    blockTitle: "Video conversion",
    subtitle:
      "Choose a video and adjust the output format, bitrate, frame width, and FPS. Everything runs in your browser.",
    dragTitle: "Drop a video here",
    dragHint: "or click to choose a file",
    removeFile: "Remove file",
    fileLabel: "File",
    formatLabel: "Format",
    bitrateLabel: "Video bitrate",
    bitrateHint: "kbps",
    resolutionLabel: "Resolution",
    customWidthLabel: "Custom width",
    fpsLabel: "FPS",
    audioLabel: "Keep audio if the browser can decode it",
    progressLabel: "Progress",
    resultLabel: "Converted file",
    download: "Download",
    convert: "Convert video",
    converting: "Converting...",
    unsupportedBrowser:
      "This browser does not support MediaRecorder or canvas capture.",
    unsupportedFile:
      "The file does not look like video or is not supported by your browser.",
    tooLarge: `The file is larger than ${MAX_VIDEO_SIZE_MB} MB.`,
    noFile: "Choose a video first.",
    noFormats: "This browser has no available output video formats.",
    unknown: "Could not convert the video.",
    realtimeNote:
      "Processing runs in real time: a 2-minute video usually takes about 2 minutes to convert.",
    supportNote:
      "MP4 is available only in browsers where MediaRecorder supports MP4 recording. WebM is usually the more reliable choice.",
  },
  es: {
    blockTitle: "Conversión de video",
    subtitle:
      "Elige un video y ajusta el formato de salida, bitrate, ancho del fotograma y FPS. Todo se ejecuta en el navegador.",
    dragTitle: "Arrastra un video aquí",
    dragHint: "o haz clic para elegir un archivo",
    removeFile: "Eliminar archivo",
    fileLabel: "Archivo",
    formatLabel: "Formato",
    bitrateLabel: "Bitrate de video",
    bitrateHint: "kbps",
    resolutionLabel: "Resolución",
    customWidthLabel: "Ancho personalizado",
    fpsLabel: "FPS",
    audioLabel: "Mantener audio si el navegador puede decodificarlo",
    progressLabel: "Progreso",
    resultLabel: "Archivo convertido",
    download: "Descargar",
    convert: "Convertir video",
    converting: "Convirtiendo...",
    unsupportedBrowser:
      "Este navegador no admite MediaRecorder o captura de canvas.",
    unsupportedFile:
      "El archivo no parece ser video o no es compatible con tu navegador.",
    tooLarge: `El archivo supera ${MAX_VIDEO_SIZE_MB} MB.`,
    noFile: "Primero elige un video.",
    noFormats:
      "Este navegador no tiene formatos de salida de video disponibles.",
    unknown: "No se pudo convertir el video.",
    realtimeNote:
      "El procesamiento se ejecuta en tiempo real: un video de 2 minutos suele tardar unos 2 minutos en convertirse.",
    supportNote:
      "MP4 solo está disponible en navegadores donde MediaRecorder admite grabación MP4. WebM suele ser la opción más estable.",
  },
  de: {
    blockTitle: "Videokonvertierung",
    subtitle:
      "Wähle ein Video und passe Ausgabeformat, Bitrate, Bildbreite und FPS an. Alles läuft im Browser.",
    dragTitle: "Video hier ablegen",
    dragHint: "oder klicken, um eine Datei auszuwählen",
    removeFile: "Datei entfernen",
    fileLabel: "Datei",
    formatLabel: "Format",
    bitrateLabel: "Video-Bitrate",
    bitrateHint: "kbps",
    resolutionLabel: "Auflösung",
    customWidthLabel: "Eigene Breite",
    fpsLabel: "FPS",
    audioLabel: "Audio behalten, wenn der Browser es decodieren kann",
    progressLabel: "Fortschritt",
    resultLabel: "Konvertierte Datei",
    download: "Herunterladen",
    convert: "Video konvertieren",
    converting: "Konvertieren...",
    unsupportedBrowser:
      "Dieser Browser unterstützt MediaRecorder oder Canvas-Aufnahme nicht.",
    unsupportedFile:
      "Die Datei sieht nicht wie ein Video aus oder wird vom Browser nicht unterstützt.",
    tooLarge: `Die Datei ist größer als ${MAX_VIDEO_SIZE_MB} MB.`,
    noFile: "Wähle zuerst ein Video aus.",
    noFormats: "Dieser Browser hat keine verfügbaren Video-Ausgabeformate.",
    unknown: "Das Video konnte nicht konvertiert werden.",
    realtimeNote:
      "Die Verarbeitung läuft in Echtzeit: Ein 2-Minuten-Video benötigt normalerweise etwa 2 Minuten.",
    supportNote:
      "MP4 ist nur in Browsern verfügbar, in denen MediaRecorder MP4-Aufnahme unterstützt. WebM ist meist zuverlässiger.",
  },
};

const FORMAT_CANDIDATES: OutputFormat[] = [
  {
    value: "video/webm;codecs=vp9,opus",
    label: "WebM (VP9 + Opus)",
    extension: "webm",
  },
  {
    value: "video/webm;codecs=vp8,opus",
    label: "WebM (VP8 + Opus)",
    extension: "webm",
  },
  {
    value: "video/webm",
    label: "WebM (browser default)",
    extension: "webm",
  },
  {
    value: "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    label: "MP4 (H.264 + AAC)",
    extension: "mp4",
  },
  {
    value: "video/mp4",
    label: "MP4 (browser default)",
    extension: "mp4",
  },
];

const RESOLUTION_OPTIONS = [
  { value: "source", label: "Original" },
  { value: "1920", label: "1920px / 1080p" },
  { value: "1280", label: "1280px / 720p" },
  { value: "854", label: "854px / 480p" },
  { value: "640", label: "640px / 360p" },
  { value: "custom", label: "Custom" },
] as const;

const FPS_OPTIONS = [60, 30, 24, 15] as const;

function getBaseName(name: string) {
  return name.replace(/\.[^/.]+$/, "") || "converted-video";
}

function makeEven(value: number) {
  return Math.max(2, Math.round(value / 2) * 2);
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function waitForEvent<T extends Event>(
  target: EventTarget,
  eventName: string,
  errorName = "error",
) {
  return new Promise<T>((resolve, reject) => {
    const cleanup = () => {
      target.removeEventListener(eventName, onEvent);
      target.removeEventListener(errorName, onError);
    };
    const onEvent = (event: Event) => {
      cleanup();
      resolve(event as T);
    };
    const onError = () => {
      cleanup();
      reject(new Error("Video decoding failed."));
    };

    target.addEventListener(eventName, onEvent, { once: true });
    target.addEventListener(errorName, onError, { once: true });
  });
}

async function loadVideo(file: File) {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");

  video.src = url;
  video.preload = "auto";
  video.playsInline = true;

  try {
    await waitForEvent(video, "loadedmetadata");
    return { video, url };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

type ConvertVideoOptions = {
  file: File;
  mimeType: string;
  extension: string;
  bitrateKbps: number;
  resolution: string;
  customWidth: number;
  fps: number;
  keepAudio: boolean;
  onProgress: (progress: number) => void;
};

async function convertVideoInBrowser({
  file,
  mimeType,
  extension,
  bitrateKbps,
  resolution,
  customWidth,
  fps,
  keepAudio,
  onProgress,
}: ConvertVideoOptions) {
  if (!("MediaRecorder" in window)) {
    throw new Error("MediaRecorder is not available.");
  }

  const { video, url } = await loadVideo(file);
  let animationFrame = 0;
  let audioContext: AudioContext | null = null;
  let recorder: MediaRecorder | null = null;

  try {
    const sourceWidth = video.videoWidth || 1280;
    const sourceHeight = video.videoHeight || 720;
    const targetWidth =
      resolution === "source"
        ? sourceWidth
        : resolution === "custom"
          ? customWidth
          : Number(resolution);
    const width = makeEven(Math.min(Math.max(targetWidth, 2), 3840));
    const height = makeEven((width / sourceWidth) * sourceHeight);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx || !canvas.captureStream) {
      throw new Error("Canvas capture is not available.");
    }

    const stream = canvas.captureStream(fps);
    video.muted = !keepAudio;

    if (keepAudio) {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (AudioContextConstructor) {
        audioContext = new AudioContextConstructor();
        const source = audioContext.createMediaElementSource(video);
        const destination = audioContext.createMediaStreamDestination();

        source.connect(destination);
        destination.stream
          .getAudioTracks()
          .forEach((track) => stream.addTrack(track));

        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }
      }
    }

    const chunks: BlobPart[] = [];
    recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: bitrateKbps * 1000,
      audioBitsPerSecond: keepAudio ? 128000 : undefined,
    });

    const stopped = new Promise<Blob>((resolve, reject) => {
      recorder?.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      });
      recorder?.addEventListener(
        "stop",
        () => resolve(new Blob(chunks, { type: mimeType })),
        { once: true },
      );
      recorder?.addEventListener(
        "error",
        () => reject(new Error("Recording failed.")),
        { once: true },
      );
    });

    const drawFrame = () => {
      if (!video.paused && !video.ended) {
        ctx.drawImage(video, 0, 0, width, height);
        if (Number.isFinite(video.duration) && video.duration > 0) {
          onProgress(Math.min(video.currentTime / video.duration, 0.99));
        }
      }

      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    video.addEventListener(
      "ended",
      () => {
        ctx.drawImage(video, 0, 0, width, height);
        onProgress(1);

        if (recorder?.state === "recording") {
          recorder.stop();
        }
      },
      { once: true },
    );

    recorder.start(1000);
    await video.play();
    drawFrame();

    const blob = await stopped;
    stream.getTracks().forEach((track) => track.stop());

    return {
      blob,
      name: `${getBaseName(file.name)}.${extension}`,
    };
  } finally {
    window.cancelAnimationFrame(animationFrame);
    video.pause();
    URL.revokeObjectURL(url);
    if (recorder?.state === "recording") recorder.stop();
    await audioContext?.close();
  }
}

export default function VideoConverter({ locale = "ru" }: { locale?: Locale }) {
  const copy = VIDEO_COPY[locale];
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [supportChecked, setSupportChecked] = useState(false);
  const [formats, setFormats] = useState<OutputFormat[]>([]);
  const [format, setFormat] = useState("");
  const [bitrate, setBitrate] = useState(2500);
  const [resolution, setResolution] = useState("source");
  const [customWidth, setCustomWidth] = useState(1280);
  const [fps, setFps] = useState(30);
  const [keepAudio, setKeepAudio] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const selectedFormat = useMemo(
    () => formats.find((item) => item.value === format) ?? formats[0],
    [format, formats],
  );

  useEffect(() => {
    setSupportChecked(true);

    if (!("MediaRecorder" in window)) return;

    const supported = FORMAT_CANDIDATES.filter((candidate) =>
      MediaRecorder.isTypeSupported(candidate.value),
    );

    setFormats(supported);
    setFormat(supported[0]?.value ?? "");
  }, []);

  function pickFile() {
    inputRef.current?.click();
  }

  function setFileSafe(nextFile: File | null) {
    setError(null);
    setResultBlob(null);
    setDownloadName("");
    setShowModal(false);
    setProgress(0);

    if (!nextFile) {
      setFile(null);
      return;
    }

    const isVideo =
      nextFile.type.startsWith("video/") ||
      /\.(m4v|mkv|mov|mp4|webm)$/i.test(nextFile.name);

    if (!isVideo) {
      setError(copy.unsupportedFile);
      return;
    }

    if (nextFile.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      setError(copy.tooLarge);
      return;
    }

    setFile(nextFile);
  }

  async function onConvert() {
    showPropellerVignette();

    if (!file) {
      setError(copy.noFile);
      return;
    }

    if (!selectedFormat) {
      setError(copy.noFormats);
      return;
    }

    setError(null);
    setLoading(true);
    setProgress(0);
    setResultBlob(null);

    try {
      const result = await convertVideoInBrowser({
        file,
        mimeType: selectedFormat.value,
        extension: selectedFormat.extension,
        bitrateKbps: bitrate,
        resolution,
        customWidth,
        fps,
        keepAudio,
        onProgress: setProgress,
      });

      setDownloadName(result.name);
      setResultBlob(result.blob);
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.unknown);
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

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
    setFileSafe(Array.from(event.dataTransfer.files || [])[0] ?? null);
  }

  return (
    <div className="border rounded p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{copy.blockTitle}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {copy.subtitle}
        </p>
      </div>

      <div
        className={`rounded border-2 border-dashed p-6 cursor-pointer select-none ${
          isDragging ? "bg-neutral-50 border-neutral-400" : "border-neutral-200"
        }`}
        onClick={pickFile}
        onDragOver={(event) => {
          event.preventDefault();
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
          accept="video/*,.m4v,.mkv,.mov,.mp4,.webm"
          className="hidden"
          onChange={(event) =>
            setFileSafe(Array.from(event.target.files || [])[0] ?? null)
          }
        />

        {!file ? (
          <div className="text-center">
            <div className="text-sm font-medium">{copy.dragTitle}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">
              {copy.dragHint}
            </div>
          </div>
        ) : (
          <div className="text-sm">
            <div className="font-medium break-all">
              {copy.fileLabel}: {file.name}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">
              {formatFileSize(file.size)}
              {file.type ? ` · ${file.type}` : ""}
            </div>
            <button
              type="button"
              className="text-xs underline mt-2"
              onClick={(event) => {
                event.stopPropagation();
                setFileSafe(null);
              }}
            >
              {copy.removeFile}
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          {copy.formatLabel}
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            disabled={!formats.length || loading}
            className="border rounded px-3 py-2 text-sm font-normal"
          >
            {formats.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium">
          {copy.bitrateLabel}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={250}
              max={50000}
              step={250}
              value={bitrate}
              disabled={loading}
              onChange={(event) => setBitrate(Number(event.target.value))}
              className="border rounded px-3 py-2 text-sm font-normal w-full bg-white text-black dark:bg-neutral-900 dark:text-white"
            />
            <span className="text-xs text-neutral-600 dark:text-neutral-300">
              {copy.bitrateHint}
            </span>
          </div>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium">
          {copy.resolutionLabel}
          <select
            value={resolution}
            onChange={(event) => setResolution(event.target.value)}
            disabled={loading}
            className="border rounded px-3 py-2 text-sm font-normal"
          >
            {RESOLUTION_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium">
          {copy.fpsLabel}
          <select
            value={fps}
            onChange={(event) => setFps(Number(event.target.value))}
            disabled={loading}
            className="border rounded px-3 py-2 text-sm font-normal"
          >
            {FPS_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {resolution === "custom" && (
          <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
            {copy.customWidthLabel}
            <input
              type="number"
              min={2}
              max={3840}
              step={2}
              value={customWidth}
              disabled={loading}
              onChange={(event) => setCustomWidth(Number(event.target.value))}
              className="border rounded px-3 py-2 text-sm font-normal bg-white text-black dark:bg-neutral-900 dark:text-white"
            />
          </label>
        )}
      </div>

      <label className="inline-flex items-start gap-2 text-sm text-neutral-800 dark:text-neutral-100">
        <input
          type="checkbox"
          checked={keepAudio}
          disabled={loading}
          onChange={(event) => setKeepAudio(event.target.checked)}
          className="mt-1"
        />
        <span>{copy.audioLabel}</span>
      </label>

      <div className="rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3 text-xs text-neutral-700 dark:text-neutral-300 flex flex-col gap-1">
        <p>{copy.realtimeNote}</p>
        <p>{copy.supportNote}</p>
      </div>

      {loading && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
            <span>{copy.progressLabel}</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
            <div
              className="h-full bg-black dark:bg-white transition-[width]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {error}
        </div>
      )}

      {resultBlob && (
        <div className="rounded border border-neutral-200 dark:border-neutral-800 p-3 text-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium">{copy.resultLabel}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300 break-all">
              {downloadName} · {formatFileSize(resultBlob.size)}
            </div>
          </div>
          <button
            type="button"
            onClick={download}
            className="rounded bg-black text-white px-4 py-2 text-sm dark:bg-white dark:text-black"
          >
            {copy.download}
          </button>
        </div>
      )}

      <button
        type="button"
        disabled={loading || !supportChecked || !formats.length}
        onClick={onConvert}
        className="rounded bg-black text-white px-4 py-2 text-sm disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {loading ? copy.converting : copy.convert}
      </button>

      {supportChecked && !formats.length && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded p-3">
          {"MediaRecorder" in globalThis
            ? copy.noFormats
            : copy.unsupportedBrowser}
        </div>
      )}

      <ResultModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onDownload={download}
        locale={locale}
      />
    </div>
  );
}
