import type { Locale } from "@/dictionary";

export const CONTACT_EMAIL = "retrosexyal@gmail.com";

export type LegalSection = {
  title: string;
  body: string[];
  list?: string[];
};

export const PRIVACY_EXTRA: Record<Locale, LegalSection[]> = {
  en: [
    {
      title: "File processing",
      body: [
        "FormatKit is designed for browser-based conversion whenever possible. Images and videos selected in the form are used to create the requested output file and are not published, indexed or made available to other users.",
        "Some formats depend on browser capabilities. If a browser cannot decode a file, the conversion may fail without uploading the file elsewhere.",
      ],
    },
    {
      title: "Cookies, advertising and third-party services",
      body: [
        "The site may use cookies and similar technologies for basic operation, advertising and measurement. Advertising partners, including Yandex Advertising Network, may process technical data such as page URL, device information, approximate region and ad interaction events.",
        "Third-party advertising systems can use their own cookies or identifiers according to their policies.",
      ],
    },
    {
      title: "Technical logs",
      body: [
        "Hosting and security systems may record standard technical information such as IP address, user agent, requested URL, time of request and error diagnostics. These logs are used for security, reliability and troubleshooting.",
      ],
    },
    {
      title: "Contact",
      body: [
        `For privacy questions, data requests or site-related issues, contact us at ${CONTACT_EMAIL}.`,
      ],
    },
  ],
  ru: [
    {
      title: "Обработка файлов",
      body: [
        "FormatKit по возможности выполняет конвертацию в браузере. Изображения и видео, выбранные в форме, используются только для создания результата и не публикуются, не индексируются и не становятся доступными другим пользователям.",
        "Поддержка отдельных форматов зависит от возможностей браузера. Если браузер не может прочитать файл, конвертация может завершиться ошибкой без передачи файла в стороннее хранилище.",
      ],
    },
    {
      title: "Cookies, реклама и сторонние сервисы",
      body: [
        "Сайт может использовать cookies и похожие технологии для базовой работы, рекламы и измерений. Рекламные партнеры, включая Рекламную сеть Яндекса, могут обрабатывать технические данные: URL страницы, сведения об устройстве, примерный регион и события взаимодействия с рекламой.",
        "Сторонние рекламные системы могут использовать собственные cookies или идентификаторы в соответствии со своими правилами.",
      ],
    },
    {
      title: "Технические журналы",
      body: [
        "Хостинг и системы безопасности могут записывать стандартную техническую информацию: IP-адрес, user agent, запрошенный URL, время запроса и данные об ошибках. Эти сведения используются для безопасности, стабильности и диагностики.",
      ],
    },
    {
      title: "Контакты",
      body: [
        `По вопросам конфиденциальности, запросам по данным и работе сайта пишите на ${CONTACT_EMAIL}.`,
      ],
    },
  ],
  es: [
    {
      title: "Procesamiento de archivos",
      body: [
        "FormatKit esta pensado para convertir archivos en el navegador siempre que sea posible. Las imagenes y videos seleccionados se usan para crear el archivo solicitado y no se publican, indexan ni comparten con otros usuarios.",
        "Algunos formatos dependen de las capacidades del navegador. Si el navegador no puede leer un archivo, la conversion puede fallar sin subirlo a otro almacenamiento.",
      ],
    },
    {
      title: "Cookies, publicidad y servicios de terceros",
      body: [
        "El sitio puede usar cookies y tecnologias similares para funcionamiento basico, publicidad y medicion. Socios publicitarios, incluida Yandex Advertising Network, pueden procesar datos tecnicos como URL, informacion del dispositivo, region aproximada e interacciones con anuncios.",
        "Los sistemas publicitarios de terceros pueden usar sus propias cookies o identificadores segun sus politicas.",
      ],
    },
    {
      title: "Registros tecnicos",
      body: [
        "Los sistemas de hosting y seguridad pueden registrar informacion tecnica estandar: direccion IP, user agent, URL solicitada, hora de solicitud y diagnostico de errores. Se usa para seguridad, estabilidad y resolucion de problemas.",
      ],
    },
    {
      title: "Contacto",
      body: [
        `Para preguntas de privacidad, solicitudes de datos o problemas del sitio, contacta con ${CONTACT_EMAIL}.`,
      ],
    },
  ],
  de: [
    {
      title: "Dateiverarbeitung",
      body: [
        "FormatKit ist nach Moeglichkeit fuer Konvertierung im Browser gebaut. Ausgewaehlte Bilder und Videos werden zur Erstellung der angeforderten Ausgabedatei verwendet und nicht veroeffentlicht, indexiert oder anderen Nutzern bereitgestellt.",
        "Einige Formate haengen von Browserfunktionen ab. Wenn der Browser eine Datei nicht lesen kann, kann die Konvertierung fehlschlagen, ohne die Datei in einen anderen Speicher hochzuladen.",
      ],
    },
    {
      title: "Cookies, Werbung und Drittanbieter",
      body: [
        "Die Website kann Cookies und aehnliche Technologien fuer Basisfunktionen, Werbung und Messung nutzen. Werbepartner, einschliesslich Yandex Advertising Network, koennen technische Daten wie Seiten-URL, Geraeteinformationen, ungefaehre Region und Anzeigeninteraktionen verarbeiten.",
        "Drittanbieter-Werbesysteme koennen eigene Cookies oder Kennungen gemaess ihren Richtlinien verwenden.",
      ],
    },
    {
      title: "Technische Logs",
      body: [
        "Hosting- und Sicherheitssysteme koennen technische Standardinformationen aufzeichnen: IP-Adresse, User-Agent, angeforderte URL, Zeitpunkt der Anfrage und Fehlerdiagnosen. Diese Daten werden fuer Sicherheit, Zuverlaessigkeit und Fehlerbehebung genutzt.",
      ],
    },
    {
      title: "Kontakt",
      body: [
        `Bei Datenschutzfragen, Datenanfragen oder Problemen mit der Website kontaktiere ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const TERMS_EXTRA: Record<Locale, LegalSection[]> = {
  en: [
    {
      title: "Acceptable use",
      body: [
        "You may use FormatKit for lawful image and video conversion tasks. You are responsible for the files you select and for ensuring that you have the right to process them.",
      ],
      list: [
        "Do not use the service to process illegal, harmful or infringing content.",
        "Do not attempt to overload, scan, reverse engineer or disrupt the service.",
        "Do not present converted files as proof of authenticity if they have been modified.",
      ],
    },
    {
      title: "No professional advice",
      body: [
        "FormatKit is a technical utility. It does not provide legal, medical, financial or other professional advice, and converted files should be checked before use in important workflows.",
      ],
    },
    {
      title: "Advertising",
      body: [
        "The site may display advertising. Ads are served by third-party systems and may be personalized according to their own rules and user settings.",
      ],
    },
    {
      title: "Contact",
      body: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
    },
  ],
  ru: [
    {
      title: "Допустимое использование",
      body: [
        "Вы можете использовать FormatKit для законной конвертации изображений и видео. Вы отвечаете за выбранные файлы и за наличие прав на их обработку.",
      ],
      list: [
        "Не используйте сервис для обработки незаконного, вредоносного или нарушающего права контента.",
        "Не пытайтесь перегружать, сканировать, модифицировать или нарушать работу сервиса.",
        "Не выдавайте измененные файлы за доказательство подлинности, если они были конвертированы или обработаны.",
      ],
    },
    {
      title: "Не является профессиональной консультацией",
      body: [
        "FormatKit является технической утилитой. Сервис не предоставляет юридические, медицинские, финансовые или иные профессиональные консультации, а результаты конвертации нужно проверять перед важным использованием.",
      ],
    },
    {
      title: "Реклама",
      body: [
        "На сайте может показываться реклама. Объявления обслуживаются сторонними системами и могут персонализироваться по их правилам и настройкам пользователя.",
      ],
    },
    {
      title: "Контакты",
      body: [`Вопросы по условиям использования можно отправить на ${CONTACT_EMAIL}.`],
    },
  ],
  es: [
    {
      title: "Uso aceptable",
      body: [
        "Puedes usar FormatKit para tareas legales de conversion de imagenes y videos. Eres responsable de los archivos seleccionados y de tener derecho a procesarlos.",
      ],
      list: [
        "No uses el servicio para procesar contenido ilegal, danino o infractor.",
        "No intentes sobrecargar, escanear, modificar o interrumpir el servicio.",
        "No presentes archivos modificados como prueba de autenticidad si fueron convertidos o procesados.",
      ],
    },
    {
      title: "Sin asesoramiento profesional",
      body: [
        "FormatKit es una utilidad tecnica. No proporciona asesoramiento legal, medico, financiero u otro asesoramiento profesional, y los archivos convertidos deben revisarse antes de usos importantes.",
      ],
    },
    {
      title: "Publicidad",
      body: [
        "El sitio puede mostrar publicidad. Los anuncios se sirven mediante sistemas de terceros y pueden personalizarse segun sus reglas y la configuracion del usuario.",
      ],
    },
    {
      title: "Contacto",
      body: [`Las preguntas sobre estos terminos pueden enviarse a ${CONTACT_EMAIL}.`],
    },
  ],
  de: [
    {
      title: "Zulaessige Nutzung",
      body: [
        "Du kannst FormatKit fuer rechtmaessige Bild- und Videokonvertierung verwenden. Du bist fuer die ausgewaehlten Dateien verantwortlich und musst das Recht haben, sie zu verarbeiten.",
      ],
      list: [
        "Nutze den Dienst nicht fuer illegale, schaedliche oder rechtsverletzende Inhalte.",
        "Versuche nicht, den Dienst zu ueberlasten, zu scannen, zu veraendern oder zu stoeren.",
        "Stelle veraenderte Dateien nicht als Echtheitsnachweis dar, wenn sie konvertiert oder bearbeitet wurden.",
      ],
    },
    {
      title: "Keine professionelle Beratung",
      body: [
        "FormatKit ist ein technisches Werkzeug. Der Dienst bietet keine rechtliche, medizinische, finanzielle oder andere professionelle Beratung. Konvertierte Dateien sollten vor wichtigen Arbeitsablaeufen geprueft werden.",
      ],
    },
    {
      title: "Werbung",
      body: [
        "Die Website kann Werbung anzeigen. Anzeigen werden durch Drittanbieter-Systeme ausgeliefert und koennen nach deren Regeln und Nutzereinstellungen personalisiert werden.",
      ],
    },
    {
      title: "Kontakt",
      body: [`Fragen zu diesen Bedingungen koennen an ${CONTACT_EMAIL} gesendet werden.`],
    },
  ],
};
