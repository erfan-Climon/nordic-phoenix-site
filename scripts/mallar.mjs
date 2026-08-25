/**
 * Genererar Nordic Phoenix egna mallar som utskriftsfärdiga PDF:er.
 *
 * Bakgrund: för körjournal, faktura, aktiebok och anställningsavtal finns
 * ingen officiell myndighetsblankett. Alla mallar man hittar på nätet är
 * någon annans upphovsrättsskyddade material, och en kopia av dem på en
 * kommersiell sajt är ett intrång. Innehållet styrs däremot av lag, inte av
 * vem som formger dokumentet, så byrån kan ta fram sina egna. Varje mall
 * nedan anger vilken paragraf som bestämmer fälten.
 *
 * Körs med `node scripts/mallar.mjs`. PDF:erna hamnar i `public/mallar/`.
 * Chrome används i headless-läge av samma skäl som i kundlogotyper.mjs:
 * det är den enda pdf-motorn som redan finns på maskinen, och projektet
 * slipper ett beroende till.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const UT = "public/mallar";

const FÖRETAG = {
  namn: "Nordic Phoenix Redovisningsbyrå AB",
  orgnr: "559577-4232",
  adress: "Bollstanäsvägen 3, 192 78 Sollentuna",
  telefon: "072-008 40 00",
  epost: "info@nordicphoenix.se",
  webb: "nordicphoenix.se",
};

const logo = fs.readFileSync("public/assets/phoenix-logo.png").toString("base64");

/** Delad stilmall. Måtten är i millimeter eftersom allt här ska skrivas ut. */
const CSS = `
  @page { size: A4 portrait; margin: 14mm 13mm 12mm 13mm; }
  @page :first { margin-top: 12mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 8.6pt;
    line-height: 1.45;
    color: #171310;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Varje sida är en egen .sida med eget huvud och egen fot. Sidfoten låg
     först som position:fixed, vilket ser rätt ut i webbläsaren men lägger
     sig ovanpå de sista tabellraderna vid utskrift: fixerade element tas ur
     flödet och innehållet fortsätter under dem. Nu är foten ett vanligt
     block som trycks ner med margin-top:auto, så den kan aldrig krocka.
     min-height är sidans innehållsyta, alltså formatets höjd minus
     marginalerna i @page. */
  .sida { page-break-after: always; display: flex; flex-direction: column;
          min-height: 271mm; }
  .sida:last-child { page-break-after: auto; }
  .liggande .sida { min-height: 184mm; }
  .kropp { flex: 1; }

  header { display: flex; align-items: flex-start; justify-content: space-between;
           border-bottom: 1.6pt solid #0a0908; padding-bottom: 2.5mm; margin-bottom: 4.5mm; }
  .marke { display: flex; align-items: center; gap: 3mm; }
  .marke img { width: 13mm; height: auto; }
  .marke b { font-size: 9pt; letter-spacing: .04em; text-transform: uppercase; }
  .marke span { display: block; font-size: 7pt; color: #6a6155; letter-spacing: .06em;
                text-transform: uppercase; font-weight: 400; margin-top: .6mm; }
  h1 { margin: 0; font-size: 16pt; line-height: 1.05; text-align: right; letter-spacing: -.01em; }
  h1 em { display: block; font-style: normal; font-size: 7.5pt; font-weight: 400;
          letter-spacing: .12em; text-transform: uppercase; color: #d66000; margin-bottom: 1.4mm; }

  h2 { margin: 4mm 0 2mm; font-size: 9pt; letter-spacing: .1em; text-transform: uppercase;
       color: #d66000; border-bottom: .5pt solid #d8d2c6; padding-bottom: 1.2mm; }
  h2:first-of-type { margin-top: 0; }

  table { width: 100%; border-collapse: collapse; }
  th, td { border: .5pt solid #b9b1a4; padding: 1.6mm 1.8mm; text-align: left; vertical-align: top; }
  th { background: #f4f0e8; font-size: 7.2pt; letter-spacing: .04em; text-transform: uppercase;
       font-weight: 600; color: #3e3830; }
  /* Tomma rader ska vara skrivbara med penna, alltså höga nog. */
  td.rad { height: 7.2mm; }
  td.smal { width: 22mm; }

  /* Fält att fylla i: etikett över en linje, samma mönster överallt. */
  .falt { display: grid; gap: 2mm 4mm; }
  .falt.tva { grid-template-columns: 1fr 1fr; }
  .falt.tre { grid-template-columns: 1fr 1fr 1fr; }
  .f label { display: block; font-size: 6.8pt; letter-spacing: .08em; text-transform: uppercase;
             color: #6a6155; margin-bottom: .8mm; }
  .f .linje { border-bottom: .6pt solid #8a7b60; height: 5mm; }
  .f .ruta { border: .5pt solid #8a7b60; height: 12mm; }

  /* Summeringen låg först som staplade .f-fält, vilket gav tolv millimeter
     per rad och ensamt sköt fakturan till en tredje sida. Som tabell tar
     samma fem rader knappt hälften. */
  .summa { width: 76mm; margin: 4mm 0 0 auto; }
  .summa th { text-transform: none; letter-spacing: 0; font-size: 7.6pt;
              background: transparent; font-weight: 400; color: #3e3830; }
  .summa td { width: 32mm; height: 6.4mm; }
  .summa tr:last-child th { font-weight: 700; color: #171310; }

  .kryss { display: flex; flex-wrap: wrap; gap: 2mm 6mm; margin-top: 1mm; }
  .kryss span { display: flex; align-items: center; gap: 1.6mm; font-size: 8.2pt; }
  /* Fälten som följer på en kryssrad behöver egen luft, annars klistrar sig
     etiketten mot rutorna ovanför och raden ser ut att höra till dem. */
  .kryss + .falt { margin-top: 4mm; }
  .kryss i { display: inline-block; width: 3.2mm; height: 3.2mm; border: .6pt solid #171310;
             font-style: normal; }

  .notis { margin-top: 3mm; font-size: 7pt; line-height: 1.5; color: #6a6155; }
  .lagrum { color: #8a7b60; font-style: italic; }

  .sidfot { margin-top: auto; padding-top: 2.2mm;
            border-top: .5pt solid #d8d2c6;
            font-size: 6.6pt; color: #8a7b60;
            display: flex; justify-content: space-between; }
`;

