import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const LABEL = {
  fr: "Haut de page",
  en: "Back to top",
  ar: "العودة إلى الأعلى",
} as const;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lang = useLang();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label={LABEL[lang]}
      title={LABEL[lang]}
      className="fixed z-40 bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-4 sm:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-card/95 backdrop-blur text-foreground hover:bg-muted active:scale-95 transition-all animate-fade-in"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
