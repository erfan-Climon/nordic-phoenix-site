import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { articles, getArticle } from "@/content/blog";
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
    }),
    alternates: { canonical: `/blogg/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.published,
      images: [{ url: article.image }],
    },
  };
}

export default async function Page({ params }: PageProps<"/blogg/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
