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
  /**
   * Satt på områdessidor och pekar på den ort de hör till. Saknas fältet är
   * posten en ort i sig. URL:erna är platta oavsett, alltså
   * /redovisningsbyra/solna och inte /redovisningsbyra/stockholm/solna.
   * Solna och Södertälje är egna kommuner, en påhittad hierarki hade varit
   * felaktig och gett längre URL:er utan vinst.
   */
  partOf?: string;
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
          "Timpris är vanligt i Stockholm och gör kostnaden svår att förutse. Vi arbetar med fast månadspris i stället, och lämnar ett fast belopp efter att ha tittat på ditt bolag, så att du vet vad det landar på innan månaden börjar.",
      },
      {
        question: "Jag har redan en byrå. Hur byter jag?",
        answer:
          "Vi begär ut bokföringen från din nuvarande byrå och tar över löpande, oftast vid ett månadsskifte. Du behöver inte vänta till nytt räkenskapsår.",
      },
      {
        question: "Kan ni hjälpa till med lön för mina anställda?",
        answer:
          "Ja. Vi hanterar löneutbetalningar, arbetsgivardeklaration på individnivå och kontrolluppgifter. Har du anställda ryms det i ditt fasta månadspris.",
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
          "Löpande bokföring, momsredovisning och digital dokumenthantering ingår alltid. Lön, bokslut och deklaration läggs till när bolaget behöver dem.",
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
          "Aktiekapitalet är 25 000 kr och Bolagsverket tar en registreringsavgift. Vår hjälp med registrering och uppstart offereras separat, därefter löper bokföringen på fast månadspris.",
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
          "För en konsult med få verifikat i månaden räcker oftast löpande bokföring, momsredovisning och digital dokumenthantering. Vi tittar på din faktiska volym och lämnar ett fast månadspris.",
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
          "Löpande bokföring utan tak på antal verifikat, och lön för upp till ett tiotal anställda, ryms i ett fast månadspris. Har ni fler tar vi fram en separat offert.",
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
          "Ja. Lön för ett par anställda ryms i det fasta månadspriset, och för större team sätts priset efter antalet anställda.",
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
          "Vi arbetar med fast månadspris. Beloppet beror på antal verifikat, antal anställda och om du behöver lön, bokslut och deklaration. Efter en kort och kostnadsfri genomgång får du ett fast belopp.",
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
        question: "Jag driver enskild firma vid sidan av min anställning. Passar ni för det?",
        answer:
          "Oftast ja. För mindre verksamheter med få verifikat i månaden sköter vi löpande bokföring och periodiska rapporter till ett fast månadspris.",
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
        text: "Fast månadspris, oavsett var i landet du sitter. Avståndet påverkar inte beloppet.",
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
          "Vi arbetar med fast månadspris i stället för timdebitering. Många lokala byråer tar betalt per timme, vilket gör kostnaden svår att förutse.",
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
        "Med hamnen som nav säljer många bolag utanför Sverige. Vid försäljning till ett momsregistrerat företag i ett annat EU-land ska ingen moms läggas på fakturan, men köparens VAT-nummer måste kontrolleras och försäljningen rapporteras i en periodisk sammanställning. Missas det kommer påminnelsen från Skatteverket.",
      ],
    },
    highlights: [
      {
        title: "Export och EU-handel",
        text: "VAT-nummer kontrolleras och periodisk sammanställning lämnas i tid, varje period.",
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
        question: "Vi säljer till kunder i andra EU-länder. Hur hanteras momsen?",
        answer:
          "Säljer du varor till ett momsregistrerat företag i ett annat EU-land fakturerar du utan moms, men köparens VAT-nummer måste vara giltigt och försäljningen ska med i den periodiska sammanställningen. Vi kontrollerar numren och lämnar rapporten åt er.",
      },
      {
        question: "Vår verksamhet är säsongsbetonad. Blir bokföringen dyrare vissa månader?",
        answer:
          "Nej. Priset baseras på volymen sett över året, och du betalar samma summa varje månad.",
      },
      {
        question: "Kan ni hantera skiftarbete och OB-tillägg i lönen?",
        answer:
          "Ja. Skiftscheman, OB-tillägg och övertid enligt kollektivavtal hanteras i lönekörningen, och underlaget rapporteras till Skatteverket varje månad.",
      },
      {
        question: "Vi ska investera i en dyr maskin. Hur påverkar det resultatet?",
        answer:
          "Maskinen kostnadsförs inte direkt utan skrivs av över sin livslängd, normalt fem år. Vi går igenom hur investeringen slår på resultat och skatt innan ni skriver på, och om räkenskapsenlig avskrivning kan användas för att sänka skatten tidigare.",
      },
      {
        question: "Måste vi byta bokföringsprogram?",
        answer:
          "Nej. Vi arbetar i molnbaserade system och anpassar oss efter vad ni redan använder om det fungerar. Gör det inte det säger vi det och föreslår ett byte.",
      },
    ],
    nearby: ["uppsala", "umea", "stockholm"],
  },

  // --- Områden i och kring Stockholm -----------------------------------

  {
    slug: "kista",
    name: "Kista",
    inName: "Kista",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Kista | Bokföring för IT- och konsultbolag",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Kista. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid IT-konsulter och bolag med utländska ägare.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Kista.",
    intro:
      "Kista är Sveriges tätaste ansamling av IT- och telekombolag, och runt de stora företagen finns hundratals mindre konsultbolag. Det är den typen av verksamhet vi arbetar med varje dag.",
    context: {
      heading: "Så ser företagandet i Kista ut",
      paragraphs: [
        "De flesta bolagen här säljer tid. Konsulter fakturerar mot ramavtal, ofta med underkonsulter inblandade i perioder, och då är det viktigt att egen tid och inköpt tid hålls isär i bokföringen. Annars säger marginalen ingenting om hur bolaget faktiskt går.",
        "Kista har också ovanligt många bolag med utländska ägare eller grundare som flyttat hit. Där dyker frågor upp som svenska företagare aldrig möter: hur lön till en ägare bosatt utomlands hanteras, och vad som gäller för moms när kunden sitter i ett annat land.",
      ],
    },
    highlights: [
      {
        title: "Konsult och underkonsult",
        text: "Egen fakturerad tid och inköpt tid separeras, så att du ser vad varje uppdrag verkligen ger.",
      },
      {
        title: "Internationella ägare",
        text: "Vi hanterar bolag med ägare utomlands och förklarar reglerna på svenska, engelska eller persiska.",
      },
      {
        title: "Molntjänster och licenser",
        text: "Programvara köpt från utlandet momsredovisas omvänt. Det sköts löpande i stället för att redas ut vid bokslut.",
      },
    ],
    faq: [
      {
        question: "Vi fakturerar kunder utanför Sverige. Ska vi lägga på moms?",
        answer:
          "Vid tjänster till företag i andra EU-länder läggs ingen svensk moms på, köparen redovisar den. Till länder utanför EU gäller ofta ingen moms alls. Vi bedömer varje kundrelation och sköter redovisningen.",
      },
      {
        question: "En av delägarna bor utomlands. Påverkar det lönen?",
        answer:
          "Ja, det kan påverka både skatteavdrag och sociala avgifter beroende på var arbetet utförs och vilket land det gäller. Vi går igenom situationen innan första lönen betalas ut.",
      },
      {
        question: "Kan ni hantera bokföring på engelska?",
        answer:
          "Bokföringen sker enligt svenska regler, men vi kommunicerar och förklarar på engelska om det är enklare för er. Rapporter kan tas fram på engelska vid behov.",
      },
      {
        question: "Vi är ett litet konsultbolag med två delägare. Vilket paket passar?",
        answer:
          "Oftast löpande bokföring, lön till er båda, bokslut och deklaration. Vi tittar på den faktiska volymen och samlar allt i ett fast månadspris.",
      },
      {
        question: "Måste vi ses på plats i Kista?",
        answer:
          "Nej. Allt sköts digitalt. Vill ni ändå ses ligger vi i Sollentuna, ett par stationer bort.",
      },
    ],
    nearby: ["stockholm", "solna", "sundbyberg"],
  },

  {
    slug: "solna",
    name: "Solna",
    inName: "Solna",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Solna | Bokföring, lön och bokslut till fast pris",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Solna. Bokföring, lön, bokslut och deklaration till fast månadspris. Vana vid bolag i tillväxt och life science.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Solna.",
    intro:
      "Solna har en ovanligt hög koncentration av företag i förhållande till sin storlek, från huvudkontor i Arenastaden till forskningsnära bolag runt Karolinska. Det ger en blandning av snabbväxande bolag och verksamheter med lång startsträcka.",
    context: {
      heading: "Så ser företagandet i Solna ut",
      paragraphs: [
        "Bolag som växer snabbt passerar gränser de sällan har tänkt på i förväg. Kravet på revisor, gränsen för förenklat årsbokslut och den punkt där lönen till ägaren behöver läggas om för att utdelningsutrymmet ska bli bra. Att få veta det i förväg är skillnaden mellan planering och panik.",
        "Runt Karolinska finns dessutom bolag som lever på forskningsmedel innan de säljer något. Där måste bidrag, lån och ägartillskott hållas isär i bokföringen, annars blir både eget kapital och skattemässigt resultat fel.",
      ],
    },
    highlights: [
      {
        title: "Varning innan gränserna",
        text: "Revisorsplikt och momsgränser bevakas löpande. Vi hör av oss innan de passeras, inte efteråt.",
      },
      {
        title: "Kontor och personal",
        text: "Hyresavtal, förmåner och friskvård bokförs rätt så att det inte blir en skattesmäll i efterhand.",
      },
      {
        title: "Finansiering hålls isär",
        text: "Bidrag, lån och tillskott bokförs var för sig, så att resultatet visar vad verksamheten faktiskt gör.",
      },
    ],
    faq: [
      {
        question: "När måste vårt bolag utse revisor?",
        answer:
          "När två av tre gränsvärden överskrids två år i rad: fler än tre anställda, mer än 1,5 miljoner i balansomslutning eller mer än 3 miljoner i nettoomsättning. Vi bevakar det åt er.",
      },
      {
        question: "Hur bokförs friskvårdsbidrag till personalen?",
        answer:
          "Upp till 5 000 kr per anställd och år är skattefritt om det erbjuds alla på lika villkor. Överskjutande belopp blir en skattepliktig förmån. Vi håller isär det i lönen.",
      },
      {
        question: "Vi hyr kontor. Är momsen avdragsgill?",
        answer:
          "Bara om hyresvärden är frivilligt skattskyldig för lokalen, vilket framgår av hyresavtalet och fakturan. Vi kontrollerar det så att avdraget blir rätt.",
      },
      {
        question: "Vi har precis fått in en investerare. Hur bokförs det?",
        answer:
          "Aktiekapitalet ökar och överskjutande belopp läggs i överkursfond. Det är inte en intäkt. Vi bokför emissionen och tar fram underlaget till Bolagsverket.",
      },
      {
        question: "Kan ni ta över mitt bolag mitt i räkenskapsåret?",
        answer:
          "Ja. Vi hämtar underlagen från din nuvarande byrå och tar vid från valfritt månadsskifte.",
      },
    ],
    nearby: ["stockholm", "sundbyberg", "kista"],
  },

  {
    slug: "sundbyberg",
    name: "Sundbyberg",
    inName: "Sundbyberg",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Sundbyberg | Bokföring för små bolag till fast pris",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Sundbyberg. Bokföring, moms, lön och bokslut till fast pris. Anpassat för enmansbolag och mindre tjänsteföretag.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Sundbyberg.",
    intro:
      "Sundbyberg är landets till ytan minsta kommun men en av de tätast befolkade, och företagandet präglas av många små tjänsteföretag snarare än av några få stora. Det är bolag där ägaren gör allt själv och där tiden är den knappaste resursen.",
    context: {
      heading: "Så ser företagandet i Sundbyberg ut",
      paragraphs: [
        "Ett enmansbolag har sällan komplicerad bokföring, men desto fler frågor om vad som får dras av. Hemmakontor, telefon, dator och resor är poster där gränsen mellan privat och företag är otydlig, och där misstagen kostar mer än de sparar.",
        "Många börjar dessutom som enskild firma vid sidan av en anställning och går över till aktiebolag när uppdragen blir stadiga. Just den övergången är värd att räkna på i förväg i stället för att göra av magkänsla.",
      ],
    },
    highlights: [
      {
        title: "Rätt avdrag, inga övertramp",
        text: "Hemmakontor, telefon och resor. Vi säger vad som faktiskt går att dra av och vad som inte gör det.",
      },
      {
        title: "Firma eller aktiebolag",
        text: "Vi räknar på dina siffror i stället för att gissa, och sköter övergången när den lönar sig.",
      },
      {
        title: "Litet paket, låg tröskel",
        text: "Fast månadspris. Du betalar för det som faktiskt händer i bolaget.",
      },
    ],
    faq: [
      {
        question: "Får jag dra av för kontor hemma?",
        answer:
          "I aktiebolag krävs normalt att rummet används uteslutande för verksamheten, vilket sällan är uppfyllt. I enskild firma finns ett schablonavdrag under vissa förutsättningar. Vi går igenom din situation innan något dras av.",
      },
      {
        question: "Kan jag dra av mobiltelefonen?",
        answer:
          "Ja, om abonnemanget står på bolaget och används i verksamheten. Ren privat användning i mindre omfattning brukar accepteras. Vi bokför det korrekt.",
      },
      {
        question: "Vid vilken vinst blir aktiebolag bättre än enskild firma?",
        answer:
          "En vanlig tumregel är stabil vinst över ungefär 450 000 till 500 000 kr per år, men det beror på hur mycket du tar ut och vilken risk verksamheten har. Vi räknar på just dina siffror.",
      },
      {
        question: "Jag har bara några få fakturor i månaden. Är det värt en byrå?",
        answer:
          "Ofta ja, eftersom tiden du lägger på att göra rätt är värd mer än vad månadspriset kostar. Tycker vi att du klarar det själv säger vi hellre det.",
      },
      {
        question: "Behöver vi ses?",
        answer:
          "Nej, allt sköts digitalt. Du fotar underlagen i mobilen och vi hörs på WhatsApp eller telefon.",
      },
    ],
    nearby: ["solna", "stockholm", "kista"],
  },

  {
    slug: "upplands-vasby",
    name: "Upplands Väsby",
    inName: "Upplands Väsby",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Upplands Väsby | Bokföring för lager och logistik",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Upplands Väsby. Bokföring, lager, lön, bokslut och deklaration till fast pris. Vana vid logistik nära Arlanda.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Upplands Väsby.",
    intro:
      "Upplands Väsby ligger mellan Stockholm och Arlanda, och närheten till flygplatsen märks i näringslivet. Lager, distribution och lätt industri väger tyngre här än rena tjänsteföretag.",
    context: {
      heading: "Så ser företagandet i Upplands Väsby ut",
      paragraphs: [
        "Bolag med lager har kapital bundet i varor som ännu inte sålts. Hur lagret värderas vid bokslutet påverkar både resultat och skatt, och underlaget måste vara dokumenterat för att hålla vid en granskning.",
        "Ligger verksamheten nära Arlanda följer ofta import med. Då redovisas momsen mot Tullverkets underlag och inte mot leverantörens faktura, vilket är två olika belopp och en av de vanligaste felkällorna i momsdeklarationen.",
      ],
    },
    highlights: [
      {
        title: "Lagervärdering som håller",
        text: "Värdering enligt lägsta värdets princip med dokumenterat underlag inför bokslutet.",
      },
      {
        title: "Import och tullvärde",
        text: "Importmomsen stäms av mot Tullverkets sammanställning varje period.",
      },
      {
        title: "Fordon och transport",
        text: "Vi kan skillnaden i momsavdrag mellan personbil och lätt lastbil, och mellan leasing och köp.",
      },
    ],
    faq: [
      {
        question: "Vi importerar varor. Hur redovisas importmomsen?",
        answer:
          "Med tullvärdet som underlag, inte med fakturabeloppet från leverantören. Vi stämmer av mot Tullverkets månadssammanställning så att beloppen blir rätt.",
      },
      {
        question: "Hur värderas lagret vid bokslut?",
        answer:
          "Till det lägsta av anskaffningsvärde och nettoförsäljningsvärde. Vi går igenom lagret med er och dokumenterar beräkningen.",
      },
      {
        question: "Får vi dra av momsen på firmabilen?",
        answer:
          "För personbil normalt inte vid köp och bara halva momsen vid leasing. För lätt lastbil gäller andra regler. Vi ser till att avdraget blir rätt för era fordon.",
      },
      {
        question: "Vi har lagerpersonal med skiftarbete. Klarar ni lönen?",
        answer:
          "Ja. OB-tillägg, övertid och semesterersättning räknas i lönekörningen och rapporteras varje månad.",
      },
      {
        question: "Vad kostar det för ett bolag med lager och import?",
        answer:
          "Beloppet beror på antal verifikat, antal anställda och hur komplex importen är. Löpande bokföring, lön, bokslut och deklaration samlas i ett fast månadspris.",
      },
    ],
    nearby: ["sigtuna", "solna", "stockholm"],
  },

  {
    slug: "sigtuna",
    name: "Sigtuna",
    inName: "Sigtuna",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Sigtuna | Bokföring för besöksnäring och logistik",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Sigtuna. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid hotell, restaurang och verksamhet kring Arlanda.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Sigtuna.",
    intro:
      "Sigtuna kommun rymmer både en av landets äldsta stadskärnor och Arlanda. Det ger ett näringsliv där besöksnäring och logistik dominerar, båda med tydliga säsongsvängningar.",
    context: {
      heading: "Så ser företagandet i Sigtuna ut",
      paragraphs: [
        "Hotell, restaurang och konferens har en kostnadsbild som skiljer sig från de flesta branschers. Blandade momssatser på mat, logi och alkohol, personalliggare som är obligatorisk, och en personalstyrka som varierar kraftigt över året.",
        "Säsongen gör dessutom att en enskild månad säger lite om hur det går. Resultatet behöver läsas över helåret, och skatten planeras därefter, annars kommer betalningarna vid fel tillfälle.",
      ],
    },
    highlights: [
      {
        title: "Blandade momssatser",
        text: "Mat, logi och alkohol har olika moms. Vi ser till att fördelningen blir rätt varje period.",
      },
      {
        title: "Personal som varierar",
        text: "Timanställda, säsongspersonal och OB hanteras i lönekörningen utan att du behöver hålla reda på reglerna.",
      },
      {
        title: "Säsong som jämnas ut",
        text: "Vi läser helåret och säger till i god tid när skatt eller moms kommer att ligga tungt.",
      },
    ],
    faq: [
      {
        question: "Vilka momssatser gäller för hotell och restaurang?",
        answer:
          "Logi har 12 procent, mat 12 procent och alkohol 25 procent. Serveringen ska därför delas upp. Vi lägger upp bokföringen så att fördelningen sker automatiskt.",
      },
      {
        question: "Vi har många timanställda. Blir lönen dyrare?",
        answer:
          "Nej, priset utgår från antal anställda och inte från antal timmar. Upp till ett tiotal anställda ryms i det fasta månadspriset, och över det tar vi fram en separat offert.",
      },
      {
        question: "Måste vi föra personalliggare?",
        answer:
          "Ja, inom restaurang och en del andra branscher är det ett krav och Skatteverket gör oanmälda kontroller. Vi påminner om det men själva liggaren sköts på plats.",
      },
      {
        question: "Vår omsättning svänger kraftigt över året. Hur planerar vi skatten?",
        answer:
          "Vi följer resultatet löpande och justerar preliminärskatten när det behövs, så att inbetalningarna följer verkligheten i stället för fjolårets siffror.",
      },
      {
        question: "Behöver ni komma hit?",
        answer:
          "Nej. Underlagen laddas upp digitalt och vi stämmer av på telefon eller video.",
      },
    ],
    nearby: ["upplands-vasby", "stockholm", "uppsala"],
  },

  {
    slug: "vasastan",
    name: "Vasastan",
    inName: "Vasastan",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Vasastan | Bokföring för mottagningar och konsulter",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Vasastan. Bokföring, moms, lön och bokslut till fast pris. Vana vid privata mottagningar och mindre konsultbolag.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Vasastan.",
    intro:
      "Vasastan har en tät blandning av små konsultbolag och privata mottagningar inom vård och tandvård. Just vårdbolagen har en momssituation som skiljer sig från nästan alla andra branscher.",
    context: {
      heading: "Så ser företagandet i Vasastan ut",
      paragraphs: [
        "Sjukvård och tandvård är undantagna från moms. Det låter enkelt men blir snabbt komplicerat, eftersom bolaget då inte heller får dra av moms på sina inköp. Säljer mottagningen dessutom något momspliktigt vid sidan om, till exempel hudvårdsprodukter, uppstår blandad verksamhet där avdragen måste fördelas.",
        "Övriga bolag i området är ofta enmanskonsulter inom juridik, kommunikation eller design. Där handlar det mindre om regelkrångel och mer om att slippa lägga kvällar på bokföring.",
      ],
    },
    highlights: [
      {
        title: "Momsfri vård",
        text: "Vi hanterar undantaget och den blandade verksamhet som uppstår när något momspliktigt säljs vid sidan om.",
      },
      {
        title: "Fördelning av avdrag",
        text: "Vid blandad verksamhet fördelas ingående moms efter en dokumenterad grund som håller vid granskning.",
      },
      {
        title: "Enkelt för enmansbolag",
        text: "Du fotar underlagen och vi sköter resten, till ett fast månadspris.",
      },
    ],
    faq: [
      {
        question: "Vi driver mottagning. Ska vi fakturera med moms?",
        answer:
          "Sjukvård och tandvård som utförs av legitimerad personal är undantagen från moms. Konsekvensen är att ni inte heller får dra av moms på inköp. Vi lägger upp bokföringen efter det.",
      },
      {
        question: "Vi säljer även produkter i receptionen. Hur påverkar det momsen?",
        answer:
          "Då uppstår blandad verksamhet. Ingående moms måste fördelas mellan den momsfria vården och den momspliktiga försäljningen. Vi tar fram en fördelningsgrund och dokumenterar den.",
      },
      {
        question: "Kan ni hantera lön för anställd personal i mottagningen?",
        answer:
          "Ja. Lön, arbetsgivardeklaration och kontrolluppgifter ryms i det fasta månadspriset.",
      },
      {
        question: "Jag är konsult med eget aktiebolag. Vilket paket passar?",
        answer:
          "Har du få verifikat i månaden räcker oftast löpande bokföring och momsredovisning. Behöver du lön till dig själv och bokslut läggs de till i samma fasta månadspris.",
      },
      {
        question: "Måste jag komma in till er?",
        answer:
          "Nej. Allt sköts digitalt, men vi finns i Sollentuna om du hellre vill ses.",
      },
    ],
    nearby: ["ostermalm", "kungsholmen", "stockholm"],
  },

  {
    slug: "kungsholmen",
    name: "Kungsholmen",
    inName: "Kungsholmen",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Kungsholmen | Bokföring för byråer och konsultbolag",
    metaDescription:
      "Digital redovisningsbyrå för företagare på Kungsholmen. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid projektfakturering och mindre byråer.",
    h1Lead: "Redovisningsbyrå på",
    h1Accent: "Kungsholmen.",
    intro:
      "Kungsholmen har många mindre byråer och konsultbolag inom kommunikation, teknik och juridik. Det är verksamheter som arbetar i projekt, och där bokföringen behöver kunna svara på vad varje projekt gav.",
    context: {
      heading: "Så ser företagandet på Kungsholmen ut",
      paragraphs: [
        "Ett projektdrivet bolag fakturerar sällan jämnt över året. Ett uppdrag kan pågå i månader innan slutfakturan går ut, medan kostnaderna löper på hela tiden. Utan periodisering ser resultatet ryckigt ut och säger mindre än det borde.",
        "Många byråer köper dessutom in frilansare i perioder. Att skilja egen tid från inköpt tid i bokföringen är det som gör att marginalen går att lita på.",
      ],
    },
    highlights: [
      {
        title: "Projekt som går att följa",
        text: "Intäkter och kostnader kopplas till projekt, så att du ser vad varje uppdrag faktiskt gav.",
      },
      {
        title: "Frilansare och underleverantörer",
        text: "Inköpt tid hålls isär från egen, och vi kontrollerar F-skatt hos dem ni anlitar.",
      },
      {
        title: "Periodisering",
        text: "Långa uppdrag periodiseras så att resultatet följer arbetet och inte fakturadatumen.",
      },
    ],
    faq: [
      {
        question: "Hur bokförs ett uppdrag som sträcker sig över årsskiftet?",
        answer:
          "Intäkten ska redovisas i takt med att arbetet utförs, inte när fakturan skickas. Vi periodiserar pågående arbeten vid bokslutet så att resultatet hamnar på rätt år.",
      },
      {
        question: "Vi anlitar frilansare. Vad behöver vi tänka på?",
        answer:
          "Kontrollera att de har F-skatt, annars kan ni bli skyldiga att betala arbetsgivaravgifter. Vi kontrollerar det och flaggar om något ser fel ut.",
      },
      {
        question: "Kan vi se resultat per kund?",
        answer:
          "Ja. Vi lägger upp bokföringen med projekt eller kund som dimension, så att rapporterna kan brytas ner den vägen.",
      },
      {
        question: "Hur hanteras representation?",
        answer:
          "Avdragsrätten för representation är begränsad och skiljer sig mellan mat och enklare förtäring. Vi bokför det rätt så att avdraget inte ifrågasätts.",
      },
      {
        question: "Vad kostar det för en frilansare utan anställda?",
        answer:
          "En frilansare utan anställda ligger lägre. Byråer med anställda och bokslut hamnar högre. Efter en genomgång av bolaget lämnar vi ett fast belopp.",
      },
    ],
    nearby: ["vasastan", "sodermalm", "stockholm"],
  },

  {
    slug: "ostermalm",
    name: "Östermalm",
    inName: "Östermalm",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Östermalm | Bokföring, holdingbolag och utdelning",
    metaDescription:
      "Digital redovisningsbyrå för företagare på Östermalm. Bokföring, bokslut, deklaration och K10 till fast pris. Vana vid holdingstrukturer och konsultbolag.",
    h1Lead: "Redovisningsbyrå på",
    h1Accent: "Östermalm.",
    intro:
      "På Östermalm är bolagsstrukturerna ofta mer sammansatta än på andra håll. Holdingbolag, flera delägare och verksamhet som byggts upp över lång tid ställer andra krav på bokslut och deklaration.",
    context: {
      heading: "Så ser företagandet på Östermalm ut",
      paragraphs: [
        "Ett holdingbolag som äger ett eller flera rörelsebolag innebär att utdelning ska hanteras i flera led, och att varje bolag har sitt eget bokslut och sin egen deklaration. Görs det slarvigt blir skatten fel på en nivå som märks.",
        "Med flera delägare räknas dessutom utdelningsutrymmet enligt 3:12-reglerna per person. Löneuttaget under året avgör hur stort utrymmet blir, och det går inte att rätta i efterhand när året väl är slut.",
      ],
    },
    highlights: [
      {
        title: "Holdingstrukturer",
        text: "Bokslut och deklaration för både moderbolag och dotterbolag, med utdelning hanterad i rätt ordning.",
      },
      {
        title: "K10 per delägare",
        text: "Utdelningsutrymmet räknas fram för var och en, med underlag du kan lämna till din deklaration.",
      },
      {
        title: "Beslut medan de går att ta",
        text: "Vi räknar på löneuttaget under hösten, inte i maj när året redan är låst.",
      },
    ],
    faq: [
      {
        question: "Vi har ett holdingbolag och ett rörelsebolag. Blir det dubbelt pris?",
        answer:
          "Varje bolag behöver egen bokföring, eget bokslut och egen deklaration, så det blir två uppdrag. Holdingbolaget har normalt få transaktioner och ligger därför på det lägsta paketet.",
      },
      {
        question: "Hur mycket lön måste jag ta ut för att få högre utdelningsutrymme?",
        answer:
          "För att få använda löneunderlagsregeln krävs ett eget löneuttag som beror på bolagets totala löner och på ett belopp kopplat till inkomstbasbeloppet. Vi räknar fram gränsen för ditt bolag under hösten.",
      },
      {
        question: "Är utdelning alltid bättre än lön?",
        answer:
          "Nej. Lön ger pensionsgrundande inkomst, sjukpenning och föräldrapenning, och krävs dessutom för att bygga utdelningsutrymme. Rätt mix beror på din situation, och vi går igenom den med dig.",
      },
      {
        question: "Kan ni ta hand om deklarationen för flera bolag?",
        answer:
          "Ja. Vi upprättar inkomstdeklaration för varje bolag och tar fram K10-underlag för delägarna.",
      },
      {
        question: "Vi vill byta byrå men mitt i året. Går det?",
        answer:
          "Ja. Vi hämtar underlagen från nuvarande byrå och tar över från valfritt månadsskifte.",
      },
    ],
    nearby: ["vasastan", "stockholm", "kungsholmen"],
  },

  {
    slug: "sodermalm",
    name: "Södermalm",
    inName: "Södermalm",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Södermalm | Bokföring för frilans, restaurang och handel",
    metaDescription:
      "Digital redovisningsbyrå för företagare på Södermalm. Bokföring, moms, lön och bokslut till fast pris. Vana vid frilansare, kreatörer, restaurang och butik.",
    h1Lead: "Redovisningsbyrå på",
    h1Accent: "Södermalm.",
    intro:
      "Södermalm har en ovanligt hög andel frilansare, kreatörer och små handels- och restaurangbolag. Det är verksamheter med låg administrativ tålighet, där bokföringen måste vara enkel för att bli gjord alls.",
    context: {
      heading: "Så ser företagandet på Södermalm ut",
      paragraphs: [
        "Frilansare inom foto, film, design och text har ofta oregelbundna intäkter och en kostnadsbild med utrustning som ska skrivas av. Många börjar i enskild firma och undrar när det är dags att byta till aktiebolag.",
        "Restaurang och butik har i stället kassaregister, blandade momssatser och personal som varierar. Här är personalliggaren obligatorisk och kontrollerna oanmälda, vilket gör att rutinerna behöver sitta från dag ett.",
      ],
    },
    highlights: [
      {
        title: "Enkelt för frilans",
        text: "Foto på kvittot räcker. Vi sköter resten och säger till om något saknas.",
      },
      {
        title: "Utrustning och avskrivning",
        text: "Kameror, datorer och verktyg. Vi avgör vad som ska kostnadsföras direkt och vad som skrivs av.",
      },
      {
        title: "Kassa och blandad moms",
        text: "Restaurang och butik med olika momssatser hanteras rätt varje period.",
      },
    ],
    faq: [
      {
        question: "Jag är frilansare med ojämna inkomster. Hur planeras skatten?",
        answer:
          "Vi följer resultatet löpande och justerar preliminärskatten när det behövs, i stället för att låta den bygga på fjolårets siffror. Det gör att kvarskatten inte kommer som en överraskning.",
      },
      {
        question: "Ska en ny kamera kostnadsföras eller skrivas av?",
        answer:
          "Inköp under ett halvt prisbasbelopp får kostnadsföras direkt. Dyrare utrustning som används i flera år skrivs av. Vi bedömer varje inköp.",
      },
      {
        question: "Vilka momssatser gäller i restaurang?",
        answer:
          "Mat serverad på plats har 12 procent och alkohol 25 procent. Försäljningen behöver därför delas upp, och vi lägger upp bokföringen så att det sker automatiskt.",
      },
      {
        question: "Måste jag ha kassaregister?",
        answer:
          "Ja, vid försäljning mot kontant eller kort till privatpersoner över ett visst belopp per år. Registret ska vara certifierat och anmält till Skatteverket.",
      },
      {
        question: "Jag har enskild firma. Ska jag byta till aktiebolag?",
        answer:
          "Det beror på vinst, risk och hur mycket du tar ut. Vi räknar på dina siffror och säger vad som lönar sig, i stället för att svara med en tumregel.",
      },
    ],
    nearby: ["kungsholmen", "farsta", "stockholm"],
  },

  {
    slug: "haninge",
    name: "Haninge",
    inName: "Haninge",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Haninge | Bokföring för bygg och hantverk",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Haninge. Bokföring, ROT, omvänd skattskyldighet, lön och bokslut till fast pris.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Haninge.",
    intro:
      "Haninge har en stor andel bygg-, hantverks- och serviceföretag som arbetar både mot privatpersoner och mot andra byggföretag. Just den kombinationen gör momsen mer komplicerad än den ser ut.",
    context: {
      heading: "Så ser företagandet i Haninge ut",
      paragraphs: [
        "Fakturerar du en annan byggentreprenör gäller omvänd skattskyldighet, alltså ingen moms på fakturan. Fakturerar du en privatperson gäller vanlig moms, och ofta ROT-avdrag som ska begäras hos Skatteverket. Många bolag gör båda delarna och blandar ihop dem.",
        "ROT innebär dessutom att en del av betalningen kommer från Skatteverket i stället för från kunden, vilket påverkar likviditeten. Utbetalningen dröjer, och det behöver man planera för.",
      ],
    },
    highlights: [
      {
        title: "Omvänd skattskyldighet",
        text: "Vi bedömer varje kundrelation så att momsen blir rätt både när ni fakturerar och när ni tar emot fakturor.",
      },
      {
        title: "ROT utan krångel",
        text: "Ansökan om utbetalning sköts löpande och vi håller reda på vad som är utbetalt.",
      },
      {
        title: "Lön med traktamente",
        text: "Restid, traktamente och OB räknas rätt så att det förblir skattefritt där det ska vara det.",
      },
    ],
    faq: [
      {
        question: "När gäller omvänd skattskyldighet?",
        answer:
          "När du säljer byggtjänster till ett företag som självt säljer byggtjänster mer än tillfälligt. Då lägger du ingen moms på fakturan och köparen redovisar den. Vi bedömer varje kund åt er.",
      },
      {
        question: "Kan ni sköta ROT-ansökningarna?",
        answer:
          "Ja. Vi begär utbetalning från Skatteverket och stämmer av att beloppen kommer in, så att ni ser vad som är kvar att få.",
      },
      {
        question: "Hur påverkar ROT vår likviditet?",
        answer:
          "Kunden betalar bara sin del direkt och resten kommer från Skatteverket senare. Vi håller koll på utestående ansökningar så att ni vet vad som är på väg in.",
      },
      {
        question: "Vi hyr in personal ibland. Hur bokförs det?",
        answer:
          "Inhyrd personal är ett tjänsteinköp och bokförs som extern kostnad, inte som lön. Skillnaden påverkar både moms och arbetsgivaravgifter.",
      },
      {
        question: "Vad kostar det för ett byggbolag med fem anställda?",
        answer:
          "Med fem anställda tar lön och bokslut mer arbete i anspråk. Vi går igenom bolagets förutsättningar och lämnar ett fast månadspris som täcker det.",
      },
    ],
    nearby: ["farsta", "sodertalje", "stockholm"],
  },

  {
    slug: "sodertalje",
    name: "Södertälje",
    inName: "Södertälje",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Södertälje | Bokföring för industri och underleverantörer",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Södertälje. Bokföring, lön, bokslut och deklaration till fast pris. Rådgivning på svenska, engelska och persiska.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Södertälje.",
    intro:
      "Södertälje är en industristad där mycket av företagandet kretsar kring de stora arbetsgivarna och deras leverantörskedjor. Här finns också en av landets mest entreprenöriella och flerspråkiga företagarmiljöer.",
    context: {
      heading: "Så ser företagandet i Södertälje ut",
      paragraphs: [
        "Underleverantörer till industrin har långa betalningsvillkor och fakturerar mot leveranser eller ramavtal snarare än per månad. Det binder kapital och gör att kundreskontran behöver hållas efter, annars märks inte att en betalning uteblivit förrän den är rejält sen.",
        "Staden har dessutom en stor andel företagare med internationell bakgrund inom handel, restaurang och transport. Många driver bolaget skickligt men har aldrig fått svenska bokföringsregler förklarade på sitt eget språk, vilket skapar onödig oro inför varje kontakt med Skatteverket.",
      ],
    },
    highlights: [
      {
        title: "Rådgivning på ditt språk",
        text: "Svenska, engelska eller persiska. Reglerna ska gå att förstå oavsett vilket språk du tänker på.",
      },
      {
        title: "Reskontra som hålls efter",
        text: "Långa betalningsvillkor kräver ordning. Vi rapporterar vad som är förfallet innan det blir ett problem.",
      },
      {
        title: "Trygghet mot myndigheter",
        text: "Vi tar kontakten med Skatteverket när det behövs och förklarar vad ett brev faktiskt betyder.",
      },
    ],
    faq: [
      {
        question: "Kan jag få hjälp på persiska?",
        answer:
          "Ja. Vi ger rådgivning på svenska, engelska och persiska, och du kan skriva till oss på det språk du är mest bekväm med.",
      },
      {
        question: "Jag har fått ett brev från Skatteverket. Kan ni hjälpa till?",
        answer:
          "Ja. Skicka över brevet så förklarar vi vad det gäller och vad som behöver göras. Vi kan svara åt er när det är en fråga om bokföring eller deklaration.",
      },
      {
        question: "Vi levererar till en stor industrikund med långa betalningstider. Hur hanterar ni det?",
        answer:
          "Vi håller kundreskontran uppdaterad och rapporterar vad som är förfallet, så att ni kan agera i tid i stället för att upptäcka det för sent.",
      },
      {
        question: "Vi driver både handel och transport i samma bolag. Går det?",
        answer:
          "Ja, men verksamheterna behöver kunna följas var för sig i bokföringen för att siffrorna ska säga något. Vi lägger upp det så.",
      },
      {
        question: "Behöver vi ses fysiskt?",
        answer:
          "Nej. Allt sköts digitalt, men vi finns i Sollentuna om ni hellre vill träffas.",
      },
    ],
    nearby: ["haninge", "stockholm", "skarholmen"],
  },

  {
    slug: "farsta",
    name: "Farsta",
    inName: "Farsta",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Farsta | Bokföring för småföretag och vårdbolag",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Farsta. Bokföring, lön, bokslut och deklaration till fast pris. Vana vid mindre tjänsteföretag och vård och omsorg.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Farsta.",
    intro:
      "Farsta har ett näringsliv byggt kring lokal service: handel, hantverk, vård och omsorg. Det är bolag med få anställda där ägaren står mitt i verksamheten och sällan har tid över till administration.",
    context: {
      heading: "Så ser företagandet i Farsta ut",
      paragraphs: [
        "Inom vård och omsorg är tjänsterna ofta undantagna från moms, vilket också innebär att bolaget inte får dra av moms på sina inköp. Det är en regel som förvånar många, och som gör att kalkylen ser annorlunda ut än i andra branscher.",
        "Många bolag har dessutom kommunen som beställare, med avtal som ställer krav på fakturaformat och ger längre betalningstider. Det påverkar likviditeten mer än storleken på uppdraget antyder.",
      ],
    },
    highlights: [
      {
        title: "Momsfri verksamhet",
        text: "Vård och omsorg är undantagen från moms. Vi lägger upp bokföringen efter det från början.",
      },
      {
        title: "Kommunala avtal",
        text: "E-fakturakrav och långa betalningstider hanteras utan att ni behöver sätta er in i reglerna.",
      },
      {
        title: "Få anställda, full koll",
        text: "Lön, arbetsgivardeklaration och kontrolluppgifter sköts varje månad.",
      },
    ],
    faq: [
      {
        question: "Vår verksamhet är momsfri. Vad innebär det i praktiken?",
        answer:
          "Ni lägger ingen moms på fakturorna, men får inte heller dra av moms på inköp. Det betyder att momsen blir en ren kostnad, vilket behöver räknas in i prissättningen.",
      },
      {
        question: "Vi fakturerar kommunen. Behövs e-faktura?",
        answer:
          "Ja, vid inköp inom offentlig sektor är e-faktura enligt Peppol-standard ett krav. Vi hjälper er få rutinen på plats.",
      },
      {
        question: "Vi har tre anställda. Vilket paket passar?",
        answer:
          "Löpande bokföring, lön för alla tre, bokslut och deklaration, samlat i ett fast månadspris.",
      },
      {
        question: "Kan ni hantera sjuklön och karensavdrag?",
        answer:
          "Ja. Sjuklön, karensavdrag och ersättning från Försäkringskassan hanteras i lönekörningen.",
      },
      {
        question: "Behöver jag komma in till er?",
        answer:
          "Nej. Du fotar underlagen i mobilen och vi hörs på telefon eller WhatsApp.",
      },
    ],
    nearby: ["sodermalm", "haninge", "skarholmen"],
  },

  {
    slug: "skarholmen",
    name: "Skärholmen",
    inName: "Skärholmen",
    region: "Stockholms län",
    partOf: "stockholm",
    metaTitle: "Redovisningsbyrå Skärholmen | Bokföring på svenska, engelska och persiska",
    metaDescription:
      "Digital redovisningsbyrå för företagare i Skärholmen. Bokföring, moms, lön och bokslut till fast pris. Rådgivning på svenska, engelska och persiska.",
    h1Lead: "Redovisningsbyrå i",
    h1Accent: "Skärholmen.",
    intro:
      "Skärholmen har ett starkt och företagsamt näringsliv med handel, restaurang och service, och en stor andel företagare med internationell bakgrund. Många driver verksamheten skickligt men har aldrig fått reglerna förklarade på sitt eget språk.",
    context: {
      heading: "Så ser företagandet i Skärholmen ut",
      paragraphs: [
        "Handel och restaurang innebär kassaregister, blandade momssatser och ofta kontanthantering. Det är också branscher där Skatteverket gör oanmälda kontroller, vilket gör att rutinerna behöver vara på plats innan någon knackar på.",
        "Med Kungens kurva strax intill finns dessutom många bolag inom detaljhandel och lager. Där avgör lagervärderingen hur resultatet ser ut, och den behöver dokumenteras för att hålla.",
      ],
    },
    highlights: [
      {
        title: "Rådgivning på ditt språk",
        text: "Svenska, engelska eller persiska. Du ska förstå din egen ekonomi, inte bara skriva under den.",
      },
      {
        title: "Kassa och kontanter",
        text: "Certifierat kassaregister, personalliggare och blandade momssatser hanteras rätt varje period.",
      },
      {
        title: "Redo för kontroll",
        text: "Underlagen är ordnade och sökbara, så att en oanmäld kontroll inte blir en kris.",
      },
    ],
    faq: [
      {
        question: "Får jag rådgivningen på mitt eget språk?",
        answer:
          "Ja. Vi ger rådgivning på svenska, engelska och persiska. Skriv till oss på det språk du föredrar.",
      },
      {
        question: "Måste jag ha certifierat kassaregister?",
        answer:
          "Ja, vid försäljning mot kontant eller kort till privatpersoner över ett visst belopp per år. Registret ska vara certifierat och anmält till Skatteverket.",
      },
      {
        question: "Vad händer vid en oanmäld kontroll?",
        answer:
          "Skatteverket kontrollerar bland annat personalliggare och kassaregister på plats. Har ni rutinerna på plats är det odramatiskt, och vi ser till att bokföringen är i ordning.",
      },
      {
        question: "Vi driver butik med lager. Hur värderas det vid bokslut?",
        answer:
          "Till det lägsta av anskaffningsvärde och nettoförsäljningsvärde. Vi går igenom lagret med er och dokumenterar beräkningen.",
      },
      {
        question: "Jag ska starta företag men vet inte vilken bolagsform. Kan ni hjälpa?",
        answer:
          "Ja. Vi går igenom skillnaderna i ansvar, skatt och administration och räknar på vad som passar din situation, innan du registrerar något.",
      },
    ],
    nearby: ["farsta", "sodertalje", "stockholm"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Orter, alltså allt som inte är ett område under en annan ort. */
export const cities = locations.filter((l) => !l.partOf);

/** Områden som hör till en viss ort. */
export function areasOf(slug: string): Location[] {
  return locations.filter((l) => l.partOf === slug);
}
