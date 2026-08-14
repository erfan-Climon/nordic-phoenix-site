import type { MetadataRoute } from "next";
import { articles } from "@/content/blog";
import { locations } from "@/content/locations";
import { localesForLocation } from "@/content/location-copy";
import { services } from "@/content/services";
import { SITE_URL } from "@/content/site";
import { htmlLang, locales, localePath } from "@/lib/i18n";

// Krävs av `output: export` — filen genereras en gång vid build.
export const dynamic = "force-static";

/**
 * Avslutande snedstreck, eftersom `trailingSlash: true` gör att det är den
 * formen canonical-taggarna använder. Sitemapen ska peka på samma URL.
 */
const abs = (path: string) =>
  new URL(path.endsWith("/") ? path : `${path}/`, SITE_URL).toString();

/** Sidor som finns på alla tre språk. */
const TRANSLATED_PATHS = ["/", "/integritetspolicy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const translated = TRANSLATED_PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: abs(localePath(locale, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [htmlLang[alt], abs(localePath(alt, path))]),
        ),
      },
    })),
  );

  // Bloggen finns bara på svenska — inga språkalternativ.
  const blog = [
    {
      url: abs("/blogg"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...articles.map((article) => ({
      url: abs(`/blogg/${article.slug}`),
      lastModified: new Date(article.published),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];

  // Ortssidorna finns bara på svenska och har inga språkalternativ.
  const orter = [
    {
      url: abs("/redovisningsbyra"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    /* En post per språk orten är översatt till, med alternates som listar
       exakt samma uppsättning. En URL som inte finns får inte stå här. */
    ...locations.flatMap((l) => {
      const sprak = localesForLocation(l.slug);
      const path = `/redovisningsbyra/${l.slug}`;
      return sprak.map((locale) => ({
        url: abs(localePath(locale, path)),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            sprak.map((alt) => [htmlLang[alt], abs(localePath(alt, path))]),
          ),
        },
      }));
    }),
  ];

  /** Tjänstesidorna finns på alla tre språk och länkar till varandra. */
  const tjanstePaths = ["/tjanster", ...services.map((s) => `/tjanster/${s.slug}`)];
  const tjanster = tjanstePaths.flatMap((path) =>
    locales.map((locale) => ({
      url: abs(localePath(locale, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/tjanster" ? 0.8 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [htmlLang[alt], abs(localePath(alt, path))]),
        ),
      },
    })),
  );

  /**
   * Den enda undersidan från den gamla sajten. URL:en behålls oförändrad,
   * eftersom den är indexerad och rankar på persiska sökord. Se sidans egen
   * kommentar innan den flyttas eller tas bort.
   */
  const bevarade = [
    {
      url: abs("/persisk-redovisningsbyra-stockholm"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];

  return [...translated, ...bevarade, ...tjanster, ...orter, ...blog];
}
