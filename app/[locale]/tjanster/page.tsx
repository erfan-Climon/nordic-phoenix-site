import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceIndexPage } from "@/components/pages/ServiceIndexPage";
import { getDictionary, isLocale, prefixedLocales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/** Bara de prefixade språken. Svenskan ligger på roten, i app/(sv). */
export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tjanster">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/tjanster",
    title: t.servicePage.indexTitle,
    description: t.servicePage.indexDescription,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/tjanster">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServiceIndexPage locale={locale} />;
}
