import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { FAQ, type Locale } from "@/lib/faq";
import { DICTIONARY } from "@/dictionary";

const locale: Locale = "en";

const {
  webpToJpeg: { metaTitle, metaDescription, title, h1, description },
} = DICTIONARY[locale];

const faqs = FAQ.base[locale];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: `/${locale}/webp-to-jpeg` },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <UploadForm title={title} defaultFormat="jpeg" hideFormatSelect locale={locale}/>

        <article className="prose max-w-none">
          <h1>{h1}</h1>
          <p>{description}</p>

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
    </>
  );
}
