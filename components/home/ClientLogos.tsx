import Image from "next/image";
import type { Dictionary } from "@/content/locales/sv";

type Bildmarke = {
  typ: "bild";
  src: string;
  alt: string;
  /** Filens verkliga pixelmått, inte den storlek den visas i. */
  width: number;
  height: number;
  /**
   * Undantag från den gemensamma rutan, som andel av den.
   *
   * Rutan ger alla märken lika stor plats, men inte lika stor tyngd.
   * Ett märke som är feta versaler kant i kant fyller sin ruta helt och
   * väger mer än ett med tunna streck och luft i sig. Här kan ett sådant
   * dras ner, och ett tunt märke få gå över kanten. Utelämnas fältet
   * gäller hela rutan.
   *
   * Skalningen ändrar inte layoutrutan, bara det som ritas i den, så ett
   * värde över ett växer in i mellanrummet utan att flytta grannarna.
   * Mellanrummet är 48 till 92 pixlar, vilket tål några få pixlars
   * översteg åt varje håll.
   */
  andel?: number;
};

type Ordmarke = {
  typ: "ord";
  text: string;
  className: string;
};

type Marke = Bildmarke | Ordmarke;

/**
 * Typografi för kunder utan egen logotypfil. Fyra behandlingar som växlar,
 * så att raden av namn läser som logotyper och inte som en lista.
 */
const ORDSTIL = [
  "font-sans text-[18px] font-bold tracking-[.08em]",
  "font-heading text-[23px] italic",
  "font-mono text-[15px] font-medium tracking-[.18em]",
  "font-sans text-[19px] font-semibold tracking-[.01em]",
];

const ord = (text: string, i: number): Ordmarke => ({
  typ: "ord",
  text,
  className: ORDSTIL[i % ORDSTIL.length],
});

/**
 * Två bälten som går åt var sitt håll.
 *
 * Bild och namn blandas i båda. Ett bälte med bara logotyper och ett med
 * bara namn hade lästs som två olika saker: det ena kunder, det andra en
 * nyhetsremsa.
 */
const BALTE_ETT: Marke[] = [
  { typ: "bild", src: "/assets/client-climon.webp", alt: "Climon", width: 794, height: 195, andel: 0.78 },
  ord("Anoosha market AB", 0),
  { typ: "bild", src: "/assets/kunder/anar.webp", alt: "Anar Restaurang & Bar", width: 344, height: 260, andel: 1.16 },
  ord("Danoma AB", 1),
  { typ: "bild", src: "/assets/kunder/avfallshjalp.webp", alt: "Avfallshjälp", width: 460, height: 102 },
  ord("DHS Bygg & Måleri AB", 2),
  { typ: "bild", src: "/assets/kunder/clc-barbershop.webp", alt: "CLC Barbershop AB", width: 287, height: 260 },
  ord("Ella pita gyros AB", 3),
  { typ: "bild", src: "/assets/kunder/espad-gold.webp", alt: "Espad Gold AB", width: 460, height: 63 },
  ord("ELMA mat AB", 0),
  { typ: "bild", src: "/assets/kunder/foh-medicin-fotvard.webp", alt: "FOH Medicin Fotvård", width: 460, height: 230 },
  ord("Glans Detailing AB", 1),
  { typ: "bild", src: "/assets/kunder/goambient.webp", alt: "GoAmbient AB", width: 460, height: 86 },
  ord("Gothia kylteknik AB", 2),
];

const BALTE_TVA: Marke[] = [
  { typ: "bild", src: "/assets/kunder/heracademy.webp", alt: "HerAcademy AB", width: 345, height: 260 },
  ord("Leo Taxi AB", 3),
  { typ: "bild", src: "/assets/kunder/pbl.webp", alt: "PBL", width: 460, height: 195, andel: 0.82 },
  ord("LumiCab AB", 0),
  { typ: "bild", src: "/assets/kunder/smart-notes.webp", alt: "Smart Notes", width: 376, height: 260 },
  ord("Motor 360 AB", 1),
  { typ: "bild", src: "/assets/kunder/vallentuna-grossen.webp", alt: "Vallentuna Grossen", width: 460, height: 243 },
  ord("Optimal Bilglas i Stockholm AB", 2),
  { typ: "bild", src: "/assets/kunder/ari-skincare.webp", alt: "ARI Skincare", width: 458, height: 260 },
  ord("Precept Sweden AB", 3),
  { typ: "bild", src: "/assets/client-tehr.webp", alt: "Tehr Tattoo", width: 360, height: 364 },
  ord("Shik Möbler AB", 0),
  ord("Svea Kompetens AB", 1),
];

