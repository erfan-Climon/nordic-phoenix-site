/**
 * Lägger in en bloggbild: komprimerar till webp och skriver den på rätt plats.
 *
 *   node scripts/blog-images.mjs <källfil> <slug> [sv|fa]
 *
 * Bilderna kommer från bildgeneratorn som PNG på flera megabyte. Sajten
 * byggs med `output: export`, så Next optimerar inga bilder vid körning:
 * det som läggs i public serveras rakt av. Komprimeringen måste därför göras
 * här. Se docs/bildprompter-blogg.md för hur bilderna tas fram.
 *
 * Konverteringen görs av headless Chrome via canvas. Varken sips, Pillow
 * eller ImageMagick finns på maskinen, och Chrome kodar webp bra.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UT = path.join(ROT, "public/assets/blogg");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** Bilden visas som mest 900 px bred, så 1536 räcker även på retinaskärm. */
const MAXBREDD = 1536;
const KVALITET = 0.82;

const [källa, slug, locale = "sv"] = process.argv.slice(2);
if (!källa || !slug) {
  console.error("Användning: node scripts/blog-images.mjs <källfil> <slug> [sv|fa]");
  process.exit(1);
}
if (!fs.existsSync(källa)) {
  console.error(`Hittar inte ${källa}`);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(ROT, ".bildjobb-"));
const html = path.join(tmp, "konvertera.html");

fs.writeFileSync(
  html,
  `<!doctype html><meta charset="utf-8"><body><div id="ut"></div><script>
const bild = new Image();
bild.onload = () => {
  const skala = Math.min(1, ${MAXBREDD} / bild.naturalWidth);
  const c = document.createElement("canvas");
  c.width = Math.round(bild.naturalWidth * skala);
  c.height = Math.round(bild.naturalHeight * skala);
  const ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bild, 0, 0, c.width, c.height);
  document.getElementById("ut").textContent = c.toDataURL("image/webp", ${KVALITET});
};
bild.src = ${JSON.stringify("file://" + path.resolve(källa))};
</script></body>`,
);

/* --allow-file-access-from-files krävs: utan den räknar Chrome canvasen som
   kontaminerad av en bild från ett annat ursprung, och toDataURL kastar.
   Resultatet läses ur ett element, inte ur <title>, eftersom data-URL:en är
   ett par hundra kilobyte lång. */
const dom = execFileSync(
  CHROME,
  [
    "--headless",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--virtual-time-budget=8000",
    "--dump-dom",
    `file://${html}`,
  ],
  { encoding: "utf8", maxBuffer: 200 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] },
);

const träff = dom.match(/id="ut">data:image\/webp;base64,([^<]+)</);
if (!träff) {
  fs.rmSync(tmp, { recursive: true, force: true });
  console.error("Chrome gav ingen webp. Är källfilen en giltig bild?");
  process.exit(1);
}

fs.mkdirSync(UT, { recursive: true });
const mål = path.join(UT, `${slug}-${locale}.webp`);
fs.writeFileSync(mål, Buffer.from(träff[1], "base64"));
fs.rmSync(tmp, { recursive: true, force: true });

const före = fs.statSync(källa).size;
const efter = fs.statSync(mål).size;
console.log(
  `${path.relative(ROT, mål)}  ${(före / 1e6).toFixed(1)} MB -> ` +
    `${Math.round(efter / 1024)} kB  (${Math.round((1 - efter / före) * 100)} % mindre)`,
);
console.log(`\nKoppla den genom att sätta image i content/blog.ts:`);
console.log(`  image: "/assets/blogg/${slug}-${locale}.webp",`);
