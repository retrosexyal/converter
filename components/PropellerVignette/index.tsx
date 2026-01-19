"use client";

import Script from "next/script";

export default function PropellerVignette() {
  return (
    <Script
      id="propeller-inpage-push"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(s){s.dataset.zone='10484844',s.src='https://gizokraijaw.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))
        `,
      }}
    />
  );
}
