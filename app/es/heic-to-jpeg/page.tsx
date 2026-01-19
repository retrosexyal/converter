import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { FAQ } from "@/lib/faq";
import { DICTIONARY, type Locale } from "@/dictionary";

const locale: Locale = "es";
const faqs = FAQ.base[locale];
const {
  heicToJpeg: { metaTitle, metaDescription, title, h1, description },
} = DICTIONARY[locale];

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: `/${locale}/heic-to-jpeg` },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <UploadForm
          title={title}
          defaultFormat="jpeg"
          hideFormatSelect
          locale={locale}
        />

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
