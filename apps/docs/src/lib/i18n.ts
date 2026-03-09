export const defaultLocale = "en";

export const locales = [
  "en",
  "ko",
  "ja",
  "zh-Hans",
  "zh-Hant",
  "es",
  "pt-BR",
  "fr",
  "de",
  "ru",
  "tr",
  "it",
  "vi",
  "th",
  "pl",
] as const;

export type SupportedLocale = (typeof locales)[number];

export const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  es: "Español",
  "pt-BR": "Português (BR)",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  tr: "Türkçe",
  it: "Italiano",
  vi: "Tiếng Việt",
  th: "ไทย",
  pl: "Polski",
};

/**
 * Lowercase locale for URL paths.
 * Astro lowercases slugs, so "zh-Hans" → "zh-hans", "pt-BR" → "pt-br".
 */
export function toUrlLocale(locale: SupportedLocale | string): string {
  return locale.toLowerCase();
}

/**
 * Map a lowercased URL locale back to the canonical locale code.
 * e.g. "zh-hans" → "zh-Hans", "pt-br" → "pt-BR"
 */
const urlToCanonical = new Map<string, SupportedLocale>(locales.map((l) => [l.toLowerCase(), l]));

/**
 * Extract language and remaining path from a doc.id.
 * Handles both original case ("zh-Hans/...") and Astro-lowercased ("zh-hans/...").
 * e.g. "ko/tailwind4/getting-started" → { lang: "ko", path: "tailwind4/getting-started" }
 */
export function extractLang(docId: string): { lang: SupportedLocale; path: string } {
  const lower = docId.toLowerCase();
  for (const locale of locales) {
    const lc = locale.toLowerCase();
    if (lower === lc || lower.startsWith(`${lc}/`)) {
      return { lang: locale, path: docId.slice(locale.length + 1) };
    }
  }
  return { lang: defaultLocale, path: docId };
}

/**
 * Extract language from a URL path segment (lowercased by Astro).
 * e.g. "zh-hans" → "zh-Hans", "ko" → "ko"
 */
export function localeFromUrl(segment: string): SupportedLocale | undefined {
  return urlToCanonical.get(segment.toLowerCase());
}

/**
 * Build a URL-safe slug from a doc.id.
 * en (default locale) has no prefix; others keep the lang prefix.
 */
export function docIdToSlug(docId: string): string {
  const { lang, path } = extractLang(docId);
  return lang === defaultLocale ? path : docId;
}

/**
 * Check if a locale string is a supported locale.
 */
export function isSupportedLocale(value: string): value is SupportedLocale {
  return (locales as readonly string[]).includes(value);
}
