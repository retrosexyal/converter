import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FaqSchema from "@/components/FaqSchema";
import VideoConverter from "@/components/VideoConverter";
import YandexAdSlot from "@/components/YandexAdSlot";
import { DICTIONARY, type Locale } from "@/dictionary";
import { alternateLanguages, SITE_URL } from "@/lib/seo";

const locales = Object.keys(DICTIONARY) as Locale[];

const VIDEO_PAGE = {
  ru: {
    metaTitle: "Конвертер видео онлайн — формат, битрейт, разрешение, FPS",
    metaDescription:
      "Клиентский конвертер видео: меняйте формат, битрейт, ширину кадра и FPS прямо в браузере без загрузки файла на сервер.",
    h1: "Конвертер видео в браузере",
    lead: "Загрузите видео, выберите поддерживаемый браузером выходной формат и настройте битрейт, разрешение и FPS. Обработка выполняется локально на устройстве.",
    articleTitle: "Что можно изменить",
    points: [
      "Формат и кодек: WebM обычно доступен в современных браузерах, MP4 зависит от поддержки MediaRecorder.",
      "Битрейт: укажите целевой видеобитрейт в кбит/с.",
      "Разрешение: оставьте исходный размер или выберите ширину 1080p, 720p, 480p, 360p либо свою ширину.",
      "FPS: выберите 60, 30, 24 или 15 кадров в секунду.",
    ],
    faqTitle: "Вопросы по видео-конвертеру",
    faqs: [
      {
        question: "Видео отправляется на сервер?",
        answer:
          "Нет. Конвертация выполняется через возможности браузера на вашем устройстве.",
      },
      {
        question: "Почему MP4 может быть недоступен?",
        answer:
          "Выходные форматы зависят от MediaRecorder в конкретном браузере. Если MP4 не поддерживается, используйте WebM.",
      },
      {
        question: "Почему конвертация идет долго?",
        answer:
          "Браузер фактически воспроизводит и записывает видео заново, поэтому обработка обычно занимает примерно длительность ролика.",
      },
    ],
  },
  en: {
    metaTitle: "Online Video Converter — format, bitrate, resolution, FPS",
    metaDescription:
      "Client-side video converter: change format, bitrate, frame width, and FPS directly in the browser without uploading the file to a server.",
    h1: "Browser video converter",
    lead: "Upload a video, choose an output format supported by your browser, and adjust bitrate, resolution, and FPS. Processing runs locally on your device.",
    articleTitle: "What you can change",
    points: [
      "Format and codec: WebM is usually available in modern browsers, while MP4 depends on MediaRecorder support.",
      "Bitrate: set the target video bitrate in kbps.",
      "Resolution: keep the source size or choose 1080p, 720p, 480p, 360p, or a custom width.",
      "FPS: choose 60, 30, 24, or 15 frames per second.",
    ],
    faqTitle: "Video converter FAQ",
    faqs: [
      {
        question: "Is my video uploaded to a server?",
        answer:
          "No. Conversion uses browser capabilities and runs on your device.",
      },
      {
        question: "Why is MP4 unavailable?",
        answer:
          "Output formats depend on MediaRecorder support in the current browser. If MP4 is unavailable, use WebM.",
      },
      {
        question: "Why does conversion take time?",
        answer:
          "The browser effectively plays and records the video again, so processing usually takes about as long as the video itself.",
      },
    ],
  },
  es: {
    metaTitle: "Convertidor de video online — formato, bitrate, resolución, FPS",
    metaDescription:
      "Convertidor de video del lado del cliente: cambia formato, bitrate, ancho de fotograma y FPS directamente en el navegador sin subir el archivo al servidor.",
    h1: "Convertidor de video en el navegador",
    lead: "Sube un video, elige un formato de salida compatible con tu navegador y ajusta bitrate, resolución y FPS. El procesamiento se ejecuta localmente en tu dispositivo.",
    articleTitle: "Qué puedes cambiar",
    points: [
      "Formato y códec: WebM suele estar disponible en navegadores modernos; MP4 depende del soporte de MediaRecorder.",
      "Bitrate: indica el bitrate de video objetivo en kbps.",
      "Resolución: conserva el tamaño original o elige 1080p, 720p, 480p, 360p o un ancho personalizado.",
      "FPS: elige 60, 30, 24 o 15 fotogramas por segundo.",
    ],
    faqTitle: "Preguntas sobre el convertidor de video",
    faqs: [
      {
        question: "¿El video se sube a un servidor?",
        answer:
          "No. La conversión usa capacidades del navegador y se ejecuta en tu dispositivo.",
      },
      {
        question: "¿Por qué MP4 puede no estar disponible?",
        answer:
          "Los formatos de salida dependen del soporte de MediaRecorder en el navegador actual. Si MP4 no está disponible, usa WebM.",
      },
      {
        question: "¿Por qué la conversión tarda?",
        answer:
          "El navegador reproduce y graba el video de nuevo, por lo que el proceso suele durar aproximadamente lo mismo que el video.",
      },
    ],
  },
  de: {
    metaTitle: "Online-Videokonverter — Format, Bitrate, Auflösung, FPS",
    metaDescription:
      "Clientseitiger Videokonverter: Format, Bitrate, Bildbreite und FPS direkt im Browser ändern, ohne die Datei auf einen Server hochzuladen.",
    h1: "Videokonverter im Browser",
    lead: "Lade ein Video hoch, wähle ein vom Browser unterstütztes Ausgabeformat und passe Bitrate, Auflösung und FPS an. Die Verarbeitung läuft lokal auf deinem Gerät.",
    articleTitle: "Was geändert werden kann",
    points: [
      "Format und Codec: WebM ist in modernen Browsern meist verfügbar, MP4 hängt von der MediaRecorder-Unterstützung ab.",
      "Bitrate: Ziel-Bitrate für das Video in kbps festlegen.",
      "Auflösung: Originalgröße behalten oder 1080p, 720p, 480p, 360p oder eine eigene Breite wählen.",
      "FPS: 60, 30, 24 oder 15 Bilder pro Sekunde wählen.",
    ],
    faqTitle: "Fragen zum Videokonverter",
    faqs: [
      {
        question: "Wird das Video auf einen Server hochgeladen?",
        answer:
          "Nein. Die Konvertierung nutzt Browserfunktionen und läuft auf deinem Gerät.",
      },
      {
        question: "Warum ist MP4 nicht verfügbar?",
        answer:
          "Ausgabeformate hängen von der MediaRecorder-Unterstützung des Browsers ab. Wenn MP4 fehlt, nutze WebM.",
      },
      {
        question: "Warum dauert die Konvertierung?",
        answer:
          "Der Browser spielt das Video ab und nimmt es neu auf. Deshalb dauert die Verarbeitung meist ungefähr so lange wie das Video.",
      },
    ],
  },
} as const;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const page = VIDEO_PAGE[locale as Locale];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/video`,
      languages: alternateLanguages(locales, (l) => `/${l}/video`),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${locale}/video`,
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const page = VIDEO_PAGE[locale as Locale];

  return (
    <>
      <FaqSchema faqs={page.faqs} />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{page.h1}</h1>
          <p className="text-neutral-700 dark:text-neutral-300 max-w-2xl">
            {page.lead}
          </p>
        </section>

        <VideoConverter locale={locale as Locale} />

        <YandexAdSlot placement="video-after-converter" />

        <article className="prose max-w-none">
          <h2>{page.articleTitle}</h2>
          <ul>
            {page.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <h2>{page.faqTitle}</h2>
          <ul>
            {page.faqs.map((faq) => (
              <li key={faq.question}>
                <strong>{faq.question}</strong>
                <br />
                {faq.answer}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: locale.toUpperCase(),
                item: `${SITE_URL}/${locale}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: page.h1,
                item: `${SITE_URL}/${locale}/video`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
