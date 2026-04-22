import { useEffect, useState } from "react";
import { AmazighSymbol } from "./AmazighSymbol";
import { tu, useLang } from "@/lib/i18n";

const SPLASH_KEY = "atte-splash-shown-v1";

/**
 * Cinematic full-screen splash.
 * Shows once per browser session, then fades out and unmounts.
 */
export function SplashScreen() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_KEY)) return;
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* noop */
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-splash-fade pointer-events-none"
      style={{ background: "var(--gradient-brand-night)" }}
      aria-hidden
    >
      {/* Soft golden vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.16 80 / 0.18), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col items-center text-center px-6">
        <AmazighSymbol size={140} />
        <h1
          className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight"
          style={{
            backgroundImage: "var(--gradient-brand-gold)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {tu("appName", lang)}
        </h1>
        <p
          className="mt-3 text-sm sm:text-base"
          style={{ color: "oklch(0.85 0.04 80)" }}
        >
          {tu("splashTagline", lang)}
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
