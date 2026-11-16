import localFont from "next/font/local";

/**
 * Fonterna ligger i repot och laddas från sajtens egen domän.
 *
 * Tidigare hämtades de med `next/font/google`, som laddar ner filerna från
 * fonts.gstatic.com under bygget. Besökaren märkte aldrig Google, filerna
 * självhostades ändå, men bygget gjorde det: hämtningen misslyckades två
 * gånger den 16 november 2026 och Turbopack föll med femton fel om en
 * modul den inte kunde slå upp. Sajten stod då kvar på föregående version
 * utan att något syntes utåt. Med filerna i repot finns beroendet inte kvar.
 *
 * Filerna är exakt de woff2 Google själv levererade, ett delmängdssnitt per
 * skriftsystem, så återgivningen är densamma som förut. Teckenintervallen
 * står kvar i `declarations`: utan dem skulle webbläsaren kunna sätta
 * latinsk text i det arabiska snittet när ett tecken saknas i det andra.
 * De står utskrivna på varje ställe i stället för i en konstant, för Next
 * kräver att varje värde till fontladdaren är en skriven literal.
 *
 * Nya versioner hämtas genom att be Google om css2-filen med en modern
 * webbläsares User-Agent och ladda ner woff2-adresserna den pekar ut.
 */

/**
 * Rubriker. Medvetet inte samma snitt som brödtexten — Source Sans 3 är
 * humanistisk och tydligt släkt med Open Sans och kortets Segoe UI, men
 * smalare och stramare, så hierarkin mellan rubrik och brödtext håller.
 *
 * Variabelt snitt: en fil bär hela viktspannet 200 till 900, och kursiven
 * ligger i en egen fil eftersom den har egna bokstavsformer.
 */
export const headingSans = localFont({
  src: [
    {
      path: "./font-files/source-sans-3-latin.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "./font-files/source-sans-3-latin-italic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  variable: "--font-heading-sans",
});

/**
 * Brödtext och UI. Kundens visitkort är satt i vad som ser ut att vara
 * Segoe UI, som inte får licensieras för webben — Open Sans är den närmaste
 * fria motsvarigheten.
 */
export const bodySans = localFont({
  src: "./font-files/open-sans-latin.woff2",
  weight: "300 800",
  style: "normal",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  variable: "--font-body-sans",
});

/** Etiketter och metarader. Statiskt snitt, därför en fil per vikt. */
export const ibmPlexMono = localFont({
  src: [
    {
      path: "./font-files/ibm-plex-mono-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font-files/ibm-plex-mono-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  variable: "--font-ibm-plex-mono",
});

/**
 * Persiskan. Variabelt snitt med hela spannet 400 till 700 i en fil.
 *
 * Preloadas inte. På svenska och engelska används snittet bara till
 * ordmärket i headern, alltså två ord, men filen är 91 kB och skulle
 * blockera den kritiska kedjan på varje sida. Med display swap ritas
 * ordmärket i reservsnittet tills filen är hämtad. På persiska används
 * snittet i hela dokumentet och hämtas då direkt ändå.
 *
 * Reservsnittet mäts inte om mot Arial, som är standard för lokala snitt.
 * Arials mått säger ingenting om arabisk skrift, och en omräkning mot dem
 * hade gett ett hopp i stället för att dämpa ett.
 */
export const notoNaskhArabic = localFont({
  src: "./font-files/noto-naskh-arabic.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC7, U+10EC9-10EEE, U+10EF0-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1",
    },
  ],
  variable: "--font-noto-naskh-arabic",
});

/**
 * Persiskan behövs på alla locales: språksektionen visar en persisk rad
 * oavsett valt språk. Därför ingår det arabiska snittet överallt.
 */
export const fontVariables = [
  headingSans.variable,
  bodySans.variable,
  ibmPlexMono.variable,
  notoNaskhArabic.variable,
].join(" ");
