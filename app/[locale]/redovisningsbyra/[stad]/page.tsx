import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage } from "@/components/pages/LocationPage";
import { getLocation } from "@/content/locations";
import {
  getLocationCopy,
  localesForLocation,
  translatedSlugs,
} from "@/content/location-copy";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, prefixedLocales } from "@/lib/i18n";

/**
 * Bara orter som faktiskt är översatta till språket får en sida.
 *
 * Alternativet, att generera alla och falla tillbaka på svensk text, hade gett
 * Google en /fa-URL med svenskt innehåll. Det läses som en dubblett av den
 * svenska sidan och kan dra ner båda. Saknas översättningen finns ingen URL.
 */
export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) =>
    translatedSlugs(locale).map((stad) => ({ locale, stad })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/redovisningsbyra/[stad]">): Promise<Metadata> {
  const { locale, stad } = await params;
  if (!isLocale(locale)) return {};
  const location = getLocation(stad);
  if (!location) return {};
  const copy = getLocationCopy(location, locale);
  if (!copy) return {};

  return buildMetadata({
    locale,
    path: `/redovisningsbyra/${location.slug}`,
    title: copy.metaTitle,
    description: copy.metaDescription,
    availableLocales: localesForLocation(location.slug),
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/redovisningsbyra/[stad]">) {
  const { locale, stad } = await params;
  if (!isLocale(locale)) notFound();
  const location = getLocation(stad);
  if (!location) notFound();
  const copy = getLocationCopy(location, locale);
  if (!copy) notFound();
  return <LocationPage location={location} locale={locale} copy={copy} />;
}
