/**
 * Språk som visar prissektionen.
 *
 * Kunden tog först bort priserna på persiskan och sedan på svenska och
 * engelska också. Ingen variant visar dem alltså i dag.
 *
 * Funktionen står kvar i stället för att sektionen rivs ut. Prissektionen,
 * menylänken och prisraden på tjänste- och ortssidor frågar alla här, så
 * det är ett ställe att ändra den dagen paketen ska tillbaka. Beloppen i
 * ordlistorna är kvar av samma skäl; de renderas inte. Språkargumentet är
 * borttaget eftersom beslutet inte längre beror på språk.
 *
 * Texter där beloppen låg inbakade i löpande mening, framför allt
 * ortssidornas frågor och svar, är däremot omskrivna. Dem går det inte att
 * slå på och av med en flagga.
 */
export function showsPricing(): boolean {
  return false;
}
