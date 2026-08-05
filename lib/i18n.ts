import { en } from "@/content/locales/en";
import { fa } from "@/content/locales/fa";
import { sv, type Dictionary } from "@/content/locales/sv";

export const locales = ["sv", "en", "fa"] as const;
export type Locale = (typeof locales)[number];

/** Svenska ligger på roten (`/`), övriga språk under prefix (`/en`, `/fa`). */
export const defaultLocale: Locale = "sv";

/** Språken som får ett eget prefixat rotsegment i app/[locale]. */
export const prefixedLocales = locales.filter(
  (l): l is Exclude<Locale, typeof defaultLocale> => l !== defaultLocale,
);

const dictionaries: Record<Locale, Dictionary> = { sv, en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

/** BCP 47-taggar för hreflang och `<html lang>`. */
export const htmlLang: Record<Locale, string> = {
  sv: "sv-SE",
  en: "en",
  fa: "fa",
};

/** Nästa språk i cykeln sv → en → fa → sv. */
export function nextLocale(locale: Locale): Locale {
  const i = locales.indexOf(locale);
  return locales[(i + 1) % locales.length];
}

/**
 * Etiketten på språkknappen visar det språk man byter *till*. Persiskan
 * kortas till två tecken i stället för hela "فارسی", så att knappen håller
 * samma bredd som SV och EN nu när ramen är borta.
 */
export const localeButtonLabel: Record<Locale, string> = {
  sv: "SV",
  en: "EN",
  fa: "فا",
};

/**
 * Bygger en absolut sökväg för ett språk.
 * `path` anges alltid utan språkprefix, t.ex. "/" eller "/blogg".
 */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}` || "/";
}

/** Plockar bort ett eventuellt språkprefix ur en pathname från usePathname(). */
export function stripLocale(pathname: string): {
  locale: Locale;
  path: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first) && first !== defaultLocale) {
    return { locale: first, path: `/${segments.slice(1).join("/")}` };
  }
  return { locale: defaultLocale, path: `/${segments.join("/")}` };
}
