/**
 * Kontaktformulärets fält och gränser, delade mellan formuläret i
 * webbläsaren och serverfunktionen i `functions/api/kontakt.ts`.
 *
 * Relativa importer och inga `@/`-alias i hela `lib/kontakt/`: filerna
 * buntas även av Cloudflare Pages Functions, som inte läser tsconfig.
 */

export const SPRAK = ["sv", "fa", "en"] as const;
export type KontaktSprak = (typeof SPRAK)[number];

export const GRANSER = {
  namn: 100,
  epost: 200,
  telefon: 40,
  meddelande: 3000,
  sida: 500,
  utm: 200,
} as const;

/**
 * Kortaste tid i millisekunder mellan att formuläret visades och att det
 * skickades. En människa hinner inte fylla i namn och e-post på kortare tid;
 * en robot som postar direkt gör det. Mäts i webbläsaren och skickas med som
 * en längd, inte som en tidpunkt, så att klockskillnad mellan besökarens
 * dator och servern inte spelar in.
 */
export const MINSTA_IFYLLNADSTID = 3000;

export type KontaktIn = {
  namn: string;
  epost: string;
  telefon?: string;
  meddelande?: string;
  sprak: KontaktSprak;
  sida?: string;
  utm?: Record<string, string>;
};

/* Avsiktligt förlåtande. Målet är att stoppa uppenbart skräp, inte att
   avvisa en giltig adress som en striktare regel inte känner igen. */
const EPOST = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(varde: unknown, max: number): string {
  return typeof varde === "string" ? varde.trim().slice(0, max) : "";
}

/**
 * Tvättar och kontrollerar det som kom in. Returnerar null om något
 * obligatoriskt saknas eller är ogiltigt.
 */
export function tolkaKontakt(radata: Record<string, unknown>): KontaktIn | null {
  const namn = text(radata.namn, GRANSER.namn);
  const epost = text(radata.epost, GRANSER.epost).toLowerCase();
  if (!namn || !EPOST.test(epost)) return null;

  const sprak = SPRAK.includes(radata.sprak as KontaktSprak)
    ? (radata.sprak as KontaktSprak)
    : "sv";

  const utm: Record<string, string> = {};
  if (radata.utm && typeof radata.utm === "object") {
    for (const [nyckel, varde] of Object.entries(radata.utm)) {
      if (/^utm_[a-z]+$/.test(nyckel)) {
        const v = text(varde, GRANSER.utm);
        if (v) utm[nyckel] = v;
      }
    }
  }

  return {
    namn,
    epost,
    telefon: text(radata.telefon, GRANSER.telefon) || undefined,
    meddelande: text(radata.meddelande, GRANSER.meddelande) || undefined,
    sprak,
    sida: text(radata.sida, GRANSER.sida) || undefined,
    utm: Object.keys(utm).length ? utm : undefined,
  };
}
