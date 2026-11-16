"use client";

import { useState } from "react";

/**
 * Ett klipp med stillbild och tydlig spelknapp.
 *
 * Vloggsidan och artiklarna visade tidigare ett vanligt videoelement med
 * webbläsarens egna reglage. Med `preload="none"` syns då bara stillbilden
 * och en tunn list i nederkanten, och på en ruta som är 260 pixlar bred
 * ser den ut som en bild. Kunden läste den också så: "det är endast bild".
 *
 * Samma lösning som klippraden på startsidan: stillbilden bär en rund
 * spelknapp, och videoelementet monteras först när någon trycker. Det
 * behåller också skälet till `preload="none"`, att flera megabyte inte ska
 * hämtas åt den som bara skummar: innan trycket finns ingen video alls.
 *
 * Ljudet är på när filmen startar. Besökaren har tryckt själv, så det är
 * inget oombett ljud.
 */
export function KlippSpelare({
  fil,
  affisch,
  titel,
  spelaEtikett,
  className = "",
}: {
  fil: string;
  affisch: string;
  titel: string;
  /** "Spela klippet" på sidans språk. Läses upp tillsammans med titeln. */
  spelaEtikett: string;
  className?: string;
}) {
  const [spelas, setSpelas] = useState(false);

  return (
    <div
      className={`relative aspect-[9/16] overflow-hidden rounded-media bg-ink ${className}`}
    >
      {spelas ? (
        <video
          src={fil}
          poster={affisch}
          controls
          autoPlay
          playsInline
          title={titel}
          className="block h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setSpelas(true)}
          aria-label={`${spelaEtikett}: ${titel}`}
          className="group block h-full w-full cursor-pointer border-0 p-0"
        >
          {/* img och inte bakgrundsbild, så den kan lazy-laddas. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={affisch}
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
                "radial-gradient(ellipse at center, rgba(10,9,8,.3) 0%, transparent 58%)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,254,251,.94)] text-ink shadow-[0_8px_28px_rgba(10,9,8,.34)] transition-transform duration-[.4s] ease-[var(--ease)] group-hover:scale-110"
          >
            {/* Triangeln är optiskt centrerad, alltså något till höger. */}
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
        </button>
      )}
    </div>
  );
}
