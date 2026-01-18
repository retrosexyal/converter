import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { DICTIONARY, type Locale } from "@/dictionary";
import { FAQ } from "@/lib/faq";

const locale: Locale = "en";
const faqs = FAQ.home[locale];
const {
  home: { metaTitle, metaDescription, h1, lead, cta, faqTitle },
} = DICTIONARY[locale];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: `/${locale}` },
};

export default function HomePage() {
  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{h1}</h1>

          <p className="text-neutral-700 max-w-2xl">{lead}</p>
        </section>

        <UploadForm title={cta} locale={locale} />

        <section className="prose max-w-none">
          <h2>{faqTitle}</h2>

          <ul>
            {faqs.map((f) => (
              <li key={f.question}>
                <strong>{f.question}</strong>
                <br />
                {f.answer}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
