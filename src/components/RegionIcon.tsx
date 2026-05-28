/**
 * Museum-style regional emblems.
 * Each region is rendered as a minimal engraved glyph inside a seal —
 * monochrome bronze ink on parchment, no gradients, no illustration.
 */

type RegionIconProps = {
  regionId: string;
  className?: string;
};

const ink = "var(--region-icon-ink)";
const sandDeep = "var(--region-icon-sand-deep)";
const shade = "var(--region-icon-shade)";

const STROKE = 1.6;
const STROKE_FINE = 1;

export function RegionIcon({ regionId, className = "" }: RegionIconProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Shared seal frame */}
      <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="48" cy="48" r="34" fill={shade} strokeWidth={STROKE} />
        <circle cx="48" cy="48" r="30" stroke={sandDeep} strokeWidth={STROKE_FINE} opacity="0.7" />
      </g>
      <g
        fill="none"
        stroke={ink}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={STROKE}
      >
        {renderRegionGlyph(regionId)}
      </g>
    </svg>
  );
}

function renderRegionGlyph(regionId: string) {
  switch (regionId) {
    case "kabylie":
      return <KabylieGlyph />;
    case "aures":
      return <AuresGlyph />;
    case "algiers":
      return <AlgiersGlyph />;
    case "constantine":
      return <ConstantineGlyph />;
    case "oran-west":
      return <WesternGlyph />;
    case "sahara":
      return <SaharaGlyph />;
    default:
      return <KabylieGlyph />;
  }
}

/* Kabylie — Amazigh diamond with olive-branch geometry */
function KabylieGlyph() {
  return (
    <>
      {/* Central diamond (Amazigh motif) */}
      <path d="M48 30 L62 48 L48 66 L34 48 Z" />
      <path d="M48 38 L56 48 L48 58 L40 48 Z" strokeWidth={STROKE_FINE} opacity="0.7" />
      {/* Olive branch arcs */}
      <path d="M26 64 Q34 58 40 60" strokeWidth={STROKE_FINE} />
      <path d="M70 32 Q62 38 56 36" strokeWidth={STROKE_FINE} />
      {/* Leaves */}
      <circle cx="30" cy="62" r="1.3" fill={ink} stroke="none" />
      <circle cx="66" cy="34" r="1.3" fill={ink} stroke="none" />
    </>
  );
}

/* Aurès — engraved mountain contour */
function AuresGlyph() {
  return (
    <>
      <path d="M24 62 L38 42 L48 54 L58 38 L72 62" />
      <path d="M30 62 L40 50 L46 56" strokeWidth={STROKE_FINE} opacity="0.65" />
      <path d="M54 56 L60 48 L66 56" strokeWidth={STROKE_FINE} opacity="0.65" />
      {/* Carved baseline */}
      <path d="M24 68 H72" strokeWidth={STROKE_FINE} opacity="0.55" />
    </>
  );
}

/* Algiers — Casbah arch seal */
function AlgiersGlyph() {
  return (
    <>
      {/* Horseshoe arch */}
      <path d="M34 66 V46 C34 32 62 32 62 46 V66" />
      <path d="M40 66 V48 C40 38 56 38 56 48 V66" strokeWidth={STROKE_FINE} opacity="0.7" />
      {/* Keystone notch */}
      <path d="M48 32 V38" strokeWidth={STROKE_FINE} />
      {/* Foundation line */}
      <path d="M28 68 H68" strokeWidth={STROKE_FINE} opacity="0.55" />
    </>
  );
}

/* Constantine — engraved bridge line over gorge */
function ConstantineGlyph() {
  return (
    <>
      {/* Pylons */}
      <path d="M32 64 V36 M64 64 V36" />
      {/* Suspension curve */}
      <path d="M32 36 Q48 60 64 36" />
      {/* Deck */}
      <path d="M24 50 H72" />
      {/* Gorge */}
      <path d="M28 64 L32 64 M64 64 L68 64" strokeWidth={STROKE_FINE} opacity="0.55" />
      <path d="M40 54 V50 M48 54 V50 M56 54 V50" strokeWidth={STROKE_FINE} opacity="0.55" />
    </>
  );
}

/* Western Algeria — Andalusian tile motif */
function WesternGlyph() {
  return (
    <>
      {/* Eight-point star (interlocking squares) */}
      <path d="M48 26 L60 38 L72 38 L60 50 L72 62 L60 62 L48 74 L36 62 L24 62 L36 50 L24 38 L36 38 Z" strokeWidth={STROKE_FINE} />
      <path d="M48 32 L58 42 L58 54 L48 64 L38 54 L38 42 Z" />
      <circle cx="48" cy="48" r="2" fill={ink} stroke="none" />
    </>
  );
}

/* Sahara — dune wave geometry with sun */
function SaharaGlyph() {
  return (
    <>
      {/* Sun */}
      <circle cx="48" cy="34" r="5" />
      {/* Dunes */}
      <path d="M22 60 Q34 52 46 58 Q58 64 70 56" />
      <path d="M22 68 Q36 60 50 64 Q62 67 74 62" strokeWidth={STROKE_FINE} opacity="0.7" />
    </>
  );
}