/* Gråskala håller ihop tretton logotyper som annars drar åt var sitt håll,
   från guld och hetrosa till klarblått. Multiply låter vit botten i
   filerna försvinna mot sidans bakgrund.

   Ljusa märken tappade för mycket i gråskala: guldet i ARI och den tunna
   antikvan i Vallentuna Grossen blev knappt synliga vid 80 procents
   opacitet. Något högre opacitet och en nedtoning av ljusheten håller kvar
   dem utan att de mörka märkena blir tunga. */
const MARK_STYLE =
  "flex-none opacity-90 mix-blend-multiply [filter:grayscale(1)_contrast(1.12)_brightness(.9)]";

/**
 * Samma ruta åt varje logotyp, med object-contain inuti.
 *
 * Höjd per logotyp gav ojämn bredd: ett kvadratiskt emblem och en åtta
 * gånger bredare ordbild kan inte båda vara 50 px höga utan att den ena
 * blir tre gånger så bred som den andra. Med en gemensam ruta tar alla
 * exakt lika stor plats. Breda märken möter bredden och blir lägre, höga
 * möter höjden och blir smalare, vilket är hur en logotypvägg brukar se ut.
 */
const RUTA = "h-[clamp(40px,4.4vw,54px)] w-[clamp(116px,13vw,164px)] object-contain";

function Balte({
  marken,
  bakat,
  sekunder,
}: {
  marken: Marke[];
  /** Åt vilket håll bältet går. Det andra bältet går motsatt väg. */
  bakat?: boolean;
  sekunder: number;
}) {
  // Listan dubbleras så att translateX(-50%) loopar sömlöst.
  const rad = (kopia: boolean) => (
    <>
      {marken.map((m) =>
        m.typ === "bild" ? (
          <Image
            key={`${m.src}-${kopia}`}
            src={m.src}
            alt={kopia ? "" : m.alt}
            aria-hidden={kopia || undefined}
            width={m.width}
            height={m.height}
            /* Lat inladdning passar inte ett bälte. Märkena rör sig in i
               vyn i stället för att stå still, och uppmätt på mobil hade
               4 av 26 hunnit laddas när sektionen kom fram: resten hade
               dykt upp som luckor som fylls i efterhand. Låg prioritet i
               stället, så att de tretton filerna på 236 kB tillsammans
               inte konkurrerar med heron. */
            loading="eager"
            fetchPriority="low"
            /* Båda måtten anges i CSS. Sätts bara det ena varnar next/image,
               eftersom proportionen då kan glida isär från attributen. */
            className={`${MARK_STYLE} ${RUTA} block`}
            style={m.andel ? { scale: String(m.andel) } : undefined}
          />
        ) : (
          <span
            key={`${m.text}-${kopia}`}
            aria-hidden={kopia || undefined}
            className={`${m.className} ${MARK_STYLE} whitespace-nowrap text-text-belt`}
          >
            {m.text}
          </span>
        ),
      )}
    </>
  );

  return (
    <div
      /* Lodrät luft i fönstret. Klippningen är till för att dölja bältet i
         sidled, men overflow går inte att begränsa till en axel: sätts den
         till hidden gäller den båda. Ett märke som skalats över rutan blev
         därför kapat upptill och nedtill, uppmätt fyra pixlar på Anar.
         Vaddering ger klippkanten den marginal som behövs. */
      className="overflow-hidden py-[9px]"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        data-marquee
        className={`flex w-max items-center gap-[clamp(48px,6vw,92px)] ${
          bakat ? "np-belt-rev" : "np-belt"
        }`}
        /* Riktningen sätts av klassen, som byter tecken i högerläst text.
           Här står bara takten. */
        style={{
          animationDuration: `${sekunder}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {rad(false)}
        {rad(true)}
      </div>
    </div>
  );
}

export function ClientLogos({ t }: { t: Dictionary }) {
  return (
    <section className="overflow-hidden bg-page pt-[clamp(48px,6vw,80px)] pb-[clamp(64px,8vw,110px)]">
      <p
        data-reveal
        className="np-label mx-[var(--pad-x)] mb-[clamp(36px,4vw,56px)] text-center tracking-[.2em] text-accent-ink"
      >
        {t.clients.title}
      </p>
      {/* Olika varaktighet på bältena, inte bara olika riktning. Med samma
          tid möts samma två märken på samma ställe varje varv, och rörelsen
          läser som en enda mekanism i stället för två. */}
      <div className="flex flex-col gap-[clamp(10px,1.8vw,28px)]">
        <Balte marken={BALTE_ETT} sekunder={54} />
        <Balte marken={BALTE_TVA} sekunder={68} bakat />
      </div>
    </section>
  );
}
