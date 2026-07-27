import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("sv");

export const metadata: Metadata = {
  ...buildMetadata({
    locale: "sv",
    path: "/blogg",
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
  }),
  // Artiklarna finns bara på svenska — inga hreflang-alternativ att peka på.
  alternates: { canonical: "/blogg" },
};

export default function Page() {
  return <BlogIndexPage />;
}
