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

export function PhoneGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

/** Bocken i prislistorna bär betydelse, därav den dolda texten. */
export function CheckMark({ label }: { label: string }) {
  return (
    <>
      <span aria-hidden="true">✓</span>
      <span className="sr-only">{label}</span>
    </>
  );
}

/**
 * Plattformsmärken för sidfotens länkrad.
 *
 * Streckade och inte fyllda, av samma skäl som PhoneGlyph: de ska ta färg
 * från texten runt omkring och tona med den vid hover, i stället för att
 * ligga som fem olika varumärkesfärger i en rad på den mörka ytan.
 *
 * Ritade ur primitiver och enkla banor i stället för varumärkenas egna
 * vektorer. De officiella banorna är tusentals tecken långa, och ett enda
 * fel tecken ger en obegriplig form utan att något varnar.
 */
export type SocialNamn =
  "instagram" | "facebook" | "tiktok" | "linkedin" | "youtube";

const STRECK = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function SocialGlyph({
  namn,
  size = 20,
}: {
  namn: SocialNamn;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...STRECK}
    >
      {namn === "instagram" ? (
        <>
          <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </>
      ) : null}

      {namn === "facebook" ? (
        <path d="M15.5 2.75h-2.3a4.2 4.2 0 0 0-4.2 4.2v2.8H6.3v3.7h2.7v7.8h3.8v-7.8h2.8l.7-3.7h-3.5v-2.4a1 1 0 0 1 1-1h2.2z" />
      ) : null}

      {namn === "tiktok" ? (
        <>
          <path d="M14 2.9v11.6a3.6 3.6 0 1 1-2.7-3.5" />
          <path d="M14 2.9c.4 2.7 2.5 4.7 5.2 5" />
        </>
      ) : null}

      {namn === "linkedin" ? (
        <>
          <rect x="2.75" y="8.9" width="3.8" height="12.35" rx="0.6" />
          <circle cx="4.65" cy="4.3" r="1.9" />
          <path d="M10.6 21.25V8.9h3.6v1.7a4.3 4.3 0 0 1 3.9-2c2.6 0 3.9 1.7 3.9 4.9v7.75h-3.8v-7a1.9 1.9 0 0 0-3.8 0v7z" />
        </>
      ) : null}

      {namn === "youtube" ? (
        <>
          <rect x="2.3" y="5.1" width="19.4" height="13.8" rx="4.2" />
          <path d="M10.3 8.9 15.8 12l-5.5 3.1z" />
        </>
      ) : null}
    </svg>
  );
}
