/**
 * Era medallion — engraved museum tokens, one per era.
 *
 * Each era shares the same medallion frame (beaded rim, inner ring, laurel
 * arc) but carries a distinct material treatment and engraved emblem so the
 * collection reads as a curated set of historical seals rather than a row of
 * identical icons. Used as accent identity for timeline milestones, unlock
 * moments, and collectible UI — not as page decoration.
 */

export type EraBadgeKind =
  | "earlynorthafrica"
  | "numidia"
  | "roman"
  | "islamic"
  | "ottoman"
  | "french"
  | "independence";

type Material = {
  /** Disc gradient — outer to inner */
  disc: string;
  /** Ring + rim ink */
  rim: string;
  /** Engraved emblem stroke + fill */
  ink: string;
  /** Soft highlight color */
  highlight: string;
  /** Shadow tint for engraved depth */
  shadow: string;
  /** Optional flag-bar accent (independence) */
  accent?: { left: string; right: string };
};

const MATERIALS: Record<EraBadgeKind, Material> = {
  // Patinated bronze — deep earth, rock-art era
  earlynorthafrica: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.72 0.07 55) 0%, oklch(0.5 0.07 50) 45%, oklch(0.32 0.05 45) 100%)",
    rim: "oklch(0.28 0.04 45)",
    ink: "oklch(0.88 0.06 70)",
    highlight: "oklch(0.95 0.04 80 / 0.45)",
    shadow: "oklch(0.18 0.03 40 / 0.55)",
  },
  // Warm aged bronze — Numidian kingdoms
  numidia: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.82 0.11 70) 0%, oklch(0.6 0.12 55) 45%, oklch(0.38 0.09 45) 100%)",
    rim: "oklch(0.32 0.06 45)",
    ink: "oklch(0.96 0.07 80)",
    highlight: "oklch(0.98 0.05 85 / 0.5)",
    shadow: "oklch(0.2 0.04 40 / 0.55)",
  },
  // Pale stone / silver — Roman
  roman: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.94 0.005 85) 0%, oklch(0.78 0.008 85) 45%, oklch(0.55 0.01 80) 100%)",
    rim: "oklch(0.38 0.01 80)",
    ink: "oklch(0.32 0.01 80)",
    highlight: "oklch(1 0 0 / 0.55)",
    shadow: "oklch(0.4 0.01 80 / 0.45)",
  },
  // Muted gold — Islamic geometry
  islamic: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.92 0.13 88) 0%, oklch(0.78 0.14 80) 45%, oklch(0.5 0.11 65) 100%)",
    rim: "oklch(0.34 0.06 60)",
    ink: "oklch(0.28 0.04 60)",
    highlight: "oklch(0.99 0.06 90 / 0.55)",
    shadow: "oklch(0.22 0.04 55 / 0.5)",
  },
  // Deep imperial bronze — Ottoman
  ottoman: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.75 0.13 50) 0%, oklch(0.5 0.13 40) 50%, oklch(0.28 0.08 35) 100%)",
    rim: "oklch(0.22 0.05 35)",
    ink: "oklch(0.95 0.1 80)",
    highlight: "oklch(0.98 0.08 85 / 0.45)",
    shadow: "oklch(0.15 0.04 35 / 0.6)",
  },
  // Restrained blue-pewter — Colonial era
  french: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.82 0.02 240) 0%, oklch(0.62 0.03 240) 45%, oklch(0.4 0.04 245) 100%)",
    rim: "oklch(0.28 0.04 245)",
    ink: "oklch(0.92 0.02 240)",
    highlight: "oklch(0.98 0.01 240 / 0.5)",
    shadow: "oklch(0.18 0.04 245 / 0.55)",
  },
  // Warm national bronze + flag accents — Independence
  independence: {
    disc: "radial-gradient(circle at 32% 28%, oklch(0.88 0.13 85) 0%, oklch(0.68 0.14 70) 45%, oklch(0.42 0.1 55) 100%)",
    rim: "oklch(0.3 0.06 50)",
    ink: "oklch(0.98 0.06 80)",
    highlight: "oklch(1 0.05 90 / 0.55)",
    shadow: "oklch(0.2 0.04 45 / 0.55)",
    accent: { left: "oklch(0.55 0.14 150)", right: "oklch(0.62 0.18 25)" },
  },
};

