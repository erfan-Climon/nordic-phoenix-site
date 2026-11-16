import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoguiderPage } from "@/components/pages/VideoguiderPage";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  prefixedLocales,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/videoguider">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/videoguider",
    title: t.videoguider.metaTitle,
    description: t.videoguider.metaDescription,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/videoguider">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <VideoguiderPage locale={locale} />;
}
