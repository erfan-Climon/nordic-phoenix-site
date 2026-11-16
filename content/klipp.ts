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
 * Bara klipp som redan ligger ute på Instagram står här. Sajten ska inte
 * visa något före kontot: klippen publiceras en i veckan, och poängen med
 * dem är att de drar folk till kontot.
 *
 * Sju klipp spelades in i oktober 2026. De fyra som ännu inte är ute ligger
 * färdigkomprimerade i `films/klipp/` utanför repot, för att en fil som inte
 * visas inte ska ligga i bygget. Lägg till ett klipp så här:
 *
 *  1. kopiera `<slug>.mp4` och `<slug>.jpg` till `public/video/klipp/`
 *  2. lägg en post här med datum och länk från inlägget
 *
 * Inget annat behöver röras. Ordningen kommer ur `publicerad`, och sektionen
 * dyker upp av sig själv så länge listan inte är tom.
 */
export const klipp: Klipp[] = [
  {
    slug: "ta-ut-pengar-ur-ab",
    fil: "/video/klipp/ta-ut-pengar-ur-ab.mp4",
    affisch: "/video/klipp/ta-ut-pengar-ur-ab.jpg",
    permalank:
      "https://www.instagram.com/nordic.phoenix.redovisning/reel/De_fJPtnNv-/",
    publicerad: "2026-10-27",
    titel: {
      sv: "Tre lagliga sätt att ta ut pengar ur ditt AB",
      en: "Three legal ways to take money out of your limited company",
      fa: "سه راه قانونی برای برداشت پول از شرکت",
    },
  },
  {
    slug: "preliminarskatt",
    fil: "/video/klipp/preliminarskatt.mp4",
    affisch: "/video/klipp/preliminarskatt.jpg",
    permalank:
      "https://www.instagram.com/nordic.phoenix.redovisning/reel/DfO8mZrD7LV/",
    publicerad: "2026-11-02",
    titel: {
      sv: "Vad preliminärskatt är, och hur du ändrar den",
      en: "What preliminary tax is, and how you change it",
      fa: "مالیات علی‌الحساب چیست و چگونه آن را تغییر می‌دهید",
    },
  },
  {
    slug: "pengar-pa-kontot-eller-vinst",
    fil: "/video/klipp/pengar-pa-kontot-eller-vinst.mp4",
    affisch: "/video/klipp/pengar-pa-kontot-eller-vinst.jpg",
    permalank:
      "https://www.instagram.com/nordic.phoenix.redovisning/reel/Dfg9k_cmS-9/",
    publicerad: "2026-11-10",
    titel: {
      sv: "Pengar på kontot är inte samma sak som vinst",
      en: "Money in the account is not the same as profit",
      fa: "پول در حساب با سود یکی نیست",
    },
  },
];

/** Nyast först. */
export const publiceradeKlipp: Klipp[] = [...klipp].sort((a, b) =>
  b.publicerad.localeCompare(a.publicerad),
);
