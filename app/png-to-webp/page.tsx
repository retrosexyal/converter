import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { BASE_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "PNG в WebP онлайн",
  description: "Конвертер PNG в WebP онлайн. Загрузите PNG и получите WebP.",
  alternates: { canonical: "/png-to-webp" },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={BASE_FAQ} />

      <div className="flex flex-col gap-10">
        <UploadForm title="PNG → WebP" defaultFormat="webp" hideFormatSelect />

        <article className="prose max-w-none">
          <h1>PNG в WebP онлайн</h1>
          <p>
            WebP обычно уменьшает размер изображения без заметной потери
            качества — удобно для сайтов и скорости загрузки.
          </p>
          <ul>
            {BASE_FAQ.map((f) => (
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
