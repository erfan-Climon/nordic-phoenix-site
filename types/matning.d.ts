/**
 * Globalerna som Google Analytics och Meta Pixel lägger på window.
 *
 * Båda biblioteken förutsätter att en kö finns innan deras egen fil hunnit
 * laddas, och den kön skapar vi själva i Matning-komponenten. Därför måste
 * typerna beskrivas här i stället för att komma från ett paket.
 */

interface Window {
  /** Kön som gtag.js läser när den startar. */
  dataLayer?: unknown[];
  /** Googles funktion. Skjuter in argumenten i dataLayer. */
  gtag?: (...args: unknown[]) => void;
  /** Metas funktion, med kö och flaggor som deras fbevents.js läser av. */
  fbq?: MetaPixel;
  /** Metas interna alias till samma funktion. */
  _fbq?: MetaPixel;
}

interface MetaPixel {
  (...args: unknown[]): void;
  /** Sätts av fbevents.js när biblioteket är laddat. */
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: MetaPixel;
}
