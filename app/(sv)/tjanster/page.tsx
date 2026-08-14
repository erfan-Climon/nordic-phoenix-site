import type { Metadata } from "next";
import { ServiceIndexPage } from "@/components/pages/ServiceIndexPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("sv");

export const metadata: Metadata = buildMetadata({
  locale: "sv",
  path: "/tjanster",
  title: t.servicePage.indexTitle,
  description: t.servicePage.indexDescription,
});

export default function Page() {
  return <ServiceIndexPage locale="sv" />;
}
