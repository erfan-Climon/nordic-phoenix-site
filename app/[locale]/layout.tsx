import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { fontVariables } from "@/lib/fonts";
import { dirFor, htmlLang, isLocale, prefixedLocales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/** Rotlayout för de prefixade språken: /en och /fa. */

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale });
}

export default async function LocalisedRootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "sv") notFound();

  return (
    <html lang={htmlLang[locale]} dir={dirFor(locale)} className={fontVariables}>
      <body>
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
