import type { Locale } from "@/dictionary";

type ConverterPageContent = {
  introTitle: string;
  introText: string;
  stepsTitle: string;
  steps: string[];
  formatTitle: string;
  rows: Array<{ label: string; value: string }>;
  bestForTitle: string;
  bestFor: string[];
  qualityTitle: string;
  qualityText: string;
  privacyTitle: string;
  privacyText: string;
  tipsTitle: string;
  tips: string[];
  extraSections: Array<{ title: string; body?: string[]; bullets?: string[] }>;
  faqTitle: string;
};

type FormatProfile = {
  transparency: boolean;
  compression: "lossy" | "lossless" | "mixed" | "document" | "icon";
  compatibility: "excellent" | "good" | "modern" | "limited" | "special";
};

const FORMAT_PROFILES: Record<string, FormatProfile> = {
  jpeg: {
    transparency: false,
    compression: "lossy",
    compatibility: "excellent",
  },
  jpg: {
    transparency: false,
    compression: "lossy",
    compatibility: "excellent",
  },
  png: {
    transparency: true,
    compression: "lossless",
    compatibility: "excellent",
  },
  webp: {
    transparency: true,
    compression: "mixed",
    compatibility: "good",
  },
  avif: {
    transparency: true,
    compression: "mixed",
    compatibility: "modern",
  },
  heic: {
    transparency: true,
    compression: "mixed",
    compatibility: "limited",
  },
  pdf: {
    transparency: false,
    compression: "document",
    compatibility: "excellent",
  },
  ico: {
    transparency: true,
    compression: "icon",
    compatibility: "special",
  },
  image: {
    transparency: true,
    compression: "mixed",
    compatibility: "good",
  },
};

const EN_CONVERTER_EXTRA: Record<
  string,
  Array<{ title: string; body?: string[]; bullets?: string[] }>
