import type { Metadata } from "next";
import { LocationIndexPage } from "@/components/pages/LocationIndexPage";
import { localesWithLocationIndex } from "@/content/location-copy";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("fa");

export const metadata: Metadata = buildMetadata({
  locale: "fa",
  path: "/redovisningsbyra",
  title: t.locationPage.indexTitle,
  description: t.locationPage.indexDescription,
  availableLocales: localesWithLocationIndex(),
});

export default function Page() {
  return <LocationIndexPage locale="fa" />;
}
