import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import UploadForm from "@/components/UploadForm";
import YandexAdSlot from "@/components/YandexAdSlot";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "FormatKit - Online Image Converter for JPG, PNG, WebP, AVIF, HEIC and PDF",
  description:
    "Convert images online in your browser. FormatKit supports JPG, PNG, WebP, AVIF, HEIC, TIFF, GIF, ICO and PDF with no registration.",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      en: absoluteUrl("/en"),
      ru: absoluteUrl("/ru"),
      es: absoluteUrl("/es"),
      de: absoluteUrl("/de"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    title: "FormatKit - Online Image Converter",
    description:
      "Fast browser-based image conversion for JPG, PNG, WebP, AVIF, HEIC, TIFF, GIF, ICO and PDF.",
    url: absoluteUrl("/"),
    type: "website",
  },
};

const popularTools = [
  { href: "/en/heic-to-jpeg", label: "HEIC to JPEG" },
  { href: "/en/png-to-webp", label: "PNG to WebP" },
  { href: "/en/jpeg-to-pdf", label: "JPEG to PDF" },
  { href: "/en/webp-to-png", label: "WebP to PNG" },
  { href: "/en/image-to-ico", label: "Image to favicon" },
  { href: "/en/video", label: "Video converter" },
];

const formatRows = [
  {
    format: "JPG / JPEG",
    bestFor: "Photos, product images, screenshots without transparency",
    note: "Small files and broad compatibility",
  },
  {
    format: "PNG",
    bestFor: "Logos, UI graphics, images with transparent backgrounds",
    note: "Lossless output with transparency support",
  },
  {
    format: "WebP",
    bestFor: "Web pages, blogs, ecommerce images and previews",
    note: "Modern compression with wide browser support",
  },
  {
    format: "AVIF",
    bestFor: "High-compression web images where browser support is acceptable",
    note: "Very small files with good visual quality",
  },
  {
    format: "PDF / ICO",
    bestFor: "Documents, printable image sets and website favicons",
    note: "Special-purpose output for sharing and publishing",
  },
];

export default function RootPage() {
  return (
    <>
      <Header locale="en" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium uppercase text-neutral-500">
              Browser-based image tools
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight">
              FormatKit online image converter
            </h1>
            <p className="max-w-2xl text-lg text-neutral-700">
              Convert JPG, PNG, WebP, AVIF, HEIC, TIFF, GIF, ICO and PDF files
              directly in your browser. Choose the output format, process one
              or several files, and download the result without creating an
              account.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link className="rounded border px-3 py-2 hover:bg-neutral-50" href="/en">
                English version
              </Link>
              <Link className="rounded border px-3 py-2 hover:bg-neutral-50" href="/ru">
                Русская версия
              </Link>
              <Link className="rounded border px-3 py-2 hover:bg-neutral-50" href="/es">
                Espanol
              </Link>
              <Link className="rounded border px-3 py-2 hover:bg-neutral-50" href="/de">
                Deutsch
              </Link>
            </div>
          </div>

          <UploadForm title="Convert an image" locale="en" />
        </section>

        <YandexAdSlot placement="root-after-converter" />

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded border p-4">
            <h2 className="text-base font-semibold">Private by design</h2>
            <p className="mt-2 text-sm text-neutral-700">
              Most image conversion runs locally in the browser. Files are used
              only to create the requested output and are not kept as a public
              archive.
            </p>
          </div>
          <div className="rounded border p-4">
            <h2 className="text-base font-semibold">Practical output formats</h2>
            <p className="mt-2 text-sm text-neutral-700">
              Prepare lighter WebP or AVIF images, compatible JPEG files,
              transparent PNG graphics, PDF documents and ICO favicons.
            </p>
          </div>
          <div className="rounded border p-4">
            <h2 className="text-base font-semibold">No installation</h2>
            <p className="mt-2 text-sm text-neutral-700">
              The converter works on desktop and mobile browsers, so you can
              quickly process images without installing a separate editor.
            </p>
          </div>
        </section>

        <section className="content-article max-w-none">
          <h2>Supported formats and when to use them</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-separate border-spacing-x-8 border-spacing-y-3 text-left">
              <thead>
                <tr>
                  <th className="w-36 whitespace-nowrap pb-2 pr-6">Format</th>
                  <th className="min-w-[420px] pb-2 px-6">Best for</th>
                  <th className="min-w-[360px] pb-2 pl-6">Note</th>
                </tr>
              </thead>
              <tbody>
                {formatRows.map((row) => (
                  <tr key={row.format}>
                    <td className="whitespace-nowrap pr-6 font-medium">
                      {row.format}
                    </td>
                    <td className="px-6">{row.bestFor}</td>
                    <td className="pl-6">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12">Popular conversion tools</h2>
          <ul>
            {popularTools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href}>{tool.label}</Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-12">How the converter handles files</h2>
          <p>
            FormatKit is built for everyday file preparation: website images,
            social media graphics, documents made from pictures, and favicons.
            The service does not require registration. If a browser does not
            support a particular codec or export format, choose a more widely
            supported option such as PNG, JPEG or WebP.
          </p>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-neutral-600">
          <div>© {new Date().getFullYear()} FormatKit</div>
          <div className="text-xs">
            Image and video conversion tools for browser-based file preparation.
          </div>
          <div className="flex gap-4 text-xs">
            <Link href="/en/privacy">Privacy Policy</Link>
            <Link href="/en/terms">Terms of Service</Link>
            <Link href="/en/about">About</Link>
            <Link href="/en/contact">Contact</Link>
            <Link href="/en/security">Security</Link>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "FormatKit",
            url: SITE_URL,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
