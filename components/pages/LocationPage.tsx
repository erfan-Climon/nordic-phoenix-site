import Link from "next/link";
import { CheckMark } from "@/components/ui/icons";
import { areasOf, getLocation, type Location } from "@/content/locations";
import { getLocationCopy, type LocationCopy } from "@/content/location-copy";
import { company, phone, SITE_URL, whatsappUrl } from "@/content/site";
import { getDictionary, htmlLang, type Locale, localePath } from "@/lib/i18n";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { showsPricing } from "@/lib/pricing-visible";

export function LocationPage({
  location,
  locale,
  copy,
}: {
  location: Location;
  locale: Locale;
  copy: LocationCopy;
}) {
  const t = getDictionary(locale);
  const lp = t.locationPage;
  const base = localePath(locale, "/redovisningsbyra");
  const url = `${SITE_URL}${base}/${location.slug}`;

  /**
   * Service, inte LocalBusiness. Byrån har ingen adress på orten, och att
   * påstå det i schemat vore vilseledande. areaServed säger var tjänsten
   * levereras, provider var företaget faktiskt finns.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${copy.h1Lead} ${copy.h1Accent}`.replace(/\.$/, ""),
    serviceType: "Redovisning och bokföring",
    description: copy.metaDescription,
    url,
    areaServed: {
      "@type": "City",
      name: copy.name,
      containedInPlace: { "@type": "State", name: copy.region },
    },
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
    inLanguage: htmlLang[locale],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lp.home, item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: lp.locations,
        item: `${SITE_URL}${base}`,
      },
      { "@type": "ListItem", position: 3, name: copy.name, item: url },
    ],
  };

  /* Bara orter som finns på samma språk. En länk till en sida som inte
     existerar på /fa hade gett 404, och en som pekar tillbaka till svenskan
     hade blandat språken mitt i en sidfotslista. */
  const finns = (l: Location) => Boolean(getLocationCopy(l, locale));
  const areas = areasOf(location.slug).filter(finns);

  const nearby = location.nearby
    .map((slug) => getLocation(slug))
    .filter((l): l is Location => Boolean(l))
    .filter(finns);

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
          <nav aria-label={lp.breadcrumbLabel} className="mb-8">
            <ol className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-[11px] tracking-[.16em] text-text-meta uppercase">
              <li>
                <Link href="/" className="text-text-meta no-underline hover:text-accent-ink">
                  {lp.home}
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link
                  href={base}
                  className="text-text-meta no-underline hover:text-accent-ink"
                >
                  {lp.locations}
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li aria-current="page">{copy.name}</li>
            </ol>
          </nav>

          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            {copy.h1Lead}{" "}
            <em className="np-gradient-text">{copy.h1Accent}</em>
          </h1>

          <p className="m-0 mb-[clamp(36px,4vw,56px)] max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            {copy.intro}
          </p>

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
              {lp.call} <PhoneNumber />
            </a>
          </div>
        </div>
      </section>

      {/* --- Lokal kontext ---------------------------------------------- */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto grid max-w-[var(--content-max)] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[clamp(40px,6vw,100px)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <div>
            <p className="np-label mb-7 text-accent-light">{lp.business}</p>
            <h2 className="np-h2 text-[length:var(--fs-h2)] leading-[1.15]">
              {copy.context.heading}
            </h2>
          </div>
          <div>
            {copy.context.paragraphs.map((p) => (
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

      {/* --- Skäl -------------------------------------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(40px,5vw,64px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            {lp.whyHeading} {copy.inName}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0 border-t border-l border-[var(--hairline-light)]">
            {copy.highlights.map((h) => (
              <div
                key={h.title}
                className="border-r border-b border-[var(--hairline-light)] p-[clamp(26px,3vw,40px)]"
              >
                <h3 className="np-h3 mb-[10px] text-[length:var(--fs-h3-sm)] leading-[1.3]">
                  {h.title}
                </h3>
                <p className="m-0 font-sans text-[15px] leading-[1.7] text-text-muted">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Tjänster ---------------------------------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(32px,4vw,52px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            {lp.servicesHeading} {copy.inName}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(24px,3vw,44px)]">
            {t.services.groups.map((group) => (
              <div key={group.title}>
                <h3 className="np-h3 mb-4 text-[18px] leading-[1.3]">
                  {group.title}
                </h3>
                <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 font-sans text-[15px] leading-[1.55] text-text-muted"
                    >
                      <span className="flex-none text-[13px] font-bold text-accent">
                        <CheckMark label={lp.includedMark} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Se ServicePage: persiskan har ingen prissektion att länka till. */}
          {showsPricing() ? (
            <p className="mt-[clamp(32px,4vw,48px)] mb-0 font-sans text-[16px] leading-[1.7] text-text-muted">
              {lp.priceLead}{" "}
              <Link href={`${localePath(locale, "/")}#priser`} className="text-accent-ink">
                {lp.priceLink}
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>

      {/* --- FAQ --------------------------------------------------------- */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-narrow)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <p className="np-label mb-7 text-accent-light">{lp.faqLabel}</p>
          <h2 className="np-h2 mb-[clamp(36px,4vw,56px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            {lp.faqHeading} {copy.inName}
          </h2>

          {/* <details> ger en fungerande dragspelsmeny utan JavaScript, vilket
              spelar roll i en statisk export. */}
          <div className="border-t border-[var(--hairline-dark)]">
            {copy.faq.map((f) => (
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

      {/* --- Områden under orten ----------------------------------------- */}
      {areas.length > 0 ? (
        <section className="bg-page text-text">
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
            <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.2]">
              {lp.areasHeading} {copy.inName} {lp.areasHeadingTail}
            </h2>
            <p className="m-0 mb-[clamp(28px,3vw,40px)] max-w-[56ch] font-sans text-[16px] leading-[1.7] text-text-muted">
              {lp.areasText}
            </p>
            <div className="flex flex-wrap gap-3">
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  href={`${base}/${a.slug}`}
                  className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* --- Närliggande orter ------------------------------------------- */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(28px,3vw,40px)] text-[length:var(--fs-h3)] leading-[1.2]">
            {lp.nearbyHeading}
          </h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map((l) => (
              <Link
                key={l.slug}
                href={`${base}/${l.slug}`}
                className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
              >
                {l.name}
              </Link>
            ))}
            <Link
              href={base}
              className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-accent-ink no-underline uppercase transition-colors duration-300 hover:border-accent"
            >
              {lp.allLocations}
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
            {lp.ctaHeading}
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            {lp.ctaText}
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              {lp.ctaWhatsApp}
            </a>
            <a
              href={phone.href}
              className="np-btn border-[1.5px] border-[rgba(28,15,5,.5)] px-7 py-[15px] text-[15px] font-medium text-banner-ink hover:border-banner-ink hover:bg-[rgba(28,15,5,.08)] hover:text-banner-ink"
            >
              <PhoneNumber />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
