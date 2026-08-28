/**
 * Kampanjparametrarna från annonsen.
 *
 * En besökare från Meta eller TikTok landar med utm-parametrar i adressen,
 * men klickar sig ofta vidare, laddar om, eller skickar formuläret långt
 * senare. Parametrarna sparas därför i sessionStorage vid första sidvisningen
 * och läses tillbaka när leaden skickas.
 *
 * sessionStorage och inte localStorage: kampanjen som gäller är den besökaren
 * kom in på nu, inte den hen kom in på för tre veckor sedan. Ett gammalt värde
 * som ligger kvar skulle tillskriva fel kampanj i GHL, vilket är värre än att
 * sakna värdet.
 *
 * Lagringen kräver inget samtycke. Det här är ingen spårning över tid och
 * ingen tredje part, utan uppgifter besökaren själv bär med sig i adressen och
 * som behövs för att kunna svara på förfrågan hen just skickat.
 */

const NYCKEL = "np-utm";

export const UTM_FALT = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Utm = Partial<Record<(typeof UTM_FALT)[number], string>>;

/** Läser ur adressen och sparar. Körs en gång per sidvisning. */
export function fangaUtm(): void {
  if (typeof window === "undefined") return;
  const fran = new URLSearchParams(window.location.search);
  const funna: Utm = {};
  for (const falt of UTM_FALT) {
    const varde = fran.get(falt);
    if (varde) funna[falt] = varde.slice(0, 200);
  }
  /* Ingen parameter i adressen betyder direkttrafik eller en intern klick.
     Då ska det som redan ligger sparat stå kvar, annars tappar vi kampanjen
     så fort besökaren byter sida. */
  if (Object.keys(funna).length === 0) return;
  try {
    window.sessionStorage.setItem(NYCKEL, JSON.stringify(funna));
  } catch {
    /* Blockerad lagring. Leaden går fram utan kampanjuppgifter. */
  }
}

export function lasUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const rå = window.sessionStorage.getItem(NYCKEL);
    return rå ? (JSON.parse(rå) as Utm) : {};
  } catch {
    return {};
  }
}
