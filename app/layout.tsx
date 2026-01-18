import type { Metadata } from "next";
import "./globals.css";
import PropellerInPagePush from "@/components/PropellerInPagePush";
import Header from "@/components/Header";
import AdSafeArea from "@/components/AdSafeArea";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://example.com"),
  title: {
    default: "Конвертер изображений онлайн — WebP, PNG, JPEG",
    template: "%s — Конвертер изображений",
  },
  description:
    "Онлайн конвертер изображений: WebP ↔ PNG ↔ JPEG. Быстро, безопасно, бесплатно. Скачивание сразу после конвертации.",
  applicationName: "Image Converter",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Конвертер изображений онлайн — WebP, PNG, JPEG",
    description: "Конвертируй WebP/PNG/JPEG в нужный формат. Быстро и удобно.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Конвертер изображений онлайн",
    description: "WebP/PNG/JPEG конвертация в один клик.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-dvh flex flex-col">
          <Header />

          <main className="mx-auto w-full max-w-5xl px-4 py-10 flex-1">
            {children}
          </main>

          <footer className="border-t">
            <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-600 flex flex-col gap-2 items-center">
              <div>© {new Date().getFullYear()} Image Converter</div>
              <div className="text-xs">
                Поддержка форматов: WebP, PNG, JPEG. Файлы используются только
                для конвертации.
              </div>
              <div className="flex gap-4 text-xs">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
            </div>
          </footer>
        </div>
        <AdSafeArea />
        <PropellerInPagePush />
      </body>
    </html>
  );
}
