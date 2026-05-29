"use client";

import { useEffect, useId, useMemo } from "react";
import {
  isYandexAdsEnabled,
  YANDEX_RTB_INLINE_BLOCK_ID,
} from "@/lib/ads";

type YandexRenderOptions = {
  blockId: string;
  renderTo: string;
  darkTheme?: boolean;
};

declare global {
  interface Window {
    yaContextCb?: Array<() => void>;
    Ya?: {
      Context?: {
        AdvManager?: {
          render?: (options: YandexRenderOptions) => void;
        };
      };
    };
  }
}

type Props = {
  placement: string;
  className?: string;
};

function normalizeIdPart(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export default function YandexAdSlot({ placement, className = "" }: Props) {
  const reactId = useId();

  const renderTo = useMemo(() => {
    const blockId = normalizeIdPart(YANDEX_RTB_INLINE_BLOCK_ID);
    const placementId = normalizeIdPart(placement);
    const instanceId = normalizeIdPart(reactId);

    return `yandex_rtb_${blockId}_${placementId}_${instanceId}`;
  }, [placement, reactId]);

  useEffect(() => {
    if (!isYandexAdsEnabled) return;

    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      window.Ya?.Context?.AdvManager?.render?.({
        blockId: YANDEX_RTB_INLINE_BLOCK_ID,
        renderTo,
        darkTheme: window.matchMedia("(prefers-color-scheme: dark)").matches,
      });
    });
  }, [renderTo]);

  if (!isYandexAdsEnabled) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={`yandex-ad-slot w-full overflow-hidden rounded border border-neutral-200 bg-neutral-50/70 p-2 dark:border-neutral-800 dark:bg-neutral-900/60 ${className}`}
    >
      <div id={renderTo} className="min-h-[250px] w-full" />
    </aside>
  );
}
