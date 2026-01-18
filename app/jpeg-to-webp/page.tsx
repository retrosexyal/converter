import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPEG в WebP онлайн",
  description:
    "Конвертер JPEG в WebP онлайн. Оптимизируй изображения для сайта.",
  alternates: { canonical: "/jpeg-to-webp" },
};

export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1>JPEG в WebP онлайн</h1>
      <p>
        WebP часто даёт меньший вес, что ускоряет сайт. Это помогает улучшить
        показатели загрузки.
      </p>
      <p>
        <a href="/convert">Открыть конвертер</a>
      </p>
      <h2>Зачем WebP</h2>
      <ul>
        <li>меньше вес</li>
        <li>быстрее страницы</li>
      </ul>
    </article>
  );
}
