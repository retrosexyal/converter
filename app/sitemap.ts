import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL!;
  const now = new Date();

  const appDir = path.join(process.cwd(), "app");

  // Берём эталонные страницы из (ru)
  const rootDir = path.join(appDir, "(ru)");

  const basePages = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  // Языки
  const locales = fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        !d.name.startsWith("(") &&
        !["api", "components"].includes(d.name),
    )
    .map((d) => d.name);

  const routes: string[] = [];

  // корневые
  for (const page of basePages) {
    routes.push(`/${page}`);
  }

  // локализованные
  for (const locale of locales) {
    for (const page of basePages) {
      routes.push(`/${locale}/${page}`);
    }
  }

  const mainRoutes = ["/", ...locales.map((lang) => `/${lang}`)];

  return [...mainRoutes, ...routes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: mainRoutes.includes(route) ? 1 : 0.8,
  }));
}
