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
  /** Sollentuna centrum — används i LocalBusiness-schemat. */
  geo: { lat: 59.4281, lng: 17.9508 },
  foundedDisplay: "2015–2026",
} as const;

export const phone = {
  display: "072-008 40 00",
  href: "tel:0720084000",
  international: "+46720084000",
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

/** GoHighLevel / LeadConnector-chatt. Laddas lazy, se ChatWidget.tsx. */
export const chatWidget = {
  loader: "https://widgets.leadconnectorhq.com/loader.js",
  resourcesUrl: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
  widgetId: "6a4fb666cf52f8a07d860566",
} as const;

export const video = {
  hero: "/video/hero.mp4",
  /**
   * Om-videon ligger kvar på leverantörens CloudFront. Flytta till egen
   * asset-pipeline vid tillfälle (se handoff "Assets").
   */
  about:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3FwYeaDxGy6OM3B1w0DJg3BPHHw/hf_20260710_073532_790cedf0-1ecf-4a06-8424-0f816e49c950.mp4",
} as const;

/** Visas i språksektionen oavsett valt språk — därför inte i ordlistorna. */
export const persianAlwaysLine = "ما در کنار شما هستیم — به زبان فارسی و سوئدی.";

/** Städer i logobältet/marquee delas i två rader som roterar åt olika håll. */
export const cityRowSplit = 7;
