/**
 * Innehållet till tjänstesidorna på /tjanster/[tjanst].
 *
 * Tre regler gäller när en tjänst läggs till eller skrivs om:
 *
 * 1. `name` måste vara exakt samma sträng som gruppens `title` i den svenska
 *    ordlistan (`content/locales/sv.ts`). Startsidans tjänstekort kopplas mot
 *    rätt sida via ordningen i listan, och en avvikelse ger tyst fel länk.
 * 2. `details` ska täcka gruppens punkter, i samma ordning. Punkten på kortet
 *    är löftet, sidan är utförandet. Saknas en punkt är sidan ofullständig.
 * 3. Sakuppgifter ska vara sådana som håller. Belopp och datum som ändras
 *    varje år skrivs som beroende av bolagets förutsättningar i stället för
 *    som ett fast tal, annars blir sidan felaktig utan att någon märker det.
 */

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  /** Motsvarar en punkt i tjänstekortet på startsidan. */
  title: string;
  /** Kort sammanfattning som står under rubriken. */
  lead: string;
  /** Brödtexten. Två till tre stycken som förklarar innebörd och nytta. */
  body: string[];
};

export type Service = {
  slug: string;
  /** Exakt samma sträng som gruppens title i den svenska ordlistan. */
  name: string;
  /** Kortare form till brödsmulor och länklistor. */
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  h1Lead: string;
  h1Accent: string;
  intro: string;
  /** Problemet tjänsten löser, formulerat som kunden upplever det. */
  problem: { heading: string; paragraphs: string[] };
  /** Vem tjänsten passar. Konkret, inte "alla företag". */
  forWhom: { title: string; text: string }[];
  details: ServiceDetail[];
  /** Vad du får, punkt för punkt. */
  deliverables: string[];
  faq: ServiceFaq[];
  /** Slugar till andra tjänster som hänger ihop med den här. */
  related: string[];
};

