import { type Location, locations } from "@/content/locations";
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

/**
 * Slugar som finns på språket. Styr generateStaticParams.
 *
 * Utgår från hela ortslistan och frågar `getLocationCopy`, i stället för att
 * läsa översättningstabellen rakt av. Tabellen innehåller bara de språk som
 * faktiskt är översatta, så svenskan gav tomt: den har inget eget uppslag
 * eftersom orten själv är den svenska texten.
 *
 * Det spelade ingen roll så länge svenskan låg på roten och aldrig gick
 * genom den här funktionen. När roten blev persisk hade alla 26 svenska
 * ortssidor försvunnit.
 */
export function translatedSlugs(locale: Locale): string[] {
  return locations
    .filter((location) => Boolean(getLocationCopy(location, locale)))
    .map((location) => location.slug);
}

/** Sant om språket har minst en översatt ort. Svenskan har alla. */
export function hasTranslatedLocations(locale: Locale): boolean {
  return locale === "sv" || translatedSlugs(locale).length > 0;
}

/** Språk där ortsöversikten finns, alltså har något att visa. */
export function localesWithLocationIndex(): Locale[] {
  return locales.filter(hasTranslatedLocations);
}
