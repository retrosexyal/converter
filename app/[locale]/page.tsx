import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { DICTIONARY, type Locale } from "@/dictionary";
import { FAQ } from "@/lib/faq";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = DICTIONARY[locale as Locale];

  if (!dict) notFound();

  const {
    home: { metaTitle, metaDescription },
  } = dict;
  return { title: metaTitle, description: metaDescription };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const dict = DICTIONARY[locale as Locale];

  if (!dict) notFound();

  const {
    home: { h1, lead, cta, faqTitle },
  } = dict;
  const faqs = FAQ.home[locale as Locale];

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{h1}</h1>

          <p className="text-neutral-700 max-w-2xl">{lead}</p>
        </section>

        <UploadForm title={cta} locale={locale as Locale} />

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
