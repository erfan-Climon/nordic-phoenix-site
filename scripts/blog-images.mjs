/**
 * Sätter artikelrubriken på bloggens bilder, ett språk i taget.
 *
 * VARFÖR INTE LÅTA BILDGENERATORN SKRIVA TEXTEN:
 * Den kan inte stava. Kundens egen persiska bildserie fick 323 400 kronor i
 * stället för 322 400, och "۲ بخش" där det skulle stå "۴ بخش". På persiska ska
 * bokstäverna dessutom bindas ihop och läsas från höger, vilket bildmodeller
 * regelmässigt får om bakfoten.
 *
 * Här kommer texten i stället direkt ur content/blog.ts och content/blog.fa.ts,
 * alltså exakt samma strängar som står på sajten. Renderingen görs av headless
 * Chrome, som både formar persiskan korrekt och använder sajtens egna typsnitt.
 *
 * Bakgrunderna är AI-genererade och textfria, se docs/bildprompter-blogg.md.
 *
 * Körs med:
 *   node scripts/blog-images.mjs
 *
 * Läser  public/assets/blogg/bakgrund/<slug>.{png,jpg,jpeg,webp}
 * Skriver public/assets/blogg/<slug>-{sv,fa}.png
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BAKGRUND = path.join(ROT, "public/assets/blogg/bakgrund");
const UT = path.join(ROT, "public/assets/blogg");
const TMP = path.join(ROT, ".blogg-bilder");

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** 3:2. Visas som mest 900 px brett på sajten, så 1536 räcker även retina. */
const BREDD = 1536;
const HOJD = 1024;

const SPRAK = {
  sv: { dir: "ltr", lang: "sv" },
  fa: { dir: "rtl", lang: "fa" },
};

/**
 * Sajtens typsnitt, hämtade ur det byggda resultatet. Alternativet vore att
 * lita på systemtypsnitt, men då blir bilderna inte satta i samma typsnitt som
 * sidan de ligger på.
 */
function typsnittsCss() {
  const chunks = path.join(ROT, "out/_next/static/chunks");
  if (!fs.existsSync(chunks)) {
    throw new Error("Kör npm run build först, typsnitten hämtas ur out/.");
  }
  const css = fs
    .readdirSync(chunks)
    .filter((f) => f.endsWith(".css"))
    .map((f) => fs.readFileSync(path.join(chunks, f), "utf8"))
    .join("");

  const regler = css.match(/@font-face\{[^}]*\}/g) ?? [];
  if (!regler.length) throw new Error("Hittade inga @font-face i bygget.");

  // Relativa URL:er duger inte när sidan laddas från file://.
  return regler
    .map((r) =>
      r.replace(
        /url\(([^)]+)\)/g,
        (_, u) =>
          `url(file://${path.join(ROT, "out", u.replace(/^\/?/, "/"))})`,
      ),
    )
    .join("\n");
}

