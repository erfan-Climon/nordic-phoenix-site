import Link from "next/link";

export function ScrollToTop({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="fixed bottom-[22px] left-[22px] z-[95] flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(23,19,16,.14)] bg-[rgba(255,254,251,.92)] text-text no-underline shadow-[0_10px_30px_rgba(23,19,16,.16)] backdrop-blur-[8px] transition-[transform,color,border-color] duration-300 ease-[var(--ease)] hover:-translate-y-[3px] hover:border-[rgba(240,103,0,.5)] hover:text-accent-ink"
    >
      {/* SVG i stället för ↑ (U+2191) — glyfen saknas i brödtextsnittet och
          faller tillbaka på ett systemtypsnitt som ritar fel tecken. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M9 15V3" />
        <path d="M3.5 8.5 9 3l5.5 5.5" />
      </svg>
    </Link>
  );
}
