import FaqSchema from "@/components/FaqSchema";
import UploadForm from "@/components/UploadForm";
import YandexAdSlot from "@/components/YandexAdSlot";
import { DICTIONARY, Locale } from "@/dictionary";
import { FAQ } from "@/lib/faq";
import { getConverterPageContent } from "@/lib/converterPageContent";
import { alternateLanguages, SITE_URL } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const locales = Object.keys(DICTIONARY);
type ConverterType = keyof typeof DICTIONARY.en.converters;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(DICTIONARY[locale as Locale].converters).map((converter) => ({
      locale,
      converter,
    })),
  );
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; converter: string }>;
}): Promise<Metadata> {
  const { locale, converter: converterQuery } = await params;

  const converter = converterQuery as ConverterType;

  const dict = DICTIONARY[locale as Locale];

  if (!dict) notFound();
  if (!(converter in dict.converters)) notFound();

  const page = dict.converters[converter as keyof typeof dict.converters];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/${converter}`,
      languages: alternateLanguages(locales, (l) => `/${l}/${converter}`),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${locale}/${converter}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; converter: string }>;
}) {
  const { locale, converter: converterQuery } = await params;

  const dict = DICTIONARY[locale as Locale];

  const converter = converterQuery as ConverterType;

  if (!dict) notFound();
  if (!(converter in dict.converters)) notFound();

  const page = dict.converters[converter as keyof typeof dict.converters];

  const faqs = FAQ.base[locale as Locale];
  const content = getConverterPageContent(converter, locale as Locale);

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <UploadForm
          title={page.title}
          defaultFormat={converter.split("-to-")[1]}
          hideFormatSelect
          locale={locale as Locale}
        />

        <YandexAdSlot placement={`converter-${converter}-after-form`} />

        <article className="content-article max-w-none">
          <h1>{page.h1}</h1>
          <p>{page.description}</p>

          <h2>{content.introTitle}</h2>
          <p>{content.introText}</p>

          <h2>{content.stepsTitle}</h2>
          <ol>
            {content.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2>{content.formatTitle}</h2>
          <div className="overflow-x-auto">
            <table>
              <tbody>
                {content.rows.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>{content.bestForTitle}</h2>
          <ul>
            {content.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{content.qualityTitle}</h2>
          <p>{content.qualityText}</p>

          <h2>{content.privacyTitle}</h2>
          <p>{content.privacyText}</p>

          <h2>{content.tipsTitle}</h2>
          <ul>
            {content.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <h2>{content.faqTitle}</h2>
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
                item: `${SITE_URL}/${locale}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: page.h1,
                item: `${SITE_URL}/${locale}/${converter}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
