/**
 * Skyddsnät mot tomma sidor.
 *
 * Reveal-effekten döljer innehåll i CSS och låter JavaScript visa det igen.
 * Det betyder att allt som går fel mellan de två stegen lämnar besökaren med
 * en tom sida. Det har redan hänt en gång: rörelselagret frågade efter sina
 * element en enda gång och missade dem vid klientnavigering.
 *
 * Därför gäller döljandet bara när `data-js` står på html-elementet, och det
 * sätts av skriptet nedan. Två saker följer av det:
 *
 *  - Utan JavaScript döljs ingenting. Sidan syns i sin helhet direkt.
 *  - Laddar rörelselagret aldrig tas attributet bort efter en stund, och allt
 *    innehåll visas. Hellre utan animation än osynligt.
 *
 * Ligger i <head> i rotlayouten och körs synkront under HTML-tolkningen,
 * alltså före första målningen. Sätts attributet senare hinner besökaren se
 * innehållet blinka fram och försvinna igen. Se Next-guiden
 * "How to prevent flash before hydration", avsnittet om teman: det är samma
 * mönster, ett attribut på <html> satt före paint.
 *
 * <html> behöver `suppressHydrationWarning` eftersom attributet inte finns i
 * serverns HTML. Utan det behandlar React skillnaden som ett hydreringsfel
 * och bygger om trädet från närmaste gräns, vilket både blinkar och kostar.
 */

/** Tid innan skyddsnätet ger upp och visar allt ändå. */
const TIMEOUT_MS = 2500;

const SKRIPT = `
document.documentElement.dataset.js = "on";
setTimeout(function () {
  if (document.documentElement.dataset.motion !== "ready") {
    delete document.documentElement.dataset.js;
  }
}, ${TIMEOUT_MS});
`.trim();

export function MotionBoot() {
  return (
    <script
      /* text/javascript på servern, text/plain i webbläsaren. Skriptet ska
         bara köras när HTML:en tolkas. React varnar annars för att skript
         som renderas av en komponent aldrig körs på klienten, och den
         varningen är befogad: här är det avsiktligt. */
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SKRIPT }}
    />
  );
}
