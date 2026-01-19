import type { Metadata } from "next";
import { DICTIONARY, type Locale } from "@/dictionary";

const locale: Locale = "ru";

const {
  terms: {
    metaTitle,
    metaDescription,
    h1,
    intro,
    usageTitle,
    usageText,
    responsibilityTitle,
    responsibilityText,
    changesTitle,
    changesText,
  },
} = DICTIONARY[locale];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/terms" },
};

export default function Page() {
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