function mall({ bakgrund, etikett, rubrik, ingress, locale }) {
  const { dir, lang } = SPRAK[locale];
  // Texten ligger till vänster i vänsterläst och till höger i högerläst, så
  // att den börjar där ögat börjar. Bakgrundens tomma yta är komponerad för
  // det, se prompterna.
  return `<!doctype html><html lang="${lang}" dir="${dir}"><meta charset="utf-8">
<style>
${typsnittsCss()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${BREDD}px;height:${HOJD}px;overflow:hidden}
.bild{position:relative;width:${BREDD}px;height:${HOJD}px;
  background:#EDE8DF url("file://${bakgrund}") center/cover no-repeat}
/* Mjuk slöja från textsidan, så att rubriken bär även om bakgrundens
   tomma yta råkar bli ljusare än väntat. Ingen jämn mörkning över hela
   bilden: det skulle döda pappersstrukturen som är hela poängen. */
.slöja{position:absolute;inset:0;background:linear-gradient(
  to ${dir === "rtl" ? "left" : "right"},
  rgba(250,249,245,.94) 0%, rgba(250,249,245,.88) 38%,
  rgba(250,249,245,.45) 62%, rgba(250,249,245,0) 82%)}
.text{position:absolute;top:0;${dir === "rtl" ? "right" : "left"}:0;
  width:62%;height:100%;display:flex;flex-direction:column;justify-content:center;
  gap:28px;padding:0 96px}
.etikett{font-family:"IBM Plex Mono",monospace;font-size:20px;letter-spacing:.22em;
  text-transform:uppercase;color:#8A7B60}
.rubrik{font-family:"Source Sans 3",sans-serif;font-weight:700;
  font-size:${locale === "fa" ? 58 : 62}px;line-height:1.14;letter-spacing:-.02em;
  color:#171310;text-wrap:balance}
.rubrik em{font-style:normal;color:#F06700}
.regel{width:96px;height:5px;background:#F06700;border-radius:3px}
.ingress{font-family:"Open Sans",sans-serif;font-size:24px;line-height:1.6;
  color:#4A443B;max-width:34ch}
/* Persiskan behöver mer radavstånd, annars kolliderar de nedhängande
   bokstäverna med raden under. */
[dir=rtl] .rubrik{line-height:1.45;font-family:"Noto Naskh Arabic",serif}
[dir=rtl] .ingress{line-height:1.9;font-family:"Noto Naskh Arabic",serif;font-size:22px}
</style>
<div class="bild"><div class="slöja"></div>
  <div class="text">
    <span class="etikett">${etikett}</span>
    <h1 class="rubrik">${rubrik}</h1>
    <span class="regel"></span>
    <p class="ingress">${ingress}</p>
  </div>
</div></html>`;
}

const rensa = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Rubriken delas redan i innehållet. Andra halvan får accentfärgen. */
const rubrikHtml = (copy) =>
  `${rensa(copy.titleLead)} <em>${rensa(copy.titleAccent)}</em>`;

function hittaBakgrund(slug) {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    const p = path.join(BAKGRUND, `${slug}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function main() {
  const { articles } = await import(path.join(ROT, "content/blog.ts"));
  const { articlesFa } = await import(path.join(ROT, "content/blog.fa.ts"));

  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(UT, { recursive: true });

  let gjorda = 0;
  const saknade = [];

  for (const article of articles) {
    const bakgrund = hittaBakgrund(article.slug);
    if (!bakgrund) {
      saknade.push(article.slug);
      continue;
    }

    for (const [locale, copy] of [
      ["sv", article],
      ["fa", articlesFa[article.slug]],
    ]) {
      if (!copy) continue;

      const html = path.join(TMP, `${article.slug}-${locale}.html`);
      const png = path.join(UT, `${article.slug}-${locale}.png`);
      fs.writeFileSync(
        html,
        mall({
          bakgrund,
          etikett: rensa(copy.tag),
          rubrik: rubrikHtml(copy),
          // Ingressen kortas: bilden ska läsas på en sekund, inte läsas klart.
          ingress: rensa(copy.excerpt.split(/(?<=[.!?؟])\s/)[0]),
          locale,
        }),
      );

      execFileSync(
        CHROME,
        [
          "--headless",
          "--disable-gpu",
          "--hide-scrollbars",
          `--window-size=${BREDD},${HOJD}`,
          `--screenshot=${png}`,
          `file://${html}`,
        ],
        { stdio: "ignore" },
      );
      gjorda++;
      console.log(`  ${path.relative(ROT, png)}`);
    }
  }

  fs.rmSync(TMP, { recursive: true, force: true });
  console.log(`\n${gjorda} bilder skrivna.`);
  if (saknade.length) {
    console.log(
      `\nSaknar bakgrund för ${saknade.length} artiklar. Lägg dem i ` +
        `${path.relative(ROT, BAKGRUND)}/<slug>.png:`,
    );
    saknade.forEach((s) => console.log(`  ${s}`));
  }
}

main();
