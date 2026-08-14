import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { phone, whatsappUrl } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    locale: "sv",
    path: "/tjanster",
    title: "Våra tjänster | Bokföring, lön, bokslut och rådgivning",
    description:
      "Bokföring, lön och moms, bokslut och årsredovisning, företagsstart, myndighetskontakt och digitalisering. Allt till fast månadspris, digitalt i hela Sverige.",
  }),
  alternates: { canonical: "/tjanster" },
};

export default function Page() {
  return (
    <>
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">Tjänster</p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            Allt ditt företag behöver.{" "}
            <em className="np-gradient-text">Samlat.</em>
          </h1>
          <p className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            Sex områden som täcker en företagares hela ekonomiska år, från
            registreringen till bokslutet. Välj ett område så berättar vi
            exakt vad som ingår och hur vi arbetar med det.
          </p>
        </div>
      </section>

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-0 border-t border-l border-[var(--hairline-light)]">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/tjanster/${s.slug}`}
                className="border-r border-b border-[var(--hairline-light)] p-[clamp(24px,3vw,36px)] text-inherit no-underline transition-colors duration-300 hover:bg-[rgba(240,103,0,.05)]"
              >
                <h2 className="np-h3 mb-3 text-[length:var(--fs-h3-sm)] leading-[1.25]">
                  {s.name}
                </h2>
                <p className="m-0 mb-5 font-sans text-[14px] leading-[1.65] text-text-muted">
                  {s.intro.split(". ")[0]}.
                </p>
                <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
                  {s.details.map((d) => (
                    <li
                      key={d.title}
                      className="font-mono text-[11px] tracking-[.12em] text-text-meta uppercase"
                    >
                      {d.title}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page px-[var(--pad-x)] pb-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.15] text-banner-ink">
            Vet du inte vad du behöver?
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            De flesta behöver inte allt. Hör av dig så går vi igenom ditt bolag
            och säger vad som faktiskt behövs, och vad det skulle kosta.
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              Skriv på WhatsApp
            </a>
            <a
              href={phone.href}
              className="np-btn border-[1.5px] border-[rgba(28,15,5,.5)] px-7 py-[15px] text-[15px] font-medium text-banner-ink hover:border-banner-ink hover:bg-[rgba(28,15,5,.08)] hover:text-banner-ink"
            >
              {phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
