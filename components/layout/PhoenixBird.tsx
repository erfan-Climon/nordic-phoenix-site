"use client";

import { useSyncExternalStore } from "react";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

/**
 * Fenixen i processektionen, som logomotion.
 *
 * Tidigare var den fyra bilddelar, kropp, två vingar och stjärt, som
 * viftade med CSS i en slinga. Kunden ville inte ha den rörelsen. Den här
 * är logomotionen som togs fram i Higgsfield 2026-08-14: fågeln står
 * stilla, och det som rör sig är glöden inuti den, ljuset över guldorangen
 * och en ljusbåge runt ringen. Originalet ligger i kundens Drive under
 * Material/logomotion-phoenix-higgsfield-2026-08-14.mp4.
 *
 * Filen är bearbetad för att ligga på sektionen utan synlig ruta:
 *
 * - Beskuren till logon, 760 av 1924 bildpunkter i fyrkant, nerskalad
 *   till 360. Den visas som mest 140 punkter bred.
 * - Bakgrunden svärtad med en kurva. Originalets botten är inte svart utan
 *   blågrå, ljusast i mitten, och hade syntes som en fyrkant mot sektionens
 *   varmsvarta ton. Efter kurvan är den helt svart, och med `screen` som
 *   blandningsläge blir svart osynligt mot vilken mörk bakgrund som helst.
 * - Spelad framåt och sedan baklänges, tio sekunder. Originalet är fem
 *   sekunder och slutar inte där det börjar, så en vanlig slinga hade
 *   hackat vid varje varv. Rörelsen är så lugn att baklänges inte syns.
 *
 * Helt dekorativ: aria-hidden och pointer-events: none. Vid reducerad
 * rörelse visas första rutan som stillbild.
 *
 * Ligger absolut placerad inuti processektionen, inte fixed mot viewporten.
 * Sektionen som renderar den måste därför vara position: relative.
 */

const STORLEK = "clamp(84px, 9vw, 140px)";

export function PhoenixBird() {
  const reducerad = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      /* Logisk inset, inte `right`: i RTL börjar rubrikerna vid höger kant och
         fågeln skulle annars hamna mitt i texten.
         Dold under nav-brytpunkten: i enkolumnsläget lägger den sig mitt i
         stegens brödtext, vilket den aldrig gör i tvåkolumnslayouten. */
      className="pointer-events-none absolute top-1/2 end-[clamp(6px,2.4vw,36px)] z-[5] hidden aspect-square mix-blend-screen nav:block"
      style={{ width: STORLEK, marginTop: `calc(${STORLEK} / -2)` }}
    >
      {reducerad ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/video/fenix-poster.jpg"
          alt=""
          className="block h-full w-full"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/fenix-poster.jpg"
          tabIndex={-1}
          className="block h-full w-full"
        >
          <source src="/video/fenix.webm" type="video/webm" />
          <source src="/video/fenix.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

/** Servern och första renderingen får false, alltså videon. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(REDUCED_MOTION_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}
