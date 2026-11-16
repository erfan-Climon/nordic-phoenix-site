"use client";

import { useEffect, useState } from "react";

export type Avsnitt = { id: string; text: string };

/**
 * Innehållsförteckning som följer med i sidkanten och markerar det avsnitt
 * läsaren är i.
 *
 * Markeringen bygger på IntersectionObserver och inte på scroll-läge.
 * Rubrikernas avstånd varierar med hur långa avsnitten är, så ett mått i
 * pixlar hade behövt räknas om vid varje omritning. Observatören säger i
 * stället vilka rubriker som är i bild, och den översta av dem vinner.
 *
 * `rootMargin` skjuter ner den övre gränsen till en bit under sidhuvudet.
 * Utan det markeras nästa rubrik redan när den ligger bakom huvudet, alltså
 * innan läsaren ser den.
 */
export function Innehallsforteckning({
  avsnitt,
  rubrik,
}: {
  avsnitt: Avsnitt[];
  rubrik: string;
}) {
  const [aktiv, setAktiv] = useState<string | null>(avsnitt[0]?.id ?? null);

  useEffect(() => {
    if (avsnitt.length === 0) return;

    const noder = avsnitt
      .map((a) => document.getElementById(a.id))
      .filter((n): n is HTMLElement => n !== null);

    const observer = new IntersectionObserver(
      (poster) => {
        const synliga = poster
          .filter((p) => p.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (synliga[0]) setAktiv(synliga[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    noder.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [avsnitt]);

  if (avsnitt.length < 2) return null;

  return (
    <nav
      aria-label={rubrik}
      /* Klibbig från 1024. Under den bredden ligger den som ett vanligt
         block överst i artikeln i stället, se ArticlePage. */
      className="sticky top-[calc(var(--header-h)+32px)]"
    >
      <p className="np-label mb-5 text-text-meta">{rubrik}</p>
      <ul className="m-0 list-none p-0">
        {avsnitt.map((a) => {
          const arAktiv = a.id === aktiv;
          return (
            <li key={a.id} className="m-0">
              <a
                href={`#${a.id}`}
                aria-current={arAktiv ? "true" : undefined}
                /* Listen i startkanten följer skrivriktningen, så den
                   hamnar till höger i persiskan. */
                className={`block border-s-2 py-[7px] ps-4 font-sans text-[13.5px] leading-[1.45] transition-colors duration-200 ${
                  arAktiv
                    ? "border-accent font-medium text-ink"
                    : "border-[rgba(23,19,16,.12)] text-text-muted hover:text-accent-ink"
                }`}
              >
                {a.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