function huvud(titel, etikett) {
  return `<header>
    <div class="marke">
      <img src="data:image/png;base64,${logo}" alt="">
      <b>Nordic Phoenix<span>Redovisningsbyrå</span></b>
    </div>
    <h1><em>${etikett}</em>${titel}</h1>
  </header>`;
}

const SIDFOT = `<div class="sidfot">
  <span>${FÖRETAG.namn} · Org.nr ${FÖRETAG.orgnr} · ${FÖRETAG.telefon} · ${FÖRETAG.epost}</span>
  <span>${FÖRETAG.webb}</span>
</div>`;

/** En sida: huvud, innehåll och fot. Foten trycks ner mot underkanten. */
function sida(titel, etikett, kropp) {
  return `<div class="sida">${huvud(titel, etikett)}<div class="kropp">${kropp}</div>${SIDFOT}</div>`;
}

function dokument(sidor, { liggande = false } = {}) {
  return `<!doctype html><html lang="sv"><head><meta charset="utf-8">
<style>${CSS}${liggande ? "\n@page { size: A4 landscape; }" : ""}</style>
</head><body${liggande ? ' class="liggande"' : ""}>
${sidor.join("\n")}
</body></html>`;
}

/** Fält: [etikett, spann] där spann är antal kolumner fältet upptar. */
function fält(rader, kolumner = "tva") {
  return `<div class="falt ${kolumner}">${rader
    .map(
      ([etikett, span = 1, sort = "linje"]) =>
        `<div class="f"${span > 1 ? ` style="grid-column: span ${span}"` : ""}>
           <label>${etikett}</label><div class="${sort}"></div></div>`,
    )
    .join("")}</div>`;
}

/** Summeringsrader: etikett till vänster, tom ruta att fylla i till höger. */
function summering(rader) {
  return `<table class="summa">${rader
    .map((r) => `<tr><th>${r}</th><td></td></tr>`)
    .join("")}</table>`;
}

function tomraderTabell(kolumner, antal) {
  const th = kolumner.map((k) => `<th${k[1] ? ` style="width:${k[1]}"` : ""}>${k[0]}</th>`).join("");
  const rad = `<tr>${kolumner.map(() => '<td class="rad"></td>').join("")}</tr>`;
  return `<table><thead><tr>${th}</tr></thead><tbody>${rad.repeat(antal)}</tbody></table>`;
}

