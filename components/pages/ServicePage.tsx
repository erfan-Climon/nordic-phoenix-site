import Link from "next/link";
import { CheckMark } from "@/components/ui/icons";
import { cities } from "@/content/locations";
import { getService, type Service } from "@/content/services";
import { company, phone, SITE_URL, whatsappUrl } from "@/content/site";
import { getDictionary } from "@/lib/i18n";

/** Tjänstesidorna är svenskspråkiga, som ortssidorna och bloggen. */
export function ServicePage({ service }: { service: Service }) {
  const t = getDictionary("sv");
  const url = `${SITE_URL}/tjanster/${service.slug}`;

  /**
   * Service med hasOfferCatalog, där varje punkt i tjänsten blir en post.
   * Det speglar sidans faktiska innehåll: rubrikerna i `details` är samma
   * punkter som listas på startsidans kort.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url,
    areaServed: { "@type": "Country", name: "Sverige" },
    provider: {
      "@type": "AccountingService",
      name: company.legalName,
      identifier: company.orgNumber,
      telephone: phone.international,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        postalCode: company.postalCode,
        addressLocality: company.city,
        addressRegion: company.region,
        addressCountry: company.country,
      },
    },
    availableLanguage: ["sv", "en", "fa"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.details.map((d) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: d.title,
          description: d.lead,
        },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tjänster",
        item: `${SITE_URL}/tjanster`,
      },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  const related = service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));

  /** Ett urval orter, så att tjänstesidan hänger ihop med den lokala sökningen. */
  const topCities = cities.slice(0, 6);

  return (
    <>
      {[serviceJsonLd, faqJsonLd, breadcrumbJsonLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* --- Hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-page">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-30%] right-[-15%] h-[55vw] w-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,148,36,.14), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(64px,8vw,110px)]">
          <nav aria-label="Brödsmulor" className="mb-8">
            <ol className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
              <li>
                <Link
                  href="/"
                  className="text-text-meta no-underline hover:text-accent-ink"
                >
                  Start
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link
                  href="/tjanster"
                  className="text-text-meta no-underline hover:text-accent-ink"
                >
                  Tjänster
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li aria-current="page">{service.shortName}</li>
            </ol>
          </nav>

          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            {service.h1Lead}{" "}
            <em className="np-gradient-text">{service.h1Accent}</em>
          </h1>

          <p className="m-0 mb-[clamp(28px,3vw,40px)] max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            {service.intro}
          </p>

          {/* Innehållsförteckning. Ger besökaren en överblick direkt, och
              Google en tydlig bild av vad sidan faktiskt täcker. */}
          <ul className="m-0 mb-[clamp(36px,4vw,56px)] flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
            {service.details.map((d) => (
              <li key={d.title}>
                <a
                  href={`#${slugify(d.title)}`}
                  className="font-mono text-[12px] tracking-[.12em] text-text-meta uppercase no-underline transition-colors duration-300 hover:text-accent-ink"
                >
                  {d.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn np-btn-primary px-9 py-[18px] text-[15px]"
            >
              {t.hero.cta1}
            </a>
            <a
              href={phone.href}
              className="np-btn np-btn-outline px-[30px] py-[17px] text-[15px]"
            >
              Ring {phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* --- Problemet --------------------------------------------------- */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto grid max-w-[var(--content-max)] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[clamp(40px,6vw,100px)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <div>
            <p className="np-label mb-7 text-accent-light">Bakgrund</p>
            <h2 className="np-h2 text-[length:var(--fs-h2)] leading-[1.15]">
              {service.problem.heading}
            </h2>
          </div>
          <div>
            {service.problem.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="m-0 mb-[18px] font-sans text-[16px] leading-[1.75] text-on-dark-muted last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* --- Vem det passar ---------------------------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(40px,5vw,64px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            Passar dig som
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0 border-t border-l border-[var(--hairline-light)]">
            {service.forWhom.map((f) => (
              <div
                key={f.title}
                className="border-r border-b border-[var(--hairline-light)] p-[clamp(26px,3vw,40px)]"
              >
                <h3 className="np-h3 mb-[10px] text-[length:var(--fs-h3-sm)] leading-[1.3]">
                  {f.title}
                </h3>
                <p className="m-0 font-sans text-[15px] leading-[1.7] text-text-muted">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Detaljerna, en per punkt på kortet -------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(40px,5vw,64px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            Det här ingår, punkt för punkt
          </h2>

          <div className="flex flex-col gap-[clamp(48px,6vw,88px)]">
            {service.details.map((d, i) => (
              <article
                key={d.title}
                id={slugify(d.title)}
                /* scroll-mt så att ankarlänken inte lägger rubriken under
                   den fasta navigeringen. */
                className="grid scroll-mt-[110px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(24px,4vw,64px)] border-t border-[var(--hairline-light)] pt-[clamp(28px,3vw,44px)]"
              >
                <div>
                  <p className="np-label mb-4 text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="np-h3 mb-4 text-[length:var(--fs-h3)] leading-[1.2] text-pretty">
                    {d.title}
                  </h3>
                  <p className="m-0 max-w-[38ch] font-sans text-[16px] leading-[1.65] font-semibold text-text">
                    {d.lead}
                  </p>
                </div>
                <div>
                  {d.body.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="m-0 mb-[18px] max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted last:mb-0"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Vad du får -------------------------------------------------- */}
      <section className="bg-surface text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(32px,4vw,52px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            Vad du får
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-[clamp(24px,3vw,44px)] gap-y-[14px] p-0">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 font-sans text-[16px] leading-[1.6] text-text-muted"
              >
                <span className="flex-none text-[13px] font-bold text-accent">
                  <CheckMark label="Ingår" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-[clamp(32px,4vw,48px)] mb-0 font-sans text-[16px] leading-[1.7] text-text-muted">
            Fast månadspris från 1 495 kr.{" "}
            <Link href="/#priser" className="text-accent-ink">
              Se alla paket och vad som ingår
            </Link>
            .
          </p>
        </div>
      </section>

      {/* --- FAQ --------------------------------------------------------- */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-narrow)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <p className="np-label mb-7 text-accent-light">Vanliga frågor</p>
          <h2 className="np-h2 mb-[clamp(36px,4vw,56px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            Frågor om {service.shortName.toLowerCase()}
          </h2>

          {/* <details> ger en dragspelsmeny utan JavaScript, vilket spelar
              roll i en statisk export. */}
          <div className="border-t border-[var(--hairline-dark)]">
            {service.faq.map((f) => (
              <details
                key={f.question}
                className="group border-b border-[var(--hairline-dark)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-sans text-[17px] leading-[1.5] font-semibold text-on-dark [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span
                    aria-hidden="true"
                    className="flex-none text-[22px] leading-none text-accent-light transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 max-w-[62ch] pb-7 font-sans text-[16px] leading-[1.75] text-on-dark-muted">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Andra tjänster ---------------------------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(28px,3vw,40px)] text-[length:var(--fs-h3)] leading-[1.2]">
            Hänger ihop med
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-0 border-t border-l border-[var(--hairline-light)]">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/tjanster/${r.slug}`}
                className="border-r border-b border-[var(--hairline-light)] p-[clamp(24px,3vw,36px)] text-inherit no-underline transition-colors duration-300 hover:bg-[rgba(240,103,0,.05)]"
              >
                <h3 className="np-h3 mb-3 text-[length:var(--fs-h3-sm)] leading-[1.25]">
                  {r.name}
                </h3>
                <p className="m-0 font-sans text-[14px] leading-[1.65] text-text-muted">
                  {r.intro.split(". ")[0]}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Orter ------------------------------------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h3)] leading-[1.2]">
            Vi arbetar digitalt i hela Sverige
          </h2>
          <p className="m-0 mb-[clamp(28px,3vw,40px)] max-w-[56ch] font-sans text-[16px] leading-[1.7] text-text-muted">
            Avståndet påverkar varken pris eller svarstid. Läs om hur vi
            arbetar med företagare på din ort.
          </p>
          <div className="flex flex-wrap gap-3">
            {topCities.map((c) => (
              <Link
                key={c.slug}
                href={`/redovisningsbyra/${c.slug}`}
                className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/redovisningsbyra"
              className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-accent-ink no-underline uppercase transition-colors duration-300 hover:border-accent"
            >
              Alla orter
            </Link>
          </div>
        </div>
      </section>

      {/* --- Avslutande CTA ---------------------------------------------- */}
      <section className="bg-page px-[var(--pad-x)] pb-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.15] text-banner-ink">
            Vill du veta vad det skulle kosta?
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            Kostnadsfri och förutsättningslös genomgång. Vi tittar på ditt
            bolag och ger dig en fast summa, innan du bestämmer dig.
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              Skriv på WhatsApp
            </a>
            <a
              href={phone.href}
              className="np-btn border-[1.5px] border-[rgba(28,15,5,.5)] px-7 py-[15px] text-[15px] font-medium text-banner-ink hover:border-banner-ink hover:bg-[rgba(28,15,5,.08)] hover:text-banner-ink"
            >
              {phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Ankar-id ur en rubrik. Svenska tecken translittereras, allt annat faller
 * bort. Rubrikerna är kända och få, så en enkel funktion räcker.
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replaceAll("å", "a")
    .replaceAll("ä", "a")
    .replaceAll("ö", "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
