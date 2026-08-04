import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Noto_Naskh_Arabic,
  Open_Sans,
} from "next/font/google";

/**
 * next/font självhostar Google-fonterna — inga requests till Google från
 * besökarens webbläsare (prestanda + GDPR, se handoff "Performance notes").
 */

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
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
  variable: "--font-noto-naskh-arabic",
});

/**
 * Persiskan behövs på alla locales: språksektionen visar en persisk rad
 * oavsett valt språk. Därför ingår det arabiska subsettet överallt.
 */
export const fontVariables = [
  instrumentSerif.variable,
  bodySans.variable,
  ibmPlexMono.variable,
  notoNaskhArabic.variable,
].join(" ");
