import Image from "next/image";
import Link from "next/link";
import { GooglePreferredSource } from "@/components/ui/GooglePreferredSource";
import { articleImage, articlesForLocale } from "@/content/blog-copy";
import { type Locale, getDictionary, localePath } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/metadata";

const cardBase =
  "flex flex-col overflow-hidden rounded-card border border-[rgba(23,19,16,.1)] bg-surface";

/**
 * Blogglistningen. Prototypen låg kvar på v3-paletten (#B4520F/#F2EDE3) —
 * här används startsidans v4-tokens, enligt handoffens "samma tokens".
 */
export function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const blogHref = localePath(locale, "/blogg");
  const [featured, ...rest] = articlesForLocale(locale);

  const brodsmulor = breadcrumbJsonLd(locale, [
    { name: t.nav.blog, path: blogHref },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brodsmulor) }}
      />

      <section className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(160px,20vh,240px)] pb-[clamp(56px,7vw,88px)]">
        <p className="np-meta m-0 mb-7 tracking-[.24em] text-text-meta">
          {t.blog.eyebrow}
        </p>
        <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-none tracking-[-.025em]">
          {t.blog.h1a} <em className="np-gradient-text">{t.blog.h1b}</em>
        </h1>
        <p className="m-0 max-w-[52ch] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-text-muted">
          {t.blog.intro}
        </p>
      </section>

      <section className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(96px,12vw,160px)]">
        {featured ? (
          <Link
            href={`${blogHref}/${featured.article.slug}`}
            className="mb-[clamp(24px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center overflow-hidden rounded-media border border-[rgba(23,19,16,.1)] bg-surface text-inherit no-underline transition-[transform,box-shadow] duration-[.35s] ease-[var(--ease)] hover:-translate-y-[6px] hover:shadow-[0_24px_56px_rgba(23,19,16,.12)]"
          >
            <Image
              src={articleImage(featured.article, featured.copy)}
              alt={featured.copy.imageAlt}
              width={840}
              height={560}
              priority
              className="block h-full min-h-[280px] w-full object-cover"
            />
            <div className="flex flex-col gap-4 p-[clamp(28px,4vw,56px)]">
              <div className="flex justify-between gap-3 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
                <span>
                  {t.blog.featured} · {featured.copy.tag}
                </span>
                <span>{featured.copy.date}</span>
              </div>
              <h2 className="np-h2 text-[length:var(--fs-h3)] leading-[1.15] tracking-[-.015em]">
                {featured.copy.title}
              </h2>
              <p className="m-0 font-sans text-[15px] leading-[1.7] text-text-muted">
                {featured.copy.excerpt}
              </p>
              <span className="font-sans text-[14px] font-medium text-accent-ink">
                {t.blog.readArticle}
              </span>
            </div>
          </Link>
        ) : null}

        {/* Efter den utvalda artikeln och före rutnätet. Läsaren har då sett
            vad sajten skriver om, vilket är det som gör uppmaningen begriplig,
            men har ännu inte klickat sig vidare. */}
        <div className="mb-[clamp(24px,3vw,40px)]">
          <GooglePreferredSource t={t} kompakt />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(24px,3vw,40px)]">
          {rest.map(({ article, copy }) => (
            <Link
              key={article.slug}
              href={`${blogHref}/${article.slug}`}
              className={`${cardBase} text-inherit no-underline transition-[transform,box-shadow] duration-[.35s] ease-[var(--ease)] hover:-translate-y-[6px] hover:shadow-[0_24px_56px_rgba(23,19,16,.12)]`}
            >
              <Image
                src={articleImage(article, copy)}
                alt={copy.imageAlt}
                width={600}
                height={220}
                className="block h-[220px] w-full object-cover"
              />
              <CardBody
                tag={copy.tag}
                date={copy.date}
                title={copy.title}
                excerpt={copy.excerpt}
                action={t.blog.readArticle}
                accent
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function CardBody({
  tag,
  date,
  title,
  excerpt,
  action,
  accent = false,
}: {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  action: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-[14px] p-[clamp(24px,2.5vw,36px)]">
      <div className="flex justify-between gap-3 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
        <span>{tag}</span>
        <span>{date}</span>
      </div>
      <h2 className="np-h2 text-[length:var(--fs-h3-sm)] leading-[1.2] tracking-[-.01em]">
        {title}
      </h2>
      <p className="m-0 flex-1 font-sans text-[14px] leading-[1.65] text-text-muted">
        {excerpt}
      </p>
      <span
        className={`font-sans text-[13px] font-medium ${
          accent ? "text-accent-ink" : "text-text-meta"
        }`}
      >
        {action}
      </span>
    </div>
  );
}
