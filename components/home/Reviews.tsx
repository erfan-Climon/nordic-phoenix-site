"use client";

import { useEffect } from "react";
import type { Dictionary } from "@/content/locales/sv";
import { reviewWidget } from "@/content/site";

const SCRIPT_ID = "np-reviews-widget";

/**
 * Recensionswidget från LeadConnector/reputationhub (samma leverantör som
 * chatten).
 *
 * Skriptet lyssnar på postMessage från iframen och sätter dess höjd — utan
 * skriptet fastnar iframen på webbläsarens standardhöjd, därav min-height som
 * fallback. Det laddas vid idle: tredjeparts-JS ska inte konkurrera med
 * hero-renderingen.
 *
 * Själva iframen lazy-laddas av webbläsaren (`loading="lazy"`) i stället för
 * med en egen IntersectionObserver — färre rörliga delar, och skriptet hittar
 * iframen i DOM:en direkt när det väl kör.
 */
export function Reviews({ t }: { t: Dictionary }) {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    let cancelled = false;

    const inject = () => {
      if (cancelled || document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = reviewWidget.script;
      script.async = true;
      document.body.appendChild(script);
    };

    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const handle = idle(inject, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(handle);
      };
    }

    const timer = window.setTimeout(inject, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="bg-page text-text" aria-labelledby="np-reviews-title">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
        <div data-reveal className="mb-[clamp(40px,5vw,64px)] text-center">
          <p className="np-label mb-7 text-accent-ink">{t.reviews.label}</p>
          <h2
            id="np-reviews-title"
            className="np-h2 text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            {t.reviews.h2a} <em className="text-accent">{t.reviews.h2b}</em>
          </h2>
        </div>

        <iframe
          /* np-reviews-frame reserverar den höjd widgeten faktiskt landar
             på vid varje bredd. Se globals.css: höjden sätts av leverantörens
             skript långt efter att sidan renderats, och utan reservation
             hoppade allt nedanför 208 px på mobil. */
          className="lc_reviews_widget np-reviews-frame block w-full min-w-full border-0"
          src={reviewWidget.src}
          title={t.reviews.iframeTitle}
          loading="lazy"
          scrolling="no"
        />
      </div>
    </section>
  );
}
