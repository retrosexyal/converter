import type { Metadata } from "next";
import type { Locale } from "@/lib/faq";
import { DICTIONARY } from "@/dictionary";

const locale: Locale = "ru";

const {
  privacy: {
    metaTitle,
    metaDescription,
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
} = DICTIONARY[locale];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/privacy" },
};

export default function Page() {
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
