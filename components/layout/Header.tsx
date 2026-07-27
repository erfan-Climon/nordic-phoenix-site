"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/locales/sv";
import { whatsappUrl } from "@/content/site";
import {
  type Locale,
  localeButtonLabel,
  localePath,
  nextLocale,
  stripLocale,
} from "@/lib/i18n";

type Props = {
  locale: Locale;
  t: Dictionary;
};

export function Header({ locale, t }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Språkväxlaren ska landa på samma sida i det andra språket.
  const { path } = stripLocale(usePathname() ?? "/");

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
  const links = [
    { href: `${home === "/" ? "" : home}#tjanster`, label: t.nav.services },
    { href: `${home === "/" ? "" : home}#priser`, label: t.nav.pricing },
    { href: `${home === "/" ? "" : home}#om`, label: t.nav.about },
    // Artiklarna finns bara på svenska, så bloggen ligger alltid på /blogg.
    { href: "/blogg", label: t.nav.blog },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[90] flex items-center justify-between gap-6 border-b border-[var(--hairline-light)] bg-[rgba(255,254,251,.95)] px-[var(--pad-x)] py-4 shadow-[0_2px_24px_rgba(23,19,16,.06)] backdrop-blur-[16px]">
      <Link href={home} className="flex items-center gap-3 no-underline">
        <Image
          src="/assets/phoenix-logo.webp"
          alt="Nordic Phoenix"
          width={34}
          height={27}
          priority
          className="block h-auto w-[34px]"
        />
        <span className="font-mono text-[12px] font-medium tracking-[.22em] text-text uppercase">
          Nordic Phoenix
        </span>
      </Link>

      {/* --- Full nav ---------------------------------------------------- */}
      <nav className="hidden items-center gap-[clamp(14px,2.5vw,32px)] nav:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="np-mono-link text-text hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
        <LanguageLink locale={locale} t={t} path={path} />
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          className="np-btn rounded-pill bg-[image:var(--gradient-accent)] px-5 py-[11px] font-mono text-[12px] font-medium tracking-[.1em] text-on-accent uppercase shadow-[var(--shadow-nav-button)] hover:-translate-y-px hover:text-on-accent hover:shadow-[0_8px_28px_rgba(224,90,0,.45)]"
        >
          {t.nav.cta}
        </Link>
      </nav>

      {/* --- Kompakt nav -------------------------------------------------- */}
      <div className="flex items-center gap-3 nav:hidden">
        <LanguageLink locale={locale} t={t} path={path} />
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="np-mobile-nav"
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border border-[rgba(23,19,16,.3)] bg-transparent transition-colors duration-300 hover:border-accent"
        >
          <span className="relative block h-[12px] w-[18px]">
            <span
              className="absolute left-0 block h-[1.5px] w-full bg-text transition-transform duration-300 ease-[var(--ease)]"
              style={{
                top: menuOpen ? "5px" : "0",
                transform: menuOpen ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 block h-[1.5px] w-full bg-text transition-transform duration-300 ease-[var(--ease)]"
              style={{
                top: menuOpen ? "5px" : "10px",
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
              className="np-mono-link border-b border-[var(--hairline-light)] py-4 text-text hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener"
            onClick={() => setMenuOpen(false)}
            className="np-btn mt-4 rounded-pill bg-[image:var(--gradient-accent)] px-6 py-[14px] font-mono text-[12px] font-medium tracking-[.1em] text-on-accent uppercase shadow-[var(--shadow-nav-button)] hover:text-on-accent"
          >
            {t.nav.cta}
          </Link>
        </div>
      ) : null}
    </header>
  );
}

function LanguageLink({
  locale,
  t,
  path,
}: Props & { path: string }) {
  const target = nextLocale(locale);
  return (
    <Link
      href={localePath(target, path)}
      hrefLang={target}
      aria-label={t.a11y.switchLanguage}
      className="rounded-pill border border-[rgba(23,19,16,.3)] px-4 py-[9px] font-mono text-[12px] font-medium tracking-[.08em] text-text no-underline transition-colors duration-300 hover:border-accent hover:bg-[rgba(224,90,0,.06)] hover:text-accent"
    >
      {localeButtonLabel[target]}
    </Link>
  );
}
