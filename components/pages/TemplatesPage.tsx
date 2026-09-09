import { getMallText, mallar, mallUrl } from "@/content/templates";
import { company, phone, whatsappUrl } from "@/content/site";
import { getDictionary, type Locale, localePath } from "@/lib/i18n";
import { absolutUrl, breadcrumbJsonLd } from "@/lib/metadata";
import { PhoneNumber } from "@/components/ui/PhoneNumber";

/**
 * Mallar och blanketter att ladda ner.
 *
 * Sidan är sajtens enda rent nyttobetonade sida: ingen säljtext, bara filer.
 * Den finns lika mycket för sökningen som för kunden. En företagare som söker
 * "arbetsgivarintyg mall" har ett ärende och inget tålamod, och den sajt som
 * levererar filen direkt är den som blir länkad till och citerad.
 */
export function TemplatesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const m = t.templates;

  /* En lista över dokumenten, i den ordning de visas. ItemList är det schema
     Google läser för att förstå att sidan ÄR en samling och inte en artikel
     som råkar nämna blanketter. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: m.metaTitle,
    description: m.metaDescription,
    url: absolutUrl(localePath(locale, "/mallar")),
    isPartOf: { "@type": "WebSite", name: company.legalName, url: absolutUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: mallar.length,
      itemListElement: mallar.map((mall, i) => {
        const text = getMallText(locale, mall.slug);
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "DigitalDocument",
            name: text.titel,
            description: text.beskrivning,
            url:
              mall.sort === "egen"
                ? absolutUrl(localePath(locale, "/mallar")) + mall.fil
                : mall.url,
            /* Utgivaren är den som står bakom blanketten, inte den som
               länkar till den. För byråns egna mallar blir det byrån. */
            publisher: {
              "@type": "Organization",
              name: mall.sort === "egen" ? company.legalName : mall.utgivare,
            },
          },
        };
      }),
    },
  };

  const brodsmulor = breadcrumbJsonLd(locale, [
    { name: m.nav, path: localePath(locale, "/mallar") },
  ]);

  return (
    <>
      {[schema, brodsmulor].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">{m.eyebrow}</p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            {m.h1a} <em className="np-gradient-text">{m.h1b}</em>
          </h1>
          <p className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            {m.intro}
          </p>
        </div>
      </section>

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[clamp(20px,2.5vw,32px)] p-0">
            {mallar.map((mall) => {
              const text = getMallText(locale, mall.slug);
              return (
                <li
                  key={mall.slug}
                  className="flex flex-col rounded-card border border-[rgba(23,19,16,.1)] bg-surface p-[clamp(24px,3vw,36px)]"
                >
                  <p className="np-label m-0 mb-4 text-accent-ink">
                    {mall.sort === "egen"
                      ? `${mall.format} · ${mall.kb} kB`
                      : (mall.beteckning ?? m.officialBadge)}
                  </p>
                  <h2 className="np-h3 m-0 mb-4 text-[length:var(--fs-h3-sm)] leading-[1.25] text-pretty">
                    {text.titel}
                  </h2>
                  <p className="m-0 mb-6 font-sans text-[15px] leading-[1.7] text-text-muted">
                    {text.beskrivning}
                  </p>

                  {/* Källhänvisningen står före knappen, inte efter. Den som
                      ska lämna en officiell blankett till en myndighet
                      behöver veta vem som gett ut den innan hen klickar,
                      inte efteråt. */}
                  {mall.sort === "officiell" ? (
                    <p className="m-0 mb-6 font-sans text-[13px] leading-[1.6] text-text-meta">
                      {m.publishedBy}{" "}
                      <a
                        href={mall.utgivareUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-text-meta underline transition-colors duration-300 hover:text-accent"
                      >
                        {mall.utgivare}
                      </a>
                    </p>
                  ) : null}

                  {/* mt-auto håller knappen i botten så att korten får samma
                      höjd även när beskrivningarna är olika långa.

                      Egna mallar laddas ner direkt. Officiella blanketter
                      öppnar utgivarens sida i en ny flik, dels för att
                      versionen alltid ska vara den aktuella, dels för att
                      besökaren inte ska tappa vår sida på vägen. */}
                  {mall.sort === "egen" ? (
                    <a
                      href={mallUrl(mall)}
                      download
                      className="np-btn np-btn-primary mt-auto self-start px-7 py-[15px] text-[15px]"
                    >
                      {m.download}
                    </a>
                  ) : (
                    <a
                      href={mallUrl(mall)}
                      target="_blank"
                      rel="noopener"
                      className="np-btn np-btn-primary mt-auto self-start px-7 py-[15px] text-[15px]"
                    >
                      {m.toIssuer}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-[clamp(32px,4vw,48px)] mb-0 max-w-[60ch] font-sans text-[14px] leading-[1.7] text-text-meta">
            {m.disclaimer}
          </p>
        </div>
      </section>

      <section className="bg-page px-[var(--pad-x)] pb-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.15] text-banner-ink">
            {m.ctaHeading}
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            {m.ctaText}
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              {t.servicePage.ctaWhatsApp}
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
