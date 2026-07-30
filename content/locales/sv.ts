/** Svenska — referensordlistan. Definierar formen som en och fa måste följa. */

export const sv = {
  meta: {
    title:
      "Nordic Phoenix Redovisningsbyrå — Redovisning, bokföring & rådgivning i Stockholm och hela Sverige",
    description:
      "Nordic Phoenix Redovisningsbyrå AB — digital redovisningsbyrå i Stockholm/Sollentuna. Bokföring, lön, moms, bokslut, deklaration och myndighetskontakter. På svenska, engelska och persiska, i hela Sverige.",
  },

  nav: {
    services: "Tjänster",
    pricing: "Priser",
    about: "Om",
    blog: "Blogg",
    cta: "Kontakta oss",
  },

  a11y: {
    toTop: "Till toppen",
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    openContact: "Öppna kontaktmeny",
    closeContact: "Stäng kontaktmeny",
    switchLanguage: "Byt språk till engelska",
    yes: "Ingår",
    no: "Ingår inte",
  },

  hero: {
    meta1: "Redovisningsbyrå",
    meta2: "Sthlm · 59.4°N",
    w1: "Kontroll.",
    w2: "Klarhet.",
    w3: "Trygghet.",
    sub: "Nordic Phoenix hjälper företagare i hela Sverige med bokföring, lön, bokslut, deklaration och myndighetskontakter — helt digitalt, personligt och tydligt.",
    cta1: "Kontakta oss på WhatsApp",
    cta2: "Se våra tjänster",
    badge: "Nordic Phoenix — Sthlm",
  },

  clients: {
    title: "Nordic Phoenix har hjälpt över 100 företag — i alla storlekar",
  },

  services: {
    label: "( 01 ) — Tjänster",
    h2a: "Allt ditt företag behöver.",
    h2b: "Samlat.",
    scrollHint: "06 områden — scrolla",
    groups: [
      {
        title: "Bokföring & redovisning",
        items: [
          "Löpande bokföring",
          "Redovisning",
          "Bankavstämning",
          "Skattekontoavstämning",
          "Fakturahantering",
          "Kund- & leverantörsreskontra",
        ],
      },
      {
        title: "Lön, moms & deklaration",
        items: [
          "Löneadministration",
          "Momsredovisning",
          "Arbetsgivardeklaration",
          "Inkomstdeklaration — AB & enskild firma",
        ],
      },
      {
        title: "Bokslut & årsredovisning",
        items: ["Bokslut", "Årsredovisning", "Kompletteringar", "Omprövningar"],
      },
      {
        title: "Företagsstart & registreringar",
        items: [
          "Företagsstart",
          "Bolagsregistrering",
          "Skatteverket & Bolagsverket",
          "Val av bolagsform",
          "Tillstånd & registreringar",
        ],
      },
      {
        title: "Myndighetskontakt & rådgivning",
        items: [
          "Myndigheter & kommuner",
          "Stöd i myndighetsärenden",
          "Skattefrågor",
          "Ekonomisk rådgivning",
          "Affärsjuridisk vägledning",
        ],
      },
      {
        title: "Digitalisering & struktur",
        items: [
          "Digitalisering av bokföringsrutiner",
          "Digitala arbetsflöden",
          "Löpande rapportering",
          "Rutiner som håller över tid",
        ],
      },
    ],
  },

  /* Utan sifferetikett: sektionerna är numrerade ( 01 ) till ( 08 ) och en
     inskjuten siffra här skulle förskjuta hela den godkända numreringen. */
  reviews: {
    label: "Omdömen",
    h2a: "Vad våra kunder",
    h2b: "säger.",
    iframeTitle: "Kundomdömen om Nordic Phoenix",
  },

  compare: {
    label: "( 02 ) — Förvandlingen",
    labelRight: "Från kaos till kontroll",
    leftLabel: "Utan Nordic Phoenix",
    leftTitle: "Företagande med stress",
    rightLabel: "Med Nordic Phoenix",
    rightTitle: "Företagande utan stress",
    rows: [
      {
        without: "Du jagar din redovisningskonsult för svar",
        with: "Direktkontakt med någon som kan ditt företag",
      },
      {
        without: "Papper, pärmar och mejl utspridda överallt",
        with: "Allt digitalt, samlat och sökbart",
      },
      {
        without: "Besked i sista minuten — eller för sent",
        with: "Deadlines och myndigheter hanterade i god tid",
      },
      {
        without: "Fakturor för timmar du inte förstår",
        with: "Fast pris — du vet alltid vad det kostar",
      },
      {
        without: "Krångligt fackspråk utan förklaring",
        with: "Tydliga besked på ditt språk",
      },
    ],
    closing:
      "Så att du kan fokusera helt på din verksamhet — medan vi håller siffrorna, deadlines och myndigheterna i ordning.",
  },

  about: {
    label: "( 03 ) — Om Nordic Phoenix",
    h2a: "Mer än en redovisningsbyrå —",
    h2b: "en partner för företagets resa.",
    p1: "Nordic Phoenix grundades med ambitionen att göra redovisning, bokföring och ekonomisk rådgivning mer tydlig, trygg och tillgänglig för företagare i Sverige.",
    p2: "Vi arbetar nära våra kunder — hjälper dem att förstå sin ekonomi, fatta bättre beslut och känna sig säkra i kontakten med myndigheter.",
    values: ["Noggrannhet", "Ansvar", "Transparens", "Långsiktighet"],
    videoTitle: "Nordic Phoenix — om oss",
  },

  pricing: {
    label: "( 04 ) — Priser",
    h2a: "Tydliga paket.",
    h2b: "Inga överraskningar.",
    sub: "Fast månadspris utifrån företagets storlek och behov. Alla paket kan anpassas — priserna nedan är riktpriser.",
    popular: "Populärast",
    per: "kr/mån",
    cta: "Kom igång",
    includes: "Ingår:",
    note: "Alla priser exkl. moms. Vi skräddarsyr alltid paketet efter ditt företags behov — kontakta oss för en exakt offert.",
    packages: [
      {
        name: "Bas",
        price: "1 495",
        desc: "För enskild firma och mindre bolag med få transaktioner.",
        featured: false,
        items: [
          "Löpande bokföring (upp till 25 verifikat/mån)",
          "Momsredovisning",
          "Digital dokumenthantering",
          "Skattekontoavstämning",
          "Support via WhatsApp och mejl",
        ],
      },
      {
        name: "Standard",
        price: "2 995",
        desc: "För växande aktiebolag som vill ha allt skött.",
        featured: true,
        items: [
          "Löpande bokföring (upp till 75 verifikat/mån)",
          "Lön för upp till 3 anställda",
          "Moms- och arbetsgivardeklaration",
          "Bokslut och årsredovisning",
          "Inkomstdeklaration",
          "Prioriterad personlig support",
        ],
      },
      {
        name: "Premium",
        price: "4 995",
        desc: "För bolag med anställda, volym och höga krav.",
        featured: false,
        items: [
          "Obegränsad löpande bokföring",
          "Lön för upp till 10 anställda",
          "Bokslut, årsredovisning och deklarationer",
          "Löpande rapportering och rådgivning",
          "Myndighetskontakter ingår",
          "Dedikerad konsult med direktnummer",
        ],
      },
    ],
  },

  languages: {
    label: "( 05 ) — Svenska · English · فارسی",
    h2a: "Ekonomi på ett språk som känns",
    h2b: "tydligt och tryggt.",
    text: "Vi hjälper företagare att förstå regler, ekonomi och myndighetskrav — på svenska, engelska och persiska. Språket ska aldrig stå mellan dig och kontrollen över din ekonomi.",
  },

  process: {
    label: "( 06 ) — Så kommer du igång",
    h2a: "Tre steg till",
    h2b: "ordning och reda.",
    sub: "Ingen startsträcka, inga pärmar. Vi tar dig från första samtal till en lösning som känns rätt.",
    cta: "Ta första steget",
    steps: [
      {
        title: "Hör av dig",
        text: "Skriv på WhatsApp eller ring. Kostnadsfritt och förutsättningslöst — vi lär känna dig och ditt företag.",
      },
      {
        title: "Vi går igenom företagets behov",
        text: "Tillsammans kartlägger vi ekonomi, rutiner och vad som ska lyftas av dina axlar.",
      },
      {
        title: "Vi hittar en lösning du känner dig trygg med",
        text: "Ett upplägg anpassat efter just ditt företag — tydliga rutiner, fast pris och full överblick från dag ett.",
      },
    ],
  },

  sweden: {
    label: "( 07 ) — Digital redovisning i hela Sverige",
    h2a: "Var du än driver ditt företag —",
    h2b: "vi finns nära.",
    tail: "— och hela Sverige, digitalt —",
    cities: [
      "Stockholm",
      "Göteborg",
      "Malmö",
      "Uppsala",
      "Västerås",
      "Örebro",
      "Linköping",
      "Helsingborg",
      "Jönköping",
      "Norrköping",
      "Lund",
      "Umeå",
      "Gävle",
    ],
  },

  why: {
    label: "( 08 ) — Varför Nordic Phoenix",
    h2a: "Din ekonomi.",
    h2b: "Tydligare. Tryggare. Smartare.",
    reasons: [
      {
        title: "Helt digitalt arbetssätt",
        text: "Molnbaserad redovisning — inga pärmar, full överblick var du än är.",
      },
      {
        title: "Hela Sverige",
        text: "Kunder från Kiruna till Malmö. Avstånd spelar ingen roll.",
      },
      {
        title: "Personligt stöd",
        text: "Du pratar alltid med någon som kan ditt företag — inte en växel.",
      },
      {
        title: "Tydlig kommunikation",
        text: "Vi översätter siffror och regler till besked du kan agera på.",
      },
      {
        title: "Tre språk",
        text: "Rådgivning på svenska, engelska eller persiska — det som ger dig störst trygghet.",
      },
      {
        title: "Mer än bokföring",
        text: "Myndighetskontakter, tillstånd, registreringar och rådgivning.",
      },
      {
        title: "För nya företagare",
        text: "Vi förstår småföretagare, nyföretagare och internationell bakgrund.",
      },
      {
        title: "Långsiktigt partnerskap",
        text: "Noggrannhet, ansvar och transparens — relationer som håller.",
      },
    ],
  },

  banner: {
    h2a: "Prata med oss",
    h2b: "vi hjälper dig.",
    text: "Skriv till oss på WhatsApp eller ring direkt. Kostnadsfri rådgivning på en tid som passar dig. Välkommen.",
    cta1: "Skriv på WhatsApp",
    cta2: "Ring oss direkt",
    portraitAlt: "Ali Nahroudi — Nordic Phoenix",
  },

  widget: {
    blog: "Bloggen",
    months: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAJ",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OKT",
      "NOV",
      "DEC",
    ],
  },

  footer: {
    tagline: "Redovisning för företagare som vill växa med trygghet.",
    company: "Företaget",
    follow: "Följ oss",
    ready: "Redo att börja?",
    privacy: "Integritetspolicy",
    seo: "Redovisningsbyrå Stockholm · Sollentuna · Hela Sverige digitalt",
    credit: "Designad och utvecklad av",
  },

  blog: {
    metaTitle: "Blogg — Nordic Phoenix Redovisningsbyrå",
    metaDescription:
      "Guider och insikter om bokföring, moms, Skatteverket, bolagsstart och företagsekonomi — från Nordic Phoenix Redovisningsbyrå.",
    eyebrow: "Blogg — Guider & insikter",
    h1a: "Vi gör ekonomi",
    h1b: "begripligt.",
    intro:
      "Guider om bokföring, moms, Skatteverket och bolagsstart — skrivna för företagare, inte för revisorer.",
    featured: "Utvald",
    readArticle: "Läs artikeln →",
    comingSoon: "Kommer snart",
    backToAll: "← Alla artiklar",
    readingTime: "min läsning",
    ctaTitle: "Vill du ha hjälp att välja bolagsform?",
    ctaText: "Kostnadsfri konsultation — vi räknar på just din situation.",
    ctaButton: "Kontakta oss",
  },

  privacy: {
    metaTitle: "Integritetspolicy — Nordic Phoenix Redovisningsbyrå",
    metaDescription:
      "Så behandlar Nordic Phoenix Redovisningsbyrå AB personuppgifter.",
    title: "Integritetspolicy",
    updated: "Senast uppdaterad",
    body: [
      {
        heading: "Personuppgiftsansvarig",
        text: "Nordic Phoenix Redovisningsbyrå AB, org.nr 559577-4232, Bollstanäsvägen 3, 192 78 Sollentuna, ansvarar för behandlingen av de personuppgifter som samlas in via den här webbplatsen.",
      },
      {
        heading: "Vilka uppgifter vi samlar in",
        text: "Vi samlar in de uppgifter du själv lämnar när du kontaktar oss via chatt, WhatsApp, telefon eller mejl — till exempel namn, telefonnummer, e-postadress och det ärende du beskriver.",
      },
      {
        heading: "Varför vi behandlar uppgifterna",
        text: "Uppgifterna används för att besvara din förfrågan, lämna offert och vid ett eventuellt uppdrag fullgöra avtalet med dig. Den rättsliga grunden är berättigat intresse respektive fullgörande av avtal.",
      },
      {
        heading: "Hur länge vi sparar dem",
        text: "Kontaktförfrågningar som inte leder till uppdrag raderas senast tolv månader efter senaste kontakt. Uppdragsrelaterade uppgifter sparas så länge bokföringslagen kräver.",
      },
      {
        heading: "Mottagare",
        text: "Vi delar inte dina uppgifter med tredje part för marknadsföring. Vi använder leverantörer för chattfunktion och drift av webbplatsen, vilka behandlar uppgifter för vår räkning enligt personuppgiftsbiträdesavtal.",
      },
      {
        heading: "Dina rättigheter",
        text: "Du har rätt att begära utdrag, rättelse eller radering av dina uppgifter, samt att invända mot behandlingen. Kontakta oss på 072-008 40 00. Du kan också vända dig till Integritetsskyddsmyndigheten med klagomål.",
      },
    ],
  },
};

/**
 * Formen härleds ur den svenska ordlistan. `as const` används medvetet inte —
 * en och fa ska matcha nycklarna, inte de svenska strängarna.
 */
export type Dictionary = typeof sv;
