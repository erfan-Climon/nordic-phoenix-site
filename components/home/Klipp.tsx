"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/locales/sv";
import { publiceradeKlipp } from "@/content/klipp";
import { social } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Klippen från Instagram, spelade från sajtens egna filer.
 *
 * Bara ett klipp i taget har ett `<video>`-element. De andra visar sin
 * stillbild. Det är avsiktligt: sju porträttfilmer som alla ligger i DOM:en
 * laddar metadata var för sig, och på mobil blev det mätbart segare än att
 * byta ut elementet när någon trycker på en ny ruta. Att byta ut det stoppar
 * också det förra klippet utan egen pausningslogik.
 */
export function Klipp({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [aktiv, setAktiv] = useState<string | null>(null);

  if (publiceradeKlipp.length === 0) return null;

  return (
    <section id="klipp" className="relative bg-surface [overflow:clip]">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y)]">
        {/* Rubrik till vänster, länken till kontot till höger. På mobil
            lägger sig länken under rubriken i stället för att krympa den. */}
        <div
          data-reveal
          className="mb-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-[46ch]">
            <p className="np-label mb-7 text-accent-ink">{t.klipp.label}</p>
            <h2 className="np-h2 mb-5 text-[length:var(--fs-h2)] leading-[1.15] tracking-[-.015em]">
              {t.klipp.h2a} <em className="text-accent-ink">{t.klipp.h2b}</em>
            </h2>
            <p className="m-0 font-sans text-[16px] leading-[1.75] text-text-muted">
              {t.klipp.sub}
            </p>
          </div>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener"
            className="np-btn np-btn-outline shrink-0 px-[26px] py-[13px] text-[14px]"
          >
            {t.klipp.folj}
          </a>
        </div>

        {/* Vågrät rad med snäpp. Rutorna går ut i sidkanten med negativ
            marginal, så den sista inte ser avklippt ut mitt i innehållsytan. */}
        <ul
          data-reveal
          data-reveal-delay="120"
          className="-mx-[var(--pad-x)] flex list-none snap-x snap-mandatory gap-[clamp(14px,1.6vw,22px)] overflow-x-auto px-[var(--pad-x)] pb-3 [scrollbar-width:thin]"
        >
          {publiceradeKlipp.map((k) => {
            const spelas = aktiv === k.slug;
            return (
              <li
                key={k.slug}
                className="w-[clamp(216px,24vw,292px)] shrink-0 snap-start"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-media bg-ink shadow-[var(--shadow-card-light)]">
                  {spelas ? (
                    /* Ljud på: besökaren har tryckt själv, så det är inget
                       oombett ljud. Därför heller ingen autoplay-dämpning. */
                    <video
                      src={k.fil}
                      poster={k.affisch}
                      controls
                      autoPlay
                      playsInline
                      className="block h-full w-full object-cover"
                      title={k.titel[locale]}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAktiv(k.slug)}
                      aria-label={`${t.klipp.spela}: ${k.titel[locale]}`}
                      className="group block h-full w-full cursor-pointer border-0 p-0 text-left"
                    >
                      {/* Stillbilden ligger som img och inte som
                          bakgrundsbild, så den kan lazy-laddas och får alt. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={k.affisch}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover transition-transform duration-[.6s] ease-[var(--ease)] group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,9,8,.78) 0%, rgba(10,9,8,.12) 42%, transparent 70%)",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,254,251,.92)] shadow-[0_8px_28px_rgba(10,9,8,.34)] transition-transform duration-[.4s] ease-[var(--ease)] group-hover:scale-110"
                      >
                        {/* Triangeln är optiskt centrerad, alltså något till
                            höger. Matematiskt mitt ser ut att ligga vänster. */}
                        <svg
                          width="17"
                          height="19"
                          viewBox="0 0 17 19"
                          className="ml-[3px]"
                          fill="currentColor"
                        >
                          <path d="M16 8.2a1.5 1.5 0 0 1 0 2.6L2.3 18.6A1.5 1.5 0 0 1 0 17.3V1.7A1.5 1.5 0 0 1 2.3.4Z" />
                        </svg>
                      </span>
                      <span className="pointer-events-none absolute right-4 bottom-4 left-4 block font-sans text-[14px] leading-[1.45] font-medium text-on-dark">
                        {k.titel[locale]}
                      </span>
                    </button>
                  )}
                </div>
                <a
                  href={k.permalank}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-block font-sans text-[13px] text-text-muted underline-offset-4 hover:text-accent-ink hover:underline"
                >
                  {t.klipp.seInlagg}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
