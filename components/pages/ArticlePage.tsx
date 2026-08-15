import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/blog";
import { SITE_URL, company, whatsappUrl } from "@/content/site";
import { getDictionary } from "@/lib/i18n";

export function ArticlePage({ article }: { article: Article }) {
  const t = getDictionary("sv");

  /* Två scheman i en graf. FAQPage är det som ger utfällbara frågor direkt i
     sökresultatet, och kräver att frågorna också syns på sidan: Google
     underkänner schema som beskriver innehåll besökaren inte kan läsa. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.published,
        dateModified: article.published,
        image: `${SITE_URL}${article.image}`,
        mainEntityOfPage: `${SITE_URL}/blogg/${article.slug}`,
        author: { "@type": "Organization", name: company.legalName },
        publisher: {
          "@type": "Organization",
          name: company.legalName,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/phoenix-logo.png`,
          },
        },
        inLanguage: "sv-SE",
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((post) => ({
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
          href="/blogg"
          className="np-mono-link text-[12px] tracking-[.16em] text-text-meta hover:text-accent-ink"
        >
          {t.blog.backToAll}
        </Link>

        <div className="my-9 mb-6 flex gap-4 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
          <span>{article.tag}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.published}>{article.date}</time>
          <span aria-hidden="true">·</span>
          <span>
            {article.readingMinutes} {t.blog.readingTime}
          </span>
        </div>

        <h1 className="np-h2 mb-6 text-[length:var(--fs-h1)] leading-[1.05]">
          {article.titleLead}{" "}
          <em className="np-gradient-text">{article.titleAccent}</em>
        </h1>

        <p className="m-0 mb-[clamp(40px,5vw,64px)] max-w-[56ch] font-sans text-[clamp(16px,1.5vw,20px)] leading-[1.65] text-text-muted">
          {article.intro}
        </p>

        <Image
          src={article.image}
          alt={article.imageAlt}
          width={900}
          height={600}
          priority
          className="block h-auto w-full rounded-media shadow-[0_24px_64px_rgba(23,19,16,.16)]"
        />
      </section>

      <article className="mx-auto max-w-[720px] px-[var(--pad-x)] pt-[clamp(48px,6vw,80px)] pb-[clamp(96px,12vw,160px)]">
        {article.blocks.map((block, i) => {
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
              article.blocks[i + 1]?.type !== "paragraph";
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
            {article.checklist.map((item) => (
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
            {article.faq.map((post) => (
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

        <div className="mt-[clamp(48px,6vw,72px)] flex flex-wrap items-center justify-between gap-5 border-t border-[rgba(23,19,16,.14)] pt-9">
          <div className="flex max-w-[52ch] flex-col gap-[6px]">
            <span className="font-heading text-[22px]">{t.blog.ctaTitle}</span>
            {/* Artikelns egen uppmaning, inte den generella. Contentplanen
                skriver en per artikel som knyter an till just det ämnet. */}
            <span className="font-sans text-[14px] leading-[1.6] text-text-muted">
              {article.cta}
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
