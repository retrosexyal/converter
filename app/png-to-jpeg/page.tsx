import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG в JPEG онлайн",
  description: "Конвертер PNG в JPEG онлайн. Уменьшай вес изображений быстро.",
  alternates: { canonical: "/png-to-jpeg" },
};

export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1>PNG в JPEG онлайн</h1>
      <p>
        Конвертация PNG в JPEG полезна, когда прозрачность не нужна и важно уменьшить размер файла.
      </p>
      <p>
        <a href="/convert">Открыть конвертер</a>
      </p>
      <h2>Преимущества JPEG</h2>
      <ul>
        <li>обычно меньше вес для фото</li>
        <li>широкая поддержка</li>
      </ul>
    </article>
  );
}
