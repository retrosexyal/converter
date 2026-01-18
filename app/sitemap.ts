import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || "https://example.com";
  const now = new Date();

  const routes = [
    "/",
    "/convert",
    "/webp-to-png",
    "/png-to-jpeg",
    "/jpeg-to-webp",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
