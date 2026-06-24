import type { Metadata } from "next";
import { DICTIONARY, Locale } from "@/dictionary";
import { TERMS_EXTRA } from "@/lib/legalContent";
import { alternateLanguages } from "@/lib/seo";
import { notFound } from "next/navigation";

const locales = Object.keys(DICTIONARY);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const dict = DICTIONARY[locale];

  if (!dict) notFound();
  const {
    terms: { metaTitle, metaDescription },
  } = dict;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/${locale}/terms`,
      languages: alternateLanguages(locales, (l) => `/${l}/terms`),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const dict = DICTIONARY[locale as Locale];

  if (!dict) notFound();

  const {
    terms: {
      h1,
      intro,
      usageTitle,
      usageText,
      responsibilityTitle,
      responsibilityText,
      changesTitle,
      changesText,
    },
  } = dict;
  const extraSections = TERMS_EXTRA[locale as Locale];

  return (
    <article className="content-article max-w-3xl mx-auto">
      <h1>{h1}</h1>

      <p>{intro}</p>

      <h2>{usageTitle}</h2>
      <p>{usageText}</p>

      <h2>{responsibilityTitle}</h2>
      <p>{responsibilityText}</p>

      <h2>{changesTitle}</h2>
      <p>{changesText}</p>

      {extraSections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.list && (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
