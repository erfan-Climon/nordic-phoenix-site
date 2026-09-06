import { email } from "@/content/site";

/**
 * E-postadressen som länk, undantagen från Cloudflares adressmaskering.
 *
 * Cloudflare har en funktion i Scrape Shield som heter Email Address
 * Obfuscation. Den skriver om varje mailto-länk i svaret: adressen byts mot
 * texten "[email protected]" och länkmålet mot /cdn-cgi/l/email-protection
 * följt av adressen krypterad i hex, som ett litet skript avkodar i
 * webbläsaren. Två saker gick sönder av det.
 *
 * Dels svarar /cdn-cgi/l/email-protection 404 utan hexdelen, och Googlebot
 * följer länken utan att köra skriptet. Det var den enda 404 Search Console
 * rapporterade för sajten.
 *
 * Dels var adressen oläslig för allt som inte kör JavaScript, alltså även
 * för Google. Kontaktuppgifter väger in när Google avgör att ett företag är
 * verkligt, och den signalen saknades på varje sida.
 *
 * Maskeringen skyddade heller ingenting: samma adress står i klartext i
 * AccountingService-schemat.
 *
 * `<!--email_off-->` är Cloudflares dokumenterade sätt att undanta ett
 * avsnitt. Kommentarerna måste ligga i den levererade HTML:en, och JSX
 * skriver inte ut kommentarer, därför dangerouslySetInnerHTML. Ingenting
 * här kommer utifrån: adressen är vår egen konstant och klassnamnet skickas
 * in från vår egen kod.
 *
 * Undantaget görs i koden i stället för genom att slå av funktionen på
 * Cloudflare-kontot, så att fixen följer med sajten och inte kan
 * försvinna vid en kontoändring någon annan gör.
 *
 * `contents` på omslaget gör att länken behåller sin plats i föräldrarnas
 * layout, precis som när taggen stod direkt i koden.
 */
export function Epostlank({ className }: { className: string }) {
  return (
    <span
      className="contents"
      dangerouslySetInnerHTML={{
        __html: `<!--email_off--><a href="${email.href}" class="${className}">${email.display}</a><!--email_on-->`,
      }}
    />
  );
}
