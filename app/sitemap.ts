import type { MetadataRoute } from "next";
import { DICTIONARY } from "@/dictionary";
import { alternateLanguages, SITE_URL } from "@/lib/seo";
import { CONTENT_LAST_MODIFIED, SEO_PAGE_SLUGS } from "@/lib/seoPageData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL;
  // Update this date only when page content changes in a meaningful way.
  const lastModified = CONTENT_LAST_MODIFIED;

  const routes: MetadataRoute.Sitemap = [];

  const locales = Object.keys(DICTIONARY) as Array<keyof typeof DICTIONARY>;

  routes.push({
    url: siteUrl,
    lastModified,
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
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: alternateLanguages(locales, (l) => `${siteUrl}/${l}`),
      },
    });

    const dict = DICTIONARY[locale];

    routes.push({
      url: `${siteUrl}/${locale}/video`,
      lastModified,
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
        lastModified,
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
        lastModified,
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

  for (const slug of SEO_PAGE_SLUGS) {
    routes.push({
      url: `${siteUrl}/en/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: slug === "batch-image-converter" ? 0.8 : 0.7,
    });
  }

  return routes;
}
