import Image from "next/image";
import Link from "next/link";
import { articles, upcomingPosts } from "@/content/blog";
import { getDictionary } from "@/lib/i18n";

const cardBase =
  "flex flex-col overflow-hidden rounded-card border border-[rgba(23,19,16,.1)] bg-surface";

/**
 * Blogglistningen. Prototypen låg kvar på v3-paletten (#B4520F/#F2EDE3) —
 * här används startsidans v4-tokens, enligt handoffens "samma tokens".
 */
export function BlogIndexPage() {
  const t = getDictionary("sv");
  const [featured, ...rest] = articles;

  return (
    <>
      <section className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(160px,20vh,240px)] pb-[clamp(56px,7vw,88px)]">
        <p className="np-meta m-0 mb-7 tracking-[.24em] text-text-meta">
          {t.blog.eyebrow}
        </p>
        <h1 className="np-h2 mb-7 text-[clamp(48px,8vw,120px)] leading-none tracking-[-.025em]">
          {t.blog.h1a} <em className="np-gradient-text">{t.blog.h1b}</em>
        </h1>
        <p className="m-0 max-w-[52ch] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-text-muted">
          {t.blog.intro}
        </p>
      </section>

      <section className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(96px,12vw,160px)]">
        {featured ? (
          <Link
            href={`/blogg/${featured.slug}`}
            className="mb-[clamp(24px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center overflow-hidden rounded-media border border-[rgba(23,19,16,.1)] bg-surface text-inherit no-underline transition-[transform,box-shadow] duration-[.35s] ease-[var(--ease)] hover:-translate-y-[6px] hover:shadow-[0_24px_56px_rgba(23,19,16,.12)]"
          >
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              width={840}
              height={560}
              priority
              className="block h-full min-h-[280px] w-full object-cover"
            />
            <div className="flex flex-col gap-4 p-[clamp(28px,4vw,56px)]">
              <div className="flex justify-between gap-3 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
                <span>
                  {t.blog.featured} · {featured.tag}
                </span>
                <span>{featured.date}</span>
              </div>
              <h2 className="np-h2 text-[clamp(28px,3vw,44px)] leading-[1.15] tracking-[-.015em]">
                {featured.title}
              </h2>
              <p className="m-0 font-sans text-[15px] leading-[1.7] text-text-muted">
                {featured.excerpt}
              </p>
              <span className="font-sans text-[14px] font-medium text-accent">
                {t.blog.readArticle}
              </span>
            </div>
          </Link>
        ) : null}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(24px,3vw,40px)]">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/blogg/${article.slug}`}
              className={`${cardBase} text-inherit no-underline transition-[transform,box-shadow] duration-[.35s] ease-[var(--ease)] hover:-translate-y-[6px] hover:shadow-[0_24px_56px_rgba(23,19,16,.12)]`}
            >
              <Image
                src={article.image}
                alt={article.imageAlt}
                width={600}
                height={220}
                className="block h-[220px] w-full object-cover"
              />
              <CardBody
                tag={article.tag}
                date={article.date}
                title={article.title}
                excerpt={article.excerpt}
                action={t.blog.readArticle}
                accent
              />
            </Link>
          ))}

          {/* Planerade artiklar saknar brödtext och länkas därför inte. */}
          {upcomingPosts.map((post) => (
            <article key={post.title} className={cardBase}>
              <div
                aria-hidden="true"
                className="h-[220px]"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #F0EEE8 0px, #F0EEE8 18px, #F5F3EE 18px, #F5F3EE 36px)",
                }}
              />
              <CardBody
                tag={post.tag}
                date={post.date}
                title={post.title}
                excerpt={post.excerpt}
                action={t.blog.comingSoon}
              />
            </article>
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
      <h2 className="np-h2 text-[clamp(22px,2vw,28px)] leading-[1.2] tracking-[-.01em]">
        {title}
      </h2>
      <p className="m-0 flex-1 font-sans text-[14px] leading-[1.65] text-text-muted">
        {excerpt}
      </p>
      <span
        className={`font-sans text-[13px] font-medium ${
          accent ? "text-accent" : "text-text-meta"
        }`}
      >
        {action}
      </span>
    </div>
  );
}
