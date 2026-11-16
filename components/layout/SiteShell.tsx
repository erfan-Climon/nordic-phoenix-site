import { ChatWidget } from "@/components/layout/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Matning } from "@/components/layout/Matning";
import { MotionRuntime } from "@/components/layout/MotionRuntime";
import { Samtycke } from "@/components/layout/Samtycke";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { harVideoguider, hasTranslatedArticles } from "@/content/blog-copy";
import { getDictionary, type Locale, localePath } from "@/lib/i18n";

/** Allt som ligger runt sidinnehållet — delas av alla rotlayouter. */
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);

  /**
   * Bloggen finns bara på de språk som har översatta artiklar. Engelskan har
   * inga, så `/en/blogg` byggs inte alls och en länk dit hade gett 404.
   *
   * Adressen räknas ut här och inte i Header av två skäl. Header är en
   * klientkomponent, och att läsa artikellistan där hade dragit in hela
   * `blog.ts` i klientpaketet. Dessutom låg adressen tidigare hårdkodad till
   * `/blogg`, som är rotens språk, alltså persiska. Svenska besökare som
   * klickade på Blogg hamnade därför på den persiska bloggen.
   */
  const bloggHref = hasTranslatedArticles(locale)
    ? localePath(locale, "/blogg")
    : localePath("sv", "/blogg");

  /* Null när språket saknar klipptexter. Räknas ut här av samma skäl som
     bloggadressen: Header är en klientkomponent och ska inte läsa
     artikellistan. */
  const videoguiderHref = harVideoguider(locale)
    ? localePath(locale, "/videoguider")
    : null;

  return (
    <>
      <Header
        locale={locale}
        t={t}
        bloggHref={bloggHref}
        videoguiderHref={videoguiderHref}
      />
      <main>{children}</main>
      <Footer locale={locale} t={t} />
      <ScrollToTop href={`${localePath(locale, "/")}#top`} label={t.a11y.toTop} />
      <MotionRuntime />
      <ChatWidget />
      <Matning />
      <Samtycke locale={locale} t={t} />
    </>
  );
}
