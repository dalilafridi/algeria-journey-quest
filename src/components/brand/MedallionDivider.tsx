/**
 * MedallionDivider — an engraved section separator from the museum system.
 *
 * Replaces plain rules between sections with a manuscript-style ornament: a
 * hairline engraved line meeting a small central medallion (the Amazigh yaz by
 * default). Subtle by design — it punctuates, it does not shout.
 */

import { MedallionFrame } from "@/components/brand/MedallionFrame";

export function MedallionDivider({
  glyph = "ⵣ",
  size = 34,
  className,
}: {
  /** Central engraved mark. */
  glyph?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`} aria-hidden>
      <Rule dir="start" />
      <MedallionFrame size={size} tone="gold" inset={0.2}>
        <span
          className="leading-none select-none"
          style={{
            fontSize: size * 0.46,
            color: "color-mix(in oklab, var(--brand-gold-deep) 60%, #2a1c0c)",
            textShadow: "0 1px 0 color-mix(in oklab, var(--brand-gold-bright) 55%, transparent)",
          }}
        >
          {glyph}
        </span>
      </MedallionFrame>
      <Rule dir="end" />
    </div>
  );
}

function Rule({ dir }: { dir: "start" | "end" }) {
  return (
    <span
      className="relative h-px w-16 sm:w-28"
      style={{
        background:
          dir === "start"
            ? "linear-gradient(90deg, transparent, color-mix(in oklab, var(--brand-gold) 55%, transparent))"
            : "linear-gradient(90deg, color-mix(in oklab, var(--brand-gold) 55%, transparent), transparent)",
      }}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        style={{
          [dir === "start" ? "right" : "left"]: 0,
          background: "color-mix(in oklab, var(--brand-gold) 70%, transparent)",
        } as React.CSSProperties}
      />
    </span>
  );
}

export default MedallionDivider;
