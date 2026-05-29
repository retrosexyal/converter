import Script from "next/script";
import { isYandexAdsEnabled } from "@/lib/ads";

export default function YandexAdsScript() {
  if (!isYandexAdsEnabled) return null;

  return (
    <>
      <script
        id="yandex-context-callbacks"
        dangerouslySetInnerHTML={{
          __html: "window.yaContextCb = window.yaContextCb || [];",
        }}
      />
      <Script
        id="yandex-context-loader"
        src="https://yandex.ru/ads/system/context.js"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
