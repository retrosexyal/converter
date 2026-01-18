import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import FaqSchema from "@/components/FaqSchema";
import { BASE_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "WebP в JPEG онлайн",
  description:
    "Конвертер WebP в JPEG онлайн. Быстрое преобразование изображений в формат JPG.",
  alternates: { canonical: "/webp-to-jpeg" },
};

export default function Page() {
  return (
    <>
      <FaqSchema faqs={BASE_FAQ} />

      <div className="flex flex-col gap-10">
        <UploadForm title="WebP → JPEG" defaultFormat="jpeg" hideFormatSelect />

        <article className="prose max-w-none">
          <h1>WebP в JPEG онлайн</h1>
          <p>
            JPEG широко поддерживается всеми устройствами и программами.
            Конвертация из WebP позволяет легко использовать изображения где
            угодно.
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
