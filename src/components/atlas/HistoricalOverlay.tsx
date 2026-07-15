import { t, type Lang } from "@/lib/i18n";
import { ATLAS_PERIODS, MARKER_META, type AtlasMarker, type AtlasPeriod } from "@/data/atlasPeriods";

/**
 * SVG group rendered inside the atlas map. Every period is always mounted so
 * that switching between them cross-fades smoothly instead of pop-mounting.
 * The Algeria clipPath ("atlas-clip") defined in atlas.tsx trims the
 * territory polygons to the country outline.
 */
export function HistoricalOverlay({
  activeId,
  lang,
}: {
  activeId: string | null;
  lang: Lang;
}) {
  return (
    <g style={{ pointerEvents: "none" }}>
      {ATLAS_PERIODS.map((p) => (
        <PeriodLayer key={p.id} period={p} active={p.id === activeId} lang={lang} />
      ))}
    </g>
  );
}

function PeriodLayer({
  period,
  active,
  lang,
}: {
  period: AtlasPeriod;
  active: boolean;
  lang: Lang;
}) {
  return (
    <g
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 520ms ease",
      }}
      aria-hidden={!active}
    >
      {/* Territory extent, clipped to Algeria */}
      <g clipPath="url(#atlas-clip)">
        <path
          d={period.territoryPath}
          fill={period.color}
          opacity="0.22"
        />
        <path
          d={period.territoryPath}
          fill="none"
          stroke={period.color}
          strokeWidth="0.55"
          strokeLinejoin="round"
          strokeDasharray="1.6 1.2"
          opacity="0.85"
        />
      </g>

      {/* Markers */}
      {period.markers.map((m, i) => (
        <Marker key={i} marker={m} lang={lang} color={period.color} />
      ))}
    </g>
  );
}

function Marker({
  marker,
  lang,
  color,
}: {
  marker: AtlasMarker;
  lang: Lang;
  color: string;
}) {
  const isCapital = marker.kind === "capital";
  const isBattle = marker.kind === "battle";
  const size = isCapital ? 1.6 : isBattle ? 1.4 : 1.1;
  const label = t(marker.name, lang);

  return (
    <g>
      <title>{`${MARKER_META[marker.kind].glyph} ${label}`}</title>
      {/* Soft halo */}
      <circle
        cx={marker.x}
        cy={marker.y}
        r={size * 1.9}
        fill={color}
        opacity="0.18"
      />
      {isCapital ? (
        <Star cx={marker.x} cy={marker.y} r={size} fill={color} />
      ) : isBattle ? (
        <Cross cx={marker.x} cy={marker.y} r={size} fill={color} />
      ) : marker.kind === "site" ? (
        <Diamond cx={marker.x} cy={marker.y} r={size} fill={color} />
      ) : (
        <circle
          cx={marker.x}
          cy={marker.y}
          r={size * 0.55}
          fill="#fff8e6"
          stroke={color}
          strokeWidth="0.35"
        />
      )}
      <text
        x={marker.x}
        y={marker.y - size - 0.6}
        textAnchor="middle"
        fontSize="1.55"
        fontWeight={isCapital ? 700 : 600}
        letterSpacing="0.08"
        fill="color-mix(in oklab, var(--foreground) 80%, transparent)"
        style={{ paintOrder: "stroke", pointerEvents: "none" }}
        stroke="color-mix(in oklab, var(--card) 88%, transparent)"
        strokeWidth="0.5"
      >
        {label}
      </text>
    </g>
  );
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  // 5-point star centered at cx,cy with outer radius r
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${cx + rr * Math.cos(angle)},${cy + rr * Math.sin(angle)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} stroke="#1a1206" strokeWidth="0.14" />;
}

function Diamond({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  return (
    <polygon
      points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
      fill={fill}
      stroke="#1a1206"
      strokeWidth="0.14"
    />
  );
}

function Cross({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const s = r * 0.35;
  return (
    <g stroke={fill} strokeWidth={s} strokeLinecap="round" fill="none">
      <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
      <line x1={cx - r} y1={cy + r} x2={cx + r} y2={cy - r} />
    </g>
  );
}
