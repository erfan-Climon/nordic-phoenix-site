import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplatesPage } from "@/components/pages/TemplatesPage";
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
}: PageProps<"/[locale]/mallar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/mallar",
    title: t.templates.metaTitle,
    description: t.templates.metaDescription,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/mallar">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <TemplatesPage locale={locale} />;
}
