import { useEffect, useState } from "react";
import { AmazighSymbol } from "./AmazighSymbol";
import { tu, useLang } from "@/lib/i18n";

const ERAS = [
  "loadingEraNumidian",
  "loadingEraRoman",
  "loadingEraIslamic",
  "loadingEraOttoman",
  "loadingEraFrench",
  "loadingEraIndependence",
] as const;

type Props = {
  /** Optional fixed progress 0–100. If omitted, a smooth simulated progress runs. */
  progress?: number;
  /** When true, the loader is rendered inline (not full-screen). */
  inline?: boolean;
};

export function LoadingScreen({ progress, inline = false }: Props) {
  const lang = useLang();
  const [pct, setPct] = useState(progress ?? 0);

  useEffect(() => {
    if (typeof progress === "number") {
      setPct(progress);
      return;
    }
    let p = 0;
    const id = setInterval(() => {
      // Ease toward 95%
      p += Math.max(0.4, (95 - p) * 0.06);
      setPct(Math.min(95, p));
    }, 90);
    return () => clearInterval(id);
  }, [progress]);

  const radius = 110;
  const angles = ERAS.map((_, i) => (i / ERAS.length) * 360 - 90);

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
        {/* Wheel */}
        <div className="relative" style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}>
          {/* Rotating ring */}
          <div className="absolute inset-0 animate-slow-spin">
            <div
              className="absolute inset-6 rounded-full border-2"
              style={{
                borderColor: "oklch(0.82 0.14 78 / 0.35)",
                boxShadow: "inset 0 0 30px oklch(0.82 0.14 78 / 0.15)",
              }}
            />
            {ERAS.map((key, i) => {
              const angle = (angles[i] * Math.PI) / 180;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              return (
                <div
                  key={key}
                  className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
                  style={{
                    transform: `translate(${x - 6}px, ${y - 6}px)`,
                    background: "var(--gradient-brand-gold)",
                    boxShadow: "0 0 12px oklch(0.9 0.16 85 / 0.7)",
                  }}
                />
              );
            })}
          </div>
          {/* Era labels (static, do not rotate) */}
          {ERAS.map((key, i) => {
            const angle = (angles[i] * Math.PI) / 180;
            const labelR = radius + 26;
            const x = labelR * Math.cos(angle);
            const y = labelR * Math.sin(angle);
            return (
              <div
                key={key}
                className="absolute left-1/2 top-1/2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                style={{
                  transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                  color: "oklch(0.88 0.06 80)",
                  textShadow: "0 1px 6px oklch(0.1 0.02 50 / 0.8)",
                }}
              >
                {tu(key, lang)}
              </div>
            );
          })}
          {/* Center symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full p-6"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.22 0.04 55) 0%, oklch(0.14 0.02 50) 70%)",
                boxShadow: "var(--shadow-gold-glow)",
              }}
            >
              <AmazighSymbol size={72} />
            </div>
          </div>
        </div>

        {/* Caption */}
        <p
          className="mt-8 text-sm sm:text-base font-medium"
          style={{ color: "oklch(0.88 0.06 80)" }}
        >
          {tu("loadingJourney", lang)}
        </p>

        {/* Progress bar */}
        <div
          className="mt-3 h-2 w-64 sm:w-80 rounded-full overflow-hidden"
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
        <div className="mt-1 text-xs font-bold" style={{ color: "var(--brand-gold)" }}>
          {Math.round(pct)}%
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
