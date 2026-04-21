import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getProgress, totalProgressPct, type Progress } from "@/lib/progress";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Algeria Through Time" },
      { name: "description", content: "Track your XP, badges, and history journey progress." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [progress, setProgress] = useState<Progress>({ xp: 0, completed: {}, badges: [] });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      setProgress(getProgress());
      setPct(totalProgressPct());
    };
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold">Your Journey</h1>
        <p className="text-muted-foreground mt-1">Track your progress through Algerian history.</p>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <Stat icon="⭐" label="Total XP" value={progress.xp} />
          <Stat icon="🎖️" label="Badges" value={progress.badges.length} />
          <Stat icon="📚" label="Completion" value={`${pct}%`} />
        </div>

        <section className="mt-8">
          <h2 className="font-bold text-lg mb-3">Badges</h2>
          {progress.badges.length === 0 ? (
            <div
              className="rounded-2xl bg-card p-6 text-center border border-border text-muted-foreground"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              No badges yet — complete a quiz with a perfect score to earn one! 🏆
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {progress.badges.map((b) => (
                <div
                  key={b}
                  className="rounded-2xl p-4 border-2 flex items-center gap-3"
                  style={{
                    borderColor: "var(--accent)",
                    background: "color-mix(in oklab, var(--accent) 18%, var(--card))",
                  }}
                >
                  <div className="text-3xl">🎖️</div>
                  <div className="font-bold">{b}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="font-bold text-lg mb-3">Era progress</h2>
          <ul className="space-y-2">
            {eras.map((e) => {
              const c = progress.completed[e.id];
              return (
                <li
                  key={e.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-card border border-border px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{e.emoji}</span>
                    <div>
                      <div className="font-semibold">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.dateRange}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold">
                    {c && c.total ? `${c.bestScore}/${c.total}` : "—"}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <Link
          to="/timeline"
          className="mt-8 block w-full text-center px-6 py-4 rounded-2xl text-lg font-bold text-primary-foreground"
          style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
        >
          Continue your journey →
        </Link>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div
      className="rounded-2xl bg-card p-5 border border-border text-center"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
