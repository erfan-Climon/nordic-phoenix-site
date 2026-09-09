import Link from "next/link";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { areasOf, cities } from "@/content/locations";
import { getLocationCopy } from "@/content/location-copy";
import { phone, whatsappUrl } from "@/content/site";
import { getDictionary, type Locale, localePath } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/metadata";

/**
 * Ortsöversikten. Listar bara orter som finns på språket i fråga, så att
 * ingen länk pekar på en sida som inte genererats.
 */
export function LocationIndexPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const lp = t.locationPage;
  const base = localePath(locale, "/redovisningsbyra");

  const orter = cities.filter((c) => getLocationCopy(c, locale));
  const omraden = areasOf("stockholm").filter((a) => getLocationCopy(a, locale));

  const brodsmulor = breadcrumbJsonLd(locale, [
    { name: lp.locations, path: base },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brodsmulor) }}
      />

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">{lp.locations}</p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            {lp.indexH1a} <em className="np-gradient-text">{lp.indexH1b}</em>
          </h1>
          <p className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            {lp.indexIntro}
          </p>
        </div>
      </section>

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-0 border-t border-l border-[var(--hairline-light)]">
            {orter.map((l) => {
              const c = getLocationCopy(l, locale);
              if (!c) return null;
              return (
                <Link
                  key={l.slug}
                  href={`${base}/${l.slug}`}
                  className="border-r border-b border-[var(--hairline-light)] p-[clamp(24px,3vw,36px)] text-inherit no-underline transition-colors duration-300 hover:bg-[rgba(240,103,0,.05)]"
                >
                  <h2 className="np-h3 mb-2 text-[length:var(--fs-h3-sm)] leading-[1.25]">
                    {c.name}
                  </h2>
                  <p className="m-0 mb-4 font-mono text-[11px] tracking-[.14em] text-text-meta uppercase">
                    {c.region}
                  </p>
                  <p className="m-0 font-sans text-[14px] leading-[1.65] text-text-muted">
                    {c.intro.split(". ")[0]}.
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {omraden.length > 0 ? (
        <section className="bg-page text-text">
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
            <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.2]">
              {lp.areasHeading} Stockholm {lp.areasHeadingTail}
            </h2>
            <p className="m-0 mb-[clamp(28px,3vw,40px)] max-w-[56ch] font-sans text-[16px] leading-[1.7] text-text-muted">
              {lp.areasText}
            </p>
            <div className="flex flex-wrap gap-3">
              {omraden.map((a) => {
                const c = getLocationCopy(a, locale);
                if (!c) return null;
                return (
                  <Link
                    key={a.slug}
                    href={`${base}/${a.slug}`}
                    className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

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
