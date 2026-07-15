/**
 * TheaterShell — cinematic dark stage that wraps every Match Theater view.
 *
 * Renders the deep-black + dark-green backdrop, subtle stadium-light
 * vignette and — unless the visitor prefers reduced motion — a very faint
 * film-grain layer. Provides a compact top bar with an "Exit theater"
 * button that takes the visitor back to the Football wing.
 */

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useLang } from "@/lib/i18n";

const SERIF = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

const EXIT_LABEL = {
  en: "Exit theater",
  fr: "Quitter le théâtre",
  ar: "الخروج من المسرح",
} as const;

const BADGE_LABEL = {
  en: "Match Theater",
  fr: "Théâtre du match",
  ar: "مسرح المباراة",
} as const;

export function TheaterShell({ children }: { children: ReactNode }) {
  const lang = useLang();
  return (
    <div
      className="relative min-h-dvh w-full overflow-x-hidden text-white"
      style={{
        background:
          "radial-gradient(1200px 800px at 50% -10%, #0a2a1a 0%, #060a08 45%, #000 100%)",
      }}
    >
      {/* Very faint stadium light rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 10%, rgba(200,180,120,0.06), transparent 60%), radial-gradient(600px 300px at 80% 10%, rgba(200,180,120,0.06), transparent 60%)",
        }}
      />
      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay motion-reduce:hidden"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/70" style={SERIF}>
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "#c9a24a", boxShadow: "0 0 12px rgba(201,162,74,0.6)" }}
          />
          {BADGE_LABEL[lang]}
        </div>
        <Link
          to="/football"
          className="rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
        >
          {EXIT_LABEL[lang]}
        </Link>
      </header>

      <main className="relative z-10 pb-16">{children}</main>
    </div>
  );
}

export const THEATER_SERIF = SERIF;
