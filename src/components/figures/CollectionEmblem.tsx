/**
 * CollectionEmblem — the engraved seal for a Hall of Legends gallery.
 *
 * Each curated collection (Resistance Leaders, Great Thinkers, Women Who
 * Shaped Algeria, Voices of Culture, Kings & Rulers, Scholars…) is marked by
 * an artifact coin from the shared museum medallion system, so a collection
 * reads as an object in the exhibition rather than a tab in a menu.
 */

import { MedallionFrame, type MedallionTone } from "@/components/brand/MedallionFrame";

export function CollectionEmblem({
  emblem,
  accent = "var(--brand-gold-deep)",
  tone = "gold",
  size = 64,
  glow = false,
  interactive = false,
  animate = "none",
  label,
  className,
}: {
  /** Glyph engraved at the center (kept within the bronze symbol set). */
  emblem: string;
  accent?: string;
  tone?: MedallionTone;
  size?: number;
  glow?: boolean;
  interactive?: boolean;
  animate?: "reveal" | "unlock" | "none";
  label?: string;
  className?: string;
}) {
  return (
    <MedallionFrame
      size={size}
      tone={tone}
      glow={glow}
      interactive={interactive}
      animate={animate}
      label={label}
      className={className}
      inset={0.16}
    >
      <span
        aria-hidden
        className="leading-none select-none"
        style={{
          fontSize: size * 0.46,
          color: "color-mix(in oklab, var(--brand-gold-deep) 55%, #2a1c0c)",
          textShadow:
            "0 1px 0 color-mix(in oklab, var(--brand-gold-bright) 60%, transparent), 0 -1px 1px rgba(0,0,0,0.35)",
          filter: `drop-shadow(0 0 6px color-mix(in oklab, ${accent} 35%, transparent))`,
        }}
      >
        {emblem}
      </span>
    </MedallionFrame>
  );
}

export default CollectionEmblem;
