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

/** Kör om uppspelningsförsöket några gånger för att täcka sen laddning. */
export function retryPlayback(
  getEl: () => HTMLVideoElement | null,
  delays: number[] = [0, 300, 1200],
): () => void {
  const timers = delays.map((delay) =>
    window.setTimeout(() => forceMutedPlayback(getEl()), delay),
  );
  return () => timers.forEach(window.clearTimeout);
}
