import { KontaktFormular } from "@/components/kontakt/KontaktFormular";
import { getDictionary, type Locale } from "@/lib/i18n";

/**
 * Rubrik, ingress och formulär, med ankaret #kontakt.
 *
 * Står på startsidan och på ortssidorna. Formuläret är den skriftliga vägen
 * in för den som varken vill ringa, chatta eller skriva på WhatsApp.
 */
export function KontaktSektion({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const k = t.kontakt;
  return (
    <section id="kontakt" className="scroll-mt-28 bg-page text-text">
      <div className="mx-auto grid max-w-[var(--content-max)] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(40px,6vw,96px)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
        <div>
          <p className="np-label mb-6 text-accent-ink">{k.label}</p>
          <h2 className="np-h2 mb-5 text-[length:var(--fs-h2-sm)] leading-[1.15]">
            {k.heading}
          </h2>
          <p className="m-0 max-w-[44ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {k.text}
          </p>
        </div>
        <KontaktFormular locale={locale} t={t} />
      </div>
    </section>
  );
}
