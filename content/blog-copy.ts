import { type Article, type Author, articles } from "@/content/blog";
import { articlesFa } from "@/content/blog.fa";
import { publiceradeKlipp } from "@/content/klipp";
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
  /* En artikel som bara finns på ett språk bär sin text i själva posten,
     vilket språk det än är. Den ska inte renderas på något annat. */
  if (article.endastSprak) {
    return article.endastSprak === locale ? article : undefined;
  }
  if (locale === "sv") return article;
  return TABELLER[locale]?.[article.slug];
}

/**
 * Sant när minst ett publicerat klipp har en artikel på språket.
 *
 * Videoguidesidan lovar filmen och den skrivna versionen bredvid. Finns
 * ingen text på språket håller sidan inte vad den säger, och då ska den
 * varken finnas eller stå i menyn. Samma regel som blogglistningen följer
 * via `hasTranslatedArticles`.
 */
export function harVideoguider(locale: Locale): boolean {
  return publiceradeKlipp.some((klipp) => {
    const artikel = articles.find((a) => a.klipp === klipp.slug);
    return artikel ? Boolean(getArticleCopy(artikel, locale)) : false;
  });
}

/** Språk artikeln finns på. Svenskan finns alltid, utom på enspråkiga. */
export function localesForArticle(slug: string): Locale[] {
  const article = articles.find((a) => a.slug === slug);
  if (article?.endastSprak) return [article.endastSprak];
  return locales.filter(
    (locale) => locale === "sv" || Boolean(TABELLER[locale]?.[slug]),
  );
}

/**
 * Slugar som finns på språket. Styr generateStaticParams.
 *
 * Utgår från `articles`, alltså de släppta artiklarna. Tidigare lästes den
 * persiska tabellen rakt av, och då fick osläppta artiklar en /fa-sida trots
 * att den svenska inte fanns. Sitemapen var rätt, men sidorna låg där för
 * den som hittade dem.
 */
export function translatedArticleSlugs(locale: Locale): string[] {
  return articles
    .filter((article) => Boolean(getArticleCopy(article, locale)))
    .map((article) => article.slug);
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

/**
 * Artiklarna som hör hemma i blogglistningen.
 *
 * Klippartiklarna står för sig på vloggsidan, med filmen bredvid texten.
 * Samma artikel på båda ställena gjorde Insikter rörig: den som klickar där
 * vill läsa guiderna, och den som vill se klippen går via undermenyn.
 * Artiklarnas egna sidor finns kvar precis som förut, det är bara ingången
 * som skiljs åt.
 */
export function bloggArtiklarForLocale(
  locale: Locale,
): { article: Article; copy: ArticleCopy }[] {
  return articlesForLocale(locale).filter(({ article }) => !article.klipp);
}

/** Sant om språket har minst en översatt artikel, alltså en blogg att visa. */
export function hasTranslatedArticles(locale: Locale): boolean {
  return articlesForLocale(locale).length > 0;
}

/** Språk där blogglistningen finns, alltså har något att visa. */
export function localesWithBlogIndex(): Locale[] {
  return locales.filter(hasTranslatedArticles);
}

/**
 * Skribenten som gäller när artikeln inte pekar ut någon.
 *
 * Varje guide ska ha en namngiven avsändare. Google väger E-E-A-T tyngst på
 * innehåll som rör pengar och skatt, och ett skatteråd utan person bakom sig
 * bedöms hårdare än samma text med en. Namnet går dessutom in i
 * BlogPosting-schemat som Person i stället för Organization.
 *
 * Ligger som en gemensam standard och inte som ett block per artikel. Ali
 * skriver allt i dag, så tolv kopior hade bara varit tolv ställen att glömma
 * vid nästa ändring. Artikelns eget `author` vinner när det finns, vilket är
 * vägen in för en gästskribent.
 *
 * Namnet översätts inte. Rollen gör det, och yrkestiteln står kvar på
 * svenska även i persiskan: det är den formen persisktalande företagare
 * möter hos byråer och myndigheter.
 */
const STANDARD_FORFATTARE: Record<Locale, Author> = {
  sv: {
    name: "Ali Nahroudi",
    role: "Grundare och ägare",
    jobTitle: "Redovisningskonsult",
  },
  en: {
    name: "Ali Nahroudi",
    role: "Founder and owner",
    jobTitle: "Redovisningskonsult",
  },
  fa: {
    name: "Ali Nahroudi",
    role: "بنیان‌گذار و مالک",
    jobTitle: "Redovisningskonsult",
  },
};

export function articleAuthor(copy: ArticleCopy, locale: Locale): Author {
  return copy.author ?? STANDARD_FORFATTARE[locale];
}
