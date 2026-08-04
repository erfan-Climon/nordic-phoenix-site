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

const PAYROLL_MASK = "np-icon-payroll";

/** En anställd i kostym, används två gånger i löneikonen. */
function PayrollPerson({ cx }: { cx: number }) {
  return (
    <>
      {/* Huvud och överkropp */}
      <circle cx={cx} cy="556" r="64" fill="#fff" />
      <path
        d={`M${cx - 117} 776 V706 C${cx - 117} 642 ${cx - 65} 622 ${cx} 622 C${cx + 65} 622 ${cx + 117} 642 ${cx + 117} 706 V776 Z`}
        fill="#fff"
      />
      {/* Skjortan urtagen, slipsen kvar i färg */}
      <path d={`M${cx - 34} 624 H${cx + 34} L${cx} 716 Z`} fill="#000" />
      <path
        d={`M${cx - 9} 628 H${cx + 9} L${cx + 15} 700 L${cx} 728 L${cx - 15} 700 Z`}
        fill="#fff"
      />
      {/* Två smala urtag i underkanten */}
      <rect x={cx - 84} y="732" width="17" height="44" fill="#000" />
      <rect x={cx + 67} y="732" width="17" height="44" fill="#000" />
    </>
  );
}

/** Lön, moms & deklaration: hand som räcker fram en sedel, och två anställda. */
export function PayrollIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="currentColor"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <mask id={PAYROLL_MASK} maskUnits="userSpaceOnUse">
        <rect width="1024" height="1024" fill="#000" />

        {/* Manschett och hand */}
        <rect x="216" y="155" width="66" height="172" fill="#fff" />
        <path
          d="M282 156 C330 148 372 146 410 158 C440 168 470 182 516 204 L516 306 C450 316 360 320 282 318 Z"
          fill="#fff"
        />

        {/* Sedeln, med KR urtaget */}
        <rect x="385" y="205" width="352" height="176" fill="#fff" />
        <path d="M492 381 H656 L616 464 Z" fill="#fff" />
        <text
          x="561"
          y="296"
          fill="#000"
          fontSize="118"
          fontWeight="700"
          fontFamily="var(--font-heading)"
          textAnchor="middle"
          dominantBaseline="central"
          letterSpacing="4"
        >
          KR
        </text>

        {/* Tummen ligger över sedelns vänsterkant */}
        <path
          d="M348 258 C378 250 402 258 410 280 C418 302 406 320 386 324"
          fill="none"
          stroke="#000"
          strokeWidth="20"
          strokeLinecap="round"
        />

        <PayrollPerson cx={413} />
        <PayrollPerson cx={655} />
      </mask>

      <rect width="1024" height="1024" mask={`url(#${PAYROLL_MASK})`} />
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
    1: PayrollIcon,
    4: AuthorityIcon,
  };
