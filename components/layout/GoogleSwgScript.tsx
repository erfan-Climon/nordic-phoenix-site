/**
 * Googles publisher.js, som ritar knappen för Preferred Sources.
 *
 * Ligger i <head> i båda rotlayouterna. De två renderas aldrig samtidigt,
 * persiskan har sin och de prefixade språken sin, så filen hämtas en gång per
 * sidvisning trots att komponenten står på två ställen. React 19 lyfter
 * dessutom script-element och avduplicerar på src.
 *
 * Plain <script async> och inte next/script, efter att båda provats och mätts:
 *
 * next/script med `afterInteractive` lägger ingenting i den utlevererade
 * HTML:en. Taggen injiceras först när sidan hydrerats, alltså senare och bara
 * om klientlagret startar. Kravet var att skriptet ska stå i <head>, och det
 * uppfylls inte då.
 *
 * Med en vanlig tagg står den i HTML:en och hämtningen börjar parallellt med
 * att sidan tolkas. `async` gör att den aldrig blockerar vare sig tolkning
 * eller första målningen.
 *
 * Att sajten redan visar två hydreringsfel i utvecklingsläge är noterat, men
 * de kommer från MotionBoot och fanns före den här komponenten. Uppmätt: exakt
 * samma två fel med och utan skriptet, och lika många med next/script. React
 * behandlar ett externt `<script async src>` som en resurs att lyfta, inte som
 * ett element att hydrera, så det lägger inget till.
 */
export function GoogleSwgScript() {
  return <script async src="https://news.google.com/swg/js/v1/publisher.js" />;
}