// ───────────────────────────────────────────────────────────── körjournal
/* Fälten följer Skatteverkets anvisning för körjournal: mätarställning vid
   årets början och slut, samt datum, mätarställning, resmål, syfte och
   motpart för varje resa. */
const körjournal = dokument(
  [
    sida(
      "Körjournal",
      "Mall · Tjänsteresor",
      `${fält(
    [
      ["Företag", 2],
      ["Org.nr"],
      ["Förare"],
      ["Fordonets registreringsnummer"],
      ["År"],
      ["Mätarställning vid årets början"],
      ["Mätarställning vid årets slut"],
    ],
    "tre",
  )}
  <h2>Resor</h2>
  ${tomraderTabell(
    [
      ["Datum", "20mm"],
      ["Mätarställning start", "24mm"],
      ["Mätarställning slut", "24mm"],
      ["Antal km", "18mm"],
      ["Från och till"],
      ["Ärende och syfte"],
      ["Kund eller motpart"],
      ["Signatur", "22mm"],
    ],
    11,
  )}
  <p class="notis">
    Körjournalen ska föras löpande och vara aktuell. <span class="lagrum">Skatteverket anger
    att den bör innehålla mätarställning vid årets början, datum och mätarställning vid
    resans start, vart resan gick, syfte och kund, datum och mätarställning vid resans slut
    samt mätarställning vid årets slut.</span> Journalen sparas i minst sju år enligt
    bokföringslagen. Brister i dokumentationen kan göra att samtliga avdrag underkänns,
    inte bara de resor som saknar uppgifter.
  </p>`,
    ),
  ],
  { liggande: true },
);

// ─────────────────────────────────────────────────────── faktura och kvitto
/* Obligatoriska uppgifter enligt mervärdesskattelagen 11 kap. Fakturan och
   kvittot ligger i samma fil eftersom de hör ihop i vardagen: fakturan
   skickas, kvittot lämnas vid direktbetalning. */
const faktura = dokument([
  sida(
    "Kundfaktura",
    "Mall · Fakturering",
    `<h2>Säljare</h2>
  ${fält([["Företagsnamn", 2], ["Org.nr"], ["Momsregistreringsnummer"], ["Adress", 2], ["Bankgiro, plusgiro eller IBAN", 2]], "tva")}
  <h2>Köpare</h2>
  ${fält([["Namn eller företagsnamn", 2], ["Org.nr eller personnummer"], ["Er referens"], ["Adress", 2]], "tva")}
  <h2>Fakturauppgifter</h2>
  ${fält([["Fakturanummer"], ["Fakturadatum"], ["Leveransdatum"], ["Förfallodatum"], ["Betalningsvillkor"], ["Dröjsmålsränta"]], "tre")}
  <h2>Specifikation</h2>
  ${tomraderTabell(
    [
      ["Beskrivning av vara eller tjänst"],
      ["Antal", "16mm"],
      ["Enhet", "16mm"],
      ["À-pris exkl. moms", "24mm"],
      ["Rabatt", "18mm"],
      ["Momssats", "18mm"],
      ["Belopp exkl. moms", "26mm"],
    ],
    5,
  )}
  ${summering(["Summa exkl. moms", "Moms 25 %", "Moms 12 %", "Moms 6 %", "Att betala"])}
  <p class="notis">
    <span class="lagrum">Mervärdesskattelagen 11 kap. anger vilka uppgifter en faktura måste
    innehålla:</span> fakturadatum, ett unikt löpnummer, säljarens momsregistreringsnummer,
    säljarens och köparens namn och adress, varornas eller tjänsternas art och omfattning,
    leveransdatum, beskattningsunderlag per skattesats, tillämpad momssats och momsbeloppet.
    Är omsättningen undantagen från moms ska fakturan hänvisa till den bestämmelse som gäller,
    till exempel omvänd betalningsskyldighet. Ange också om företaget är godkänt för F-skatt.
  </p>`,
  ),
  sida(
    "Kvitto",
    "Mall · Direktbetalning",
    `<h2>Säljare</h2>
  ${fält([["Företagsnamn", 2], ["Org.nr"], ["Momsregistreringsnummer"], ["Adress", 2]], "tva")}
  <h2>Köp</h2>
  ${fält([["Kvittonummer"], ["Datum"], ["Betalsätt"]], "tre")}
  ${tomraderTabell(
    [
      ["Beskrivning av vara eller tjänst"],
      ["Antal", "18mm"],
      ["À-pris", "22mm"],
      ["Momssats", "20mm"],
      ["Belopp", "24mm"],
    ],
    7,
  )}
  ${summering(["Summa exkl. moms", "Varav moms", "Totalt betalt"])}
  <h2>Kvittering</h2>
  ${fält([["Ort och datum"], ["Underskrift säljare"], ["Namnförtydligande", 2]], "tva")}
  <p class="notis">
    Kvittot är köparens underlag för sin bokföring och ska visa säljarens namn och
    organisationsnummer, vad som sålts, beloppet och hur mycket av det som är moms.
    Sparas i minst sju år enligt bokföringslagen.
  </p>`,
  ),
]);

