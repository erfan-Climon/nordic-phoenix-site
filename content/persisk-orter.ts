/**
 * Stadssidor för persisktalande företagare, på svenska.
 *
 * Varför de finns: sökningar som "persisk redovisningsbyrå göteborg" hade
 * ingen egen sida att landa på. Den allmänna stadssidan svarade, och den
 * låg efter en Göteborgsbyrå och en förmedlingstjänst i träfflistan när
 * läget mättes 16 november 2026. Underlaget finns i kundmappen under
 * rapporter/2026-11.
 *
 * Tre sidor, inte fler, och det är ett beslut och inte en början. Samma två
 * regler som för ortssidorna i locations.ts gäller här:
 *
 * 1. Ingen påhittad lokal närvaro. Byrån sitter i Sollentuna och arbetar
 *    digitalt. Rubriken säger därför "för företagare i", inte "i", och
 *    varje sida säger rakt ut var kontoret ligger.
 *
 * 2. Varje sida ska stå på egna ben. Innehållet utgår från vad som faktiskt
 *    skiljer orten åt: importen i Göteborg, handeln över Öresund i Malmö,
 *    bolagen som startas vid sidan av studier och anställning i Uppsala.
 *    En sida som bara byter ortsnamn är en dörrsida, och sådana drar ner
 *    hela sajten. Därför läggs inga fler orter till utan att det finns
 *    något eget att säga om dem.
 *
 * Inga belopp och inga procentsatser, av samma skäl som på huvudsidan: de
 * ändras varje år, och sidan ska stå kvar.
 */

export type PersiskOrt = {
  slug: string;
  name: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  /** Rubriken delas för att kunna färga andra halvan. */
  h1Lead: string;
  h1Accent: string;
  /** Persisk rad ovanför rubriken, för den som känner igen sitt språk. */
  persiskRad: string;
  intro: string;
  sektioner: { rubrik: string; stycken: string[] }[];
  faq: { q: string; a: string }[];
};

