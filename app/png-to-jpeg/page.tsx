import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import { BASE_FAQ } from "@/lib/faq";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "PNG в JPEG онлайн",
  description:
    "Конвертер PNG в JPEG онлайн. Уменьшите размер PNG-файлов быстро и бесплатно.",
  alternates: { canonical: "/png-to-jpeg" },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={BASE_FAQ} />

      <div className="flex flex-col gap-10">
        <UploadForm title="PNG → JPEG" defaultFormat="jpeg" hideFormatSelect />

        <article className="prose max-w-none">
          <h1>PNG в JPEG онлайн</h1>
          <p>
            JPEG обычно занимает меньше места, чем PNG. Это удобно для
            фотографий и изображений без прозрачности.
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
