import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/content/locations";
import { phone, whatsappUrl } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    locale: "sv",
    path: "/redovisningsbyra",
    title: "Redovisningsbyrå i hela Sverige | Nordic Phoenix",
    description:
      "Vi sköter bokföring, lön, bokslut och deklaration digitalt i hela Sverige. Välj din ort för att läsa mer om hur vi arbetar med företagare där.",
  }),
  alternates: { canonical: "/redovisningsbyra" },
};

export default function Page() {
  return (
    <>
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">Orter</p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.05]">
            Redovisningsbyrå i{" "}
            <em className="np-gradient-text">hela Sverige.</em>
          </h1>
          <p className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-text-muted">
            Vi arbetar digitalt, vilket betyder att avståndet inte påverkar
            vare sig pris eller svarstid. Välj din ort så berättar vi hur vi
            arbetar med företagare just där.
          </p>
        </div>
      </section>

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pb-[var(--pad-y-light)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-0 border-t border-l border-[var(--hairline-light)]">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={`/redovisningsbyra/${l.slug}`}
                className="group border-r border-b border-[var(--hairline-light)] p-[clamp(24px,3vw,36px)] text-inherit no-underline transition-colors duration-300 hover:bg-[rgba(240,103,0,.05)]"
              >
                <h2 className="np-h3 mb-2 text-[length:var(--fs-h3-sm)] leading-[1.25]">
                  {l.name}
                </h2>
                <p className="m-0 mb-4 font-mono text-[11px] tracking-[.14em] text-text-meta uppercase">
                  {l.region}
                </p>
                <p className="m-0 font-sans text-[14px] leading-[1.65] text-text-muted">
                  {l.intro.split(". ")[0]}.
                </p>
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
            Hittar du inte din ort?
          </h2>
          <p className="m-0 mb-8 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            Vi arbetar med företagare i hela landet, från Kiruna till Malmö.
            Hör av dig så berättar vi hur vi kan hjälpa just ditt bolag.
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
