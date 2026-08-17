import type { Locale } from "@/lib/i18n";

/**
 * Språk som visar prissektionen.
 *
 * Kunden vill inte ha priser på den persiska varianten. Beslutet gäller bara
 * persiskan: svenska och engelska behåller sina paket.
 *
 * Ligger i en egen fil för att både startsidan och headerns navigering ska
 * fråga samma ställe. Annars blir det förr eller senare en meny som länkar
 * till en sektion som inte finns.
 */
export function showsPricing(locale: Locale): boolean {
  return locale !== "fa";
}