type Props = {
  kind: EraBadgeKind;
  /** When false the medallion is shown desaturated/locked. */
  unlocked?: boolean;
  size?: number;
  /** Adds the unlock burst animation. */
  animate?: boolean;
  className?: string;
  label?: string;
  /** When true, render the era label below the medallion. */
  showLabel?: boolean;
};

export function EraBadge({
  kind,
  unlocked = true,
  size = 88,
  animate = false,
  className,
  label,
  showLabel = false,
}: Props) {
  const m = MATERIALS[kind];

  return (
    <div
      className={`relative inline-flex flex-col items-center ${
        animate ? "animate-badge-unlock" : ""
      } ${className ?? ""}`}
      style={{ width: size }}
      aria-label={label ?? kind}
    >
      <div
        className={`relative rounded-full transition-all icon-glow ${
          unlocked ? "" : "grayscale opacity-55"
        }`}
        style={{
          width: size,
          height: size,
          background: m.disc,
          boxShadow: unlocked
            ? `inset 0 1px 1px ${m.highlight}, inset 0 -2px 4px ${m.shadow}, 0 0 0 1px ${m.rim}, 0 6px 16px -8px ${m.shadow}`
            : `inset 0 -2px 4px ${m.shadow}, 0 0 0 1px ${m.rim}`,
        }}
      >
        {/* Engraved emblem */}
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <defs>
            <filter id={`engrave-${kind}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>

          {/* Inner ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={m.rim}
            strokeWidth="0.8"
            opacity="0.55"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={m.ink}
            strokeWidth="0.5"
            opacity="0.35"
          />

          {/* Beaded rim — 16 small dots evenly placed */}
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const cx = 50 + Math.cos(a) * 45.5;
            const cy = 50 + Math.sin(a) * 45.5;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="0.9"
                fill={m.rim}
                opacity="0.7"
              />
            );
          })}

          {/* Optional flag-bar accent (Independence only) */}
          {m.accent && (
            <g opacity="0.85">
              <rect x="22" y="76" width="12" height="3" rx="1" fill={m.accent.left} />
              <rect x="66" y="76" width="12" height="3" rx="1" fill={m.accent.right} />
            </g>
          )}

          {/* Laurel arcs (unifier across all eras) */}
          <g
            fill="none"
            stroke={m.rim}
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.45"
          >
            <path d="M22 72 Q26 78 32 79" />
            <path d="M78 72 Q74 78 68 79" />
            <path d="M26 73 L24.5 70.5 M29 76 L27.2 73.5 M32 78 L30.5 75.5" />
            <path d="M74 73 L75.5 70.5 M71 76 L72.8 73.5 M68 78 L69.5 75.5" />
          </g>

          {/* Central emblem */}
          <g filter={`url(#engrave-${kind})`}>
            {renderEmblem(kind, m)}
          </g>
        </svg>

        {/* Locked overlay */}
        {!unlocked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full"
            aria-hidden
          >
            <svg width={size * 0.28} height={size * 0.28} viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke={m.ink} strokeWidth="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={m.ink} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {(showLabel && label) ? (
        <div
          className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-center"
          style={{ color: "var(--brand-gold-deep, oklch(0.55 0.1 60))" }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Engraved emblems ---------------- */

function renderEmblem(kind: EraBadgeKind, m: Material) {
  const s = { stroke: m.ink, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (kind) {
    case "earlynorthafrica":
      // Rock-art horned figure (Tassili-inspired)
      return (
        <g {...s} strokeWidth="1.8">
          {/* Horns */}
          <path d="M40 36 Q44 28 50 30 Q56 28 60 36" />
          {/* Head */}
          <circle cx="50" cy="42" r="4.2" fill={m.ink} stroke="none" />
          {/* Body */}
          <path d="M50 46 L50 62" />
          {/* Arms / outstretched */}
          <path d="M40 54 L50 50 L60 54" />
          {/* Sun above */}
          <circle cx="50" cy="22" r="2.2" fill={m.ink} stroke="none" />
        </g>
      );

    case "numidia":
      // Stylized yaz ⵣ — Amazigh seal
      return (
        <g {...s} strokeWidth="3.2">
          <path d="M30 64 Q50 80 70 64" />
          <path d="M50 26 L50 64" />
          <path d="M34 30 L50 40" />
          <path d="M66 30 L50 40" />
        </g>
      );

    case "roman":
      // Temple — pediment + three columns
      return (
        <g {...s} strokeWidth="1.7">
          {/* Pediment */}
          <path d="M30 38 L50 26 L70 38 Z" />
          {/* Architrave */}
          <path d="M30 40 H70" strokeWidth="1.2" />
          {/* Columns */}
          <path d="M35 42 V62 M50 42 V62 M65 42 V62" />
          {/* Base */}
          <path d="M28 64 H72" strokeWidth="1.5" />
          <path d="M30 68 H70" strokeWidth="1" opacity="0.7" />
        </g>
      );

    case "islamic":
      // Eight-point khatam star (overlapping squares)
      return (
        <g {...s} strokeWidth="1.7">
          <path d="M50 26 L60 36 L74 36 L64 46 L74 56 L60 56 L50 70 L40 56 L26 56 L36 46 L26 36 L40 36 Z" />
          <path d="M50 32 L58 42 L58 54 L50 64 L42 54 L42 42 Z" strokeWidth="1.2" opacity="0.85" />
          <circle cx="50" cy="48" r="1.8" fill={m.ink} stroke="none" />
        </g>
      );

    case "ottoman":
      // Crescent + star — imperial seal
      return (
        <g {...s} strokeWidth="2">
          {/* Crescent (open to the right) */}
          <path d="M58 30 A18 18 0 1 0 58 66 A14 14 0 1 1 58 30 Z" fill={m.ink} stroke="none" />
          {/* Five-point star */}
          <path
            d="M70 40 L72.5 46 L79 46 L73.8 50 L75.8 56 L70 52.5 L64.2 56 L66.2 50 L61 46 L67.5 46 Z"
            fill={m.ink}
            stroke="none"
          />
        </g>
      );

    case "french":
      // Civic five-point star inside arch
      return (
        <g {...s} strokeWidth="1.6">
          {/* Civic arch */}
          <path d="M30 66 V46 C30 32 70 32 70 46 V66" />
          <path d="M28 68 H72" strokeWidth="1.2" />
          {/* Star */}
          <path
            d="M50 38 L52.4 44.5 L59.5 44.5 L53.8 48.5 L56 55 L50 51 L44 55 L46.2 48.5 L40.5 44.5 L47.6 44.5 Z"
            fill={m.ink}
            stroke="none"
            opacity="0.9"
          />
        </g>
      );

    case "independence":
      // Crescent + five-point star (Algerian flag motif), centered
      return (
        <g {...s} strokeWidth="2">
          {/* Crescent */}
          <path d="M52 30 A18 18 0 1 0 52 66 A14 14 0 1 1 52 30 Z" fill={m.ink} stroke="none" />
          {/* Star (right of crescent opening) */}
          <path
            d="M64 40 L66.5 46.5 L73.5 46.5 L67.8 50.7 L70 57.2 L64 53.2 L58 57.2 L60.2 50.7 L54.5 46.5 L61.5 46.5 Z"
            fill={m.ink}
            stroke="none"
          />
        </g>
      );
  }
}

export default EraBadge;
