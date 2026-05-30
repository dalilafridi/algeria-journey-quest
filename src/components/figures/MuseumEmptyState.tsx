/**
 * MuseumEmptyState — exhibition-quality empty / fallback states.
 *
 * Instead of generic "No results" UI, an empty room in the Hall of Legends is
 * still presented as part of the museum: an engraved medallion, a curatorial
 * line and (optionally) a way back into the collection. Used for empty search
 * results, missing portraits and empty collections.
 */

import type { ReactNode } from "react";
import { MedallionFrame, type MedallionTone } from "@/components/brand/MedallionFrame";

export function MuseumEmptyState({
  glyph = "ⵣ",
  tone = "patina",
  title,
  body,
  action,
  size = 88,
  className,
}: {
  glyph?: string;
  tone?: MedallionTone;
  title: string;
  body?: string;
  action?: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border text-center px-6 py-12 sm:py-14 ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 24%, var(--border))",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--brand-gold) 6%, var(--card)), var(--card))",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12rem] font-black leading-none select-none opacity-[0.04]"
        style={{ color: "var(--brand-gold-deep)" }}
      >
        {glyph}
      </span>
      <div className="relative flex flex-col items-center gap-4">
        <MedallionFrame size={size} tone={tone} inset={0.24} animate="reveal">
          <span
            aria-hidden
            className="leading-none select-none"
            style={{
              fontSize: size * 0.42,
              color: "color-mix(in oklab, var(--brand-gold-deep) 55%, #2a1c0c)",
            }}
          >
            {glyph}
          </span>
        </MedallionFrame>
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {title}
          </h3>
          {body && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              {body}
            </p>
          )}
        </div>
        {action && <div className="mt-1">{action}</div>}
      </div>
    </div>
  );
}

export default MuseumEmptyState;
