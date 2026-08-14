import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/pages/ServicePage";
import { getService, services } from "@/content/services";
import { getServiceCopy } from "@/content/service-copy";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, prefixedLocales } from "@/lib/i18n";

/** Bara de prefixade språken. Svenskan ligger på roten, i app/(sv). */
export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) =>
    services.map((s) => ({ locale, tjanst: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tjanster/[tjanst]">): Promise<Metadata> {
  const { locale, tjanst } = await params;
  if (!isLocale(locale)) return {};
  const service = getService(tjanst);
  if (!service) return {};
  const copy = getServiceCopy(service, locale);

  return buildMetadata({
    locale,
    path: `/tjanster/${service.slug}`,
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/tjanster/[tjanst]">) {
  const { locale, tjanst } = await params;
  if (!isLocale(locale)) notFound();
  const service = getService(tjanst);
  if (!service) notFound();
  return <ServicePage service={service} locale={locale} />;
}
