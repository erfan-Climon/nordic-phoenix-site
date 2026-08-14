import type { Locale } from "@/lib/i18n";
import { servicesEn } from "@/content/services.en";
import { servicesFa } from "@/content/services.fa";
import type { Service } from "@/content/services";

/**
 * Den översättningsbara delen av en tjänst. Allt som inte står här är
 * struktur: `slug` och `related` är identiska på alla språk, för URL:erna är
 * gemensamma och relationerna mellan tjänsterna ändras inte med språket.
 */
export type ServiceCopy = Omit<Service, "slug" | "related">;

const TABELLER: Partial<Record<Locale, Record<string, ServiceCopy>>> = {
  en: servicesEn,
  fa: servicesFa,
};

/**
 * Hämtar tjänstens text på ett språk. Saknas översättningen faller den
 * tillbaka på svenskan i stället för att rendera tomt. Det gör att en tjänst
 * kan läggas till på svenska och översättas senare utan att bygget går
 * sönder, men innebär också att en glömd översättning inte syns som ett fel.
 * `saknadeOversattningar` finns för att fånga just det.
 */
export function getServiceCopy(service: Service, locale: Locale): ServiceCopy {
  if (locale === "sv") return service;
  return TABELLER[locale]?.[service.slug] ?? service;
}

/** Slugar som saknar översättning för ett språk. Används av byggkontrollen. */
export function saknadeOversattningar(
  slugs: string[],
  locale: Locale,
): string[] {
  if (locale === "sv") return [];
  const tabell = TABELLER[locale];
  return slugs.filter((slug) => !tabell?.[slug]);
}
