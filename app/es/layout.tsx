import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { DICTIONARY, type Locale } from "@/dictionary";

const locale: Locale = "es";
const dict = DICTIONARY[locale];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://example.com"),

  title: {
    default: dict.layout.titleDefault,
    template: dict.layout.titleTemplate,
  },

  description: dict.layout.description,
  applicationName: dict.layout.applicationName,

  alternates: {
    canonical: `/${locale}`,
    languages: {
      ru: "/",
      en: "/en",
    },
  },

  icons: {
    icon: "/favicon.svg",
  },

  openGraph: {
    title: dict.layout.ogTitle,
    description: dict.layout.ogDescription,
    type: "website",
    url: `/${locale}`,
  },

  twitter: {
    card: "summary_large_image",
    title: dict.layout.twitterTitle,
    description: dict.layout.twitterDescription,
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
    <>
      <Header locale={locale} />

      <main className="mx-auto w-full max-w-5xl px-4 py-10 flex-1">
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-600 flex flex-col gap-2 items-center text-center">
          <div>
            {dict.layout.footerCopyright.replace(
              "{{year}}",
              String(new Date().getFullYear()),
            )}
          </div>

          <div className="text-xs">{dict.layout.footerFormats}</div>

          <div className="flex gap-4 text-xs">
            <Link href={`/${locale}/privacy`}>{dict.layout.privacy}</Link>
            <Link href={`/${locale}/terms`}>{dict.layout.terms}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
