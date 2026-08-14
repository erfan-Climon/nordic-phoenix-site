import {
  IBM_Plex_Mono,
  Noto_Naskh_Arabic,
  Open_Sans,
  Source_Sans_3,
} from "next/font/google";

/**
 * next/font självhostar Google-fonterna — inga requests till Google från
 * besökarens webbläsare (prestanda + GDPR, se handoff "Performance notes").
 */

/**
 * Rubriker. Medvetet inte samma snitt som brödtexten — Source Sans 3 är
 * humanistisk och tydligt släkt med Open Sans och kortets Segoe UI, men
 * smalare och stramare, så hierarkin mellan rubrik och brödtext håller.
 */
export const headingSans = Source_Sans_3({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading-sans",
});

/**
 * Brödtext och UI. Kundens visitkort är satt i vad som ser ut att vara
 * Segoe UI, som inte får licensieras för webben — Open Sans är den närmaste
 * fria motsvarigheten. Rubrikerna ligger kvar i Instrument Serif.
 */
export const bodySans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-sans",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

/** Laddas bara där persiska faktiskt renderas — se fontClassNames(). */
export const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: ["400", "500", "600"],
  subsets: ["arabic"],
  display: "swap",
  /* Preloadas inte. På svenska och engelska används snittet bara till
     ordmärket i headern, alltså två ord, men tre vikter preloadades på varje
     sida: 160 kB som blockerade den kritiska kedjan. Med display swap ritas
     ordmärket i reservsnittet tills filen är hämtad. På persiska används
     snittet i hela dokumentet och hämtas då direkt ändå. */
  preload: false,
  variable: "--font-noto-naskh-arabic",
});

/**
 * Persiskan behövs på alla locales: språksektionen visar en persisk rad
 * oavsett valt språk. Därför ingår det arabiska subsettet överallt.
 */
export const fontVariables = [
  headingSans.variable,
  bodySans.variable,
  ibmPlexMono.variable,
  notoNaskhArabic.variable,
].join(" ");
