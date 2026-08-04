/**
 * Ikoner för tjänstekorten. Ritade som SVG i stället för bildfiler: de ärver
 * kortets accentfärg via currentColor, blir skarpa i alla storlekar och de
 * genomskinliga mellanrummen visar kortets bakgrund, vilket krävs eftersom
 * korten växlar mellan mörk, cream och guld.
 *
 * Kort utan ikon faller tillbaka på sitt nummer, se Services.tsx. Lägg till
 * fler här allt eftersom kunden levererar dem.
 *
 * OBS stilblandning: bokföringsikonen är fylld och inringad, medan
 * myndighetsikonen är ritad i tunn konturstil. De kommer från två olika
 * ikonset. Så länge bara två kort har ikoner syns det knappt, men när fler
 * tillkommer bör hela uppsättningen läggas i samma stil.
 */

type IconProps = { className?: string };

/**
 * Mask-id:t är en modulkonstant, inte useId(). useId kräver "use client", och
 * ett klientmarkerat ikonbibliotek gör att SERVICE_ICONS blir en
 * klientreferens i stället för ett objekt när Services (server) slår upp i
 * det, så alla uppslag ger undefined. Konstanten fungerar eftersom varje ikon
 * förekommer en gång per sida. Renderas samma ikon flera gånger måste id:t
 * parametriseras.
 */
const BOOKKEEPING_MASK = "np-icon-bookkeeping";

/** Bokföring & redovisning: dokument, miniräknare och kr-bricka i en ring. */
export function BookkeepingIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="currentColor"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <mask id={BOOKKEEPING_MASK} maskUnits="userSpaceOnUse">
        {/* Vitt = syns, svart = genomskinligt */}
        <rect width="1024" height="1024" fill="#000" />

        {/* Dokument med vikt hörn */}
        <path d="M348 232 H636 L726 322 V768 H348 Z" fill="#fff" />
        <path d="M648 232 H726 V310 Z" fill="#fff" />

        {/* Textrader i dokumentet */}
        <rect x="400" y="326" width="196" height="26" rx="13" fill="#000" />
        <rect x="483" y="392" width="140" height="26" rx="13" fill="#000" />
        <rect x="512" y="598" width="140" height="26" rx="13" fill="#000" />
        <rect x="512" y="650" width="140" height="26" rx="13" fill="#000" />

        {/* Miniräknaren skiljs från dokumentet av ett genomskinligt mellanrum */}
        <rect x="214" y="406" width="262" height="330" rx="58" fill="#000" />
        <rect x="230" y="422" width="230" height="298" rx="44" fill="#fff" />
        <rect x="262" y="466" width="166" height="62" rx="10" fill="#000" />
        {[578, 622, 664].map((y) =>
          [265, 322, 379].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="40"
              height="17"
              rx="8.5"
              fill="#000"
            />
          )),
        )}

        {/* kr-brickan, även den med mellanrum mot dokumentet */}
        <circle cx="713" cy="487" r="106" fill="#000" />
        <circle cx="713" cy="487" r="92" fill="#fff" />
        <text
          x="713"
          y="487"
          fill="#000"
          fontSize="112"
          fontWeight="700"
          fontFamily="var(--font-heading)"
          textAnchor="middle"
          dominantBaseline="central"
        >
          kr
        </text>
      </mask>

      {/* Ytterringen plus allt maskat innehåll, i currentColor */}
      <circle
        cx="512"
        cy="512"
        r="450"
        fill="none"
        stroke="currentColor"
        strokeWidth="54"
      />
      <rect width="1024" height="1024" mask={`url(#${BOOKKEEPING_MASK})`} />
    </svg>
  );
}

/**
 * Myndighetskontakt & rådgivning: myndighetsbyggnad med flagga.
 * Ritad i konturstil, till skillnad från bokföringsikonen som är fylld.
 * Se noteringen om stilblandning överst i filen.
 */
export function AuthorityIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="30"
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Flaggstång och vimpel */}
      <path d="M512 196 V72" />
      <path d="M512 80 H664 L628 120 L664 160 H512" />

      {/* Kupol och arkitrav */}
      <path d="M272 434 A240 240 0 0 1 752 434" />
      <rect x="118" y="434" width="788" height="76" rx="26" />

      {/* Tre pelare, var och en med kapitäl, skaft och bas */}
      {[300, 512, 724].map((cx) => (
        <g key={cx}>
          <rect x={cx - 48} y="534" width="96" height="42" rx="12" />
          <rect x={cx - 28} y="576" width="56" height="168" />
          <rect x={cx - 48} y="744" width="96" height="42" rx="12" />
        </g>
      ))}

      {/* Sockel */}
      <rect x="96" y="810" width="832" height="82" rx="26" />
    </svg>
  );
}

/** Indexet motsvarar ordningen i `services.groups` i ordlistorna. */
export const SERVICE_ICONS: Record<number, (p: IconProps) => React.ReactElement> =
  {
    0: BookkeepingIcon,
    4: AuthorityIcon,
  };
