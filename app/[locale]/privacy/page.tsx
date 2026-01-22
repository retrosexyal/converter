import type { Metadata } from "next";
import { DICTIONARY, Locale } from "@/dictionary";
import { notFound } from "next/navigation";

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
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const dict = DICTIONARY[locale];

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

  return (
    <article className="prose max-w-3xl mx-auto">
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
      </p>
    </article>
  );
}
