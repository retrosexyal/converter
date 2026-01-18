import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { BASE_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "JPEG в PNG онлайн",
  description:
    "Конвертер JPEG в PNG онлайн. Получите PNG с поддержкой прозрачности.",
  alternates: { canonical: "/jpeg-to-png" },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={BASE_FAQ} />

      <div className="flex flex-col gap-10">
        <UploadForm title="JPEG → PNG" defaultFormat="png" hideFormatSelect />

        <article className="prose max-w-none">
          <h1>JPEG в PNG онлайн</h1>
          <p>
            PNG поддерживает прозрачность и не использует сжатие с потерями.
            Подходит для логотипов и графики.
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
