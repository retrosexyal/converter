import type { Metadata } from "next";
import { DICTIONARY, Locale } from "@/dictionary";
import { CONTACT_EMAIL, PRIVACY_EXTRA } from "@/lib/legalContent";
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
    privacy: { metaTitle, metaDescription },
  } = dict;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: alternateLanguages(locales, (l) => `/${l}/privacy`),
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
    privacy: {
      h1,
      intro,
      filesTitle,
      filesText,
      cookiesTitle,
      cookiesText,
      contactsTitle,
      contactsText,
      telegramLabel,
    },
  } = dict;
  const extraSections = PRIVACY_EXTRA[locale as Locale];

  return (
    <article className="content-article max-w-3xl mx-auto">
      <h1>{h1}</h1>

      <p>{intro}</p>

      <h2>{filesTitle}</h2>
      <p>{filesText}</p>

      <h2>{cookiesTitle}</h2>
      <p>{cookiesText}</p>

      <h2>{contactsTitle}</h2>
      <p>
        {contactsText}
        <br />
        <a
          href="https://t.me/rocklobstar"
          target="_blank"
          rel="noopener noreferrer"
        >
          {telegramLabel}
        </a>
        <br />
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

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
