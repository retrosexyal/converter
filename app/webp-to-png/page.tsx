import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebP в PNG онлайн",
  description:
    "Конвертер WebP в PNG онлайн. Быстрое преобразование без регистрации.",
  alternates: { canonical: "/webp-to-png" },
};

export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1>WebP в PNG онлайн</h1>
      <p>
        Нужно преобразовать WebP в PNG? Используй наш конвертер: загрузка →
        выбор формата → скачивание.
      </p>
      <p>
        <a href="/convert">Открыть конвертер</a>
      </p>
      <h2>Когда нужен PNG</h2>
      <ul>
        <li>нужна прозрачность и совместимость</li>
        <li>редакторы/сервисы не принимают WebP</li>
      </ul>
    </article>
  );
}
