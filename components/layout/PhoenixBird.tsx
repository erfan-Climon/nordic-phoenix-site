import Image from "next/image";

const LAYERS = [
  { src: "/assets/phx-wing-l.webp", origin: "43% 58%", animation: "np-wing-l 3.6s ease-in-out infinite" },
  { src: "/assets/phx-wing-r.webp", origin: "57% 58%", animation: "np-wing-r 3.6s ease-in-out infinite" },
  { src: "/assets/phx-tail.webp", origin: "50% 68%", animation: "np-tail-sway 3.6s ease-in-out infinite .35s" },
  { src: "/assets/phx-body.webp", origin: "50% 50%", animation: undefined },
];

/**
 * Fenixen. Fyra separata bildlager animeras var för sig, de får inte slås ihop
 * till en bild. Helt dekorativ: aria-hidden och pointer-events: none.
 *
 * Ligger absolut placerad inuti processektionen, inte fixed mot viewporten.
 * Kunden vill ha den bara där, och att den följer med sidan när man scrollar
 * i stället för att sväva över allt innehåll. Sektionen som renderar den
 * måste därför vara position: relative.
 */
export function PhoenixBird() {
  return (
    <div
      aria-hidden="true"
      /* Logisk inset, inte `right`: i RTL börjar rubrikerna vid höger kant och
         fågeln skulle annars hamna mitt i texten.
         Dold under nav-brytpunkten: i enkolumnsläget lägger den sig mitt i
         stegens brödtext, vilket den aldrig gör i tvåkolumnslayouten. */
      className="pointer-events-none absolute top-1/2 end-[clamp(14px,3vw,44px)] z-[5] hidden w-[clamp(52px,6.5vw,100px)] [filter:drop-shadow(0_0_18px_rgba(255,148,36,.35))] nav:block"
      style={{ marginTop: "calc(clamp(52px, 6.5vw, 100px) / -2)" }}
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: "431 / 338",
          animation: "np-bob 3.6s ease-in-out infinite",
        }}
      >
        {LAYERS.map((layer) => (
          <Image
            key={layer.src}
            src={layer.src}
            alt=""
            fill
            sizes="100px"
            className="object-contain"
            style={{ transformOrigin: layer.origin, animation: layer.animation }}
          />
        ))}
      </div>
    </div>
  );
}
