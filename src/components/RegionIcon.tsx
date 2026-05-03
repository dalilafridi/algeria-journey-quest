type RegionIconProps = {
  regionId: string;
  className?: string;
};

// Unified museum-style palette
const ink = "var(--region-icon-ink)";          // deep brown outline
const sand = "var(--region-icon-sand)";         // warm sand
const sandDeep = "var(--region-icon-sand-deep)";
const olive = "var(--region-icon-olive)";       // muted olive
const oliveDeep = "var(--region-icon-olive-deep)";
const clay = "var(--region-icon-clay)";         // soft terracotta
const clayDeep = "var(--region-icon-clay-deep)";
const parchment = "var(--region-icon-stone)";   // parchment highlight
const shade = "var(--region-icon-shade)";

// Consistent stroke weights across the whole set
const STROKE_MAIN = 2.6;
const STROKE_ACCENT = 1.8;

export function RegionIcon({ regionId, className = "" }: RegionIconProps) {
  return (
    <svg
      viewBox="0 0 120 88"
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
        strokeWidth={STROKE_MAIN}
      >
        {renderRegionIcon(regionId)}
        {/* Shared baseline for visual alignment across all icons */}
        <path d="M14 78 H106" stroke={sandDeep} strokeWidth={STROKE_ACCENT} opacity="0.35" />
      </g>
    </svg>
  );
}

function renderRegionIcon(regionId: string) {
  switch (regionId) {
    case "kabylie":
      return <KabylieIcon />;
    case "aures":
      return <AuresIcon />;
    case "algiers":
      return <AlgiersIcon />;
    case "constantine":
      return <ConstantineIcon />;
    case "oran-west":
      return <WesternAlgeriaIcon />;
    case "sahara":
      return <SaharaIcon />;
    default:
      return <KabylieIcon />;
  }
}

/* Kabylie — Djurdjura ridges with a calm cedar */
function KabylieIcon() {
  return (
    <>
      {/* Soft mountain shade */}
      <path d="M16 70 L40 32 L56 56 L72 38 L102 70 Z" fill={shade} stroke="none" />
      {/* Main ridge */}
      <path d="M16 70 L40 30 L56 54 L72 36 L102 70" />
      {/* Secondary ridge highlights */}
      <path d="M40 30 L48 46 M72 36 L80 50" stroke={ink} strokeWidth={STROKE_ACCENT} />
      {/* Olive slope */}
      <path d="M22 70 L36 58 L50 64" stroke={olive} strokeWidth={STROKE_MAIN} />
      <path d="M58 70 L70 60 L84 66" stroke={oliveDeep} strokeWidth={STROKE_MAIN} />
      {/* Two cedars (calm, not busy) */}
      <path d="M44 70 L50 56 L56 70 Z" fill={oliveDeep} stroke="none" />
      <path d="M76 70 L82 58 L88 70 Z" fill={oliveDeep} stroke="none" />
    </>
  );
}

/* Aurès — Timgad Roman arch with two flanking columns */
function AuresIcon() {
  return (
    <>
      {/* Sand ground shade */}
      <path d="M14 70 H106 V74 H14 Z" fill={shade} stroke="none" />
      {/* Left column */}
      <path d="M28 70 V36 M24 36 H34 M24 70 H34" stroke={ink} strokeWidth={STROKE_MAIN} fill={parchment} />
      <path d="M28 36 V70" stroke={clay} strokeWidth={STROKE_ACCENT} />
      {/* Right column */}
      <path d="M92 70 V36 M86 36 H96 M86 70 H96" stroke={ink} strokeWidth={STROKE_MAIN} fill={parchment} />
      <path d="M92 36 V70" stroke={clay} strokeWidth={STROKE_ACCENT} />
      {/* Central arch */}
      <path
        d="M44 70 V44 C44 32 56 24 60 24 C64 24 76 32 76 44 V70 Z"
        fill={parchment}
      />
      <path d="M48 70 V46 C48 36 56 30 60 30 C64 30 72 36 72 46 V70" fill={shade} stroke={ink} strokeWidth={STROKE_ACCENT} />
      {/* Capitals */}
      <path d="M40 44 H80" stroke={clayDeep} strokeWidth={STROKE_ACCENT} />
      {/* Subtle horizon */}
      <path d="M16 70 H44 M76 70 H104" stroke={sandDeep} strokeWidth={STROKE_ACCENT} opacity="0.55" />
    </>
  );
}

