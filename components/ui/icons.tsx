const WHATSAPP_PATH =
  "M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.87L2 22l5.27-1.38A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.07 14.13c-.21.6-1.24 1.17-1.71 1.21-.47.04-.91.21-3.06-.64-2.59-1.02-4.24-3.66-4.37-3.83-.13-.17-1.04-1.39-1.04-2.65 0-1.26.66-1.88.9-2.14.23-.26.51-.32.68-.32.17 0 .34 0 .49.01.16.01.37-.06.58.44.21.51.72 1.76.78 1.89.06.13.11.28.02.45-.09.17-.13.28-.26.43-.13.15-.28.34-.4.45-.13.13-.27.28-.12.54.15.26.68 1.12 1.46 1.81 1 .89 1.85 1.17 2.11 1.3.26.13.42.11.57-.06.15-.17.66-.77.83-1.03.17-.26.35-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.11.06.62-.15 1.22z";

export function WhatsAppGlyph({
  size = 18,
  fill = "var(--color-whatsapp)",
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

/** Instagram-märket är ritat i CSS i prototypen — behållet som ren geometri. */
export function InstagramGlyph() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[18px] w-[18px] rounded-[6px] border-[1.6px] border-text"
    >
      <span className="absolute top-1/2 left-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.6px] border-text" />
      <span className="absolute top-[2px] right-[2px] block h-[2.5px] w-[2.5px] rounded-full bg-text" />
    </span>
  );
}

/** Bocken i jämförelsetabell och prislistor bär betydelse — därav sr-texten. */
export function CheckMark({ label }: { label: string }) {
  return (
    <>
      <span aria-hidden="true">✓</span>
      <span className="sr-only">{label}</span>
    </>
  );
}

export function CrossMark({ label }: { label: string }) {
  return (
    <>
      <span aria-hidden="true">✕</span>
      <span className="sr-only">{label}</span>
    </>
  );
}