export const services: Service[] = [
  {
    slug: "bokforing-och-redovisning",
    name: "Bokföring & redovisning",
    shortName: "Bokföring",
    metaTitle: "Bokföring & redovisning | Löpande bokföring till fast pris",
    metaDescription:
      "Vi sköter den löpande bokföringen, avstämningar och reskontra åt ditt bolag. Digitalt, till fast månadspris, med en fast kontaktperson som svarar samma dag.",
    h1Lead: "Bokföring och",
    h1Accent: "redovisning.",
    intro:
      "Den löpande bokföringen är grunden allt annat vilar på. Är den rätt kommer bokslutet, momsen och deklarationen nästan av sig själva. Är den fel märks det först när det är dyrt att rätta.",
    problem: {
      heading: "Varför det brukar gå fel",
      paragraphs: [
        "De flesta företagare bokför inte fel av okunskap, utan för att det görs för sällan. Kvitton samlas i en påse, fakturor ligger kvar i mejlen och när kvartalet är slut ska tre månader hinnas ikapp på en kväll. Då blir det gissningar i stället för underlag, och gissningar går inte att försvara vid en kontroll.",
        "Bokföringslagen kräver att affärshändelser bokförs löpande och att verifikationerna går att följa från transaktion till bokslut. Kontanta in- och utbetalningar ska bokföras senast dagen därpå, övriga affärshändelser så snart det kan ske. Sköts det i efterhand tappar bolaget dessutom det som gör bokföringen värdefull: möjligheten att se hur det faktiskt går medan det fortfarande går att påverka.",
        "Vi tar över hela momentet. Du fotar eller vidarebefordrar underlagen, vi bokför löpande och säger till när något saknas i stället för att lämna en lucka.",
      ],
    },
    forWhom: [
      {
        title: "Bolag som vill sluta ligga efter",
        text: "Har du en hög att komma ikapp tar vi den först, och lägger sedan upp en rutin som håller.",
      },
      {
        title: "Ägare som vill se hur det går",
        text: "Löpande bokföring betyder att resultatet är aktuellt när du behöver det, inte i mars året efter.",
      },
      {
        title: "Företag som byter byrå",
        text: "Vi hämtar underlagen från nuvarande byrå och tar över från valfritt månadsskifte.",
      },
    ],
    details: [
      {
        title: "Löpande bokföring",
        lead: "Varje affärshändelse bokförd i tid, på rätt konto, med underlag som håller.",
        body: [
          "Vi bokför inkommande och utgående fakturor, kvitton, banktransaktioner, löner och skatteinbetalningar löpande under året. Varje post får ett verifikationsnummer i obruten följd och kopplas till sitt underlag, så att kedjan från kontoutdrag till resultaträkning går att följa baklänges. Det är den kedjan Skatteverket och en eventuell revisor faktiskt granskar.",
          "Kontering görs mot BAS-kontoplanen och anpassas efter din verksamhet. Ett byggbolag och en konsultbyrå ska inte ha samma kontostruktur, för de behöver kunna följa olika saker. Vi lägger upp kontoplanen så att den säger något om just din verksamhet, i stället för att använda en standardmall rakt av.",
          "Räkenskapsinformationen arkiveras digitalt i sju år efter räkenskapsårets utgång, som lagen kräver. Underlagen är sökbara, vilket betyder att en fråga om en två år gammal faktura tar minuter att svara på i stället för en eftermiddag i en pärm.",
        ],
      },
      {
        title: "Redovisning",
        lead: "Siffrorna sammanställda till något du kan fatta beslut på.",
        body: [
          "Bokföring är att registrera. Redovisning är att göra registreringarna begripliga. Vi tar fram resultat- och balansrapporter varje period och går igenom vad de betyder: var marginalen ligger, vilka kostnader som växer snabbare än intäkterna och hur det ser ut jämfört med samma period förra året.",
          "Periodiseringar är det som skiljer en rapport man kan lita på från en som svänger utan anledning. En årsförsäkring betald i januari hör inte hemma som en kostnad enbart i januari, och ett förskott från en kund är inte en intäkt förrän arbetet är utfört. Vi periodiserar löpande så att varje månad visar sitt eget resultat.",
          "Rapporterna skickas i det format du vill ha dem, och vi ringer hellre en gång för mycket när något avviker än låter dig upptäcka det själv i bokslutet.",
        ],
      },
      {
        title: "Bankavstämning",
        lead: "Bokföringen stäms av mot kontoutdraget, varje period.",
        body: [
          "En bankavstämning innebär att saldot i bokföringen jämförs post för post mot vad banken faktiskt visar. Skiljer det något ska skillnaden gå att förklara, till exempel med en betalning som är på väg men ännu inte bokförd hos banken. Kan skillnaden inte förklaras finns ett fel någonstans, och det felet växer om det får ligga kvar.",
          "Avstämningen är också det som fångar sådant som annars glider igenom: en dubbelbetald faktura, ett abonnemang som fortsätter dras trots uppsägning, en kortbetalning som saknar kvitto. Vi hör av oss om varje post vi inte kan koppla till ett underlag.",
          "Vi kopplar bankkopplingen direkt mot bokföringsprogrammet där det går, vilket gör att transaktionerna kommer in automatiskt och avstämningen blir en kontroll i stället för ett inmatningsarbete.",
        ],
      },
      {
        title: "Skattekontoavstämning",
        lead: "Skattekontot stämt mot bokföringen, så att saldot betyder något.",
        body: [
          "Skattekontot hos Skatteverket samlar moms, arbetsgivaravgifter, avdragen skatt, preliminärskatt och eventuella F-skatteinbetalningar på ett och samma ställe. Det gör kontot svårläst: ett underskott kan bero på fem olika saker, och ett överskott behöver inte betyda att bolaget har pengar över.",
          "Vi stämmer av skattekontot mot bokföringen varje period, så att varje transaktion på kontot har en motsvarighet i bokföringen och tvärtom. Det gör att du kan lita på saldot, och att ett underskott upptäcks innan kostnadsräntan börjar löpa.",
          "Vi bevakar också att inbetalningarna hamnar rätt i tid. Pengar som kommer in för sent på skattekontot ger ränta även när beloppet är korrekt, och det är en helt onödig kostnad.",
        ],
      },
      {
        title: "Fakturahantering",
        lead: "Leverantörsfakturor och kundfakturor genom ett flöde som inte tappar bort något.",
        body: [
          "Inkommande fakturor tas emot digitalt, tolkas och bokförs mot rätt konto och rätt period. Du får en betalningslista med det som ska betalas och när, i stället för att själv hålla reda på förfallodagar i tre olika inkorgar. Fakturor med avvikelser lyfts till dig innan de betalas.",
          "På utgående sida hjälper vi till med fakturaunderlag, momssats och de uppgifter en faktura måste innehålla enligt momslagen: fakturanummer i obruten serie, datum, parternas uppgifter och momsregistreringsnummer, vad som sålts, beskattningsunderlag och momsbelopp. En faktura som saknar något av det kan ge köparen problem med avdragsrätten, och den kommer i retur.",
          "Säljer du till offentlig sektor gäller dessutom krav på e-faktura enligt Peppol-standard. Vi ser till att formatet blir rätt så att fakturan går fram i stället för att avvisas.",
        ],
      },
      {
        title: "Kund- & leverantörsreskontra",
        lead: "Full koll på vad som är obetalt, åt båda hållen.",
        body: [
          "Kundreskontran visar vilka fakturor som är utestående och hur länge. Det är den enskilt viktigaste rapporten för likviditeten i ett litet bolag, och den som oftast saknas. Vi håller den uppdaterad och rapporterar vad som är förfallet, så att du kan påminna i tid i stället för att upptäcka en obetald faktura ett halvår senare när den blivit svår att driva in.",
          "Leverantörsreskontran visar samma sak från andra hållet: vad bolaget är skyldigt och när det förfaller. Tillsammans ger de två en bild av kassaflödet några veckor framåt, vilket är skillnaden mellan att planera och att hoppas.",
          "Vi kan också sköta påminnelserutinen. Många företagare drar sig för att jaga betalningar från kunder de vill behålla, och då blir det ofta inte gjort alls. Kommer påminnelsen från byrån blir den en rutin i stället för en konflikt.",
        ],
      },
    ],
    deliverables: [
      "Löpande bokföring av alla affärshändelser",
      "Bank- och skattekontoavstämning varje period",
      "Resultat- och balansrapport med genomgång",
      "Kund- och leverantörsreskontra som hålls efter",
      "Digitalt arkiv i sju år, sökbart",
      "Fast kontaktperson som svarar samma dag",
    ],
    faq: [
      {
        question: "Hur ofta måste bokföringen göras?",
        answer:
          "Bokföringslagen säger löpande. Kontanta in- och utbetalningar ska bokföras senast dagen därpå, övriga affärshändelser så snart det kan ske. I praktiken bokför vi varje månad, och oftare för bolag med hög transaktionsvolym.",
      },
      {
        question: "Vi ligger efter med flera månader. Tar ni över ändå?",
        answer:
          "Ja, det är vanligare än du tror. Vi tar ikapp historiken först och lägger sedan upp en rutin som gör att det inte händer igen. Ikappjobbet prissätts separat och du får beskedet innan vi börjar.",
      },
      {
        question: "Måste vi byta bokföringsprogram?",
        answer:
          "Nej. Vi arbetar i molnbaserade system och anpassar oss efter det ni redan använder om det fungerar. Gör det inte det säger vi det rakt ut och föreslår ett byte, men beslutet är ert.",
      },
      {
        question: "Hur skickar jag underlagen till er?",
        answer:
          "Foto i mobilen, vidarebefordrat mejl eller direkt i bokföringsappen. Du väljer det som passar dig. Vi säger till när något saknas i stället för att bokföra på en gissning.",
      },
      {
        question: "Får jag slänga kvittot när det är fotograferat?",
        answer:
          "Sedan sommaren 2024 får pappersoriginalet förstöras när informationen har överförts till digital form på ett varaktigt sätt, förutsatt att inget går förlorat. Vi ser till att överföringen sker på ett sätt som uppfyller kravet.",
      },
      {
        question: "Vad kostar löpande bokföring?",
        answer:
          "Från 1 495 kr i månaden i vårt Bas-paket. Priset styrs av volymen underlag och om lön ingår, och du får en fast summa innan vi börjar, inte en löpande räkning.",
      },
    ],
    related: ["lon-moms-och-deklaration", "bokslut-och-arsredovisning", "digitalisering-och-struktur"],
  },

  {
    slug: "lon-moms-och-deklaration",
    name: "Lön, moms & deklaration",
    shortName: "Lön och moms",
    metaTitle: "Lön, moms & deklaration | Löneadministration och momsredovisning",
    metaDescription:
      "Löneadministration, momsredovisning, arbetsgivardeklaration och inkomstdeklaration för AB och enskild firma. Rätt belopp, inlämnat i tid, till fast pris.",
    h1Lead: "Lön, moms och",
    h1Accent: "deklaration.",
    intro:
      "Det här är de uppgifter som har datum på sig. Missar du en deadline kostar det pengar oavsett hur rätt siffrorna är, och förseningarna kommer nästan alltid av att någon inte visste att det var dags.",
    problem: {
      heading: "Det som gör det svårt är inte räknandet",
      paragraphs: [
        "Ett litet bolag med anställda har ett återkommande schema att hålla: arbetsgivardeklaration på individnivå varje månad, momsdeklaration varje månad eller kvartal beroende på omsättning, inbetalning till skattekontot i god tid före förfallodagen, och en inkomstdeklaration en gång om året. Varje post har sitt eget datum, och de sammanfaller inte.",
        "Utöver schemat finns detaljerna som blir fel: förmånsvärden som ska tas upp, traktamenten som är skattefria bara upp till en gräns, karensavdrag vid sjukdom, semesterlön enligt sammalöne- eller procentregeln, momssatser som skiljer mellan 25, 12 och 6 procent, och tjänster som är helt undantagna. Ingen av dessa är svår i sig. Tillsammans blir de en heltidssyssla att hålla reda på.",
        "Vi tar hela schemat och alla detaljerna. Du får en påminnelse om vad som ska betalas och när, och behöver aldrig hålla reda på ett datum själv.",
      ],
    },
    forWhom: [
      {
        title: "Bolag med anställda",
        text: "Lön, arbetsgivardeklaration och kontrolluppgifter varje månad, utan att du behöver tänka på det.",
      },
      {
        title: "Företag som fakturerar med moms",
        text: "Rätt momssats, rätt period och rätt inbetalning, även när verksamheten har blandade satser.",
      },
      {
        title: "Ägare som vill ha rätt lön",
        text: "Vi räknar på uttaget under året, medan det fortfarande går att påverka skatten.",
      },
    ],
    details: [
      {
        title: "Löneadministration",
        lead: "Lönekörning, lönespecifikationer och allt runtomkring, varje månad.",
        body: [
          "Vi räknar lön, semesterlön, sjuklön med karensavdrag, OB-tillägg, övertid och eventuella förmåner, och skickar lönespecifikation till varje anställd. Betalfilen kommer till dig för godkännande, så att pengarna aldrig lämnar bolaget utan att du sagt ja. Underlaget rapporteras till Skatteverket i arbetsgivardeklarationen.",
          "Semesterlönen är det som oftast räknas fel i ett litet bolag. Sammalöneregeln och procentregeln ger olika resultat, och vilken som ska användas beror på anställningsform och hur lönen ser ut. Semesterskulden ska dessutom finnas som en avsättning i bokföringen, annars visar resultatet en vinst som inte finns.",
          "Förmåner är det andra området. Tjänstebil, friskvård över gränsen, fri parkering och personalrabatter har alla sina egna regler för när de är skattefria och hur de värderas. Vi bedömer varje förmån och redovisar den rätt, så att den inte dyker upp som en överraskning i den anställdes deklaration.",
        ],
      },
      {
        title: "Momsredovisning",
        lead: "Rätt momssats, rätt period, inlämnad i tid.",
        body: [
          "Vi sammanställer utgående och ingående moms per period och lämnar momsdeklarationen. Hur ofta beror på bolagets omsättning: mindre bolag redovisar helår, de flesta kvartalsvis och större bolag varje månad. Vi ser till att bolaget ligger på rätt period och byter den när omsättningen förändras.",
          "Momssatserna är tre. Det mesta ligger på 25 procent, livsmedel och restaurangbesök på 12, och böcker, tidningar samt persontransporter på 6. Därtill finns verksamhet som är helt undantagen, som vård, tandvård och utbildning, och där gäller att bolaget inte heller får dra av moms på sina inköp. Driver du blandad verksamhet ska den ingående momsen fördelas, och det är där felen brukar sitta.",
          "Handel över gränserna har sina egna regler. Säljer du till ett momsregistrerat företag i ett annat EU-land fakturerar du utan moms men ska lämna periodisk sammanställning. Köper du tjänster från utlandet gäller omvänd skattskyldighet, alltså att du själv redovisar både utgående och ingående moms. Vi hanterar båda delarna.",
        ],
      },
      {
        title: "Arbetsgivardeklaration",
        lead: "Redovisning på individnivå varje månad, med rätt avgifter.",
        body: [
          "Arbetsgivardeklarationen lämnas månadsvis och redovisar per anställd vad som betalats ut, vilken skatt som dragits och vilka arbetsgivaravgifter som ska betalas. Sedan systemet med individuell redovisning infördes finns inga årliga kontrolluppgifter för lön att komplettera med i efterhand, vilket betyder att ett fel behöver rättas i den period det uppstod.",
          "Arbetsgivaravgifterna är inte samma för alla. Åldern på den anställde styr nivån, och för de yngsta och äldsta gäller lägre avgifter. Det finns dessutom nedsättningar och stöd som kan vara aktuella beroende på situation. Vi tillämpar rätt nivå per person i stället för en schablon för hela bolaget.",
          "Deklarationen och inbetalningen har samma förfallodag, och den ligger normalt den 12:e i månaden efter utbetalningen, med undantag i januari och augusti. Vi lämnar deklarationen i tid och talar om exakt vilket belopp som ska finnas på skattekontot och vilket datum.",
        ],
      },
      {
        title: "Inkomstdeklaration för AB och enskild firma",
        lead: "Bolagets deklaration, och din egen där de hänger ihop.",
        body: [
          "För aktiebolag upprättar vi inkomstdeklaration 2 med tillhörande skattemässiga justeringar. Bokfört resultat är sällan samma sak som skattemässigt resultat: representation, vissa skatter, avsättningar till periodiseringsfond och överavskrivningar justerar summan åt olika håll. Vi räknar fram det skattemässiga resultatet och ser till att avsättningarna används där de faktiskt gör nytta.",
          "Är du delägare i ett fåmansbolag tar vi också fram K10-underlaget. Det avgör hur mycket du kan ta ut som utdelning till den lägre skattesatsen, och utrymmet räknas fram antingen enligt förenklingsregeln eller enligt löneunderlagsregeln. Vilken som ger mest beror på bolagets löner och ditt eget uttag under året, och beslutet måste fattas medan året pågår.",
          "För enskild firma gäller NE-bilagan till din privata deklaration, med egenavgifter, eventuellt räntefördelning och avsättning till expansionsfond. Här är gränsen mellan bolagets och privatekonomins pengar avgörande, och vi håller isär den så att avdragen håller vid en granskning.",
        ],
      },
    ],
    deliverables: [
      "Lönekörning med specifikationer till de anställda",
      "Arbetsgivardeklaration på individnivå varje månad",
      "Momsdeklaration i rätt period, med avstämning",
      "Periodisk sammanställning vid EU-handel",
      "Inkomstdeklaration för bolaget",
      "K10-underlag till delägarna",
      "Besked om vad som ska betalas och när",
    ],
    faq: [
      {
        question: "Hur ofta ska momsen redovisas?",
        answer:
          "Det beror på omsättningen. Mindre bolag redovisar helårsvis, de flesta kvartalsvis och större bolag varje månad. Vi kontrollerar att ditt bolag ligger på rätt period och byter den när omsättningen förändras.",
      },
      {
        question: "Hur mycket lön ska jag ta ut ur mitt aktiebolag?",
        answer:
          "Det beror på om du vill använda löneunderlagsregeln för utdelning, och den kräver ett eget löneuttag över en gräns kopplad till bolagets totala löner. Vi räknar fram gränsen under hösten, medan det fortfarande går att justera.",
      },
      {
        question: "Vad händer om deklarationen kommer in för sent?",
        answer:
          "Skatteverket tar ut en förseningsavgift, och vid utebliven betalning löper kostnadsränta på skattekontot. Vi lämnar i tid och påminner dig om inbetalningen i god tid före förfallodagen.",
      },
      {
        question: "Är friskvårdsbidrag skattefritt?",
        answer:
          "Ja, upp till ett skäligt belopp och om det erbjuds alla anställda på lika villkor. Överstiger bidraget gränsen blir hela beloppet en skattepliktig förmån, inte bara den överskjutande delen. Vi håller koll på nivån.",
      },
      {
        question: "Vi anlitar underkonsulter i stället för anställda. Blir det enklare?",
        answer:
          "Ja, om det verkligen rör sig om ett uppdragsförhållande. Har personen bara en uppdragsgivare, arbetar på era tider och med era verktyg kan Skatteverket bedöma det som anställning i efterhand, och då blir arbetsgivaravgifterna era. Vi går igenom upplägget innan det blir ett problem.",
      },
      {
        question: "Kan ni sköta lönen även om ni inte gör vår bokföring?",
        answer:
          "Ja, men det blir sällan billigare. Lön och bokföring hänger ihop, och när samma byrå gör båda försvinner avstämningsarbetet mellan dem.",
      },
    ],
    related: ["bokforing-och-redovisning", "bokslut-och-arsredovisning", "myndighetskontakt-och-radgivning"],
  },

  {
    slug: "bokslut-och-arsredovisning",
    name: "Bokslut & årsredovisning",
    shortName: "Bokslut",
    metaTitle: "Bokslut & årsredovisning | Upprättande, komplettering och omprövning",
    metaDescription:
      "Vi upprättar bokslut och årsredovisning enligt K2 eller K3, hanterar kompletteringar till Bolagsverket och begär omprövning när skatten blivit fel.",
    h1Lead: "Bokslut och",
    h1Accent: "årsredovisning.",
    intro:
      "Bokslutet är året sammanfattat och låst. Det är också sista tillfället att fatta beslut som påverkar skatten, vilket gör att ett bokslut som bara sammanställer siffror har missat halva sitt syfte.",
    problem: {
      heading: "Bokslut är inte en sammanställning, det är beslut",
      paragraphs: [
        "Vid bokslutet avgörs sådant som inte framgår av bokföringen: hur lagret ska värderas, vilka fordringar som är osäkra, hur inventarier ska skrivas av, om en avsättning till periodiseringsfond är rätt drag i år eller nästa. Varje sådant val påverkar både resultatet och skatten, och de flesta går inte att ändra i efterhand.",
        "Ett aktiebolag ska dessutom hålla årsstämma inom sex månader från räkenskapsårets slut och ha årsredovisningen hos Bolagsverket senast sju månader efter samma datum. Kommer den in för sent tas en förseningsavgift ut, och dröjer det tillräckligt länge kan bolaget tvångslikvideras. Avgiften är helt undvikbar, men den drabbar många varje år.",
        "Vi arbetar med bokslutet före årsskiftet, inte efter. Då finns fortfarande valen kvar.",
      ],
    },
    forWhom: [
      {
        title: "Aktiebolag med inlämningsplikt",
        text: "Årsredovisning enligt K2 eller K3, digitalt inlämnad till Bolagsverket i tid.",
      },
      {
        title: "Bolag som fått ett föreläggande",
        text: "Har Bolagsverket begärt komplettering hjälper vi till med svaret och ser till att det räcker.",
      },
      {
        title: "Företag med fel i ett gammalt beslut",
        text: "Skatt som blivit fel går ofta att ompröva flera år tillbaka. Vi bedömer om det är värt att driva.",
      },
    ],
    details: [
      {
        title: "Bokslut",
        lead: "Året stängt, avstämt och skattemässigt genomtänkt.",
        body: [
          "Vi stämmer av samtliga balanskonton mot underlag, går igenom periodiseringar, värderar lager och pågående arbeten, bedömer kundfordringar och beräknar avskrivningar på inventarier. Resultatet är en balansräkning där varje post går att förklara, vilket är förutsättningen för allt som byggs ovanpå den.",
          "Sedan kommer besluten. Avsättning till periodiseringsfond skjuter skatt framåt och kan vara rätt när ett svagare år väntas, men fel när bolaget står inför en investering. Överavskrivningar ger samma typ av val. Vi räknar fram vad varje alternativ betyder i kronor och lägger fram det, i stället för att välja åt dig utan att fråga.",
          "Bokslutet lämnas med en genomgång där vi går igenom året: vad som drev resultatet, vad som avvek och vad siffrorna säger om nästa år. Den genomgången är ofta det mest värdefulla en byrå levererar, och den som oftast uteblir.",
        ],
      },
      {
        title: "Årsredovisning",
        lead: "Upprättad enligt regelverket, undertecknad och inlämnad i tid.",
        body: [
          "Vi upprättar årsredovisningen med förvaltningsberättelse, resultaträkning, balansräkning, noter och, för större bolag, kassaflödesanalys. Handlingen lämnas digitalt till Bolagsverket, vilket ger snabbare hantering och en kvittens på att den kommit in, i stället för osäkerheten kring en pappersinlämning.",
          "Valet mellan K2 och K3 styr hur redovisningen får utformas. K2 är ett förenklat regelverk med mer schablon och mindre utrymme för bedömningar, K3 är mer arbete men tillåter till exempel komponentavskrivning och aktivering av eget utvecklingsarbete. För de flesta mindre bolag är K2 rätt, men inte för alla. Vi går igenom vad som passar ditt bolag och byter regelverk om förutsättningarna ändras.",
          "Vi håller reda på datumen åt dig: stämma inom sex månader från räkenskapsårets slut, årsredovisning hos Bolagsverket inom sju. Du får en påminnelse i god tid, med det underlag som ska skrivas under.",
        ],
      },
      {
        title: "Kompletteringar",
        lead: "När Bolagsverket eller Skatteverket vill ha mer, svarar vi.",
        body: [
          "Ett föreläggande om komplettering betyder att något saknas eller inte håller: en underskrift som fattas, ett fastställelseintyg som är felaktigt daterat, noter som inte räcker eller uppgifter som inte stämmer mot registret. Föreläggandet har en svarstid, och en obesvarad komplettering får samma konsekvens som en utebliven inlämning.",
          "Vi läser föreläggandet, avgör exakt vad myndigheten efterfrågar och tar fram svaret. Ofta är det en formalitet som ser mer allvarlig ut än den är, men den behöver hanteras rätt och inom tiden. Vi svarar åt er och bekräftar när ärendet är avslutat.",
          "Har kompletteringen sin grund i ett verkligt fel i redovisningen rättar vi det också, i stället för att lappa ihop ett svar som håller just den här gången men skapar samma fråga nästa år.",
        ],
      },
      {
        title: "Omprövningar",
        lead: "Skatt som blivit fel går ofta att få rättad flera år tillbaka.",
        body: [
          "Har ett avdrag missats, en intäkt redovisats dubbelt eller ett beslut byggt på fel underlag kan du begära omprövning hos Skatteverket. Möjligheten sträcker sig normalt sex år tillbaka räknat från utgången av det kalenderår då beskattningsåret gick ut, vilket betyder att gamla fel oftare går att rätta än de flesta tror.",
          "Vi går igenom vad som faktiskt hände, tar fram underlaget som styrker saken och skriver begäran. En omprövning avgörs på underlaget, inte på formuleringarna, så arbetet ligger i att belägga det som ska rättas. Håller inte underlaget säger vi det innan vi skickar in, i stället för att driva ett ärende som ändå faller.",
          "Går beslutet emot bedömer vi om ett överklagande är värt att driva vidare, med en rak uppskattning av chansen. Ibland är svaret nej, och då säger vi det.",
        ],
      },
    ],
    deliverables: [
      "Fullständigt bokslut med avstämda balanskonton",
      "Skattemässig genomgång innan året stängs",
      "Årsredovisning enligt K2 eller K3",
      "Digital inlämning till Bolagsverket",
      "Svar på förelägganden och kompletteringar",
      "Begäran om omprövning när skatten blivit fel",
      "Bokslutsgenomgång där vi förklarar året",
    ],
    faq: [
      {
        question: "När ska årsredovisningen vara inne?",
        answer:
          "Senast sju månader efter räkenskapsårets slut ska den ha kommit in till Bolagsverket, och årsstämman ska ha hållits inom sex månader. Vid bokslut den 31 december innebär det stämma senast i juni och inlämning senast den 31 juli.",
      },
      {
        question: "Vad kostar det om årsredovisningen kommer in för sent?",
        answer:
          "Bolagsverket tar ut en förseningsavgift som höjs stegvis ju längre det dröjer, och vid mycket lång försening kan bolaget tvingas i likvidation. Avgiften är helt undvikbar, och vi påminner i god tid.",
      },
      {
        question: "Behöver vårt bolag revisor?",
        answer:
          "Mindre aktiebolag är undantagna om de inte överskrider mer än ett av tre gränsvärden för antal anställda, balansomslutning och nettoomsättning två räkenskapsår i rad. Vi bevakar värdena och säger till i god tid om ni närmar er gränsen, eftersom revisorn ska väljas på stämma.",
      },
      {
        question: "Ska vi tillämpa K2 eller K3?",
        answer:
          "K2 är enklare och räcker för de flesta mindre bolag. K3 krävs för större bolag och kan vara fördelaktigt om ni vill komponentavskriva fastigheter eller aktivera eget utvecklingsarbete. Vi går igenom vad som passar er.",
      },
      {
        question: "Hur långt tillbaka går det att ompröva ett skattebeslut?",
        answer:
          "Normalt sex år räknat från utgången av det kalenderår då beskattningsåret gick ut. Vi bedömer om ditt ärende håller innan vi skickar in något.",
      },
      {
        question: "Kan ni göra bokslutet även om någon annan skött bokföringen?",
        answer:
          "Ja. Vi går då igenom den löpande bokföringen först och säger till om något behöver rättas innan vi stänger året. Det tillkommer ett arbete för genomgången, och du får beskedet i förväg.",
      },
    ],
    related: ["bokforing-och-redovisning", "lon-moms-och-deklaration", "myndighetskontakt-och-radgivning"],
  },

  {
    slug: "foretagsstart-och-registreringar",
    name: "Företagsstart & registreringar",
    shortName: "Företagsstart",
    metaTitle: "Företagsstart & registreringar | Starta AB eller enskild firma",
    metaDescription:
      "Vi hjälper dig välja bolagsform, registrera bolaget hos Bolagsverket och Skatteverket och få F-skatt, moms och tillstånd på plats. Rätt från början.",
    h1Lead: "Företagsstart och",
    h1Accent: "registreringar.",
    intro:
      "De beslut som fattas de första veckorna följer med bolaget i flera år. Bolagsform, räkenskapsår, ägarstruktur och vilken verksamhet som registreras är alla lätta att välja fel och besvärliga att ändra i efterhand.",
    problem: {
      heading: "Det som är svårt är inte blanketterna",
      paragraphs: [
        "Att registrera ett bolag går på en eftermiddag på verksamt.se. Det är inte där problemet ligger. Problemet är att flera av valen i formuläret får konsekvenser som inte syns förrän långt senare: räkenskapsåret avgör när ditt första bokslut infaller, ägarandelarna styr hur utdelningen får fördelas, och verksamhetsbeskrivningen kan begränsa vad bolaget får göra.",
        "Många startar dessutom i fel form. Enskild firma är enklare och billigare i början men innebär personligt ansvar och att vinsten beskattas som inkomst av näringsverksamhet med egenavgifter. Aktiebolag kräver aktiekapital och mer administration men ger begränsat ansvar och möjlighet till utdelning till lägre skatt. Vilket som är rätt beror på vinstnivå, risk och hur mycket du behöver ta ut, inte på vad som låter mest seriöst.",
        "Vi går igenom valen innan något registreras, och sköter sedan hela registreringen åt dig.",
      ],
    },
    forWhom: [
      {
        title: "Du som ska starta för första gången",
        text: "Vi går igenom bolagsformerna med dina siffror som utgångspunkt, inte med en tumregel.",
      },
      {
        title: "Enskild firma som ska bli aktiebolag",
        text: "Vi räknar på om det lönar sig och sköter ombildningen så att inget faller mellan stolarna.",
      },
      {
        title: "Verksamhet som kräver tillstånd",
        text: "Serveringstillstånd, F-skatt, arbetsgivarregistrering och branschregistreringar på plats från start.",
      },
    ],
    details: [
      {
        title: "Företagsstart",
        lead: "Från idé till registrerat bolag, med rätt beslut fattade i rätt ordning.",
        body: [
          "Vi börjar med din situation: vad verksamheten går ut på, vilken vinst du räknar med, om du ska ha anställda, hur stor risken är och hur mycket du behöver ta ut privat. Utifrån det räknar vi fram vad de olika bolagsformerna faktiskt skulle kosta dig i skatt och avgifter, och rekommenderar en.",
          "Sedan tar vi de val som annars fattas av misstag. Räkenskapsåret behöver inte följa kalenderåret, och ett brutet räkenskapsår kan vara rätt om verksamheten är säsongsbetonad. Ägarandelarna behöver stämma med hur ni tänkt fördela vinsten, och är ni flera delägare bör ett aktieägaravtal finnas innan det behövs, inte efter.",
          "Vi sätter också upp det praktiska: bankkonto, bokföringssystem, faktureringsrutin och en plan för hur underlagen ska nå oss. Det är den delen som avgör om bolaget kommer igång ordentligt eller hamnar efter redan första kvartalet.",
        ],
      },
      {
        title: "Bolagsregistrering",
        lead: "Registrering hos Bolagsverket, med handlingar som håller.",
        body: [
          "Vi upprättar stiftelseurkund och bolagsordning, hanterar bankintyget för aktiekapitalet och lämnar in registreringen. Bolagsordningen är den handling som oftast slarvas igenom, och den styr sådant som verksamhetsföremål, aktiekapitalets gränser och hur kallelse till stämma ska ske. En bolagsordning som är för snäv tvingar fram en ändring och en ny avgift så fort verksamheten breddas.",
          "Aktiekapitalet i ett privat aktiebolag är 25 000 kronor och ska finnas på ett särskilt konto vid registreringen. Det är bolagets pengar, inte låsta medel, och kan användas i verksamheten så snart bolaget är registrerat. Vi förklarar vad som gäller så att kapitalet inte blir liggande i onödan.",
          "Vi håller också reda på registreringen efteråt: ändrad styrelse, ny adress, ny firmatecknare eller ändrad bolagsordning ska anmälas, och en registrering som inte stämmer med verkligheten skapar problem först när något viktigt ska undertecknas.",
        ],
      },
      {
        title: "Skatteverket & Bolagsverket",
        lead: "F-skatt, moms och arbetsgivarregistrering, anmält i rätt ordning.",
        body: [
          "Ansökan om F-skatt, momsregistrering och registrering som arbetsgivare görs hos Skatteverket och är skilda från registreringen hos Bolagsverket. De hanteras ofta i fel ordning eller glöms bort, med följden att bolaget fakturerar utan att vara momsregistrerat eller betalar ut lön utan att vara registrerad arbetsgivare.",
          "Vi anmäler det som behövs och sätter en rimlig preliminärskatt från start. En preliminärskatt som är satt för lågt ger kvarskatt med ränta, en som är satt för högt binder pengar i onödan under hela året. Vi utgår från din faktiska prognos och justerar under året när verkligheten avviker.",
          "Handlar bolaget med utlandet ansöker vi också om EORI-nummer och ser till att momsregistreringsnumret är korrekt registrerat i VIES, så att dina EU-kunder kan verifiera det. Ett nummer som inte går att slå upp stoppar en faktura.",
        ],
      },
      {
        title: "Val av bolagsform",
        lead: "Räknat på dina siffror, inte på en tumregel.",
        body: [
          "Enskild firma har ingen gräns för startkapital, enklare bokföring och du beskattas för hela överskottet med egenavgifter och kommunal inkomstskatt. Vid låg vinst är den nästan alltid billigast. Nackdelen är att du ansvarar personligen för skulderna, och att det inte finns någon skillnad mellan bolagets pengar och dina.",
          "Aktiebolag ger begränsat ansvar och möjligheten att ta ut en del av vinsten som utdelning till 20 procents skatt inom gränsbeloppet. Det kräver aktiekapital, årsredovisning och mer administration. Brytpunkten där aktiebolaget blir fördelaktigt ligger inte på ett fast belopp utan beror på hur mycket du tar ut, om du har anställda och hur stor risken i verksamheten är.",
          "Handelsbolag och kommanditbolag förekommer när flera personer driver tillsammans men vill undvika aktiebolagets formalia. De ger solidariskt ansvar, vilket betyder att varje bolagsman kan krävas på hela skulden. Vi går igenom om formen passar innan ni väljer den för att den verkade smidig.",
        ],
      },
      {
        title: "Tillstånd & registreringar",
        lead: "Det branschspecifika som måste finnas innan ni öppnar.",
        body: [
          "Många verksamheter kräver mer än ett organisationsnummer för att få starta. Livsmedelsverksamhet ska registreras hos kommunen, servering av alkohol kräver serveringstillstånd med både kunskapsprov och prövning av ekonomisk skötsamhet, och yrkesmässig trafik kräver trafiktillstånd. Handläggningstiderna är sällan korta.",
          "Vissa branscher har dessutom krav på personalliggare, certifierat kassaregister eller anmälan om byggarbetsplats. Kraven är kopplade till verksamhet, inte till bolagsform, och de kontrolleras oanmält. Att komma igång utan dem är ett dyrt sätt att spara tid.",
          "Vi går igenom vad just din verksamhet kräver, hjälper till med ansökningarna och lägger upp en tidsplan som utgår från handläggningstiderna i stället för från när du vill öppna.",
        ],
      },
    ],
    deliverables: [
      "Genomgång av bolagsform räknat på dina siffror",
      "Stiftelseurkund och bolagsordning",
      "Registrering hos Bolagsverket",
      "F-skatt, moms och arbetsgivarregistrering",
      "Preliminärskatt satt på en riktig prognos",
      "Kartläggning av tillstånd som krävs i din bransch",
      "Bokföring och faktureringsrutin på plats från dag ett",
    ],
    faq: [
      {
        question: "Hur mycket aktiekapital krävs för ett aktiebolag?",
        answer:
          "25 000 kronor i ett privat aktiebolag. Pengarna är bolagets och får användas i verksamheten så snart bolaget är registrerat, de är inte låsta.",
      },
      {
        question: "Ska jag starta enskild firma eller aktiebolag?",
        answer:
          "Vid låg vinst är enskild firma nästan alltid billigast. Aktiebolag blir fördelaktigt när vinsten stiger, när risken i verksamheten är påtaglig eller när du vill kunna ta utdelning. Vi räknar på dina siffror i stället för att svara med en tumregel.",
      },
      {
        question: "Hur lång tid tar det att registrera ett aktiebolag?",
        answer:
          "Handläggningstiden hos Bolagsverket varierar under året och är kortare vid elektronisk ansökan. Vi anmäler så snart handlingarna är klara och håller dig uppdaterad om var ärendet ligger.",
      },
      {
        question: "Kan jag ombilda min enskilda firma till aktiebolag?",
        answer:
          "Ja. Verksamheten överlåts då till det nya bolaget, och överlåtelsen behöver göras rätt för att inte utlösa onödig beskattning. Vi räknar först på om bytet lönar sig och sköter sedan ombildningen.",
      },
      {
        question: "Måste jag ha F-skatt?",
        answer:
          "Utan F-skatt måste den som anlitar dig göra skatteavdrag och betala arbetsgivaravgifter på ersättningen, vilket gör dig svår att anlita. I praktiken behöver alla som fakturerar F-skatt, och vi ansöker åt dig.",
      },
      {
        question: "Kan jag välja ett annat räkenskapsår än kalenderåret?",
        answer:
          "Ja, ett aktiebolag får ha brutet räkenskapsår. Det kan vara fördelaktigt vid säsongsverksamhet eftersom bokslutet då hamnar i en lugnare period. Vi går igenom om det passar er.",
      },
    ],
    related: ["bokforing-och-redovisning", "myndighetskontakt-och-radgivning", "bokslut-och-arsredovisning"],
  },

  {
    slug: "myndighetskontakt-och-radgivning",
    name: "Myndighetskontakt & rådgivning",
    shortName: "Rådgivning",
    metaTitle: "Myndighetskontakt & rådgivning | Stöd mot Skatteverket och kommun",
    metaDescription:
      "Vi tar kontakten med Skatteverket, Bolagsverket och kommunen, svarar på förelägganden och ger rådgivning i skattefrågor. På svenska, engelska och persiska.",
    h1Lead: "Myndighetskontakt och",
    h1Accent: "rådgivning.",
    intro:
      "Ett brev från Skatteverket skapar oro långt utöver vad innehållet motiverar. Det mesta är rutin, en del kräver ett ordentligt svar, och skillnaden är svår att se om man inte läser sådana brev varje vecka.",
    problem: {
      heading: "Osäkerheten kostar mer än ärendet",
      paragraphs: [
        "De flesta förelägganden och förfrågningar handlar om att en uppgift saknas eller behöver styrkas. De är hanterbara. Men de kommer i ett språk och en form som är svårläst även för den som är van, och för en företagare som driver verksamheten på ett annat modersmål blir tröskeln högre än den behöver vara.",
        "Följden blir att brev blir liggande. En förfrågan som besvaras inom tiden avslutas oftast utan åtgärd. Samma förfrågan obesvarad leder till ett beslut fattat på det underlag myndigheten själv har, vilket nästan alltid är sämre för bolaget. Ett skönsbeskattningsbeslut är betydligt svårare att få ändrat än en förfrågan är att besvara.",
        "Vi läser brevet, säger vad det faktiskt betyder och svarar åt er när frågan gäller bokföring, skatt eller deklaration.",
      ],
    },
    forWhom: [
      {
        title: "Du som fått ett brev och inte vet vad det betyder",
        text: "Skicka över det. Vi säger vad det gäller, hur brådskande det är och vad som behöver göras.",
      },
      {
        title: "Företagare med annat modersmål",
        text: "Rådgivning på svenska, engelska och persiska. Du ska förstå din egen ekonomi, inte bara skriva under.",
      },
      {
        title: "Bolag inför ett större beslut",
        text: "Investering, anställning, ägarförändring eller expansion. Vi räknar på konsekvensen innan du bestämmer.",
      },
    ],
    details: [
      {
        title: "Myndigheter & kommuner",
        lead: "Vi tar kontakten, så slipper du sitta i telefonkö.",
        body: [
          "Vi hanterar löpande kontakter med Skatteverket, Bolagsverket, Kronofogden och kommunernas förvaltningar i frågor som rör bolagets ekonomi. Det handlar om allt från att reda ut ett saldo på skattekontot till att följa upp ett registreringsärende som blivit liggande.",
          "Med fullmakt kan vi företräda bolaget direkt, vilket gör att frågan går att lösa utan att du behöver kopplas in. Utan fullmakt förbereder vi underlaget och talar om exakt vad du ska säga och till vem. Vilket som passar bäst avgör du.",
          "Kommunala ärenden har sina egna vägar: livsmedelsregistrering, serveringstillstånd, bygglov och tillsynsavgifter hanteras av olika förvaltningar med olika handläggningstider. Vi håller reda på var ärendet ligger och driver på när det behövs.",
        ],
      },
      {
        title: "Stöd i myndighetsärenden",
        lead: "Förelägganden, förfrågningar och kontroller, besvarade i tid.",
        body: [
          "När Skatteverket begär in underlag eller ifrågasätter en post går vi igenom vad som efterfrågas, tar fram materialet och skriver svaret. Ett svar som är komplett första gången avslutar ärendet. Ett ofullständigt svar leder till en följdfråga och förlänger processen, ibland i månader.",
          "Vid en revision eller en oanmäld kontroll är förberedelsen redan gjord om bokföringen är i ordning. Vi tar fram det som ska lämnas ut, är med i kontakten och ser till att inget lämnas ifrån sig som inte begärts. Personalliggare och kassaregister kontrolleras på plats i vissa branscher, och där avgörs utfallet av rutinerna, inte av svaren.",
          "Går ett beslut emot bolaget bedömer vi om det finns grund för omprövning eller överklagande, och säger rakt ut när vi tycker att ett ärende inte är värt att driva vidare.",
        ],
      },
      {
        title: "Skattefrågor",
        lead: "Besked innan du agerar, inte förklaringar efteråt.",
        body: [
          "De flesta skattefrågor i ett litet bolag handlar om gränsen mellan bolaget och privatpersonen: vad som får dras av, vilka förmåner som är skattefria, hur en bil ska hanteras, vad som gäller vid arbete hemifrån och hur representation behandlas. Svaren finns, men de beror på omständigheterna och en generell tumregel leder ofta fel.",
          "För fåmansbolag är 3:12-reglerna den fråga som betyder mest i kronor. Gränsbeloppet avgör hur mycket som kan tas ut som utdelning till 20 procents skatt, och det räknas fram antingen med förenklingsregeln eller med löneunderlagsregeln. Vilken som är bäst avgörs av bolagets löner och ditt eget uttag, och beräkningen måste göras under året för att gå att påverka.",
          "Vid ägarförändringar, generationsskiften och försäljning av bolag blir skattefrågan avgörande för utfallet. Vi går igenom konsekvenserna i förväg och säger till när frågan kräver en specialist utöver oss.",
        ],
      },
      {
        title: "Ekonomisk rådgivning",
        lead: "Siffrorna använda till att fatta beslut, inte bara till att redovisa.",
        body: [
          "Vi går igenom lönsamheten per tjänst eller produkt, prissättning, marginaler och vad kostnadsmassan består av. Många bolag växer i omsättning utan att växa i vinst, och orsaken syns nästan alltid i siffrorna långt innan den märks på kontot.",
          "Likviditetsplanering är den andra delen. Ett bolag går sällan omkull för att det är olönsamt, utan för att pengarna tar slut vid fel tillfälle. Vi lägger upp en enkel prognos som visar hur kassan utvecklas de närmaste månaderna, med skatteinbetalningar, löner och kända investeringar inlagda.",
          "Inför en investering, en anställning eller en expansion räknar vi på vad beslutet betyder: vad det kostar, vad det kräver i volym för att bära sig och hur det påverkar skatten. Du får ett underlag att fatta beslut på, och vår uppfattning när du frågar efter den.",
        ],
      },
      {
        title: "Affärsjuridisk vägledning",
        lead: "Avtal och bolagsfrågor granskade innan de blir tvister.",
        body: [
          "Vi går igenom kund- och leverantörsavtal med fokus på det som får ekonomiska konsekvenser: betalningsvillkor, dröjsmålsränta, ansvarsbegränsningar, uppsägningstid och vad som händer om motparten inte levererar. Ett avtal med 90 dagars betalningsvillkor är ett finansieringsbeslut, oavsett vad det står på pappret.",
          "För bolag med flera delägare är aktieägaravtalet den viktigaste handlingen som oftast saknas. Det reglerar vad som händer när någon vill sälja, sluta, blir sjuk eller går bort, och det behöver skrivas medan alla är överens. Vi går igenom vad ett sådant avtal bör innehålla för er situation.",
          "Vi är redovisningskonsulter, inte jurister. Vi säger till när en fråga kräver advokat och hjälper till att formulera uppdraget, i stället för att ge ett svar som låter tryggt men inte håller.",
        ],
      },
    ],
    deliverables: [
      "Genomgång av brev och förelägganden inom ett dygn",
      "Svar till Skatteverket och Bolagsverket åt er",
      "Företrädande med fullmakt när ni vill det",
      "Besked i skattefrågor innan ni agerar",
      "Beräkning av gränsbelopp och utdelningsutrymme",
      "Likviditetsprognos och lönsamhetsgenomgång",
      "Rådgivning på svenska, engelska och persiska",
    ],
    faq: [
      {
        question: "Jag har fått ett brev från Skatteverket. Vad gör jag?",
        answer:
          "Skicka över det till oss så läser vi det och säger vad det gäller, hur brådskande det är och vad som behöver göras. Rör det bokföring, moms eller deklaration svarar vi åt er.",
      },
      {
        question: "Kan ni prata med Skatteverket i mitt ställe?",
        answer:
          "Ja, med fullmakt företräder vi bolaget direkt. Utan fullmakt förbereder vi underlaget och talar om exakt vad du ska säga och till vem.",
      },
      {
        question: "Kan jag få rådgivning på persiska?",
        answer:
          "Ja. Vi ger rådgivning på svenska, engelska och persiska, och du kan skriva till oss på det språk du är mest bekväm med.",
      },
      {
        question: "Vad händer om jag inte svarar på en förfrågan?",
        answer:
          "Skatteverket fattar då beslut på det underlag de själva har, vilket nästan alltid blir sämre för bolaget. Ett sådant beslut är betydligt svårare att få ändrat än förfrågan var att besvara.",
      },
      {
        question: "Ingår rådgivning i månadspriset?",
        answer:
          "Löpande frågor som rör bokföring, moms och skatt ingår. Större utredningar och ärenden som kräver omfattande arbete offereras separat, och du får beskedet innan vi börjar.",
      },
      {
        question: "Ger ni juridisk rådgivning?",
        answer:
          "Vi ger vägledning i affärsjuridiska frågor med ekonomisk innebörd, som avtalsvillkor och delägarfrågor. När en fråga kräver advokat säger vi det i stället för att svara ändå.",
      },
    ],
    related: ["bokslut-och-arsredovisning", "lon-moms-och-deklaration", "foretagsstart-och-registreringar"],
  },

  {
    slug: "digitalisering-och-struktur",
    name: "Digitalisering & struktur",
    shortName: "Digitalisering",
    metaTitle: "Digitalisering & struktur | Digitala bokföringsrutiner som håller",
    metaDescription:
      "Vi digitaliserar bokföringsrutinerna, sätter upp digitala arbetsflöden och löpande rapportering, och bygger rutiner som fungerar även när det är fullt upp.",
    h1Lead: "Digitalisering och",
    h1Accent: "struktur.",
    intro:
      "Ett digitalt bokföringssystem gör ingen nytta i sig. Nyttan kommer av att underlagen når systemet automatiskt, att någon tittar på siffrorna varje månad och att rutinen fungerar även under de veckor när ingen har tid.",
    problem: {
      heading: "Ett system är inte en rutin",
      paragraphs: [
        "De flesta bolag har redan ett molnbaserat bokföringsprogram. Ändå kommer kvittona in i en påse en gång i kvartalet, leverantörsfakturor ligger kvar i mejlkorgen och ingen vet riktigt hur det går förrän bokslutet är klart. Systemet var aldrig problemet.",
        "Det som saknas är flödet: hur ett kvitto tar sig från handen till bokföringen utan att någon behöver komma ihåg det, hur en leverantörsfaktura hamnar rätt utan manuell inmatning, och vem som gör vad när den som brukar sköta det är sjuk. En rutin som bara fungerar när allt är lugnt är inte en rutin.",
        "Vi bygger flödet och rutinen, inte bara systemet. Målet är att administrationen ska ta mindre av din tid varje månad, inte att den ska se modernare ut.",
      ],
    },
    forWhom: [
      {
        title: "Bolag som fortfarande hanterar papper",
        text: "Vi flyttar över flödet stegvis så att verksamheten inte stannar under bytet.",
      },
      {
        title: "Företag som växt ur sin rutin",
        text: "Det som fungerade med tio fakturor i månaden fungerar sällan med hundra.",
      },
      {
        title: "Ägare som vill veta hur det går",
        text: "Löpande rapportering betyder att du ser resultatet medan det fortfarande går att påverka.",
      },
    ],
    details: [
      {
        title: "Digitalisering av bokföringsrutiner",
        lead: "Från pärm och påse till ett flöde som sköter sig självt.",
        body: [
          "Vi kartlägger först hur underlagen faktiskt rör sig i dag: var kvittona hamnar, hur fakturorna kommer in, vem som attesterar och var det fastnar. Nästan alltid finns ett eller två ställen som orsakar merparten av eftersläpningen, och det är där arbetet ska börja.",
          "Sedan kopplar vi flödena. Bankkoppling gör att transaktionerna kommer in automatiskt, kvittoappen gör att ett kvitto bokförs där det uppstår i stället för i efterhand, och leverantörsfakturor tas emot digitalt och tolkas automatiskt. Varje manuellt moment som försvinner är ett moment som inte längre kan glömmas bort.",
          "Sedan sommaren 2024 får pappersoriginalet förstöras när informationen överförts till digital form på ett varaktigt sätt, förutsatt att inget går förlorat. Det gör det möjligt att bli av med pärmarna på riktigt. Vi ser till att överföringen görs på ett sätt som uppfyller kravet, så att arkivet håller vid en granskning.",
        ],
      },
      {
        title: "Digitala arbetsflöden",
        lead: "Attest, betalning och godkännande i ett spår som går att följa.",
        body: [
          "Ett arbetsflöde talar om vad som händer med en handling och i vilken ordning. En leverantörsfaktura kommer in, tolkas, konteras, går till attest hos rätt person och läggs sedan i en betalningslista. Varje steg loggas, vilket betyder att frågan om vem som godkände vad har ett svar.",
          "På kundsidan handlar det om att fakturan går ut samma dag arbetet är klart i stället för i slutet av månaden, att påminnelser skickas automatiskt och att e-faktura enligt Peppol-standard fungerar när kunden är en offentlig beställare. Kortare tid mellan utfört arbete och betalning är den billigaste likviditetsförbättring ett bolag kan göra.",
          "Vi håller uppsättningen så enkel som den kan vara. Ett flöde med fem attestnivåer i ett bolag med tre anställda blir inte mer ordning, det blir en flaskhals.",
        ],
      },
      {
        title: "Löpande rapportering",
        lead: "Siffror varje månad, och någon som säger vad de betyder.",
        body: [
          "Du får resultat- och balansrapport varje period, med jämförelse mot föregående år och mot budget om en sådan finns. Rapporten är periodiserad, vilket betyder att en enskild månad går att jämföra med en annan utan att en årsfaktura snedvrider bilden.",
          "Utöver rapporten går vi igenom det som avviker. En kostnadspost som växer snabbare än intäkterna, en marginal som sjunker, en kundfordran som blivit gammal. Det är avvikelserna som är informationen, och de försvinner lätt i en rapport som bara skickas utan kommentar.",
          "Behöver bolaget nyckeltal följer vi upp dem: soliditet inför en bankförhandling, marginal per projekt, personalkostnad i förhållande till omsättning. Vi väljer ett fåtal som betyder något för din verksamhet i stället för en instrumentpanel ingen tittar på.",
        ],
      },
      {
        title: "Rutiner som håller över tid",
        lead: "Ordning som fungerar även den månad då ingen har tid.",
        body: [
          "En rutin är dokumenterad, har en ansvarig och en tidpunkt. Saknas något av de tre är det inte en rutin utan en vana, och vanor slutar fungera så fort någon är sjuk, ledig eller helt enkelt har för mycket att göra. Vi skriver ner vem som gör vad och när, i en form som är kort nog att faktiskt läsas.",
          "Vi bygger också in kontroller som fångar fel tidigt: avstämning mot bank varje period, kontroll av att momsen stämmer mot bokföringen, uppföljning av förfallna kundfakturor. Ett fel som upptäcks samma månad tar minuter att rätta. Samma fel upptäckt i bokslutet tar timmar och kan ha påverkat en momsdeklaration på vägen.",
          "När bolaget växer eller personal byts ut går vi igenom rutinen igen. Det som passade med tre anställda passar sällan med tio, och en rutin som inte följt med verksamheten skapar mer arbete än den sparar.",
        ],
      },
    ],
    deliverables: [
      "Kartläggning av hur underlagen rör sig i dag",
      "Bankkoppling och automatisk transaktionsinläsning",
      "Kvittoapp och digital leverantörsfakturahantering",
      "E-faktura enligt Peppol för offentliga beställare",
      "Attestflöde som går att följa i efterhand",
      "Månadsrapport med genomgång av avvikelser",
      "Dokumenterade rutiner med ansvarig och tidpunkt",
    ],
    faq: [
      {
        question: "Måste vi byta bokföringsprogram för att digitalisera?",
        answer:
          "Nej. De flesta moderna molnsystem klarar det som behövs, och det är kopplingarna och rutinen som brukar saknas snarare än systemet. Behöver ni byta säger vi det, men vi föreslår det inte som första åtgärd.",
      },
      {
        question: "Får vi slänga pappersunderlagen när de är inskannade?",
        answer:
          "Sedan sommaren 2024 får originalet förstöras när informationen överförts till digital form på ett varaktigt sätt utan att något går förlorat. Vi ser till att överföringen uppfyller kravet innan ni börjar rensa.",
      },
      {
        question: "Hur lång tid tar en omställning?",
        answer:
          "Grunden är oftast på plats inom en månad. Vi flyttar över flödet stegvis så att verksamheten inte stannar, och tar det som orsakar mest eftersläpning först.",
      },
      {
        question: "Vad kostar de digitala systemen?",
        answer:
          "Programlicenserna faktureras av leverantören och ligger utanför vårt månadspris. Vi säger vad det landar på innan ni bestämmer er, och rekommenderar inte fler system än verksamheten behöver.",
      },
      {
        question: "Hur ofta får vi rapporter?",
        answer:
          "Varje period, alltså normalt varje månad. Rapporten är periodiserad och kommer med en kommentar om vad som avviker, inte som en fil utan sammanhang.",
      },
      {
        question: "Vi är bara två personer. Behöver vi rutiner?",
        answer:
          "Ja, och särskilt då. I ett litet bolag finns ingen som fångar upp det som glöms bort, vilket gör att en enkel skriven rutin gör större skillnad där än i ett stort bolag.",
      },
    ],
    related: ["bokforing-och-redovisning", "lon-moms-och-deklaration", "myndighetskontakt-och-radgivning"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Ordningen här måste vara samma som ordningen på `services.groups` i
 * ordlistorna. Startsidans tjänstekort kopplas mot rätt sida via index, precis
 * som stadsnamnen i Sverige-sektionen.
 */
export const serviceSlugs = services.map((s) => s.slug);
