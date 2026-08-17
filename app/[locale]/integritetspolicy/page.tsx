import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
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
}: PageProps<"/[locale]/integritetspolicy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/integritetspolicy",
    title: t.privacy.metaTitle,
    description: t.privacy.metaDescription,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/integritetspolicy">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <PrivacyPage locale={locale} />;
}
