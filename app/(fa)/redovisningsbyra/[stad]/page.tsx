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

/* Bara orter som finns på persiska, eftersom roten är persisk. Alla 26 är
   översatta, men regeln ska stå i koden och inte vara ett antagande. */
export function generateStaticParams() {
  return translatedSlugs("fa").map((stad) => ({ stad }));
}

export async function generateMetadata({
  params,
}: PageProps<"/redovisningsbyra/[stad]">): Promise<Metadata> {
  const { stad } = await params;
  const location = getLocation(stad);
  if (!location) return {};
  const copy = getLocationCopy(location, "fa");
  if (!copy) return {};

  return buildMetadata({
    locale: "fa",
    path: `/redovisningsbyra/${location.slug}`,
    title: copy.metaTitle,
    description: copy.metaDescription,
    // Bara de språk orten faktiskt är översatt till. Att peka hreflang på en
    // sida som inte finns får Google att behandla dem som dubbletter.
    availableLocales: localesForLocation(location.slug),
  });
}

export default async function Page({
  params,
}: PageProps<"/redovisningsbyra/[stad]">) {
  const { stad } = await params;
  const location = getLocation(stad);
  if (!location) notFound();
  const copy = getLocationCopy(location, "fa");
  if (!copy) notFound();
  return <LocationPage location={location} locale="fa" copy={copy} />;
}
