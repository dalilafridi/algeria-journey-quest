/**
 * Museum-style pillar icons for the three home journey gateways.
 * Engraved line marks rendered on a muted gold / parchment palette,
 * consistent in stroke weight and proportions with RegionIcon.
 */

type PillarKind = "journey" | "regions" | "culture";

type Props = {
  kind: PillarKind;
  className?: string;
};

const ink = "var(--region-icon-ink)";
const sand = "var(--region-icon-sand)";
const sandDeep = "var(--region-icon-sand-deep)";
const clay = "var(--region-icon-clay)";
const shade = "var(--region-icon-shade)";
const STROKE = 2.4;
const STROKE_ACCENT = 1.6;

export function PillarIcon({ kind, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke={ink}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={STROKE}
      >
        {kind === "journey" && <JourneyMark />}
        {kind === "regions" && <RegionsMark />}
        {kind === "culture" && <CultureMark />}
      </g>
    </svg>
  );
}

/* Journey — engraved compass rose inside a soft seal */
function JourneyMark() {
  return (
    <>
      <circle cx="48" cy="48" r="32" fill={shade} stroke={ink} />
      <circle cx="48" cy="48" r="26" fill="none" stroke={sandDeep} strokeWidth={STROKE_ACCENT} />
      {/* Cardinal ticks */}
      <path d="M48 18 V26 M48 70 V78 M18 48 H26 M70 48 H78" />
      {/* Compass needle */}
      <path d="M48 28 L54 48 L48 68 L42 48 Z" fill={clay} stroke={ink} />
      <path d="M48 28 L54 48 L42 48 Z" fill={sand} stroke={ink} />
      <circle cx="48" cy="48" r="2.4" fill={ink} stroke="none" />
    </>
  );
}

/* Regions — layered mountain contour, atlas-inspired */
function RegionsMark() {
  return (
    <>
      <circle cx="48" cy="48" r="32" fill={shade} stroke={ink} />
      {/* Distant ridge */}
      <path
        d="M20 60 L34 44 L44 54 L58 38 L72 56 L78 50"
        stroke={sandDeep}
        strokeWidth={STROKE_ACCENT}
      />
      {/* Foreground ridge */}
      <path d="M22 68 L34 50 L46 62 L58 44 L70 60 L76 54" stroke={ink} />
      {/* Peak highlights */}
      <path d="M34 50 L40 58 M58 44 L64 52" stroke={ink} strokeWidth={STROKE_ACCENT} />
      {/* Base line */}
      <path d="M20 72 H76" stroke={sandDeep} strokeWidth={STROKE_ACCENT} opacity="0.6" />
    </>
  );
}

/* Culture — calligraphic seal with Amazigh-inspired geometry */
function CultureMark() {
  return (
    <>
      <circle cx="48" cy="48" r="32" fill={shade} stroke={ink} />
      <circle cx="48" cy="48" r="26" fill="none" stroke={sandDeep} strokeWidth={STROKE_ACCENT} />
      {/* Stylized yaz (ⵣ) carved inside */}
      <path d="M32 64 Q48 78 64 64" stroke={ink} />
      <path d="M48 30 V64" stroke={ink} />
      <path d="M34 36 L48 44" stroke={ink} />
      <path d="M62 36 L48 44" stroke={ink} />
      {/* Inner accent dots */}
      <circle cx="48" cy="30" r="1.8" fill={clay} stroke="none" />
      <circle cx="34" cy="36" r="1.4" fill={clay} stroke="none" />
      <circle cx="62" cy="36" r="1.4" fill={clay} stroke="none" />
    </>
  );
}

export default PillarIcon;
