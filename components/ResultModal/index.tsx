"use client";

import { DICTIONARY, Locale } from "@/dictionary";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  locale: Locale;
  resultName?: string;
  resultSize?: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = units[0];

  for (let i = 1; i < units.length && value >= 1024; i += 1) {
    value /= 1024;
    unit = units[i];
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${unit}`;
}

export default function ResultModal({
  open,
  onClose,
  onDownload,
  locale,
  resultName,
  resultSize,
}: Props) {
  const {
    resultModal: { title, close, download /* , adTitle, adHint */ },
  } = DICTIONARY[locale];

  // Здесь можно инициализировать рекламу (если сеть требует JS-инициализацию)
  useEffect(() => {
    if (!open) return;
    // Например: window.someAdNetworkInit?.()
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-white rounded shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-semibold text-neutral-900">{title}</div>
          <button
            className="text-sm underline text-neutral-900 hover:text-neutral-800"
            onClick={onClose}
          >
            {close}
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {(resultName || typeof resultSize === "number") && (
            <div className="rounded border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-800">
              {resultName && <div className="font-medium">{resultName}</div>}
              {typeof resultSize === "number" && (
                <div className="text-xs text-neutral-600">
                  Output size: {formatBytes(resultSize)}
                </div>
              )}
            </div>
          )}

          {/* <div className="border rounded p-3 bg-neutral-50">
            <div className="text-sm font-medium">Баннер после конвертации</div>
            <div className="text-xs text-neutral-600 mt-1">
              Сюда вставляется interstitial/native/iframe от рекламной сети.
            </div>

             ВСТАВИТЬ КОД РЕКЛАМЫ 
            <div
              id="ad-modal-slot"
              className="mt-3 min-h-[120px] flex items-center justify-center border rounded bg-white text-xs text-neutral-500"
            >
              ad-slot
            </div>
          </div> */}

          <button
            onClick={onDownload}
            className="rounded bg-black text-white px-4 py-2 text-sm hover:bg-neutral-800"
          >
            {download}
          </button>
        </div>
      </div>
    </div>
  );
}
