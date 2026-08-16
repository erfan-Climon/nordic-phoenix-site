import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/blog";
import { type ArticleCopy, articleImage } from "@/content/blog-copy";
import { SITE_URL, company, whatsappUrl } from "@/content/site";
import { type Locale, getDictionary, htmlLang, localePath } from "@/lib/i18n";

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
        mainEntityOfPage: `${SITE_URL}${blogHref}/${article.slug}`,
        /* Person när artikeln har en skribent, annars byrån. Google
           behandlar namngivet författarskap som en styrka på innehåll om
           pengar och skatt. */
        author: copy.author
          ? {
              "@type": "Person",
              name: copy.author.name,
              jobTitle: copy.author.jobTitle,
              worksFor: { "@type": "Organization", name: company.legalName },
            }
          : { "@type": "Organization", name: company.legalName },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                className={`font-sans text-[17px] leading-[1.8] text-text-article ${
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

        {/* Skribenten står efter frågorna och före uppmaningen: läsaren
            möter avsändaren när argumenten är klara, precis innan hen ombeds
            höra av sig. */}
        {copy.author ? (
          <section className="mt-[clamp(48px,6vw,72px)] rounded-media border border-[rgba(23,19,16,.12)] bg-page p-[clamp(28px,3.5vw,44px)]">
            <p className="np-mono m-0 mb-5 font-mono text-[11px] tracking-[.24em] text-text-meta uppercase">
              {t.blog.authorLabel}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
              <p className="np-h3 m-0 font-heading text-[22px] leading-[1.2]">
                {copy.author.name}
              </p>
            </div>
            <p className="m-0 mt-1 ms-[19px] font-sans text-[14px] tracking-[.02em] text-text-meta">
              {copy.author.role}
            </p>
            <p className="m-0 mt-5 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {copy.author.bio}
            </p>
          </section>
        ) : null}

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
