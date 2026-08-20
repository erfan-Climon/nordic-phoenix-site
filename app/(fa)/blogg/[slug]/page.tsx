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
import { buildMetadata } from "@/lib/metadata";

/* Bara artiklar som finns på persiska, eftersom roten är persisk. Alla
   släppta artiklar är översatta, men regeln ska stå i koden och inte vara
   ett antagande. */
export function generateStaticParams() {
  return translatedArticleSlugs("fa").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogg/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const copy = getArticleCopy(article, "fa");
  if (!copy) return {};

  const bas = buildMetadata({
    locale: "fa",
    path: `/blogg/${article.slug}`,
    title: copy.metaTitle,
    description: copy.metaDescription,
    // Bara de språk artikeln faktiskt är översatt till. En hreflang som
    // pekar på en sida som inte finns gör att Google slutar lita på hela
    // uppsättningen.
    availableLocales: localesForArticle(article.slug),
  });

  return {
    ...bas,
    /* Basens openGraph vävs in i stället för att bytas ut. Skrevs den över
       rakt av försvann url, siteName och locale, som bara sätts där. */
    openGraph: {
      ...bas.openGraph,
      type: "article",
      publishedTime: article.published,
      images: [{ url: articleImage(article, copy) }],
    },
  };
}

export default async function Page({ params }: PageProps<"/blogg/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const copy = getArticleCopy(article, "fa");
  if (!copy) notFound();
  return <ArticlePage article={article} copy={copy} locale="fa" />;
}
