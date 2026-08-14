import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage } from "@/components/pages/LocationPage";
import { getLocation, locations } from "@/content/locations";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locations.map((l) => ({ stad: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/redovisningsbyra/[stad]">): Promise<Metadata> {
  const { stad } = await params;
  const location = getLocation(stad);
  if (!location) return {};

  return {
    ...buildMetadata({
      locale: "sv",
      path: `/redovisningsbyra/${location.slug}`,
      title: location.metaTitle,
      description: location.metaDescription,
    }),
    // Ortssidorna finns bara på svenska, så inga hreflang-alternativ.
    alternates: { canonical: `/redovisningsbyra/${location.slug}` },
  };
}

export default async function Page({
  params,
}: PageProps<"/redovisningsbyra/[stad]">) {
  const { stad } = await params;
  const location = getLocation(stad);
  if (!location) notFound();
  return <LocationPage location={location} />;
}
