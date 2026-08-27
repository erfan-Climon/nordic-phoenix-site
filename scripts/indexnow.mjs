/**
 * Anmäler sajtens adresser till IndexNow.
 *
 * IndexNow är en gemensam anmälningspunkt som Bing och Yandex lyssnar på.
 * I stället för att vänta på att en robot kommer förbi säger vi själva till
 * när något ändrats. Google deltar inte, så det här ersätter ingenting där.
 *
 * Nyckeln ligger som en fil i roten med nyckeln som både filnamn och innehåll.
 * Bing hämtar den för att kontrollera att den som anmäler faktiskt råder över
 * domänen. Byts nyckeln ska filen bytas i samma veva.
 *
 * Körs efter en deploy, när de nya sidorna faktiskt svarar:
 *
 *   node scripts/indexnow.mjs
 *
 * Adresserna läses ur den publicerade sitemapen och inte ur bygget, just för
 * att det som anmäls ska vara det som ligger ute.
 */

import fs from "node:fs";
import path from "node:path";

const VARD = "nordicphoenix.se";
const SITEMAP = `https://${VARD}/sitemap.xml`;
const ANDPUNKT = "https://api.indexnow.org/IndexNow";

/** Nyckelfilen känns igen på att namnet är en hexsträng. */
function hittaNyckel() {
  const filer = fs.readdirSync("public");
  const träff = filer.find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!träff) {
    console.error("Ingen nyckelfil i public/. Förväntar <32 hex>.txt");
    process.exit(1);
  }
  const nyckel = path.basename(träff, ".txt");
  const innehåll = fs.readFileSync(path.join("public", träff), "utf8").trim();
  if (innehåll !== nyckel) {
    console.error("Nyckelfilens innehåll matchar inte filnamnet.");
    process.exit(1);
  }
  return nyckel;
}

const nyckel = hittaNyckel();

const svar = await fetch(SITEMAP);
if (!svar.ok) {
  console.error(`Kunde inte hämta ${SITEMAP}: ${svar.status}`);
  process.exit(1);
}
const xml = await svar.text();
const adresser = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (adresser.length === 0) {
  console.error("Sitemapen innehöll inga adresser.");
  process.exit(1);
}

/* Kontrollera att nyckeln verkligen ligger ute innan vi anmäler. Bing avvisar
   annars hela anmälan, och felet är svårt att se i efterhand. */
const nyckelSvar = await fetch(`https://${VARD}/${nyckel}.txt`);
if (!nyckelSvar.ok) {
  console.error(
    `Nyckeln svarar inte på https://${VARD}/${nyckel}.txt (${nyckelSvar.status}).`,
  );
  console.error("Deploya först, anmäl sedan.");
  process.exit(1);
}

const anmalan = await fetch(ANDPUNKT, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: VARD,
    key: nyckel,
    keyLocation: `https://${VARD}/${nyckel}.txt`,
    urlList: adresser,
  }),
});

/* 200 betyder mottaget, 202 betyder mottaget men nyckeln kontrolleras ännu.
   Båda är godkända utfall. */
console.log(`${adresser.length} adresser anmälda. Svar: ${anmalan.status}`);
if (!anmalan.ok && anmalan.status !== 202) {
  console.error(await anmalan.text());
  process.exit(1);
}
