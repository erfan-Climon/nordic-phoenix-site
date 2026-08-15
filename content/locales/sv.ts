/** Svenska, referensordlistan. Definierar formen som en och fa måste följa. */

export const sv = {
  meta: {
    title:
      "Nordic Phoenix Redovisningsbyrå | Redovisning, bokföring & rådgivning i Stockholm och hela Sverige",
    description:
      "Nordic Phoenix Redovisningsbyrå AB är en digital redovisningsbyrå i Stockholm och Sollentuna. Bokföring, lön, moms, bokslut, deklaration och myndighetskontakter. På svenska, engelska och persiska, i hela Sverige.",
  },

  nav: {
    /** Står före ordmärket i headern. */
    brandPrefix: "Redovisningsbyrå",
    services: "Tjänster",
    pricing: "Priser",
    about: "Om",
    blog: "Blogg",
    cta: "Kontakta oss",
  },

  a11y: {
    toTop: "Till toppen",
    call: "Ring",
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    switchLanguage: "Byt språk till engelska",
    yes: "Ingår",
  },

  hero: {
    /* Förrad inuti H1. Varumärkesraden nedanför säger ingenting om vad byrån
       gör, och H1 är sidans starkaste rubriksignal. Google läser hela H1:ans
       textinnehåll oavsett grad, så den lilla raden ger full effekt utan att
       ta plats från Kontroll/Klarhet/Trygghet.

       Bara Stockholm, inte "och hela Sverige": den längre lydelsen wrappade
       till två rader på mobil och blev en tung banner i stället för en
       förrad. Räckvidden i hela landet står redan i hero-ingressen och i
       Sverige-sektionen, så ingenting tappas. */
    eyebrow: "Redovisningsbyrå i Stockholm",
    w1: "Kontroll.",
    w2: "Klarhet.",
    w3: "Trygghet.",
    sub: "Nordic Phoenix hjälper företagare i hela Sverige med bokföring, lön, bokslut, deklaration och myndighetskontakter. Helt digitalt, personligt och tydligt.",
    cta1: "Kontakta oss på WhatsApp",
    cta2: "Se våra tjänster",
    badge: "Nordic Phoenix · Sthlm",
    /* Raden under knapparna. Frasen står med persisk skrift och i sin
       fullständiga form, eftersom det är så målgruppen söker på den.
       Svenska och engelska stod här tidigare men är borttagna: sajten är
       redan på de språken, och uppräkningen tog uppmärksamhet från det
       enda som faktiskt säger något nytt. */
    langs: "حسابداری به زبان فارسی",
  },

  clients: {
    title: "Nordic Phoenix har hjälpt över 100 företag i alla storlekar",
  },

  services: {
    label: "Tjänster",
    /** Länken på varje tjänstekort in till tjänstesidan. */
    readMore: "Läs mer",
    h2a: "Allt ditt företag behöver.",
    h2b: "Samlat.",
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
          "Inkomstdeklaration för AB och enskild firma",
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

  servicePage: {
    breadcrumbLabel: "Brödsmulor",
    home: "Start",
    services: "Tjänster",
    background: "Bakgrund",
    forWhom: "Passar dig som",
    included: "Det här ingår, punkt för punkt",
    youGet: "Vad du får",
    includedMark: "Ingår",
    priceLead: "Fast månadspris från 1 495 kr.",
    priceLink: "Se alla paket och vad som ingår",
    faqLabel: "Vanliga frågor",
    faqHeading: "Frågor om",
    related: "Hänger ihop med",
    citiesHeading: "Vi arbetar digitalt i hela Sverige",
    citiesText:
      "Avståndet påverkar varken pris eller svarstid. Läs om hur vi arbetar med företagare på din ort.",
    allCities: "Alla orter",
    ctaHeading: "Vill du veta vad det skulle kosta?",
    ctaText:
      "Kostnadsfri och förutsättningslös genomgång. Vi tittar på ditt bolag och ger dig en fast summa, innan du bestämmer dig.",
    ctaWhatsApp: "Skriv på WhatsApp",
    call: "Ring",
    indexTitle: "Våra tjänster | Bokföring, lön, bokslut och rådgivning",
    indexDescription:
      "Bokföring, lön och moms, bokslut och årsredovisning, företagsstart, myndighetskontakt och digitalisering. Allt till fast månadspris, digitalt i hela Sverige.",
    indexH1a: "Allt ditt företag behöver.",
    indexH1b: "Samlat.",
    indexIntro:
      "Sex områden som täcker en företagares hela ekonomiska år, från registreringen till bokslutet. Välj ett område så berättar vi exakt vad som ingår och hur vi arbetar med det.",
    indexCtaHeading: "Vet du inte vad du behöver?",
    indexCtaText:
      "De flesta behöver inte allt. Hör av dig så går vi igenom ditt bolag och säger vad som faktiskt behövs, och vad det skulle kosta.",
  },
  locationPage: {
    indexH1a: "Redovisningsbyrå i",
    indexH1b: "hela Sverige.",
    indexIntro:
      "Vi arbetar digitalt, vilket betyder att avståndet inte påverkar vare sig pris eller svarstid. Välj din ort så berättar vi hur vi arbetar med företagare just där.",
    indexTitle: "Redovisningsbyrå i hela Sverige | Nordic Phoenix",
    indexDescription:
      "Vi sköter bokföring, lön, bokslut och deklaration digitalt i hela Sverige. Välj din ort för att läsa mer om hur vi arbetar med företagare där.",
    breadcrumbLabel: "Brödsmulor",
    home: "Start",
    locations: "Orter",
    call: "Ring",
    business: "Näringslivet",
    whyHeading: "Därför passar vi företagare i",
    servicesHeading: "Vad vi gör för bolag i",
    includedMark: "Ingår",
    priceLead: "Fast månadspris från 1 495 kr.",
    priceLink: "Se alla paket och vad som ingår",
    faqLabel: "Vanliga frågor",
    faqHeading: "Frågor från företagare i",
    areasHeading: "Områden i",
    areasHeadingTail: "med omnejd",
    areasText:
      "Vi arbetar med företagare i hela regionen. Läs mer om hur vi arbetar där du håller till.",
    nearbyHeading: "Vi finns även på andra orter",
    allLocations: "Alla orter",
    ctaHeading: "Redo att lämna över bokföringen?",
    ctaText:
      "Kostnadsfri och förutsättningslös genomgång. Vi tittar på ditt bolag och säger vad det skulle kosta, innan du bestämmer dig.",
    ctaWhatsApp: "Skriv på WhatsApp",
  },
  reviews: {
    label: "Omdömen",
    h2a: "Vad våra kunder",
    h2b: "säger.",
    iframeTitle: "Kundomdömen om Nordic Phoenix",
  },


  about: {
    label: "Om Nordic Phoenix",
    h2a: "Mer än en redovisningsbyrå.",
    h2b: "En partner för företagets resa.",
    p1: "Nordic Phoenix grundades med ambitionen att göra redovisning, bokföring och ekonomisk rådgivning mer tydlig, trygg och tillgänglig för företagare i Sverige.",
    p2: "Vi arbetar nära våra kunder och hjälper dem att förstå sin ekonomi, fatta bättre beslut och känna sig säkra i kontakten med myndigheter.",
    videoTitle: "Om Nordic Phoenix",
  },

  pricing: {
    label: "Priser",
    h2a: "Tydliga paket.",
    h2b: "Inga överraskningar.",
    sub: "Fast månadspris utifrån företagets storlek och behov. Alla paket kan anpassas och priserna nedan är riktpriser.",
    popular: "Populärast",
    per: "kr/mån",
    cta: "Kom igång",
    includes: "Ingår:",
    note: "Alla priser exkl. moms. Vi skräddarsyr alltid paketet efter ditt företags behov. Kontakta oss för en exakt offert.",
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
    label: "Svenska · English · فارسی",
    h2a: "Ekonomi på ett språk som känns",
    h2b: "tydligt och tryggt.",
    text: "Vi hjälper företagare att förstå regler, ekonomi och myndighetskrav på svenska, engelska och persiska, حسابداری به زبان فارسی. Språket ska aldrig stå mellan dig och kontrollen över din ekonomi.",
  },

  process: {
    label: "Så kommer du igång",
    h2a: "Tre steg till",
    h2b: "ordning och reda.",
    sub: "Ingen startsträcka, inga pärmar. Vi tar dig från första samtal till en lösning som känns rätt.",
    cta: "Ta första steget",
    steps: [
      {
        title: "Hör av dig",
        text: "Skriv på WhatsApp eller ring. Kostnadsfritt och förutsättningslöst. Vi lär känna dig och ditt företag.",
      },
      {
        title: "Vi går igenom företagets behov",
        text: "Tillsammans kartlägger vi ekonomi, rutiner och vad som ska lyftas av dina axlar.",
      },
      {
        title: "Vi hittar en lösning du känner dig trygg med",
        text: "Ett upplägg anpassat efter just ditt företag, med tydliga rutiner, fast pris och full överblick från dag ett.",
      },
    ],
  },

  sweden: {
    label: "Digital redovisning i hela Sverige",
    h2a: "Var du än driver ditt företag.",
    h2b: "Vi finns nära.",
    tail: "· och hela Sverige, digitalt ·",
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
    label: "Varför Nordic Phoenix",
    h2a: "Din ekonomi.",
    h2b: "Tydligare. Tryggare. Smartare.",
    reasons: [
      {
        title: "Helt digitalt arbetssätt",
        text: "Molnbaserad redovisning utan pärmar, med full överblick var du än är.",
      },
      {
        title: "Hela Sverige",
        text: "Kunder från Kiruna till Malmö. Avstånd spelar ingen roll.",
      },
      {
        title: "Personligt stöd",
        text: "Du pratar alltid med någon som kan ditt företag, inte en växel.",
      },
      {
        title: "Tydlig kommunikation",
        text: "Vi översätter siffror och regler till besked du kan agera på.",
      },
      {
        title: "Tre språk",
        text: "Rådgivning på svenska, engelska eller persiska. Det som ger dig störst trygghet.",
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
        text: "Noggrannhet, ansvar och transparens. Relationer som håller.",
      },
    ],
  },

  banner: {
    h2a: "Prata med oss",
    h2b: "vi hjälper dig.",
    text: "Skriv till oss på WhatsApp eller ring direkt. Kostnadsfri rådgivning på en tid som passar dig. Välkommen.",
    cta1: "Skriv på WhatsApp",
    cta2: "Ring oss direkt",
    portraitAlt: "Ali Nahroudi, Nordic Phoenix",
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
    metaTitle: "Blogg | Nordic Phoenix Redovisningsbyrå",
    metaDescription:
      "Guider och insikter om bokföring, moms, Skatteverket, bolagsstart och företagsekonomi. Från Nordic Phoenix Redovisningsbyrå.",
    eyebrow: "Blogg · Guider & insikter",
    h1a: "Vi gör ekonomi",
    h1b: "begripligt.",
    intro:
      "Guider om bokföring, moms, Skatteverket och bolagsstart, skrivna för företagare och inte för revisorer.",
    featured: "Utvald",
    readArticle: "Läs artikeln →",
    backToAll: "← Alla artiklar",
    readingTime: "min läsning",
    checklistTitle: "Handlingschecklista",
    faqTitle: "Vanliga frågor",
    ctaTitle: "Vill du ha hjälp med det här?",
    ctaButton: "Kontakta oss",
  },

  privacy: {
    metaTitle: "Integritetspolicy | Nordic Phoenix Redovisningsbyrå",
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
        text: "Vi samlar in de uppgifter du själv lämnar när du kontaktar oss via chatt, WhatsApp, telefon eller mejl. Det kan vara namn, telefonnummer, e-postadress och det ärende du beskriver.",
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
 * Formen härleds ur den svenska ordlistan. `as const` används medvetet inte:
 * en och fa ska matcha nycklarna, inte de svenska strängarna.
 */
export type Dictionary = typeof sv;