// ────────────────────────────────────────────────────────────── aktiebok
/* Innehållet följer aktiebolagslagen 5 kap.: uppgifter om aktierna
   (löpnummer och aktieslag) och om ägarna (namn, person- eller
   organisationsnummer, postadress) samt datum för införing. */
const aktiebok = dokument(
  [
    sida(
      "Aktiebok",
      "Mall · Aktiebolag",
      `${fält(
    [
      ["Bolagets företagsnamn", 2],
      ["Org.nr"],
      ["Bolagskategori (privat eller publikt)"],
      ["Aktiekapital"],
      ["Totalt antal aktier"],
      ["Aktieboken upprättad den"],
      ["Senast uppdaterad den"],
    ],
    "tre",
  )}
  <h2>Förbehåll i bolagsordningen</h2>
  <div class="kryss">
    <span><i></i> Hembudsförbehåll</span>
    <span><i></i> Samtyckesförbehåll</span>
    <span><i></i> Förköpsförbehåll</span>
    <span><i></i> Inga förbehåll</span>
  </div>
  <h2>Aktieägare</h2>
  ${tomraderTabell(
    [
      ["Aktienummer från–till", "26mm"],
      ["Antal", "14mm"],
      ["Aktieslag", "18mm"],
      ["Ägarens namn eller firma"],
      ["Person- eller org.nr", "26mm"],
      ["Postadress och land"],
      ["Införd den", "20mm"],
      ["Anteckning", "24mm"],
    ],
    10,
  )}
  <p class="notis">
    <span class="lagrum">Enligt aktiebolagslagen 5 kap. ska varje aktiebolag ha en aktiebok.
    Den ska ligga till grund för aktieägarnas rättigheter mot bolaget och ge underlag för att
    bedöma ägarförhållandena.</span> Aktierna tas upp i nummerordning med uppgift om aktieslag,
    och för varje ägare anges fullständigt namn eller firma, person- eller organisationsnummer,
    postadress inklusive land samt datum för införing. Styrelsen ansvarar för att aktieboken
    hålls uppdaterad. Den ska bevaras så länge bolaget består och i minst tio år efter
    upplösningen.
  </p>`,
    ),
  ],
  { liggande: true },
);

// ───────────────────────────────────────────────────────── anställningsavtal
/* Minimiinnehållet följer 6 c § lagen om anställningsskydd, som räknar upp
   den information arbetsgivaren är skyldig att lämna skriftligt. */
