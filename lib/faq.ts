export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ = {
  home: {
    ru: [
      {
        question: "Как работает онлайн конвертер изображений?",
        answer:
          "Вы загружаете изображение, выбираете нужный выходной формат и сразу скачиваете готовый файл. Установка программ не требуется.",
      },
      {
        question: "Какие форматы изображений поддерживаются?",
        answer:
          "Сервис поддерживает изображения JPG (JPEG), PNG, WebP, AVIF, HEIC, TIFF и GIF. Вы можете конвертировать файл в один из доступных выходных форматов.",
      },
      {
        question: "Поддерживается ли формат HEIC (iPhone)?",
        answer:
          "Да, формат HEIC поддерживается. Обратите внимание, что его обработка может зависеть от технических возможностей сервера.",
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
        question: "Можно ли пользоваться сервисом на мобильных устройствах?",
        answer:
          "Да. Конвертер полностью адаптирован для смартфонов и планшетов.",
      },
    ],

    en: [
      {
        question: "How does the online image converter work?",
        answer:
          "You upload an image, choose the desired output format, and download the converted file instantly. No software installation required.",
      },
      {
        question: "Which image formats are supported?",
        answer:
          "The service supports images in JPG (JPEG), PNG, WebP, AVIF, HEIC, TIFF, and GIF formats. You can convert files to any supported output format.",
      },
      {
        question: "Is HEIC (iPhone) format supported?",
        answer:
          "Yes, HEIC images are supported. Availability may depend on the technical capabilities of the server.",
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
    es: [
      {
        question: "¿Cómo funciona el convertidor de imágenes online?",
        answer:
          "Subes una imagen, eliges el formato de salida deseado y descargas el archivo convertido al instante. No es necesario instalar ningún software.",
      },
      {
        question: "¿Qué formatos de imagen son compatibles?",
        answer:
          "El servicio admite imágenes en formatos JPG (JPEG), PNG, WebP, AVIF, HEIC, TIFF y GIF. Puedes convertir los archivos a cualquier formato de salida compatible.",
      },
      {
        question: "¿Es compatible el formato HEIC (iPhone)?",
        answer:
          "Sí, las imágenes HEIC son compatibles. La disponibilidad puede depender de las capacidades técnicas del servidor.",
      },
      {
        question: "¿Es seguro utilizar el servicio?",
        answer:
          "Sí. Las imágenes subidas se utilizan únicamente para la conversión y no se almacenan en el servidor.",
      },
      {
        question: "¿Necesito registrarme?",
        answer:
          "No. La conversión está disponible de forma gratuita y sin necesidad de registro.",
      },
      {
        question: "¿Puedo usar el servicio en dispositivos móviles?",
        answer:
          "Sí. El convertidor está totalmente optimizado para smartphones y tabletas.",
      },
    ],
  },

  base: {
    ru: [
      {
        question: "Как работает онлайн конвертер изображений?",
        answer:
          "Вы загружаете изображение, выбираете выходной формат и скачиваете готовый файл. Конвертация происходит автоматически.",
      },
      {
        question: "Какие форматы изображений поддерживаются?",
        answer:
          "Поддерживаются форматы JPG (JPEG), PNG, WebP, AVIF, HEIC, TIFF и GIF.",
      },
      {
        question: "Безопасно ли загружать изображения?",
        answer:
          "Да. Файлы используются только для конвертации и не сохраняются на сервере.",
      },
      {
        question: "Нужно ли регистрироваться?",
        answer:
          "Нет, регистрация не требуется. Конвертация доступна бесплатно.",
      },
    ],

    en: [
      {
        question: "How does the online image converter work?",
        answer:
          "You upload an image, select the desired output format, and download the converted file. The process is fully automatic.",
      },
      {
        question: "Which image formats are supported?",
        answer:
          "Supported formats include JPG (JPEG), PNG, WebP, AVIF, HEIC, TIFF, and GIF.",
      },
      {
        question: "Is it safe to upload images?",
        answer:
          "Yes. Files are used only for conversion and are not stored on the server.",
      },
      {
        question: "Do I need to sign up?",
        answer: "No registration is required. Conversion is free to use.",
      },
    ],
    es: [
      {
        question: "¿Cómo funciona el convertidor de imágenes online?",
        answer:
          "Subes una imagen, seleccionas el formato de salida deseado y descargas el archivo convertido. El proceso es completamente automático.",
      },
      {
        question: "¿Qué formatos de imagen son compatibles?",
        answer:
          "Los formatos compatibles incluyen JPG (JPEG), PNG, WebP, AVIF, HEIC, TIFF y GIF.",
      },
      {
        question: "¿Es seguro subir imágenes?",
        answer:
          "Sí. Los archivos se utilizan únicamente para la conversión y no se almacenan en el servidor.",
      },
      {
        question: "¿Necesito registrarme?",
        answer: "No es necesario registrarse. La conversión es gratuita.",
      },
    ],
  },
} as const;
