import { useEffect } from "react";
import { applyDir, getLang, useLang } from "@/lib/i18n";

/**
 * Phase 10 — Accessibility helpers.
 *
 * - <SkipLink/>: keyboard-only skip-to-content link.
 * - <LangSync/>: keeps <html lang/dir> in sync with selected language so
 *   screen readers, browser translation and CSS [lang=ar] rules work.
 */

export function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Skip to content
    </a>
  );
}

export function LangSync() {
  const lang = useLang();
  useEffect(() => {
    applyDir(lang ?? getLang());
  }, [lang]);
  return null;
}
