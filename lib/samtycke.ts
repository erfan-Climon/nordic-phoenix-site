/**
 * Besökarens samtycke till mätning och spårning.
 *
 * Delas av rutan som frågar och av lagret som laddar skripten. De två sitter
 * på olika ställen i trädet och ska inte känna till varandra, så beskedet
 * skickas som en händelse på window i stället för genom komponenter.
 *
 * Valet sparas i localStorage och inte i en kaka. En kaka hade skickats med
 * varje anrop till servern helt i onödan, och själva samtycket är dessutom
 * det enda vi lagrar innan besökaren sagt ja.
 *
 * Läses av komponenterna genom useSyncExternalStore. Det är den API som finns
 * för just det här: ett värde som bara existerar i webbläsaren och som ändras
 * utanför React. Första försöket läste i stället lagret i en effekt och
 * skrev till state, vilket linten stoppade med rätta.
 */

export type Samtycke = "ja" | "nej";

/**
 * Lägena komponenterna ser.
 *
 * `okant` returneras på servern och under hydreringen. Det låter rutan rendera
 * ingenting i den första omgången, så att en besökare som redan svarat aldrig
 * ser den blinka förbi. `obesvarat` betyder att frågan verkligen är öppen.
 */
export type SamtyckeLage = Samtycke | "obesvarat" | "okant";

export const SAMTYCKE_NYCKEL = "np-samtycke";

/**
 * Höjs när det vi frågar om ändras, till exempel om ett nytt verktyg läggs
 * till. Då räknas ett gammalt svar inte längre och besökaren får frågan igen.
 * Ett samtycke gäller det man faktiskt sagt ja till.
 */
export const SAMTYCKE_VERSION = 1;

/** Skickas när valet ändrats, så både rutan och mätlagret kan läsa om. */
export const SAMTYCKE_HANDELSE = "np:samtycke";

type Sparat = { v: number; val: Samtycke; tid: string };

export function prenumerera(pavarning: () => void): () => void {
  window.addEventListener(SAMTYCKE_HANDELSE, pavarning);
  /* Ett svar i en annan flik ska gälla här också. */
  window.addEventListener("storage", pavarning);
  return () => {
    window.removeEventListener(SAMTYCKE_HANDELSE, pavarning);
    window.removeEventListener("storage", pavarning);
  };
}

/** Nuvarande läge i webbläsaren. Returnerar en sträng, alltså stabil att jämföra. */
export function lasLage(): SamtyckeLage {
  try {
    const rå = window.localStorage.getItem(SAMTYCKE_NYCKEL);
    if (!rå) return "obesvarat";
    const sparat = JSON.parse(rå) as Sparat;
    if (sparat.v !== SAMTYCKE_VERSION) return "obesvarat";
    return sparat.val === "ja" || sparat.val === "nej" ? sparat.val : "obesvarat";
  } catch {
    /* Trasigt värde eller blockerad lagring behandlas som obesvarat. Att
       kasta här hade tagit ner hela sidan för en detalj som får misslyckas. */
    return "obesvarat";
  }
}

/** Läget på servern och under hydreringen. */
export function lasServerLage(): SamtyckeLage {
  return "okant";
}

export function sparaSamtycke(val: Samtycke): void {
  const sparat: Sparat = { v: SAMTYCKE_VERSION, val, tid: new Date().toISOString() };
  try {
    window.localStorage.setItem(SAMTYCKE_NYCKEL, JSON.stringify(sparat));
  } catch {
    /* Lagringen kan vara full eller avstängd. Händelsen nedan gör att valet
       ändå gäller för den här sidvisningen. */
  }
  window.dispatchEvent(new Event(SAMTYCKE_HANDELSE));
}

/**
 * Glömmer valet och visar frågan igen.
 *
 * Ett samtycke ska gå att ta tillbaka lika enkelt som det gavs, annars är det
 * inte frivilligt. Skript som redan hunnit laddas ligger kvar till nästa
 * sidladdning, så den som säger nej här bör ladda om sidan. Att riva ut ett
 * laddat mätbibliotek ur en körande sida går inte att göra pålitligt.
 */
export function aterstallSamtycke(): void {
  try {
    window.localStorage.removeItem(SAMTYCKE_NYCKEL);
  } catch {
    /* Blockerad lagring. Rutan visas ändå genom händelsen nedan. */
  }
  window.dispatchEvent(new Event(SAMTYCKE_HANDELSE));
}