> = {
  "webp-to-jpeg": [
    {
      title: "When to use WebP to JPG",
      body: [
        "Use JPG when a WebP image needs to work in older apps, upload forms, email clients or devices that do not accept WebP. JPEG is also a practical choice for photos where broad compatibility matters more than transparency.",
      ],
    },
    {
      title: "Transparency and background color",
      body: [
        "JPEG does not support transparency. If your WebP file has transparent pixels, the converter flattens them onto the selected background color before export. White is the safest default for documents, marketplaces and most sharing workflows.",
      ],
    },
    {
      title: "Quality and compression tips",
      bullets: [
        "Use a higher quality value for portraits, product images and gradients.",
        "Use a lower value when the smallest possible file is more important than fine detail.",
        "Choose PNG instead of JPG when you need a transparent result or sharp interface graphics.",
      ],
    },
    {
      title: "Common problems and fixes",
      bullets: [
        "If the output has a white background, the source image probably used transparency that JPEG cannot preserve.",
        "If an app rejects WebP, JPG is usually the most compatible fallback.",
        "If sharp edges look fuzzy, try WebP to PNG instead.",
      ],
    },
  ],
  "webp-to-png": [
    {
      title: "When to use WebP to PNG",
      body: [
        "Use PNG when you need a lossless file, transparent background, or compatibility with design tools and editors that prefer PNG over WebP.",
      ],
    },
    {
      title: "Transparency handling",
      body: [
        "PNG supports alpha transparency, so transparent WebP images can keep transparent areas in the output when the browser decodes the source correctly.",
      ],
    },
    {
      title: "Quality and file size",
      bullets: [
        "PNG is lossless and often larger than WebP.",
        "Use PNG for logos, screenshots and UI graphics.",
        "Use JPG or WebP for photos when smaller file size matters more.",
      ],
    },
    {
      title: "Common problems and fixes",
      bullets: [
        "If the file becomes larger, that is normal for lossless PNG output.",
        "If transparency is missing, check whether the original WebP actually contains transparent pixels.",
      ],
    },
  ],
  "png-to-webp": [
    {
      title: "When to use PNG to WebP",
      body: [
        "Use WebP for website images, blog graphics, product photos and UI assets that need smaller file sizes while keeping good visual quality.",
      ],
    },
    {
      title: "Transparency support",
      body: [
        "WebP supports transparency, so PNG logos and interface graphics can keep transparent backgrounds when exported by a compatible browser.",
      ],
    },
    {
      title: "Why WebP can reduce file size",
      body: [
        "PNG uses lossless compression, which is excellent for sharp graphics but can be heavy for photos or complex screenshots. WebP can use modern compression to reduce file size while keeping the image visually close to the original.",
      ],
    },
    {
      title: "Quality recommendations",
      bullets: [
        "Try 80-90 quality for product images and most website graphics.",
        "Use PNG when you need pixel-perfect lossless output.",
        "Compare the result visually before replacing important production assets.",
      ],
    },
  ],
  "heic-to-jpeg": [
    {
      title: "When to convert iPhone HEIC photos to JPG",
      body: [
        "Convert HEIC to JPG when a website, form, desktop app or recipient cannot open iPhone photos. JPEG is widely accepted by email clients, social platforms, editors and older devices.",
      ],
    },
    {
      title: "Compatibility and quality",
      body: [
        "JPEG uses lossy compression, so the result may be smaller and easier to share. Use a higher quality setting when the photo contains faces, text, or details that need to remain clear.",
      ],
    },
    {
      title: "HEIC support limitations",
      bullets: [
        "HEIC decoding depends on the browser and operating system.",
        "If your browser cannot read the file, export the photo as JPEG from the iPhone Photos app and try again.",
        "Keep the original HEIC file until you have checked the converted JPG.",
      ],
    },
  ],
  "image-to-ico": [
    {
      title: "When to use .ico",
      body: [
        "Use ICO when you need a classic favicon file for browser tabs, bookmarks, older browsers or simple website setups that look for favicon.ico.",
      ],
    },
    {
      title: "Favicon sizes",
      body: [
        "Classic favicon ICO files commonly include 16x16, 32x32 and 48x48 icon sizes. FormatKit creates a compact icon output from your source image for basic browser favicon use.",
      ],
    },
    {
      title: "ICO vs PNG icons",
      body: [
        "PNG favicons are common on modern websites and can be referenced directly in HTML. ICO is still useful as a compatibility format because one .ico file can be used by browsers and legacy systems that expect it.",
      ],
    },
    {
      title: "Basic website favicon usage",
      bullets: [
        "Use a simple, square source image with enough contrast.",
        "Place favicon.ico in the site root or reference it with a rel=\"icon\" link.",
        "Check the icon at small sizes before publishing.",
      ],
    },
  ],
  "webp-to-pdf": [
    {
      title: "When to convert WebP to PDF",
      body: [
        "Use PDF when WebP images need to be shared as a document, printed, archived or attached to a workflow that accepts PDFs more reliably than separate image files.",
      ],
    },
    {
      title: "Multiple images and batch download",
      body: [
        "When several files are selected, FormatKit processes them as a batch and packages multiple outputs for download. This is useful for screenshots, receipts and visual notes.",
      ],
    },
    {
      title: "Quality and layout tips",
      bullets: [
        "Keep originals until you confirm the PDF opens correctly.",
        "Use JPG or PNG output instead when you need editable image files.",
        "For print workflows, start with the highest-resolution WebP source available.",
      ],
    },
  ],
};

