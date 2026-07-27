import {
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
  Noto_Naskh_Arabic,
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

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
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
  instrumentSans.variable,
  ibmPlexMono.variable,
  notoNaskhArabic.variable,
].join(" ");
