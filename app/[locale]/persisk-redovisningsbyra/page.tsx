import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { persiskaOrter } from "@/content/persisk-orter";
import { services } from "@/content/services";
import { getServiceCopy } from "@/content/service-copy";
import { company, phone, whatsappUrl } from "@/content/site";
import { htmlLang, isLocale, localePath } from "@/lib/i18n";
import { absolutUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

/**
 * Den svenskspråkiga sidan för persisk redovisning.
 *
 * Sajten hade redan /persisk-redovisningsbyra-stockholm, men den sidan är
 * skriven helt på persiska. En svensk sökfras som "persisk redovisningsbyrå"
 * hade därmed ingen svensk sida att landa på. Google rankar sällan en
 * persiskspråkig sida på en svensk fras, och även när den gör det står
 * träffens rubrik och beskrivning med persisk skrift, vilket den som sökte på
 * svenska inte klickar på.
 *
 * De två sidorna är samma sida på två språk och binds ihop med hreflang.
 * Persiskan ligger kvar på sin gamla adress utan språkprefix, se den filens
 * kommentar: den adressen bär sökordet och den auktoritet den gamla sajten
 * hann bygga.
 *
 * Sidan finns bara på svenska. En engelsk version hade inte haft någon
 * sökfras att svara på, eftersom den som söker på engelska i Sverige söker på
 * "accountant" och inte på "persisk".
 */

const PATH = "/persisk-redovisningsbyra";
const PERSISK_PATH = "/persisk-redovisningsbyra-stockholm";

/** Sidan är svenskspråkig. /en genereras inte. */
export function generateStaticParams() {
  return [{ locale: "sv" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/persisk-redovisningsbyra">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "sv") return {};

  return {
    ...buildMetadata({
      locale: "sv",
      path: PATH,
      title:
        "Persisk redovisningsbyrå i Stockholm | Bokföring på persiska och svenska",
      description:
        "Persisktalande redovisningsbyrå i Stockholm. Vi sköter bokföring, lön, moms, bokslut, årsredovisning och deklaration på persiska och svenska, digitalt i hela Sverige.",
    }),
    /* Egna alternativ i stället för den vanliga hjälparen. Den utgår från att
       språkversionerna ligger på samma sökväg med olika prefix, och det gör
       de inte här: persiskan ligger kvar på sin gamla adress. */
    alternates: {
      canonical: absolutUrl(localePath("sv", PATH)),
      languages: {
        [htmlLang.sv]: absolutUrl(localePath("sv", PATH)),
        [htmlLang.fa]: absolutUrl(PERSISK_PATH),
        "x-default": absolutUrl(localePath("sv", PATH)),
      },
    },
  };
}

/**
 * Frågorna speglar den persiska sidans frågor, på svenska.
 *
 * Samma ämnen med flit: det är samma sida på två språk, och en besökare som
 * byter språk ska inte få ett annat svar. Ämnena valdes ursprungligen efter
 * vad Googles AI-översikt lyfter fram på persiska sökfraser.
 *
 * Inga belopp och inga procentsatser. De ändras varje år, och en siffra som
 * blivit gammal är sämre än ingen siffra alls på en sida som ska stå kvar.
 */
const FRAGOR = [
  {
    q: "Vad innebär en persisk redovisningsbyrå?",
    a: "Att du kan sköta hela din bokföring på persiska om du vill. Vi går igenom siffrorna, reglerna och myndighetskontakterna på det språk du tänker på, och sköter samtidigt allt formellt mot Skatteverket och Bolagsverket på svenska. Du behöver alltså inte översätta din ekonomi åt någon, och inte heller läsa svenska blanketter på egen hand.",
  },
  {
    q: "Måste jag bo i Sverige för att starta företag här?",
    a: "Nej. Du kan registrera företag i Sverige utan att vara bosatt här. För aktiebolag ställer lagen krav på att en del av styrelsen ska vara bosatt inom EES, och om ingen i styrelsen bor i Sverige ska bolaget utse en särskild delgivningsmottagare här. Bolagsverket kan ge dispens när det behövs. Vi går igenom vad som gäller i just ditt fall innan något registreras.",
  },
  {
    q: "Vad är F-skatt och varför behöver jag den?",
    a: "F-skatt är ett godkännande från Skatteverket som visar att du själv ansvarar för din preliminära skatt och dina egenavgifter. Utan F-skatt måste din uppdragsgivare göra skatteavdrag på din faktura, och därför arbetar de flesta företag bara med uppdragstagare som har den. Vi förbereder och skickar in ansökan åt dig.",
  },
  {
    q: "Ska jag välja enskild firma eller aktiebolag?",
    a: "I en enskild firma är du och företaget samma juridiska person, och du svarar för skulderna med din privata ekonomi. Den är enkel och billig att starta. Ett aktiebolag är en egen juridisk person, kräver aktiekapital och begränsar ditt personliga ansvar, men har fler krav på bokföring och rapportering. Valet beror på din omsättning, din risk och dina planer på att växa. Vi räknar igenom båda alternativen med dig innan du bestämmer.",
  },
  {
    q: "Vad är ROT och RUT och vem kan använda avdragen?",
    a: "ROT och RUT är skattereduktioner som gäller arbetskostnaden för arbete som utförs i hemmet, ROT för renovering och reparation och RUT för hushållsnära tjänster som städning. Privatkunden får avdraget direkt på fakturan och företaget begär resterande belopp från Skatteverket. Arbetar du med bygg, städ eller hushållsnära tjänster sköter vi de ansökningarna åt dig.",
  },
  {
    q: "När ska deklarationerna lämnas in?",
    a: "Momsdeklarationen lämnas varje månad, varje kvartal eller en gång om året beroende på företagets omsättning. Arbetsgivardeklarationen lämnas varje månad så länge du har anställda. Inkomstdeklarationen lämnas en gång om året och styrs av när ditt räkenskapsår slutar. Vi bevakar datumen så att det inte blir förseningsavgifter.",
  },
  {
    q: "Kan allt skötas på distans?",
    a: "Ja. Bokföringen är helt digital och du skickar underlagen som foto eller fil. Vi sitter i Sollentuna norr om Stockholm och arbetar med företagare i hela Sverige, och möten hålls på persiska eller svenska via telefon eller video.",
  },
  /* Frågorna härifrån och ner finns bara på den svenska sidan. De svarar
     på hur folk faktiskt söker på svenska: "iransk redovisningsbyrå",
     "redovisning farsi", "persisk revisor". Sidan låg etta på de fraserna
     när de lades till i november 2026, men utan att orden stod i texten.
     Frågorna ger dem en naturlig plats i stället för att de trycks in i
     löptexten. */
  {
    q: "Är persiska och farsi samma språk?",
    a: "Ja. Farsi är språkets eget namn på persiska, så redovisning på farsi och redovisning på persiska är samma sak. Hos oss kan du gå igenom bokföring, moms och deklaration på farsi, och få svenska brev och blanketter förklarade på samma språk.",
  },
  {
    q: "Är ni en iransk redovisningsbyrå?",
    a: "Vi är en svensk redovisningsbyrå, registrerad i Sverige, med persiska som arbetsspråk vid sidan av svenskan. Byrån är grundad av Ali Nahroudi, som själv talar persiska. Den som söker en iransk redovisningsbyrå letar oftast efter just det: någon som kan svenska regler och förklarar dem på persiska.",
  },
  {
    q: "Har ni en persisktalande revisor?",
    a: "Vi är redovisningskonsulter, inte revisorer. I vardagligt tal kallas båda ofta revisor, men en revisor granskar bokföringen i efterhand medan en redovisningskonsult sköter den löpande. De flesta mindre aktiebolag behöver ingen revisor alls, och det du i praktiken behöver hjälp med är bokföring, moms, lön, bokslut och deklaration. Det gör vi, på persiska eller svenska.",
  },
  {
    q: "Vad skiljer er från en förmedlingstjänst?",
    a: "Vi är själva byrån. Du pratar direkt med den som sköter din bokföring, inte med en mellanhand som skickar din förfrågan vidare till någon annan. Det betyder också att samma person följer ditt företag över tid och känner till din historik när frågorna dyker upp.",
  },
  {
    q: "Vad kostar bokföring på persiska?",
    a: "Språket kostar inget extra. Priset bestäms av hur mycket som händer i företaget, till exempel antal fakturor och om du har anställda, och du får det innan något påbörjas. Första samtalet kostar ingenting.",
  },
];

/**
 * Branscherna är de där reglerna skiljer sig mest från ett vanligt
 * tjänsteföretag, och där det därför spelar störst roll att få dem
 * förklarade på sitt eget språk. Varje rad nämner en regel som faktiskt
 * gäller branschen, inte en allmän försäkran om att vi kan den.
 */
const BRANSCHER = [
  {
    namn: "Restaurang och café",
    text: "Certifierat kassaregister, personalliggare och dagskassor som ska stämma mot bokföringen varje dag.",
  },
  {
    namn: "Taxi och transport",
    text: "Taxameter kopplad till redovisningscentral, och intäkter som ska kunna följas pass för pass.",
  },
  {
    namn: "Bygg och hantverk",
    text: "Omvänd skattskyldighet mellan byggföretag, ROT-ansökningar och personalliggare på byggarbetsplatsen.",
  },
  {
    namn: "Butik och e-handel",
    text: "Lager, inköp från utlandet och moms som beror på var varan kommer ifrån och vem som köper den.",
  },
  {
    namn: "Frisör och skönhet",
    text: "Kassaregister och personalliggare, och ofta flera som hyr stol i samma lokal med var sin bokföring.",
  },
  {
    namn: "Konsult och tjänster",
    text: "Fakturering, F-skatt och frågan om när det lönar sig att gå från enskild firma till aktiebolag.",
  },
];

/** Tre steg, samma ordning som arbetet faktiskt sker i. */
const STEG = [
  {
    rubrik: "Ett samtal på persiska",
    text: "Du berättar vad företaget gör och var du står i dag. Vi säger vad som behöver göras och vad det kostar.",
  },
  {
    rubrik: "Vi lägger upp grunden",
    text: "Registreringar, bokföringsprogram och rutiner för kvitton och fakturor kommer på plats, och vi tar över från din tidigare byrå om du har en.",
  },
  {
    rubrik: "Löpande, utan att du behöver jaga",
    text: "Du skickar underlagen som foto eller fil. Vi bokför, deklarerar och hör av oss när något kräver ett beslut från dig.",
  },
];

const H2 = "np-h2 mb-7 text-[length:var(--fs-h2-sm)] leading-[1.2]";
const BROD =
  "np-justerad m-0 max-w-[68ch] font-sans text-[clamp(16px,1.4vw,18px)] leading-[1.8] text-text-muted";

export default async function PersiskRedovisningsbyraPage({
  params,
}: PageProps<"/[locale]/persisk-redovisningsbyra">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "sv") notFound();

  const url = absolutUrl(localePath("sv", PATH));

  /* Service och inte AccountingService: det här är en beskrivning av ett
     erbjudande som byrån tillhandahåller, och byrån själv är redan beskriven
     som AccountingService i sidhuvudets schema på varje sida. `provider`
     binder ihop de två i stället för att beskriva företaget en gång till. */
  const tjanstJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Persisk redovisningsbyrå",
    serviceType: "Redovisning och bokföring på persiska",
    description:
      "Bokföring, lön, moms, bokslut, årsredovisning och deklaration på persiska och svenska för företagare i Sverige.",
    url,
    inLanguage: ["fa", "sv"],
    availableLanguage: [
      { "@type": "Language", name: "Persian", alternateName: "fa" },
      { "@type": "Language", name: "Swedish", alternateName: "sv" },
    ],
    areaServed: { "@type": "Country", name: "Sweden" },
    provider: {
      "@type": "AccountingService",
      name: company.legalName,
      identifier: company.orgNumber,
      telephone: phone.international,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        postalCode: company.postalCode,
        addressLocality: company.city,
        addressRegion: company.region,
        addressCountry: company.country,
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FRAGOR.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const brodsmulor = breadcrumbJsonLd("sv", [
    { name: "Persisk redovisningsbyrå", path: localePath("sv", PATH) },
  ]);

  return (
    <>
      {[tjanstJsonLd, faqJsonLd, brodsmulor].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-page text-text">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-30%] right-[-15%] h-[55vw] w-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,148,36,.14), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">
            حسابداری به زبان فارسی
          </p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            Persisk redovisningsbyrå i{" "}
            <em className="np-gradient-text">Stockholm och hela Sverige</em>
          </h1>
          <p className={BROD}>
            Nordic Phoenix Redovisningsbyrå är en persisktalande
            redovisningsbyrå. Vi sköter bokföring, lön, moms, bokslut,
            årsredovisning och deklaration för företagare i hela Sverige, och vi
            gör det på persiska eller svenska. Du väljer det språk som gör att
            du förstår din egen ekonomi bäst.
          </p>

          {/* Språkbytet ska vara ett klick och inte en gissning. Länken pekar
              på den persiskspråkiga versionen av samma sida. */}
          <p className="mt-8 mb-0">
            <Link
              href={PERSISK_PATH}
              lang="fa"
              dir="rtl"
              hrefLang="fa"
              className="np-btn np-btn-outline px-7 py-[15px] text-[16px]"
            >
              همین صفحه به فارسی
            </Link>
          </p>
        </div>
      </section>

      {/* ── Vad det innebär ─────────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(56px,7vw,96px)]">
          <h2 className={H2}>Redovisning på ditt eget språk</h2>
          <p className={`${BROD} mb-6`}>
            Det svåra med redovisning är sällan siffrorna. Det svåra är orden.
            Ett brev från Skatteverket, ett villkor i en offert eller skillnaden
            mellan två bolagsformer är enkelt att förstå på sitt eget språk och
            svårt på ett annat. Den som ändå ska driva företag hamnar då i att
            fatta beslut på ungefär rätt underlag, och det blir dyrt.
          </p>
          <p className={BROD}>
            Hos oss förs samtalet på persiska när du vill det. Underlagen,
            deklarationerna och kontakterna med Skatteverket och Bolagsverket
            sköts på svenska av oss, som en del av uppdraget. Du behöver varken
            tolka åt din revisor eller läsa svenska blanketter på egen hand.
          </p>
          {/* Namngiven person, av samma skäl som under bloggartiklarna: råd
              om pengar väger tyngre med en avsändare, både för läsaren och
              för Google. */}
          <p className={`${BROD} mt-6`}>
            Byrån är grundad och drivs av Ali Nahroudi, redovisningskonsult, som
            själv talar persiska. Det är alltså inte en tolkad tjänst: den som
            kan reglerna är samma person som förklarar dem.
          </p>
        </div>
      </section>

      {/* ── Branscher ───────────────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(56px,7vw,96px)]">
          <h2 className={H2}>Branscher där språket gör störst skillnad</h2>
          <p className={`${BROD} mb-[clamp(28px,3vw,40px)]`}>
            Reglerna ser olika ut beroende på vad du arbetar med. De här
            branscherna har egna krav utöver den vanliga bokföringen, och det är
            också där flest missförstånd uppstår när allt ska läsas på svenska.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] border-t border-l border-[var(--hairline-light)]">
            {BRANSCHER.map((b) => (
              <div
                key={b.namn}
                className="border-r border-b border-[var(--hairline-light)] p-[clamp(24px,3vw,36px)]"
              >
                <h3 className="np-h3 mt-0 mb-3 text-[19px] leading-[1.3]">
                  {b.namn}
                </h3>
                <p className="m-0 font-sans text-[15px] leading-[1.7] text-text-muted">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Så går det till ─────────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(56px,7vw,96px)]">
          <h2 className={H2}>Så går det till</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,3vw,40px)] p-0">
            {STEG.map((steg, i) => (
              <li key={steg.rubrik} className="border-t-2 border-accent pt-6">
                <span className="mb-3 block font-mono text-[12px] tracking-[.16em] text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="np-h3 mt-0 mb-3 text-[19px] leading-[1.3]">
                  {steg.rubrik}
                </h3>
                <p className="m-0 font-sans text-[15px] leading-[1.7] text-text-muted">
                  {steg.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Städer ──────────────────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(56px,7vw,96px)]">
          <h2 className={H2}>Persisk redovisning i hela Sverige</h2>
          <p className={`${BROD} mb-[clamp(28px,3vw,40px)]`}>
            Kontoret ligger i Sollentuna norr om Stockholm, och arbetet sker
            digitalt. Det spelar därför ingen roll var i landet företaget finns.
            För några städer har vi skrivit mer om vad som är särskilt just där.
          </p>
          <div className="flex flex-wrap gap-3">
            {persiskaOrter.map((ort) => (
              <Link
                key={ort.slug}
                href={localePath("sv", `${PATH}/${ort.slug}`)}
                className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
              >
                Persisk redovisningsbyrå {ort.name}
              </Link>
            ))}
            <Link
              href={localePath("sv", "/redovisningsbyra")}
              className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-accent-ink no-underline uppercase transition-colors duration-300 hover:border-accent"
            >
              Alla orter
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tjänsterna, som interna länkar ──────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[clamp(56px,7vw,96px)]">
          <h2 className={H2}>Det här sköter vi åt dig</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] border-t border-l border-[var(--hairline-light)]">
            {services.map((service) => {
              const copy = getServiceCopy(service, "sv");
              return (
                <Link
                  key={service.slug}
                  href={`${localePath("sv", "/tjanster")}/${service.slug}`}
                  className="border-r border-b border-[var(--hairline-light)] p-[clamp(24px,3vw,36px)] text-inherit no-underline transition-colors duration-300 hover:bg-[rgba(240,103,0,.05)]"
                >
                  <span className="np-h3 mb-3 block text-[19px] leading-[1.3]">
                    {copy.name}
                  </span>
                  <span className="block font-sans text-[15px] leading-[1.7] text-text-muted">
                    {copy.intro.split(". ")[0]}.
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Frågor och svar ─────────────────────────────────────────── */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(72px,9vw,120px)]">
          <p className="np-label mb-7 text-accent-light">Vanliga frågor</p>
          <h2 className="np-h2 mb-[clamp(36px,4vw,56px)] text-[length:var(--fs-h2-sm)] leading-[1.2]">
            Om att driva företag i Sverige
          </h2>

          {/* <details> ger en dragspelsmeny utan JavaScript, vilket spelar
              roll i en statisk export. Svaren måste dessutom finnas i
              HTML:en för att FAQ-schemat ska godkännas. */}
          <div className="border-t border-[var(--hairline-dark)]">
            {FRAGOR.map((f) => (
              <details
                key={f.q}
                className="group border-b border-[var(--hairline-dark)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-sans text-[17px] leading-[1.5] font-semibold text-on-dark [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex-none text-[22px] leading-none text-accent-light transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="np-justerad m-0 max-w-[68ch] pb-7 font-sans text-[16px] leading-[1.75] text-on-dark-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Uppmaning ───────────────────────────────────────────────── */}
      <section className="bg-page px-[var(--pad-x)] py-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.15] text-banner-ink">
            Prata med oss på persiska
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            Berätta var du står i dag, så säger vi vad som behöver göras och vad
            det kostar. Första samtalet kostar ingenting.
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              Kontakta oss på WhatsApp
            </a>
            <a
              href={phone.href}
              className="np-btn border-[1.5px] border-[rgba(28,15,5,.5)] px-7 py-[15px] text-[15px] font-medium text-banner-ink hover:border-banner-ink hover:bg-[rgba(28,15,5,.08)] hover:text-banner-ink"
            >
              <PhoneNumber />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
