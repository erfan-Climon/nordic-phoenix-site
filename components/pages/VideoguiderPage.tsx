import Link from "next/link";
import { articles } from "@/content/blog";
import { getArticleCopy } from "@/content/blog-copy";
import { publiceradeKlipp } from "@/content/klipp";
import { social } from "@/content/site";
import { type Locale, getDictionary, localePath } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/metadata";

/**
 * Videoguiderna: varje klipp tillsammans med artikeln som hör till det.
 *
 * Klippen finns redan i en rad på startsidan, men där ryms bara en rubrik
 * per ruta. Här får varje klipp sin ingress och en väg vidare till den
 * skrivna versionen, för den som hellre läser än tittar.
 *
 * Artikeln hittas via `klipp`-fältet på artikeln och inte tvärtom. Ett
 * klipp kan finnas utan artikel, under tiden texten skrivs, och då visas
 * bara filmen. En artikel utan klipp hör hemma i bloggen och inte här.
 */
export function VideoguiderPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const poster = publiceradeKlipp.map((klipp) => {
    const artikel = articles.find((a) => a.klipp === klipp.slug);
    const copy = artikel ? getArticleCopy(artikel, locale) : undefined;
    return { klipp, artikel, copy };
  });

  const brodsmulor = breadcrumbJsonLd(locale, [
    { name: t.videoguider.label, path: localePath(locale, "/videoguider") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brodsmulor) }}
      />

      <section className="mx-auto max-w-[1100px] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)]">
        <p className="np-label mb-7 text-accent-ink">{t.videoguider.label}</p>
        <h1 className="np-h2 mb-6 text-[length:var(--fs-h1)] leading-[1.05]">
          {t.videoguider.h1a}{" "}
          <em className="np-gradient-text">{t.videoguider.h1b}</em>
        </h1>
        <p className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.5vw,20px)] leading-[1.65] text-text-muted">
          {t.videoguider.intro}
        </p>
      </section>

      <div className="mx-auto max-w-[1100px] px-[var(--pad-x)] pt-[clamp(48px,6vw,80px)] pb-[clamp(96px,12vw,160px)]">
        <ul className="m-0 flex list-none flex-col gap-[clamp(40px,5vw,72px)] p-0">
          {poster.map(({ klipp, artikel, copy }) => (
            <li
              key={klipp.slug}
              /* Filmen i en smal spalt och texten bredvid. Klippen är 9:16,
                 så full bredd hade gett en orimligt hög video. Under 768
                 läggs de på varandra med filmen överst. */
              className="grid grid-cols-1 items-start gap-[clamp(20px,3vw,40px)] border-t border-[rgba(23,19,16,.14)] pt-[clamp(28px,3.5vw,48px)] first:border-t-0 first:pt-0 md:grid-cols-[260px_minmax(0,1fr)]"
            >
              <video
                src={klipp.fil}
                poster={klipp.affisch}
                controls
                playsInline
                preload="none"
                title={klipp.titel[locale]}
                className="block h-auto w-full max-w-[260px] rounded-media bg-ink shadow-[0_18px_48px_rgba(23,19,16,.14)]"
              />

              <div className="min-w-0">
                <h2 className="np-h2 mt-0 mb-4 text-[length:var(--fs-h3)] leading-[1.25] tracking-[-.01em]">
                  {copy ? copy.title : klipp.titel[locale]}
                </h2>

                {copy ? (
                  <p className="m-0 mb-6 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-article">
                    {copy.excerpt}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {artikel && copy ? (
                    <Link
                      href={`${localePath(locale, "/blogg")}/${artikel.slug}`}
                      className="np-btn np-btn-primary px-7 py-[14px] text-[14px]"
                    >
                      {t.videoguider.lasArtikeln}
                    </Link>
                  ) : null}
                  <a
                    href={klipp.permalank}
                    target="_blank"
                    rel="noopener"
                    className="font-sans text-[14px] text-text-muted underline-offset-4 hover:text-accent-ink hover:underline"
                  >
                    {t.blog.seKlippet}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(48px,6vw,72px)] flex flex-wrap items-center justify-between gap-5 border-t border-[rgba(23,19,16,.14)] pt-9">
          <span className="max-w-[52ch] font-sans text-[15px] leading-[1.65] text-text-muted">
            {t.videoguider.foljText}
          </span>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener"
            className="np-btn np-btn-outline px-7 py-[14px] text-[14px]"
          >
            {t.klipp.folj}
          </a>
        </div>
      </div>
    </>
  );
}
