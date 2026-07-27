import type { Metadata } from "next";
import { company, phone, SITE_URL, social } from "@/content/site";
import {
  getDictionary,
  htmlLang,
  type Locale,
  locales,
  localePath,
} from "@/lib/i18n";

/** hreflang för alla tre språk plus x-default (svenska på roten). */
export function languageAlternates(path = "/"): Record<string, string> {
  const map: Record<string, string> = {};
  locales.forEach((locale) => {
    map[htmlLang[locale]] = localePath(locale, path);
  });
  map["x-default"] = localePath("sv", path);
  return map;
}

export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
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
      languages: languageAlternates(path),
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
    robots: { index: true, follow: true },
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
    url: SITE_URL,
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
    priceRange: "1495–4995 SEK/mån",
  };
}
