import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/locales/sv";
import {
  agencyCredit,
  company,
  phone,
  social,
  whatsappUrl,
} from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";

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
              {phone.display}
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
              Instagram ↗
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Facebook ↗
            </a>
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              TikTok ↗
            </a>
          </div>

          <div className="flex flex-col items-start gap-3">
            <FooterHeading>{t.footer.ready}</FooterHeading>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="rounded-pill bg-on-dark px-[22px] py-3 font-mono text-[12px] font-medium tracking-[.1em] text-ink no-underline uppercase transition-colors duration-300 hover:bg-accent-light hover:text-ink"
            >
              {t.nav.cta}
            </a>
            <Link
              href={localePath(locale, "/integritetspolicy")}
              className={linkClass}
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-[rgba(242,236,224,.06)] py-6 font-mono text-[11px] tracking-[.08em] text-on-dark-faint">
          <span>
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
