import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { BASE_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "WebP в PNG онлайн",
  description:
    "Конвертер WebP в PNG онлайн. Загрузите WebP и получите PNG без потери качества.",
  alternates: { canonical: "/webp-to-png" },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={BASE_FAQ} />

      <div className="flex flex-col gap-10">
        <UploadForm title="WebP → PNG" defaultFormat="png" hideFormatSelect />

        <article className="prose max-w-none">
          <h1>WebP в PNG онлайн</h1>
          <p>
            PNG подходит для изображений с прозрачностью и без потерь качества.
            Конвертация из WebP занимает всего несколько секунд.
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
