"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { video } from "@/content/site";
import { REDUCED_MOTION_QUERY, retryPlayback } from "@/lib/motion";

/** Under den här bredden spelas den förbeskurna mobilfilen i stället. */
const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Hero-sektionens bakgrundsvideo.
 *
 * Mobil får en egen fil som är förbeskuren till det utsnitt som ändå visas,
 * 278 kB mot 4,3 MB. Källorna byts alltså efter bredd.
 *
 * `<video>` renderas först när villkoren är uppfyllda, i stället för att
 * renderas och döljas med CSS. En dold video laddas ändå ner. Servern renderar
 * därför ingenting alls här: posterbilden ligger som bakgrund på sektionen
 * och är det enda som syns tills klienten avgjort att videon ska spelas.
 */
export function HeroBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const loaded = useWindowLoaded();
  /**
   * Videon monteras först efter load. Sidans största element är hero-texten,
   * och en video på flera megabyte som börjar hämtas under första målningen
   * konkurrerar om bandbredden med just det. Posterbilden syns under tiden,
   * så besökaren ser ingen skillnad.
   */
  const show = !reducedMotion && loaded;

  useEffect(() => {
    if (!show) return;
    return retryPlayback(() => ref.current);
  }, [show]);

  if (!show) return null;

  return (
    <video
      ref={ref}
      /* key tvingar fram ett nytt element när källuppsättningen byts.
         Webbläsaren läser inte om <source> av sig själv. */
      key={isDesktop ? "desktop" : "mobil"}
      poster={video.heroPoster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover"
    >
      {isDesktop ? (
        <>
          {/* WebM först, MP4 som fallback för Safari. */}
          <source src={video.heroWebm} type="video/webm" />
          <source src={video.hero} type="video/mp4" />
        </>
      ) : (
        <source src={video.heroMobile} type="video/mp4" />
      )}
    </video>
  );
}

/**
 * matchMedia via useSyncExternalStore. Servern och första renderingen får
 * `false`, vilket är rätt utgångsläge: ingen video förrän vi vet att den ska
 * visas. Alternativet, setState i en effekt, är dessutom otillåtet enligt
 * projektets lint-regler.
 */
/** Sant när sidans load-event har gått. Servern får alltid false. */
function useWindowLoaded(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (document.readyState === "complete") return () => {};
      window.addEventListener("load", onChange, { once: true });
      return () => window.removeEventListener("load", onChange);
    },
    () => document.readyState === "complete",
    () => false,
  );
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
