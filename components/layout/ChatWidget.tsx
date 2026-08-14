"use client";

import { useEffect } from "react";
import { chatWidget } from "@/content/site";

const SCRIPT_ID = "np-ghl-chat";

/**
 * GoHighLevel/LeadConnector-chatten. Tredjeparts-JS som inte är kritiskt för
 * first paint, så den laddas vid idle med 2,5 s som tak. Widgeten placerar
 * sig själv nere till höger. Den egna kontakthubben som tidigare låg där är
 * borttagen, så hörnet är fritt.
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

    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const handle = idle(inject, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(handle);
      };
    }

    const timer = window.setTimeout(inject, 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
