export const DEFAULT_SITE_URL = "https://www.formatkit.top";

function normalizeSiteUrl(value: string | undefined) {
  const siteUrl = value?.trim().replace(/\/$/, "");

  if (
    !siteUrl ||
    (process.env.NODE_ENV === "production" &&
      /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?/i.test(siteUrl))
  ) {
    return DEFAULT_SITE_URL;
  }

  return siteUrl;
}

export const SITE_URL = normalizeSiteUrl(process.env.SITE_URL);

export function absoluteUrl(path = "") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function alternateLanguages(
  locales: string[],
  pathForLocale: (locale: string) => string,
) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, pathForLocale(locale)])),
    "x-default": pathForLocale("en"),
  };
}