const COPY = {
  en: {
    anyImage: "image",
    introTitle: (source: string, target: string) =>
      `What happens when you convert ${source} to ${target}`,
    introText: (source: string, target: string) =>
      `This page prepares ${source} files for ${target} output. The converter decodes the source image, redraws it on a clean canvas and exports a new file in the selected format. This is useful when you need a file that opens in more apps, loads faster on a website, or fits a specific publishing workflow.`,
    stepsTitle: "Conversion workflow",
    steps: (source: string, target: string) => [
      `Upload one or several ${source} files with the form above.`,
      `The browser reads the image data and checks that the file type is supported.`,
      `FormatKit creates a new ${target} file and keeps the original file unchanged.`,
      "Download the result immediately after processing.",
    ],
    formatTitle: "Format details",
    labels: {
      input: "Input format",
      output: "Output format",
      transparency: "Transparency",
      compression: "Compression",
      compatibility: "Compatibility",
    },
    bool: { yes: "Supported", no: "Not supported in the output" },
    compression: {
      lossy: "Lossy compression for smaller photo files",
      lossless: "Lossless compression for sharp graphics",
      mixed: "Modern compression; browser support can affect export",
      document: "Document output for sharing, printing and archiving",
      icon: "Icon container for favicons and browser tabs",
    },
    compatibility: {
      excellent: "Excellent support across browsers, apps and devices",
      good: "Good support in current browsers and image tools",
      modern: "Best in modern browsers and image pipelines",
      limited: "May require newer software or browser support",
      special: "Designed for a specific publishing use case",
    },
    bestForTitle: (target: string) => `Best uses for ${target}`,
    targetUses: {
      jpeg: [
        "Sharing photos with users who need maximum compatibility.",
        "Reducing file size for product images and email attachments.",
        "Creating files that open in almost every editor and viewer.",
      ],
      png: [
        "Keeping transparent backgrounds for logos and interface graphics.",
        "Exporting screenshots, diagrams and text-heavy graphics.",
        "Avoiding visible artifacts around sharp edges.",
      ],
      webp: [
        "Publishing lighter images on websites and landing pages.",
        "Keeping good quality while reducing bandwidth usage.",
        "Preparing image assets for modern browsers.",
      ],
      avif: [
        "Creating very compact images for performance-focused websites.",
        "Testing next-generation image delivery.",
        "Reducing large photo libraries where modern browser support is acceptable.",
      ],
      pdf: [
        "Turning images into a portable document.",
        "Sending scans, receipts or visual notes as a single file.",
        "Preparing image-based files for printing or archiving.",
      ],
      ico: [
        "Creating a browser favicon from a logo or source image.",
        "Preparing a small website icon for tabs and bookmarks.",
        "Testing how a simplified image works at icon size.",
      ],
    },
    qualityTitle: "Quality and limitations",
    qualityText: (source: string, target: string) =>
      `The ${target} result depends on the original ${source} file and the export support in your browser. If a browser cannot decode or export a format, try PNG, JPEG or WebP as a more widely supported alternative.`,
    privacyTitle: "File privacy",
    privacyText:
      "Conversion is designed to run in the browser whenever possible. Files are used only for the requested operation and are not published as a public archive.",
    tipsTitle: "Practical tips",
    faqTitle: "FAQ",
    tips: (source: string, target: string) => [
      `Keep the original ${source} file until you have checked the downloaded ${target} result.`,
      "Use PNG when you need transparency and JPEG when compatibility matters most.",
      "For websites, compare WebP and AVIF output visually before replacing production images.",
    ],
  },
  ru: {
    anyImage: "изображение",
    introTitle: (source: string, target: string) =>
      `Что происходит при конвертации ${source} в ${target}`,
    introText: (source: string, target: string) =>
      `Эта страница готовит файлы ${source} к сохранению в формате ${target}. Конвертер читает исходное изображение, переносит его на чистый canvas и создает новый файл в выбранном формате. Это удобно, когда нужен файл для публикации на сайте, отправки, печати или открытия в другой программе.`,
    stepsTitle: "Как проходит конвертация",
    steps: (source: string, target: string) => [
      `Загрузите один или несколько файлов ${source} через форму выше.`,
      "Браузер проверит тип файла и прочитает данные изображения.",
      `FormatKit создаст новый файл ${target}, не изменяя исходник.`,
      "Скачайте результат сразу после обработки.",
    ],
    formatTitle: "Свойства формата",
    labels: {
      input: "Исходный формат",
      output: "Выходной формат",
      transparency: "Прозрачность",
      compression: "Сжатие",
      compatibility: "Совместимость",
    },
    bool: { yes: "Поддерживается", no: "Не поддерживается в результате" },
    compression: {
      lossy: "Сжатие с потерями для уменьшения размера фотографий",
      lossless: "Сжатие без потерь для четкой графики",
      mixed: "Современное сжатие; экспорт зависит от возможностей браузера",
      document: "Документ для отправки, печати и архивации",
      icon: "Контейнер иконки для favicon и вкладок браузера",
    },
    compatibility: {
      excellent: "Отличная поддержка в браузерах, приложениях и устройствах",
      good: "Хорошая поддержка в современных браузерах и редакторах",
      modern: "Лучше всего подходит для современных браузеров и пайплайнов",
      limited: "Может требовать новое ПО или поддержку браузера",
      special: "Формат для конкретного сценария публикации",
    },
    bestForTitle: (target: string) => `Когда использовать ${target}`,
    targetUses: {
      jpeg: [
        "Когда нужна максимальная совместимость фотографий.",
        "Для уменьшения размера изображений товаров и вложений в письмах.",
        "Для файлов, которые должны открываться почти в любом просмотрщике.",
      ],
      png: [
        "Для логотипов, интерфейсной графики и прозрачного фона.",
        "Для скриншотов, схем и изображений с текстом.",
        "Когда важно избежать артефактов вокруг четких линий.",
      ],
      webp: [
        "Для более легких изображений на сайтах и лендингах.",
        "Когда нужно снизить трафик без заметной потери качества.",
        "Для подготовки ассетов под современные браузеры.",
      ],
      avif: [
        "Для очень компактных изображений на производительных сайтах.",
        "Для тестирования современных форматов доставки картинок.",
        "Когда важен минимальный размер и подходит современная поддержка.",
      ],
      pdf: [
        "Чтобы превратить изображение в переносимый документ.",
        "Для отправки сканов, чеков или визуальных заметок одним файлом.",
        "Для подготовки изображений к печати или архивированию.",
      ],
      ico: [
        "Для создания favicon из логотипа или исходного изображения.",
        "Для маленькой иконки сайта во вкладках и закладках.",
        "Чтобы проверить, как изображение выглядит в размере иконки.",
      ],
    },
    qualityTitle: "Качество и ограничения",
    qualityText: (source: string, target: string) =>
      `Результат ${target} зависит от исходного файла ${source} и поддержки экспорта в вашем браузере. Если браузер не может прочитать или сохранить конкретный формат, попробуйте PNG, JPEG или WebP как более совместимый вариант.`,
    privacyTitle: "Конфиденциальность файлов",
    privacyText:
      "Конвертация по возможности выполняется в браузере. Файлы используются только для выбранной операции и не публикуются как открытый архив.",
    tipsTitle: "Практические советы",
    faqTitle: "Вопросы и ответы",
    tips: (source: string, target: string) => [
      `Сохраняйте исходный файл ${source}, пока не проверите скачанный ${target}.`,
      "Используйте PNG для прозрачности, а JPEG для максимальной совместимости.",
      "Для сайта сравните WebP и AVIF визуально перед заменой рабочих изображений.",
    ],
  },
  es: {
    anyImage: "imagen",
    introTitle: (source: string, target: string) =>
      `Que ocurre al convertir ${source} a ${target}`,
    introText: (source: string, target: string) =>
      `Esta pagina prepara archivos ${source} para salida ${target}. El convertidor lee la imagen, la dibuja en un canvas limpio y exporta un archivo nuevo en el formato elegido. Es util para publicar en la web, enviar archivos o abrirlos en otras aplicaciones.`,
    stepsTitle: "Flujo de conversion",
    steps: (source: string, target: string) => [
      `Sube uno o varios archivos ${source} con el formulario superior.`,
      "El navegador comprueba el tipo de archivo y lee los datos de la imagen.",
      `FormatKit crea un nuevo archivo ${target} sin modificar el original.`,
      "Descarga el resultado cuando termine el procesamiento.",
    ],
    formatTitle: "Detalles del formato",
    labels: {
      input: "Formato de entrada",
      output: "Formato de salida",
      transparency: "Transparencia",
      compression: "Compresion",
      compatibility: "Compatibilidad",
    },
    bool: { yes: "Compatible", no: "No disponible en la salida" },
    compression: {
      lossy: "Compresion con perdida para fotos mas ligeras",
      lossless: "Compresion sin perdida para graficos nitidos",
      mixed: "Compresion moderna; la exportacion depende del navegador",
      document: "Documento para compartir, imprimir y archivar",
      icon: "Contenedor de icono para favicons y pestanas",
    },
    compatibility: {
      excellent: "Excelente soporte en navegadores, apps y dispositivos",
      good: "Buen soporte en navegadores y herramientas actuales",
      modern: "Mejor para navegadores y flujos modernos",
      limited: "Puede requerir software reciente o soporte del navegador",
      special: "Pensado para un caso de publicacion especifico",
    },
    bestForTitle: (target: string) => `Usos recomendados para ${target}`,
    targetUses: {
      jpeg: [
        "Compartir fotos con maxima compatibilidad.",
        "Reducir el tamano de imagenes de producto y adjuntos.",
        "Crear archivos que abren en casi cualquier visor.",
      ],
      png: [
        "Mantener fondos transparentes en logos e interfaces.",
        "Exportar capturas, diagramas y graficos con texto.",
        "Evitar artefactos alrededor de bordes definidos.",
      ],
      webp: [
        "Publicar imagenes mas ligeras en sitios web.",
        "Mantener buena calidad con menos ancho de banda.",
        "Preparar recursos para navegadores modernos.",
      ],
      avif: [
        "Crear imagenes muy compactas para sitios rapidos.",
        "Probar entrega de imagenes de nueva generacion.",
        "Reducir bibliotecas de fotos si el soporte moderno es aceptable.",
      ],
      pdf: [
        "Convertir imagenes en un documento portable.",
        "Enviar escaneos, recibos o notas visuales como un archivo.",
        "Preparar imagenes para imprimir o archivar.",
      ],
      ico: [
        "Crear un favicon desde un logo o imagen.",
        "Preparar un icono pequeno para pestanas y marcadores.",
        "Comprobar como funciona una imagen simplificada como icono.",
      ],
    },
    qualityTitle: "Calidad y limitaciones",
    qualityText: (source: string, target: string) =>
      `El resultado ${target} depende del archivo ${source} original y del soporte de exportacion del navegador. Si un formato falla, prueba PNG, JPEG o WebP como alternativa mas compatible.`,
    privacyTitle: "Privacidad de archivos",
    privacyText:
      "La conversion esta pensada para ejecutarse en el navegador siempre que sea posible. Los archivos se usan solo para la operacion solicitada y no se publican como archivo abierto.",
    tipsTitle: "Consejos practicos",
    faqTitle: "Preguntas frecuentes",
    tips: (source: string, target: string) => [
      `Conserva el archivo ${source} original hasta revisar el ${target} descargado.`,
      "Usa PNG si necesitas transparencia y JPEG si importa la compatibilidad.",
      "Para sitios web, compara WebP y AVIF visualmente antes de reemplazar imagenes.",
    ],
  },
  de: {
    anyImage: "Bild",
    introTitle: (source: string, target: string) =>
      `Was bei der Konvertierung von ${source} zu ${target} passiert`,
    introText: (source: string, target: string) =>
      `Diese Seite bereitet ${source}-Dateien fuer die Ausgabe als ${target} vor. Der Konverter liest das Quellbild, zeichnet es auf ein sauberes Canvas und exportiert eine neue Datei im gewaehlten Format. Das ist nuetzlich fuer Webseiten, Versand, Druck oder andere Programme.`,
    stepsTitle: "Ablauf der Konvertierung",
    steps: (source: string, target: string) => [
      `Lade eine oder mehrere ${source}-Dateien mit dem Formular oben hoch.`,
      "Der Browser prueft den Dateityp und liest die Bilddaten.",
      `FormatKit erstellt eine neue ${target}-Datei und veraendert das Original nicht.`,
      "Lade das Ergebnis direkt nach der Verarbeitung herunter.",
    ],
    formatTitle: "Formatdetails",
    labels: {
      input: "Eingabeformat",
      output: "Ausgabeformat",
      transparency: "Transparenz",
      compression: "Komprimierung",
      compatibility: "Kompatibilitaet",
    },
    bool: { yes: "Unterstuetzt", no: "In der Ausgabe nicht unterstuetzt" },
    compression: {
      lossy: "Verlustbehaftete Komprimierung fuer kleinere Fotos",
      lossless: "Verlustfreie Komprimierung fuer scharfe Grafiken",
      mixed: "Moderne Komprimierung; Export haengt vom Browser ab",
      document: "Dokumentausgabe zum Teilen, Drucken und Archivieren",
      icon: "Icon-Container fuer Favicons und Browser-Tabs",
    },
    compatibility: {
      excellent: "Sehr gute Unterstuetzung in Browsern, Apps und Geraeten",
      good: "Gute Unterstuetzung in aktuellen Browsern und Bildtools",
      modern: "Am besten fuer moderne Browser und Bild-Pipelines",
      limited: "Kann neue Software oder Browser-Unterstuetzung erfordern",
      special: "Fuer einen speziellen Veroeffentlichungsfall gedacht",
    },
    bestForTitle: (target: string) => `Typische Verwendung fuer ${target}`,
    targetUses: {
      jpeg: [
        "Fotos mit maximaler Kompatibilitaet teilen.",
        "Produktbilder und E-Mail-Anhaenge verkleinern.",
        "Dateien erstellen, die fast jeder Viewer oeffnen kann.",
      ],
      png: [
        "Transparente Hintergruende fuer Logos und UI-Grafiken behalten.",
        "Screenshots, Diagramme und textlastige Grafiken exportieren.",
        "Artefakte an scharfen Kanten vermeiden.",
      ],
      webp: [
        "Leichtere Bilder auf Webseiten veroeffentlichen.",
        "Gute Qualitaet bei weniger Bandbreite behalten.",
        "Assets fuer moderne Browser vorbereiten.",
      ],
      avif: [
        "Sehr kompakte Bilder fuer schnelle Webseiten erstellen.",
        "Moderne Bildauslieferung testen.",
        "Grosse Fotobestaende verkleinern, wenn moderner Support reicht.",
      ],
      pdf: [
        "Bilder in ein portables Dokument verwandeln.",
        "Scans, Belege oder visuelle Notizen als eine Datei senden.",
        "Bilddateien fuer Druck oder Archivierung vorbereiten.",
      ],
      ico: [
        "Ein Browser-Favicon aus Logo oder Bild erstellen.",
        "Ein kleines Website-Icon fuer Tabs und Lesezeichen vorbereiten.",
        "Pruefen, wie ein vereinfachtes Bild als Icon wirkt.",
      ],
    },
    qualityTitle: "Qualitaet und Grenzen",
    qualityText: (source: string, target: string) =>
      `Das ${target}-Ergebnis haengt von der ${source}-Quelldatei und der Export-Unterstuetzung im Browser ab. Wenn ein Format nicht funktioniert, nutze PNG, JPEG oder WebP als kompatiblere Alternative.`,
    privacyTitle: "Datei-Privatsphaere",
    privacyText:
      "Die Konvertierung ist nach Moeglichkeit fuer die Ausfuehrung im Browser gebaut. Dateien werden nur fuer den angeforderten Vorgang verwendet und nicht als oeffentliches Archiv veroeffentlicht.",
    tipsTitle: "Praktische Tipps",
    faqTitle: "Haeufige Fragen",
    tips: (source: string, target: string) => [
      `Behalte die originale ${source}-Datei, bis du das heruntergeladene ${target}-Ergebnis geprueft hast.`,
      "Nutze PNG fuer Transparenz und JPEG fuer maximale Kompatibilitaet.",
      "Vergleiche fuer Webseiten WebP und AVIF visuell, bevor du Produktivbilder ersetzt.",
    ],
  },
} as const;

