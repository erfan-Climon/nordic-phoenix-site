import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/locales/sv";
import {
  agencyCredit,
  company,
  email,
  phone,
  social,
  whatsappUrl,
} from "@/content/site";
import { hasTranslatedLocations } from "@/content/location-copy";
import { type Locale, localePath } from "@/lib/i18n";
import { PhoneNumber } from "@/components/ui/PhoneNumber";

const textClass = "font-sans text-[14px] leading-[1.7] text-on-dark-muted";
const linkClass = `${textClass} no-underline transition-colors duration-300 hover:text-accent-light`;

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="overflow-hidden border-t border-[rgba(242,236,224,.06)] bg-ink text-on-dark">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(80px,10vw,130px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(40px,5vw,64px)] pb-[clamp(64px,8vw,100px)]">
          <div className="flex flex-col gap-[18px]">
            <Image
              src="/assets/phoenix-logo.webp"
              alt="Nordic Phoenix"
              width={80}
              height={63}
              loading="lazy"
              className="h-auto w-20"
            />
            <span className="max-w-[30ch] font-sans text-[14px] leading-[1.7] text-on-dark-muted">
              {t.footer.tagline}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <FooterHeading>{t.footer.company}</FooterHeading>
            <span className={textClass}>
              {company.legalName}
            </span>
            <span className={textClass}>
              Org.nr {company.orgNumber}
            </span>
            <span className={textClass}>
              {company.street}, {company.postalCode} {company.city}
            </span>
            <a href={phone.href} className={linkClass}>
              <PhoneNumber />
            </a>
            {/* Den skriftliga vägen in. Adressen skrivs ut i klartext och
                inte som "mejla oss": den som vill skriva från sin egen
                klient ska kunna läsa av eller kopiera den direkt. */}
            <a href={email.href} className={linkClass}>
              {email.display}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <FooterHeading>{t.footer.follow}</FooterHeading>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Instagram
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Facebook
            </a>
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              TikTok
            </a>
          </div>

          <div className="flex flex-col items-start gap-3">
            <FooterHeading>{t.footer.ready}</FooterHeading>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="rounded-button bg-on-dark px-[22px] py-3 font-mono text-[12px] font-medium tracking-[.1em] text-ink no-underline uppercase transition-colors duration-300 hover:bg-accent-light hover:text-ink"
            >
              {t.nav.cta}
            </a>
            {/* Tjänsteöversikten finns på alla tre språk. Ortsöversikten är
                svenskspråkig men länkas oavsett språk, den är relevant för
                alla besökare. */}
            <Link href={localePath(locale, "/tjanster")} className={linkClass}>
              {t.nav.services}
            </Link>
            <Link
              href={
                hasTranslatedLocations(locale)
                  ? localePath(locale, "/redovisningsbyra")
                  : "/redovisningsbyra"
              }
              className={linkClass}
            >
              {t.locationPage.locations}
            </Link>
            <Link
              href={localePath(locale, "/integritetspolicy")}
              className={linkClass}
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-[rgba(242,236,224,.06)] py-6 font-mono text-[11px] tracking-[.08em] text-on-dark-faint">
          {/* Hela raden tvingas vänster-till-höger. Den består av
              copyrighttecken, ett årsintervall och ett latinskt firmanamn,
              alltså inget som ska vända med skrivriktningen. I persiskan
              vände bidi-algoritmen både ordningen och intervallet, så raden
              lästes "Nordic Phoenix Redovisningsbyrå AB ©2026–2015".
              Siffror är svaga tecken och tar riktning från omgivningen. */}
          <span dir="ltr">
            © {company.foundedDisplay} {company.legalName}
          </span>
          <span>{t.footer.seo}</span>
        </div>
      </div>

      <div className="relative border-t border-[rgba(242,236,224,.08)] bg-ink-deep">
        <p className="m-0 px-[var(--pad-x)] py-4 text-center font-mono text-[11px] tracking-[.14em] text-on-dark-faint uppercase">
          {t.footer.credit}{" "}
          <a
            href={agencyCredit.href}
            target="_blank"
            rel="noopener"
            className="text-text-meta no-underline transition-colors duration-300 hover:text-accent-light"
          >
            {agencyCredit.label}
          </a>
        </p>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] tracking-[.2em] text-on-dark-dim uppercase">
      {children}
    </span>
  );
}
