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
 * Skriptet ligger först i body och körs synkront, alltså före första
 * målningen. Sätts attributet senare hinner besökaren se innehållet blinka
 * fram och försvinna igen.
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
  return <script dangerouslySetInnerHTML={{ __html: SKRIPT }} />;
}
