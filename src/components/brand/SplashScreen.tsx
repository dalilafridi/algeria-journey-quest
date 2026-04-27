import { useEffect, useState } from "react";
import splashImg from "@/assets/loading-wheel.png";

const SPLASH_KEY = "atte-splash-shown-v1";

/**
 * Cinematic full-screen splash.
 * Shows once per browser session, then fades out and unmounts.
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
      <img
        src={splashImg}
        alt=""
        className="max-h-full max-w-full h-auto w-auto object-contain"
        style={{ filter: "drop-shadow(0 12px 40px oklch(0.85 0.16 80 / 0.35))" }}
      />
    </div>
  );
}

export default SplashScreen;
