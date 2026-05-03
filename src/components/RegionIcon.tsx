type RegionIconProps = {
  regionId: string;
  className?: string;
};

const stroke = "var(--region-icon-ink)";
const sand = "var(--region-icon-sand)";
const sandDeep = "var(--region-icon-sand-deep)";
const olive = "var(--region-icon-olive)";
const oliveDeep = "var(--region-icon-olive-deep)";
const clay = "var(--region-icon-clay)";
const clayDeep = "var(--region-icon-clay-deep)";
const stone = "var(--region-icon-stone)";
const shade = "var(--region-icon-shade)";

const stroke = "#4a3329";

const cream = "#f6efe3";
const stone = "#d8c6ad";

const olive = "#6f8455";
const oliveDeep = "#4f6a3f";

const sand = "#d9b279";
const sandDeep = "#b98245";

const clay = "#c96f3f";
const clayDeep = "#9f4f2e";

export function RegionIcon({ regionId, className = "" }: RegionIconProps) {
  return (
    <svg viewBox="0 0 120 88" className={className} role="img" aria-hidden="true" focusable="false">
      {renderRegionIcon(regionId)}
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

function KabylieIcon() {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 72 L44 26 L64 72 Z" fill={cream} strokeWidth="3" />
      <path d="M48 72 L78 31 L118 72 Z" fill={cream} strokeWidth="3" />

      <path d="M44 27 L52 48 L59 42" stroke={oliveDeep} strokeWidth="4" />
      <path d="M78 32 L88 53 L96 47" stroke={oliveDeep} strokeWidth="4" />

      <path d="M20 72 L36 56 L47 62 L60 47" stroke={olive} strokeWidth="6" />
      <path d="M58 72 L76 55 L88 62 L105 50" stroke={oliveDeep} strokeWidth="6" />

      <path d="M28 82 l9-18 9 18z" fill={oliveDeep} stroke="none" />
      <path d="M48 83 l10-20 10 20z" fill={olive} stroke="none" />
      <path d="M82 83 l10-19 10 19z" fill={oliveDeep} stroke="none" />

      <path d="M22 88 H112" stroke={sandDeep} strokeWidth="2" opacity="0.45" />
    </g>
  );
}

function AuresIcon() {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 68 h62" stroke={sandDeep} strokeWidth="3" />
      <path d="M35 28 h48 l-4 7 H39z" fill={sandDeep} strokeWidth="2.4" />
      <path d="M39 35 v31M79 35 v31" stroke={clayDeep} strokeWidth="4" />
      <path d="M49 66 V49c0-9 6-15 11-15s11 6 11 15v17" fill="var(--card)" strokeWidth="3.2" />
      <path d="M25 66 V44M21 44h11M89 66V43M85 43h10" stroke={clay} strokeWidth="3.2" />
      <path d="M35 24 h50M40 20 h40" stroke={sandDeep} strokeWidth="3" />
      <path d="M23 75 c14-4 26-3 38-1M70 75 c9-3 18-3 28-1" stroke={clay} strokeWidth="2" opacity="0.7" />
      <path d="M17 79 h14M41 80 h9M83 80 h15" stroke={sandDeep} strokeWidth="2" opacity="0.45" />
    </g>
  );
}

function AlgiersIcon() {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 69 h84 v8 H18z" fill={shade} stroke="none" />
      <path d="M22 69 V45 h18 v24M40 69V34h24v35M64 69V44h18v25M82 69V51h16v18" fill={sand} strokeWidth="2.8" />
      <path d="M42 34 c2-12 19-12 21 0" fill="var(--card)" strokeWidth="2.6" />
      <path d="M48 34 c1-19 15-19 18 0" fill={stone} strokeWidth="2.4" />
      <path d="M55 14 v-6M51 18 h8" stroke={clayDeep} strokeWidth="2" />
      <path d="M25 45 c1-11 13-11 14 0M84 51 c1-10 12-10 13 0" fill="var(--card)" strokeWidth="2.3" />
      <path d="M29 69 V58c0-5 8-5 8 0v11M52 69V57c0-6 9-6 9 0v12" fill={clayDeep} strokeWidth="2.1" />
      <path d="M47 44h3M57 44h3M69 55h3M76 55h3M28 54h3M91 59h3" stroke={stroke} strokeWidth="2.2" />
      <path d="M20 77 c15 4 62 4 82 0" stroke={sandDeep} strokeWidth="2" opacity="0.5" />
    </g>
  );
}

