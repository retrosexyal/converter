export type FaqItem = {
  question: string;
  answer: string;
};

export type Locale = "ru" | "en";

export const FAQ = {
  home: {
    ru: [
      {
        question: "Как работает онлайн конвертер изображений?",
        answer:
          "Вы загружаете изображение, выбираете нужный формат и сразу скачиваете готовый файл. Установка программ не требуется.",
      },
      {
        question: "Какие форматы изображений поддерживаются?",
        answer:
          "Сервис поддерживает конвертацию между WebP, PNG и JPEG во всех направлениях.",
      },
      {
        question: "Безопасно ли использовать сервис?",
        answer:
          "Да. Загруженные изображения используются только для конвертации и не сохраняются на сервере.",
      },
      {
        question: "Нужно ли регистрироваться?",
        answer: "Нет. Конвертация доступна бесплатно и без регистрации.",
      },
      {
        question: "Можно ли использовать сервис на мобильных устройствах?",
        answer:
          "Да. Конвертер полностью адаптирован для смартфонов и планшетов.",
      },
    ],

    en: [
      {
        question: "How does the online image converter work?",
        answer:
          "You upload an image, choose the desired format, and download the converted file instantly. No software installation required.",
      },
      {
        question: "Which image formats are supported?",
        answer:
          "The service supports conversion between WebP, PNG, and JPEG in all directions.",
      },
      {
        question: "Is it safe to use the service?",
        answer:
          "Yes. Uploaded images are used only for conversion and are not stored on the server.",
      },
      {
        question: "Do I need to register?",
        answer:
          "No. Conversion is available for free and without registration.",
      },
      {
        question: "Can I use the service on mobile devices?",
        answer:
          "Yes. The converter is fully optimized for smartphones and tablets.",
      },
    ],
  },

  base: {
    ru: [
      {
        question: "Как работает онлайн конвертер изображений?",
        answer:
          "Вы загружаете изображение, выбираете нужный формат и скачиваете готовый файл. Конвертация происходит автоматически.",
      },
      {
        question: "Поддерживаются ли форматы WebP, PNG и JPEG?",
        answer:
          "Да, сервис поддерживает конвертацию между WebP, PNG и JPEG во всех направлениях.",
      },
      {
        question: "Безопасно ли загружать изображения?",
        answer:
          "Да. Файлы используются только для конвертации и не сохраняются на сервере.",
      },
      {
        question: "Нужно ли регистрироваться?",
        answer:
          "Нет, регистрация не требуется. Конвертация доступна бесплатно и без ограничений.",
      },
    ],

    en: [
      {
        question: "How does the online image converter work?",
        answer:
          "You upload an image, select the desired format, and download the converted file. The process is fully automatic.",
      },
      {
        question: "Are WebP, PNG, and JPEG formats supported?",
        answer:
          "Yes, the service supports conversion between WebP, PNG, and JPEG in all directions.",
      },
      {
        question: "Is it safe to upload images?",
        answer:
          "Yes. Files are used only for conversion and are not stored on the server.",
      },
      {
        question: "Do I need to sign up?",
        answer:
          "No registration is required. Conversion is free and unlimited.",
      },
    ],
  },
} as const;
