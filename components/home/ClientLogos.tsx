import Image from "next/image";
import type { Dictionary } from "@/content/locales/sv";

/** Typografiska ordmärken — kunder utan egen logotypfil. */
const WORDMARKS = [
  { text: "NORDBYGG", className: "font-sans text-[21px] font-bold tracking-[.1em]" },
  { text: "Kafé Linnea", className: "font-heading text-[26px] italic" },
  { text: "SVEA LOGISTIK", className: "font-mono text-[17px] font-medium tracking-[.2em]" },
  { text: "Studio Form", className: "font-sans text-[22px] font-semibold" },
  { text: "Bright Konsult", className: "font-heading text-[25px] italic" },
  { text: "VERKSTAN", className: "font-sans text-[19px] font-bold tracking-[.24em]" },
];

const IMAGE_MARKS = [
  { src: "/assets/client-climon.webp", alt: "Climon", height: 24, width: 96 },
  { src: "/assets/client-tehr.webp", alt: "Tehr Tattoo", height: 52, width: 120 },
];

const MARK_STYLE = "flex-none opacity-80 mix-blend-multiply [filter:grayscale(1)_contrast(1.05)]";

export function ClientLogos({ t }: { t: Dictionary }) {
  // Listan dubbleras så att translateX(-50%) loopar sömlöst.
  const run = (duplicate: boolean) => (
    <>
      {IMAGE_MARKS.map((mark) => (
        <Image
          key={`${mark.src}-${duplicate}`}
          src={mark.src}
          alt={duplicate ? "" : mark.alt}
          aria-hidden={duplicate || undefined}
          width={mark.width}
          height={mark.height}
          className={`${MARK_STYLE} block w-auto`}
          style={{ height: `${mark.height}px` }}
        />
      ))}
      {WORDMARKS.map((mark) => (
        <span
          key={`${mark.text}-${duplicate}`}
          aria-hidden={duplicate || undefined}
          className={`${mark.className} ${MARK_STYLE} whitespace-nowrap text-text-belt`}
        >
          {mark.text}
        </span>
      ))}
    </>
  );

  return (
    <section className="overflow-hidden bg-page pt-[clamp(48px,6vw,80px)] pb-[clamp(64px,8vw,110px)]">
      <p
        data-reveal
        className="np-label mx-[var(--pad-x)] mb-[clamp(36px,4vw,56px)] text-center tracking-[.2em] text-accent-ink"
      >
        {t.clients.title}
      </p>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          data-marquee
          className="flex w-max items-center gap-[clamp(56px,7vw,110px)]"
          style={{ animation: "np-marquee 32s linear infinite" }}
        >
          {run(false)}
          {run(true)}
        </div>
      </div>
    </section>
  );
}
