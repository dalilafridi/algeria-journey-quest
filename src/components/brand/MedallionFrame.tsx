/**
 * MedallionFrame — the foundation of the DZ Odyssey museum artifact system.
 *
 * Every symbolic element in the app (era emblems, region emblems, figure
 * markers, timeline milestones, collection markers, achievement moments and
 * featured exhibition seals) is presented inside this one frame so the whole
 * product reads as a single curated collection of engraved bronze coins.
 *
 * It owns the shared *material language*:
 *   - circular framing with a beaded rim + laurel arc
 *   - metallic disc gradient (bronze / gold / stone / patina tones)
 *   - depth via layered inset highlight + inset shadow
 *   - a soft drop shadow ("shadow language")
 *   - an engraved inner ring
 *
 * Callers drop their own engraving into the center stage (an emoji, an SVG
 * glyph, an emblem PNG, …). The frame guarantees they all look like artifacts
 * from the same exhibition rather than UI icons.
 */

import type { CSSProperties, ReactNode } from "react";

export type MedallionTone = "bronze" | "gold" | "stone" | "patina" | "ink";

type ToneSpec = {
  /** Radial disc gradient, outer → inner. */
  disc: string;
  /** Rim / ring ink. */
  rim: string;
  /** Soft top-light highlight. */
  highlight: string;
  /** Engraved-depth shadow tint. */
  shadow: string;
  /** Glow color when `glow` is on. */
  glow: string;
};

const TONES: Record<MedallionTone, ToneSpec> = {
  // Warm bronze-gold — the house default (figures, collections, featured)
  gold: {
    disc: "radial-gradient(circle at 35% 28%, oklch(0.92 0.13 86) 0%, oklch(0.78 0.14 78) 42%, oklch(0.52 0.12 60) 100%)",
    rim: "oklch(0.34 0.06 55)",
    highlight: "oklch(0.99 0.05 90 / 0.55)",
    shadow: "oklch(0.2 0.04 45 / 0.55)",
    glow: "oklch(0.85 0.16 80 / 0.5)",
  },
  // Aged bronze — deeper, archival
  bronze: {
    disc: "radial-gradient(circle at 35% 28%, oklch(0.82 0.11 70) 0%, oklch(0.58 0.12 52) 45%, oklch(0.36 0.08 44) 100%)",
    rim: "oklch(0.3 0.05 44)",
    highlight: "oklch(0.96 0.05 82 / 0.5)",
    shadow: "oklch(0.18 0.03 40 / 0.6)",
    glow: "oklch(0.7 0.13 55 / 0.45)",
  },
  // Pale stone / silver — antiquity
  stone: {
    disc: "radial-gradient(circle at 35% 28%, oklch(0.95 0.006 85) 0%, oklch(0.8 0.008 85) 45%, oklch(0.57 0.01 80) 100%)",
    rim: "oklch(0.4 0.01 80)",
    highlight: "oklch(1 0 0 / 0.6)",
    shadow: "oklch(0.42 0.01 80 / 0.45)",
    glow: "oklch(0.85 0.01 85 / 0.4)",
  },
  // Dark patina — locked / muted states
  patina: {
    disc: "radial-gradient(circle at 35% 28%, oklch(0.55 0.04 55) 0%, oklch(0.4 0.04 50) 45%, oklch(0.28 0.03 45) 100%)",
    rim: "oklch(0.24 0.03 45)",
    highlight: "oklch(0.85 0.03 75 / 0.3)",
    shadow: "oklch(0.15 0.02 40 / 0.6)",
    glow: "oklch(0.5 0.05 55 / 0.3)",
  },
  // Deep ink — night surfaces (splash / loaders on dark backgrounds)
  ink: {
    disc: "radial-gradient(circle at 35% 28%, oklch(0.4 0.05 60) 0%, oklch(0.28 0.04 55) 45%, oklch(0.18 0.03 50) 100%)",
    rim: "oklch(0.62 0.13 70)",
    highlight: "oklch(0.9 0.12 82 / 0.4)",
    shadow: "oklch(0.1 0.02 45 / 0.7)",
    glow: "oklch(0.85 0.16 80 / 0.55)",
  },
};

