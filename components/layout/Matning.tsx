"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { matning } from "@/content/site";
import { lasLage, lasServerLage, prenumerera } from "@/lib/samtycke";

/**
 * Google Analytics 4 och Meta Pixel, laddade först efter samtycke.
 *
 * Ingenting hämtas innan besökaren sagt ja. Google Consent Mode, alltså att
 * ladda gtag direkt men med samtycket satt till nekat, hade varit ett
 * alternativ, men då hämtas Googles fil ändå och kontakt tas med deras
 * servrar. Att inte ladda alls är det enda som är entydigt.
 *
 * Sajten navigerar som en ensidesapp mellan sina egna sidor. Båda verktygen
 * räknar bara den första sidvisningen av sig själva, så följande visningar
 * rapporteras här när sökvägen ändras. Utan det hade allt utom
 * landningssidan saknats i statistiken.
 */
export function Matning() {
  const samtycke = useSyncExternalStore(prenumerera, lasLage, lasServerLage);
  const pathname = usePathname();
  const laddat = useRef(false);
  /* Första sidvisningen rapporteras av verktygen själva när de startar.
     Räknaren finns för att inte rapportera den en gång till. */
  const forstaVisningen = useRef(true);

  useEffect(() => {
    if (samtycke !== "ja" || laddat.current) return;
    laddat.current = true;

    if (matning.ga4) startaGa4(matning.ga4);
    if (matning.metaPixel) startaMetaPixel(matning.metaPixel);
    if (matning.tiktokPixel) startaTikTok(matning.tiktokPixel);
  }, [samtycke]);

  useEffect(() => {
    if (samtycke !== "ja") return;
    if (forstaVisningen.current) {
      forstaVisningen.current = false;
      return;
    }
    const url = window.location.pathname + window.location.search;
    window.gtag?.("event", "page_view", { page_path: url });
    window.fbq?.("track", "PageView");
    window.ttq?.page();
  }, [pathname, samtycke]);

  return null;
}

function startaGa4(matId: string) {
  const skript = document.createElement("script");
  skript.async = true;
  skript.src = `https://www.googletagmanager.com/gtag/js?id=${matId}`;
  document.head.appendChild(skript);

  window.dataLayer = window.dataLayer || [];
  /* Måste vara en vanlig funktion. gtag läser `arguments`, och en pilfunktion
     har inget eget arguments-objekt. */
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", matId);
}

function startaMetaPixel(pixelId: string) {
  if (window.fbq) return;

  /* Metas egen kodsnutt, utskriven i läsbar form. Den bygger en kö så att
     anrop före filen laddats inte tappas bort. */
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as unknown as MetaPixel;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = window._fbq ?? fbq;

  const skript = document.createElement("script");
  skript.async = true;
  skript.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(skript);

  fbq("init", pixelId);
  fbq("track", "PageView");
}

/**
 * TikToks pixel.
 *
 * Trogen TikToks egen kodsnutt, bara utskriven i läsbar form. Det som ser
 * märkligt ut är avsiktligt: `ttq` är en ARRAY, inte ett objekt. Varje metod
 * skjuter in sitt anrop i arrayen, och deras SDK tömmer den när den laddat.
 *
 * Första försöket här byggde en egen kö i en lokal variabel. Den hade SDK:n
 * aldrig läst, så allt som anropades innan filen hunnit laddas hade
 * försvunnit tyst. En pixel som tappar händelser utan att säga till är värre
 * än ingen pixel alls, eftersom siffrorna då ser rimliga ut men är fel.
 */
function startaTikTok(pixelId: string) {
  if (window.ttq) return;

  window.TiktokAnalyticsObject = "ttq";
  const ttq = ([] as unknown) as TikTokPixel;
  window.ttq = ttq;

  ttq.methods = [
    "page", "track", "identify", "instances", "debug", "on", "off", "once",
    "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent",
    "revokeConsent", "grantConsent",
  ];

  ttq.setAndDefer = (mal: unknown, metod: string) => {
    (mal as Record<string, unknown>)[metod] = (...args: unknown[]) => {
      (mal as unknown[]).push([metod, ...args]);
    };
  };
  for (const metod of ttq.methods) ttq.setAndDefer(ttq, metod);

  ttq.instance = (id: string) => {
    const inst = (ttq._i?.[id] ?? []) as unknown[];
    for (const metod of ttq.methods ?? []) ttq.setAndDefer?.(inst, metod);
    return inst;
  };

  ttq.load = (id: string) => {
    const url = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    (ttq._i[id] as unknown as { _u: string })._u = url;
    ttq._t = ttq._t || {};
    ttq._t[id] = Date.now();
    ttq._o = ttq._o || {};
    ttq._o[id] = {};
    const skript = document.createElement("script");
    skript.async = true;
    skript.src = `${url}?sdkid=${id}&lib=ttq`;
    document.head.appendChild(skript);
  };

  ttq.load(pixelId);
  ttq.page();
}
