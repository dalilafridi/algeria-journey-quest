import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLevelInfo, getProgress, totalProgressPct, type LevelInfo } from "@/lib/progress";
import { LANGS, getLang, setLang, tu, useLang, type Lang } from "@/lib/i18n";
import brandIcon from "@/assets/brand-icon.png";

export function Header() {
  const [xp, setXp] = useState(0);
  const [pct, setPct] = useState(0);
  const [level, setLevel] = useState<LevelInfo>(() => getLevelInfo(0));
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

  const current: Lang = lang ?? getLang();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img
            src={brandIcon}
            alt=""
            className="w-9 h-9 rounded-xl object-cover"
            style={{ boxShadow: "0 0 12px oklch(0.85 0.16 80 / 0.45)" }}
          />
          <span className="hidden sm:inline">{tu("appName", current)}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/timeline"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            {tu("timeline", current)}
          </Link>
          <Link
            to="/figures"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            {tu("figures", current)}
          </Link>
          <Link
            to="/profile"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            {tu("profile", current)}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center rounded-full border border-border bg-card overflow-hidden text-xs font-bold">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={
                  "px-2 py-1 transition " +
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

          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/40"
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/30 border border-accent/50">
            <span className="text-base">⭐</span>
            <span className="text-sm font-bold text-accent-foreground">
              {xp} {tu("xp", current)}
            </span>
          </div>
        </div>
      </div>
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
