import Link from "next/link";
import type { Dictionary } from "@/content/locales/sv";
import { serviceSlugs } from "@/content/services";
import { type Locale, localePath } from "@/lib/i18n";

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

/**
 * Kortstapeln över de sex tjänsterna.
 *
 * Delas av startsidans tjänstesektion och tjänsteöversikten på /tjanster.
 * De två visade tidigare samma sex tjänster på två helt olika sätt, ett
 * staplat kortflöde och ett platt rutnät, vilket lästes som två skilda
 * sidor om samma sak.
 *
 * Korten är sticky och lägger sig på varandra med 46 px synlig trappa.
 * MotionRuntime tonar in mini-headern via data-svc-card och data-svc-head,
 * och kör på alla sidor, så stapeln fungerar likadant på båda ställena.
 */
export function ServiceCards({
  t,
  locale,
  rubrikNivå = "h3",
}: {
  t: Dictionary;
  locale: Locale;
  /**
   * Rubriknivå på korttiteln.
   *
   * På startsidan ligger stapeln under sektionens h2, så korten är h3. På
   * tjänsteöversikten är stapeln sidans enda innehåll under h1, och då blir
   * h3 ett hopp över en nivå. Skärmläsare läser rubriknivåerna som en
   * innehållsförteckning, och en nivå som saknas ser ut som att något
   * fattas.
   */
  rubrikNivå?: "h2" | "h3";
}) {
  const base = localePath(locale, "/tjanster");
  const Rubrik = rubrikNivå;

  return (
    <>
      {t.services.groups.map((group, i) => {
        const skin = SKINS[i] ?? cream;
        /* Ordningen i ordlistornas grupper matchar ordningen i `services`,
           så index kopplar kortet till rätt tjänstesida. */
        const slug = serviceSlugs[i];
        const href = `${base}/${slug}`;
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
                sig. Bara titeln, inget nummer.

                Ingen CSS-övergång på opaciteten. Värdet räknas ut ur
                scrollpositionen och skrivs varje bildruta, så en övergång
                startar om mot ett nytt mål hela tiden. På dator märks det
                inte, där kommer bildrutorna tätt. På telefon kommer
                scrollhändelserna i skurar, och varje skur blev ett eget
                litet toningssteg: det såg ut som blinkningar i stället för
                en jämn intoning. Utan övergång följer opaciteten scrollen
                exakt. */}
            <div
              data-svc-head
              className="flex items-center gap-[14px] px-[clamp(24px,3vw,44px)] py-[14px] opacity-0"
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
                <Rubrik
                  /* Ingen ch-begränsning: rubriken ska rymmas på en rad.
                     Den bryter bara när kolumnen faktiskt är för smal. */
                  className="np-h3 m-0 text-[length:var(--fs-h3)] leading-[1.2] text-pretty"
                  style={{ color: skin.fg }}
                >
                  {/* Adressen byggs med språkprefix. Utan det hamnade
                      svenska och engelska besökare på den persiska
                      tjänstesidan, eftersom persiskan ligger på roten. */}
                  <Link
                    href={href}
                    className="no-underline transition-colors duration-300 hover:text-accent"
                    style={{ color: "inherit" }}
                  >
                    {group.title}
                  </Link>
                </Rubrik>
                <p
                  className="mt-5 mb-0 font-mono text-[12px] tracking-[.14em] uppercase"
                  style={{ color: skin.accent }}
                >
                  <Link href={href} className="no-underline" style={{ color: "inherit" }}>
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
    </>
  );
}
