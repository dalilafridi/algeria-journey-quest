/**
 * MedallionLoader — the museum's loading artifact.
 *
 * Replaces spinners and generic loaders with an engraved Amazigh medallion
 * that reveals with a soft bronze glow and an engraving sheen. Used both as a
 * full-screen experience and inline. No spinning, no flashy effects.
 */

import { useEffect, useState } from "react";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { AmazighSymbol } from "@/components/brand/AmazighSymbol";
import { tu, useLang } from "@/lib/i18n";

type Props = {
  /** Optional fixed progress 0–100. If omitted, a smooth simulated progress runs. */
  progress?: number;
  /** Inline (not full-screen). */
  inline?: boolean;
  /** Medallion diameter. */
  size?: number;
};

export function MedallionLoader({ progress, inline = false, size = 132 }: Props) {
  const lang = useLang();
  const [pct, setPct] = useState(progress ?? 0);

  useEffect(() => {
    if (typeof progress === "number") {
      setPct(progress);
      return;
    }
    let p = 0;
    const id = setInterval(() => {
      p += Math.max(0.4, (95 - p) * 0.06);
      setPct(Math.min(95, p));
    }, 90);
    return () => clearInterval(id);
  }, [progress]);

  const wrapperClass = inline
    ? "relative w-full flex items-center justify-center py-10"
    : "fixed inset-0 z-[90] flex items-center justify-center";

  return (
    <div
      className={wrapperClass}
      style={!inline ? { background: "var(--gradient-brand-night)" } : undefined}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex flex-col items-center text-center px-6">
        <div className="relative animate-gold-pulse">
          <MedallionFrame size={size} tone="ink" glow animate="reveal" inset={0.24} label="">
            <AmazighSymbol size={size * 0.5} glow={false} />
          </MedallionFrame>
          {/* Engraving sheen sweeping across the artifact */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
            style={{ WebkitMaskImage: "radial-gradient(circle, #000 60%, transparent 70%)" }}
          >
            <span
              className="absolute inset-y-0 w-1/2 animate-engrave-sheen"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.95 0.06 88 / 0.5), transparent)",
              }}
            />
          </span>
        </div>

        <p className="mt-6 text-sm sm:text-base font-medium" style={{ color: "oklch(0.88 0.06 80)" }}>
          {tu("loadingJourney", lang)}
        </p>

        <div
          className="mt-3 h-1.5 w-56 sm:w-72 rounded-full overflow-hidden"
          style={{ background: "oklch(0.22 0.03 55)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${Math.round(pct)}%`,
              background: "var(--gradient-brand-gold)",
              boxShadow: "0 0 12px oklch(0.9 0.16 85 / 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MedallionLoader;
