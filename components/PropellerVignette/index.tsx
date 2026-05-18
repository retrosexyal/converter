"use client";

import { useEffect } from "react";

const PROPELLER_ZONE = "10484844";
const PROPELLER_SRC = "https://gizokraijaw.net/vignette.min.js";
const SHOW_EVENT = "show-propeller-vignette";
const COOLDOWN_MS = 3000;

let isLoadingVignette = false;
let lastShownAt = 0;

export function showPropellerVignette() {
  if (typeof window === "undefined") return;

  const now = Date.now();

  // Защита от нескольких быстрых кликов по Convert.
  if (isLoadingVignette || now - lastShownAt < COOLDOWN_MS) return;

  isLoadingVignette = true;
  lastShownAt = now;

  const script = document.createElement("script");
  script.dataset.zone = PROPELLER_ZONE;
  script.src = PROPELLER_SRC;
  script.async = true;

  script.onload = () => {
    isLoadingVignette = false;
  };

  script.onerror = () => {
    isLoadingVignette = false;
  };

  (document.body || document.documentElement).appendChild(script);
}

declare global {
  interface Window {
    showPropellerVignette?: typeof showPropellerVignette;
  }
}

export default function PropellerVignette() {
  useEffect(() => {
    window.showPropellerVignette = showPropellerVignette;

    const handleShowVignette = () => {
      showPropellerVignette();
    };

    window.addEventListener(SHOW_EVENT, handleShowVignette);

    return () => {
      window.removeEventListener(SHOW_EVENT, handleShowVignette);

      if (window.showPropellerVignette === showPropellerVignette) {
        delete window.showPropellerVignette;
      }
    };
  }, []);

  return null;
}
