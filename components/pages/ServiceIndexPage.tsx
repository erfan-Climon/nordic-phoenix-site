import { ServiceCards } from "@/components/home/ServiceCards";
import { phone, whatsappUrl } from "@/content/site";
import { getDictionary, type Locale } from "@/lib/i18n";
import { PhoneNumber } from "@/components/ui/PhoneNumber";

/** Översikten över tjänsterna. Delas av den svenska roten och /en och /fa. */
export function ServiceIndexPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.servicePage;

  return (
    <>
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">{s.services}</p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            {s.indexH1a}{" "}
            <em className="np-gradient-text">{s.indexH1b}</em>
          </h1>
          <p className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            {s.indexIntro}
          </p>
        </div>
      </section>

      {/* Samma kortstapel som på startsidan. Översikten visade tidigare ett
          platt rutnät över samma sex tjänster, vilket lästes som två skilda
          sidor om samma sak. */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <ServiceCards t={t} locale={locale} />
        </div>
      </section>

      <section className="bg-page px-[var(--pad-x)] pb-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.15] text-banner-ink">
            {s.indexCtaHeading}
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            {s.indexCtaText}
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              {s.ctaWhatsApp}
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
