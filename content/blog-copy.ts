import { type Article, articles } from "@/content/blog";
import { articlesFa } from "@/content/blog.fa";
import { type Locale, locales } from "@/lib/i18n";

/**
 * Den översättningsbara delen av en artikel.
 *
 * Utanför står `slug`, `published` och `image`, som är struktur och identisk
 * på alla språk. `readingMinutes` står också utanför: persisk text blir olika
 * lång, men skillnaden är för liten för att motivera ett eget värde per språk.
 */
export type ArticleCopy = Omit<
  Article,
  "slug" | "published" | "image" | "readingMinutes"
>;

const TABELLER: Partial<Record<Locale, Record<string, ArticleCopy>>> = {
  fa: articlesFa,
};

/**
 * Ingen reserv till svenskan, av samma skäl som för ortssidorna.
 *
 * En artikel under /fa som visar svensk text är en dubblett av den svenska
 * artikeln, och Google har inget sätt att se att det är ett misstag. Saknas
 * översättningen finns ingen URL att indexera fel.
 */
export function getArticleCopy(
  article: Article,
  locale: Locale,
): ArticleCopy | undefined {
  if (locale === "sv") return article;
  return TABELLER[locale]?.[article.slug];
}

/** Språk artikeln finns på. Svenskan finns alltid. */
export function localesForArticle(slug: string): Locale[] {
  return locales.filter(
    (locale) => locale === "sv" || Boolean(TABELLER[locale]?.[slug]),
  );
}

/** Slugar som är översatta till ett visst språk. Styr generateStaticParams. */
export function translatedArticleSlugs(locale: Locale): string[] {
  if (locale === "sv") return articles.map((article) => article.slug);
  return Object.keys(TABELLER[locale] ?? {});
}

/** Artiklar som finns på språket, i samma ordning som den svenska listan. */
export function articlesForLocale(
  locale: Locale,
): { article: Article; copy: ArticleCopy }[] {
  return articles.flatMap((article) => {
    const copy = getArticleCopy(article, locale);
    return copy ? [{ article, copy }] : [];
  });
}

/** Sant om språket har minst en översatt artikel, alltså en blogg att visa. */
export function hasTranslatedArticles(locale: Locale): boolean {
  return articlesForLocale(locale).length > 0;
}

/** Språk där blogglistningen finns, alltså har något att visa. */
export function localesWithBlogIndex(): Locale[] {
  return locales.filter(hasTranslatedArticles);
}
