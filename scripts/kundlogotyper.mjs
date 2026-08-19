/**
 * Lägger in en kundlogotyp i bältet: beskär bort tomma marginaler,
 * skalar ner och skriver en webp i public/assets/kunder.
 *
 *   node scripts/kundlogotyper.mjs <källfil> <slug>
 *
 * Beskärningen är hela poängen. Filerna kommer som kvadratiska eller
 * liggande bilder med logotypen mitt i och stora tomma fält runt om. Utan
 * beskärning styr den tomma ytan höjden, och logotyperna renderas små och
 * olika stora i bältet.
 *
 * Genomskinliga filer beskärs på alfakanalen. Filer utan alfa, till exempel
 * jpg, beskärs i stället på vitt: allt som är nästan vitt räknas som
 * marginal. Bältet lägger ändå multiply över logotyperna, så en vit botten
 * försvinner mot sidans bakgrund.
 *
 * Konverteringen görs av headless Chrome via canvas, av samma skäl som i
 * scripts/blog-images.mjs: varken sips, Pillow eller ImageMagick finns på
 * maskinen.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UT = path.join(ROT, "public/assets/kunder");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** Logotyperna visas som mest ~150 px breda, så 460 räcker på retinaskärm. */
const MAXBREDD = 460;
const MAXHÖJD = 260;
const KVALITET = 0.9;
/** Luft runt logotypen, i procent av dess beskurna storlek. */
const MARGINAL = 0.03;

const [källa, slug] = process.argv.slice(2);
if (!källa || !slug) {
  console.error("Användning: node scripts/kundlogotyper.mjs <källfil> <slug>");
  process.exit(1);
}
if (!fs.existsSync(källa)) {
  console.error(`Hittar inte ${källa}`);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(ROT, ".logojobb-"));
const html = path.join(tmp, "konvertera.html");

fs.writeFileSync(
  html,
  `<!doctype html><meta charset="utf-8"><body><div id="ut"></div><script>
const bild = new Image();
bild.onload = () => {
  const b = bild.naturalWidth, h = bild.naturalHeight;
  const mät = document.createElement("canvas");
  mät.width = b; mät.height = h;
  const mc = mät.getContext("2d", { willReadFrequently: true });
  mc.drawImage(bild, 0, 0);
  const d = mc.getImageData(0, 0, b, h).data;

  /* Har filen alfa alls? Annars beskärs den på vitt i stället. */
  let harAlfa = false;
  for (let i = 3; i < d.length; i += 4) {
    if (d[i] < 250) { harAlfa = true; break; }
  }
  const tom = (i) => harAlfa
    ? d[i + 3] < 12
    : d[i] > 244 && d[i + 1] > 244 && d[i + 2] > 244;

  let v = b, hö = -1, ö = h, u = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < b; x++) {
      if (tom((y * b + x) * 4)) continue;
      if (x < v) v = x;
      if (x > hö) hö = x;
      if (y < ö) ö = y;
      if (y > u) u = y;
    }
  }
  if (hö < 0) { document.getElementById("ut").textContent = "TOM"; return; }

  const kb = hö - v + 1, kh = u - ö + 1;
  const m = Math.round(Math.max(kb, kh) * ${MARGINAL});
  const sv = Math.max(0, v - m), sö = Math.max(0, ö - m);
  const sb = Math.min(b - sv, kb + m * 2), sh = Math.min(h - sö, kh + m * 2);

  const skala = Math.min(1, ${MAXBREDD} / sb, ${MAXHÖJD} / sh);
  const c = document.createElement("canvas");
  c.width = Math.round(sb * skala);
  c.height = Math.round(sh * skala);
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bild, sv, sö, sb, sh, 0, 0, c.width, c.height);

  /* Filer utan alfa får sin vita botten nyckelad till genomskinlighet.
     Bältet lägger multiply över märkena, vilket i teorin räcker för att
     vitt ska försvinna. I praktiken har en jpg ringningar kring
     bokstäverna som inte är riktigt vita, och de syns som en ljus platta
     mot sidans gräddvita botten. */
  if (!harAlfa) {
    const bild2 = ctx.getImageData(0, 0, c.width, c.height);
    const q = bild2.data;
    for (let i = 0; i < q.length; i += 4) {
      const ljusast = Math.max(q[i], q[i + 1], q[i + 2]);
      const morkast = Math.min(q[i], q[i + 1], q[i + 2]);
      // Nära vitt och nära grått: full genomskinlighet med mjuk kant.
      if (morkast > 236 && ljusast - morkast < 14) {
        q[i + 3] = Math.round(q[i + 3] * Math.max(0, (248 - morkast) / 12));
      }
    }
    ctx.putImageData(bild2, 0, 0);
  }

  document.getElementById("ut").textContent =
    c.width + "x" + c.height + "|" + (harAlfa ? "alfa" : "vit") + "|" +
    c.toDataURL("image/webp", ${KVALITET});
};
bild.src = ${JSON.stringify("file://" + path.resolve(källa))};
</script></body>`,
);

const dom = execFileSync(
  CHROME,
  [
    "--headless",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--virtual-time-budget=20000",
    "--dump-dom",
    `file://${html}`,
  ],
  { encoding: "utf8", maxBuffer: 200 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
);

const träff = dom.match(/id="ut">(\d+)x(\d+)\|(alfa|vit)\|data:image\/webp;base64,([^<]+)</);
if (!träff) {
  fs.rmSync(tmp, { recursive: true, force: true });
  console.error("Chrome gav ingen webp. Är källfilen en giltig bild?");
  process.exit(1);
}

const [, bredd, höjd, botten, base64] = träff;
fs.mkdirSync(UT, { recursive: true });
const mål = path.join(UT, `${slug}.webp`);
fs.writeFileSync(mål, Buffer.from(base64, "base64"));
fs.rmSync(tmp, { recursive: true, force: true });

/* Visningshöjd efter proportion, så att en bred ordbild och ett kvadratiskt
   emblem tar ungefär lika stor optisk plats i bältet. */
const r = Number(bredd) / Number(höjd);
const visasHöjd = r > 5 ? 22 : r > 3.2 ? 28 : r > 2 ? 34 : r > 1.2 ? 44 : 54;

const efter = fs.statSync(mål).size;
console.log(
  `{ src: "/assets/kunder/${slug}.webp", alt: "", width: ${bredd}, height: ${höjd}, visasHöjd: ${visasHöjd} },` +
    `  // ${Math.round(efter / 1024)} kB, ${botten}`,
);
