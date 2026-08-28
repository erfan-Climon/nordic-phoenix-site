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
  /** TikToks objekt. Byggs av deras egen kodsnutt och har en egen kö. */
  ttq?: TikTokPixel;
  TiktokAnalyticsObject?: string;
}

interface TikTokPixel {
  (...args: unknown[]): void;
  track: (namn: string, data?: Record<string, unknown>) => void;
  page: () => void;
  load: (pixelId: string) => void;
  methods?: string[];
  setAndDefer?: (obj: unknown, metod: string) => void;
  instance?: (id: string) => unknown;
  _i?: Record<string, unknown>;
  _t?: Record<string, number>;
  _o?: Record<string, unknown>;
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
