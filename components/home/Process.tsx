import type { Dictionary } from "@/content/locales/sv";
import { whatsappUrl } from "@/content/site";

const NUMBERS = ["/ 01", "/ 02", "/ 03"];

export function Process({ t }: { t: Dictionary }) {
  return (
    <section
      id="process"
      className="relative bg-ink text-on-dark [overflow:clip]"
    >
      <div className="mx-auto grid max-w-[var(--content-max)] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(48px,6vw,100px)] px-[var(--pad-x)] py-[var(--pad-y)]">
        {/* Blocket är sticky. Utan egen bakgrund scrollar stegen rakt igenom
            det när mobilen lägger allt i en kolumn, så texterna hamnar
            ovanpå varandra. Solid bakgrund plus z-10 gör att stegen försvinner
            under det i stället. Bakgrunden går ut i kanterna på mobil, annars
            syns en remsa av sektionen bredvid. */}
        <div className="sticky top-[calc(var(--header-h)+24px)] z-10 -mx-[var(--pad-x)] bg-ink px-[var(--pad-x)] pt-6 pb-10 nav:mx-0 nav:px-0 nav:pt-0 nav:pb-0">
          <p className="np-label mb-8 text-accent-light">{t.process.label}</p>
          <h2 className="np-h2 mb-7 text-[length:var(--fs-h2)] leading-[1.12] tracking-[-.015em]">
            {t.process.h2a} <em className="text-accent-light">{t.process.h2b}</em>
          </h2>
          <p className="m-0 mb-10 max-w-[38ch] font-sans text-[15px] leading-[1.7] text-on-dark-muted">
            {t.process.sub}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener"
            className="np-btn np-btn-primary px-[30px] py-[15px] text-[14px] shadow-none hover:shadow-[0_12px_36px_rgba(240,103,0,.4)]"
          >
            {t.process.cta}
          </a>

          {/* Glöden ligger under CTA:n och glider i sidled. Dold under
              nav-brytpunkten: i enkolumnsläget hamnar den rakt ovanpå stegen
              och gör dem svårlästa. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-full left-[10%] hidden h-[320px] w-[130%] -translate-x-1/2 rounded-full nav:block"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,180,84,.85), rgba(255,148,36,.4) 45%, transparent 70%)",
              filter: "blur(56px)",
              animation: "np-glow 4.5s ease-in-out infinite",
            }}
          />
        </div>

        <div className="flex flex-col">
          {t.process.steps.map((step, i) => (
            <div
              key={step.title}
              data-step
              className="flex items-baseline gap-[clamp(20px,3vw,40px)] border-t border-[rgba(242,236,224,.14)] py-[clamp(28px,3vw,40px)] transition-[border-top-color] duration-[.8s] data-[active=true]:border-t-[rgba(255,148,36,.5)]"
            >
              <span
                data-step-num
                className="flex-none font-mono text-[clamp(15px,1.2vw,17px)] text-on-dark-dim transition-colors duration-700"
              >
                {NUMBERS[i]}
              </span>
              <div>
                <h3 className="np-h3 mb-[10px] text-[length:var(--fs-h3)] leading-[1.3]">
                  {step.title}
                </h3>
                <p className="m-0 max-w-[48ch] font-sans text-[15px] leading-[1.7] text-on-dark-muted">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