function normalizeFormat(format: string) {
  if (format === "jpg") return "jpeg";
  return format;
}

function displayFormat(format: string, locale: Locale) {
  if (format === "image") return COPY[locale].anyImage;
  if (format === "jpeg") return "JPEG";
  return format.toUpperCase();
}

function getTargetUses(
  target: string,
  locale: Locale,
): readonly string[] {
  const uses = COPY[locale].targetUses as Record<string, readonly string[]>;
  return uses[target] ?? uses.webp;
}

export function getConverterPageContent(
  converter: string,
  locale: Locale,
): ConverterPageContent {
  const [rawSource = "image", rawTarget = "webp"] = converter.split("-to-");
  const source = normalizeFormat(rawSource);
  const target = normalizeFormat(rawTarget);
  const sourceLabel = displayFormat(source, locale);
  const targetLabel = displayFormat(target, locale);
  const copy = COPY[locale];
  const targetProfile = FORMAT_PROFILES[target] ?? FORMAT_PROFILES.webp;

  return {
    introTitle: copy.introTitle(sourceLabel, targetLabel),
    introText: copy.introText(sourceLabel, targetLabel),
    stepsTitle: copy.stepsTitle,
    steps: [...copy.steps(sourceLabel, targetLabel)],
    formatTitle: copy.formatTitle,
    rows: [
      { label: copy.labels.input, value: sourceLabel },
      { label: copy.labels.output, value: targetLabel },
      {
        label: copy.labels.transparency,
        value: targetProfile.transparency ? copy.bool.yes : copy.bool.no,
      },
      {
        label: copy.labels.compression,
        value: copy.compression[targetProfile.compression],
      },
      {
        label: copy.labels.compatibility,
        value: copy.compatibility[targetProfile.compatibility],
      },
    ],
    bestForTitle: copy.bestForTitle(targetLabel),
    bestFor: [...getTargetUses(target, locale)],
    qualityTitle: copy.qualityTitle,
    qualityText: copy.qualityText(sourceLabel, targetLabel),
    privacyTitle: copy.privacyTitle,
    privacyText: copy.privacyText,
    tipsTitle: copy.tipsTitle,
    tips: [...copy.tips(sourceLabel, targetLabel)],
    extraSections:
      locale === "en" ? [...(EN_CONVERTER_EXTRA[converter] ?? [])] : [],
    faqTitle: copy.faqTitle,
  };
}
