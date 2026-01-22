import type { MetadataRoute } from "next";
import { DICTIONARY } from "@/dictionary";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL!;
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [];

  const locales = Object.keys(DICTIONARY) as Array<keyof typeof DICTIONARY>;

  for (const locale of locales) {
    routes.push({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });

    const dict = DICTIONARY[locale];

    for (const slug of Object.keys(dict.converters)) {
      routes.push({
        url: `${siteUrl}/${locale}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const page of ["privacy", "terms"]) {
      routes.push({
        url: `${siteUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
