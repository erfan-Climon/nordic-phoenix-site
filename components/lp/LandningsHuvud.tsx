import Image from "next/image";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { phone } from "@/content/site";

/**
 * Huvudet på landningssidan: logotyp och telefonnummer, ingenting mer.
 *
 * Ingen meny och ingen länk tillbaka till sajten. Varje länk härifrån är en
 * väg bort från formuläret, och besökaren har betalats för att komma hit.
 * Telefonnumret får stå kvar eftersom det är en väg vidare och inte bort.
 */
export function LandningsHuvud() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(23,19,16,.08)] bg-page/90 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[var(--content-max)] items-center justify-between gap-4 px-[var(--pad-x)] py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/phoenix-logo.webp"
            alt="Nordic Phoenix Redovisningsbyrå"
            width={44}
            height={35}
            priority
            className="h-auto w-[38px]"
          />
          <span className="font-heading text-[15px] tracking-[.02em] whitespace-nowrap">
            Nordic Phoenix
          </span>
        </div>
        <a
          href={phone.href}
          className="font-mono text-[13px] tracking-[.06em] text-text no-underline transition-colors duration-300 hover:text-accent-ink"
        >
          <PhoneNumber />
        </a>
      </div>
    </header>
  );
}
