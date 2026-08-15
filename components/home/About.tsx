import { AutoVideo } from "@/components/ui/AutoVideo";
import type { Dictionary } from "@/content/locales/sv";
import { video } from "@/content/site";

/**
 * Filmkorn som SVG-brus. Bevara båda lagren — den filmiska graden är det som
 * tar bort AI-känslan i materialet (se handoff, sektion 4).
 */
const grain = (size: number, frequency: string, octaves: number) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='${octaves}' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

export function About({ t }: { t: Dictionary }) {
  return (
    <section
      id="om"
      className="relative overflow-hidden bg-ink text-on-dark"
    >
      <div className="mx-auto grid max-w-[var(--content-max)] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(48px,7vw,120px)] px-[var(--pad-x)] py-[var(--pad-y)]">
        <div data-reveal data-reveal-delay="120" className="max-w-[760px]">
          <p className="np-label mb-9 text-accent-light">{t.about.label}</p>
          <h2 className="np-h2 mb-8 text-[length:var(--fs-h2)] leading-[1.15] tracking-[-.015em]">
            {t.about.h2a}{" "}
            <em className="text-accent-light">{t.about.h2b}</em>
          </h2>
          <p className="m-0 mb-[18px] font-sans text-[16px] leading-[1.75] text-on-dark-muted">
            {t.about.p1}
          </p>
          {/* Sista stycket saknar undre marginal: värderaden som stod under
              det är borttagen, och marginalen hade lämnat ett tomrum. */}
          <p className="m-0 font-sans text-[16px] leading-[1.75] text-on-dark-muted">
            {t.about.p2}
          </p>
        </div>

        <div data-reveal data-reveal-delay="240" className="relative">
          <div className="relative overflow-hidden rounded-media border border-[rgba(242,236,224,.14)] shadow-[var(--shadow-card-dark)]">
            {/* Porträttformat och visas oklippt — beskär inte videon. */}
            <AutoVideo
              src={video.about}
              webmSrc={video.aboutWebm}
              poster={video.aboutPoster}
              controls
              playWhenVisible
              width={720}
              height={1280}
              title={t.about.videoTitle}
              className="block h-auto w-full bg-ink-card object-contain"
              style={{
                filter:
                  "saturate(1.08) contrast(1.07) brightness(1.02) sepia(.05) hue-rotate(-4deg)",
              }}
            />
            {/* 1 · split-tone */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,196,120,.16) 0%, transparent 40%, transparent 62%, rgba(30,42,72,.18) 100%)",
              }}
            />
            {/* 2 · statiskt filmkorn */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[.22] mix-blend-overlay"
              style={{
                backgroundImage: grain(140, "1.1", 2),
                backgroundSize: "150px 150px",
              }}
            />
            {/* 3 · animerat korn */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[.06] mix-blend-screen"
              style={{
                backgroundImage: grain(120, "0.65", 1),
                backgroundSize: "90px 90px",
                animation: "np-grain .9s steps(3) infinite",
              }}
            />
            {/* 4 · vinjett */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 52%, rgba(10,9,8,.44) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
