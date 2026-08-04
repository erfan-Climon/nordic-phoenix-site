import type { Dictionary } from "@/content/locales/sv";
import { persianAlwaysLine } from "@/content/site";

export function Languages({ t }: { t: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-page text-text">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-30%] left-[-10%] h-[50vw] w-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,148,36,.1), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--content-narrow)] px-[clamp(20px,5vw,64px)] py-[var(--pad-y)] text-center">
        <p data-reveal className="np-label mb-11 text-accent-ink">
          {t.languages.label}
        </p>
        <h2
          data-reveal
          className="np-h2 mb-9 text-[length:var(--fs-h2)] leading-[1.25] tracking-[-.01em]"
        >
          {t.languages.h2a}{" "}
          <em className="np-gradient-text">{t.languages.h2b}</em>
        </h2>
        {/* Visas på persiska oavsett valt språk — därför explicit dir och lang. */}
        <p
          data-reveal
          dir="rtl"
          lang="fa"
          className="mb-9 font-arabic text-[clamp(22px,2.6vw,34px)] leading-[1.9] text-accent"
        >
          {persianAlwaysLine}
        </p>
        <p
          data-reveal
          className="mx-auto max-w-[54ch] font-sans text-[16px] leading-[1.75] text-text-muted"
        >
          {t.languages.text}
        </p>
      </div>
    </section>
  );
}
