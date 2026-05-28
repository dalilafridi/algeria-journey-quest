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

/* Kabylie — Amazigh yaz seal framed by mountain diamond */
function KabylieGlyph() {
  return (
    <>
      {/* Outer Kabyle diamond (mountain + tattoo motif) */}
      <path d="M48 28 L64 48 L48 68 L32 48 Z" />
      {/* Yaz ⵣ glyph inside (Amazigh identity) */}
      <path d="M40 42 L48 42 L48 54 L56 54" strokeWidth={STROKE_FINE} />
      <path d="M40 54 L48 54 M48 42 L56 42" strokeWidth={STROKE_FINE} opacity="0.85" />
      {/* Tattoo dots at cardinal points */}
      <circle cx="48" cy="30" r="1.2" fill={ink} stroke="none" />
      <circle cx="48" cy="66" r="1.2" fill={ink} stroke="none" />
      <circle cx="34" cy="48" r="1.2" fill={ink} stroke="none" />
      <circle cx="62" cy="48" r="1.2" fill={ink} stroke="none" />
    </>
  );
}

/* Aurès — three carved peaks of the Aurès range with Chaoui tattoo notch */
function AuresGlyph() {
  return (
    <>
      {/* Three asymmetric peaks (Aurès massif silhouette) */}
      <path d="M24 64 L34 44 L42 56 L50 36 L60 54 L68 46 L74 64" />
      {/* Inner ridge shading */}
      <path d="M34 64 L40 54 M50 50 L56 60" strokeWidth={STROKE_FINE} opacity="0.6" />
      {/* Carved valley baseline */}
      <path d="M24 68 H74" strokeWidth={STROKE_FINE} opacity="0.55" />
      {/* Chaoui tattoo mark below tallest peak */}
      <path d="M48 70 L50 72 L48 74 L46 72 Z" strokeWidth={STROKE_FINE} opacity="0.7" />
    </>
  );
}

/* Algiers — horseshoe Casbah arch crowned by Mediterranean crescent */
function AlgiersGlyph() {
  return (
    <>
      {/* Crescent above the arch (Ottoman / Mediterranean) */}
      <path d="M44 28 A6 6 0 1 0 52 28 A5 5 0 1 1 44 28 Z" strokeWidth={STROKE_FINE} />
      {/* Horseshoe arch */}
      <path d="M34 66 V46 C34 34 62 34 62 46 V66" />
      {/* Inner arch line */}
      <path d="M40 66 V48 C40 40 56 40 56 48 V66" strokeWidth={STROKE_FINE} opacity="0.7" />
      {/* Tiled foundation steps */}
      <path d="M30 68 H66 M34 72 H62" strokeWidth={STROKE_FINE} opacity="0.55" />
    </>
  );
}

/* Constantine — suspension bridge over Rhumel gorge cliffs */
function ConstantineGlyph() {
  return (
    <>
      {/* Cliff walls on either side */}
      <path d="M22 70 V52 L28 52 V46" strokeWidth={STROKE_FINE} opacity="0.7" />
      <path d="M74 70 V52 L68 52 V46" strokeWidth={STROKE_FINE} opacity="0.7" />
      {/* Pylons */}
      <path d="M34 56 V34 M62 56 V34" />
      {/* Suspension cable */}
      <path d="M34 34 Q48 56 62 34" />
      {/* Deck */}
      <path d="M28 50 H68" />
      {/* River trace at bottom */}
      <path d="M30 66 Q42 70 48 66 Q54 62 66 66" strokeWidth={STROKE_FINE} opacity="0.55" />
    </>
  );
}

/* Western Algeria — Tlemcen sebka lattice with central khatam star */
function WesternGlyph() {
  return (
    <>
      {/* Sebka interlace frame (Almohad-Andalusian) */}
      <path d="M30 36 H66 V60 H30 Z" strokeWidth={STROKE_FINE} opacity="0.55" />
      <path d="M30 48 H66 M48 36 V60" strokeWidth={STROKE_FINE} opacity="0.4" />
      {/* Eight-point khatam star (overlapping squares) */}
      <path d="M48 32 L58 42 L58 54 L48 64 L38 54 L38 42 Z" />
      <path d="M40 36 L56 60 M56 36 L40 60" strokeWidth={STROKE_FINE} opacity="0.7" />
      <circle cx="48" cy="48" r="1.8" fill={ink} stroke="none" />
    </>
  );
}

/* Sahara — dune horizon with palm and date-stone sun */
function SaharaGlyph() {
  return (
    <>
      {/* Low sun on the horizon */}
      <circle cx="34" cy="38" r="4.5" />
      <path d="M28 38 H22 M40 38 H46 M34 32 V28 M34 44 V48" strokeWidth={STROKE_FINE} opacity="0.55" />
      {/* Palm silhouette */}
      <path d="M62 60 V44" />
      <path d="M62 44 Q55 38 50 40 M62 44 Q69 38 74 40 M62 44 Q58 36 60 32 M62 44 Q66 36 64 32" strokeWidth={STROKE_FINE} opacity="0.8" />
      {/* Dune wave */}
      <path d="M22 64 Q34 58 46 62 Q58 66 70 60" />
      <path d="M22 70 Q38 64 52 68 Q62 70 74 66" strokeWidth={STROKE_FINE} opacity="0.6" />
    </>
  );
}

