"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageMenu } from "@/components/layout/LanguageMenu";
import { showsPricing } from "@/lib/pricing-visible";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/locales/sv";
import { phone, whatsappUrl } from "@/content/site";
import { PhoneGlyph } from "@/components/ui/icons";
import {
  type Locale,
  localePath,
  stripLocale,
} from "@/lib/i18n";

type Props = {
  locale: Locale;
  t: Dictionary;
};

export function Header({ locale, t }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // Språkväxlaren ska landa på samma sida i det andra språket.
  const { path } = stripLocale(usePathname() ?? "/");
  /**
   * Alla sidor finns inte på alla språk. Bloggen är svenskspråkig, och
   * ortssidorna finns bara på de språk de faktiskt är översatta till.
   *
   * I stället för att lista undantagen här läser växlaren sidans egna
   * hreflang-taggar, som servern redan skriver ut med exakt den
   * informationen. Finns ingen tagg för målspråket går den till startsidan.
   * Listan kan därmed aldrig hamna i otakt med vad som är översatt.
   */
  const switchPath = path;

  /**
   * Genomskinlig header gäller bara startsidan. Det är den enda sidan med
   * mörk hero. Orts-, tjänste- och bloggsidorna börjar med ljus botten, och
   * där hade ljus navigeringstext blivit osynlig.
   */
  const isHome = path === "/";

  /**
   * Följer när hero slutar täcka headern. Mäts mot sektionens verkliga höjd
   * i stället för mot 100vh, eftersom hero använder svh och mobilens
   * adressfält gör de två olika.
   */
  useEffect(() => {
    if (!isHome) return;

    const hero = document.getElementById("top");
    if (!hero) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setPastHero(window.scrollY + headerHeight >= hero.offsetHeight);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Första mätningen läggs i en rAF, inte i effektkroppen, dels för att
    // läsa layouten efter att den satt sig, dels för att inte sätta state
    // direkt i en effekt.
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome]);

  /** Öppen mobilmeny behöver ogenomskinlig botten för att gå att läsa. */
  const onHero = isHome && !pastHero && !menuOpen;

  /* Över videon får navigeringstexten egen skugga, av samma skäl som
     hero-texten: bilden ska slippa mörkas för att texten ska synas. */
  const inkClass = onHero
    ? "text-on-dark [text-shadow:0_1px_3px_rgba(0,0,0,.65),0_4px_18px_rgba(0,0,0,.45)]"
    : "text-text";
  const inkHoverClass = onHero ? "hover:text-accent-light" : "hover:text-accent-ink";

  // Lås bakgrunden och lyssna på Escape medan mobilmenyn är öppen.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const home = localePath(locale, "/");
  /**
   * Sektionslänkarna pekar på startsidan plus ankare, inte på ett ankare i
   * den sida som råkar visas. Utan sökvägen blir de verkningslösa på varje
   * undersida, eftersom sektionerna bara finns på startsidan.
   */
  const links = [
    { href: `${home}#tjanster`, label: t.nav.services },
    /* Prislänken följer sektionen. Finns inga priser på språket ska menyn
       inte heller peka dit. */
    ...(showsPricing(locale)
      ? [{ href: `${home}#priser`, label: t.nav.pricing }]
      : []),
    { href: `${home}#om`, label: t.nav.about },
    // Artiklarna finns bara på svenska, så bloggen ligger alltid på /blogg.
    { href: "/blogg", label: t.nav.blog },
  ];

  return (
    <header
      /* Låst till vänsterläst, alltså samma placering på alla språk:
         logotyp till vänster, navigering till höger.

         Speglingen var prövad och valdes bort. Rent typografiskt hör en
         speglad header till en högerläst sida, men kunden vill ha ett
         igenkännbart huvud oavsett språk, och det väger tyngre här. De
         persiska etiketterna renderas ändå högerifrån, det sköter
         bidi-algoritmen på teckennivå. */
      dir="ltr"
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[90] flex items-center justify-between gap-6 border-b px-[var(--pad-x)] py-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        onHero
          ? "border-transparent bg-transparent shadow-none"
          : "border-[var(--hairline-light)] bg-[rgba(255,254,251,.95)] shadow-[0_2px_24px_rgba(23,19,16,.06)] backdrop-blur-[16px]"
      }`}
    >
      <Link href={home} className="flex items-center gap-3 no-underline">
        <Image
          src="/assets/phoenix-logo.webp"
          alt="Nordic Phoenix"
          /* 46px bred blir 36px hög. Headern är 77px och styrs av de 44px
             höga knapparna, så logotypen kan växa hit utan att listen gör
             det. Ankarlänkarnas scroll-margin räknar med den höjden. */
          width={46}
          height={36}
          priority
          className="block h-auto w-[46px]"
        />
        {/* Noto Naskh Arabic även på svenska och engelska. På persiska tvingar
            RTL-regeln i globals.css hela dokumentet till det snittet med
            nollställd spärr, och kunden vill ha just det utseendet på
            ordmärket överallt. Därför ingen tracking här heller.

            Får inte brytas till två rader: headern måste hålla sig på ~66px,
            det är höjden ankarlänkarnas scroll-margin räknar med. */}
        <span
          className={`font-arabic text-[12px] font-medium whitespace-nowrap uppercase transition-colors duration-300 min-[360px]:text-[13px] ${inkClass}`}
        >
          {/* Etiketten före ordmärket. Uppmätt: raden kräver 465px med
              etiketten och 374px utan. Brytpunkten sätts på 500px, vilket ger
              marginal även för den engelska etiketten. Under den visas bara
              namnet, annars krockar ordmärket med telefon-, språk- och
              menyknapparna. */}
          Nordic Phoenix
          <span className="hidden min-[500px]:inline">
            {" "}
            {t.nav.brandPrefix}
          </span>
        </span>
      </Link>

      {/* --- Full nav ---------------------------------------------------- */}
      <nav className="hidden items-center gap-[clamp(14px,2.5vw,32px)] nav:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`np-mono-link ${inkClass} ${inkHoverClass}`}
          >
            {link.label}
          </Link>
        ))}
        {/* Telefonnumret är för långt för att versaliseras med .12em spärr som
            nav-länkarna — det får normal siffersättning i stället. */}
        <a
          href={phone.href}
          className={`flex items-center gap-2 font-mono text-[13px] font-medium whitespace-nowrap no-underline transition-colors duration-300 ${inkClass} ${inkHoverClass}`}
        >
          <PhoneGlyph />
          {/* Siffror är svaga tecken i bidi och byter ordning i högerläst
              text: 072-008 40 00 blir 00 40 072-008. Numret låses därför
              till vänsterläst oavsett sidans riktning. */}
          <span dir="ltr">{phone.display}</span>
        </a>
        <LanguageMenu locale={locale} path={switchPath} label={t.a11y.switchLanguage} onDark={onHero} />
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          className="np-btn rounded-button bg-[image:var(--gradient-accent)] px-5 py-[11px] font-mono text-[12px] font-medium tracking-[.1em] text-on-accent uppercase shadow-[var(--shadow-nav-button)] hover:-translate-y-px hover:text-on-accent hover:shadow-[0_8px_28px_rgba(240,103,0,.45)]"
        >
          {t.nav.cta}
        </Link>
      </nav>

      {/* --- Kompakt nav -------------------------------------------------- */}
      <div className="flex items-center gap-3 nav:hidden">
        {/* Att ringa är en primär konvertering här — knappen ska finnas kvar
            i topplisten även när resten av navigeringen fälls ihop. */}
        <a
          href={phone.href}
          aria-label={`${t.a11y.call} ${phone.display}`}
          /* Ingen ram och ingen platta, bara ikonen. Ytan hålls på 44px för
             att förbli en rimlig träffyta även utan synlig knapp. */
          /* Orange på båda bottnarna, men den ljusare tonen över hero:
             3,6:1 mot 5,2:1 uppmätt. Båda klarar gränsen för ikoner, den
             ljusare är bara lättare att se. */
          className={`flex h-11 w-11 flex-none items-center justify-center no-underline transition-colors duration-300 ${
            onHero
              ? "text-accent-light hover:text-accent-glow"
              : "text-accent hover:text-accent-light"
          }`}
        >
          <PhoneGlyph size={20} />
        </a>
        {/* Under 400px får logotyp, fullt företagsnamn och tre knappar inte
            plats. Språkknappen flyttas då ner i menyn i stället. */}
        <span className="hidden min-[368px]:block">
          <LanguageMenu locale={locale} path={switchPath} label={t.a11y.switchLanguage} onDark={onHero} />
        </span>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="np-mobile-nav"
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          className={`flex h-11 w-11 cursor-pointer items-center justify-center border-none bg-transparent transition-colors duration-300 hover:text-accent ${inkClass}`}
        >
          {/* Tre streck utan ram. Öppet läge: det mittersta tonas bort och de
              yttre roterar ihop till ett kryss. */}
          <span className="relative block h-[14px] w-[20px]">
            <span
              className="absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ease-[var(--ease)]"
              style={{
                top: menuOpen ? "6px" : "0",
                transform: menuOpen ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute top-[6px] left-0 block h-[2px] w-full bg-current transition-opacity duration-300 ease-[var(--ease)]"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ease-[var(--ease)]"
              style={{
                top: menuOpen ? "6px" : "12px",
                transform: menuOpen ? "rotate(-45deg)" : "none",
              }}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="np-mobile-nav"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-[var(--hairline-light)] bg-surface px-[var(--pad-x)] pt-4 pb-7 shadow-[var(--shadow-card-light)] nav:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="np-mono-link border-b border-[var(--hairline-light)] py-4 text-text hover:text-accent-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={phone.href}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 border-b border-[var(--hairline-light)] py-4 font-mono text-[13px] font-medium text-text no-underline transition-colors duration-300 hover:text-accent-ink"
          >
            <PhoneGlyph />
            {phone.display}
          </a>
          <span
            className="border-b border-[var(--hairline-light)] py-4 min-[368px]:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <LanguageMenu locale={locale} path={switchPath} label={t.a11y.switchLanguage} onDark={onHero} />
          </span>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener"
            onClick={() => setMenuOpen(false)}
            className="np-btn mt-4 rounded-button bg-[image:var(--gradient-accent)] px-6 py-[14px] font-mono text-[12px] font-medium tracking-[.1em] text-on-accent uppercase shadow-[var(--shadow-nav-button)] hover:text-on-accent"
          >
            {t.nav.cta}
          </Link>
        </div>
      ) : null}
    </header>
  );
}


