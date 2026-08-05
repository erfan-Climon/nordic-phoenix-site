import type { Dictionary } from "@/content/locales/sv";
import { cityRowSplit } from "@/content/site";

export function Sweden({ t }: { t: Dictionary }) {
  const row1 = t.sweden.cities.slice(0, cityRowSplit);
  const row2 = t.sweden.cities.slice(cityRowSplit);

  // Listorna repeteras så att marqueen loopar utan hopp.
  const repeat = <T,>(list: T[], times: number) =>
    Array.from({ length: times }, () => list).flat();

  return (
    <section className="overflow-hidden bg-page py-[clamp(100px,12vw,160px)] text-text">
      <div
        data-reveal
        className="mb-[clamp(48px,6vw,72px)] px-[clamp(20px,5vw,64px)] text-center"
      >
        <p className="np-label mb-7 text-accent-ink">{t.sweden.label}</p>
        <h2 className="np-h2 text-[length:var(--fs-h2-sm)] leading-[1.25]">
          {t.sweden.h2a} <em className="text-accent">{t.sweden.h2b}</em>
        </h2>
      </div>

      <div
        aria-hidden="true"
        className="flex flex-col gap-[clamp(10px,1.5vw,20px)]"
      >
        <div
          data-marquee
          className="flex w-max"
          style={{ animation: "np-marquee 48s linear infinite" }}
        >
          {repeat(row1, 3).map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="whitespace-nowrap pr-[.7em] font-heading text-[length:var(--fs-city)] leading-[1.25] tracking-[-.02em] text-city transition-colors duration-[.35s] hover:text-accent"
            >
              {city}
              <span className="pl-[.7em] text-city-warm italic">·</span>
            </span>
          ))}
        </div>
        <div
          data-marquee
          className="flex w-max"
          style={{ animation: "np-marquee-rev 56s linear infinite" }}
        >
          {repeat(row2, 4).map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="whitespace-nowrap pr-[.7em] font-heading text-[length:var(--fs-city)] leading-[1.25] tracking-[-.02em] text-city-warm italic transition-colors duration-[.35s] hover:text-accent"
            >
              {city}
              <span className="pl-[.7em] text-city">·</span>
            </span>
          ))}
        </div>
      </div>

      <p
        data-reveal
        /* Minimivärdet hålls nere: versalt mono med .2em spärr blir brett, och
           raden ska rymmas utan att brytas på en 375px-skärm. */
        className="mt-[clamp(48px,6vw,72px)] mb-0 px-[var(--pad-x)] text-center font-mono text-[clamp(13px,1.6vw,22px)] tracking-[.2em] text-text-meta uppercase"
      >
        {t.sweden.tail}
      </p>
    </section>
  );
}