/* Algiers — Casbah skyline with a single readable dome */
function AlgiersIcon() {
  return (
    <>
      <path d="M16 70 H104 V74 H16 Z" fill={shade} stroke="none" />
      {/* Stepped white houses */}
      <path d="M22 70 V52 H34 V70 Z" fill={parchment} />
      <path d="M34 70 V44 H46 V70 Z" fill={parchment} />
      <path d="M70 70 V46 H82 V70 Z" fill={parchment} />
      <path d="M82 70 V52 H96 V70 Z" fill={parchment} />
      {/* Central mosque + dome (focal point) */}
      <path d="M48 70 V40 H66 V70 Z" fill={sand} />
      <path d="M48 40 C48 28 66 28 66 40" fill={parchment} />
      <path d="M57 28 V22" stroke={ink} strokeWidth={STROKE_ACCENT} />
      <circle cx="57" cy="20" r="1.6" fill={ink} stroke="none" />
      {/* Outline pass */}
      <path d="M22 70 V52 H34 V44 H46 V40 M48 40 H66 V46 H70 V46 H82 V52 H96 V70" />
      <path d="M48 40 C48 28 66 28 66 40" fill="none" />
      {/* Small windows */}
      <path d="M28 60 H30 M40 56 H42 M55 52 H59 M76 56 H78 M88 60 H90" stroke={ink} strokeWidth={STROKE_ACCENT} />
    </>
  );
}

/* Constantine — bold suspension bridge over a gorge */
function ConstantineIcon() {
  return (
    <>
      {/* Cliffs */}
      <path d="M14 70 V52 H30 V70 Z" fill={shade} stroke="none" />
      <path d="M90 70 V52 H106 V70 Z" fill={shade} stroke="none" />
      <path d="M14 70 V52 H30 M90 52 H106 V70" />
      {/* Two pylons */}
      <path d="M34 52 V28 M86 52 V28" strokeWidth={STROKE_MAIN} />
      <path d="M30 28 H38 M82 28 H90" strokeWidth={STROKE_ACCENT} />
      {/* Bridge deck */}
      <path d="M22 52 H98" strokeWidth={STROKE_MAIN} />
      <path d="M22 56 H98" stroke={clayDeep} strokeWidth={STROKE_ACCENT} />
      {/* Suspension cables */}
      <path d="M34 28 C50 50 70 50 86 28" strokeWidth={STROKE_ACCENT} />
      <path d="M40 46 V52 M50 44 V52 M60 43 V52 M70 44 V52 M80 46 V52" stroke={ink} strokeWidth="1.2" />
    </>
  );
}

/* Western Algeria — Tlemcen / Zianid arch with minaret */
function WesternAlgeriaIcon() {
  return (
    <>
      <path d="M14 70 H106 V74 H14 Z" fill={shade} stroke="none" />
      {/* Minaret on the left */}
      <path d="M28 70 V30 H40 V70 Z" fill={parchment} />
      <path d="M28 30 H40 L34 22 Z" fill={clay} />
      <path d="M34 22 V16" stroke={ink} strokeWidth={STROKE_ACCENT} />
      <circle cx="34" cy="14" r="1.6" fill={ink} stroke="none" />
      {/* Minaret outline + windows */}
      <path d="M28 70 V30 H40 V70" />
      <path d="M30 40 H38 M30 50 H38 M30 60 H38" stroke={oliveDeep} strokeWidth={STROKE_ACCENT} />
      {/* Andalusian horseshoe arch */}
      <path d="M52 70 V46 C52 30 88 30 88 46 V70 Z" fill={sand} />
      <path
        d="M58 70 V50 C58 38 82 38 82 50 V70"
        fill={parchment}
        stroke={ink}
        strokeWidth={STROKE_ACCENT}
      />
      {/* Arch outline */}
      <path d="M52 70 V46 C52 30 88 30 88 46 V70" />
      {/* Geometric accent above arch */}
      <path d="M62 42 L70 36 L78 42" stroke={oliveDeep} strokeWidth={STROKE_ACCENT} fill="none" />
    </>
  );
}

/* Sahara — Tassili rock formations + calm dunes */
function SaharaIcon() {
  return (
    <>
      {/* Far dunes (calm) */}
      <path d="M14 70 C30 60 46 64 60 60 C76 56 92 64 106 60 V70 Z" fill={shade} stroke="none" />
      <path d="M14 70 C30 60 46 64 60 60 C76 56 92 64 106 60" stroke={sandDeep} strokeWidth={STROKE_ACCENT} />
      {/* Tall Tassili rock arch / mesa */}
      <path
        d="M40 70 V40 C40 32 46 28 52 28 C58 28 64 32 64 40 V70 Z"
        fill={clay}
      />
      <path d="M40 70 V40 C40 32 46 28 52 28 C58 28 64 32 64 40 V70" stroke={ink} />
      {/* Smaller rock */}
      <path d="M76 70 V48 C76 42 80 38 84 38 C88 38 92 42 92 48 V70 Z" fill={clayDeep} />
      <path d="M76 70 V48 C76 42 80 38 84 38 C88 38 92 42 92 48 V70" stroke={ink} />
      {/* Rock striations (kept minimal) */}
      <path d="M44 50 H60 M80 56 H88" stroke={parchment} strokeWidth={STROKE_ACCENT} />
      {/* Sun */}
      <circle cx="22" cy="32" r="5" fill={sand} stroke={ink} strokeWidth={STROKE_ACCENT} />
    </>
  );
}