const anställningsavtal = dokument([
  sida(
    "Anställningsavtal",
    "Mall · Anställning",
    `<h2>Parter</h2>
  ${fält(
    [
      ["Arbetsgivarens namn", 2],
      ["Org.nr"],
      ["Arbetsgivarens adress", 2],
      ["Arbetstagarens namn", 2],
      ["Personnummer"],
      ["Arbetstagarens adress", 2],
    ],
    "tre",
  )}
  <h2>Anställningen</h2>
  ${fält([["Tillträdesdag"], ["Befattning eller yrkesbenämning"], ["Arbetsplats"], ["Arbetsuppgifter i korthet"]], "tva")}
  <h2>Anställningsform</h2>
  <div class="kryss">
    <span><i></i> Tillsvidareanställning</span>
    <span><i></i> Särskild visstidsanställning</span>
    <span><i></i> Vikariat</span>
    <span><i></i> Säsongsarbete</span>
    <span><i></i> Provanställning</span>
  </div>
  ${fält([["Vid visstid: slutdag"], ["Vid vikariat: vem ersätts"], ["Provanställningens längd"]], "tre")}
  <h2>Arbetstid</h2>
  ${fält([["Sysselsättningsgrad i procent"], ["Timmar per vecka"], ["Normal förläggning av arbetstiden", 3]], "tre")}
  <h2>Lön och förmåner</h2>
  ${fält([["Lön (månadslön eller timlön)"], ["Utbetalas den"], ["Övriga lönedelar, till exempel ob eller provision", 2], ["Förmåner", 2]], "tva")}`,
  ),
  sida(
    "Anställningsavtal",
    "Mall · Sidan 2 av 2",
    `<h2>Semester</h2>
  ${fält([["Antal semesterdagar per år"], ["Semesterersättning eller semesterlön"]], "tva")}
  <h2>Uppsägning</h2>
  ${fält([["Uppsägningstid från arbetsgivaren"], ["Uppsägningstid från arbetstagaren"]], "tva")}
  <h2>Kollektivavtal och försäkringar</h2>
  <div class="kryss">
    <span><i></i> Kollektivavtal tillämpas</span>
    <span><i></i> Kollektivavtal tillämpas inte</span>
  </div>
  ${fält([["Vilket kollektivavtal", 2], ["Tjänstepension och försäkringar", 2], ["Socialförsäkringsskydd som arbetsgivaren betalar avgifter för", 2]], "tva")}
  <h2>Utbildning</h2>
  ${fält([["Utbildning som arbetsgivaren erbjuder eller bekostar", 2]], "tva")}
  <h2>Övriga villkor</h2>
  <div class="f"><div class="ruta" style="height:26mm"></div></div>
  <h2>Underskrifter</h2>
  ${fält(
    [
      ["Ort och datum", 2],
      ["Arbetsgivarens underskrift"],
      ["Arbetstagarens underskrift"],
      ["Namnförtydligande"],
      ["Namnförtydligande"],
    ],
    "tva",
  )}
  <p class="notis">
    <span class="lagrum">6 c § lagen om anställningsskydd anger vilken information
    arbetsgivaren är skyldig att lämna skriftligt till arbetstagaren.</span> Det gäller bland
    annat parternas namn och adress, tillträdesdag, arbetsplats, befattning, anställningsform,
    uppsägningstider, lön och hur ofta den betalas, arbetstidens längd och förläggning,
    semester, tillämpligt kollektivavtal, socialförsäkringsskydd och den utbildning
    arbetsgivaren erbjuder. Avtalet upprättas i två exemplar, ett till vardera parten.
  </p>
  <p class="notis">
    Mallen är ett stöd och ersätter inte juridisk rådgivning. Omfattas verksamheten av
    kollektivavtal gäller det avtalets villkor före det som skrivs här.
  </p>`,
  ),
]);

// ────────────────────────────────────────────────────────────────── körning
const mallar = [
  ["korjournal", körjournal],
  ["kundfaktura-och-kvitto", faktura],
  ["aktiebok", aktiebok],
  ["anstallningsavtal", anställningsavtal],
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "np-mallar-"));
fs.mkdirSync(UT, { recursive: true });

for (const [slug, html] of mallar) {
  const källa = path.join(tmp, `${slug}.html`);
  const mål = path.join(UT, `${slug}.pdf`);
  fs.writeFileSync(källa, html);

  /* HTML_UT=<katalog> sparar mellanledet. Används för att mäta sidhöjderna i
     en webbläsare när en mall oväntat spiller över till en extra sida. */
  if (process.env.HTML_UT) {
    fs.mkdirSync(process.env.HTML_UT, { recursive: true });
    fs.writeFileSync(path.join(process.env.HTML_UT, `${slug}.html`), html);
  }

  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${path.resolve(mål)}`,
      `file://${källa}`,
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );

  const kb = Math.round(fs.statSync(mål).size / 1024);
  console.log(`${slug}.pdf  ${kb} kB`);
}

fs.rmSync(tmp, { recursive: true, force: true });
