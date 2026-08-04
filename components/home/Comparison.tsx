import { CheckMark, CrossMark } from "@/components/ui/icons";
import type { Dictionary } from "@/content/locales/sv";

export function Comparison({ t }: { t: Dictionary }) {
  return (
    <section className="relative bg-page text-text">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(110px,13vw,190px)]">
        <div
          data-reveal
          className="mb-[clamp(48px,6vw,80px)] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4"
        >
          <p className="np-label text-accent-ink">{t.compare.label}</p>
          <p className="np-label text-accent-ink">{t.compare.labelRight}</p>
        </div>

        <div
          data-reveal
          className="overflow-hidden rounded-media border border-[rgba(23,19,16,.12)] shadow-[0_24px_64px_rgba(23,19,16,.06)]"
        >
          <div className="grid grid-cols-2">
            <div className="border-r border-[rgba(23,19,16,.09)] bg-surface-muted px-[clamp(18px,3vw,44px)] py-[clamp(22px,2.8vw,40px)]">
              <p className="m-0 mb-2 font-mono text-[11px] tracking-[.22em] text-text-muted uppercase">
                {t.compare.leftLabel}
              </p>
              <h3 className="np-h3 text-[length:var(--fs-h3-sm)] leading-[1.15]">
                {t.compare.leftTitle}
              </h3>
            </div>
            <div
              className="border-b-2 border-[rgba(240,103,0,.35)] px-[clamp(18px,3vw,44px)] py-[clamp(22px,2.8vw,40px)]"
              style={{ background: "var(--gradient-compare-head)" }}
            >
              <p className="m-0 mb-2 font-mono text-[11px] tracking-[.22em] text-accent-ink uppercase">
                {t.compare.rightLabel}
              </p>
              <h3 className="np-h3 text-[length:var(--fs-h3-sm)] leading-[1.15]">
                {t.compare.rightTitle}
              </h3>
            </div>
          </div>

          {t.compare.rows.map((row) => (
            <div
              key={row.without}
              className="grid grid-cols-2 border-t border-[rgba(23,19,16,.09)]"
            >
              <div className="flex items-center gap-[14px] border-r border-[rgba(23,19,16,.09)] bg-surface-row px-[clamp(18px,3vw,44px)] py-[clamp(14px,1.6vw,20px)]">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-[rgba(196,42,28,.3)] bg-[rgba(196,42,28,.1)] font-mono text-[12px] font-bold text-danger">
                  <CrossMark label={t.a11y.no} />
                </span>
                <span className="font-sans text-[15px] leading-[1.55] text-text-soft">
                  {row.without}
                </span>
              </div>
              {/* Höger sida ska väga tyngre visuellt: mörkare text, medium vikt */}
              <div className="flex items-center gap-[14px] bg-surface-row-warm px-[clamp(18px,3vw,44px)] py-[clamp(14px,1.6vw,20px)]">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[image:var(--gradient-accent)] font-sans text-[12px] font-bold text-on-accent">
                  <CheckMark label={t.a11y.yes} />
                </span>
                <span className="font-sans text-[15px] leading-[1.55] font-medium text-text">
                  {row.with}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="mt-[clamp(48px,6vw,72px)] mb-0 max-w-[52ch] font-sans text-[clamp(16px,1.35vw,19px)] leading-[1.7] text-text-muted"
        >
          {t.compare.closing}
        </p>
      </div>
    </section>
  );
}
