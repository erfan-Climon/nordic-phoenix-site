import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { articles, getArticle } from "@/content/blog";
import { articleImage, localesForArticle } from "@/content/blog-copy";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogg/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    ...buildMetadata({
      locale: "sv",
      path: `/blogg/${article.slug}`,
      title: article.metaTitle,
      description: article.metaDescription,
      // Bara de språk artikeln faktiskt är översatt till. En hreflang som
      // pekar på en sida som inte finns gör att Google slutar lita på hela
      // uppsättningen.
      availableLocales: localesForArticle(article.slug),
    }),
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.published,
      images: [{ url: articleImage(article, article) }],
    },
  };
}

export default async function Page({ params }: PageProps<"/blogg/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticlePage article={article} copy={article} locale="sv" />;
}
