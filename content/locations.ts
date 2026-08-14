/**
 * Ortssidor för lokal SEO: en sida per stad i Sverige-sektionen.
 *
 * Två regler som styr allt innehåll här:
 *
 * 1. Ingen påhittad lokal närvaro. Nordic Phoenix sitter i Sollentuna och
 *    arbetar digitalt i hela landet. Ingen text får antyda kontor, personal
 *    eller besöksadress på orten, och schemat använder Service med areaServed
 *    i stället för LocalBusiness med lokal adress. Att fejka lokal närvaro är
 *    både vilseledande och något Google aktivt slår ner på.
 *
 * 2. Varje sida ska stå på egna ben. Vinkeln utgår från ortens faktiska
 *    näringsliv, och FAQ:n innehåller frågor som bara är relevanta just där.
 *    Sidor som bara byter ut ortsnamnet räknas som doorway pages och riskerar
 *    att skada sajten i stället för att hjälpa.
 */

export type LocationFaq = { question: string; answer: string };

export type Location = {
  slug: string;
  /** Ortsnamn i grundform, används i rubriker och löptext. */
  name: string;
  /** Böjd form för "i Umeå", "i Göteborg". Samma som name för de flesta. */
  inName: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  /** Rubriken delas för att kunna färga andra halvan. */
  h1Lead: string;
  h1Accent: string;
  intro: string;
  /** Ortens näringsliv, det som gör sidan unik. */
  context: { heading: string; paragraphs: string[] };
  /** Tre skäl formulerade utifrån ortens förutsättningar. */
  highlights: { title: string; text: string }[];
  faq: LocationFaq[];
  /** Slugs för intern länkning till närliggande orter. */
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "stockholm",
    name: "Stockholm",
    inName: "Stockholm",
    region: "Stockholms län",
    metaTitle:
      "Redovisningsbyrå Stockholm | Bokföring, lön och bokslut till fast pris",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Stockholm. Löpande bokföring, moms, lön, bokslut och deklaration till fast månadspris. Svenska, engelska och persiska.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Stockholm.",
    intro:
      "Stockholm har landets tätaste bestånd av små aktiebolag, och de allra flesta drivs av en eller ett fåtal personer. Vi sköter ekonomin åt just den typen av bolag, digitalt och till ett pris som är bestämt i förväg.",
    context: {
      heading: "Så ser företagandet ut i Stockholm",
      paragraphs: [
        "Konsulter, byråer, techbolag och tjänsteföretag dominerar. Många startar som enskild firma vid sidan av en anställning, går över till aktiebolag när uppdragen blir stadiga, och står då plötsligt inför lön, arbetsgivardeklaration och 3:12-regler samtidigt.",
        "Det är också en marknad där saker går fort. En kund vill ha offert samma vecka, en investerare vill se siffror inför ett möte, och Skatteverket har sina datum oavsett hur mycket som händer. Vår roll är att hålla den delen i ordning så att den aldrig blir det som bromsar.",
      ],
    },
    highlights: [
      {
        title: "Byggt för konsultbolag",
        text: "Fakturering per uppdrag, reseersättningar och representation. Vi kan de poster som återkommer i varje konsultbolags bokföring.",
      },
      {
        title: "Utdelning och K10",
        text: "Har du aktiebolag med lön till dig själv finns ofta utrymme för utdelning enligt 3:12. Vi räknar på det innan året tar slut, inte efteråt.",
      },
      {
        title: "Svar samma dag",
        text: "Du skriver på WhatsApp och får svar av någon som känner ditt bolag. Ingen växel och ingen ärendekö.",
      },
    ],
    faq: [
      {
        question: "Måste jag komma in till ett kontor?",
        answer:
          "Nej. Allt sköts digitalt, du laddar upp underlag i mobilen och vi stämmer av över telefon eller WhatsApp. Vill du ändå ses går det bra, vi finns i Sollentuna.",
      },
      {
        question: "Vad kostar en redovisningsbyrå i Stockholm?",
        answer:
          "Timpris är vanligt i Stockholm och gör kostnaden svår att förutse. Vi arbetar med fast månadspris från 1 495 kr för mindre bolag, så att du vet vad det landar på innan månaden börjar.",
      },
      {
        question: "Jag har redan en byrå. Hur byter jag?",
        answer:
          "Vi begär ut bokföringen från din nuvarande byrå och tar över löpande, oftast vid ett månadsskifte. Du behöver inte vänta till nytt räkenskapsår.",
      },
      {
        question: "Kan ni hjälpa till med lön för mina anställda?",
        answer:
          "Ja. Vi hanterar löneutbetalningar, arbetsgivardeklaration på individnivå och kontrolluppgifter. Det ingår i paketen Standard och Premium.",
      },
      {
        question: "Vi är ett nystartat bolag utan omsättning än. Är det för tidigt?",
        answer:
          "Nej, tvärtom. Att lägga upp kontoplan, momsregistrering och rutiner rätt från början är billigare än att rätta i efterhand. Vi anpassar paketet efter hur lite som händer i början.",
      },
    ],
    nearby: ["uppsala", "vasteras", "orebro"],
  },

  {
    slug: "goteborg",
    name: "Göteborg",
    inName: "Göteborg",
    region: "Västra Götaland",
    metaTitle:
      "Redovisningsbyrå Göteborg | Bokföring för industri, handel och konsult",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Göteborg. Bokföring, lager, lön, bokslut och deklaration till fast pris. Vana vid underleverantörer och projektfakturering.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Göteborg.",
    intro:
      "Göteborgs näringsliv är byggt kring industri, hamn och logistik, och kring de tusentals mindre bolag som levererar in i de kedjorna. Den bokföringen ser annorlunda ut än ett rent tjänsteföretags, och det är den vi är vana vid.",
    context: {
      heading: "Så ser företagandet ut i Göteborg",
      paragraphs: [
        "Många bolag i regionen är underleverantörer. Det betyder längre betalningsvillkor, större kundreskontra och fakturor som är kopplade till projekt eller leveranser snarare än till en enskild månad. Att bokföringen följer projekten och inte bara kalendern gör stor skillnad när du vill veta vad ett uppdrag faktiskt gav.",
        "Hamnen och handeln för dessutom med sig varuflöden över gränser. Då blir moms vid EU-inköp, omvänd skattskyldighet och lagervärdering saker som måste hanteras rätt varje månad, inte redas ut vid bokslutet.",
      ],
    },
    highlights: [
      {
        title: "Lager och varuflöden",
        text: "Vi hanterar lagervärdering, inköp från EU och omvänd skattskyldighet så att momsen blir rätt från början.",
      },
      {
        title: "Projekt som går att följa",
        text: "Bokföringen läggs upp så att du kan se resultatet per projekt eller kund, inte bara en klumpsumma per månad.",
      },
      {
        title: "Reskontra som hålls efter",
        text: "Långa betalningsvillkor kräver ordning på vem som är skyldig vad. Vi håller kund- och leverantörsreskontran uppdaterad.",
      },
    ],
    faq: [
      {
        question: "Kan ni hantera inköp från utlandet och omvänd skattskyldighet?",
        answer:
          "Ja. Vi bokför EU-inköp, tredjelandsimport och omvänd skattskyldighet inom bygg. Det är vanligt bland bolag i Göteborgsregionen och något vi gör löpande.",
      },
      {
        question: "Vi har lager. Klarar ni lagervärdering vid bokslut?",
        answer:
          "Ja. Vi går igenom lagret vid bokslutet, värderar enligt lägsta värdets princip och dokumenterar underlaget så att det håller vid en granskning.",
      },
      {
        question: "Behöver vi ses fysiskt när ni sitter i Stockholm?",
        answer:
          "Nej. Vi arbetar helt digitalt, vilket betyder att avståndet inte påverkar vare sig service eller pris. Möten sker över telefon eller video när det behövs.",
      },
      {
        question: "Kan ni sköta löner för kollektivanställd personal?",
        answer:
          "Ja. Vi hanterar löner med OB, övertid och semesterersättning, samt arbetsgivardeklaration varje månad.",
      },
      {
        question: "Vad ingår i fast månadspris?",
        answer:
          "Löpande bokföring, momsredovisning och digital dokumenthantering ingår i alla paket. Lön, bokslut och deklaration ingår från Standard och uppåt.",
      },
    ],
    nearby: ["jonkoping", "helsingborg", "malmo"],
  },

  {
    slug: "malmo",
    name: "Malmö",
    inName: "Malmö",
    region: "Skåne",
    metaTitle:
      "Redovisningsbyrå Malmö | Bokföring, moms och handel över Öresund",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Malmö. Bokföring, moms vid handel med Danmark, lön, bokslut och deklaration till fast pris. Även på engelska och persiska.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Malmö.",
    intro:
      "Malmö har en hög andel nystartade företag och ett näringsliv med starka band över Öresund. Det gör momsen mer komplicerad än i en stad där all handel sker inom Sverige, och det är där de flesta misstagen uppstår.",
    context: {
      heading: "Så ser företagandet i Malmö ut",
      paragraphs: [
        "Handel med danska kunder eller leverantörer innebär att momsen ska redovisas annorlunda än vid inhemsk försäljning. Periodisk sammanställning, omvänd skattskyldighet och rätt momskod är sådant som lätt blir fel när man sköter bokföringen själv, och som Skatteverket följer upp.",
        "Staden har också en stor andel företagare med internationell bakgrund och en ung företagarkår. Många driver restaurang, handel eller tjänsteföretag och startar utan tidigare erfarenhet av svensk bokföring. Vi förklarar på svenska, engelska eller persiska beroende på vad som känns tryggast.",
      ],
    },
    highlights: [
      {
        title: "Moms över Öresund",
        text: "Vi hanterar EU-moms, periodisk sammanställning och omvänd skattskyldighet vid handel med danska motparter.",
      },
      {
        title: "Rådgivning på ditt språk",
        text: "Svenska, engelska eller persiska. Att förstå sin egen ekonomi ska inte hänga på vilket språk reglerna är skrivna på.",
      },
      {
        title: "Från start till stadig drift",
        text: "Vi hjälper till redan vid bolagsregistrering och val av bolagsform, inte först när första bokslutet närmar sig.",
      },
    ],
    faq: [
      {
        question: "Vi säljer till kunder i Danmark. Hur redovisas momsen?",
        answer:
          "Vid försäljning till danskt företag med giltigt momsnummer sker ingen svensk moms, men affären ska med i periodisk sammanställning. Säljer du till privatpersoner gäller andra regler. Vi sköter båda delarna åt dig.",
      },
      {
        question: "Kan jag få rådgivning på persiska?",
        answer:
          "Ja. Vi ger rådgivning på svenska, engelska och persiska, och du kan skriva till oss på det språk du föredrar.",
      },
      {
        question: "Jag driver restaurang. Har ni erfarenhet av branschen?",
        answer:
          "Ja. Restaurang innebär personalliggare, hög andel kontanthantering, personalmat och blandade momssatser. Det är poster vi hanterar löpande.",
      },
      {
        question: "Vad kostar det att starta aktiebolag och få hjälp med bokföringen?",
        answer:
          "Aktiekapitalet är 25 000 kr och Bolagsverket tar en registreringsavgift. Vår hjälp med registrering och uppstart offereras separat, därefter löper bokföringen på fast månadspris från 1 495 kr.",
      },
      {
        question: "Måste vi träffas i Malmö?",
        answer:
          "Nej. Allt sköts digitalt och avståndet påverkar varken pris eller servicenivå. Du når oss på WhatsApp, mejl eller telefon.",
      },
    ],
    nearby: ["lund", "helsingborg", "goteborg"],
  },

  {
    slug: "uppsala",
    name: "Uppsala",
    inName: "Uppsala",
    region: "Uppsala län",
    metaTitle:
      "Redovisningsbyrå Uppsala | Bokföring för konsulter och forskningsbolag",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Uppsala. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid nystartade bolag och forskningsnära verksamhet.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Uppsala.",
    intro:
      "Uppsala är en universitetsstad, och det märks i företagandet. Många bolag startar ur forskning eller studier, med små intäkter i början och en helt annan kostnadsbild än ett vanligt tjänsteföretag.",
    context: {
      heading: "Så ser företagandet i Uppsala ut",
      paragraphs: [
        "Life science och forskningsnära bolag har ofta lång väg till första intäkten. Under tiden finns ändå kostnader, ibland bidrag eller extern finansiering, och det ställer krav på att bokföringen skiljer på vad som är eget kapital, lån och intäkt. Blandas de ihop blir både skatten och årsredovisningen fel.",
        "Samtidigt finns en stor grupp konsulter och mindre tjänsteföretag som helt enkelt vill ha ordning på det löpande utan att betala för mer än de behöver. Vi anpassar paketet efter hur mycket som faktiskt händer i bolaget.",
      ],
    },
    highlights: [
      {
        title: "Rätt från uppstarten",
        text: "Kontoplan, momsregistrering och rutiner läggs upp innan verksamheten drar igång, inte i efterhand.",
      },
      {
        title: "Bidrag och finansiering",
        text: "Vi håller isär bidrag, lån och ägartillskott i bokföringen, så att resultatet visar vad verksamheten faktiskt gör.",
      },
      {
        title: "Paket som växer med bolaget",
        text: "Börja litet när det händer lite. Vi utökar när volymen ökar i stället för att ta betalt för kapacitet du inte använder.",
      },
    ],
    faq: [
      {
        question: "Vi har ännu ingen omsättning. Behöver vi bokföra?",
        answer:
          "Ja. Bokföringsskyldigheten gäller från registreringen, även utan intäkter. Det blir dock mycket lite arbete, och vi anpassar priset efter det.",
      },
      {
        question: "Hur bokförs bidrag från Vinnova eller liknande?",
        answer:
          "Bidrag redovisas som intäkt i takt med att kostnaderna de ska täcka uppstår, inte när pengarna kommer in. Vi periodiserar det åt dig så att resultatet blir rättvisande.",
      },
      {
        question: "Kan ni hjälpa till vid en emission?",
        answer:
          "Vi bokför emissionen och tar fram underlag till Bolagsverket. Själva juridiken kring villkoren bör du stämma av med jurist, och vi säger till när vi tycker att det behövs.",
      },
      {
        question: "Jag är konsult med några få fakturor i månaden. Vilket paket passar?",
        answer:
          "Bas räcker oftast. Det täcker upp till 25 verifikat i månaden, momsredovisning och digital dokumenthantering, för 1 495 kr i månaden.",
      },
      {
        question: "Behöver vi ses på plats i Uppsala?",
        answer:
          "Nej, arbetet är helt digitalt. Vill du ändå ses fysiskt ligger vi i Sollentuna, cirka fyrtio minuter bort.",
      },
    ],
    nearby: ["stockholm", "vasteras", "gavle"],
  },

  {
    slug: "vasteras",
    name: "Västerås",
    inName: "Västerås",
    region: "Västmanland",
    metaTitle:
      "Redovisningsbyrå Västerås | Bokföring för teknik- och industribolag",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Västerås. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid teknikkonsulter och industriella underleverantörer.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Västerås.",
    intro:
      "Västerås näringsliv präglas av teknik, energi och industri, och av alla de mindre bolag som konsultar in i de branscherna. Det är verksamheter med hög timkostnad, tydliga projekt och ofta ojämn fakturering över året.",
    context: {
      heading: "Så ser företagandet i Västerås ut",
      paragraphs: [
        "Teknikkonsulter fakturerar per uppdrag eller per timme mot större beställare. Det ger toppar och dalar i kassaflödet, och gör att skatt och moms kan slå hårt en månad och nästan ingenting nästa. Att planera för det i förväg är skillnaden mellan lugn och obehagliga överraskningar.",
        "Industriella underleverantörer har i stället investeringar i maskiner och utrustning. Där avgör avskrivningstiden hur resultatet ser ut, och den bör bestämmas medvetet i stället för att bli en slump.",
      ],
    },
    highlights: [
      {
        title: "Jämnare skatteplanering",
        text: "Vi följer resultatet löpande och säger till i god tid när skatt eller moms kommer att bli ovanligt stor.",
      },
      {
        title: "Investeringar och avskrivningar",
        text: "Maskiner och utrustning skrivs av enligt en plan som är genomtänkt, inte satt på måfå vid bokslutet.",
      },
      {
        title: "Lön för tekniker och montörer",
        text: "OB, restid och traktamenten hanteras rätt i lönen och i arbetsgivardeklarationen.",
      },
    ],
    faq: [
      {
        question: "Vi köpte en maskin i år. Hur påverkar det skatten?",
        answer:
          "Maskinen kostnadsförs inte direkt utan skrivs av över sin nyttjandeperiod, vanligen fem år. Det jämnar ut resultatet, och det finns utrymme att påverka hur mycket som tas första året. Vi går igenom det med dig.",
      },
      {
        question: "Kan ni hantera traktamenten och restidsersättning?",
        answer:
          "Ja. Vi räknar traktamenten enligt Skatteverkets belopp och redovisar dem rätt i lön och arbetsgivardeklaration, så att de förblir skattefria där de ska vara det.",
      },
      {
        question: "Vår fakturering svänger kraftigt mellan månaderna. Blir bokföringen dyrare då?",
        answer:
          "Nej. Priset utgår från antal verifikat i snitt över året, inte från enskilda toppar. Du betalar samma summa varje månad.",
      },
      {
        question: "Kan ni ta över mitt bolags bokföring mitt i räkenskapsåret?",
        answer:
          "Ja. Vi hämtar underlagen från din nuvarande byrå och tar vid från valfritt månadsskifte.",
      },
      {
        question: "Hur snabbt får jag svar på en fråga?",
        answer:
          "Skriv på WhatsApp så svarar vi normalt samma arbetsdag. Du pratar med någon som känner ditt bolag, inte med en supportfunktion.",
      },
    ],
    nearby: ["stockholm", "uppsala", "orebro"],
  },

  {
    slug: "orebro",
    name: "Örebro",
    inName: "Örebro",
    region: "Örebro län",
    metaTitle:
      "Redovisningsbyrå Örebro | Bokföring för logistik, transport och handel",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Örebro. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid transport, lager och distribution.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Örebro.",
    intro:
      "Örebro ligger mitt i landets logistikstråk, och det formar näringslivet. Lager, distribution och transport har en kostnadsbild som skiljer sig tydligt från tjänsteföretagens, med fordon, drivmedel och personal som tyngsta poster.",
    context: {
      heading: "Så ser företagandet i Örebro ut",
      paragraphs: [
        "I transportbolag ligger en stor del av kostnaderna i fordon. Leasing eller köp, drivmedel, försäkring och service ska bokföras rätt för att momsen ska bli korrekt, och reglerna skiljer sig åt beroende på om fordonet är personbil eller lastbil. Här görs många misstag.",
        "Lager och distribution innebär dessutom att varor kan finnas i böckerna långt innan de säljs. Bokföringen behöver visa det, annars ser resultatet bättre eller sämre ut än verkligheten.",
      ],
    },
    highlights: [
      {
        title: "Fordon och drivmedel",
        text: "Vi kan skillnaden i momsavdrag mellan personbil och lastbil, och mellan leasing och köp. Det blir rätt från början.",
      },
      {
        title: "Personal med skiftgång",
        text: "OB-tillägg, övertid och delade turer hanteras i lönekörningen varje månad.",
      },
      {
        title: "Koll på lagret",
        text: "Lagervärdering vid bokslut med dokumenterat underlag, så att resultatet stämmer med verkligheten.",
      },
    ],
    faq: [
      {
        question: "Får vi dra av momsen på en personbil?",
        answer:
          "Normalt inte vid köp, och bara halva momsen vid leasing. För lastbilar och lätta lastbilar gäller andra regler. Vi ser till att avdraget blir rätt för just era fordon.",
      },
      {
        question: "Hur bokförs drivmedelskort?",
        answer:
          "Fakturan från drivmedelsbolaget bokförs löpande, och privat användning ska brytas ut. Vi lägger upp en rutin så att det sköter sig självt varje månad.",
      },
      {
        question: "Kan ni hantera löner med OB och skiftgång?",
        answer:
          "Ja. Vi räknar OB-tillägg, övertid och semesterersättning och rapporterar in arbetsgivardeklaration på individnivå.",
      },
      {
        question: "Vi är ett åkeri med tio anställda. Vilket paket passar?",
        answer:
          "Premium, som täcker obegränsad löpande bokföring och lön för upp till tio anställda. Har ni fler tar vi fram en offert.",
      },
      {
        question: "Krävs det att ni finns i Örebro?",
        answer:
          "Nej. Arbetet är digitalt och underlagen laddas upp direkt från mobilen, ofta av föraren på plats. Avstånd påverkar varken pris eller svarstid.",
      },
    ],
    nearby: ["vasteras", "linkoping", "norrkoping"],
  },

  {
    slug: "linkoping",
    name: "Linköping",
    inName: "Linköping",
    region: "Östergötland",
    metaTitle:
      "Redovisningsbyrå Linköping | Bokföring för IT-konsulter och techbolag",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Linköping. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid IT-konsulter och bolag i tillväxt.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Linköping.",
    intro:
      "Linköping har en ovanligt hög andel teknik- och IT-bolag, många med rötter i universitetet eller i regionens flyg- och försvarsindustri. Det är verksamheter där den största tillgången är tid, och där bokföringen behöver visa vad tiden faktiskt är värd.",
    context: {
      heading: "Så ser företagandet i Linköping ut",
      paragraphs: [
        "IT-konsulter fakturerar ofta löpande mot ramavtal, med underkonsulter inblandade i perioder. Då blir det viktigt att skilja på egen fakturerad tid och inköpt tid, annars säger marginalen ingenting. Det är en uppdelning som kostar lite att lägga upp och ger mycket tillbaka.",
        "Bolag som växer snabbt möter dessutom gränser de inte tänkt på: krav på revisor, gränsen för förenklat årsbokslut, och den punkt där lön till ägaren behöver läggas om för att utdelningsutrymmet ska bli bra. Vi flaggar innan gränserna passeras.",
      ],
    },
    highlights: [
      {
        title: "Marginal per uppdrag",
        text: "Egen tid och underkonsulter hålls isär i bokföringen, så att du ser vad varje uppdrag faktiskt ger.",
      },
      {
        title: "Varning innan gränserna",
        text: "Revisorsplikt, momsgränser och 3:12-utrymme. Vi säger till i förväg, inte när det redan hänt.",
      },
      {
        title: "Prenumerationer och licenser",
        text: "Molntjänster köpta från utlandet ska momsredovisas omvänt. Vi sköter det så att momsdeklarationen blir rätt.",
      },
    ],
    faq: [
      {
        question: "Vi köper molntjänster från utländska leverantörer. Hur hanteras momsen?",
        answer:
          "Tjänster köpta från företag utanför Sverige redovisas med omvänd skattskyldighet. Du redovisar både utgående och ingående moms i deklarationen. Vi sköter det åt dig varje månad.",
      },
      {
        question: "När behöver vårt bolag revisor?",
        answer:
          "När två av tre gränsvärden överskrids två år i rad: fler än tre anställda, mer än 1,5 miljoner i balansomslutning eller mer än 3 miljoner i nettoomsättning. Vi bevakar det och hör av oss i god tid.",
      },
      {
        question: "Kan ni fakturera våra kunder åt oss?",
        answer:
          "Vi hanterar fakturaunderlag och kundreskontra, alltså uppföljning av vad som är betalt och inte. Själva kundkontakten sköter ni, men vi ser till att inget faller mellan stolarna.",
      },
      {
        question: "Hur mycket lön ska jag ta ut för att maximera utdelningen?",
        answer:
          "Det beror på bolagets löneunderlag och ditt eget uttag. Vi räknar på det under hösten så att du hinner justera innan året är slut.",
      },
      {
        question: "Vi är två delägare. Påverkar det bokföringen?",
        answer:
          "Bokföringen blir densamma, men utdelning och K10 räknas per delägare. Vi tar fram underlag för er båda.",
      },
    ],
    nearby: ["norrkoping", "orebro", "jonkoping"],
  },

  {
    slug: "helsingborg",
    name: "Helsingborg",
    inName: "Helsingborg",
    region: "Skåne",
    metaTitle:
      "Redovisningsbyrå Helsingborg | Bokföring för handel, logistik och import",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Helsingborg. Bokföring, importmoms, lön, bokslut och deklaration till fast pris. Vana vid handel över gränsen.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Helsingborg.",
    intro:
      "Helsingborg lever på handel och godsflöden, med Danmark på andra sidan sundet och en av landets största hamnar i stan. Företag här möter tullvärden, importmoms och valuta på ett sätt som bolag i inlandet sällan gör.",
    context: {
      heading: "Så ser företagandet i Helsingborg ut",
      paragraphs: [
        "Importerar du varor från länder utanför EU redovisas momsen mot Tullverkets underlag, inte mot leverantörsfakturan. Det är två olika belopp och de blandas ihop ofta. Blir det fel syns det direkt i momsdeklarationen, och Skatteverket ställer följdfrågor.",
        "Handel i annan valuta för dessutom med sig kursdifferenser som ska bokföras löpande. Små belopp i taget, men över ett år blir det en post som påverkar resultatet mer än de flesta tror.",
      ],
    },
    highlights: [
      {
        title: "Import och tullvärde",
        text: "Momsen redovisas mot tullräkningen. Vi stämmer av mot Tullverkets underlag varje period.",
      },
      {
        title: "Valuta och kursdifferenser",
        text: "Inköp och försäljning i euro eller danska kronor bokförs med rätt kurs och differenserna hamnar där de ska.",
      },
      {
        title: "Logistik med tunga poster",
        text: "Fordon, lager och personal. Vi kan kostnadsbilden i transport- och handelsbolag.",
      },
    ],
    faq: [
      {
        question: "Vi importerar från Kina. Hur redovisas importmomsen?",
        answer:
          "Importmomsen redovisas i momsdeklarationen med tullvärdet som underlag, inte med fakturabeloppet från leverantören. Vi stämmer av mot Tullverkets månadssammanställning så att beloppen blir rätt.",
      },
      {
        question: "Hur bokförs inköp i euro?",
        answer:
          "Fakturan bokförs till kursen på fakturadagen och betalningen till kursen på betaldagen. Skillnaden blir en kursdifferens som ska bokföras för sig. Vi sköter det löpande.",
      },
      {
        question: "Vi handlar med danska bolag. Behöver vi lämna periodisk sammanställning?",
        answer:
          "Ja, vid försäljning av varor eller tjänster till momsregistrerade företag i andra EU-länder. Vi upprättar och lämnar in den åt er.",
      },
      {
        question: "Kan ni ta hand om både bokföring och lön?",
        answer:
          "Ja. Från paketet Standard ingår lön för upp till tre anställda, och Premium täcker upp till tio.",
      },
      {
        question: "Behöver vi träffas fysiskt?",
        answer:
          "Nej. Allt sköts digitalt och avståndet påverkar varken pris eller svarstid.",
      },
    ],
    nearby: ["malmo", "lund", "goteborg"],
  },

  {
    slug: "jonkoping",
    name: "Jönköping",
    inName: "Jönköping",
    region: "Jönköpings län",
    metaTitle:
      "Redovisningsbyrå Jönköping | Bokföring för tillverkning och åkeri",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Jönköping. Bokföring, lager, lön, bokslut och deklaration till fast pris. Vana vid tillverkning och transport.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Jönköping.",
    intro:
      "Kring Jönköping finns ett av landets tätaste bälten av tillverkande företag, och de logistikbolag som flyttar varorna vidare. Det är familjeföretag i andra och tredje generationen lika ofta som nystartade bolag.",
    context: {
      heading: "Så ser företagandet i Jönköping ut",
      paragraphs: [
        "Tillverkning binder kapital. Råmaterial, produkter i arbete och färdigt lager står i böckerna innan något har sålts, och hur det värderas påverkar både resultat och skatt. Här finns också ofta maskiner som skrivs av över många år.",
        "Familjeägda bolag har dessutom frågor som sällan dyker upp någon annanstans: hur nästa generation kommer in, hur ägandet ska se ut och vad det innebär skattemässigt. Det är sällan brådskande, men blir dyrt om det hanteras för sent.",
      ],
    },
    highlights: [
      {
        title: "Lager i flera led",
        text: "Råmaterial, produkter i arbete och färdigvaror värderas var för sig, med underlag som håller.",
      },
      {
        title: "Maskinpark",
        text: "Avskrivningsplaner som är genomtänkta, och koll på vad ett byte gör med resultatet.",
      },
      {
        title: "Långsiktigt ägande",
        text: "Vi tar upp generationsfrågan i tid och säger till när en jurist eller skatterådgivare bör kopplas in.",
      },
    ],
    faq: [
      {
        question: "Hur värderas produkter i arbete vid bokslut?",
        answer:
          "Till direkta tillverkningskostnader, alltså material och lön, plus skälig andel indirekta kostnader. Vi går igenom beräkningen med er och dokumenterar den.",
      },
      {
        question: "Vi funderar på att ta in nästa generation i bolaget. Kan ni hjälpa till?",
        answer:
          "Vi kan bokföringen och skatteeffekterna, och tar fram underlaget. Själva överlåtelsen bör göras med jurist, och vi säger till när det är dags att koppla in en.",
      },
      {
        question: "Ska en ny maskin kostnadsföras eller aktiveras?",
        answer:
          "Är den avsedd att användas i flera år aktiveras den och skrivs av. Mindre inköp under ett halvt prisbasbelopp får kostnadsföras direkt. Vi bedömer det åt er.",
      },
      {
        question: "Kan ni hantera ackordslön?",
        answer:
          "Ja. Vi räknar ackord, OB och övertid i lönekörningen och rapporterar arbetsgivardeklaration varje månad.",
      },
      {
        question: "Vi har haft samma byrå i tjugo år. Är det krångligt att byta?",
        answer:
          "Nej. Vi begär ut bokföring och underlag, går igenom att allt stämmer och tar över vid ett månadsskifte. Du behöver inte göra något själv utöver att godkänna att vi hämtar materialet.",
      },
    ],
    nearby: ["goteborg", "linkoping", "orebro"],
  },

  {
    slug: "norrkoping",
    name: "Norrköping",
    inName: "Norrköping",
    region: "Östergötland",
    metaTitle:
      "Redovisningsbyrå Norrköping | Bokföring för industri, logistik och tech",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Norrköping. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid både traditionell industri och nya techbolag.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Norrköping.",
    intro:
      "Norrköping är en stad mitt i ett skifte. Den gamla industristaden finns kvar, samtidigt som datacenter, medieproduktion och logistik har vuxit fram. Det ger ett näringsliv med två helt olika sorters bolag sida vid sida.",
    context: {
      heading: "Så ser företagandet i Norrköping ut",
      paragraphs: [
        "De etablerade industribolagen har lager, maskiner och kollektivavtal. De nyare bolagen har i stället abonnemang, licenser och personal som kan sitta var som helst. Bokföringen ser olika ut, men båda behöver samma sak: ordning varje månad och besked i tid.",
        "Många bolag här arbetar dessutom mot kommun och region som beställare. Offentliga uppdrag innebär e-faktura enligt standard och ofta längre betalningstider, vilket ställer krav på likviditetsplaneringen.",
      ],
    },
    highlights: [
      {
        title: "Offentliga beställare",
        text: "E-fakturakrav och långa betalningstider. Vi håller reskontran uppdaterad så att du ser vad som faktiskt kommit in.",
      },
      {
        title: "Två sorters bolag",
        text: "Vi hanterar både lager och maskiner och rena abonnemangsintäkter, utan att pressa in dem i samma mall.",
      },
      {
        title: "Likviditet i förväg",
        text: "Vi säger till när skatt, moms eller lön kommer att ligga tungt en viss månad.",
      },
    ],
    faq: [
      {
        question: "Vi fakturerar kommunen. Behöver vi skicka e-faktura?",
        answer:
          "Ja. Vid inköp inom offentlig sektor är e-faktura enligt Peppol-standard ett krav. Vi hjälper er få rutinen på plats om den inte finns.",
      },
      {
        question: "Hur bokförs återkommande abonnemangsintäkter?",
        answer:
          "Intäkten periodiseras över den tid tjänsten levereras, inte när betalningen kommer in. Det ger ett resultat som visar hur bolaget faktiskt går.",
      },
      {
        question: "Vi har långa betalningstider och det svajar. Kan ni hjälpa oss?",
        answer:
          "Vi håller kundreskontran aktuell och rapporterar vad som är förfallet. Ser vi att en månad blir tung säger vi till innan den är här.",
      },
      {
        question: "Vad kostar det?",
        answer:
          "Fast månadspris från 1 495 kr för mindre bolag. Standard ligger på 2 995 kr och innehåller lön, bokslut och deklaration.",
      },
      {
        question: "Behöver ni sitta i Norrköping?",
        answer:
          "Nej. Arbetet är digitalt och underlagen laddas upp direkt från mobilen.",
      },
    ],
    nearby: ["linkoping", "orebro", "stockholm"],
  },

  {
    slug: "lund",
    name: "Lund",
    inName: "Lund",
    region: "Skåne",
    metaTitle:
      "Redovisningsbyrå Lund | Bokföring för forskningsbolag och konsulter",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Lund. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid nystartade bolag ur forskning och universitet.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Lund.",
    intro:
      "I Lund startas ovanligt många bolag ur forskning och studier. Det är verksamheter som ofta lever länge på finansiering innan de säljer något, och som därför behöver en bokföring som klarar just den fasen.",
    context: {
      heading: "Så ser företagandet i Lund ut",
      paragraphs: [
        "Ett forskningsnära bolag kan ha flera år mellan start och första fakturan. Under tiden kommer pengar in som bidrag, lån, ägartillskott eller emissioner, och de ska hållas isär. Görs det inte blir både eget kapital och skattemässigt resultat fel, och det märks först när det är dyrt att rätta.",
        "Samtidigt startar många studenter och forskare enskild firma vid sidan av tjänsten. Där handlar det snarare om att göra rätt med små medel och slippa lägga tid på det.",
      ],
    },
    highlights: [
      {
        title: "Kapital hålls isär",
        text: "Bidrag, lån, tillskott och emissioner bokförs var för sig, så att eget kapital och resultat stämmer.",
      },
      {
        title: "Från firma till aktiebolag",
        text: "Vi räknar på när bytet lönar sig och sköter övergången när det är dags.",
      },
      {
        title: "Litet paket i tidig fas",
        text: "Betala för det som faktiskt händer. Vi växlar upp när volymen kommer.",
      },
    ],
    faq: [
      {
        question: "När lönar det sig att gå från enskild firma till aktiebolag?",
        answer:
          "En vanlig tumregel är stabil vinst över ungefär 450 000 till 500 000 kr per år, men det beror på uttag och risk. Vi räknar på dina siffror i stället för att gissa.",
      },
      {
        question: "Hur redovisas en nyemission?",
        answer:
          "Aktiekapitalet ökar och överskjutande belopp läggs i överkursfond. Det är inte en intäkt och ska inte påverka resultatet. Vi bokför det och tar fram underlag till Bolagsverket.",
      },
      {
        question: "Vi har bidrag som ska täcka kostnader nästa år. Hur bokförs det?",
        answer:
          "Bidraget periodiseras och tas upp som intäkt i takt med att kostnaderna uppstår. Det som avser nästa år ligger kvar som en skuld i balansräkningen.",
      },
      {
        question: "Jag driver enskild firma vid sidan av min anställning. Räcker Bas?",
        answer:
          "Oftast ja. Bas täcker upp till 25 verifikat i månaden och kostar 1 495 kr i månaden.",
      },
      {
        question: "Kan vi få rådgivning på engelska?",
        answer:
          "Ja. Vi arbetar på svenska, engelska och persiska, vilket ofta underlättar i forskningsmiljöer med internationella grundare.",
      },
    ],
    nearby: ["malmo", "helsingborg", "goteborg"],
  },

  {
    slug: "umea",
    name: "Umeå",
    inName: "Umeå",
    region: "Västerbotten",
    metaTitle:
      "Redovisningsbyrå Umeå | Digital bokföring, lön och bokslut till fast pris",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Umeå. Bokföring, lön, bokslut och deklaration till fast pris, helt utan besök. Svenska, engelska och persiska.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Umeå.",
    intro:
      "Umeå är norra Sveriges tillväxtmotor, med universitet, växande tjänstesektor och långa avstånd till allt annat. Just avstånden är skälet till att digital redovisning gör mest nytta här.",
    context: {
      heading: "Så ser företagandet i Umeå ut",
      paragraphs: [
        "Näringslivet domineras av tjänsteföretag, vård, utbildning och handel, med en stadig ström av nya bolag ur universitetet. Många är små och drivs av en eller två personer som hellre lägger tiden på kunder än på papper.",
        "Att bo långt från de stora byråerna har historiskt betytt färre alternativ och sämre förhandlingsläge. När allt sköts digitalt spelar det ingen roll var byrån sitter, och du får samma pris och samma svarstid som ett bolag på Stureplan.",
      ],
    },
    highlights: [
      {
        title: "Avstånd spelar ingen roll",
        text: "Inget behöver postas och inga möten kräver resa. Du fotar underlaget i mobilen och det är framme direkt.",
      },
      {
        title: "Samma pris som i storstan",
        text: "Fast månadspris från 1 495 kr, oavsett var i landet du sitter.",
      },
      {
        title: "En kontakt som kan ditt bolag",
        text: "Du pratar med samma person varje gång, inte med en växel som slussar vidare.",
      },
    ],
    faq: [
      {
        question: "Ni sitter i Stockholm. Fungerar det på riktigt för oss i Umeå?",
        answer:
          "Ja, och det är hela poängen med att arbeta digitalt. Underlag laddas upp i mobilen, avstämningar sker över telefon eller video, och du får svar lika snabbt som en kund i Stockholm.",
      },
      {
        question: "Måste jag skicka in papperskvitton?",
        answer:
          "Nej. Du fotar kvittot och laddar upp det. Det digitala underlaget räcker enligt bokföringslagen, och papperet kan slängas efter att det överförts korrekt.",
      },
      {
        question: "Vad kostar det jämfört med en lokal byrå?",
        answer:
          "Vi arbetar med fast månadspris från 1 495 kr i stället för timdebitering. Många lokala byråer tar betalt per timme, vilket gör kostnaden svår att förutse.",
      },
      {
        question: "Kan ni hjälpa mig att starta företag?",
        answer:
          "Ja. Vi hjälper till med val av bolagsform, registrering hos Bolagsverket och Skatteverket och sätter upp bokföringen från start.",
      },
      {
        question: "Vilka branscher jobbar ni med?",
        answer:
          "Vi arbetar brett med tjänsteföretag, handel, konsulter, restaurang och hantverk. Har du en verksamhet vi inte passar för säger vi hellre det direkt.",
      },
    ],
    nearby: ["gavle", "stockholm", "uppsala"],
  },

  {
    slug: "gavle",
    name: "Gävle",
    inName: "Gävle",
    region: "Gävleborg",
    metaTitle:
      "Redovisningsbyrå Gävle | Bokföring för industri, skog och logistik",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Gävle. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid industriella underleverantörer och transport.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Gävle.",
    intro:
      "Gävle är en hamn- och industristad med skogsindustrin runt knuten. Många av företagen här är underleverantörer eller entreprenörer åt större industrier, med säsong och maskiner som präglar ekonomin.",
    context: {
      heading: "Så ser företagandet i Gävle ut",
      paragraphs: [
        "Entreprenad och industriservice innebär ojämn beläggning över året. Vintern kan vara tung och sommaren intensiv, eller tvärtom beroende på bransch. Det gör att resultatet i en enskild månad säger lite, och att skatteplaneringen behöver se till helåret.",
        "Många bolag har dessutom omvänd skattskyldighet att förhålla sig till om de arbetar inom bygg. Där ska ingen moms läggas på fakturan till en annan byggentreprenör, och det blir fel förvånansvärt ofta.",
      ],
    },
    highlights: [
      {
        title: "Omvänd skattskyldighet i bygg",
        text: "Vi ser till att momsen hanteras rätt både när ni fakturerar och när ni tar emot fakturor.",
      },
      {
        title: "Säsong som jämnas ut",
        text: "Vi följer helåret och varnar i god tid när skatten kommer att slå till.",
      },
      {
        title: "Maskiner och utrustning",
        text: "Avskrivningar och investeringar planeras medvetet i stället för att bli en efterhandskonstruktion.",
      },
    ],
    faq: [
      {
        question: "När gäller omvänd skattskyldighet inom bygg?",
        answer:
          "När du säljer byggtjänster till ett företag som självt säljer byggtjänster mer än tillfälligt. Då lägger du ingen moms på fakturan och köparen redovisar den i stället. Vi bedömer varje kundrelation åt er.",
      },
      {
        question: "Vår verksamhet är säsongsbetonad. Blir bokföringen dyrare vissa månader?",
        answer:
          "Nej. Priset baseras på volymen sett över året, och du betalar samma summa varje månad.",
      },
      {
        question: "Kan ni hantera löner med traktamente och restid?",
        answer:
          "Ja. Vi räknar traktamenten enligt Skatteverkets belopp och ser till att de redovisas rätt så att de förblir skattefria där de ska vara det.",
      },
      {
        question: "Vi hyr in personal i perioder. Hur bokförs det?",
        answer:
          "Inhyrd personal är en tjänsteinköp och bokförs som extern kostnad, inte som lön. Skillnaden påverkar både moms och arbetsgivaravgifter, och vi håller isär det.",
      },
      {
        question: "Måste vi byta bokföringsprogram?",
        answer:
          "Nej. Vi arbetar i molnbaserade system och anpassar oss efter vad ni redan använder om det fungerar. Gör det inte det säger vi det och föreslår ett byte.",
      },
    ],
    nearby: ["uppsala", "umea", "stockholm"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
