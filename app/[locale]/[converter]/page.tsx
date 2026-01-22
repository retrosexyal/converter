import FaqSchema from "@/components/FaqSchema";
import UploadForm from "@/components/UploadForm";
import { DICTIONARY, Locale } from "@/dictionary";
import { FAQ } from "@/lib/faq";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const locales = Object.keys(DICTIONARY);
type ConverterType = keyof typeof DICTIONARY.en.converters;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; converter: ConverterType }>;
}): Promise<Metadata> {
  const { locale, converter } = await params;

  const dict = DICTIONARY[locale];

  if (!dict) notFound();
  if (!(converter in dict.converters)) notFound();

  const page = dict.converters[converter as keyof typeof dict.converters];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/${converter}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; converter: ConverterType }>;
}) {
  const { locale, converter } = await params;

  const dict = DICTIONARY[locale];

  if (!dict) notFound();
  if (!(converter in dict.converters)) notFound();

  const page = dict.converters[converter as keyof typeof dict.converters];

  const faqs = FAQ.base[locale];

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <UploadForm
          title={page.title}
          defaultFormat={converter.split("-to-")[1]}
          hideFormatSelect
          locale={locale}
        />

        <article className="prose max-w-none">
          <h1>{page.h1}</h1>
          <p>{page.description}</p>

          <ul>
            {faqs.map((f) => (
              <li key={f.question}>
                <strong>{f.question}</strong>
                <br />
                {f.answer}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: locale.toUpperCase(),
                item: `/${locale}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: page.h1,
                item: `/${locale}/${converter}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
