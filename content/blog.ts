/**
 * Bloggens innehåll. Artiklarna är svenskspråkigt SEO-innehåll och ligger
 * därför bara under den svenska rutten (/blogg). Nav-länken pekar hit från
 * alla språk — det finns inga översatta artiklar att peka på.
 */

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
};

export const articles: Article[] = [
  {
    slug: "enskild-firma-eller-aktiebolag",
    tag: "Bolagsstart",
    date: "Juli 2026",
    published: "2026-07-01",
    readingMinutes: 6,
    title: "Enskild firma eller aktiebolag — vad ska du välja?",
    titleLead: "Enskild firma eller",
    titleAccent: "aktiebolag?",
    excerpt:
      "Ansvar, skatt, lön och administration — vi går igenom skillnaderna så att du väljer rätt bolagsform från start.",
    intro:
      "Det är en av de vanligaste frågorna vi får — och svaret beror på din situation. Här går vi igenom skillnaderna i ansvar, skatt och administration, så att du kan välja rätt från start.",
    image: "/assets/blogg-thumb.webp",
    imageAlt: "Enskild firma eller aktiebolag?",
    metaTitle:
      "Enskild firma eller aktiebolag? — Nordic Phoenix Redovisningsbyrå",
    metaDescription:
      "Enskild firma eller aktiebolag? Vi går igenom ansvar, skatt, lön och administration — så att du väljer rätt bolagsform från start.",
    blocks: [
      { type: "heading", text: "Den stora skillnaden: ansvaret" },
      {
        type: "paragraph",
        text: "En enskild firma är ingen egen juridisk person — det är du. Det betyder att du personligen ansvarar för företagets skulder och avtal. Ett aktiebolag är däremot en egen juridisk person: bolaget bär ansvaret, och din privata ekonomi är i regel skyddad.",
      },
      {
        type: "paragraph",
        text: "Har din verksamhet låg risk — till exempel konsultuppdrag utan stora inköp — kan enskild firma räcka långt. Tar du in lager, anställer eller skriver större avtal väger aktiebolagets skydd tyngre.",
      },
      { type: "heading", text: "Kapital och kostnad att starta" },
      {
        type: "paragraph",
        text: "Enskild firma startar du gratis med en registrering hos Skatteverket. Ett aktiebolag kräver 25 000 kr i aktiekapital plus en registreringsavgift till Bolagsverket. Aktiekapitalet är inte en förlorad kostnad — det är bolagets pengar och kan användas i verksamheten.",
      },
      {
        type: "paragraph",
        text: "Tröskeln in är alltså lägre för firman, men skillnaden är mindre än många tror.",
      },
      { type: "heading", text: "Skatt, lön och utdelning" },
      {
        type: "paragraph",
        text: "I enskild firma beskattas hela vinsten som din inkomst av näringsverksamhet — skatt och egenavgifter på alltihop. I ett aktiebolag tar du ut lön som anställd, och kan därutöver ta utdelning enligt 3:12-reglerna, ofta till lägre beskattning.",
      },
      {
        type: "paragraph",
        text: "En vanlig tumregel: vid stabila vinster över ungefär 450 000–500 000 kr per år börjar aktiebolaget ofta löna sig rent skattemässigt. Men tumregler ersätter inte en riktig kalkyl på just dina siffror.",
      },
      { type: "heading", text: "Administration och bokföring" },
      {
        type: "paragraph",
        text: "Enskild firma har enklare regler: förenklat årsbokslut om omsättningen är under 3 miljoner kr. Aktiebolag kräver årsredovisning till Bolagsverket och lite mer formalia — styrelse, bolagsstämma, protokoll. Med en byrå i ryggen är skillnaden i praktiken liten, men den finns.",
      },
      {
        type: "callout",
        label: "Snabb översikt",
        columns: [
          {
            title: "Enskild firma",
            text: "Gratis att starta · Personligt ansvar · Hela vinsten beskattas som inkomst · Enklare bokslut · Passar låg risk och lägre vinster",
          },
          {
            title: "Aktiebolag",
            accent: true,
            text: "25 000 kr i aktiekapital · Begränsat ansvar · Lön + utdelning enligt 3:12 · Årsredovisning krävs · Passar tillväxt, anställda och högre vinster",
          },
        ],
      },
      { type: "heading", text: "Så väljer du" },
      {
        type: "paragraph",
        text: "Testar du en idé vid sidan av jobbet, med låg risk och blygsam vinst? Börja gärna med enskild firma — du kan ombilda till aktiebolag senare. Satsar du på heltid, planerar att anställa eller räknar med god vinst? Då är aktiebolag oftast rätt från dag ett.",
      },
      {
        type: "paragraph",
        text: "Osäker? Det är precis den här typen av beslut vi hjälper till med. En kort genomgång av dina siffror ger ofta ett tydligt svar.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Planerade artiklar. De saknar brödtext än så länge och renderas därför utan
 * länk — kortet visar "Kommer snart" i stället för "Läs artikeln".
 */
export type UpcomingPost = {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
};

export const upcomingPosts: UpcomingPost[] = [
  {
    tag: "Moms",
    date: "Juni 2026",
    title: "Momsdeklaration utan stress — så funkar det",
    excerpt:
      "Vilka datum gäller, vad ska med, och vilka fel är vanligast? En tydlig genomgång för småföretagare.",
  },
  {
    tag: "Bolagsstart",
    date: "Maj 2026",
    title: "Starta AB 2026: steg för steg",
    excerpt:
      "Från namnförslag till registrering hos Bolagsverket och Skatteverket — allt du behöver veta innan start.",
  },
  {
    tag: "Myndigheter",
    date: "Maj 2026",
    title: "Brev från Skatteverket? Så svarar du rätt",
    excerpt:
      "Kompletteringar och omprövningar behöver inte vara skrämmande. Så tolkar du breven och agerar i tid.",
  },
  {
    tag: "Digitalisering",
    date: "April 2026",
    title: "Från papperskaos till digital bokföring",
    excerpt:
      "Så digitaliserar du kvitton, fakturor och rutiner — och vinner timmar varje vecka.",
  },
  {
    tag: "Lön",
    date: "April 2026",
    title: "Arbetsgivardeklaration — undvik de vanligaste missarna",
    excerpt:
      "AGI varje månad låter enkelt, tills det inte är det. Här är fallgroparna och hur du undviker dem.",
  },
  {
    tag: "Bokslut",
    date: "Mars 2026",
    title: "Bokslut och årsredovisning: din tidslinje",
    excerpt:
      "Vilka deadlines gäller för ditt räkenskapsår, och vad kan du förbereda redan nu?",
  },
];
