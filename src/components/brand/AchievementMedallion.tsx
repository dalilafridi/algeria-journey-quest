/**
 * AchievementMedallion — museum-language completion moments.
 *
 * Replaces trophies / stars / XP-style rewards with an engraved artifact: when
 * a visitor finishes an era, explores a collection, completes the guided tour
 * or "masters" a region, they earn a coin for the collection — never a game
 * badge. Renders either inline (a plaque) or as a centered reveal moment.
 */

import { MedallionFrame, type MedallionTone } from "@/components/brand/MedallionFrame";

export type AchievementKind =
  | "era-completed"
  | "collection-explored"
  | "exhibition-finished"
  | "region-mastered";

const GLYPH: Record<AchievementKind, string> = {
  "era-completed": "ⵣ",
  "collection-explored": "❖",
  "exhibition-finished": "✦",
  "region-mastered": "◈",
};

const TONE: Record<AchievementKind, MedallionTone> = {
  "era-completed": "gold",
  "collection-explored": "bronze",
  "exhibition-finished": "gold",
  "region-mastered": "bronze",
};

export function AchievementMedallion({
  kind,
  title,
  subtitle,
  size = 72,
  variant = "plaque",
  className,
}: {
  kind: AchievementKind;
  title: string;
  subtitle?: string;
  size?: number;
  /** "plaque" = inline wall label, "reveal" = centered moment. */
  variant?: "plaque" | "reveal";
  className?: string;
}) {
  const medallion = (
    <MedallionFrame
      size={size}
      tone={TONE[kind]}
      glow
      animate="unlock"
      inset={0.22}
      label={title}
    >
      <span
        aria-hidden
        className="leading-none select-none"
        style={{
          fontSize: size * 0.4,
          color: "color-mix(in oklab, var(--brand-gold-deep) 55%, #2a1c0c)",
          textShadow: "0 1px 0 color-mix(in oklab, var(--brand-gold-bright) 60%, transparent)",
        }}
      >
        {GLYPH[kind]}
      </span>
    </MedallionFrame>
  );

  if (variant === "reveal") {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className ?? ""}`}>
        {medallion}
        <div>
          <div
            className="text-base sm:text-lg font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {title}
          </div>
          {subtitle && <div className="mt-0.5 text-sm text-muted-foreground">{subtitle}</div>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3.5 rounded-2xl border px-4 py-3 ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 32%, var(--border))",
        background: "color-mix(in oklab, var(--brand-gold) 7%, var(--card))",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="shrink-0">{medallion}</div>
      <div className="min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}
        >
          {title}
        </div>
        {subtitle && (
          <div className="mt-0.5 text-sm font-medium text-foreground/85 leading-snug">{subtitle}</div>
        )}
      </div>
    </div>
  );
}

export default AchievementMedallion;
