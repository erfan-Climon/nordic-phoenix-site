/** Företagsuppgifter, kontaktvägar och externa integrationer. */

export const SITE_URL = "https://nordicphoenix.se";

export const company = {
  legalName: "Nordic Phoenix Redovisningsbyrå AB",
  shortName: "Nordic Phoenix",
  orgNumber: "559577-4232",
  street: "Bollstanäsvägen 3",
  postalCode: "192 78",
  city: "Sollentuna",
  region: "Stockholms län",
  country: "SE",
  /** Sollentuna centrum, används i LocalBusiness-schemat. */
  geo: { lat: 59.4281, lng: 17.9508 },
  foundedDisplay: "2015–2026",
} as const;

export const phone = {
  display: "072-008 40 00",
  href: "tel:0720084000",
  international: "+46720084000",
} as const;

/**
 * Skriftlig väg in för den som varken vill ringa eller chatta.
 *
 * Sajten är en statisk export utan server, så något kontaktformulär finns
 * inte och kan inte finnas utan en mottagare någon annanstans. Adressen är
 * alternativet till WhatsApp och telefon, och står i sidfoten på alla sidor.
 */
export const email = {
  display: "info@nordicphoenix.se",
  href: "mailto:info@nordicphoenix.se",
} as const;

const WHATSAPP_MESSAGE =
  "Hej! Jag kommer från er hemsida och önskar gärna ta kontakt med er.";

