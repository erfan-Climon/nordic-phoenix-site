"use client";

import { useEffect } from "react";
import { chatWidget } from "@/content/site";

const SCRIPT_ID = "np-ghl-chat";

/**
 * GoHighLevel/LeadConnector-chatten.
 *
 * Tredjeparts-JS på 432 kB som blockerade huvudtråden i 174 ms och drog in
 * ytterligare filer i fyra sekunder. Den laddas därför vid första tecknet på
 * att besökaren är kvar: scroll, pekning, klick eller tangenttryck, med tio
 * sekunder som tak. En besökare som studsar direkt hämtar den aldrig, och den
 * hinner inte konkurrera med sidans egen rendering.
 *
 * Widgeten placerar sig själv nere till höger.
 */
export function ChatWidget() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    let cancelled = false;

    const inject = () => {
      if (cancelled || document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = chatWidget.loader;
      script.async = true;
      script.setAttribute("data-resources-url", chatWidget.resourcesUrl);
      script.setAttribute("data-widget-id", chatWidget.widgetId);
      document.body.appendChild(script);
    };

    const HANDELSER = [
      "scroll",
      "pointerdown",
      "keydown",
      "touchstart",
    ] as const;

    const start = () => {
      städa();
      // Ett rAF till, så att widgeten inte injiceras mitt i den bildruta där
      // besökaren precis rörde sig.
      requestAnimationFrame(inject);
    };

    const städa = () => {
      HANDELSER.forEach((h) => window.removeEventListener(h, start));
      window.clearTimeout(timer);
    };

    HANDELSER.forEach((h) =>
      window.addEventListener(h, start, { once: true, passive: true }),
    );
    const timer = window.setTimeout(start, 10000);

    return () => {
      cancelled = true;
      städa();
    };
  }, []);

  return null;
}
