"use client";

import Script from "next/script";

export default function PropellerInPagePush() {
  return (
    <Script
      id="propeller-inpage-push"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(s){
            s.dataset.zone='10481781';
            s.src='https://nap5k.com/tag.min.js';
          })([document.documentElement, document.body]
            .filter(Boolean)
            .pop()
            .appendChild(document.createElement('script')));
        `,
      }}
    />
  );
}
