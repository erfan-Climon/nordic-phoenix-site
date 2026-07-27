import { CheckMark } from "@/components/ui/icons";
import type { Dictionary } from "@/content/locales/sv";
import { whatsappUrl } from "@/content/site";

type CardSkin = {
  bg: string;
  border: string;
  shadow: string;
  muted: string;
  item: string;
  hairline: string;
  ctaBg: string;
  ctaFg: string;
};

const standard: CardSkin = {
  bg: "var(--color-ink-card)",
  border: "1px solid rgba(242,236,224,.12)",
  shadow: "none",
  muted: "#8A8272",
  item: "#C8C1B4",
  hairline: "rgba(242,236,224,.1)",
  ctaBg: "var(--color-on-dark)",
  ctaFg: "var(--color-ink)",
};

const featured: CardSkin = {
  bg: "var(--gradient-featured)",
  border: "1.5px solid rgba(245,133,31,.55)",
  shadow: "0 24px 64px rgba(224,90,0,.22)",
  muted: "#B39B7E",
  item: "#E3D9C8",
  hairline: "rgba(245,133,31,.2)",
  ctaBg: "var(--gradient-accent)",
  ctaFg: "var(--color-on-accent)",
};

export function Pricing({ t }: { t: Dictionary }) {
  return (
    <section id="priser" className="relative overflow-hidden bg-ink text-on-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-30%] right-[-10%] h-[55vw] w-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(224,90,0,.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y)]">
        <div data-reveal className="mb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-light">{t.pricing.label}</p>
          <h2 className="np-h2 mb-5 text-[clamp(38px,5vw,80px)] leading-[1.1]">
            {t.pricing.h2a} <em className="text-accent-light">{t.pricing.h2b}</em>
          </h2>
          <p className="m-0 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-on-dark-muted">
            {t.pricing.sub}
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-[clamp(18px,2vw,28px)]">
          {t.pricing.packages.map((pkg) => {
            const skin = pkg.featured ? featured : standard;
            return (
              <div
                key={pkg.name}
                data-reveal
                className="relative flex flex-col rounded-media p-[clamp(28px,3vw,44px)]"
                style={{
                  background: skin.bg,
                  border: skin.border,
                  boxShadow: skin.shadow,
                }}
              >
                <div className="mb-[10px] flex items-center gap-3">
                  <h3 className="m-0 font-sans text-[clamp(22px,2vw,28px)] font-semibold tracking-[-.01em] text-on-dark">
                    {pkg.name}
                  </h3>
                  {pkg.featured ? (
                    <span className="rounded-pill bg-[image:var(--gradient-accent)] px-3 py-[5px] font-mono text-[11px] font-medium tracking-[.08em] text-on-accent">
                      {t.pricing.popular}
                    </span>
                  ) : null}
                </div>

                <p
                  className="m-0 mb-7 font-sans text-[14px] leading-[1.6]"
                  style={{ color: skin.muted }}
                >
                  {pkg.desc}
                </p>

                <div className="mb-7 flex items-baseline gap-[6px]">
                  <span className="font-sans text-[clamp(38px,3.4vw,52px)] leading-none font-semibold tracking-[-.03em] text-on-dark">
                    {pkg.price}
                  </span>
                  <span
                    className="font-sans text-[15px]"
                    style={{ color: skin.muted }}
                  >
                    {t.pricing.per}
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  className="np-btn mb-7 block rounded-pill px-6 py-4 text-center text-[15px] font-semibold hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(224,90,0,.35)]"
                  style={{ background: skin.ctaBg, color: skin.ctaFg }}
                >
                  {t.pricing.cta}
                </a>

                <div
                  className="pt-[22px]"
                  style={{ borderTop: `1px solid ${skin.hairline}` }}
                >
                  <p
                    className="m-0 mb-[14px] font-mono text-[12px] font-medium tracking-[.14em] uppercase"
                    style={{ color: skin.muted }}
                  >
                    {t.pricing.includes}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-3">
                        <span className="flex-none font-sans text-[13px] font-bold text-accent-light">
                          <CheckMark label={t.a11y.yes} />
                        </span>
                        <span
                          className="font-sans text-[14px] leading-[1.55]"
                          style={{ color: skin.item }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p
          data-reveal
          className="mt-[clamp(32px,4vw,48px)] mb-0 text-center font-sans text-[13px] leading-[1.7] text-on-dark-dim"
        >
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
