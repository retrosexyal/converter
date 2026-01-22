import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import { DICTIONARY, type Locale } from "@/dictionary";
import { notFound } from "next/navigation";

const locales = Object.keys(DICTIONARY);

export async function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const dict = DICTIONARY[locale];

  if (!dict) notFound();

  return {
    title: {
      default: dict.layout.titleDefault,
      template: dict.layout.titleTemplate,
    },
    description: dict.layout.description,
    applicationName: dict.layout.applicationName,
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: dict.layout.ogTitle,
      description: dict.layout.ogDescription,
      type: "website",
      url: `/${locale}`,
    },

    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
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
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const dict = DICTIONARY[locale];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: dict.layout.applicationName,
            url: `https://converter-murex.vercel.app/${locale}`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "All",
            inLanguage: locale,
          }),
        }}
      />
    </>
  );
}
