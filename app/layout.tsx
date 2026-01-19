import "./globals.css";
/* import PropellerInPagePush from "@/components/PropellerInPagePush"; */
import AdSafeArea from "@/components/AdSafeArea";
/* import PropellerVignette from "@/components/PropellerVignette"; */
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <head>
        <Script
          id="propeller-vignette"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='10484844';
                s.src='https://gizokraijaw.net/vignette.min.js';
              })([document.documentElement, document.body]
                .filter(Boolean)
                .pop()
                .appendChild(document.createElement('script')));
            `,
          }}
        />
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
      </head>
      <body>
        <div className="min-h-dvh flex flex-col">{children}</div>
        <AdSafeArea />
        {/*         <PropellerVignette />
        <PropellerInPagePush /> */}
      </body>
    </html>
  );
}