function ConstantineIcon() {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 70 l13-20 11 20M84 70 l10-24 12 24" fill={shade} stroke="none" />
      <path d="M21 49 h78" stroke={stroke} strokeWidth="3" />
      <path d="M25 49 c14 24 46 24 67 0" stroke={clayDeep} strokeWidth="3" />
      <path d="M31 49 v-16M91 49 v-16" stroke={stroke} strokeWidth="3.4" />
      <path d="M26 33 h10M86 33 h10" stroke={stroke} strokeWidth="2.6" />
      <path d="M37 49 l-9 20M84 49 l12 20" stroke={stone} strokeWidth="3.4" />
      <path d="M22 56 h75" stroke={sandDeep} strokeWidth="2" opacity="0.55" />
      <path d="M47 29 c5-5 12-5 17 0M68 25 c4-3 9-3 13 0" stroke={sandDeep} strokeWidth="2" opacity="0.55" />
      <path d="M18 76 h88" stroke={sandDeep} strokeWidth="2" opacity="0.45" />
    </g>
  );
}

function WesternAlgeriaIcon() {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 70 h82" stroke={sandDeep} strokeWidth="2.8" />
      <path d="M25 70 V32 h22 v38" fill={sandDeep} strokeWidth="2.7" />
      <path d="M31 32 c2-12 12-12 15 0" fill={olive} strokeWidth="2.4" />
      <path d="M56 70 V35 h38 v35" fill={sand} strokeWidth="2.8" />
      <path d="M63 70 V55c0-8 8-14 13-14s13 6 13 14v15" fill="var(--card)" strokeWidth="2.8" />
      <path d="M60 39 h30M64 47 l5-5 5 5 5-5 5 5" stroke={oliveDeep} strokeWidth="2.4" />
      <path d="M31 43h11M31 52h11M31 61h11" stroke={oliveDeep} strokeWidth="2.3" />
      <path d="M19 70 c2-8 9-9 14-6M46 70 c2-7 9-8 13-5" stroke={clay} strokeWidth="2.2" />
      <path d="M77 53 c3 3 5 7 5 17" stroke={clayDeep} strokeWidth="2" opacity="0.6" />
    </g>
  );
}

function SaharaIcon() {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 73 c20-9 43-10 91 0" stroke={sandDeep} strokeWidth="3" />
      <path d="M34 67 c4-25 6-39 17-43 11 4 13 20 17 43" fill={clay} stroke={clayDeep} strokeWidth="3" />
      <path d="M68 67 c3-21 7-32 17-35 10 4 13 20 17 35" fill={clay} stroke={clayDeep} strokeWidth="3" />
      <path d="M46 40 c4 4 8 4 12 0M80 48 c4 3 8 3 12 0" stroke={clayDeep} strokeWidth="2" opacity="0.75" />
      <path d="M48 58 c4-5 10-5 14 0M76 60 c5-5 11-5 15 0" stroke={shade} strokeWidth="2.3" />
      <path d="M22 69 c4-12 12-12 17 0M31 57 v13M23 61 c6-3 11-3 16 0" stroke={oliveDeep} strokeWidth="2.4" />
      <path d="M52 52 l-3 9M55 52 l2 9M85 54 l-3 9M88 54 l3 9" stroke={sand} strokeWidth="2" />
      <path d="M30 79 h57M94 79 h11" stroke={sandDeep} strokeWidth="2" opacity="0.45" />
    </g>
  );
}
