import type { Metadata } from "next";
import { TemplatesPage } from "@/components/pages/TemplatesPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("fa");

export const metadata: Metadata = buildMetadata({
  locale: "fa",
  path: "/mallar",
  title: t.templates.metaTitle,
  description: t.templates.metaDescription,
});

export default function Page() {
  return <TemplatesPage locale="fa" />;
}
