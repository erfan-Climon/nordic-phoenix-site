import Link from "next/link";
import { HeroBackgroundVideo } from "@/components/home/HeroBackgroundVideo";
import type { Dictionary } from "@/content/locales/sv";
import { video, whatsappUrl } from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";

export function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const home = localePath(locale, "/");
  const servicesHref = `${home}#tjanster`;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Posterbilden ligger alltid kvar. Den är hela bakgrunden på mobil och
          vid reducerad rörelse, och det som syns innan videon börjar spela. */}
      {/* På mobil beskärs bilden hårt på bredden. Centrerat hamnar den ljusa
          skjortan bakom texten, så utsnittet flyttas åt vänster till glasväggen
          skjutet något åt vänster så att både ansiktet och händerna kommer med.
          På bred skärm ligger utsnittet kvar centrerat, annars hoppar bilden
          när videon tar över. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[position:48%_center] md:bg-center"
        style={{ backgroundImage: `url(${video.heroPoster})` }}
      />

      <HeroBackgroundVideo />

      {/* Ett enda jämnt filter över hela videon. Inga gradienter, ingen
          kudde bakom texten: sådana lager gör bilden ljusare på vissa ställen
          och mörkare på andra, vilket syns.

          Priset är att styrkan blir en avvägning. Uppmätt mot videons ljusaste
          rutor krävs 0,88 för att varje element ska nå WCAG med ett jämnt
          filter, och då är videon i praktiken borta. 0,50 är vald som
          mellanläge: bilden syns, och texten bärs av sin egen skugga.
          Kvarvarande värden står i README. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(0,0,0,.5)]" />

      {/* Andande orange glöd uppe till höger */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-25%] right-[-18%] h-[62vw] w-[62vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,148,36,.15), rgba(255,148,36,.05) 45%, transparent 68%)",
          animation: "np-breathe 9s ease-in-out infinite",
        }}
      />

      {/* Texten hålls i vänsterhalvan. Personen i videon sitter till höger,
          och den ytan lämnas medvetet fri. */}
      <div
        data-parallax="0.14"
        /* Texten skjuts in från vänsterkanten på bred skärm. Insteget är
           satt så att Se våra tjänster hamnar mitt på tangentbordet i bild,
           som ligger på 30 till 49 procent vid 1512px. På mobil ligger texten
           kvar mot kanten, där finns ingen plats att ge bort. */
        className="relative z-[2] flex w-full px-[var(--pad-x)] pt-[clamp(140px,18vh,220px)] md:pl-[clamp(64px,17vw,330px)]"
      >
        <div className="min-w-0 max-w-[min(640px,58%)] max-md:max-w-full">
          <h1 /* Skuggan gör texten läsbar utan att bilden behöver mörkas. */
            className="m-0 flex flex-col font-heading text-[length:var(--fs-hero)] leading-[0.98] tracking-[-.025em] text-on-dark [text-shadow:0_1px_2px_rgba(0,0,0,.9),0_2px_8px_rgba(0,0,0,.75),0_8px_36px_rgba(0,0,0,.6)]">
            <span style={{ animation: "np-rise 1.1s .05s var(--ease) both" }}>
              {t.hero.w1}
            </span>
            <span
              /* on-dark-muted är satt för mörka sektioner och blir för svag
                 mot en ljus video. Den här tonen läser fortfarande som dämpad
                 bredvid raden ovanför, men klarar kontrasten. */
              className="text-[#cbc4b9]"
              style={{ animation: "np-rise 1.1s .18s var(--ease) both" }}
            >
              {t.hero.w2}
            </span>
            <span
              /* Solid orange, inte klippt gradient. Knappen syns mot videon
                 för att den är en fylld platta: orangen är bakgrunden och
                 täcker bilden. Ett ord är bara tunna streck med video emellan,
                 och behöver därför samma skugga som raderna ovanför för att
                 stå emot. Skuggan kräver i sin tur solid färg, eftersom
                 text-shadow fyller bokstaven i stället för att rama in den när
                 background-clip: text används.

                 #ff9424 är knappens ljusa ände, alltså samma orange. */
              className="text-[#ff9424] italic [text-shadow:0_1px_2px_rgba(0,0,0,.9),0_2px_8px_rgba(0,0,0,.75),0_8px_36px_rgba(0,0,0,.6)]"
              style={{ animation: "np-rise 1.1s .31s var(--ease) both" }}
            >
              {t.hero.w3}
            </span>
          </h1>

          <div className="my-[clamp(32px,4vw,56px)] mb-[clamp(40px,5vw,72px)] flex flex-col gap-7">
            <p
              className="m-0 max-w-[46ch] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-on-dark [text-shadow:0_1px_2px_rgba(0,0,0,.9),0_2px_8px_rgba(0,0,0,.75),0_8px_36px_rgba(0,0,0,.6)]"
              style={{ animation: "np-rise 1.1s .5s var(--ease) both" }}
            >
              {t.hero.sub}
            </p>
            <div
              className="flex flex-wrap gap-[14px]"
              style={{ animation: "np-rise 1.1s .62s var(--ease) both" }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener"
                className="np-btn np-btn-primary px-9 py-[18px] text-[15px]"
              >
                {t.hero.cta1}
              </a>
              <Link
                href={servicesHref}
                /* Ljus variant av outline-knappen. Utilities vinner över
                   @layer components, så basklassen behålls för geometrin. */
                className="np-btn np-btn-outline border-[rgba(242,236,224,.5)] bg-[rgba(11,10,9,.42)] px-[30px] py-[17px] text-[15px] text-on-dark backdrop-blur-[6px] hover:border-accent-light hover:bg-[rgba(240,103,0,.3)] hover:text-on-dark"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Etiketten satt tidigare på mediarutan. Rutan är borta i och med att
          videon flyttat till bakgrunden, så etiketten ligger nu nere till
          höger, på den lugna ytan under personen i bild. */}
      <div
        /* Extra luft till höger så etiketten inte hamnar under
           chattwidgeten, som ligger fast i nedre högra hörnet. */
        /* Chattwidgeten sitter fast nere till höger och till-toppen-knappen
           nere till vänster. På bred skärm räcker det att hålla undan från
           höger, på mobil är båda hörnen upptagna och etiketten lyfts i
           stället över dem. */
        className="pointer-events-none relative z-[2] flex justify-end px-[var(--pad-x)] pr-[clamp(84px,8vw,130px)] pb-[clamp(28px,4vh,56px)] max-md:justify-start max-md:pr-[var(--pad-x)] max-md:pb-[104px]"
        style={{ animation: "np-fade 1.4s 1.1s ease both" }}
      >
        <div className="flex items-center gap-2 rounded-button bg-[rgba(11,10,9,.55)] px-4 py-2 backdrop-blur-[8px]">
          <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          <span className="font-mono text-[10px] font-medium tracking-[.18em] text-on-dark uppercase">
            {t.hero.badge}
          </span>
        </div>
      </div>
    </section>
  );
}