export const whatsappUrl = `https://wa.me/46720084000?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const social = {
  instagram: "https://www.instagram.com/nordic.phoenix.redovisning",
  facebook: "https://www.facebook.com/profile.php?id=61563109874406",
  tiktok: "https://www.tiktok.com/@nordicphoenix.redo",
} as const;

export const agencyCredit = {
  label: "Climon.se",
  href: "https://climon.se",
} as const;

/** Recensionswidget från LeadConnector/reputationhub. Se Reviews.tsx. */
export const reviewWidget = {
  script: "https://reputationhub.site/reputation/assets/review-widget.js",
  src: "https://reputationhub.site/reputation/widgets/review_widget/66iE5ekAVPU5F03G3zJk?widgetId=6a6a6331f6fe9cd3afbb2445",
} as const;

/** GoHighLevel / LeadConnector-chatt. Laddas lazy, se ChatWidget.tsx. */
export const chatWidget = {
  loader: "https://widgets.leadconnectorhq.com/loader.js",
  resourcesUrl: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
  widgetId: "6a4f7dcc88718db6dd6ed6a5",
} as const;

export const video = {
  /** Hero-bakgrunden. WebM först i markup, MP4 som fallback för Safari. */
  hero: "/video/hero.mp4",
  heroWebm: "/video/hero.webm",
  /**
   * Mobilversionen är förbeskuren till det utsnitt mobilen ändå visar, alltså
   * 26 procent av bildbredden vid 48 procent. Det gör filen 278 kB i stället
   * för 4,3 MB. Bara MP4: H.264 spelas överallt, och en VP9 av samma klipp
   * blev fem gånger så stor.
   */
  heroMobile: "/video/hero-mobil.mp4",
  heroPoster: "/video/hero-poster.jpg",
  /**
   * Om-videon. Låg tidigare på leverantörens CloudFront och vägde 36 MB,
   * vilket var sidans enskilt tyngsta resurs. Källan var HEVC i .mov, som
   * varken Chrome eller Firefox spelar, och hade ett ljudspår som strippats.
   */
  about: "/video/om.mp4",
  aboutWebm: "/video/om.webm",
  aboutPoster: "/video/om-poster.jpg",
} as const;

/** Visas i språksektionen oavsett valt språk, därför inte i ordlistorna. */
export const persianAlwaysLine = "ما در کنار شما هستیم، به زبان فارسی و سوئدی.";

/** Städer i logobältet/marquee delas i två rader som roterar åt olika håll. */
export const cityRowSplit = 7;

/**
 * Om Googles Preferred Sources-knapp ska visas.
 *
 * Avstängd sedan 2026-08-27. Knappen renderade korrekt, men klick gav
 * "Nordic Phoenix är inte kvalificerad som önskad källa just nu" och därefter
 * tog Googles iframe bort sig själv. Samma svar kom på en helt annan sajt med
 * en egen implementation, så spärren ligger hos Google och inte i vår kod.
 *
 * Funktionen kräver att Google känner igen avsändaren som en källa som
 * publicerar löpande. Sajten lanserades 2026-08-24 och hade två sidor
 * indexerade när det här testades, så det villkoret är inte uppfyllt än.
 *
 * En knapp som misslyckas för varje besökare är sämre än ingen knapp, därför
 * är den avstängd tills villkoret är uppfyllt. Allt är kvar i koden: sätt
 * flaggan till true, så kommer både skriptet och rutan tillbaka. Prova igen
 * när Search Console visar att guiderna är indexerade.
 */
export const preferredSourceAktiv = false;

/**
 * Mätning och spårning.
 *
 * Båda är tomma tills Erfan lämnar id:na. Ingenting laddas när ett id är tomt,
 * så sajten fungerar oförändrat under tiden och det går att sätta på en i
 * taget.
 *
 * Ingen av dem laddas heller utan besökarens samtycke. Se lib/samtycke.ts.
 * Det är inte en försiktighetsåtgärd utan ett krav: både Google Analytics och
 * Meta Pixel lagrar uppgifter i besökarens webbläsare för andra ändamål än
 * att sajten ska fungera, och sådant kräver aktivt samtycke i förväg.
 */
export const matning = {
  /** Mät-id från Google Analytics 4, formen G-XXXXXXXXXX. */
  ga4: "G-P7Q5FTV2NR",
  /** Pixel-id från Meta Events Manager, en lång sifferserie. */
  metaPixel: "1755833888899039",
  /**
   * Pixel-id från TikTok Events Manager. Tomt tills annonskontot finns.
   * Laddas, precis som de andra, först efter samtycke.
   */
  tiktokPixel: "",
} as const;

/**
 * Landningssidan för den ekonomiska hälsokontrollen.
 *
 * Egen konfiguration eftersom sidan är en annonsdestination med eget pris och
 * egen konverteringspunkt, inte en del av tjänsteutbudet på sajten.
 */
export const halsokontroll = {
  /** Persiska siffror i marknadsföringstext, latinska i tekniska fält. */
  prisPersiska: "۱۲۰۰",
  prisSiffra: 1200,
  valuta: "SEK",
  minuterPersiska: "۶۰",
  minuter: 60,
  /** Förifyllt meddelande när besökaren väljer WhatsApp i stället för formuläret. */
  whatsappUrl: `https://wa.me/46720084000?text=${encodeURIComponent(
    "سلام، درباره بررسی مالی ۱۲۰۰ کرونی ققنوس شمالی اطلاعات بیشتری می‌خواهم.",
  )}`,
} as const;

/**
 * GoHighLevel, kallat Climon System kundvänt.
 *
 * `leadWebhook` pekar på Inbound Webhook-triggern i arbetsflödet
 * "Ekonomisk hälsokontroll - landningssida" på Nordic Phoenix underkonto,
 * location 66iE5ekAVPU5F03G3zJk. Samma location som recensionswidgeten ovan.
 *
 * Adressen är INTE hemlig och kan inte vara det: formuläret postar från
 * besökarens webbläsare, så den ligger i klientkoden oavsett vad vi gör. Den
 * ger heller ingen läsåtkomst, bara rätten att utlösa flödet. Skyddet mot
 * skräp ligger därför i formuläret, se honungsfällan i LeadFormular.
 *
 * Sajten byggs som statisk export, så det finns ingen egen server att posta
 * till. Formuläret skickar därför direkt från webbläsaren till GHL. Ett
 * inbäddat GHL-formulär i iframe var alternativet, men då går det varken att
 * styra utseendet, att skicka med UTM-parametrar, eller att avfyra
 * konverteringshändelsen först vid lyckad inskickning.
 *
 * Utan adress renderas formuläret men inskickning misslyckas med ett
 * meddelande som hänvisar till WhatsApp. Sidan ska inte användas för annonser
 * förrän värdet är satt.
 */
export const ghl = {
  leadWebhook:
    "https://services.leadconnectorhq.com/hooks/66iE5ekAVPU5F03G3zJk/webhook-trigger/b1dac5fe-c47d-4f16-a6ab-b26de450665b",
} as const;
