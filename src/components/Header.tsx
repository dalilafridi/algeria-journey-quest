import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLevelInfo, getProgress, totalProgressPct, type LevelInfo } from "@/lib/progress";
import { LANGS, getLang, setLang, tu, useLang, type Lang } from "@/lib/i18n";
import brandIcon from "@/assets/brand-icon.png";

export function Header() {
  const [xp, setXp] = useState(0);
  const [pct, setPct] = useState(0);
  const [level, setLevel] = useState<LevelInfo>(() => getLevelInfo(0));
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = useLang();

  useEffect(() => {
    const update = () => {
      const p = getProgress();
      setXp(p.xp);
      setPct(totalProgressPct());
      setLevel(getLevelInfo(p.xp));
    };
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const current: Lang = lang ?? getLang();

  const navLinks = [
    { to: "/timeline" as const, label: tu("timeline", current) },
    { to: "/figures" as const, label: tu("figures", current) },
    { to: "/lessons" as const, label: tu("lessons", current) },
    { to: "/map" as const, label: tu("mapExplorer", current) },
    {
      to: "/words" as const,
      label: current === "fr" ? "Paroles" : current === "ar" ? "كلمات" : "Words",
    },
    {
      to: "/moments" as const,
      label: current === "fr" ? "Moments" : current === "ar" ? "لحظات" : "Moments",
    },
    { to: "/profile" as const, label: tu("profile", current) },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 lg:gap-5">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-base sm:text-lg min-w-0"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={brandIcon}
            alt=""
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shrink-0"
            style={{ boxShadow: "0 0 12px oklch(0.85 0.16 80 / 0.45)" }}
          />
          <span className="hidden xl:inline truncate">{tu("appName", current)}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-center">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language switcher — compact on mobile */}
          <div className="flex items-center rounded-full border border-border bg-card overflow-hidden text-[11px] sm:text-xs font-bold">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={
                  "px-1.5 sm:px-2 py-1 min-h-[28px] transition " +
                  (current === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
                aria-label={`Switch to ${l.label}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Level pill — desktop only */}
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/40"
            title={level.title}
          >
            <span className="text-xs font-bold text-secondary">
              {tu("level", current)} {level.level}
            </span>
            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${level.pct}%`, background: "var(--gradient-warm)" }}
              />
            </div>
          </div>

          {/* XP pill — compact on mobile */}
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/30 border border-accent/50">
            <span className="text-sm sm:text-base">⭐</span>
            <span className="text-xs sm:text-sm font-bold text-accent-foreground tabular-nums">
              {xp}
              <span className="hidden xs:inline"> {tu("xp", current)}</span>
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground active:scale-95 transition"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-float-up">
          <nav className="max-w-5xl mx-auto px-3 py-2 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted active:bg-muted transition"
              >
                {l.label}
              </Link>
            ))}
            <div
              className="mt-1 mx-3 my-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/20 border border-secondary/40"
              title={level.title}
            >
              <span className="text-xs font-bold text-secondary">
                {tu("level", current)} {level.level}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${level.pct}%`, background: "var(--gradient-warm)" }}
                />
              </div>
            </div>
          </nav>
        </div>
      )}

      {pct > 0 && (
        <div className="h-1 bg-muted">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "var(--gradient-warm)" }}
          />
        </div>
      )}
    </header>
  );
}
