"use client";

import Script from "next/script";

export default function PropellerBanner() {
  return (
    <Script
      id="propeller-inpage-push"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(s){s.dataset.zone='11021655',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))
        `,
      }}
    />
  );
}
