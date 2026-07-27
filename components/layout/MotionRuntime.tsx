"use client";

import { useEffect } from "react";
import { clamp01, prefersReducedMotion } from "@/lib/motion";

/**
 * Sidans hela rörelselager i en enda monteringspunkt:
 *  - reveal-in när element skär viewporten (en gång per element)
 *  - processtegens permanenta orange färgning
 *  - en rAF-throttlad scroll-handler för tjänstekortens mini-headers och parallax
 *
 * Allt hoppas över vid prefers-reduced-motion. CSS:en i globals.css visar då
 * reveal-elementen direkt, så inget innehåll blir osynligt.
 */
export function MotionRuntime() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const cleanups: Array<() => void> = [];

    // --- Reveal ---------------------------------------------------------
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (revealEls.length) {
      const revealTimers: number[] = [];
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? 0);
            revealTimers.push(
              window.setTimeout(
                () => el.setAttribute("data-revealed", "true"),
                delay,
              ),
            );
            revealObserver.unobserve(el);
          });
        },
        { threshold: 0.1 },
      );
      revealEls.forEach((el) => revealObserver.observe(el));
      cleanups.push(() => {
        revealObserver.disconnect();
        revealTimers.forEach(window.clearTimeout);
      });
    }

    // --- Processteg -----------------------------------------------------
    const stepEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-step]"),
    );
    if (stepEls.length) {
      const stepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).setAttribute("data-active", "true");
            stepObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.6 },
      );
      stepEls.forEach((el) => stepObserver.observe(el));
      cleanups.push(() => stepObserver.disconnect());
    }

    // --- Scroll-driven: mini-headers och parallax ------------------------
    const serviceCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-svc-card]"),
    );
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    if (serviceCards.length || parallaxEls.length) {
      let ticking = false;

      const apply = () => {
        ticking = false;
        const vh = window.innerHeight;

        // Mini-headern tonar in när nästa kort närmar sig ovanifrån.
        serviceCards.forEach((card, i) => {
          const head = card.querySelector<HTMLElement>("[data-svc-head]");
          if (!head) return;
          const next = serviceCards[i + 1];
          let opacity = 0;
          if (next) {
            const distance =
              next.getBoundingClientRect().top -
              card.getBoundingClientRect().top;
            opacity = clamp01(1 - (distance - 70) / 260);
          }
          head.style.opacity = opacity.toFixed(2);
        });

        parallaxEls.forEach((el) => {
          const factor = Number.parseFloat(el.dataset.parallax ?? "0");
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - vh / 2;
          el.style.transform = `translateY(${(center * factor * -0.3).toFixed(1)}px)`;
        });
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(apply);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      apply();

      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
