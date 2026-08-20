/** Delade hjälpare för sidans rörelselager. */

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * Tvingar igång en video ljudlöst. Att bara sätta attributen i JSX räcker inte
 * pålitligt — React sätter dem efter att elementet skapats, och webbläsaren
 * hinner blockera autoplay. `volume = 0` är medvetet redundant: kunden har
 * uttryckligen krävt att ljud aldrig hörs.
 */
export function forceMutedPlayback(el: HTMLVideoElement | null): void {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;
  el.volume = 0;
  el.loop = true;
  const played = el.play();
  if (played && typeof played.catch === "function") {
    played.catch(() => {
      /* Autoplay kan blockeras — videon är dekorativ, så det får passera. */
    });
  }
}

/**
 * Kör om uppspelningsförsöket några gånger för att täcka sen laddning.
 *
 * Utöver tidsfönstren görs ett försök vid besökarens första gest. Safari på
 * iPhone blockerar autoplay helt i strömsparläge och i datasparläge, oavsett
 * hur ljudlös videon är, och då hjälper ingen timer. En vidrörning räknas
 * däremot som ett medgivande, så videon startar vid första svepet i stället
 * för att bli stående på posterbilden.
 */
export function retryPlayback(
  getEl: () => HTMLVideoElement | null,
  delays: number[] = [0, 300, 1200],
): () => void {
  const timers = delays.map((delay) =>
    window.setTimeout(() => forceMutedPlayback(getEl()), delay),
  );

  const GESTER = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
  const påGest = () => forceMutedPlayback(getEl());
  GESTER.forEach((g) =>
    window.addEventListener(g, påGest, { once: true, passive: true }),
  );

  return () => {
    timers.forEach(window.clearTimeout);
    GESTER.forEach((g) => window.removeEventListener(g, påGest));
  };
}
