import Link from "next/link";
import { AutoVideo } from "@/components/ui/AutoVideo";
import type { Dictionary } from "@/content/locales/sv";
import { video, whatsappUrl } from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";

export function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const home = localePath(locale, "/");
  const servicesHref = `${home === "/" ? "" : home}#tjanster`;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-page"
    >
      {/* Andande orange glöd uppe till höger */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-25%] right-[-18%] h-[62vw] w-[62vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,133,31,.15), rgba(245,133,31,.05) 45%, transparent 68%)",
          animation: "np-breathe 9s ease-in-out infinite",
        }}
      />

      <div
        className="np-meta absolute inset-x-0 top-[92px] flex justify-between px-[var(--pad-x)] text-text-meta"
        style={{ animation: "np-fade 1.4s .9s ease both" }}
      >
        <span>{t.hero.meta1}</span>
        <span>{t.hero.meta2}</span>
      </div>

      <div
        data-parallax="0.14"
        className="relative z-[2] flex w-full flex-wrap items-center gap-[clamp(32px,4vw,72px)] px-[var(--pad-x)] pt-[clamp(140px,18vh,220px)]"
      >
        <div className="min-w-0 flex-[1_1_520px]">
          <h1 className="m-0 flex flex-col font-heading text-[length:var(--fs-hero)] leading-[0.98] tracking-[-.025em] text-text">
            <span style={{ animation: "np-rise 1.1s .05s var(--ease) both" }}>
              {t.hero.w1}
            </span>
            <span
              className="text-text-neutral"
              style={{ animation: "np-rise 1.1s .18s var(--ease) both" }}
            >
              {t.hero.w2}
            </span>
            <span
              className="np-gradient-text italic"
              style={{ animation: "np-rise 1.1s .31s var(--ease) both" }}
            >
              {t.hero.w3}
            </span>
          </h1>

          <div className="my-[clamp(32px,4vw,56px)] mb-[clamp(40px,5vw,72px)] flex flex-col gap-7">
            <p
              className="m-0 max-w-[46ch] font-sans text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-text-muted"
              style={{ animation: "np-rise 1.1s .5s var(--ease) both" }}
            >
              {t.hero.sub}
            </p>
            <div
              className="flex flex-wrap gap-[14px]"
              style={{ animation: "np-rise 1.1s .62s var(--ease) both" }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener"
                className="np-btn np-btn-primary px-9 py-[18px] text-[15px]"
              >
                {t.hero.cta1}
              </a>
              <Link
                href={servicesHref}
                className="np-btn np-btn-outline px-[30px] py-[17px] text-[15px]"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mx-auto flex w-[min(680px,100%)] flex-[1_1_620px] self-stretch"
          style={{ animation: "np-rise 1.2s .45s var(--ease) both" }}
        >
          <div className="relative flex-1 overflow-hidden rounded-media bg-[image:var(--gradient-media-fallback)] shadow-[var(--shadow-card-light)]">
            <div className="min-h-[min(560px,62vh)]">
              <AutoVideo
                src={video.hero}
                className="absolute inset-0 block h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-pill bg-[rgba(255,254,251,.85)] px-4 py-2 backdrop-blur-[8px]">
              <span className="h-[7px] w-[7px] rounded-full bg-accent" />
              <span className="font-mono text-[10px] font-medium tracking-[.18em] text-text uppercase">
                {t.hero.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
