import type { Location } from "@/content/locations";
import { locationsFa } from "@/content/locations.fa";
import { type Locale, locales } from "@/lib/i18n";

/**
 * Den översättningsbara delen av en ortssida. Utanför står `slug`, `partOf`
 * och `nearby`, som är struktur och identisk på alla språk.
 */
export type LocationCopy = Omit<Location, "slug" | "partOf" | "nearby">;

const TABELLER: Partial<Record<Locale, Record<string, LocationCopy>>> = {
  fa: locationsFa,
};

/**
 * Till skillnad från tjänsterna finns här ingen reserv till svenskan.
 *
 * En ortssida under /fa som visar svensk text är en dubblett av den svenska
 * sidan, och Google har inget sätt att se att det är ett misstag. Därför
 * genereras sidan bara när översättningen finns, och hreflang listar bara de
 * språk som faktiskt existerar. Saknas översättningen finns ingen URL att
 * indexera fel.
 */
export function getLocationCopy(
  location: Location,
  locale: Locale,
): LocationCopy | undefined {
  if (locale === "sv") return location;
  return TABELLER[locale]?.[location.slug];
}

/** Språk som ortssidan finns på. Svenskan finns alltid. */
export function localesForLocation(slug: string): Locale[] {
  return locales.filter(
    (locale) => locale === "sv" || Boolean(TABELLER[locale]?.[slug]),
  );
}

/** Slugar som är översatta till ett visst språk. Styr generateStaticParams. */
export function translatedSlugs(locale: Locale): string[] {
  return Object.keys(TABELLER[locale] ?? {});
}

/** Sant om språket har minst en översatt ort. Svenskan har alla. */
export function hasTranslatedLocations(locale: Locale): boolean {
  return locale === "sv" || translatedSlugs(locale).length > 0;
}

/** Språk där ortsöversikten finns, alltså har något att visa. */
export function localesWithLocationIndex(): Locale[] {
  return locales.filter(hasTranslatedLocations);
}
