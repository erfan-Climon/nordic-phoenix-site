import type { Locale } from "@/lib/i18n";

/**
 * Korta klipp som publiceras på Instagram, ett i veckan.
 *
 * Filerna ligger lokalt under `/public/video/klipp/` i stället för att bäddas
 * in från Instagram. Två skäl, och båda väger tungt här:
 *
 * En officiell inbäddning laddar Metas `embed.js` redan vid sidladdning och
 * sätter kakor innan besökaren svarat på samtyckesrutan. Sajten laddar i dag
 * ingenting från tredje part före samtycke (se `Samtycke.tsx` och
 * `Matning.tsx`), och integritetspolicyn är skriven efter det. En inbäddning
 * hade alltså krävt att både koden och policyn gjordes om.
 *
 * Inbäddningen tar dessutom med Instagrams egen formgivning in på en sida som
 * inte ser ut så, och laddar långsamt. Lokala filer spelar direkt, ser ut som
 * resten av sajten och kostar inget extra uppslag.
 *
 * `permalank` behövs inte för uppspelningen. Den finns för att besökaren ska
 * kunna gå vidare till kontot, och för att klippet ska ha en plats att få
 * kommentarer på.
 */
export type Klipp = {
  /** Används som React-nyckel och som filnamn. */
  slug: string;
  /** MP4 i porträtt, H.264. Spelas överallt, till skillnad från VP9. */
  fil: string;
  /** Stillbild före uppspelning. Samma mått som filmen, annars hoppar rutan. */
  affisch: string;
  /** Inlägget på Instagram. */
  permalank: string;
  /** ÅÅÅÅ-MM-DD. Styr ordningen. */
  publicerad: string;
  /**
   * Kort rubrik, en rad. Står inte i klippet utan under det, så den ska gå
   * att läsa utan ljud och säga vad klippet svarar på.
   */
  titel: Record<Locale, string>;
};

/**
 * Tom tills filerna finns. Sektionen renderar ingenting på en tom lista, så
 * sajten är hel under tiden.
 *
 * Lägg till ett klipp genom att spara MP4:an som
 * `public/video/klipp/<slug>.mp4` och en stillbild som
 * `public/video/klipp/<slug>.jpg`, och lägga en post här. Inget annat behöver
 * röras: ordningen kommer ur `publicerad`.
 */
export const klipp: Klipp[] = [];

/** Nyast först. */
export const publiceradeKlipp: Klipp[] = [...klipp].sort((a, b) =>
  b.publicerad.localeCompare(a.publicerad),
);
