import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("fa");

export const metadata: Metadata = buildMetadata({
  locale: "fa",
  path: "/integritetspolicy",
  title: t.privacy.metaTitle,
  description: t.privacy.metaDescription,
});

export default function Page() {
  return <PrivacyPage locale="fa" />;
}
