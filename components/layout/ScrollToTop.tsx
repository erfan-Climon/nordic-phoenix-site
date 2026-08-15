"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

/** Visas först när besökaren scrollat förbi en halv skärmhöjd. */
const TROSKEL = 0.5;

export function ScrollToTop({ href, label }: { href: string; label: string }) {
  const visible = useHasScrolled();

  return (
    <Link
      href={href}
      aria-label={label}
      /* Dold högst upp på sidan. aria-hidden och tabIndex följer med, annars
         når man en osynlig knapp med tangentbordet. pointer-events stängs av
         så den inte fångar klick medan den tonas bort. */
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-[22px] left-[22px] z-[95] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(23,19,16,.14)] bg-[rgba(255,254,251,.92)] text-text no-underline shadow-[0_10px_30px_rgba(23,19,16,.16)] backdrop-blur-[8px] transition-[transform,opacity,color,border-color] duration-300 ease-[var(--ease)] hover:border-[rgba(240,103,0,.5)] hover:text-accent-ink ${
        visible
          ? "translate-y-0 opacity-100 hover:-translate-y-[3px]"
          : "pointer-events-none translate-y-[12px] opacity-0"
      }`}
    >
      {/* SVG i stället för ↑ (U+2191) — glyfen saknas i brödtextsnittet och
          faller tillbaka på ett systemtypsnitt som ritar fel tecken. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M9 15V3" />
        <path d="M3.5 8.5 9 3l5.5 5.5" />
      </svg>
    </Link>
  );
}

/**
 * Sant när sidan är scrollad förbi tröskeln.
 *
 * useSyncExternalStore i stället för state i en effekt: servern och första
 * renderingen får false, vilket är rätt utgångsläge eftersom sidan alltid
 * laddas högst upp.
 *
 * Ingen rAF-strypning här. Snapshoten är en boolean, så React renderar bara om
 * när den vänder, och en scroll-handler som bara läser scrollY är billig. En
 * rAF däremot pausas i dolda flikar, vilket gör att knappen kan fastna i fel
 * läge tills nästa scroll efter att fliken blir synlig igen.
 */
function useHasScrolled(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      window.addEventListener("resize", onChange, { passive: true });
      return () => {
        window.removeEventListener("scroll", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    () => window.scrollY > window.innerHeight * TROSKEL,
    () => false,
  );
}
