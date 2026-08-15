import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import { localesWithBlogIndex } from "@/content/blog-copy";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("sv");

export const metadata: Metadata = buildMetadata({
  locale: "sv",
  path: "/blogg",
  title: t.blog.metaTitle,
  description: t.blog.metaDescription,
  // Listningen finns bara på de språk som har minst en översatt artikel.
  availableLocales: localesWithBlogIndex(),
});

export default function Page() {
  return <BlogIndexPage locale="sv" />;
}
