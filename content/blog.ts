/**
 * Bloggens innehåll.
 *
 * Artiklarna kommer från kundens contentplan för augusti 2026 till augusti
 * 2027 och är inlästa ur planens docx-fil, inte avskrivna för hand. Planens
 * månadsindelning styr utgivningen i sociala medier. På sajten publiceras
 * alla samtidigt: en blogg som fylls på under ett år hinner aldrig bygga
 * någon auktoritet, och säsongsartiklar behöver ligga ute i god tid före den
 * säsong de ska ranka i.
 *
 * Sakuppgifterna är kontrollerade mot Skatteverket, Bolagsverket och
 * regeringen i augusti 2026. Belopp och datum ändras: kontrollera dem igen
 * innan artiklarna uppdateras, särskilt de som rör inkomstår 2027.
 */

export type FaqPost = { q: string; a: string };

/**
 * Skribenten under artikeln.
 *
 * Namngiven författare är inte pynt på den här sortens innehåll. Google
 * väger E-E-A-T tyngst på det som rör pengar, och skatteråd utan avsändare
 * bedöms hårdare än samma text med en person bakom. Namnet går också in i
 * BlogPosting-schemat som Person i stället för Organization.
 *
 * Valfri på artikeln: bara de artiklar som faktiskt har en skribent ska visa
 * ett block. Rollen och presentationen översätts, namnet gör det inte.
 */
export type Author = {
  name: string;
  /** Raden under namnet. Får innehålla flera roller. */
  role: string;
  /**
   * Enbart yrkestiteln, till Person-schemat. Hålls isär från `role`, som är
   * en visningsrad: schemat ska bära titeln ren, utan grundare och ägare
   * inblandat.
   */
  jobTitle: string;
  bio: string;
};

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "callout";
      label: string;
      columns: { title: string; accent?: boolean; text: string }[];
    };

export type Article = {
  slug: string;
  tag: string;
  date: string;
  /** ISO-datum för <time> och sitemap. */
  published: string;
  readingMinutes: number;
  title: string;
  /** Rubriken delas för att kunna gradient-clippa andra halvan. */
  titleLead: string;
  titleAccent: string;
  excerpt: string;
  intro: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  blocks: ArticleBlock[];
  /** Handlingschecklistan som avslutar varje artikel i contentplanen. */
  checklist: string[];
  /** Ger FAQPage-schema, alltså utfällbara frågor i Googles sökresultat. */
  faq: FaqPost[];
  /** Artikelns egen uppmaning, i stället for den generella i ordlistan. */
  cta: string;
  /** Visas efter frågorna, före uppmaningen. Saknas den visas inget block. */
  author?: Author;
};

/**
 * Utgivningsdatum, i tur och ordning en gång i månaden.
 *
 * En artikel som inte släppts än finns inte alls: ingen sida genereras,
 * ingenting hamnar i sitemapen, inga hreflang pekar dit. Alternativet, att
 * dölja den med CSS eller en flagga i sidan, hade lämnat texten kvar i
 * HTML:en där Google läser den. Halvpublicerat innehåll är sämre än
 * opublicerat.
 *
 * Jämförelsen görs mot byggtiden, eftersom sajten är statiskt exporterad.
 * Datumet passerar alltså inte av sig självt: sidan måste byggas om för att
 * nästa artikel ska dyka upp. Se .github/workflows för den månatliga
 * ombyggnaden.
 */
const IDAG = new Date().toISOString().slice(0, 10);

