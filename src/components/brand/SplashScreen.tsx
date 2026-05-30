import { useEffect, useState } from "react";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { AmazighSymbol } from "@/components/brand/AmazighSymbol";

const SPLASH_KEY = "atte-splash-shown-v1";

/**
 * Cinematic full-screen splash — the museum's opening artifact.
 *
 * Shows once per browser session: a master Amazigh medallion reveals from the
 * night palette with a soft bronze glow, then the whole screen fades out and
 * unmounts. Fast, elegant, minimal — no spinners, no flashy effects.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_KEY)) return;
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* noop */
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 animate-splash-fade pointer-events-none"
      style={{ background: "var(--gradient-brand-night)" }}
      aria-hidden
    >
      <div className="animate-gold-pulse">
        <MedallionFrame size={172} tone="ink" glow animate="reveal" inset={0.26}>
          <AmazighSymbol size={88} glow={false} />
        </MedallionFrame>
      </div>
      <div
        className="text-[11px] font-bold uppercase tracking-[0.42em]"
        style={{ color: "oklch(0.86 0.1 82)" }}
      >
        DZ Odyssey
      </div>
    </div>
  );
}

export default SplashScreen;
