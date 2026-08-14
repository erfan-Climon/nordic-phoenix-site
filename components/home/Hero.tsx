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
          och skärmen, som är mörkare. 38 procent är det högsta värde som
          klarar kontrastkraven, alltså så mycket av bilden som går att
          behålla. På bred skärm ligger utsnittet kvar centrerat,
          annars hoppar bilden när videon tar över. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[position:38%_center] md:bg-center"
        style={{ backgroundImage: `url(${video.heroPoster})` }}
      />

      <HeroBackgroundVideo />

      {/* Slöjorna. Tre lager i stället för ett brett svep, så att bilden
          får vara ljusare där den syns och mörkare bara där text ligger.

          Grundslöjan är svag och gäller hela ytan. Bandet under navraden
          täcker de översta 130 pixlarna. Spaltslöjan på bred skärm mörkar
          textkolumnen och tonar ut vid 66 procent, alltså långt innan
          personen i bild. På mobil går texten i full bredd och bilden
          beskärs till mitten, så där mörkas nederkanten i stället.

          Värdena är framsvepta mot videon, inte valda på känsla: mätningen
          tar bakgrunden under textens verkliga rader över hela loopen och
          kräver 4,5:1 för brödtext och 3:1 för displayraderna på den 95:e
          percentilen. Byts videon ut måste svepet göras om. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.2),rgba(0,0,0,.05))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.62),transparent_145px)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,.9),rgba(0,0,0,.9)_42%,transparent_66%)] md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,.64)_36%,rgba(0,0,0,.8)_100%)] md:hidden"
      />

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

      <div
        /* on-dark-muted ger 4,1:1 mot videon, under 4,5 för text i den här
           storleken. Full on-dark mätt till 10,4:1. */
        className="np-meta absolute inset-x-0 top-[92px] z-[2] px-[var(--pad-x)] text-on-dark"
        style={{ animation: "np-fade 1.4s .9s ease both" }}
      >
        <span>{t.hero.meta1}</span>
      </div>

      {/* Texten hålls i vänsterhalvan. Personen i videon sitter till höger,
          och den ytan lämnas medvetet fri. */}
      <div
        data-parallax="0.14"
        /* Texten skjuts in från vänsterkanten på bred skärm. Personen i
           videon sitter till höger, så ytan räcker ändå. På mobil ligger den
           kvar mot kanten, där finns ingen plats att ge bort. */
        className="relative z-[2] flex w-full px-[var(--pad-x)] pt-[clamp(140px,18vh,220px)] md:pl-[clamp(48px,7vw,150px)]"
      >
        <div className="min-w-0 max-w-[min(640px,58%)] max-md:max-w-full">
          <h1 className="m-0 flex flex-col font-heading text-[length:var(--fs-hero)] leading-[0.98] tracking-[-.025em] text-on-dark">
            <span style={{ animation: "np-rise 1.1s .05s var(--ease) both" }}>
              {t.hero.w1}
            </span>
            <span
              className="text-on-dark-muted"
              style={{ animation: "np-rise 1.1s .18s var(--ease) both" }}
            >
              {t.hero.w2}
            </span>
            <span
              className="np-gradient-text italic"
              style={{ animation: "np-rise 1.1s .31s var(--ease) both" }}
            >
              {t.hero.w3}
            </span>
          </h1>

          <div className="my-[clamp(32px,4vw,56px)] mb-[clamp(40px,5vw,72px)] flex flex-col gap-7">
            <p
              className="m-0 max-w-[46ch] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-on-dark"
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
                className="np-btn np-btn-outline border-[rgba(242,236,224,.45)] px-[30px] py-[17px] text-[15px] text-on-dark hover:border-accent-light hover:bg-[rgba(240,103,0,.18)] hover:text-on-dark"
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