const ALLA: Article[] = [
  {
    slug: "ekonomisk-halsokontroll-foretag",
    tag: "Ekonomistyrning",
    date: "Augusti 2026",
    published: "2026-08-16",
    readingMinutes: 4,
    title: "Ge företaget en ekonomisk höststart på 60 minuter",
    titleLead: "Ge företaget en ekonomisk höststart på",
    titleAccent: "60 minuter",
    excerpt:
      "Gör en ekonomisk hälsokontroll på 60 minuter. Få kontroll över likviditet, skatter, kundfordringar och kostnader inför hösten.",
    intro:
      "Efter sommaren är det lätt att gå direkt in i leveranser, kundmöten och nya projekt. Men en timmes ekonomisk genomgång i augusti kan vara mer värd än flera dagars brandsläckning senare under hösten. Här är en enkel kontroll som fungerar för både enskild firma och aktiebolag.",
    image: "/assets/blogg/ekonomisk-halsokontroll-foretag-sv.webp",
    imageAlt: "Ge företaget en ekonomisk höststart på 60 minuter",
    metaTitle:
      "Ekonomisk höststart: 60-minuterskontrollen för småföretag | Nordic Phoenix",
    metaDescription:
      "Gör en ekonomisk hälsokontroll på 60 minuter. Få kontroll över likviditet, skatter, kundfordringar och kostnader inför hösten.",
    blocks: [
      { type: "heading", text: "Börja med pengarna som faktiskt finns" },
      {
        type: "paragraph",
        text: "Öppna företagskontot och skriv ned det disponibla saldot. Dra sedan bort sådant som redan är beslutat men ännu inte betalt, till exempel moms, löner, leverantörsfakturor och kommande skatteinbetalningar. Det som återstår är din verkliga rörelsefrihet, inte kontosaldot i sig.",
      },
      {
        type: "paragraph",
        text: "Ett företag kan visa vinst i bokföringen och ändå få problem med betalningarna. Vinsten innehåller ofta fakturor som ännu inte har betalats. Därför behöver du se på både resultat och likviditet.",
      },
      { type: "heading", text: "Kontrollera kundfordringarna" },
      {
        type: "paragraph",
        text: "Gå igenom alla obetalda kundfakturor. Dela dem i tre grupper: inte förfallna, förfallna upp till 14 dagar och förfallna mer än 14 dagar. Den sista gruppen ska hanteras direkt. Skicka en vänlig påminnelse, ring kunden och dokumentera vad ni kommer överens om.",
      },
      {
        type: "paragraph",
        text: "Har du återkommande sena betalningar är problemet ofta inte bara kunden. Otydliga fakturor, långa betalningsvillkor eller sen fakturering kan vara en del av orsaken. Fakturera så nära leveransen som möjligt och se till att referens, förfallodatum och betalningsuppgifter är tydliga.",
      },
      { type: "heading", text: "Stäm av skattekontot och preliminärskatten" },
      {
        type: "paragraph",
        text: "Logga in hos Skatteverket och kontrollera skattekontot. Finns det ett underskott, en kommande debitering eller en betalning som inte matchar din plan? Små avvikelser är enkla att lösa tidigt men kan bli onödigt dyra om de lämnas utan åtgärd.",
      },
      {
        type: "paragraph",
        text: "Jämför också årets verkliga resultat med den vinst som låg till grund för din preliminärskatt. Om verksamheten går betydligt bättre eller sämre än planerat kan du lämna en ny preliminär inkomstdeklaration. Då minskar risken för stor kvarskatt eller att företaget betalar in för mycket under året.",
      },
      {
        type: "heading",
        text: "Hitta kostnader som blivit kvar av gammal vana",
      },
      {
        type: "paragraph",
        text: "Exportera de senaste tre månadernas transaktioner och markera abonnemang, program, försäkringar och andra återkommande kostnader. Fråga om varje kostnad används, skapar värde eller kan ersättas av något enklare. Målet är inte att skära bort sådant som driver försäljning, utan att stoppa kostnader som inte längre har en tydlig funktion.",
      },
      {
        type: "paragraph",
        text: "Var särskilt uppmärksam på flera system som gör samma sak, licenser för tidigare medarbetare och abonnemang som förnyas årsvis.",
      },
      { type: "heading", text: "Gör en enkel prognos för tolv veckor" },
      {
        type: "paragraph",
        text: "Skriv upp förväntade inbetalningar och utbetalningar vecka för vecka. Ta bara med intäkter som är rimligt säkra. Lägg in moms, arbetsgivaravgifter, löner, hyror, lån och större inköp på rätt vecka. Då ser du tidigt om en svag period närmar sig.",
      },
      {
        type: "paragraph",
        text: "Om prognosen visar ett underskott har du tid att agera. Du kan tidigarelägga fakturering, förhandla betalningsvillkor, skjuta på ett inköp eller planera finansiering innan läget blir akut.",
      },
      {
        type: "heading",
        text: "Skillnaden mellan enskild firma och aktiebolag",
      },
      {
        type: "paragraph",
        text: "I en enskild firma är företagets ekonomi juridiskt kopplad till dig som person, även om du ska hålla den praktiskt åtskild från din privatekonomi. Uttag är egna uttag och inte lön. I ett aktiebolag är bolaget en egen juridisk person. Pengar får därför inte flyttas mellan dig och bolaget utan korrekt grund, till exempel lön, utdelning, utlägg eller återbetalning av lån.",
      },
      {
        type: "paragraph",
        text: "Den här skillnaden gör att en felaktig privat betalning ofta får större juridisk och redovisningsmässig betydelse i ett aktiebolag.",
      },
      { type: "heading", text: "Din 60-minutersplan" },
      {
        type: "paragraph",
        text: "Avsätt tio minuter för bank och likviditet, tio minuter för kundfordringar, tio minuter för skattekontot, tio minuter för fasta kostnader, femton minuter för en tolvveckorsprognos och fem minuter för att bestämma tre åtgärder med ansvar och datum.",
      },
      {
        type: "paragraph",
        text: "Det viktiga är inte att allt blir perfekt. Det viktiga är att du lämnar genomgången med tre konkreta beslut.",
      },
    ],
    checklist: [
      "Kontosaldo efter redan beslutade betalningar",
      "Förfallna kundfakturor och nästa åtgärd",
      "Saldo och kommande händelser på skattekontot",
      "Preliminärskatt jämförd med aktuell prognos",
      "Onödiga eller dubbla abonnemang",
      "Likviditetsprognos för kommande tolv veckor",
      "Tre beslut med ansvarig person och sista datum",
    ],
    faq: [
      {
        q: "Hur ofta bör jag göra kontrollen?",
        a: "En kort kontroll varje månad och en mer grundlig genomgång varje kvartal ger normalt tillräcklig framförhållning för ett mindre företag.",
      },
      {
        q: "Vad är viktigast om tiden inte räcker?",
        a: "Börja med likviditeten, skattekontot och förfallna kundfakturor. De tre områdena påverkar företagets betalningsförmåga direkt.",
      },
      {
        q: "Kan ett lönsamt företag få likviditetsproblem?",
        a: "Ja. Ett företag kan ha god vinst men ändå sakna pengar om kunder betalar sent, lagret växer eller stora skatter och investeringar förfaller samtidigt.",
      },
    ],
    cta: "Vill du få en tydlig månadsrapport som visar vad siffrorna betyder och vad du bör göra härnäst? Boka en ekonomisk genomgång med oss.",
    author: {
      name: "Ali Nahroudi",
      role: "Grundare och ägare",
      jobTitle: "Redovisningskonsult",
      bio: "Ali grundade Nordic Phoenix med ambitionen att göra redovisning tydlig, trygg och tillgänglig för företagare i Sverige. Han arbetar dagligen med bokföring, bokslut, deklarationer och myndighetskontakter, och möter kunder på svenska, engelska och persiska.",
    },
  },
  {
    slug: "enskild-firma-eller-aktiebolag",
    tag: "Bolagsstart",
    date: "Augusti 2026",
    published: "2026-08-16",
    readingMinutes: 4,
    title:
      "Enskild firma eller aktiebolag: välj efter risk och vardag, inte bara skatt",
    titleLead: "Enskild firma eller aktiebolag: välj efter risk och vardag,",
    titleAccent: "inte bara skatt",
    excerpt:
      "Enskild firma eller aktiebolag? Jämför ansvar, skatt, lön, utdelning och administration med konkreta exempel för svenska företagare.",
    intro:
      "Frågan om företagsform blir ofta förenklad till en enda sak: vid vilken vinst lönar sig aktiebolag? I verkligheten är svaret större än så. Rätt val beror på risk, kunder, investeringar, hur du vill ta ut pengar och hur snabbt verksamheten ska växa.",
    image: "/assets/blogg/enskild-firma-eller-aktiebolag-sv.webp",
    imageAlt:
      "Enskild firma eller aktiebolag: välj efter risk och vardag, inte bara skatt",
    metaTitle:
      "Enskild firma eller aktiebolag 2026: så väljer du rätt | Nordic Phoenix",
    metaDescription:
      "Enskild firma eller aktiebolag? Jämför ansvar, skatt, lön, utdelning och administration med konkreta exempel för svenska företagare.",
    blocks: [
      { type: "heading", text: "Den viktigaste skillnaden är ansvaret" },
      {
        type: "paragraph",
        text: "En enskild näringsverksamhet är inte en egen juridisk person. Du ansvarar personligen för avtal och skulder. Ett aktiebolag är däremot en egen juridisk person. Huvudregeln är att bolaget ansvarar för sina skulder, även om personligt ansvar kan uppstå i särskilda situationer, till exempel vid vissa skattebrister, otillåtna värdeöverföringar eller om styrelsen inte agerar vid kapitalbrist.",
      },
      {
        type: "paragraph",
        text: "Har verksamheten stora inköp, långa avtal, anställda eller risk för skadestånd väger ansvarsfrågan ofta tyngre än en mindre skillnad i skatt.",
      },
      { type: "heading", text: "Så beskattas pengarna" },
      {
        type: "paragraph",
        text: "I enskild firma beskattas du för verksamhetens skattemässiga överskott. Det spelar ingen roll hur mycket du faktiskt tar ut från kontot. Egna uttag påverkar inte vinsten. Du betalar normalt inkomstskatt och egenavgifter, men kan använda verktyg som periodiseringsfond, expansionsfond och positiv räntefördelning när villkoren är uppfyllda.",
      },
      {
        type: "paragraph",
        text: "I aktiebolag betalar bolaget bolagsskatt på vinsten. Du beskattas separat för lön och eventuell utdelning. Det ger fler val, men också fler regler. Utdelning kräver utdelningsbara medel, ett korrekt beslut och hänsyn till 3:12-reglerna om aktierna är kvalificerade.",
      },
      { type: "heading", text: "Lön, uttag och trygghet" },
      {
        type: "paragraph",
        text: "I enskild firma tar du inte lön från ditt eget företag. Du gör egna uttag. Din sjukpenninggrundande och pensionsgrundande inkomst påverkas i stället av verksamhetens resultat och andra förutsättningar.",
      },
      {
        type: "paragraph",
        text: "I aktiebolag är du normalt anställd i bolaget när du tar lön. Lönen påverkar bland annat pension, socialförsäkring och möjligheten att använda löneunderlag i 3:12-beräkningen. Utdelning kan vara skattemässigt fördelaktig men ersätter inte lönebaserad trygghet.",
      },
      { type: "heading", text: "Administration och kostnad" },
      {
        type: "paragraph",
        text: "Enskild firma är ofta enklare att starta och driva. Mindre verksamheter kan i många fall göra förenklat årsbokslut. Aktiebolag måste upprätta årsredovisning och lämna in den till Bolagsverket. Bolaget behöver också hantera styrelseansvar, bolagsstämmor, aktiebok och tydligare gränser mellan privata och företagsrelaterade pengar.",
      },
      {
        type: "paragraph",
        text: "För att starta ett privat aktiebolag krävs minst 25 000 kronor i aktiekapital. Kapitalet är inte en avgift, men det måste tillhöra bolaget och får bara användas i verksamheten på ett affärsmässigt sätt.",
      },
      { type: "heading", text: "När enskild firma ofta passar" },
      {
        type: "paragraph",
        text: "Enskild firma kan passa när du testar en affärsidé med låg ekonomisk risk, arbetar ensam, har begränsade investeringar och vill hålla administrationen enkel. Den kan också vara praktisk för en mindre sidoverksamhet.",
      },
      {
        type: "paragraph",
        text: "Den är mindre lämplig när avtal och skulder kan bli stora i förhållande till din privata ekonomi eller när flera personer ska äga verksamheten.",
      },
      { type: "heading", text: "När aktiebolag ofta passar" },
      {
        type: "paragraph",
        text: "Aktiebolag blir ofta relevant när verksamheten är etablerad, har högre risk, ska anställa, ta in delägare, bygga kapital eller säljas i framtiden. Många större kunder upplever också aktiebolag som en tydligare motpart, även om det inte säger något om kvaliteten i sig.",
      },
      {
        type: "paragraph",
        text: "Bytet bör planeras. Avtal, inventarier, kundrelationer, moms, F-skatt och eventuella periodiseringsfonder måste hanteras korrekt. Att bara börja fakturera från ett nytt bolag utan en genomtänkt övergång kan skapa onödiga problem.",
      },
      {
        type: "heading",
        text: "Fyra frågor som ger ett bättre svar än en vinstgräns",
      },
      {
        type: "paragraph",
        text: "Fråga först hur stor ekonomisk risk du tar. Fråga sedan om du behöver bygga kapital i verksamheten, om du ska ha anställda eller delägare och hur du vill ta ut pengar de närmaste tre åren. När de frågorna är besvarade blir skattejämförelsen betydligt mer relevant.",
      },
      {
        type: "paragraph",
        text: "Det finns alltså ingen universell omsättningsnivå där alla bör byta. Två företag med samma vinst kan behöva olika företagsform.",
      },
    ],
    checklist: [
      "Hur stora avtal och ekonomiska risker har verksamheten?",
      "Ska du anställa eller ta in delägare?",
      "Behöver vinster stanna kvar för investeringar?",
      "Hur viktig är enkel administration?",
      "Hur påverkas pension och socialförsäkring?",
      "Finns periodiseringsfonder, inventarier eller avtal att flytta?",
      "Behöver du rådgivning före ett byte?",
    ],
    faq: [
      {
        q: "Är aktiebolag alltid skattemässigt bättre?",
        a: "Nej. Utfallet beror på vinst, löneuttag, utdelning, andra inkomster och hur mycket kapital som behöver stanna i verksamheten.",
      },
      {
        q: "Kan jag ha både enskild firma och aktiebolag?",
        a: "Ja, men verksamheterna måste hållas åtskilda och transaktioner mellan dem ska ha affärsmässig grund och dokumentation.",
      },
      {
        q: "Kan jag använda aktiekapitalet?",
        a: "Ja, i bolagets verksamhet. Det får inte behandlas som privata pengar, och styrelsen måste följa reglerna om kapitalbrist.",
      },
    ],
    cta: "Osäker på vad som passar din verksamhet? Vi kan jämföra företagsformer utifrån risk, skatt och dina planer de kommande åren.",
  },
  {
    slug: "nya-3-12-regler-2026",
    tag: "Fåmansbolag",
    date: "September 2026",
    published: "2026-09-01",
    readingMinutes: 4,
    title:
      "Nya 3:12-reglerna: det här behöver ägare i fåmansbolag förstå före årsskiftet",
    titleLead: "Nya 3:12-reglerna: det här behöver ägare i fåmansbolag förstå",
    titleAccent: "före årsskiftet",
    excerpt:
      "Förstå de nya 3:12-reglerna från inkomstår 2026. Vi förklarar grundbelopp, löneutrymme, sparat utdelningsutrymme och K10.",
    intro:
      "Från inkomstår 2026 beräknas gränsbeloppet för kvalificerade aktier på ett nytt sätt. Förändringen påverkar den K10-blankett som lämnas i deklarationen 2027. Reglerna har förenklats på vissa punkter, men det betyder inte att planeringen kan vänta till deklarationsdagen.",
    image: "/assets/blogg-thumb.webp",
    imageAlt:
      "Nya 3:12-reglerna: det här behöver ägare i fåmansbolag förstå före årsskiftet",
    metaTitle:
      "Nya 3:12-regler 2026: utdelning och K10 förklarat | Nordic Phoenix",
    metaDescription:
      "Förstå de nya 3:12-reglerna från inkomstår 2026. Vi förklarar grundbelopp, löneutrymme, sparat utdelningsutrymme och K10.",
    blocks: [
      { type: "heading", text: "Vad är gränsbeloppet?" },
      {
        type: "paragraph",
        text: "Gränsbeloppet avgör hur stor del av utdelning eller kapitalvinst på kvalificerade aktier som kan beskattas i inkomstslaget kapital enligt 3:12-reglerna. Utdelning inom gränsbeloppet beskattas i praktiken med 20 procent. Belopp över gränsbeloppet kan helt eller delvis beskattas som tjänst.",
      },
      {
        type: "paragraph",
        text: "Därför är K10 inte bara en deklarationsbilaga. Den är ett register över ditt sparade utdelningsutrymme och ett viktigt underlag för framtida utdelning eller försäljning.",
      },
      { type: "heading", text: "En enda beräkningsregel ersätter två" },
      {
        type: "paragraph",
        text: "Tidigare valde delägaren mellan förenklingsregeln och huvudregeln. Från inkomstår 2026 finns en gemensam modell. Gränsbeloppet kan bestå av din andel av grundbeloppet, lönebaserat utrymme, ränta på den del av omkostnadsbeloppet som överstiger 100 000 kronor samt sparat utdelningsutrymme.",
      },
      {
        type: "paragraph",
        text: "För inkomstår 2026 är det totala grundbeloppet 322 400 kronor, vilket motsvarar fyra inkomstbasbelopp. Äger flera personer aktier fördelas beloppet utifrån ägandet. Äger du kvalificerade aktier i flera företag måste fördelningen hanteras korrekt.",
      },
      { type: "heading", text: "Lönekravet och fyrprocentskravet tas bort" },
      {
        type: "paragraph",
        text: "Det tidigare kapitalandelskravet på fyra procent och det särskilda löneuttagskravet har tagits bort. Det betyder att fler delägare kan räkna på ett lönebaserat utrymme.",
      },
      {
        type: "paragraph",
        text: "Det lönebaserade utrymmet är 50 procent av den del av delägarens andel av löneunderlaget som överstiger åtta inkomstbasbelopp. För inkomstår 2026 är avdraget 644 800 kronor. Formeln är i förenklad form: löneunderlag multiplicerat med ägarandel, minus 644 800 kronor, multiplicerat med 50 procent.",
      },
      {
        type: "paragraph",
        text: "Det finns fortfarande ett tak. Utrymmet får inte överstiga 50 gånger den kontanta ersättning som du eller en närstående fått från företaget och dess dotterföretag under föregående år. Ett visst löneuttag kan därför fortfarande ha stor betydelse.",
      },
      {
        type: "heading",
        text: "Sparat utdelningsutrymme räknas inte längre upp",
      },
      {
        type: "paragraph",
        text: "Sparat utdelningsutrymme får fortfarande föras vidare, men från deklarationen 2027 räknas det inte längre upp med ränta. Har du stora sparade belopp är det viktigt att de är korrekt dokumenterade från tidigare K10-blanketter.",
      },
      {
        type: "paragraph",
        text: "Det är också klokt att lämna K10 även år utan utdelning. Annars kan det bli svårt att i efterhand visa hur utrymmet har byggts upp.",
      },
      {
        type: "heading",
        text: "Ränta bara på omkostnadsbelopp över 100 000 kronor",
      },
      {
        type: "paragraph",
        text: "Den räntebaserade delen beräknas från och med 2026 bara på den del av omkostnadsbeloppet som överstiger 100 000 kronor. För inkomstår 2026 är räntan 11,55 procent på den överskjutande delen.",
      },
      {
        type: "paragraph",
        text: "För många små bolag med ett aktiekapital på 25 000 kronor ger denna del inget tillskott. Vid större investeringar i aktierna eller komplicerad ägarhistorik kan den däremot få betydelse.",
      },
      { type: "heading", text: "Vad du bör göra före den 31 december" },
      {
        type: "paragraph",
        text: "Kontrollera ägarbilden och att förändringar är anmälda. Samla uppgifter om kontanta löner i bolaget och dotterföretag. Stäm av ditt eget och närståendes löneuttag. Säkerställ att tidigare K10-blanketter och sparat utdelningsutrymme är korrekta. Bedöm planerad utdelning tillsammans med bolagets fria egna kapital och försiktighetsregeln.",
      },
      {
        type: "paragraph",
        text: "Undvik att fatta beslut utifrån ett enda schablonbelopp. Ägarandel, flera bolag, makar, dotterföretag och förändringar under året kan påverka beräkningen.",
      },
      { type: "heading", text: "Viktigt om 2027" },
      {
        type: "paragraph",
        text: "Vissa bakåtblickande tidsperioder i 3:12-reglerna förkortas från fem till fyra år för beskattningsår som börjar efter den 31 december 2026. Det kan få betydelse vid bland annat träda, ägarförändringar och bedömning av kvalificerade andelar. Sådana situationer bör analyseras individuellt.",
      },
    ],
    checklist: [
      "Ägarandelar vid årets ingång",
      "Grundbeloppets fördelning mellan bolag och delägare",
      "Kontanta löner i bolag och dotterföretag",
      "Eget eller närståendes löneuttag",
      "Tidigare K10 och sparat utdelningsutrymme",
      "Omkostnadsbelopp över 100 000 kronor",
      "Fritt eget kapital och formellt utdelningsbeslut",
    ],
    faq: [
      {
        q: "Är utdelning alltid beskattad med 20 procent?",
        a: "Nej. Den effektiva skatten på 20 procent gäller utdelning inom gränsbeloppet på kvalificerade aktier. Överskjutande belopp kan beskattas som tjänst.",
      },
      {
        q: "Måste jag ta ut lön för att få lönebaserat utrymme?",
        a: "Det gamla löneuttagskravet är borttaget, men 50-gånger-taket innebär att egen eller närståendes kontanta ersättning fortfarande kan begränsa utrymmet.",
      },
      {
        q: "Ska jag lämna K10 även utan utdelning?",
        a: "Skatteverket rekommenderar normalt att K10 lämnas varje år för att hålla reda på sparat utdelningsutrymme.",
      },
    ],
    cta: "Äger du ett fåmansbolag? Låt oss göra en 3:12-beräkning före årsskiftet så att lön, utdelning och dokumentation hänger ihop.",
  },
  {
    slug: "skatteplanering-infor-arsskiftet",
    tag: "Skatteplanering",
    date: "Oktober 2026",
    published: "2026-10-01",
    readingMinutes: 4,
    title:
      "Skatteplanering före årsskiftet: åtgärder som fortfarande går att påverka",
    titleLead: "Skatteplanering före årsskiftet:",
    titleAccent: "åtgärder som fortfarande går att påverka",
    excerpt:
      "Planera skatt och resultat före årsskiftet. Se vad enskild firma och aktiebolag kan göra och vilka vanliga misstag du bör undvika.",
    intro:
      "Bra skatteplanering handlar inte om att köpa saker du inte behöver. Den handlar om rätt period, rätt företagsform och rätt beslut innan året stängs. I november finns fortfarande tid att påverka både skatt, likviditet och kvaliteten i bokslutet.",
    image: "/assets/blogg-thumb.webp",
    imageAlt:
      "Skatteplanering före årsskiftet: åtgärder som fortfarande går att påverka",
    metaTitle:
      "Skatteplanering inför årsskiftet 2026 för enskild firma och AB | Nordic Phoenix",
    metaDescription:
      "Planera skatt och resultat före årsskiftet. Se vad enskild firma och aktiebolag kan göra och vilka vanliga misstag du bör undvika.",
    blocks: [
      { type: "heading", text: "Börja med en trovärdig resultatprognos" },
      {
        type: "paragraph",
        text: "Ingen skatteplanering blir bättre än prognosen den bygger på. Bokför allt till och med senaste månaden, uppskatta återstående intäkter och kostnader och identifiera sådant som hör till året men ännu inte fakturerats eller bokförts.",
      },
      {
        type: "paragraph",
        text: "Gör gärna tre scenarier: försiktigt, troligt och starkt. Då ser du om en åtgärd är rimlig även om december blir bättre eller sämre än väntat.",
      },
      { type: "heading", text: "Justera preliminärskatten vid stor avvikelse" },
      {
        type: "paragraph",
        text: "Om årets resultat avviker tydligt från tidigare prognos kan en ny preliminär inkomstdeklaration ge mer rättvisande löpande skatt. En sänkning kan stärka likviditeten när resultatet fallit. En höjning kan minska risken för stor kvarskatt när året gått bättre.",
      },
      {
        type: "paragraph",
        text: "Detta är inte en skattesänkning. Det är en justering av när skatten betalas.",
      },
      {
        type: "heading",
        text: "För aktiebolag: se lön, pension och utdelning tillsammans",
      },
      {
        type: "paragraph",
        text: "Lön påverkar bolagets resultat, arbetsgivaravgifter, din privata skatt, pension och socialförsäkring. Den kan också påverka lönebaserat utrymme enligt 3:12-reglerna. Ett extra löneuttag bör därför räknas på, inte göras av gammal vana.",
      },
      {
        type: "paragraph",
        text: "Tjänstepension kan vara ett verktyg när bolaget har vinst och ägaren vill bygga långsiktig trygghet. Bolaget får normalt avdrag inom reglernas gränser och betalar särskild löneskatt på pensionskostnaden. Pengarna blir samtidigt bundna till pension.",
      },
      {
        type: "paragraph",
        text: "Utdelning beslutas normalt efter att årsredovisningen fastställts. Planeringen före årsskiftet handlar därför om att skapa korrekta underlag, inte om att bara föra över pengar.",
      },
      {
        type: "heading",
        text: "För enskild firma: använd rätt resultatutjämning",
      },
      {
        type: "paragraph",
        text: "Periodiseringsfond kan skjuta upp beskattning av en del av vinsten och jämna ut resultat mellan år. Fonden måste återföras senast enligt gällande tidsgräns och är därför inte en permanent skattefrihet.",
      },
      {
        type: "paragraph",
        text: "Expansionsfond kan göra det möjligt att behålla kapital i verksamheten med en beskattning som liknar bolagsskatt, men reglerna kräver beräkning av kapitalunderlaget. Positiv räntefördelning kan i vissa fall flytta en del av inkomsten från näringsverksamhet till kapital när du har ett positivt kapitalunderlag.",
      },
      {
        type: "paragraph",
        text: "De tre verktygen påverkar varandra. Det är sällan klokt att välja maximalt belopp i varje ruta utan en flerårsplan.",
      },
      { type: "heading", text: "Köp bara det verksamheten behöver" },
      {
        type: "paragraph",
        text: "Ett relevant inköp kan vara motiverat före årsskiftet om varan eller tjänsten behövs och rätt leveransperiod är uppfylld. Men en kostnad på 100 000 kronor sparar inte 100 000 kronor i skatt. Den minskar resultatet, vilket ger en skatteffekt som bara är en del av kostnaden.",
      },
      {
        type: "paragraph",
        text: "Inventarier kan dessutom behöva skrivas av över flera år. Betalningsdatumet avgör inte alltid vilket år kostnaden hör till.",
      },
      {
        type: "heading",
        text: "Gå igenom kundförluster och osäkra fordringar",
      },
      {
        type: "paragraph",
        text: "En gammal obetald faktura är inte automatiskt en avdragsgill kundförlust. Dokumentera påminnelser, kontaktförsök, eventuell inkassohantering och varför betalning bedöms osannolik. Moms och inkomstskatt kan ha olika krav på när en förlust får hanteras.",
      },
      {
        type: "paragraph",
        text: "Att städa kundreskontran förbättrar både bokslutet och försäljningsrutinerna.",
      },
      { type: "heading", text: "Undvik fem vanliga fel" },
      {
        type: "paragraph",
        text: "Blanda inte ihop privata kostnader med företagets. Bokför inte framtida kostnader i fel år bara för att betalningen görs nu. Ta inte utdelning utan formellt beslut och utdelningsbara medel. Maximera inte avsättningar utan att förstå framtida återföring. Vänta inte till sista bankdagen med löner, pensioner eller andra åtgärder som måste vara genomförda före årsskiftet.",
      },
    ],
    checklist: [
      "Uppdaterad bokföring och resultatprognos",
      "Preliminärskatt jämförd med prognosen",
      "Lön, pension och 3:12 analyserade tillsammans",
      "Periodiseringsfond, expansionsfond och räntefördelning bedömda",
      "Kundfordringar och kundförluster dokumenterade",
      "Investeringar baserade på behov, inte bara skatt",
      "Tydlig lista över åtgärder som måste ske före årsskiftet",
    ],
    faq: [
      {
        q: "Är skatteplanering samma sak som att betala så lite skatt som möjligt?",
        a: "Nej. Bra planering väger skatt mot likviditet, pension, risk och framtida år. Målet är rätt skatt vid rätt tid.",
      },
      {
        q: "Kan jag köpa en dator i december och dra av hela kostnaden?",
        a: "Det beror bland annat på värde, ekonomisk livslängd, leverans och hur tillgången ska klassificeras. Vissa inköp kan kostnadsföras direkt, andra ska skrivas av.",
      },
      {
        q: "När är det för sent att planera?",
        a: "När året och nödvändiga transaktioner redan är avslutade minskar handlingsutrymmet kraftigt. November är därför ofta en bra månad för genomgång.",
      },
    ],
    cta: "Boka en årsskiftesgenomgång där vi går igenom resultat, skatt och beslut som behöver tas innan kalendern slår om.",
  },
  {
    slug: "bokslut-checklista",
    tag: "Bokslut",
    date: "November 2026",
    published: "2026-11-01",
    readingMinutes: 4,
    title: "Bokslut utan panik: underlagen som sparar mest tid och pengar",
    titleLead: "Bokslut utan panik:",
    titleAccent: "underlagen som sparar mest tid och pengar",
    excerpt:
      "Förbered bokslutet utan stress. Här är en tydlig checklista för bank, fakturor, lager, periodiseringar, anläggningar och dokumentation.",
    intro:
      "Ett smidigt bokslut börjar inte när redovisningskonsulten öppnar bokslutsprogrammet. Det börjar när underlagen är kompletta, avstämda och möjliga att förstå. Den här checklistan hjälper dig att lämna över rätt material från början.",
    image: "/assets/blogg-thumb.webp",
    imageAlt: "Bokslut utan panik: underlagen som sparar mest tid och pengar",
    metaTitle:
      "Bokslut checklista 2026: förbered företaget steg för steg | Nordic Phoenix",
    metaDescription:
      "Förbered bokslutet utan stress. Här är en tydlig checklista för bank, fakturor, lager, periodiseringar, anläggningar och dokumentation.",
    blocks: [
      { type: "heading", text: "Stäm av bank och skattekonto" },
      {
        type: "paragraph",
        text: "Alla bankkonton ska stämmas av mot kontoutdrag per balansdagen. Detsamma gäller skattekontot. Saknas en transaktion, finns en dubbel bokning eller ligger betalningen på fel konto bör det rättas innan bokslutsarbetet fortsätter.",
      },
      {
        type: "paragraph",
        text: "Kontoutdraget är inte samma sak som bokföringen. Avstämningen visar att de två faktiskt överensstämmer.",
      },
      {
        type: "heading",
        text: "Säkerställ att alla intäkter hör till rätt år",
      },
      {
        type: "paragraph",
        text: "Fakturera utfört arbete som ska faktureras. Lista pågående arbeten, förskott från kunder och intäkter som avser flera perioder. En faktura i januari kan helt eller delvis höra till december om prestationen utfördes före årsskiftet.",
      },
      {
        type: "paragraph",
        text: "Dokumentera hur du bedömt färdigställandegrad och vilka underlag som finns. Gissningar utan underlag skapar både redovisningsrisk och svåra frågor vid en senare kontroll.",
      },
      {
        type: "heading",
        text: "Gå igenom leverantörsfakturor och upplupna kostnader",
      },
      {
        type: "paragraph",
        text: "Samla fakturor som kommit efter årsskiftet men avser det gamla året. Exempel är el, redovisning, bonus, frakt och konsultarbete. Kostnaden kan behöva tas upp även om fakturan ännu inte var mottagen på balansdagen.",
      },
      {
        type: "paragraph",
        text: "Förutbetalda kostnader fungerar tvärtom. En försäkring eller licens som betalats i förskott kan behöva delas mellan åren.",
      },
      { type: "heading", text: "Inventera lager på riktigt" },
      {
        type: "paragraph",
        text: "Företag med lager behöver normalt inventera per balansdagen eller på ett kontrollerat sätt nära balansdagen. Räkna antal, bedöm skador och inkurans och dokumentera vem som inventerat och hur värdet beräknats.",
      },
      {
        type: "paragraph",
        text: "Ett lager som inte går att sälja till normalt pris ska inte automatiskt ligga kvar till full kostnad. Samtidigt får en allmän känsla av att lagret är gammalt inte ersätta en saklig bedömning.",
      },
      {
        type: "heading",
        text: "Kontrollera inventarier och anläggningstillgångar",
      },
      {
        type: "paragraph",
        text: "Jämför anläggningsregistret med vad som faktiskt finns. Har något sålts, kasserats eller slutat användas? Finns nyinköp som bokförts som kostnad men borde vara tillgång, eller små inköp som felaktigt lagts upp för avskrivning?",
      },
      {
        type: "paragraph",
        text: "Spara köpehandlingar, finansieringsavtal och information om när tillgången togs i bruk.",
      },
      {
        type: "heading",
        text: "Dokumentera lån, ägartillskott och privata transaktioner",
      },
      {
        type: "paragraph",
        text: "I aktiebolag behöver saldon mot ägare och närstående vara särskilt tydliga. Underlag ska visa om en betalning är lön, utlägg, lån, återbetalning eller något annat. Förbjudna lån och otillåtna värdeöverföringar kan få allvarliga följder.",
      },
      {
        type: "paragraph",
        text: "I enskild firma ska privata insättningar och uttag bokföras korrekt mot eget kapital. De ska inte blandas ihop med intäkter och kostnader.",
      },
      {
        type: "heading",
        text: "Skapa en bokslutsmapp som någon annan kan förstå",
      },
      {
        type: "paragraph",
        text: "Dela upp materialet i bank, skatt, kundfordringar, leverantörsskulder, lager, anläggningar, lån, personal och avtal. Namnge filer med datum och innehåll. Lägg en kort kommentar vid ovanliga poster.",
      },
      {
        type: "paragraph",
        text: "En bra mappstruktur minskar frågor och gör bokslutet billigare. Den hjälper också dig själv när samma fråga dyker upp ett år senare.",
      },
      { type: "heading", text: "Aktiebolagets sista steg" },
      {
        type: "paragraph",
        text: "Efter bokslutet ska aktiebolaget upprätta årsredovisning, hålla årsstämma och lämna in årsredovisningen till Bolagsverket inom gällande tid. Inkomstdeklaration 2 lämnas separat till Skatteverket. Bokslut, årsredovisning och deklaration är alltså olika delar av samma årsavslut.",
      },
      {
        type: "paragraph",
        text: "Enskilda firmor upprättar normalt årsbokslut eller förenklat årsbokslut och redovisar verksamheten i NE-bilagan tillsammans med den privata deklarationen.",
      },
    ],
    checklist: [
      "Bankkonton och skattekonto avstämda",
      "Alla kundfakturor och pågående arbeten listade",
      "Leverantörsfakturor och upplupna kostnader kompletta",
      "Förutbetalda kostnader identifierade",
      "Lager inventerat och värderat",
      "Anläggningsregister uppdaterat",
      "Lån och ägartransaktioner dokumenterade",
      "Semesterlön, bonus och andra personalskulder kontrollerade",
      "Avtal och ovanliga händelser sammanställda",
      "Bokslutsmapp strukturerad och delad",
    ],
    faq: [
      {
        q: "Vad kostar ett dåligt förberett bokslut?",
        a: "Kostnaden syns ofta som fler konsulttimmar, fler frågor, större risk för fel och senare beslut. Exakt belopp varierar, men god ordning är nästan alltid billigare.",
      },
      {
        q: "Måste alla små belopp periodiseras?",
        a: "Regelverk och väsentlighet påverkar bedömningen. Små företag behöver inte alltid periodisera varje mindre belopp, men principen ska användas konsekvent och korrekt.",
      },
      {
        q: "Är årsredovisning och deklaration samma sak?",
        a: "Nej. Årsredovisningen beskriver bolagets ekonomi enligt redovisningsregler och lämnas till Bolagsverket. Inkomstdeklarationen beräknar skatt och lämnas till Skatteverket.",
      },
    ],
    cta: "Ladda ned checklistan, samla underlagen och boka en genomgång innan materialet lämnas över. Ett väl förberett bokslut ger bättre beslut, inte bara snabbare administration.",
  },
  {
    slug: "k2-k3-nya-regler-2026",
    tag: "Regelverk",
    date: "December 2026",
    published: "2026-12-01",
    readingMinutes: 4,
    title:
      "K2 och K3 efter regeländringarna: kontrollera vilket regelverk företaget får använda",
    titleLead: "K2 och K3 efter regeländringarna:",
    titleAccent: "kontrollera vilket regelverk företaget får använda",
    excerpt:
      "Nya K2- och K3-regler gäller för räkenskapsår som börjar efter 2025. Se vilka företag som påverkas och vad övergången kräver.",
    intro:
      "För räkenskapsår som inleds efter den 31 december 2025 gäller ändringar i K2 och K3. För många små aktiebolag handlar det om förtydliganden. För vissa företag innebär ändringarna att K2 inte längre får användas och att övergången till K3 kräver arbete långt före årsredovisningen.",
    image: "/assets/blogg-thumb.webp",
    imageAlt:
      "K2 och K3 efter regeländringarna: kontrollera vilket regelverk företaget får använda",
    metaTitle:
      "K2 och K3 2026: nya regler för årsredovisning förklarade | Nordic Phoenix",
    metaDescription:
      "Nya K2- och K3-regler gäller för räkenskapsår som börjar efter 2025. Se vilka företag som påverkas och vad övergången kräver.",
    blocks: [
      { type: "heading", text: "Vad är K2 och K3?" },
      {
        type: "paragraph",
        text: "K2 är ett förenklat regelverk för årsredovisning i mindre företag. K3 är huvudregelverket och bygger i större utsträckning på bedömningar, komponentindelning och mer omfattande upplysningar. Ett mindre företag kan ofta välja K3 frivilligt, men får bara använda K2 om det ryms inom K2:s tillämpningsområde.",
      },
      {
        type: "paragraph",
        text: "Valet påverkar inte bara årsredovisningens utseende. Det kan påverka när intäkter redovisas, hur tillgångar skrivs av, vilka upplysningar som lämnas och hur jämförelser görs över tid.",
      },
      { type: "heading", text: "Vilka kan behöva lämna K2?" },
      {
        type: "paragraph",
        text: "Bostadsrättsföreningar och bostadsföreningar ska tillämpa K3 för räkenskapsår som inleds efter den 31 december 2025. Även vissa företag med byggnader som normalt genererar minst 75 procent av nettoomsättningen kan behöva byta till K3. Detsamma kan gälla företag med en väsentlig uppskjuten skatteskuld, med vissa lättnadsregler för mycket små företag.",
      },
      {
        type: "paragraph",
        text: "Bedömningen ska göras utifrån företagets faktiska förhållanden. Det räcker inte att utgå från att bolaget alltid har använt K2 tidigare.",
      },
      {
        type: "heading",
        text: "Enskild firma påverkas normalt inte av K2 årsredovisning",
      },
      {
        type: "paragraph",
        text: "Enskilda näringsidkare upprättar normalt årsbokslut och använder K1 eller vägledningen Årsbokslut. De omfattas därför inte av ändringarna i K2 Årsredovisning. En enskild näringsidkare som frivilligt upprättar årsredovisning får däremot inte använda K2 utan ska använda K3.",
      },
      {
        type: "paragraph",
        text: "Det är viktigt att skilja på K2 Årsredovisning och reglerna för årsbokslut. Namnen liknar varandra men tillämpningsområdena är olika.",
      },
      { type: "heading", text: "Varför övergången kan bli omfattande" },
      {
        type: "paragraph",
        text: "I K3 kan en byggnad behöva delas upp i betydande komponenter med olika nyttjandeperioder, till exempel stomme, tak, installationer och fasad. Det påverkar framtida avskrivningar och kräver ett underlag för fördelning av värden.",
      },
      {
        type: "paragraph",
        text: "Vid första tillämpningen behöver företaget också bedöma ingångsbalans, jämförelsetal och särskilda upplysningar. Historiska uppgifter kan behöva tas fram. Därför är det riskabelt att vänta tills årsredovisningen ska signeras.",
      },
      { type: "heading", text: "Andra förändringar i K2 och K3" },
      {
        type: "paragraph",
        text: "Ändringarna innehåller även förtydliganden om bland annat byten av varor och tjänster, vissa värderingsfrågor och presentation. I K2 ska en inkomst eller utgift redovisas vid alla typer av byten av tillgångar eller tjänster när de nya reglerna tillämpas. Tidigare fanns ett undantag för vissa likartade byten.",
      },
      {
        type: "paragraph",
        text: "För de flesta vanliga konsult- och handelsbolag innebär detta inte ett dramatiskt systembyte, men redovisningsprinciperna och mallarna bör ändå uppdateras.",
      },
      { type: "heading", text: "Så förbereder du företaget" },
      {
        type: "paragraph",
        text: "Bekräfta vilket regelverk som användes senast. Bedöm om verksamheten eller balansräkningen gör att K2 inte längre är tillåtet. Identifiera byggnader, uppskjuten skatt, större projekt och andra områden som påverkas. Ta fram historiska anskaffningsvärden och underhållsplaner. Bestäm ansvar och tidplan för övergången.",
      },
      {
        type: "paragraph",
        text: "Informera styrelsen tidigt. Regelverksvalet är inte bara en teknisk fråga för redovisningskonsulten. Det påverkar rapporterade resultat och nyckeltal som styrelse, bank och ägare använder.",
      },
      { type: "heading", text: "Tänk på kommunikationen" },
      {
        type: "paragraph",
        text: "När avskrivningar eller presentation förändras kan resultatet se annorlunda ut utan att kassaflödet har ändrats. Förklara därför effekterna i styrelserapporter och bankdialog. Annars kan en redovisningsteknisk förändring misstolkas som försämrad drift.",
      },
    ],
    checklist: [
      "Vilket regelverk användes föregående år?",
      "Får företaget fortfarande använda K2?",
      "Finns byggnader som står för minst 75 procent av nettoomsättningen?",
      "Finns en väsentlig uppskjuten skatteskuld?",
      "Behövs komponentindelning och historiska underlag?",
      "Hur påverkas avskrivningar, resultat och nyckeltal?",
      "Är styrelse, bank och ägare informerade?",
    ],
    faq: [
      {
        q: "Måste alla små aktiebolag byta till K3?",
        a: "Nej. Många mindre aktiebolag får fortsätta använda K2, men tillämpningsområdet och företagets förhållanden måste kontrolleras.",
      },
      {
        q: "Kan ett företag välja K3 frivilligt?",
        a: "Ja, K3 kan ofta väljas även när K2 är tillåtet. Valet bör göras med hänsyn till verksamhet, finansiering, tillgångar och framtida planer.",
      },
      {
        q: "Påverkas enskild firma?",
        a: "Normalt inte av ändringarna i K2 Årsredovisning, eftersom enskilda firmor vanligtvis använder K1 eller reglerna för årsbokslut.",
      },
    ],
    cta: "Osäker på om ditt företag fortfarande får använda K2? Vi gör en regelverksbedömning och en konkret övergångsplan där det behövs.",
  },
  {
    slug: "anstalla-forsta-medarbetaren-vaxa-stod",
    tag: "Lön",
    date: "Januari 2027",
    published: "2027-01-01",
    readingMinutes: 4,
    title:
      "Anställa första eller andra medarbetaren: räkna på hela kostnaden och sök stödet rätt",
    titleLead: "Anställa första eller andra medarbetaren:",
    titleAccent: "räkna på hela kostnaden och sök stödet rätt",
    excerpt:
      "Ska du anställa? Räkna på totalkostnaden, förstå Växa-stöd och de tillfälligt sänkta arbetsgivaravgifterna för unga till september 2027.",
    intro:
      "Den första anställningen är ofta ett större ekonomiskt beslut än den första stora kunden. Lönen är bara en del av kostnaden. Samtidigt finns stöd som kan minska arbetsgivaravgifterna om företaget och anställningen uppfyller villkoren.",
    image: "/assets/blogg-thumb.webp",
    imageAlt:
      "Anställa första eller andra medarbetaren: räkna på hela kostnaden och sök stödet rätt",
    metaTitle:
      "Anställa första medarbetaren 2027: kostnad, Växa-stöd och regler | Nordic Phoenix",
    metaDescription:
      "Ska du anställa? Räkna på totalkostnaden, förstå Växa-stöd och de tillfälligt sänkta arbetsgivaravgifterna för unga till september 2027.",
    blocks: [
      { type: "heading", text: "Räkna på mer än bruttolönen" },
      {
        type: "paragraph",
        text: "Utöver bruttolönen behöver budgeten normalt omfatta arbetsgivaravgifter, semesterlön eller semesterersättning, försäkringar, pension enligt avtal eller policy, utrustning, program, arbetsplats och tid för introduktion. Sjukfrånvaro och perioder med lägre beläggning bör också finnas med i kalkylen.",
      },
      {
        type: "paragraph",
        text: "En anställd med 30 000 kronor i lön kostar alltså inte 30 000 kronor. Den exakta totalkostnaden beror på ålder, kollektivavtal, pension och övriga villkor.",
      },
      {
        type: "heading",
        text: "Växa-stöd kan gälla för första och andra anställda",
      },
      {
        type: "paragraph",
        text: "Ett växa-företag kan få stöd i upp till 24 kalendermånader i följd för den första och i vissa fall den andra anställda. För anställningar som påbörjats efter den 30 april 2024 kan återbetalning normalt beräknas på ersättning upp till 35 000 kronor per månad, med undantag för ålderspensionsavgiften.",
      },
      {
        type: "paragraph",
        text: "Från redovisningsperioden januari 2026 redovisar arbetsgivaren fulla arbetsgivaravgifter i arbetsgivardeklarationen och ansöker sedan om återbetalning. Stödet kommer alltså inte automatiskt genom en lägre rad i deklarationen.",
      },
      {
        type: "heading",
        text: "Kontrollera att företaget verkligen är ett växa-företag",
      },
      {
        type: "paragraph",
        text: "Villkoren beror bland annat på hur många anställda företaget haft sedan den 1 januari 2024, när anställningen började, arbetstid, anställningstid och relationen mellan den anställde och ägaren. Delägare och vissa närstående omfattas inte på samma sätt.",
      },
      {
        type: "paragraph",
        text: "Stödet är också ett stöd av mindre betydelse enligt EU-regler. Företaget måste lämna uppgifter om andra sådana stöd och verksamhetsområde i ansökan.",
      },
      { type: "heading", text: "Tillfälligt lägre arbetsgivaravgift för unga" },
      {
        type: "paragraph",
        text: "Under perioden 1 april 2026 till 30 september 2027 gäller tillfälligt nedsatta arbetsgivaravgifter för 19 till 23-åringar. Under 2026 var avgiften 20,81 procent på ersättning upp till 25 000 kronor per månad för de födelseår som omfattades. Vilka födelseår som gäller 2027 följer åldersintervallet och ska kontrolleras vid lönekörningen.",
      },
      {
        type: "paragraph",
        text: "Regler om flera nedsättningar kan påverka vilken lättnad som får användas. Lönesystemet och ansökan måste därför stämma med Skatteverkets aktuella instruktioner.",
      },
      { type: "heading", text: "Anställ inte för att ett stöd finns" },
      {
        type: "paragraph",
        text: "Ett stöd kan förbättra kalkylen men ska inte bära hela beslutet. Ställ tre frågor: finns stabil efterfrågan, kan rollen skapa mer värde än sin totalkostnad och har företaget likviditet för minst sex månader även om försäljningen blir svagare än planerat?",
      },
      {
        type: "paragraph",
        text: "Planera också vad medarbetaren ska sluta göra åt dig. En otydlig roll skapar ofta hög kostnad utan att frigöra ägarens tid.",
      },
      { type: "heading", text: "Bygg rutinen innan första lönen" },
      {
        type: "paragraph",
        text: "Registrera företaget som arbetsgivare, skriv anställningsavtal, samla skatteuppgifter, bestäm lönedatum, tidrapportering och hantering av utlägg. Säkerställ arbetsmiljö, försäkringar och eventuell tjänstepension. Skapa en lönekalender för arbetsgivardeklaration och betalning.",
      },
      {
        type: "paragraph",
        text: "En tydlig process minskar risken för sena deklarationer, felaktiga förmåner och missade stöd.",
      },
      { type: "heading", text: "Följ upp efter tre månader" },
      {
        type: "paragraph",
        text: "Jämför faktisk kostnad med kalkyl. Mät leverans, intäkt, frigjord tid och kundpåverkan. Om utfallet avviker ska arbetssätt, prissättning eller roll justeras tidigt. Anställningen är en investering som behöver följas upp som andra investeringar.",
      },
    ],
    checklist: [
      "Total personalkostnad beräknad",
      "Likviditet för minst sex månader testad",
      "Villkor för Växa-stöd kontrollerade",
      "Ansökningsprocess för återbetalning planerad",
      "Tillfällig ungdomsnedsättning kontrollerad",
      "Anställningsavtal, försäkring och pension klara",
      "Lönerutin och arbetsgivardeklaration testade",
      "Mål för de första tre månaderna dokumenterade",
    ],
    faq: [
      {
        q: "Får jag Växa-stöd automatiskt?",
        a: "Nej. Från redovisningsperioden januari 2026 redovisas fulla avgifter och arbetsgivaren ansöker om återbetalning om villkoren är uppfyllda.",
      },
      {
        q: "Kan jag få stöd för en närstående?",
        a: "Reglerna begränsar stöd för delägare och närstående. Relation, ägarbild och företagets historik måste kontrolleras.",
      },
      {
        q: "Hur länge gäller den sänkta avgiften för unga?",
        a: "Den tillfälliga nedsättningen gäller för ersättning som betalas ut till och med den 30 september 2027, för personer som omfattas av åldersvillkoren.",
      },
    ],
    cta: "Låt oss räkna på den verkliga kostnaden och kontrollera stödvillkoren innan anställningsavtalet skrivs.",
  },
  {
    slug: "deklaration-enskild-firma-aktiebolag",
    tag: "Deklaration",
    date: "Februari 2027",
    published: "2027-02-01",
    readingMinutes: 4,
    title:
      "Deklaration för enskild firma och aktiebolag: tre dokument som ofta blandas ihop",
    titleLead: "Deklaration för enskild firma och aktiebolag:",
    titleAccent: "tre dokument som ofta blandas ihop",
    excerpt:
      "Förstå skillnaden mellan NE-bilaga, Inkomstdeklaration 2 och K10. Guide för enskild firma och aktiebolag inför deklarationen.",
    intro:
      "Många företagare säger att de ska lämna företagets deklaration, men menar olika saker. Enskild firma redovisas i ägarens privata deklaration. Aktiebolaget lämnar en egen deklaration. Delägaren kan dessutom behöva lämna K10. Här reder vi ut vem som lämnar vad.",
    image: "/assets/blogg-thumb.webp",
    imageAlt:
      "Deklaration för enskild firma och aktiebolag: tre dokument som ofta blandas ihop",
    metaTitle:
      "Deklaration för enskild firma och aktiebolag: skillnaderna | Nordic Phoenix",
    metaDescription:
      "Förstå skillnaden mellan NE-bilaga, Inkomstdeklaration 2 och K10. Guide för enskild firma och aktiebolag inför deklarationen.",
    blocks: [
      {
        type: "heading",
        text: "Enskild firma: resultatet hamnar i din privata deklaration",
      },
      {
        type: "paragraph",
        text: "En enskild firma är inte en egen juridisk person. Verksamhetens resultat redovisas därför i en NE-bilaga som hör till din Inkomstdeklaration 1. Resultatet påverkas av bokslutet och skattemässiga justeringar, till exempel periodiseringsfond, expansionsfond, räntefördelning och egenavgifter.",
      },
      {
        type: "paragraph",
        text: "Egna uttag är inte lön och ska inte dras av som kostnad. Det är överskottet, inte uttagen, som ligger till grund för beskattningen.",
      },
      {
        type: "heading",
        text: "Aktiebolag: bolaget lämnar Inkomstdeklaration 2",
      },
      {
        type: "paragraph",
        text: "Ett aktiebolag är en egen juridisk person och lämnar Inkomstdeklaration 2. Deklarationen utgår från bokföringen och årsredovisningen men innehåller skattemässiga justeringar. Bokföringsmässigt resultat och skattemässigt resultat kan därför skilja sig.",
      },
      {
        type: "paragraph",
        text: "Exempel är ej avdragsgilla kostnader, skattefria intäkter, skattemässiga avskrivningar och periodiseringsfonder. Bolagsskatten är 20,6 procent på det skattemässiga resultatet.",
      },
      { type: "heading", text: "Ägaren deklarerar lön och utdelning privat" },
      {
        type: "paragraph",
        text: "Lön från aktiebolaget finns normalt förifylld i ägarens privata deklaration genom arbetsgivardeklarationerna. Utdelning på kvalificerade aktier redovisas normalt på K10. K10 beräknar hur utdelning eller kapitalvinst fördelas mellan kapital och tjänst enligt 3:12-reglerna.",
      },
      {
        type: "paragraph",
        text: "Från inkomstår 2026 används den nya beräkningsmodellen för gränsbelopp. Det gör K10 inför deklarationen 2027 särskilt viktig att kontrollera.",
      },
      { type: "heading", text: "Årsredovisningen är inte deklarationen" },
      {
        type: "paragraph",
        text: "Årsredovisningen lämnas till Bolagsverket och blir offentlig. Den följer årsredovisningslagen och valt K-regelverk. Inkomstdeklarationen lämnas till Skatteverket och beräknar beskattningen. Beloppen hänger ihop men dokumenten har olika syfte och kan innehålla olika presentation.",
      },
      {
        type: "paragraph",
        text: "En årsredovisning kan vara inlämnad utan att deklarationen är klar, och tvärtom. Båda tidsfristerna måste bevakas.",
      },
      { type: "heading", text: "Underlag du bör samla" },
      {
        type: "paragraph",
        text: "Se till att bokslutet är färdigt och att specifikationer finns för skatt, periodiseringsfonder, anläggningar, lån och eget kapital. Enskilda näringsidkare behöver underlag för kapitalunderlag, egenavgifter och eventuella fonder. Delägare i fåmansbolag behöver ägaruppgifter, löneunderlag, omkostnadsbelopp och tidigare K10.",
      },
      {
        type: "paragraph",
        text: "Kontrollera även kontrolluppgifter och förifyllda belopp. Förifyllt betyder inte alltid korrekt.",
      },
      { type: "heading", text: "Fem vanliga deklarationsfel" },
      {
        type: "paragraph",
        text: "Första felet är att behandla egna uttag i enskild firma som lön. Det andra är att glömma återföring av tidigare fonder. Det tredje är att använda fel momssats eller period i bokföringen och låta felet följa med in i bokslutet. Det fjärde är att inte lämna K10 år utan utdelning. Det femte är att tro att ett bokfört avdrag automatiskt är skattemässigt avdragsgillt.",
      },
      {
        type: "paragraph",
        text: "Ett sjätte, vanligt praktiskt fel är att börja deklarera innan bokslutet är slutligt avstämt.",
      },
      { type: "heading", text: "Arbeta i rätt ordning" },
      {
        type: "paragraph",
        text: "Färdigställ löpande bokföring. Gör bokslut och avstämningar. Upprätta årsredovisning om företagsformen kräver det. Beräkna skattemässiga justeringar. Kontrollera ägarens K10 och privata uppgifter. Lämna dokumenten i rätt e-tjänst och spara kvittenser och underlag.",
      },
      {
        type: "paragraph",
        text: "Den ordningen minskar risken att en sen ändring i bokslutet inte slår igenom i deklarationen.",
      },
    ],
    checklist: [
      "Bokslut färdigt och avstämt",
      "Rätt deklaration för företagsformen",
      "NE-bilaga för enskild firma",
      "Inkomstdeklaration 2 för aktiebolag",
      "K10 för kvalificerade aktier",
      "Tidigare fonder och sparade utrymmen kontrollerade",
      "Förifyllda belopp verifierade",
      "Inlämningskvittenser sparade",
    ],
    faq: [
      {
        q: "Deklarerar enskild firma separat?",
        a: "Nej. Resultatet redovisas i NE-bilagan som en del av ägarens privata Inkomstdeklaration 1.",
      },
      {
        q: "Måste ett aktiebolag lämna årsredovisning även utan verksamhet?",
        a: "Ja, ett registrerat aktiebolag ska normalt upprätta och lämna årsredovisning även om aktiviteten varit liten eller obefintlig.",
      },
      {
        q: "Vad händer om jag inte lämnar K10?",
        a: "Du kan få svårare att visa korrekt sparat utdelningsutrymme. Skatteverket rekommenderar normalt att K10 lämnas varje år för kvalificerade aktier.",
      },
    ],
    cta: "Behöver du hjälp att få bokslut, deklaration och K10 att stämma ihop? Vi tar ansvar för hela kedjan och förklarar resultatet på vanlig svenska.",
  },
  {
    slug: "avdrag-foretag-vanliga-fel",
    tag: "Avdrag",
    date: "Mars 2027",
    published: "2027-03-01",
    readingMinutes: 4,
    title: "Avdrag som företagare ofta missar eller gör fel på",
    titleLead: "Avdrag som företagare",
    titleAccent: "ofta missar eller gör fel på",
    excerpt:
      "Vilka kostnader får företaget dra av? Vi förklarar hemmakontor, telefon, bil, utbildning och representation utan vanliga missförstånd.",
    intro:
      "Grundregeln låter enkel: en kostnad ska ha samband med verksamheten för att vara avdragsgill. Det svåra är gränsen mellan företagets behov och privat nytta. Här är fem områden där kvittot i sig inte alltid räcker.",
    image: "/assets/blogg-thumb.webp",
    imageAlt: "Avdrag som företagare ofta missar eller gör fel på",
    metaTitle:
      "Avdrag för företag 2027: kostnader som ofta blir fel | Nordic Phoenix",
    metaDescription:
      "Vilka kostnader får företaget dra av? Vi förklarar hemmakontor, telefon, bil, utbildning och representation utan vanliga missförstånd.",
    blocks: [
      { type: "heading", text: "Hemmakontor" },
      {
        type: "paragraph",
        text: "Att arbeta hemma innebär inte automatiskt att hela bostaden eller en del av hyran är avdragsgill. Reglerna skiljer sig mellan enskild firma och aktiebolag, och kraven på en särskilt inrättad arbetsplats kan vara höga.",
      },
      {
        type: "paragraph",
        text: "I aktiebolag kan hyra från ägaren till bolaget vara möjlig i vissa fall, men det kräver ett verkligt behov, marknadsmässig ersättning och tydlig avgränsning. Felaktig hyra kan i stället behandlas som lön eller utdelning. I enskild firma finns schablonregler och andra krav beroende på lokalens utformning och arbetstid. Dokumentera yta, användning och beräkning.",
      },
      { type: "heading", text: "Telefon, internet och dator" },
      {
        type: "paragraph",
        text: "En dator som huvudsakligen behövs i verksamheten är normalt en företagskostnad. Privat användning kan påverka bedömningen, särskilt när utrustningen saknar tydlig koppling till arbetet. Telefon och internet behöver fördelas eller hanteras enligt reglerna om tjänst och förmån beroende på företagsform och upplägg.",
      },
      {
        type: "paragraph",
        text: "Undvik att bokföra hela familjens abonnemang som företagskostnad bara för att ett nummer används i arbetet.",
      },
      { type: "heading", text: "Bil och resor" },
      {
        type: "paragraph",
        text: "Skilj mellan tjänsteresor och resor mellan bostad och verksamhetslokal eller arbetsplats. Reglerna och beloppen är olika. För enskilda näringsidkare höjdes beloppsgränsen för avdrag för resor mellan bostaden och verksamhetslokalen till 15 000 kronor från inkomstår 2026.",
      },
      {
        type: "paragraph",
        text: "Använder du privat bil i tjänsten ska körjournalen visa datum, syfte, sträcka och destination. I aktiebolag kan bolagsägd bil skapa bilförmån om privat användning inte är ringa. En ofullständig körjournal gör det svårt att bevisa omfattningen.",
      },
      { type: "heading", text: "Utbildning och kompetensutveckling" },
      {
        type: "paragraph",
        text: "Utbildning som uppdaterar eller fördjupar kunskap i en redan bedriven verksamhet kan ofta vara avdragsgill. Utbildning som ger kompetens för en helt ny verksamhet eller ett nytt yrke bedöms ofta annorlunda.",
      },
      {
        type: "paragraph",
        text: "Beskriv därför kopplingen till nuvarande intäkter och arbetsuppgifter. Ett kurskvitto utan affärsmässig förklaring är ett svagare underlag.",
      },
      { type: "heading", text: "Representation och kundaktiviteter" },
      {
        type: "paragraph",
        text: "Representation kräver ett omedelbart samband med verksamheten, till exempel en affärsförhandling eller personalaktivitet. Anteckna datum, deltagare, företag och syfte. Avdraget för själva måltidskostnaden vid inkomstbeskattningen är begränsat, medan avdrag för ingående moms kan finnas inom särskilda ramar.",
      },
      {
        type: "paragraph",
        text: "Från den 1 april 2026 är momsen på livsmedel 6 procent medan restaurangtjänster fortsatt har 12 procent. Det kan påverka momsberäkningen när inköpet är mat utan restaurangtjänst, exempelvis viss hämtmat.",
      },
      { type: "heading", text: "Arbetskläder" },
      {
        type: "paragraph",
        text: "Vanliga kläder blir normalt inte avdragsgilla bara för att de används i arbetet eller har en viss färg. Skyddskläder, uniformsliknande plagg och kläder med tydlig och permanent företagsprofil kan bedömas annorlunda.",
      },
      {
        type: "paragraph",
        text: "Fråga om plagget rimligen kan användas privat. En kostym för kundmöten har vanligtvis privat användbarhet, även om den bara råkar användas på arbetstid.",
      },
      { type: "heading", text: "Så dokumenterar du ett avdrag" },
      {
        type: "paragraph",
        text: "Spara kvitto eller faktura i rätt format. Skriv syftet när det inte framgår. Lägg till deltagare, resmål, körjournal eller beräkning när det behövs. För större eller ovanliga kostnader bör ett beslut eller avtal sparas tillsammans med underlaget.",
      },
      {
        type: "paragraph",
        text: "Den bästa frågan är inte bara om kostnaden går att bokföra. Fråga om du kan förklara den sakligt för någon som inte känner verksamheten.",
      },
    ],
    checklist: [
      "Tydligt samband med verksamhetens intäkter",
      "Privat nytta bedömd och dokumenterad",
      "Rätt företagsform och regel tillämpad",
      "Kvitto eller faktura sparad i korrekt format",
      "Syfte, deltagare eller körjournal bifogad",
      "Moms bedömd separat från inkomstskatt",
      "Ovanliga kostnader godkända och dokumenterade",
    ],
    faq: [
      {
        q: "Får jag dra av allt som har företagets namn på fakturan?",
        a: "Nej. Fakturamottagaren är bara en del av bedömningen. Kostnaden måste också vara affärsmässig och ha tillräckligt samband med verksamheten.",
      },
      {
        q: "Är en kostnad avdragsgill om redovisningsprogrammet föreslår ett konto?",
        a: "Inte automatiskt. Kontoförslaget avgör inte den skatterättsliga bedömningen.",
      },
      {
        q: "Kan samma kostnad vara avdragsgill men utan momsavdrag?",
        a: "Ja. Reglerna för inkomstskatt och moms är separata, och utfallet kan därför skilja sig.",
      },
    ],
    cta: "Har du återkommande kostnader som känns osäkra? Vi kan skapa en avdragspolicy för företaget så att besluten blir konsekventa och underlagen kompletta.",
  },
  {
    slug: "moms-for-smaforetag",
    tag: "Moms",
    date: "April 2027",
    published: "2027-04-01",
    readingMinutes: 4,
    title: "Moms utan gissningar: fem situationer där små fel blir stora",
    titleLead: "Moms utan gissningar:",
    titleAccent: "fem situationer där små fel blir stora",
    excerpt:
      "Lär dig när du ska använda 25, 12 eller 6 procent moms, hur momsbefrielse fungerar och vad som gäller vid EU-handel och förskott.",
    intro:
      "Moms är inte företagets intäkt eller kostnad i normalfallet. Företaget samlar in utgående moms och får dra av ingående moms när villkoren är uppfyllda. Problemet är att fel momssats eller fel period kan påverka många transaktioner innan någon upptäcker det.",
    image: "/assets/blogg-thumb.webp",
    imageAlt: "Moms utan gissningar: fem situationer där små fel blir stora",
    metaTitle:
      "Moms för småföretag: 25, 12 eller 6 procent och vanliga fel | Nordic Phoenix",
    metaDescription:
      "Lär dig när du ska använda 25, 12 eller 6 procent moms, hur momsbefrielse fungerar och vad som gäller vid EU-handel och förskott.",
    blocks: [
      { type: "heading", text: "Välj momssats utifrån det du faktiskt säljer" },
      {
        type: "paragraph",
        text: "Den generella momssatsen är 25 procent. Tolv procent gäller bland annat hotell och restaurangtjänster. Sex procent gäller bland annat böcker, persontransporter och, från den 1 april 2026, livsmedel. Den tillfälliga sänkningen av livsmedelsmomsen gäller till och med den 31 december 2027.",
      },
      {
        type: "paragraph",
        text: "För företag som säljer både hämtmat och servering kan samma maträtt omfattas av olika momssats beroende på vad kunden faktiskt får. Hämtmat kan vara livsmedel med 6 procent medan servering med stödtjänster är restaurangtjänst med 12 procent.",
      },
      { type: "heading", text: "Momsbefrielse är enkel men inte alltid bäst" },
      {
        type: "paragraph",
        text: "Företag med beskattningsunderlag på högst 120 000 kronor kan under vissa villkor vara undantagna från momsplikt. Då tar företaget inte ut moms och lämnar normalt inte momsdeklaration för den försäljningen. Samtidigt försvinner normalt rätten att dra av ingående moms på inköp.",
      },
      {
        type: "paragraph",
        text: "För en tjänsteverksamhet med få inköp kan undantaget vara administrativt attraktivt. För ett företag som investerar mycket eller säljer till momspliktiga företagskunder kan frivillig momsregistrering vara bättre. Beslutet bör därför baseras på kundtyp, priser och inköp, inte bara på mindre administration.",
      },
      {
        type: "heading",
        text: "Förskott och presentkort kan flytta momstidpunkten",
      },
      {
        type: "paragraph",
        text: "Moms ska redovisas i rätt period. Förskottsbetalningar kan utlösa moms innan slutleveransen. Presentkort behandlas olika beroende på om momssats och beskattningsland är kända när kortet säljs.",
      },
      {
        type: "paragraph",
        text: "Bygg rutinen i sälj- och betalsystemet. Manuell rättning av hundratals transaktioner blir snabbt dyr.",
      },
      { type: "heading", text: "EU-handel kräver rätt kunduppgifter" },
      {
        type: "paragraph",
        text: "Vid försäljning av tjänster till ett momsregistrerat företag i ett annat EU-land gäller ofta omvänd betalningsskyldighet. Då fakturerar säljaren normalt utan svensk moms, men behöver kontrollera kundens VAT-nummer, ange rätt text på fakturan och i vissa fall lämna periodisk sammanställning.",
      },
      {
        type: "paragraph",
        text: "Vid inköp från utlandet kan företaget behöva beräkna svensk moms själv i momsdeklarationen. Det gäller även när leverantörsfakturan saknar moms. Utan rutin är det lätt att bara bokföra nettobeloppet och missa redovisningen.",
      },
      {
        type: "heading",
        text: "Kreditfakturor ska spegla den ursprungliga affären",
      },
      {
        type: "paragraph",
        text: "En kreditfaktura ska hänvisa till ursprungsfakturan och använda rätt momssats. Om en vara returneras efter en momsförändring är det normalt den ursprungliga försäljningen som styr rättelsen, inte den momssats som gäller den dag krediten skapas.",
      },
      {
        type: "paragraph",
        text: "Rätt period och rätt referens gör att kundens och säljarens moms kan stämmas av.",
      },
      { type: "heading", text: "Nya kontrollregler från juli 2026" },
      {
        type: "paragraph",
        text: "Från den 1 juli 2026 fick Skatteverket större möjligheter att kontrollera momsregistrering och i vissa fall neka, avregistrera eller markera ett VAT-nummer som ogiltigt. Företag behöver därför hålla registreringsuppgifter, verksamhetsbeskrivning och kontaktuppgifter aktuella och kunna visa verklig ekonomisk aktivitet.",
      },
      {
        type: "paragraph",
        text: "Detta är särskilt viktigt för nystartade företag och bolag med stora momsfordringar i förhållande till försäljningen.",
      },
      { type: "heading", text: "Gör en enkel momsrevision varje kvartal" },
      {
        type: "paragraph",
        text: "Välj ett urval av försäljningsfakturor, inköp, kreditfakturor och utlandstransaktioner. Kontrollera momssats, datum, kundland, VAT-nummer och bokföringskonto. Stäm momsrapporten mot huvudboken och skattekontot.",
      },
      {
        type: "paragraph",
        text: "En kvartalsvis kontroll hittar systemfel innan de hinner påverka ett helt år.",
      },
    ],
    checklist: [
      "Rätt momssats per produkt och leveranssätt",
      "Momsbefrielse bedömd utifrån både kunder och inköp",
      "Förskott och presentkort hanterade i rätt period",
      "VAT-nummer kontrollerade vid EU-försäljning",
      "Omvänd skattskyldighet bokförd på utlandsinköp",
      "Kreditfakturor kopplade till ursprunglig affär",
      "Momsrapport avstämd mot huvudbok och skattekonto",
    ],
    faq: [
      {
        q: "Är livsmedelsmomsen alltid 6 procent?",
        a: "Från den 1 april 2026 är livsmedel normalt 6 procent, men restaurangtjänster är fortsatt 12 procent. Leveransens innehåll avgör.",
      },
      {
        q: "Kan ett momsbefriat företag dra av moms på inköp?",
        a: "Normalt inte för den momsfria verksamheten. Därför behöver den administrativa vinsten vägas mot högre faktisk inköpskostnad.",
      },
      {
        q: "Måste jag kontrollera kundens VAT-nummer?",
        a: "Ja, vid vissa EU-försäljningar är ett giltigt VAT-nummer och korrekt dokumentation centralt för att fakturera utan svensk moms.",
      },
    ],
    cta: "Har företaget flera momssatser eller handel över gränserna? Vi kan göra en momsgenomgång och bygga en rutin som minskar manuella rättelser.",
  },
  {
    slug: "likviditetsbudget-13-veckor",
    tag: "Likviditet",
    date: "Maj 2027",
    published: "2027-05-01",
    readingMinutes: 4,
    title:
      "Resultatet visar om du tjänar pengar. Likviditeten visar om du överlever.",
    titleLead: "Resultatet visar om du tjänar pengar.",
    titleAccent: "Likviditeten visar om du överlever.",
    excerpt:
      "Bygg en 13-veckors likviditetsbudget och se kommande betalningsproblem i tid. Praktisk metod för småföretag med ojämna intäkter.",
    intro:
      "Många företag följer omsättning och resultat varje månad men tittar på bankkontot först när en stor betalning närmar sig. En rullande 13-veckorsprognos gör kassaflödet synligt tillräckligt tidigt för att du ska kunna agera.",
    image: "/assets/blogg-thumb.webp",
    imageAlt:
      "Resultatet visar om du tjänar pengar. Likviditeten visar om du överlever.",
    metaTitle:
      "Likviditetsbudget: bygg en 13-veckors prognos för företaget | Nordic Phoenix",
    metaDescription:
      "Bygg en 13-veckors likviditetsbudget och se kommande betalningsproblem i tid. Praktisk metod för småföretag med ojämna intäkter.",
    blocks: [
      { type: "heading", text: "Varför tretton veckor?" },
      {
        type: "paragraph",
        text: "Tretton veckor är ungefär ett kvartal. Perioden är tillräckligt lång för att fånga moms, löner, hyror, skatter och större leverantörsbetalningar, men tillräckligt kort för att prognosen ska kunna baseras på konkreta fakturor och beslut.",
      },
      {
        type: "paragraph",
        text: "Prognosen rullas varje vecka. När en vecka passerar läggs en ny vecka till längst bort.",
      },
      {
        type: "heading",
        text: "Börja med ingående bank och säkra inbetalningar",
      },
      {
        type: "paragraph",
        text: "Utgå från disponibelt banksaldo. Lägg därefter in kundfakturor som sannolikt betalas under respektive vecka. Använd kundernas verkliga betalningsbeteende, inte bara fakturans förfallodatum. En kund som alltid betalar tio dagar sent ska prognostiseras därefter.",
      },
      {
        type: "paragraph",
        text: "För framtida försäljning bör sannolikheten vara hög innan beloppet räknas som inbetalning. Offerter och muntliga förhoppningar ska normalt ligga i ett separat scenario.",
      },
      { type: "heading", text: "Lägg utbetalningar på rätt vecka" },
      {
        type: "paragraph",
        text: "För in löner, arbetsgivaravgifter, skatt, moms, hyra, leasing, lån, leverantörsfakturor och planerade investeringar. Glöm inte årsvisa kostnader som försäkring eller programlicens.",
      },
      {
        type: "paragraph",
        text: "Räkna på betalningsdatum, inte bokföringsmånad. En kostnad som hör till juni men betalas i juli påverkar likviditeten i juli.",
      },
      { type: "heading", text: "Bygg tre scenarier" },
      {
        type: "paragraph",
        text: "Bas-scenariot innehåller det mest sannolika utfallet. Ett försiktigt scenario senarelägger vissa kundbetalningar och minskar osäker försäljning. Ett starkt scenario visar vad som händer om pipeline konverterar snabbare.",
      },
      {
        type: "paragraph",
        text: "Planera åtgärder utifrån det försiktiga scenariot. Då blir finansiering eller kostnadsbeslut inte beroende av bästa möjliga utfall.",
      },
      { type: "heading", text: "Sätt en miniminivå" },
      {
        type: "paragraph",
        text: "Bestäm hur mycket pengar som minst ska finnas efter varje vecka. Nivån kan motsvara en månad fasta kostnader eller ett annat belopp som passar riskbilden. När prognosen närmar sig gränsen ska en förutbestämd åtgärdsplan aktiveras.",
      },
      {
        type: "paragraph",
        text: "Detta gör beslut mindre känslostyrda. Företaget agerar när ett mätbart tröskelvärde passeras.",
      },
      { type: "heading", text: "Åtgärder som förbättrar likviditeten" },
      {
        type: "paragraph",
        text: "Fakturera direkt efter leverans. Dela stora projekt i milstolpar. Ta förskott när det är affärsmässigt. Följ upp förfallna fakturor samma vecka. Förhandla längre betalningsvillkor på stora inköp utan att skada relationen. Pausa investeringar som inte är tidskritiska. Justera preliminärskatten om resultatprognosen har fallit.",
      },
      {
        type: "paragraph",
        text: "Var försiktig med att förbättra likviditeten genom att systematiskt betala leverantörer för sent. Det kan skada kreditvärdighet, relationer och leveranssäkerhet.",
      },
      {
        type: "heading",
        text: "Skillnaden mellan tillfälligt glapp och olönsam affär",
      },
      {
        type: "paragraph",
        text: "En likviditetsprognos kan visa ett kort glapp trots att affären är lönsam, till exempel när en stor kund betalar efter att lönerna förfaller. Då kan betalningsvillkor eller rörelsefinansiering vara en lösning.",
      },
      {
        type: "paragraph",
        text: "Om prognosen däremot blir sämre för varje vecka trots normala betalningstider kan problemet vara låg bruttomarginal, för höga fasta kostnader eller för låg prissättning. Då löser ett lån bara tiden, inte affären.",
      },
      { type: "heading", text: "Gör prognosen till en mötesrutin" },
      {
        type: "paragraph",
        text: "Uppdatera prognosen samma veckodag. Skriv kort varför varje större förändring skett. Avsluta med tre beslut: vad ska faktureras, vad ska följas upp och vilken kostnad eller investering behöver omprövas.",
      },
      {
        type: "paragraph",
        text: "En enkel prognos som används varje vecka är bättre än en avancerad modell som öppnas en gång per kvartal.",
      },
    ],
    checklist: [
      "Ingående disponibelt banksaldo",
      "Kundbetalningar baserade på verkligt beteende",
      "Alla skatter, moms och löner på rätt vecka",
      "Årsvisa och oregelbundna kostnader inkluderade",
      "Bas-, försiktigt och starkt scenario",
      "Miniminivå för kassa beslutad",
      "Åtgärdsplan när nivån passeras",
      "Veckovis uppdateringsmöte bokat",
    ],
    faq: [
      {
        q: "Är likviditetsbudget samma sak som resultatbudget?",
        a: "Nej. Resultatbudgeten visar intäkter och kostnader när de hör till perioden. Likviditetsbudgeten visar när pengar faktiskt betalas in och ut.",
      },
      {
        q: "Ska moms räknas med?",
        a: "Ja. Likviditetsprognosen ska spegla verkliga betalningar inklusive moms och kommande momsbetalning eller återbetalning.",
      },
      {
        q: "Hur exakt behöver prognosen vara?",
        a: "De närmaste fyra veckorna bör vara relativt detaljerade. Längre fram kan beloppen vara mer uppskattade och uppdateras när ny information kommer.",
      },
    ],
    cta: "Vill du ha en likviditetsprognos som uppdateras tillsammans med bokföringen? Vi kan bygga modellen och göra den till en enkel månadsrutin.",
  },
  {
    slug: "spara-bokforing-kvitton-digitalt",
    tag: "Bokföring",
    date: "Juni 2027",
    published: "2027-06-01",
    readingMinutes: 4,
    title: "Digital bokföring är inte samma sak som säker arkivering",
    titleLead: "Digital bokföring är inte samma sak som",
    titleAccent: "säker arkivering",
    excerpt:
      "Så sparar du bokföring, fakturor och digitala kvitton korrekt i sju år. Få en enkel rutin för format, backup, åtkomst och ansvar.",
    intro:
      "Att ett kvitto finns i inkorgen eller att fakturan ligger i ett bokföringsprogram betyder inte automatiskt att företagets arkivering är trygg. Räkenskapsinformation ska vara läsbar, åtkomlig och skyddad under hela bevarandetiden, även om system eller redovisningsbyrå byts.",
    image: "/assets/blogg-thumb.webp",
    imageAlt: "Digital bokföring är inte samma sak som säker arkivering",
    metaTitle:
      "Spara bokföring och kvitton: regler för digital arkivering | Nordic Phoenix",
    metaDescription:
      "Så sparar du bokföring, fakturor och digitala kvitton korrekt i sju år. Få en enkel rutin för format, backup, åtkomst och ansvar.",
    blocks: [
      { type: "heading", text: "Hur länge ska materialet sparas?" },
      {
        type: "paragraph",
        text: "Räkenskapsinformation ska sparas i sju år efter det kalenderår då räkenskapsåret avslutades. Ett företag med brutet räkenskapsår kan därför behöva bevara materialet längre än exakt sju år räknat från balansdagen.",
      },
      {
        type: "paragraph",
        text: "Regeln omfattar mer än kvitton. Huvudbok, verifikationer, fakturor, avtal som behövs för att förstå bokföringen, systemdokumentation och behandlingshistorik kan vara räkenskapsinformation.",
      },
      {
        type: "heading",
        text: "Spara i det format informationen hade när den kom",
      },
      {
        type: "paragraph",
        text: "Ett digitalt kvitto ska sparas i det elektroniska format det hade när det togs emot. En PDF-faktura ska alltså inte bara skrivas ut och sparas på papper. Efter regeländringen den 1 juli 2024 kan ett mottaget papperskvitto normalt kastas efter att det överförts på ett betryggande sätt, men den digitala kopian måste uppfylla kraven på bevarande och läsbarhet.",
      },
      {
        type: "paragraph",
        text: "Fotografera hela kvittot med datum, belopp, moms och leverantör synligt. Kontrollera bilden innan originalet förstörs.",
      },
      {
        type: "heading",
        text: "Bokföringsprogrammet är inte hela arkivplanen",
      },
      {
        type: "paragraph",
        text: "Fråga vad som händer om abonnemanget avslutas. Kan företaget exportera verifikationer, bildunderlag, huvudbok, kund- och leverantörsreskontra samt systemdokumentation i läsbart format? Hur länge finns åtkomsten kvar och vem ansvarar för exporten?",
      },
      {
        type: "paragraph",
        text: "Avtalet med redovisningsbyrån bör också beskriva vem som äger materialet, hur det lämnas tillbaka och vad som händer när samarbetet upphör. Företagets styrelse eller ägare kan inte överföra hela det lagstadgade ansvaret genom att anlita en byrå.",
      },
      { type: "heading", text: "Bygg skydd mot tre risker" },
      {
        type: "paragraph",
        text: "Den första risken är förlust genom tekniskt fel eller radering. Använd backup som är separerad från huvudsystemet. Den andra är obehörig åtkomst. Använd individuella konton, tvåfaktorsinloggning och begränsade behörigheter. Den tredje är att materialet finns kvar men inte går att förstå. Spara därför kontoplan, verifikationsserier, beskrivning av integrationer och instruktioner för hur exporten läses.",
      },
      {
        type: "paragraph",
        text: "En zip-fil med tusentals kryptiska filnamn är ett dåligt arkiv även om filerna tekniskt finns kvar.",
      },
      { type: "heading", text: "Hantera e-post och privata enheter" },
      {
        type: "paragraph",
        text: "Leverantörsfakturor och kvitton ska inte vara beroende av en medarbetares privata e-post eller telefon. Skapa gemensam fakturaadress och en rutin där underlag överförs till företagets system löpande.",
      },
      {
        type: "paragraph",
        text: "När en medarbetare slutar ska behörigheter tas bort och företagets material säkras innan konton stängs.",
      },
      { type: "heading", text: "Testa återläsning en gång per år" },
      {
        type: "paragraph",
        text: "Välj ett äldre år och försök hitta en specifik faktura, dess bokföringspost, betalning och tillhörande avtal. Kontrollera att filen öppnas och att kopplingen går att förstå. Testet visar om arkivet fungerar i praktiken.",
      },
      {
        type: "paragraph",
        text: "Dokumentera testdatum, vad som kontrollerades och eventuella åtgärder. Det är en liten insats som kan avslöja stora brister.",
      },
      { type: "heading", text: "En enkel arkiveringspolicy" },
      {
        type: "paragraph",
        text: "Policyn bör ange vilka system som används, vilka format som sparas, vem som ansvarar för månadsvis kontroll, hur backup görs, hur länge material sparas, hur behörigheter hanteras och hur export sker vid systembyte.",
      },
      {
        type: "paragraph",
        text: "För ett litet företag räcker ofta en sida. Det viktiga är att rutinen är tydlig och faktiskt följs.",
      },
      { type: "heading", text: "När företaget avslutas" },
      {
        type: "paragraph",
        text: "Arkiveringsskyldigheten försvinner inte bara för att verksamheten upphör eller ett bolag avvecklas. Planera vem som ska förvara materialet, hur det kan nås och hur lång tid som återstår. Gör exporten innan system och banktjänster stängs.",
      },
    ],
    checklist: [
      "Bevarandetid beräknad för varje räkenskapsår",
      "Digitala underlag sparade i ursprungligt format",
      "Papperskvitton skannade betryggande innan de kastas",
      "Fullständig export möjlig från bokföringssystemet",
      "Separat backup och tvåfaktorsinloggning",
      "Gemensam fakturaadress och inga privata beroenden",
      "Årlig återläsning testad",
      "Plan för systembyte eller avslut dokumenterad",
    ],
    faq: [
      {
        q: "Räcker det att spara ett foto av kvittot?",
        a: "Det kan räcka om överföringen är betryggande, hela underlaget är läsbart och den digitala kopian bevaras säkert enligt bokföringsreglerna.",
      },
      {
        q: "Måste bokföringen sparas exakt sju år?",
        a: "Den ska sparas i sju år efter utgången av det kalenderår då räkenskapsåret avslutades. För brutet räkenskapsår blir den faktiska tiden längre än sju år från balansdagen.",
      },
      {
        q: "Är redovisningsbyrån ansvarig för arkiveringen?",
        a: "Byrån kan sköta praktiska delar enligt avtal, men företaget och dess företrädare behåller ett eget ansvar för att bokföringslagen följs.",
      },
    ],
    cta: "Vi kan hjälpa dig att dokumentera en enkel arkiveringspolicy och säkerställa att allt går att exportera innan du byter system eller redovisningsbyrå.",
  },
];

/** Artiklar som är släppta. Allt användarvänt ska gå genom den här. */
export const articles: Article[] = ALLA.filter(
  (article) => article.published <= IDAG,
);

/** Hela listan, även det som ligger och väntar. Endast för verktyg. */
export const allArticles: Article[] = ALLA;

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
