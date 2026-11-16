import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { getLocation } from "@/content/locations";
import { getPersiskOrt, persiskaOrter } from "@/content/persisk-orter";
import { company, phone, whatsappUrl } from "@/content/site";
import { isLocale, localePath } from "@/lib/i18n";
import { absolutUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

/**
 * Stadssidorna under Persisk redovisningsbyrå, på svenska.
 *
 * Innehållet och reglerna för det ligger i content/persisk-orter.ts. Sidan
 * finns bara på svenska: den persiskspråkiga motsvarigheten är ortssidan
 * under /redovisningsbyra, som redan är skriven på persiska, och den länkas
 * härifrån i stället för att dubbleras.
 */

const NAV = "/persisk-redovisningsbyra";

export const dynamicParams = false;

export function generateStaticParams() {
  return persiskaOrter.map((ort) => ({ locale: "sv", stad: ort.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/persisk-redovisningsbyra/[stad]">): Promise<Metadata> {
  const { locale, stad } = await params;
  const ort = getPersiskOrt(stad);
  if (locale !== "sv" || !ort) return {};

  return buildMetadata({
    locale: "sv",
    path: `${NAV}/${ort.slug}`,
    title: ort.metaTitle,
    description: ort.metaDescription,
    /* Bara svenska. Utan det här hade hjälparen pekat ut en engelsk och en
       persisk version på samma sökväg, och de finns inte. */
    availableLocales: ["sv"],
  });
}

const H2 = "np-h2 mb-7 text-[length:var(--fs-h2-sm)] leading-[1.2]";
const BROD =
  "np-justerad m-0 max-w-[68ch] font-sans text-[clamp(16px,1.4vw,18px)] leading-[1.8] text-text-muted";
const CHIP =
  "border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink";

export default async function PersiskOrtPage({
  params,
}: PageProps<"/[locale]/persisk-redovisningsbyra/[stad]">) {
  const { locale, stad } = await params;
  if (!isLocale(locale) || locale !== "sv") notFound();
  const ort = getPersiskOrt(stad);
  if (!ort) notFound();

  const url = absolutUrl(localePath("sv", `${NAV}/${ort.slug}`));
  /* Den allmänna ortssidan finns för alla tre orterna. Kontrollen står ändå
     kvar, så att en ny ort här inte ger en död länk om den saknas där. */
  const harOrtssida = Boolean(getLocation(ort.slug));
  const andraOrter = persiskaOrter.filter((o) => o.slug !== ort.slug);

  /* Service med areaServed, inte LocalBusiness med lokal adress. Byrån
     finns inte på orten, och schemat ska säga samma sak som texten. */
  const tjanstJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Persisk redovisningsbyrå för företagare i ${ort.name}`,
    serviceType: "Redovisning och bokföring på persiska",
    description: ort.metaDescription,
    url,
    inLanguage: ["sv"],
    availableLanguage: [
      { "@type": "Language", name: "Persian", alternateName: "fa" },
      { "@type": "Language", name: "Swedish", alternateName: "sv" },
    ],
    areaServed: {
      "@type": "City",
      name: ort.name,
      containedInPlace: { "@type": "State", name: ort.region },
    },
    provider: {
      "@type": "AccountingService",
      name: company.legalName,
      identifier: company.orgNumber,
      telephone: phone.international,
      url: absolutUrl("/"),
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        postalCode: company.postalCode,
        addressLocality: company.city,
        addressRegion: company.region,
        addressCountry: company.country,
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ort.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const brodsmulor = breadcrumbJsonLd("sv", [
    { name: "Persisk redovisningsbyrå", path: localePath("sv", NAV) },
    { name: ort.name, path: localePath("sv", `${NAV}/${ort.slug}`) },
  ]);

  return (
    <>
      {[tjanstJsonLd, faqJsonLd, brodsmulor].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-page text-text">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-30%] right-[-15%] h-[55vw] w-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,148,36,.14), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <Link
            href={localePath("sv", NAV)}
            className="np-mono-link mb-9 inline-block text-text-muted hover:text-accent-ink"
          >
            ← Persisk redovisningsbyrå
          </Link>
          <p className="np-label mb-7 text-accent-ink" lang="fa" dir="rtl">
            {ort.persiskRad}
          </p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            {ort.h1Lead} <em className="np-gradient-text">{ort.h1Accent}</em>
          </h1>
          <p className={BROD}>{ort.intro}</p>

          <div className="mt-9 flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn np-btn-primary px-8 py-4 text-[15px]"
            >
              Kontakta oss på WhatsApp
            </a>
            <a
              href={phone.href}
              className="np-btn np-btn-outline px-7 py-[15px] text-[15px]"
            >
              <PhoneNumber />
            </a>
          </div>
        </div>
      </section>

      {/* ── Ortens egna avsnitt ─────────────────────────────────────── */}
      {ort.sektioner.map((sektion) => (
        <section key={sektion.rubrik} className="bg-page text-text">
          <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(56px,7vw,96px)]">
            <h2 className={H2}>{sektion.rubrik}</h2>
            {sektion.stycken.map((stycke, i) => (
              <p
                key={i}
                className={`${BROD} ${i < sektion.stycken.length - 1 ? "mb-6" : ""}`}
              >
                {stycke}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* ── Frågor och svar ─────────────────────────────────────────── */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(72px,9vw,120px)]">
          <p className="np-label mb-7 text-accent-light">Vanliga frågor</p>
          <h2 className="np-h2 mb-[clamp(36px,4vw,56px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            Persisk redovisning i {ort.name}
          </h2>
          <div className="border-t border-[var(--hairline-dark)]">
            {ort.faq.map((f) => (
              <details
                key={f.q}
                className="group border-b border-[var(--hairline-dark)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-sans text-[17px] leading-[1.5] font-semibold text-on-dark [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex-none text-[22px] leading-none text-accent-light transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="np-justerad m-0 max-w-[68ch] pb-7 font-sans text-[16px] leading-[1.75] text-on-dark-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vidare ──────────────────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(28px,3vw,40px)] text-[length:var(--fs-h3)] leading-[1.2]">
            Läs vidare
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href={localePath("sv", NAV)} className={CHIP}>
              Persisk redovisningsbyrå
            </Link>
            {harOrtssida ? (
              <Link
                href={`${localePath("sv", "/redovisningsbyra")}/${ort.slug}`}
                className={CHIP}
              >
                Redovisningsbyrå {ort.name}
              </Link>
            ) : null}
            {/* Den persiskspråkiga ortssidan. Utan språkprefix, eftersom
                persiskan är sajtens rotspråk. */}
            {harOrtssida ? (
              <Link
                href={`/redovisningsbyra/${ort.slug}`}
                hrefLang="fa"
                lang="fa"
                dir="rtl"
                className={`${CHIP} normal-case tracking-normal`}
              >
                همین موضوع به فارسی
              </Link>
            ) : null}
            {andraOrter.map((o) => (
              <Link
                key={o.slug}
                href={localePath("sv", `${NAV}/${o.slug}`)}
                className={CHIP}
              >
                Persisk redovisningsbyrå {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Uppmaning ───────────────────────────────────────────────── */}
      <section className="bg-page px-[var(--pad-x)] pb-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.15] text-banner-ink">
            Prata med oss på persiska
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            Berätta var du står i dag, så säger vi vad som behöver göras och vad
            det kostar. Första samtalet kostar ingenting.
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              Kontakta oss på WhatsApp
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
