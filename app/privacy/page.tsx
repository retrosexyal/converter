import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности онлайн конвертера изображений.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <article className="prose max-w-3xl mx-auto">
      <h1>Политика конфиденциальности</h1>

      <p>
        Мы уважаем вашу конфиденциальность и не сохраняем загружаемые
        изображения.
      </p>

      <h2>Файлы</h2>
      <p>
        Загруженные изображения используются исключительно для конвертации и
        автоматически удаляются.
      </p>

      <h2>Cookies и реклама</h2>
      <p>
        Сайт может использовать сторонние рекламные сервисы, которые применяют
        cookies для показа релевантной рекламы.
      </p>

      <h2>Контакты</h2>
      <p>
        По всем вопросам вы можете связаться с нами через телеграм
        <br />
        <a
          href="https://t.me/rocklobstar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram: @Rocklobstar
        </a>
      </p>
    </article>
  );
}
