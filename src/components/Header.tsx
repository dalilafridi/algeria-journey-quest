import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProgress, totalProgressPct } from "@/lib/progress";

export function Header() {
  const [xp, setXp] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      setXp(getProgress().xp);
      setPct(totalProgressPct());
    };
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, []);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🇩🇿</span>
          <span className="hidden sm:inline">Algeria Through Time</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/timeline"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Timeline
          </Link>
          <Link
            to="/profile"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            Profile
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/30 border border-accent/50">
            <span className="text-base">⭐</span>
            <span className="text-sm font-bold text-accent-foreground">{xp} XP</span>
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
