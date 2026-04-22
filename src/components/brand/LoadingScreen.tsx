import { useEffect, useState } from "react";
import { tu, useLang } from "@/lib/i18n";
import loadingWheel from "@/assets/loading-wheel.png";

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
        <img
          src={loadingWheel}
          alt=""
          className="w-[280px] sm:w-[360px] h-auto animate-gold-pulse"
          style={{ filter: "drop-shadow(0 8px 30px oklch(0.85 0.16 80 / 0.35))" }}
        />

        <p
          className="mt-6 text-sm sm:text-base font-medium"
          style={{ color: "oklch(0.88 0.06 80)" }}
        >
          {tu("loadingJourney", lang)}
        </p>

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
