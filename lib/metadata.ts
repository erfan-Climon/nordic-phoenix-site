import type { Metadata } from "next";
import { services } from "@/content/services";
import { getServiceCopy } from "@/content/service-copy";
import { company, phone, SITE_URL, social } from "@/content/site";
import { isPreview } from "@/lib/preview";
import {
  getDictionary,
  htmlLang,
  type Locale,
  locales,
  localePath,
} from "@/lib/i18n";

/**
 * Absolut adress med avslutande snedstreck.
 *
 * Sajten byggs med `trailingSlash: true`, så canonical och sitemap slutar
 * med snedstreck. Schemat gjorde inte det, och pekade alltså på en adress
 * som styr om till den kanoniska. Det försvagar kopplingen mellan
 * företaget och sidan, vilket är precis den kopplingen schemat finns för.
 */
export function absolutUrl(path: string): string {
  const rensad = path.replace(/\/+$/, "");
  return `${SITE_URL}${rensad}/`;
}

/**
 * hreflang för de språk sidan faktiskt finns på, plus x-default.
 *
 * `available` finns för sidor som inte är översatta hela vägen. Att peka
 * hreflang på en språkversion som inte existerar, eller som visar svensk text
 * under /fa, får Google att behandla sidorna som dubbletter. Utelämnas
 * argumentet antas alla tre språken finnas.
 */
export function languageAlternates(
  path = "/",
  available: readonly Locale[] = locales,
): Record<string, string> {
  const map: Record<string, string> = {};
  available.forEach((locale) => {
    map[htmlLang[locale]] = localePath(locale, path);
  });
  /* x-default pekar på svenskan när den finns, annars första tillgängliga.
     Den står kvar på svenska även efter att roten blev persisk, och det är
     med flit: x-default gäller besökare vars språk inte matchar något av
     alternativen, och de är per definition inte persisktalande. En besökare
     med tyskt eller finskt webbläsarspråk ska mötas av svenska hos en svensk
     byrå. Valet påverkar inte vilken sida som rankar, bara vilken Google
     föreslår när inget språk passar. */
  const fallback = available.includes("sv") ? "sv" : available[0];
  if (fallback) map["x-default"] = localePath(fallback, path);
  return map;
}

export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
  availableLocales,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  /** Språk sidan finns på. Utelämnas den antas alla tre. */
  availableLocales?: readonly Locale[];
}): Metadata {
  const t = getDictionary(locale);
  const resolvedTitle = title ?? t.meta.title;
  const resolvedDescription = description ?? t.meta.description;
  const url = localePath(locale, path);

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    // Statiska filer i public/ — dynamiska bildrutter (ImageResponse) skrivs
    // ut utan filändelse i `output: export` och får fel Content-Type.
    icons: {
      icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
      apple: "/icon.png",
    },
    alternates: {
      canonical: url,
      languages: languageAlternates(path, availableLocales),
    },
    openGraph: {
      type: "website",
      siteName: company.legalName,
      locale: htmlLang[locale],
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: company.legalName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
    /* robots.txt räcker inte på granskningskopian: en spärrad sida kan ändå
       hamna i index om någon länkar till den. noindex på sidan är det som
       faktiskt håller. */
    robots: isPreview
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}

/**
 * AccountingService-schema. Byrån tar emot kunder i hela Sverige digitalt,
 * därför både adress och areaServed.
 */
export function accountingServiceJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: company.legalName,
    alternateName: company.shortName,
    description: t.meta.description,
    url: absolutUrl("/"),
    telephone: phone.international,
    identifier: company.orgNumber,
    vatID: `SE${company.orgNumber.replace("-", "")}01`,
    image: `${SITE_URL}/assets/phoenix-logo.png`,
    logo: `${SITE_URL}/assets/phoenix-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: { "@type": "Country", name: "Sweden" },
    availableLanguage: ["sv", "en", "fa"],
    sameAs: [social.instagram, social.facebook, social.tiktok],
    /* De sex tjänsterna knutna till företaget, var och en med sin egen
       adress. Det binder ihop tjänstesidorna med byrån som enhet i stället
       för att de ska stå som lösa sidor, och är den form Google läser när
       den avgör vad ett företag erbjuder.

       Det garanterar ingenting. Länkraderna under ett sökträff kallas
       sitelinks och plockas fram algoritmiskt; det finns ingen uppmärkning
       som beställer dem. Det här är förutsättningen, inte knappen. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.servicePage.services,
      itemListElement: services.map((service) => {
        const copy = getServiceCopy(service, locale);
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: copy.name,
            description: copy.metaDescription,
            url: absolutUrl(`${localePath(locale, "/tjanster")}/${service.slug}`),
            provider: { "@type": "AccountingService", name: company.legalName },
          },
        };
      }),
    },
  };
}

/**
 * Sidnavigeringen som schema: de sex tjänsterna med namn och adress.
 *
 * Skilt från katalogen ovan med flit. Katalogen beskriver vad byrån säljer,
 * det här beskriver hur sajten är byggd. Google använder det senare när den
 * avgör vilka undersidor som är huvudingångar.
 */
export function siteNavigationJsonLd(locale: Locale) {
  const base = localePath(locale, "/tjanster");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => {
      const copy = getServiceCopy(service, locale);
      return {
        "@type": "SiteNavigationElement",
        position: i + 1,
        name: copy.name,
        description: copy.intro.split(". ")[0] + ".",
        url: absolutUrl(`${base}/${service.slug}`),
      };
    }),
  };
}
