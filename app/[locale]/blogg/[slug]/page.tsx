import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { getArticle } from "@/content/blog";
import {
  articleImage,
  getArticleCopy,
  localesForArticle,
  translatedArticleSlugs,
} from "@/content/blog-copy";
import { isLocale, prefixedLocales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Bara artiklar som faktiskt är översatta till språket får en sida. Samma
 * regel som för ortssidorna, se `content/blog-copy.ts`.
 */
export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) =>
    translatedArticleSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blogg/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = getArticle(slug);
  if (!article) return {};
  const copy = getArticleCopy(article, locale);
  if (!copy) return {};

  const bas = buildMetadata({
    locale,
    path: `/blogg/${article.slug}`,
    title: copy.metaTitle,
    description: copy.metaDescription,
    availableLocales: localesForArticle(article.slug),
  });

  return {
    ...bas,
    /* Se den persiska rutten: basens openGraph vävs in, inte över. */
    openGraph: {
      ...bas.openGraph,
      type: "article",
      publishedTime: article.published,
      images: [{ url: articleImage(article, copy) }],
    },
  };
}

export default async function Page({
  params,
}: PageProps<"/[locale]/blogg/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getArticle(slug);
  if (!article) notFound();
  const copy = getArticleCopy(article, locale);
  if (!copy) notFound();
  return <ArticlePage article={article} copy={copy} locale={locale} />;
}
