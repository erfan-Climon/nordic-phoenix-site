"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { localesForPath } from "@/lib/locales-for-path";
import {
  type Locale,
  localeButtonLabelShort,
  localeFlag,
  localeNativeName,
  localePath,
} from "@/lib/i18n";

/**
 * Språkväljare som rullgardin.
 *
 * Ersätter den tidigare knappen som cyklade till nästa språk. Med tre språk
 * och sidor som inte finns på alla var cykeln svår att förstå: man såg inte
 * vilka språk som fanns, bara vilket som kom härnäst.
 *
 * Listan innehåller bara språk sidan faktiskt finns på, uträknat ur
 * innehållet i `localesForPath`. Adressen räknas ut på servern, så det som
 * står i HTML:en är det som gäller även innan sidan hydrerats.
 *
 * Finns bara ett språk visas ingenting alls.
 */
export function LanguageMenu({
  locale,
  path,
  label,
  onDark = false,
}: {
  locale: Locale;
  /** Sökväg utan språkprefix, så som `stripLocale` lämnar den. */
  path: string;
  /** Skärmläsaretikett, t.ex. "Byt språk". */
  label: string;
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rot = useRef<HTMLDivElement>(null);
  const panelId = useId();

  /* Stänger vid klick utanför och på Escape. Utan det ligger panelen kvar
     när besökaren klickar vidare, vilket täcker innehållet på mobil. */
  useEffect(() => {
    if (!open) return;

    const utanför = (event: PointerEvent) => {
      if (!rot.current?.contains(event.target as Node)) setOpen(false);
    };
    const tangent = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", utanför);
    document.addEventListener("keydown", tangent);
    return () => {
      document.removeEventListener("pointerdown", utanför);
      document.removeEventListener("keydown", tangent);
    };
  }, [open]);

  const språk = localesForPath(path);
  if (språk.length < 2) return null;

  const knappFärg = onDark
    ? "text-on-dark hover:text-accent-light"
    : "text-text hover:text-accent-ink";

  return (
    <div ref={rot} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        className={`flex h-11 items-center gap-[6px] px-1 font-mono text-[13px] font-medium tracking-[.08em] transition-colors duration-300 ${knappFärg}`}
      >
        <Glob />
        {localeButtonLabelShort[locale]}
        <Pil open={open} />
      </button>

      {/* Panelen renderas alltid och döljs med `hidden`, inte med villkorad
          rendering. Två skäl: språklänkarna hamnar då i server-HTML:en där
          Google kan följa dem, och `hidden` tar bort dem ur både tabbordning
          och tillgänglighetsträdet när menyn är stängd. */}
      <div
        hidden={!open}
        id={panelId}
        /* Ligger i skrivriktningens startkant, så menyn öppnar inåt sidan
             i stället för utanför skärmen på persiska. */
        className="absolute top-[calc(100%+6px)] z-[120] min-w-[184px] overflow-hidden rounded-card border border-[rgba(23,19,16,.12)] bg-surface py-2 shadow-[0_18px_44px_rgba(23,19,16,.18)] ltr:right-0 rtl:left-0"
      >
        {språk.map((l) => {
          const aktuellt = l === locale;
          return (
            <Link
              key={l}
              href={localePath(l, path)}
              hrefLang={l}
              lang={l}
              aria-current={aktuellt ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-[10px] font-sans text-[15px] no-underline transition-colors duration-200 ${
                aktuellt
                  ? "font-semibold text-accent-ink"
                  : "text-text hover:bg-page hover:text-accent-ink"
              }`}
            >
              <span aria-hidden="true" className="text-[17px] leading-none">
                {localeFlag[l]}
              </span>
              {localeNativeName[l]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Glob() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="6.4" />
      <path d="M1.6 8h12.8" />
      <ellipse cx="8" cy="8" rx="2.7" ry="6.4" />
    </svg>
  );
}

function Pil({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1.5 3.5 5 7l3.5-3.5" />
    </svg>
  );
}
