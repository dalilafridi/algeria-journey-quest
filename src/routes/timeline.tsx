import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getProgress, hasPassed, isUnlocked, type Progress } from "@/lib/progress";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Algeria Through Time" },
      {
        name: "description",
        content: "Explore the major eras of Algerian history, from Numidia to independence.",
      },
      { property: "og:title", content: "Algerian History Timeline" },
      {
        property: "og:description",
        content: "Five eras of Algerian history, from antiquity to modern liberation.",
      },
    ],
  }),
  component: Timeline,
});

function Timeline() {
  const [progress, setProgress] = useState<Progress>({ xp: 0, completed: {}, badges: [] });

  useEffect(() => {
    const update = () => setProgress(getProgress());
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10 animate-float-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold">The Journey</h1>
          <p className="mt-2 text-muted-foreground">
            Tap an era to explore. Complete its quiz to unlock the next!
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-6 top-2 bottom-2 w-1 rounded-full opacity-40"
            style={{ background: "var(--gradient-warm)" }}
          />
          <ul className="space-y-5">
            {eras.map((era, i) => {
              const unlocked = isUnlocked(era.id);
              const c = progress.completed[era.id];
              const best = c?.bestScore ?? 0;
              const total = c?.total ?? 0;
              const done = hasPassed(era.id);
              return (
                <li key={era.id} className="relative pl-16">
                  <div
                    className="absolute left-0 top-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl border-4 border-background"
                    style={{
                      background: unlocked ? "var(--gradient-warm)" : "var(--muted)",
                      boxShadow: unlocked ? "var(--shadow-glow)" : "none",
                    }}
                  >
                    {unlocked ? era.emoji : "🔒"}
                  </div>
                  {unlocked ? (
                    <Link
                      to="/era/$eraId"
                      params={{ eraId: era.id }}
                      className="block rounded-2xl bg-card p-5 border border-border hover:scale-[1.02] transition-transform"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Chapter {i + 1}
                          </div>
                          <h2 className="text-xl font-bold mt-0.5">{era.title}</h2>
                          <div className="text-sm text-muted-foreground">{era.dateRange}</div>
                        </div>
                        {done && total > 0 && (
                          <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                            ✓ {best}/{total}
                          </div>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-foreground/80 line-clamp-2">
                        {era.summary}
                      </p>
                    </Link>
                  ) : (
                    <div
                      className="block rounded-2xl bg-muted/50 p-5 border border-border opacity-70"
                    >
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Chapter {i + 1} — Locked
                      </div>
                      <h2 className="text-xl font-bold mt-0.5 text-muted-foreground">
                        {era.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2">
                        Finish the previous quiz to unlock.
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
