import type { Metadata } from "next";
import UploadForm from "@/components/UploadForm";
import BannerInline from "@/components/BannerInline";

export const metadata: Metadata = {
  title: "Конвертер изображений онлайн — WebP, PNG, JPEG",
  description:
    "Быстрый онлайн конвертер изображений. Перетащи файл, выбери формат (WebP/PNG/JPEG) и скачай результат.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          Конвертер изображений WebP / PNG / JPEG
        </h1>
        <p className="text-neutral-700 max-w-2xl">
          Перетащи изображение, выбери выходной формат и скачай готовый файл.
          Конвертация работает быстро и без регистрации.
        </p>
      </section>

      <UploadForm title="Конвертировать прямо сейчас" />

      <BannerInline />

      <section className="prose max-w-none">
        <h2>Популярные варианты</h2>
        <ul>
          <li><a href="/webp-to-png">WebP → PNG</a></li>
          <li><a href="/png-to-jpeg">PNG → JPEG</a></li>
          <li><a href="/jpeg-to-webp">JPEG → WebP</a></li>
        </ul>
      </section>
    </div>
  );
}