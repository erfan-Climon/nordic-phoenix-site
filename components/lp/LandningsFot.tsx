import Link from "next/link";
import { company, phone } from "@/content/site";
import { Epostlank } from "@/components/ui/Epostlank";
import { PhoneNumber } from "@/components/ui/PhoneNumber";

/**
 * Foten på landningssidan.
 *
 * Bara det som faktiskt måste stå: vem avsändaren är, hur man når dem, och
 * integritetspolicyn som formuläret hänvisar till. Inga tjänstelänkar, inga
 * ortslänkar, ingenting som lockar bort från formuläret.
 *
 * Företagsuppgifterna kommer från content/site.ts och skrivs inte av här.
 */
export function LandningsFot() {
  return (
    <footer className="border-t border-[rgba(242,236,224,.06)] bg-ink text-on-dark">
      <div className="mx-auto flex max-w-[var(--content-max)] flex-wrap justify-between gap-x-10 gap-y-6 px-[var(--pad-x)] py-[clamp(36px,5vw,56px)]">
        <div className="flex flex-col gap-2 font-sans text-[14px] leading-[1.7] text-on-dark-muted">
          <span className="text-on-dark">{company.legalName}</span>
          <span dir="ltr">Org.nr {company.orgNumber}</span>
          <span>
            {company.street}, {company.postalCode} {company.city}
          </span>
        </div>
        <div className="flex flex-col gap-2 font-sans text-[14px] leading-[1.7] text-on-dark-muted">
          <a
            href={phone.href}
            className="text-on-dark-muted no-underline transition-colors duration-300 hover:text-accent-light"
          >
            <PhoneNumber />
          </a>
          <Epostlank className="text-on-dark-muted no-underline transition-colors duration-300 hover:text-accent-light" />
          <Link
            href="/integritetspolicy"
            className="text-on-dark-muted underline transition-colors duration-300 hover:text-accent-light"
          >
            سیاست حفظ حریم خصوصی
          </Link>
        </div>
      </div>
    </footer>
  );
}
