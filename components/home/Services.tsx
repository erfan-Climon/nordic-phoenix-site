import Link from "next/link";
import type { Dictionary } from "@/content/locales/sv";
import { serviceSlugs } from "@/content/services";

/** Kortens skins alternerar mörk → cream → mörk → cream → mörk → guld. */
type Skin = {
  bg: string;
  fg: string;
  border: string;
  /** Accentfärgen i kortet, används till ✦-tecknen i listan. */
  accent: string;
  item: string;
  hairline: string;
};

const dark: Skin = {
  bg: "var(--color-ink-card)",
  fg: "var(--color-on-dark)",
  border: "rgba(242,236,224,.1)",
  accent: "var(--color-accent-light)",
  item: "var(--color-on-dark-muted)",
  hairline: "rgba(242,236,224,.08)",
};
const cream: Skin = {
  bg: "var(--color-surface)",
  fg: "var(--color-text)",
  border: "rgba(23,19,16,.1)",
  accent: "var(--color-accent)",
  item: "#5C5344",
  hairline: "rgba(23,19,16,.1)",
};
const gold: Skin = {
  bg: "var(--gradient-gold-card)",
  fg: "var(--color-on-dark)",
  border: "rgba(255,148,36,.35)",
  accent: "var(--color-accent-light)",
  item: "#B9B1A4",
  hairline: "rgba(255,148,36,.15)",
};

const SKINS: Skin[] = [dark, cream, dark, cream, dark, gold];

export function Services({ t }: { t: Dictionary }) {
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
        {t.services.groups.map((group, i) => {
          const skin = SKINS[i] ?? cream;
          /* Ordningen i ordlistornas grupper matchar ordningen i `services`,
             så index kopplar kortet till rätt tjänstesida. */
          const slug = serviceSlugs[i];
          return (
            <div
              key={group.title}
              data-svc-card
              className="sticky mb-6 overflow-hidden rounded-card shadow-[var(--shadow-service-card)]"
              style={{
                // 46px synlig trappa när korten lägger sig på varandra
                top: `calc(84px + ${i * 46}px)`,
                background: skin.bg,
                border: `1px solid ${skin.border}`,
              }}
            >
              {/* Mini-headern tonas in av MotionRuntime när nästa kort närmar
                  sig. Bara titeln, inget nummer. */}
              <div
                data-svc-head
                className="flex items-center gap-[14px] px-[clamp(24px,3vw,44px)] py-[14px] opacity-0 transition-opacity duration-[.35s]"
                style={{ borderBottom: `1px solid ${skin.hairline}` }}
                aria-hidden="true"
              >
                <span
                  className="font-mono text-[12px] font-medium tracking-[.18em] uppercase opacity-85"
                  style={{ color: skin.fg }}
                >
                  {group.title}
                </span>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(24px,4vw,64px)] px-[clamp(24px,3vw,44px)] py-[clamp(24px,3.5vw,52px)]">
                <div>
                  <h3
                    /* Ingen ch-begränsning: rubriken ska rymmas på en rad.
                       Den bryter bara när kolumnen faktiskt är för smal. */
                    className="np-h3 text-[length:var(--fs-h3)] leading-[1.2] text-pretty"
                    style={{ color: skin.fg }}
                  >
                    {/* Tjänstesidorna finns bara på svenska, men de är
                        relevanta oavsett vilket språk besökaren läser sajten
                        på, precis som ortssidorna. */}
                    <Link
                      href={`/tjanster/${slug}`}
                      className="no-underline transition-colors duration-300 hover:text-accent"
                      style={{ color: "inherit" }}
                    >
                      {group.title}
                    </Link>
                  </h3>
                  <p
                    className="mt-5 mb-0 font-mono text-[12px] tracking-[.14em] uppercase"
                    style={{ color: skin.accent }}
                  >
                    <Link
                      href={`/tjanster/${slug}`}
                      className="no-underline"
                      style={{ color: "inherit" }}
                    >
                      {t.services.readMore}
                    </Link>
                  </p>
                </div>

                <ul className="m-0 flex list-none flex-col self-end p-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex justify-between gap-4 py-3 font-sans text-[15px] leading-[1.5]"
                      style={{
                        color: skin.item,
                        borderBottom: `1px solid ${skin.hairline}`,
                      }}
                    >
                      <span>{item}</span>
                      <span
                        aria-hidden="true"
                        /* Punkten är kortets enda accent i listan och ska
                           synas. Leading nollställs så den större glyfen
                           inte gör raderna högre. */
                        className="font-mono text-[17px] leading-none"
                        style={{ color: skin.accent }}
                      >
                        ✦
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
