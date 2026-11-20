import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoguiderPage } from "@/components/pages/VideoguiderPage";
import { harVideoguider } from "@/content/blog-copy";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  prefixedLocales,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Bara de språk som genereras finns.
 *
 * Utan det här skrev exporten ändå en fil för /sv/videoguider, med tom
 * kropp men statuskod 200. En sida som svarar men inte innehåller något är
 * sämre än ingen sida alls: Google läser den som tunn snarare än saknad.
 */
export const dynamicParams = false;

/* Bara språk som har minst en klipptext. Sidan lovar filmen och den
   skrivna versionen bredvid, och utan text finns ingenting att läsa. */
export function generateStaticParams() {
  return prefixedLocales
    .filter((locale) => harVideoguider(locale))
    .map((locale) => ({ locale }));
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
    /* Bara språken som har skrivna klipptexter. Annars pekade hreflang på
       /sv/videoguider/ och /en/videoguider/, som omdirigeras. */
    availableLocales: locales.filter(harVideoguider),
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/videoguider">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  if (!harVideoguider(locale)) notFound();
  return <VideoguiderPage locale={locale} />;
}
