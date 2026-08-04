import type { Dictionary } from "@/content/locales/sv";

const NUMBERS = ["01", "02", "03", "04", "05", "06", "07", "08"];

export function WhyUs({ t }: { t: Dictionary }) {
  return (
    <section className="bg-ink text-on-dark">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y)]">
        <div data-reveal className="mb-[clamp(56px,7vw,88px)]">
          <p className="np-label mb-7 text-accent-light">{t.why.label}</p>
          <h2 className="np-h2 max-w-[18ch] text-[length:var(--fs-h2-xl)] leading-[1.1]">
            {t.why.h2a} <em className="text-accent-light">{t.why.h2b}</em>
          </h2>
        </div>

        {/* Borders på container (top/left) + celler (right/bottom) ger sömlösa
            1px-linjer oavsett hur många kolumner auto-fit landar på. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0 border-t border-l border-[var(--hairline-dark)]">
          {t.why.reasons.map((reason, i) => (
            <div
              key={reason.title}
              data-reveal
              className="border-r border-b border-[var(--hairline-dark)] p-[clamp(26px,3vw,40px)] transition-colors duration-[.35s] hover:bg-[rgba(224,90,0,.07)]"
            >
              <span className="font-mono text-[12px] text-accent-light">
                {NUMBERS[i]}
              </span>
              <h3 className="np-h3 mt-[14px] mb-[10px] text-[length:var(--fs-h3-sm)] leading-[1.3]">
                {reason.title}
              </h3>
              <p className="m-0 font-sans text-[14px] leading-[1.65] text-on-dark-muted">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
