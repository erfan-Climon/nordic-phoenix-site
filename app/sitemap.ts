import type { MetadataRoute } from "next";
import { articles } from "@/content/blog";
import { SITE_URL } from "@/content/site";
import { htmlLang, locales, localePath } from "@/lib/i18n";

// Krävs av `output: export` — filen genereras en gång vid build.
export const dynamic = "force-static";

const abs = (path: string) => new URL(path, SITE_URL).toString();

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

  return [...translated, ...blog];
}
