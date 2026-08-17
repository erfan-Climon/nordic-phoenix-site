import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { MotionBoot } from "@/components/layout/MotionBoot";
import { SiteShell } from "@/components/layout/SiteShell";
import { fontVariables } from "@/lib/fonts";
import {
  defaultLocale,
  dirFor,
  htmlLang,
  isLocale,
  prefixedLocales,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Rotlayout för de prefixade språken, alltså /sv och /en.
 *
 * Spärren går mot `defaultLocale` och inte mot ett språknamn. Den stod
 * tidigare som `locale === "sv"`, vilket var rätt så länge svenskan låg på
 * roten. När roten blev persisk spärrade den ut svenskan i stället, och alla
 * sidor under /sv renderades som felsidor.
 */

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
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  return (
    <html
      lang={htmlLang[locale]}
      dir={dirFor(locale)}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <MotionBoot />
      </head>
      <body>
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
