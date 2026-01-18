"use client";

import { useEffect } from "react";

export default function AdSafeArea() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe[style*='position: fixed']");
      if (!iframe) return;

      const rect = iframe.getBoundingClientRect();
      if (rect.height > 0) {
        document.documentElement.style.setProperty(
          "--ad-safe-bottom",
          `${rect.height + 16}px`
        );
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
