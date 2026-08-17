import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
import { defaultLocale, isLocale, prefixedLocales } from "@/lib/i18n";

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <HomePage locale={locale} />;
}
