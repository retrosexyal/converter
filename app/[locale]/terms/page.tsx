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
    terms: { metaTitle, metaDescription },
  } = dict;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `${locale}/terms` },
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

  return (
    <article className="prose max-w-3xl mx-auto">
      <h1>{h1}</h1>

      <p>{intro}</p>

      <h2>{usageTitle}</h2>
      <p>{usageText}</p>

      <h2>{responsibilityTitle}</h2>
      <p>{responsibilityText}</p>

      <h2>{changesTitle}</h2>
      <p>{changesText}</p>
    </article>
  );
}
