import Link from "next/link";
import type { Dictionary } from "@/content/locales/sv";
import { cities as locationCities } from "@/content/locations";
import { cityRowSplit } from "@/content/site";

export function Sweden({ t }: { t: Dictionary }) {
  /**
   * Ordningen i ordlistornas `cities` matchar ordningen i `locations`, så
   * index kopplar ihop det översatta namnet med rätt ortssida. Sidorna finns
   * bara på svenska, men de är relevanta oavsett vilket språk besökaren läser
   * sajten på.
   */
  const cities = t.sweden.cities.map((name, i) => ({
    name,
    slug: locationCities[i]?.slug,
  }));

  const row1 = cities.slice(0, cityRowSplit);
  const row2 = cities.slice(cityRowSplit);

  /** Listorna repeteras så att marqueen loopar utan hopp. */
  const repeat = <T,>(list: T[], times: number) =>
    Array.from({ length: times }, (_, run) =>
      list.map((item) => ({ item, run })),
    ).flat();

  const cityClass =
    "whitespace-nowrap pr-[.7em] font-heading text-[length:var(--fs-city)] leading-[1.25] tracking-[-.02em] no-underline transition-colors duration-[.35s] hover:text-accent";

  const renderRow = (
    row: typeof cities,
    times: number,
    tone: "cool" | "warm",
  ) =>
    repeat(row, times).map(({ item, run }, i) => {
      const färg = tone === "cool" ? "text-city" : "text-city-warm italic";
      const separator = tone === "cool" ? "text-city-warm italic" : "text-city";
      // Bara första varvet är riktiga länkar. Kopiorna finns för loopen och
      // döljs för skärmläsare, annars läses varje stad upp tre till fyra gånger.
      const duplicate = run > 0;

      const inner = (
        <>
          {item.name}
          <span aria-hidden="true" className={`pl-[.7em] ${separator}`}>
            ·
          </span>
        </>
      );

      if (!item.slug || duplicate) {
        return (
          <span
            key={`${item.name}-${i}`}
            aria-hidden={duplicate || undefined}
            className={`${cityClass} ${färg}`}
          >
            {inner}
          </span>
        );
      }

      return (
        <Link
          key={`${item.name}-${i}`}
          href={`/redovisningsbyra/${item.slug}`}
          className={`${cityClass} ${färg}`}
        >
          {inner}
        </Link>
      );
    });

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

      <div className="flex flex-col gap-[clamp(10px,1.5vw,20px)]">
        <div
          data-marquee
          className="flex w-max"
          style={{ animation: "np-marquee 48s linear infinite" }}
        >
          {renderRow(row1, 3, "cool")}
        </div>
        <div
          data-marquee
          className="flex w-max"
          style={{ animation: "np-marquee-rev 56s linear infinite" }}
        >
          {renderRow(row2, 4, "warm")}
        </div>
      </div>

      <p
        data-reveal
        className="mt-[clamp(48px,6vw,72px)] mb-0 px-[var(--pad-x)] text-center font-mono text-[clamp(13px,1.6vw,22px)] tracking-[.2em] text-text-meta uppercase"
      >
        {t.sweden.tail}
      </p>
    </section>
  );
}