export const persiskaOrter: PersiskOrt[] = [
  {
    slug: "goteborg",
    name: "Göteborg",
    region: "Västra Götaland",
    metaTitle:
      "Persisk redovisningsbyrå Göteborg | Bokföring på persiska och svenska",
    metaDescription:
      "Persisktalande redovisningsbyrå för företagare i Göteborg. Bokföring, moms vid import, lön, bokslut och deklaration på persiska eller svenska. Digitalt, med samtal på ditt språk.",
    h1Lead: "Persisk redovisningsbyrå för",
    h1Accent: "företagare i Göteborg",
    persiskRad: "حسابدار فارسی‌زبان برای یوتبوری",
    intro:
      "Driver du företag i Göteborg och vill gå igenom din ekonomi på persiska? Nordic Phoenix Redovisningsbyrå sköter bokföring, moms, lön, bokslut och deklaration åt företagare i Göteborg, och samtalet förs på persiska eller svenska. Vi sitter i Sollentuna och arbetar digitalt, så du behöver inte ha en byrå runt hörnet för att få hjälp på ditt eget språk.",
    sektioner: [
      {
        rubrik: "Göteborg är en importstad, och det syns i bokföringen",
        stycken: [
          "Mycket av företagandet i Göteborg hänger ihop med hamnen och handeln. Den som köper in varor från utlandet, till en butik, en restaurang eller en e-handel, möter regler som inte finns i ett rent tjänsteföretag. Varor från länder utanför EU ska förtullas, importmomsen redovisas till Skatteverket och inköpen ska bokföras med rätt kurs och rätt dag.",
          "Det är sällan räkningen som är svår. Det är orden: tulldeklaration, importmoms, omvänd skattskyldighet. På persiska går det att förklara på några minuter vad som gäller för just din vara och ditt upplägg. Sedan sköter vi det formella på svenska åt dig.",
        ],
      },
      {
        rubrik: "Så arbetar vi med företagare i Göteborg",
        stycken: [
          "Allt sker digitalt. Du fotograferar kvitton och fakturor eller skickar dem som fil, och vi bokför löpande. Avstämningar och frågor tar vi per telefon eller video, på persiska om du vill. Brev från Skatteverket eller Bolagsverket kan du skicka vidare till oss, så förklarar vi vad som står och svarar när det behövs.",
          "Vi säger det rakt: vi har inget kontor i Göteborg. Kontoret ligger i Sollentuna norr om Stockholm. För de flesta spelar det ingen roll, eftersom redovisning i dag sköts på distans även när byrån ligger i samma stad.",
        ],
      },
    ],
    faq: [
      {
        q: "Har ni kontor i Göteborg?",
        a: "Nej. Kontoret ligger i Sollentuna, och vi arbetar digitalt med företagare i hela Sverige. Underlagen skickar du som foto eller fil, och möten håller vi per telefon eller video på persiska eller svenska.",
      },
      {
        q: "Jag importerar varor via Göteborgs hamn. Kan ni sköta momsen?",
        a: "Ja. Vid import från länder utanför EU betalas tullen till Tullverket, medan importmomsen redovisas till Skatteverket i momsdeklarationen när företaget är momsregistrerat. Vi bokför inköpen, stämmer av mot tullhandlingarna och ser till att momsen hamnar i rätt ruta.",
      },
      {
        q: "Jag har redan en redovisningsbyrå i Göteborg. Går det att byta mitt i året?",
        a: "Ja. Du behöver inte vänta till årsskiftet. Vi tar över bokföringen från ett avstämt datum och hämtar underlag och tidigare bokföring från din nuvarande byrå, så att inget behöver göras om.",
      },
      {
        q: "Kan ni förklara min bokföring på persiska även om allt lämnas in på svenska?",
        a: "Ja, det är själva poängen. Deklarationer, årsredovisning och kontakter med myndigheterna sköts på svenska av oss. Genomgången av dina siffror, och besluten som ska fattas utifrån dem, tar vi på persiska.",
      },
    ],
  },

  {
    slug: "malmo",
    name: "Malmö",
    region: "Skåne",
    metaTitle:
      "Persisk redovisningsbyrå Malmö | Persisktalande redovisningskonsult",
    metaDescription:
      "Persisktalande redovisningsbyrå för företagare i Malmö. Bokföring, moms vid handel med Danmark, lön, bokslut och deklaration på persiska eller svenska. Digitalt i hela Skåne.",
    h1Lead: "Persisk redovisningsbyrå för",
    h1Accent: "företagare i Malmö",
    persiskRad: "حسابدار فارسی‌زبان برای مالمو",
    intro:
      "Driver du företag i Malmö och vill kunna prata om din ekonomi på persiska? Nordic Phoenix Redovisningsbyrå sköter bokföring, moms, lön, bokslut och deklaration åt företagare i Malmö och resten av Skåne. Samtalet förs på persiska eller svenska, och allt formellt mot myndigheterna sköter vi på svenska. Vi sitter i Sollentuna och arbetar digitalt.",
    sektioner: [
      {
        rubrik: "Nära Danmark blir momsen en egen fråga",
        stycken: [
          "I Malmö ligger Köpenhamn närmare än de flesta svenska städer, och många företag har kunder eller leverantörer på andra sidan sundet. Då gäller andra momsregler än vid försäljning inom Sverige. Säljer du en tjänst till ett danskt företag fakturerar du i regel utan svensk moms, köparen redovisar momsen i Danmark och du lämnar en periodisk sammanställning till Skatteverket.",
          "Reglerna är inte svåra när man väl har fått dem förklarade, men de är lätta att göra fel på om man gissar. Vi går igenom på persiska vad som gäller för dina kunder och dina inköp, och lägger sedan upp bokföringen så att momsen blir rätt varje månad.",
        ],
      },
      {
        rubrik: "För dig som just har startat",
        stycken: [
          "Många som kontaktar oss från Malmö har nyss startat sitt företag, ofta en restaurang, en butik eller ett tjänsteföretag, och har aldrig tidigare haft med svensk bokföring att göra. Då handlar de första månaderna om att få ordning från början: F-skatt, momsregistrering, kassaregister där det krävs, och rutiner för kvitton och fakturor.",
          "Vi har inget kontor i Malmö. Kontoret ligger i Sollentuna, och arbetet sker digitalt med samtal per telefon eller video. Det gör också att du får samma kontaktperson hela vägen, och att samtalet kan föras på det språk du själv väljer.",
        ],
      },
    ],
    faq: [
      {
        q: "Har ni kontor i Malmö?",
        a: "Nej. Kontoret ligger i Sollentuna norr om Stockholm. Vi arbetar digitalt med företagare i hela Sverige, och möten hålls per telefon eller video på persiska eller svenska.",
      },
      {
        q: "Jag har kunder i Danmark. Hur fungerar momsen?",
        a: "Säljer du tjänster till ett momsregistrerat företag i Danmark är huvudregeln att du fakturerar utan svensk moms och att köparen redovisar momsen i sitt land. Du anger köparens momsregistreringsnummer på fakturan och lämnar en periodisk sammanställning till Skatteverket. För varor och för försäljning till privatpersoner gäller andra regler, och dem går vi igenom utifrån vad just du säljer.",
      },
      {
        q: "Jag ska öppna restaurang. Vad behöver vara klart innan första dagen?",
        a: "Företaget ska vara registrerat och godkänt för F-skatt, och du ska vara registrerad för moms och som arbetsgivare om du har anställda. Restauranger behöver dessutom ett certifierat kassaregister och en personalliggare, och livsmedelsverksamheten ska anmälas till kommunen. Vi hjälper dig med registreringarna hos Skatteverket och Bolagsverket och går igenom listan på persiska.",
      },
      {
        q: "Kan min bokföring skötas helt på distans från Skåne?",
        a: "Ja. Du skickar underlagen som foto eller fil, vi bokför löpande och du får rapporter du kan läsa. Frågor och avstämningar tar vi per telefon eller video.",
      },
    ],
  },

  {
    slug: "uppsala",
    name: "Uppsala",
    region: "Uppsala län",
    metaTitle:
      "Persisk redovisningsbyrå Uppsala | Bokföring på persiska och svenska",
    metaDescription:
      "Persisktalande redovisningsbyrå för företagare i Uppsala. Hjälp att välja bolagsform, starta rätt och sköta bokföring, moms och deklaration på persiska eller svenska.",
    h1Lead: "Persisk redovisningsbyrå för",
    h1Accent: "företagare i Uppsala",
    persiskRad: "حسابدار فارسی‌زبان برای اوپسالا",
    intro:
      "Driver du företag i Uppsala, eller är du på väg att starta ett, och vill ha genomgången på persiska? Nordic Phoenix Redovisningsbyrå sköter bokföring, moms, lön, bokslut och deklaration åt företagare i Uppsala. Vi sitter i Sollentuna, några mil söderut, och arbetar digitalt med samtal på persiska eller svenska.",
    sektioner: [
      {
        rubrik: "Många bolag i Uppsala startas vid sidan av något annat",
        stycken: [
          "Uppsala är en universitetsstad, och en stor del av företagen här börjar som en bisyssla: en konsult som tar uppdrag vid sidan av sin anställning, en forskare som säljer sin kunskap, en student som startar e-handel. Då är den första frågan inte bokföringen utan formen. Enskild firma eller aktiebolag avgör hur du beskattas, vad du riskerar privat och hur mycket administration du får.",
          "Det är ett beslut som är mycket lättare att fatta när någon räknar igenom båda alternativen med dig på ditt eget språk. Vi gör det innan något registreras, så att du inte behöver byta form efter ett år.",
        ],
      },
      {
        rubrik: "Små bolag ska inte betala för mer än de behöver",
        stycken: [
          "Ett bolag med några fakturor i månaden behöver inte samma upplägg som ett med anställda och lager. Vi anpassar omfattningen efter hur mycket som faktiskt händer i företaget, och bygger på när verksamheten växer.",
          "Kontoret ligger i Sollentuna och inte i Uppsala. Arbetet sker digitalt, och den som hellre ses på plats har inte långt att åka. För de flesta räcker telefon eller video, och samtalet tar vi på persiska om du vill.",
        ],
      },
    ],
    faq: [
      {
        q: "Har ni kontor i Uppsala?",
        a: "Nej. Kontoret ligger i Sollentuna, några mil söder om Uppsala. Vi arbetar digitalt, och möten hålls per telefon eller video på persiska eller svenska. Vill du ses på plats går det att boka ett besök hos oss.",
      },
      {
        q: "Jag är anställd och vill starta företag vid sidan av. Vad ska jag tänka på?",
        a: "Börja med att läsa ditt anställningsavtal, eftersom vissa arbetsgivare kräver att bisysslor anmäls eller godkänns. Därefter väljer du företagsform och ansöker om F-skatt. Har du både lön och inkomst från företaget får du FA-skatt, och det är viktigt att den preliminära skatten för företagsdelen blir rimligt satt från början. Vi går igenom upplägget med dig på persiska.",
      },
      {
        q: "Ska jag välja enskild firma eller aktiebolag när jag startar?",
        a: "Det beror på omsättning, risk och planer. En enskild firma är enkel att starta och kräver inget kapital, men du svarar personligen för företagets skulder. Ett aktiebolag kräver aktiekapital och mer administration, men begränsar ditt personliga ansvar. Vi räknar igenom båda med dina egna siffror innan du bestämmer dig.",
      },
      {
        q: "Mitt företag har nästan inga intäkter än. Måste jag ändå bokföra?",
        a: "Ja. Bokföringsskyldigheten gäller från den dag verksamheten startar, även om intäkterna dröjer. Kostnader och insättningar ska bokföras löpande, och ett aktiebolag ska lämna årsredovisning varje år oavsett omsättning. Det goda är att ett litet bolag också har lite att bokföra.",
      },
    ],
  },
];

export function getPersiskOrt(slug: string): PersiskOrt | undefined {
  return persiskaOrter.find((o) => o.slug === slug);
}
