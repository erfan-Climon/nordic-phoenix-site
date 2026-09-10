import Image from "next/image";
import Link from "next/link";
import { GooglePreferredSource } from "@/components/ui/GooglePreferredSource";
import type { Article } from "@/content/blog";
import { type ArticleCopy, articleAuthor, articleImage } from "@/content/blog-copy";
import { SITE_URL, company, whatsappUrl } from "@/content/site";
import { type Locale, getDictionary, htmlLang, localePath } from "@/lib/i18n";
import { absolutUrl, breadcrumbJsonLd } from "@/lib/metadata";

/**
 * `article` bär strukturen som är lika på alla språk: slug, datum, bild och
 * lästid. `copy` bär texten på besökarens språk. Samma uppdelning som på
 * ortssidorna, se `content/blog-copy.ts`.
 */
export function ArticlePage({
  article,
  copy,
  locale,
}: {
  article: Article;
  copy: ArticleCopy;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const blogHref = localePath(locale, "/blogg");
  const bild = articleImage(article, copy);
  const forfattare = articleAuthor(copy, locale);

  /* Två scheman i en graf. FAQPage är det som ger utfällbara frågor direkt i
     sökresultatet, och kräver att frågorna också syns på sidan: Google
     underkänner schema som beskriver innehåll besökaren inte kan läsa. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: copy.title,
        description: copy.excerpt,
        datePublished: article.published,
        dateModified: article.published,
        image: `${SITE_URL}${bild}`,
        mainEntityOfPage: absolutUrl(`${blogHref}/${article.slug}`),
        /* Alltid en namngiven person, aldrig bara byrån. Google behandlar
           namngivet författarskap som en styrka på innehåll om pengar och
           skatt, och saknar artikeln egen skribent faller den tillbaka på
           byråns standardförfattare. */
        author: {
          "@type": "Person",
          name: forfattare.name,
          jobTitle: forfattare.jobTitle,
          worksFor: { "@type": "Organization", name: company.legalName },
        },
        publisher: {
          "@type": "Organization",
          name: company.legalName,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/phoenix-logo.png`,
          },
        },
        inLanguage: htmlLang[locale],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.map((post) => ({
          "@type": "Question",
          name: post.q,
          acceptedAnswer: { "@type": "Answer", text: post.a },
        })),
      },
    ],
  };

  /* Egen tagg och inte en post i grafen ovan: brödsmulan beskriver var
     sidan sitter i sajten, inte vad artikeln handlar om. Google läser båda
     lika bra var för sig. */
  const brodsmulor = breadcrumbJsonLd(locale, [
    { name: t.nav.blog, path: blogHref },
    { name: copy.title, path: `${blogHref}/${article.slug}` },
  ]);

  return (
    <>
      {[jsonLd, brodsmulor].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="mx-auto max-w-[900px] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)]">
        <Link
          href={blogHref}
          className="np-mono-link text-[12px] tracking-[.16em] text-text-meta hover:text-accent-ink"
        >
          {t.blog.backToAll}
        </Link>

        <div className="my-9 mb-6 flex gap-4 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
          <span>{copy.tag}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.published}>{copy.date}</time>
          <span aria-hidden="true">·</span>
          <span>
            {article.readingMinutes} {t.blog.readingTime}
          </span>
        </div>

        <h1 className="np-h2 mb-6 text-[length:var(--fs-h1)] leading-[1.05]">
          {copy.titleLead}{" "}
          <em className="np-gradient-text">{copy.titleAccent}</em>
        </h1>

        <p className="m-0 mb-[clamp(40px,5vw,64px)] max-w-[56ch] font-sans text-[clamp(16px,1.5vw,20px)] leading-[1.65] text-text-muted">
          {copy.intro}
        </p>

        <Image
          src={bild}
          alt={copy.imageAlt}
          width={900}
          height={600}
          priority
          className="block h-auto w-full rounded-media shadow-[0_24px_64px_rgba(23,19,16,.16)]"
        />
      </section>

      <article className="mx-auto max-w-[720px] px-[var(--pad-x)] pt-[clamp(48px,6vw,80px)] pb-[clamp(96px,12vw,160px)]">
        {copy.blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h2
                key={i}
                className="np-h2 mb-5 text-[length:var(--fs-h3)] leading-[1.2] tracking-[-.01em]"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "paragraph") {
            const nextIsHeading =
              copy.blocks[i + 1]?.type !== "paragraph";
            return (
              <p
                key={i}
                /* np-justerad ger rak högerkant, alltså samma start och slut
                   på varje rad. Avstavningen som följer med är inte valfri,
                   se kommentaren vid klassen i globals.css. */
                className={`np-justerad font-sans text-[17px] leading-[1.8] text-text-article ${
                  nextIsHeading ? "mt-0 mb-10" : "mt-0 mb-[18px]"
                }`}
              >
                {block.text}
              </p>
            );
          }

          return (
            <div
              key={i}
              className="mb-10 rounded-media bg-ink p-[clamp(32px,4vw,48px)] text-on-dark"
            >
              <p className="m-0 mb-5 font-mono text-[11px] tracking-[.24em] text-text-meta uppercase">
                {block.label}
              </p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(24px,3vw,40px)]">
                {block.columns.map((column) => (
                  <div key={column.title} className="flex flex-col gap-3">
                    <h3
                      className={`np-h3 text-[24px] ${
                        column.accent ? "text-accent-light" : "text-on-dark"
                      }`}
                    >
                      {column.title}
                    </h3>
                    <p className="m-0 font-sans text-[14px] leading-[1.7] text-on-dark-muted">
                      {column.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Handlingschecklistan ligger på mörk platta, samma grepp som
            callout-blocken, så att den läser som en sammanfattning och inte
            som ännu ett stycke. */}
        <div className="mt-[clamp(40px,5vw,64px)] rounded-media bg-ink p-[clamp(32px,4vw,48px)] text-on-dark">
          <h2 className="np-mono m-0 mb-6 font-mono text-[11px] tracking-[.24em] text-text-meta uppercase">
            {t.blog.checklistTitle}
          </h2>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {copy.checklist.map((item) => (
              <li key={item} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full bg-accent"
                />
                <span className="font-sans text-[16px] leading-[1.65] text-on-dark">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Frågorna måste stå som läsbar text på sidan. FAQPage-schemat i
            huvudet beskriver just de här frågorna, och Google underkänner
            schema vars innehåll besökaren inte kan se. */}
        <section className="mt-[clamp(48px,6vw,72px)]">
          <h2 className="np-h2 mb-8 text-[length:var(--fs-h3)] leading-[1.2] tracking-[-.01em]">
            {t.blog.faqTitle}
          </h2>
          <dl className="m-0 flex flex-col">
            {copy.faq.map((post) => (
              <div
                key={post.q}
                className="border-t border-[rgba(23,19,16,.14)] py-7 last:border-b"
              >
                <dt className="np-h3 mb-3 font-heading text-[19px] leading-[1.35]">
                  {post.q}
                </dt>
                <dd className="m-0 font-sans text-[16px] leading-[1.75] text-text-muted">
                  {post.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Källorna står mellan frågorna och skribenten: först vad som
            påstås, sedan varifrån det kommer, sist vem som svarar för det.

            Bara myndigheter och normgivare, och varje adress är läst igenom
            innan den lades in. Fyra av artiklarna saknar kontrollerbara
            sakuppgifter och får då inget block alls.

            rel noopener på länkar som öppnas i ny flik, och en synlig
            understrykning: en källhänvisning som inte ser ut som en länk
            fyller ingen funktion. */}
        {article.kallor?.length ? (
          <section className="mt-[clamp(48px,6vw,72px)] border-t border-[rgba(23,19,16,.14)] pt-8">
            <h2 className="np-mono m-0 mb-4 font-mono text-[11px] tracking-[.24em] text-text-meta uppercase">
              {t.blog.sourcesTitle}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {article.kallor.map((kalla) => (
                <li key={kalla.url} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent"
                  />
                  <a
                    href={kalla.url}
                    target="_blank"
                    rel="noopener"
                    className="font-sans text-[15px] leading-[1.65] text-text-muted underline decoration-[rgba(23,19,16,.25)] underline-offset-[3px] transition-colors duration-300 hover:text-accent-ink"
                  >
                    {kalla.titel}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Skribenten står efter frågorna och före uppmaningen: läsaren
            möter avsändaren när argumenten är klara, precis innan hen ombeds
            höra av sig. */}
        {/* Alltid en skribent. Villkoret som fanns här gjorde att rutan
            saknades på alla artiklar utom en, och en guide om skatt utan
            avsändare är svagare både för läsaren och i Googles bedömning. */}
        {(
          <section className="mt-[clamp(48px,6vw,72px)] rounded-media border border-[rgba(23,19,16,.12)] bg-page p-[clamp(28px,3.5vw,44px)]">
            <p className="np-mono m-0 mb-5 font-mono text-[11px] tracking-[.24em] text-text-meta uppercase">
              {t.blog.authorLabel}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
              <p className="np-h3 m-0 font-heading text-[22px] leading-[1.2]">
                {forfattare.name}
              </p>
            </div>
            {/* Bara namn och roll. Här stod tidigare en presentation på tre
                rader, men rutan ska säga vem som skrivit, inte berätta en
                historia. Fältet är borttaget ur innehållet också, det syns
                inte i strukturerad data och hade bara blivit död text. */}
            <p className="m-0 mt-1 ms-[19px] font-sans text-[14px] tracking-[.02em] text-text-meta">
              {forfattare.role}
            </p>
          </section>
        )}

        {/* Ligger efter skribenten men före den kommersiella uppmaningen.
            Att lägga den sist hade skjutit "kontakta oss" uppåt och gjort en
            sekundär åtgärd till artikelns sista intryck. */}
        <GooglePreferredSource t={t} />

        <div className="mt-[clamp(48px,6vw,72px)] flex flex-wrap items-center justify-between gap-5 border-t border-[rgba(23,19,16,.14)] pt-9">
          <div className="flex max-w-[52ch] flex-col gap-[6px]">
            <span className="font-heading text-[22px]">{t.blog.ctaTitle}</span>
            {/* Artikelns egen uppmaning, inte den generella. Contentplanen
                skriver en per artikel som knyter an till just det ämnet. */}
            <span className="font-sans text-[14px] leading-[1.6] text-text-muted">
              {copy.cta}
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener"
            className="np-btn np-btn-primary px-8 py-4 text-[15px]"
          >
            {t.blog.ctaButton}
          </a>
        </div>
      </article>
    </>
  );
}
