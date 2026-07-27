import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("sv");

export const metadata: Metadata = buildMetadata({
  locale: "sv",
  path: "/integritetspolicy",
  title: t.privacy.metaTitle,
  description: t.privacy.metaDescription,
});

export default function Page() {
  return <PrivacyPage locale="sv" />;
}
