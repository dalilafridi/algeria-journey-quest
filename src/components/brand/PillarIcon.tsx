/**
 * Museum-style pillar glyphs for the three home journey gateways.
 * Engraved monochrome marks inside a seal — bronze ink on parchment,
 * no gradients, no illustration. Treat as carved medallion symbols.
 */

type PillarKind = "journey" | "regions" | "culture";

type Props = {
  kind: PillarKind;
  className?: string;
};

const ink = "var(--region-icon-ink)";
const sandDeep = "var(--region-icon-sand-deep)";
const shade = "var(--region-icon-shade)";

const STROKE = 1.6;
const STROKE_FINE = 1;

export function PillarIcon({ kind, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Seal frame — shared across all pillar glyphs */}
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
        {kind === "journey" && <JourneyMark />}
        {kind === "regions" && <RegionsMark />}
        {kind === "culture" && <CultureMark />}
      </g>
    </svg>
  );
}

/* Journey — engraved compass rose, atlas mark */
function JourneyMark() {
  return (
    <>
      {/* Cardinal axes */}
      <path d="M48 22 V74 M22 48 H74" strokeWidth={STROKE_FINE} opacity="0.55" />
      {/* Diagonal ticks */}
      <path d="M32 32 L36 36 M64 32 L60 36 M32 64 L36 60 M64 64 L60 60" strokeWidth={STROKE_FINE} opacity="0.55" />
      {/* North-pointing diamond needle */}
      <path d="M48 26 L54 48 L48 70 L42 48 Z" />
      <path d="M48 26 L54 48 L42 48 Z" fill={ink} fillOpacity="0.12" stroke="none" />
      {/* Hub */}
      <circle cx="48" cy="48" r="1.8" fill={ink} stroke="none" />
    </>
  );
}

/* Regions — concentric contour, cartographic seal */
function RegionsMark() {
  return (
    <>
      {/* Topographic contours */}
      <path d="M30 56 Q40 44 50 48 Q60 52 66 42" strokeWidth={STROKE_FINE} opacity="0.7" />
      <path d="M28 64 Q40 52 52 56 Q64 60 70 50" />
      <path d="M32 48 Q42 38 52 40 Q60 42 64 36" strokeWidth={STROKE_FINE} opacity="0.55" />
      {/* Site marker — small carved diamond */}
      <path d="M52 44 L56 48 L52 52 L48 48 Z" fill={ink} fillOpacity="0.18" />
    </>
  );
}

/* Culture — woven Amazigh yaz inside an oral-tradition seal */
function CultureMark() {
  return (
    <>
      {/* Stylised yaz ⵣ */}
      <path d="M48 28 V62" />
      <path d="M34 34 L48 42 L62 34" />
      <path d="M34 66 Q48 78 62 66" />
      {/* Carved anchor dots */}
      <circle cx="48" cy="28" r="1.6" fill={ink} stroke="none" />
      <circle cx="34" cy="34" r="1.3" fill={ink} stroke="none" />
      <circle cx="62" cy="34" r="1.3" fill={ink} stroke="none" />
      {/* Geometric weave accents */}
      <path d="M30 50 H38 M58 50 H66" strokeWidth={STROKE_FINE} opacity="0.6" />
    </>
  );
}

export default PillarIcon;
