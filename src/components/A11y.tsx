import { useEffect } from "react";
import { applyDir, getLang, useLang } from "@/lib/i18n";

/**
 * Phase 10 / 12 — Accessibility + perf helpers.
 *
 * - <SkipLink/>: keyboard-only skip-to-content link.
 * - <LangSync/>: keeps <html lang/dir> in sync with the selected language,
 *   and lazily injects the Arabic webfont stylesheet ONLY when needed.
 *   Saves ~80KB of CSS/font requests for EN/FR visitors.
 */

const AR_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;700&display=swap";
const AR_FONT_ID = "ar-webfont-link";

function ensureArabicFont() {
  if (typeof document === "undefined") return;
  if (document.getElementById(AR_FONT_ID)) return;
  const link = document.createElement("link");
  link.id = AR_FONT_ID;
  link.rel = "stylesheet";
  link.href = AR_FONT_HREF;
  document.head.appendChild(link);
}

export function SkipLink() {
  const lang = useLang();
  return (
    <a href="#main" className="skip-link">
      {tu("skipToContent", lang)}
    </a>
  );
}

export function LangSync() {
  const lang = useLang();
  useEffect(() => {
    const l = lang ?? getLang();
    applyDir(l);
    if (l === "ar") ensureArabicFont();
  }, [lang]);
  return null;
}
