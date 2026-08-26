/**
 * Bygger sajtens ikonuppsättning ur `public/icon.png`.
 *
 * Två problem åtgärdas här.
 *
 * Källbilden har 43 procent tom marginal runt fågeln. I en flik eller i
 * Googles träfflista ritas ikonen i 16 bildpunkter, och då blir motivet runt
 * nio punkter brett medan resten är svart yta. Skriptet beskär marginalen och
 * sätter tillbaka en jämn liten luft, så att fågeln får den plats som finns.
 *
 * Sajten saknade dessutom `/favicon.ico` helt, den svarade 404. Google läser i
 * första hand `<link rel="icon">`, men både webbläsare och en del robotar
 * faller tillbaka på just den filen, och den kostar ingenting att ha.
 *
 * Körs med `node scripts/ikoner.mjs`. Källbilden lämnas orörd.
 */

import fs from "node:fs";
import sharp from "sharp";

const KÄLLA = "public/icon.png";
const UT = "public";

/** Andel av rutan som motivet ska uppta. Resten blir jämn luft runt om. */
const MOTIVANDEL = 0.78;

/* Bakgrunden tas från källbildens hörnpixel i stället för att hårdkodas, så
   att ikonen följer med om logotypen någon gång byter botten. */
const { data: hörn } = await sharp(KÄLLA)
  .extract({ left: 0, top: 0, width: 1, height: 1 })
  .raw()
  .toBuffer({ resolveWithObject: true });
const BOTTEN = { r: hörn[0], g: hörn[1], b: hörn[2], alpha: 1 };

/** Motivet utan marginal. */
const motiv = await sharp(KÄLLA).trim({ threshold: 12 }).toBuffer();

async function ruta(storlek) {
  const inre = Math.round(storlek * MOTIVANDEL);
  const skalat = await sharp(motiv)
    .resize(inre, inre, { fit: "contain", background: { ...BOTTEN, alpha: 0 } })
    .toBuffer();
  return sharp({
    create: {
      width: storlek,
      height: storlek,
      channels: 4,
      background: BOTTEN,
    },
  })
    .composite([{ input: skalat, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Packar färdiga PNG:er i en ICO-behållare.
 *
 * ICO tillåter att varje bild lagras som en hel PNG, vilket alla webbläsare
 * som är aktuella i dag läser. Alternativet är den gamla DIB-formen med egen
 * masktabell, och den behövs inte längre.
 */
function ico(bilder) {
  const HUVUD = 6;
  const POST = 16;
  const huvud = Buffer.alloc(HUVUD);
  huvud.writeUInt16LE(0, 0); // reserverat
  huvud.writeUInt16LE(1, 2); // 1 = ikon
  huvud.writeUInt16LE(bilder.length, 4);

  let offset = HUVUD + POST * bilder.length;
  const poster = bilder.map(({ storlek, data }) => {
    const p = Buffer.alloc(POST);
    p.writeUInt8(storlek >= 256 ? 0 : storlek, 0); // 0 betyder 256
    p.writeUInt8(storlek >= 256 ? 0 : storlek, 1);
    p.writeUInt8(0, 2); // antal färger i paletten, 0 = ingen palett
    p.writeUInt8(0, 3); // reserverat
    p.writeUInt16LE(1, 4); // färgplan
    p.writeUInt16LE(32, 6); // bitar per bildpunkt
    p.writeUInt32LE(data.length, 8);
    p.writeUInt32LE(offset, 12);
    offset += data.length;
    return p;
  });

  return Buffer.concat([huvud, ...poster, ...bilder.map((b) => b.data)]);
}

/* Google anger att den länkade ikonen bör vara kvadratisk med en sida som är
   en multipel av 48. Källbildens 512 är det inte, så de länkade storlekarna
   är 96 och 192. */
const LÄNKADE = [96, 192];
for (const storlek of LÄNKADE) {
  const buf = await ruta(storlek);
  fs.writeFileSync(`${UT}/icon-${storlek}.png`, buf);
  console.log(`icon-${storlek}.png  ${Math.round(buf.length / 1024)} kB`);
}

/* Apple vill ha 180 och ritar ingen egen bakgrund, därav den opaka botten. */
const apple = await ruta(180);
fs.writeFileSync(`${UT}/apple-icon.png`, apple);
console.log(`apple-icon.png  ${Math.round(apple.length / 1024)} kB`);

const ikoner = [];
for (const storlek of [16, 32, 48]) {
  ikoner.push({ storlek, data: await ruta(storlek) });
}
const behållare = ico(ikoner);
fs.writeFileSync(`${UT}/favicon.ico`, behållare);
console.log(`favicon.ico  ${Math.round(behållare.length / 1024)} kB  (16, 32, 48)`);
