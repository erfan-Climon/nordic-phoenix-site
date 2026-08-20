import { ServiceCards } from "@/components/home/ServiceCards";
import type { Dictionary } from "@/content/locales/sv";
import type { Locale } from "@/lib/i18n";

export function Services({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="tjanster" className="relative bg-page text-text">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(80px,9vw,140px)]">
        <div data-reveal className="mb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">{t.services.label}</p>
          <h2 className="np-h2 text-[length:var(--fs-h2-xl)] leading-[1.08]">
            {t.services.h2a} <em className="text-accent">{t.services.h2b}</em>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(80px,9vw,140px)]">
        <ServiceCards t={t} locale={locale} />
      </div>
    </section>
  );
}
