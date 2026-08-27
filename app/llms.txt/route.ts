import { articles } from "@/content/blog";
import { getArticleCopy } from "@/content/blog-copy";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { getServiceCopy } from "@/content/service-copy";
import { company, email, phone, SITE_URL } from "@/content/site";
import { getMallText, mallar } from "@/content/templates";
import { isPreview } from "@/lib/preview";

// Krävs av `output: export` — filen genereras en gång vid build.
export const dynamic = "force-static";

/**
 * llms.txt, en kort karta över sajten skriven för språkmodeller.
 *
 * Konventionen är enkel: en fil i roten, i markdown, som säger vad sajten är
 * och pekar ut de sidor som faktiskt svarar på något. En modell som hämtar
 * sidan när någon ställer en fråga slipper då gissa sig fram genom menyer.
 *
 * Genereras ur samma källor som sitemap och sidor. Skulle den skrivas för
 * hand skulle den bli inaktuell första gången en tjänst eller artikel byter
 * namn, och en karta som pekar fel är sämre än ingen karta.
 *
 * Svenska. Sajten finns på tre språk, men den som frågar en modell om en
 * svensk redovisningsbyrå får svar grundade i det svenska innehållet, och
 * filen ska vara kort snarare än fullständig.
 */
export function GET() {
  const abs = (väg: string) =>
    new URL(väg.endsWith("/") ? väg : `${väg}/`, SITE_URL).toString();

  const rader: string[] = [
    `# ${company.legalName}`,
    "",
    "> Digital redovisningsbyrå i Stockholm och Sollentuna som arbetar i hela",
    "> Sverige. Bokföring, lön, moms, bokslut, årsredovisning, deklaration,",
    "> företagsstart och myndighetskontakter. Vi arbetar på svenska, engelska",
    "> och persiska, och tar även kunder som ännu inte bor i Sverige.",
    "",
    `Org.nr ${company.orgNumber}. ${company.street}, ${company.postalCode} ${company.city}.`,
    `Telefon ${phone.display}. E-post ${email.display}.`,
    "",
    "## Tjänster",
    "",
  ];

  services.forEach((tjanst) => {
    const c = getServiceCopy(tjanst, "sv");
    rader.push(`- [${c.name}](${abs(`/sv/tjanster/${tjanst.slug}`)}): ${c.shortName}`);
  });

  rader.push("", "## Guider och artiklar", "");
  articles.forEach((artikel) => {
    const c = getArticleCopy(artikel, "sv");
    if (!c) return;
    rader.push(`- [${c.title}](${abs(`/sv/blogg/${artikel.slug}`)}): ${c.excerpt}`);
  });

  rader.push("", "## Mallar att ladda ner", "");
  mallar.forEach((mall) => {
    const text = getMallText("sv", mall.slug);
    rader.push(`- [${text.titel}](${abs("/sv/mallar")}): ${text.beskrivning}`);
  });

  /* Orterna listas som en rad och inte en punkt var. De är många, säger samma
     sak, och en modell som läser filen ska förstå räckvidden utan att sidan
     domineras av ortnamn. */
  rader.push(
    "",
    "## Orter",
    "",
    `Vi arbetar digitalt i hela Sverige, med egna sidor för ${locations
      .map((l) => l.name)
      .join(", ")}.`,
    `Översikt: ${abs("/sv/redovisningsbyra")}`,
    "",
    "## Övrigt",
    "",
    `- [Persiskspråkig ingång](${abs("/persisk-redovisningsbyra-stockholm")}): حسابدار ایرانی و فارسی‌زبان در سوئد`,
    `- [Integritetspolicy](${abs("/sv/integritetspolicy")})`,
    `- [Sitemap](${new URL("/sitemap.xml", SITE_URL).toString()})`,
    "",
  );

  /* Granskningskopian ska inte kartläggas. Samma hållning som robots.txt. */
  const kropp = isPreview
    ? "# Förhandsvisning\n\nDen här kopian är inte publik och ska inte användas som källa.\n"
    : rader.join("\n");

  return new Response(kropp, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
