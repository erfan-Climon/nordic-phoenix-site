"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/content/locales/sv";
import { matning } from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";
import {
  lasLage,
  lasServerLage,
  prenumerera,
  sparaSamtycke,
} from "@/lib/samtycke";

/**
 * Rutan som frågar om mätning.
 *
 * Visas bara när något faktiskt finns att samtycka till. Är både GA4 och
 * Meta Pixel otillsatta frågar vi ingenting: en ruta som ber om lov till
 * något som inte händer är bara i vägen.
 *
 * Ligger i nederkanten och inte över hela sidan. Innehållet går att läsa och
 * använda medan frågan står kvar, vilket är avsikten. Ett val som bara går
 * att komma undan genom att godkänna är inte frivilligt, och därför är
 * nekaknappen likvärdig med den som godkänner: samma storlek, samma plats,
 * ingen av dem undanskuffad.
 */
export function Samtycke({ locale, t }: { locale: Locale; t: Dictionary }) {
  /* Läget kommer ur webbläsarens lagring. Under hydreringen är det "okant",
     så rutan renderas inte alls i den första omgången. Det gör att en
     besökare som redan svarat aldrig ser den blinka förbi, och att serverns
     och klientens första träd är identiska.

     Länken i footern nollställer lagringen och skickar samma händelse, så den
     som ångrar sig får frågan igen utan att komponenten behöver veta om det. */
  const lage = useSyncExternalStore(prenumerera, lasLage, lasServerLage);

  const finnsNagotAttFraga = Boolean(matning.ga4 || matning.metaPixel);
  if (!finnsNagotAttFraga || lage !== "obesvarat") return null;

  const knapp =
    "np-btn cursor-pointer px-6 py-3 text-[14px] font-medium whitespace-nowrap";

  return (
    <div
      role="dialog"
      aria-label={t.consent.title}
      /* z-index under chattwidgeten men över sidinnehållet. Rutan får inte
         täcka den vägen in till oss. */
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(242,236,224,.12)] bg-ink px-[var(--pad-x)] py-[clamp(16px,2vw,22px)] text-on-dark"
    >
      <div className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="m-0 max-w-[68ch] font-sans text-[14px] leading-[1.65] text-on-dark-muted">
          {t.consent.text}{" "}
          <Link
            href={localePath(locale, "/integritetspolicy")}
            className="text-on-dark underline transition-colors duration-300 hover:text-accent-light"
          >
            {t.consent.readMore}
          </Link>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => sparaSamtycke("nej")}
            className={`${knapp} border border-[rgba(242,236,224,.35)] bg-transparent text-on-dark hover:border-on-dark`}
          >
            {t.consent.decline}
          </button>
          <button
            type="button"
            onClick={() => sparaSamtycke("ja")}
            className={`${knapp} np-btn-primary`}
          >
            {t.consent.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
