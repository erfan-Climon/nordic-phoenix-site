import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import {
  hasTranslatedArticles,
  localesWithBlogIndex,
} from "@/content/blog-copy";
import { getDictionary, isLocale, prefixedLocales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Bara språk som har minst en översatt artikel får en blogglistning.
 *
 * Ett tomt /en/blogg hade varit en indexerbar sida utan innehåll, och en
 * listning som visar svenska artiklar under en engelsk URL är en dubblett.
 */
export function generateStaticParams() {
  return prefixedLocales
    .filter(hasTranslatedArticles)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blogg">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || !hasTranslatedArticles(locale)) return {};
  const t = getDictionary(locale);

  return buildMetadata({
    locale,
    path: "/blogg",
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    availableLocales: localesWithBlogIndex(),
  });
}

export default async function Page({ params }: PageProps<"/[locale]/blogg">) {
  const { locale } = await params;
  if (!isLocale(locale) || !hasTranslatedArticles(locale)) notFound();
  return <BlogIndexPage locale={locale} />;
}
