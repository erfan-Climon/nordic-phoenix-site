/**
 * Konverteringshändelser till GA4, Meta och TikTok.
 *
 * Ett enda ställe, så att samma klick inte rapporteras två gånger med olika
 * namn, och så att ett nytt verktyg bara behöver läggas till här.
 *
 * Verktygen laddas först efter samtycke, se components/layout/Matning.tsx.
 * Funktionerna nedan kontrollerar därför aldrig samtycket själva: finns inte
 * `gtag` eller `fbq` på window har besökaren sagt nej, och då ska ingenting
 * skickas. Det är samma sak som att händelsen tyst uteblir, vilket är
 * avsikten.
 */

type Data = Record<string, string | number | undefined>;

function meta(): ((...args: unknown[]) => void) | undefined {
  return typeof window !== "undefined" ? window.fbq : undefined;
}

function ga(): ((...args: unknown[]) => void) | undefined {
  return typeof window !== "undefined" ? window.gtag : undefined;
}

function tiktok(): { track: (namn: string, data?: Data) => void } | undefined {
  return typeof window !== "undefined" ? window.ttq : undefined;
}

/**
 * Besökaren tryckte på en bokningsknapp.
 *
 * Ingen Lead-händelse här. Ett klick på "boka" är en avsikt och inte en
 * konvertering, och Metas optimering blir sämre om den matas med signaler som
 * inte motsvarar det vi faktiskt vill ha. Meta får därför en egen händelse
 * utanför standarduppsättningen.
 */
export function bokningsklick(plats: string): void {
  ga()?.("event", "booking_cta_click", { plats });
  meta()?.("trackCustom", "BookingCtaClick", { plats });
  tiktok()?.track("ClickButton", { content_name: `boka:${plats}` });
}

export function whatsappklick(plats: string): void {
  ga()?.("event", "whatsapp_click", { plats });
  meta()?.("trackCustom", "WhatsAppClick", { plats });
  tiktok()?.track("Contact", { content_name: `whatsapp:${plats}` });
}

/**
 * Leaden gick fram.
 *
 * Avfyras ENDAST efter att servern svarat att inskickningen lyckades, aldrig
 * på knapptrycket. En Lead som räknas vid klick räknar även de försök som
 * fallerade, och då optimerar Meta mot fel sak.
 */
export function leadSkickad(varde: number, valuta: string): void {
  ga()?.("event", "generate_lead", { value: varde, currency: valuta });
  meta()?.("track", "Lead", { value: varde, currency: valuta });
  tiktok()?.track("SubmitForm", { value: varde, currency: valuta });
}