export type MedallionFrameProps = {
  /** Diameter in px. */
  size?: number;
  /** Metallic treatment. */
  tone?: MedallionTone;
  /** Center-stage artifact (emoji, glyph, svg, emblem image…). */
  children?: ReactNode;
  /** Locked artifacts read desaturated with a patina cast. */
  locked?: boolean;
  /** Reveal / unlock animation on mount. */
  animate?: "reveal" | "unlock" | "none";
  /** Adds the warm bronze glow halo. */
  glow?: boolean;
  /** Grows + lifts on hover (use inside links/buttons). */
  interactive?: boolean;
  /** Inset padding of the inner stage as a fraction of size (0–0.3). */
  inset?: number;
  /** Optional artifact seal pinned to the bottom-end corner. */
  seal?: ReactNode;
  /** Accessible label. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export function MedallionFrame({
  size = 88,
  tone = "gold",
  children,
  locked = false,
  animate = "none",
  glow = false,
  interactive = false,
  inset = 0.12,
  seal,
  label,
  className,
  style,
}: MedallionFrameProps) {
  const m = locked ? TONES.patina : TONES[tone];
  const pad = Math.round(size * Math.min(0.3, Math.max(0, inset)));

  const animClass =
    animate === "reveal"
      ? "animate-medallion-reveal"
      : animate === "unlock"
        ? "animate-badge-unlock"
        : "";

  return (
    <span
      className={`relative inline-flex items-center justify-center align-middle ${animClass} ${className ?? ""}`}
      style={{ width: size, height: size, ...style }}
      role="img"
      aria-label={label}
    >
      <span
        className={`relative block rounded-full transition-transform duration-500 ${
          interactive ? "group-hover:scale-[1.06] group-focus-visible:scale-[1.06]" : ""
        } ${locked ? "grayscale opacity-60" : ""}`}
        style={{
          width: size,
          height: size,
          background: m.disc,
          boxShadow: [
            `inset 0 1px 1px ${m.highlight}`,
            `inset 0 -3px 6px ${m.shadow}`,
            `0 0 0 1px ${m.rim}`,
            `0 8px 20px -10px ${m.shadow}`,
            glow ? `0 0 26px -4px ${m.glow}` : "",
          ]
            .filter(Boolean)
            .join(", "),
        }}
      >
        {/* Engraved rim + laurel (shared across the whole collection) */}
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Inner rings */}
          <circle cx="50" cy="50" r="44.5" fill="none" stroke={m.rim} strokeWidth="0.7" opacity="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke={m.highlight} strokeWidth="0.5" opacity="0.5" />

          {/* Beaded rim */}
          {Array.from({ length: 28 }).map((_, i) => {
            const a = (i / 28) * Math.PI * 2;
            const cx = Number((50 + Math.cos(a) * 47).toFixed(3));
            const cy = Number((50 + Math.sin(a) * 47).toFixed(3));
            return <circle key={i} cx={cx} cy={cy} r="0.7" fill={m.rim} opacity="0.65" />;
          })}

          {/* Laurel arcs — the unifier */}
          <g fill="none" stroke={m.rim} strokeWidth="0.7" strokeLinecap="round" opacity="0.4">
            <path d="M22 73 Q26 79 33 80" />
            <path d="M78 73 Q74 79 67 80" />
            <path d="M27 74 L25.4 71.4 M30 77 L28.2 74.4 M33 79 L31.4 76.4" />
            <path d="M73 74 L74.6 71.4 M70 77 L71.8 74.4 M67 79 L68.6 76.4" />
          </g>

          {/* Engraved top sheen */}
          <ellipse cx="42" cy="34" rx="22" ry="12" fill={m.highlight} opacity="0.35" />
        </svg>

        {/* Center stage */}
        <span
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
          style={{ padding: pad }}
        >
          {children}
        </span>
      </span>

      {seal && (
        <span className="absolute -bottom-1.5 -end-1.5 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          {seal}
        </span>
      )}
    </span>
  );
}

export default MedallionFrame;
