import type { MetadataRoute } from "next";
import { DICTIONARY } from "@/dictionary";
import { alternateLanguages, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL;
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [];

  const locales = Object.keys(DICTIONARY) as Array<keyof typeof DICTIONARY>;

  routes.push({
    url: siteUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: {
        ...alternateLanguages(locales, (l) => `${siteUrl}/${l}`),
        "x-default": siteUrl,
      },
    },
  });

  for (const locale of locales) {
    routes.push({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: alternateLanguages(locales, (l) => `${siteUrl}/${l}`),
      },
    });

    const dict = DICTIONARY[locale];

    routes.push({
      url: `${siteUrl}/${locale}/video`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: alternateLanguages(
          locales,
          (l) => `${siteUrl}/${l}/video`,
        ),
      },
    });

    for (const slug of Object.keys(dict.converters)) {
      routes.push({
        url: `${siteUrl}/${locale}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: alternateLanguages(
            locales,
            (l) => `${siteUrl}/${l}/${slug}`,
          ),
        },
      });
    }

    for (const page of ["privacy", "terms"]) {
      routes.push({
        url: `${siteUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: alternateLanguages(
            locales,
            (l) => `${siteUrl}/${l}/${page}`,
          ),
        },
      });
    }
  }

  return routes;
}
