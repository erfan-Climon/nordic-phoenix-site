import Image from "next/image";
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
      /* Bottenförankrad på mobil, där texten ligger över bilden som förut.
         På bred skärm centreras den i stället: texten ska rymmas på den
         mörka kilen, och kilen är bredast upptill. Lägst ner är den bara
         tjugo procent, och dit når ingen text längre. */
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink md:justify-center"
    >
      {/* Bilden täcker inte hela sektionen på bred skärm utan drygt sjuttio
          procent, med en sned kant mot sektionens mörka botten. Kanten går
          från fyrtio procent uppe till tjugo nere, alltså lutad åt vänster
          nedtill: rubriken får en ren mörk yta att börja på, och bilden
          öppnar sig ner mot knappraden.

          Beskärningen ligger på behållaren och inte på videon, så att
          posterbilden, videon och slöjan klipps likadant. Utan den
          gemensamma behållaren hade de tre lagren behövt varsin clip-path
          och glidit isär vid omritning.

          Bara från 768 och uppåt. På mobil finns ingen bredd att ge bort,
          där fyller bilden hela sektionen som förut. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 md:[clip-path:polygon(40%_0,100%_0,100%_100%,20%_100%)]"
      >
        {/* Posterbilden ligger alltid kvar. Den är hela bakgrunden på mobil och
            vid reducerad rörelse, och det som syns innan videon börjar spela. */}
        {/* På mobil beskärs bilden hårt på bredden. Centrerat hamnar den ljusa
            skjortan bakom texten, så utsnittet flyttas åt vänster till glasväggen
            skjutet något åt vänster så att både ansiktet och händerna kommer med.
            På bred skärm ligger utsnittet kvar centrerat, annars hoppar bilden
            när videon tar över. */}
        <div
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
        <div className="absolute inset-0 bg-[rgba(0,0,0,.35)]" />
      </div>


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

      {/* Hero-texten fejdar in med förskjutning mellan raderna. Tiderna är
          nedkortade från 1,1s med upp till 0,62s fördröjning till 0,5s med
          0,33s: animationen döljer texten tills den körts, och den är sidans
          LCP-element. Uppmätt skillnad på mobil var 6,3 sekunder. Rörelsen är
          densamma, den går bara snabbare.

          Texten hålls i vänsterhalvan. Personen i videon sitter till höger,
          och den ytan lämnas medvetet fri. */}
      <div
        data-parallax="0.14"
        /* Texten skjuts in från vänsterkanten på bred skärm. Insteget är
           satt så att knapparna hamnar mitt på tangentbordet i bild, som
           ligger på 30 till 49 procent. På mobil ligger texten kvar mot
           kanten, där finns ingen plats att ge bort.

           rtl:justify-end håller persiskan i samma vänsterhalva. I högerläst
           text går flödet från höger, så blocket hamnar annars vid
           högerkanten, ovanpå personen i bild i stället för på tangentbordet.
           Uppmätt låg det på 64 till 96 procent före ändringen. Insteget är
           detsamma på båda språken: det mäts från vänsterkanten oavsett
           riktning. */
        /* Ingen rtl-spegling här. Hero-texten ska ligga på samma ställe
           oavsett språk, för den mörka kilen ligger till vänster i bild på
           alla språk. Kolumnen fästs därför med fysiska marginaler längre
           ner, inte med logiska: `mr-auto` håller den vid vänsterkanten
           både i vänsterläst och högerläst text. Själva texten följer
           fortfarande skrivriktningen och radas upp från höger inuti sin
           egen kolumn, vilket är det persiskan behöver. */
        className="relative z-[2] flex w-full px-[var(--pad-x)] pt-[clamp(140px,18vh,220px)] md:pt-0"
      >
        {/* Extra insteg i vänsterläst text. Insteget från vänsterkanten är
            detsamma på alla språk, men texten fyller ytan åt olika håll:
            högerläst text slutar vid blockets högerkant, vänsterläst
            börjar vid dess vänsterkant. WhatsApp-knappen hamnade därför
            en bit till vänster om handen i bild även efter att raden
            vänts. Insteget skjuter in den över tangentbordet.
            Bara från 1024 och uppåt, av samma skäl som vändningen. */}
        {/* Blocket är bredare från 1024 så att den större WhatsApp-knappen
            och tjänsteknappen ryms på samma rad. Ingressen har sin egen
            radlängdsgräns och rubriken bryter på egna rader, så det är i
            praktiken bara knappraden som får mer plats. */}
        {/* Bredden sitter på rubriken och ingressen var för sig, inte på
            blocket. Knappraden ska få sticka ut åt höger, ut på videon och
            ner på tangentbordet i bild, medan läsningen hålls kvar på den
            mörka kilen. */}
        <div className="min-w-0 max-md:w-full max-md:max-w-full md:w-full">
          <h1 /* Skuggan gör texten läsbar utan att bilden behöver mörkas. */
            /* Mindre grad från 768 än tokenens 5,8vw. Rubriken ska rymmas på
               den mörka kilen, och "Kontroll." mätte 390 px mot kilens dryga
               330 px användbara vid textens nedre kant. Mobilen rör vi inte:
               där ligger texten kvar över hela bilden. */
            className="m-0 flex flex-col font-heading text-[length:var(--fs-hero)] leading-[0.98] tracking-[-.025em] text-on-dark md:mr-auto md:max-w-[min(360px,21vw)] md:text-[clamp(34px,4.3vw,74px)] [text-shadow:0_1px_2px_rgba(0,0,0,.95),0_2px_6px_rgba(0,0,0,.85),0_6px_24px_rgba(0,0,0,.7)]">
            {/* Sökordsraden. Den ligger inuti H1 med flit: rubriken nedanför
                är ren varumärkestext utan ett enda sökord, och H1 är sidans
                starkaste rubriksignal. Graden spelar ingen roll för hur
                Google läser den, bara att den står i H1. */}
            {/* Förraden satt tidigare i en mörk ruta som bar kontrasten. Nu
                bär slöjan den i stället, och raden får vara ren typografi:
                en kort orange linje och spärrad text. Linjen ger raden en
                startpunkt utan att rita en låda runt den. */}
            <span
              className="mb-[clamp(18px,2vw,26px)] flex items-center gap-3 font-mono text-[clamp(11px,1vw,13px)] leading-[1.4] font-medium tracking-[.2em] text-on-dark uppercase [text-shadow:0_1px_3px_rgba(0,0,0,.9),0_2px_10px_rgba(0,0,0,.7)]"
              style={{ animation: "np-rise .5s var(--ease) both" }}
            >
              <span
                aria-hidden="true"
                className="h-[2px] w-8 shrink-0 rounded-full bg-accent"
              />
              {t.hero.eyebrow}
            </span>
            <span style={{ animation: "np-rise .5s .05s var(--ease) both" }}>
              {t.hero.w1}
            </span>
            <span
              /* Dämpad men inte svag. #cbc4b9 mätte 2,7 mot videons ljusaste
                 utsnitt, alltså under kravet 3,0 för stor text, och det var
                 den redan innan slöjan fanns. Den här tonen läser fortfarande
                 som en nivå under raden ovanför men klarar mätningen, och
                 lösningen ligger i färgen i stället för i ett mörkare filter
                 över videon. */
              className="text-[#e6dfd4]"
              style={{ animation: "np-rise .5s .12s var(--ease) both" }}
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
              className="text-[#ff9424] italic [text-shadow:0_1px_2px_rgba(0,0,0,.95),0_2px_6px_rgba(0,0,0,.85),0_6px_24px_rgba(0,0,0,.7)]"
              style={{ animation: "np-rise .5s .19s var(--ease) both" }}
            >
              {t.hero.w3}
            </span>
          </h1>

          {/* Bottenmarginalen lyfter knapparna så att de hamnar mitt på
              tangentbordet i bild.

              Marginalen ensam räcker inte. Hero är bottenförankrad, men
              innehållet fyller redan hela skärmhöjden, så mer luft under
              blocket förlänger bara sektionen nedåt medan knappen står still.
              Uppmätt: marginal 260px gav sektionen 1035px höjd och flyttade
              knappen tre pixlar. Toppmarginalen minskas därför lika mycket
              som bottenmarginalen växer, så att hero fortsätter rymmas inom
              100svh och lyftet faktiskt biter.

              Bara på bred skärm: på mobil är bilden beskuren så hårt att det
              inte finns något tangentbord att träffa. */}
          <div className="my-[clamp(32px,4vw,56px)] mb-[clamp(10px,1.5vw,28px)] flex flex-col gap-7">
            <p
              /* Fem rader oavsett språk på bred skärm. Ingressen är olika
                 lång på svenska, engelska och persiska, och eftersom
                 blocket flödar uppifrån hamnade knapparna på tre olika
                 höjder: uppmätt 700, 671 och 642 pixlar. Bara persiskan
                 landade då på tangentbordet i bild. Minsta höjden är den
                 längsta ingressens, så ingen text trängs ihop. */
              className="m-0 max-w-[46ch] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-on-dark md:mr-auto md:max-w-[min(360px,21vw)] [text-shadow:0_1px_2px_rgba(0,0,0,.95),0_2px_6px_rgba(0,0,0,.85),0_6px_24px_rgba(0,0,0,.7)]"
              style={{ animation: "np-rise .5s .26s var(--ease) both" }}
            >
              {t.hero.sub}
            </p>

            {/* Fågeln står centrerad i textkolumnen, under brödtexten. Den
                bär ingen information, därför aria-hidden: namnet står redan
                i sidhuvudet och i rubriken. Bara från 768, på mobil ligger
                texten över hela bilden och det finns ingen lugn yta.

                Hållaren har samma bredd och samma fysiska fästning som
                rubriken, annars hade centreringen räknats mot hela
                sektionsbredden och fågeln hamnat ute på videon. */}
            <div className="hidden md:mr-auto md:block md:w-[min(360px,21vw)]">
              <Image
                aria-hidden="true"
                src="/assets/phoenix-logo.webp"
                alt=""
                width={132}
                height={132}
                className="mx-auto h-auto w-[clamp(64px,7vw,104px)] opacity-90"
                style={{ animation: "np-fade 1.2s .5s ease both" }}
              />
            </div>
            <div
              /* WhatsApp-knappen ligger först i koden, så att den primära
                 åtgärden kommer först för skärmläsare och tangentbord.

                 I högerläst text hamnar den då längst till höger i raden,
                 alltså på tangentbordet i bild. I vänsterläst text hamnar
                 den i stället längst till vänster, ute på skrivbordet.
                 Raden vänds därför visuellt på bred skärm, så att knappen
                 landar på samma ställe oavsett språk. På mobil är bilden
                 så hårt beskuren att det inte finns något tangentbord att
                 träffa med en knapp i halva bredden.

                 Under 768 blir raden en kolumn i omvänd ordning. Knapparna
                 sträcks då till hela skärmbredden, vilket både gör dem
                 lättare att träffa med tummen och låter WhatsApp-knappen
                 täcka tangentbordet i bild i stället för att sluta mitt
                 över det. Omvänd ordning för att tjänsteknappen ska ligga
                 överst och WhatsApp-knappen närmast tummen.

                 Vändningen sker på behållaren, inte på knapparna: koden är
                 orörd, så den primära åtgärden kommer fortfarande först
                 för skärmläsare och tangentbord.

                 Vändningen börjar först vid 1024 och inte vid 768. Under
                 den bredden får de två knapparna inte plats på samma rad
                 i vänsterläst text, och en vänd rad som bryts staplar dem
                 högerställda under en vänsterställd text. Uppmätt bröts
                 raden vid 900 men inte vid 1000. */
              /* Knappraden är det enda som lämnar den mörka kilen. Den skjuts
                 ut åt höger så att den landar på tangentbordet i bild, som
                 ligger på 29 till 54 procent av bredden. Knapparna är fyllda
                 plattor och bär sin egen kontrast, till skillnad från texten,
                 så de klarar att ligga på videon.

                 På mobil staplas de i omvänd ordning, så att
                 WhatsApp-knappen hamnar närmast tummen. */
              /* ml och mr är fysiska, inte logiska. Med ms/me hade raden
                 speglats i persiskan och hamnat till vänster om kilen i
                 stället för på tangentbordet. */
              className="flex gap-[14px] max-md:flex-col-reverse md:ml-[clamp(20px,22vw,330px)] md:mr-auto md:w-max"
              style={{ animation: "np-rise .5s .33s var(--ease) both" }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener"
                className="np-btn np-btn-primary px-9 py-[18px] text-[15px] md:px-[52px] md:py-[22px] md:text-[17px]"
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
        {/* Etiketten har tappat sin platta av samma skäl som förraden: en
            ruta runt text läser som gränssnitt. Pricken och skuggan räcker,
            och etiketten ligger på videons lugnaste yta. */}
        <div className="flex items-center gap-[10px]">
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent"
          />
          <span className="font-mono text-[10px] font-medium tracking-[.18em] text-on-dark uppercase [text-shadow:0_1px_3px_rgba(0,0,0,.9),0_2px_10px_rgba(0,0,0,.7)]">
            {t.hero.badge}
          </span>
        </div>
      </div>

      {/* Scroll-signal. Hero fyller hela skärmen, och utan den här finns
          ingenting som säger att sidan fortsätter. Linjen ligger centrerad
          mot underkanten, alltså på samma plats oavsett skrivriktning, och
          animeras bara när besökaren inte bett om mindre rörelse. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex justify-center pb-[clamp(14px,2vh,26px)]"
        style={{ animation: "np-fade 1.4s 1.6s ease both" }}
      >
        <span className="np-scroll-hint block h-[46px] w-px bg-[linear-gradient(to_bottom,transparent,rgba(242,236,224,.75))]" />
      </div>
    </section>
  );
}
