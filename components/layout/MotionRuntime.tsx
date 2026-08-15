"use client";

import { usePathname } from "next/navigation";
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
 *
 * KÖR OM VID VARJE SIDBYTE. Komponenten sitter i layouten, och layouten
 * monteras inte om vid klientnavigering. Utan pathname i beroendelistan
 * frågade effekten bara efter [data-reveal] en enda gång, på den sida
 * besökaren råkade landa på först. Klickade man sig vidare observerades den
 * nya sidans element aldrig, de låg kvar på opacity 0, och sidan såg svart
 * ut tills man laddade om.
 */
export function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    // Kvittens till skyddsnätet i MotionBoot: rörelselagret lever, så det
    // behöver inte visa allt innehåll på egen hand.
    document.documentElement.dataset.motion = "ready";

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
      /* Det som redan ligger i vy visas direkt, mätt synkront, i stället för
         att vänta på observerns första callback.

         Två skäl. Kommer besökaren till ett ankare mitt på sidan har hen
         redan valt att vara där och ska inte se innehållet animeras fram.
         Och viktigare: synligheten hänger inte längre på att observern
         faktiskt kör. Den pausas i dolda flikar och i vissa inbäddade vyer,
         och då blev sidan svart. */
      const vh = window.innerHeight;
      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.setAttribute("data-revealed", "true");
        } else {
          revealObserver.observe(el);
        }
      });

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
  }, [pathname]);

  return null;
}
