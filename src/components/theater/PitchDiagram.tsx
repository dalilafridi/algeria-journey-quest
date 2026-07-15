/**
 * PitchDiagram — very simple 100x64 pitch used for formations and passing
 * sequences. Coordinates are in the shared 0..100 space (x = end-to-end,
 * y = width). Includes a <desc> text alternative for screen readers.
 */

import type { LineupPlayer, TeamInfo } from "@/data/matchTheater/types";

export type PitchPoint = { x: number; y: number; label?: string };

export function PitchDiagram({
  team,
  players,
  sequence,
  ariaDescription,
  className,
}: {
  team?: TeamInfo;
  players?: (LineupPlayer & { x: number; y: number })[];
  sequence?: PitchPoint[];
  ariaDescription: string;
  className?: string;
}) {
  const accent = team?.colors.primary ?? "#c9a24a";
  return (
    <svg
      viewBox="0 0 100 64"
      role="img"
      aria-label={ariaDescription}
      className={`h-auto w-full ${className ?? ""}`}
    >
      <desc>{ariaDescription}</desc>
      {/* Pitch */}
      <rect x="0" y="0" width="100" height="64" fill="#0a2318" />
      <rect
        x="1"
        y="1"
        width="98"
        height="62"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.4"
      />
      <line x1="50" y1="1" x2="50" y2="63" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
      <circle cx="50" cy="32" r="7" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
      <rect x="1" y="18" width="14" height="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
      <rect x="85" y="18" width="14" height="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />

      {/* Passing sequence (arrows connecting points) */}
      {sequence && sequence.length > 1 && (
        <g stroke={accent} strokeWidth="0.6" fill="none">
          {sequence.slice(0, -1).map((p, i) => {
            const n = sequence[i + 1];
            return (
              <line
                key={i}
                x1={p.x}
                y1={p.y}
                x2={n.x}
                y2={n.y}
                strokeDasharray="1.5 1"
                markerEnd="url(#arrow)"
              />
            );
          })}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={accent} />
            </marker>
          </defs>
        </g>
      )}
      {sequence?.map((p, i) => (
        <circle key={`s-${i}`} cx={p.x} cy={p.y} r="1.3" fill={accent} />
      ))}

      {/* Players */}
      {players?.map((p) => (
        <g key={p.id}>
          <circle
            cx={p.x}
            cy={p.y}
            r="2.2"
            fill={accent}
            stroke="#000"
            strokeWidth="0.3"
          />
          {p.number != null && (
            <text
              x={p.x}
              y={p.y + 0.8}
              textAnchor="middle"
              fontSize="2.2"
              fill="#fff"
              fontWeight="bold"
            >
              {p.number}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

/**
 * Build a rough 4-3-3 layout from a starting XI (or any 11 players ordered
 * GK → DEF → MID → FWD by role). Used to render a formation preview when
 * detailed positional data is not available.
 */
export function layoutFormation(
  starting: LineupPlayer[],
  side: "home" | "away",
): (LineupPlayer & { x: number; y: number })[] {
  const gks = starting.filter((p) => p.role === "goalkeeper");
  const defs = starting.filter((p) => p.role === "defender");
  const mids = starting.filter((p) => p.role === "midfielder");
  const fwds = starting.filter((p) => p.role === "forward");
  const rowXs = side === "home" ? [8, 26, 44, 62] : [92, 74, 56, 38];
  const rows = [gks, defs, mids, fwds];
  const out: (LineupPlayer & { x: number; y: number })[] = [];
  rows.forEach((row, rIdx) => {
    const x = rowXs[rIdx];
    row.forEach((player, i) => {
      const step = 60 / (row.length + 1);
      const y = 2 + step * (i + 1);
      out.push({ ...player, x, y });
    });
  });
  return out;
}
