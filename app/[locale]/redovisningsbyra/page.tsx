import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationIndexPage } from "@/components/pages/LocationIndexPage";
import { hasTranslatedLocations, translatedSlugs } from "@/content/location-copy";
import { getDictionary, isLocale, prefixedLocales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localesWithLocationIndex } from "@/content/location-copy";

/** Bara språk som har minst en översatt ort. Annars vore sidan tom. */
export function generateStaticParams() {
  return prefixedLocales
    .filter((locale) => translatedSlugs(locale).length > 0)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/redovisningsbyra">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/redovisningsbyra",
    title: t.locationPage.indexTitle,
    description: t.locationPage.indexDescription,
    availableLocales: localesWithLocationIndex(),
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/redovisningsbyra">) {
  const { locale } = await params;
  if (!isLocale(locale) || !hasTranslatedLocations(locale)) notFound();
  return <LocationIndexPage locale={locale} />;
}
