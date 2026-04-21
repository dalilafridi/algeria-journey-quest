import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { recordQuiz } from "@/lib/progress";

export const Route = createFileRoute("/quiz/$eraId")({
  loader: ({ params }) => {
    const era = eras.find((e) => e.id === params.eraId);
    if (!era) throw notFound();
    return { era };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `Quiz: ${loaderData.era.title} — Algeria Through Time` },
            { name: "description", content: `Test your knowledge of ${loaderData.era.title}.` },
          ],
        }
      : {},
  component: QuizPage,
});

function QuizPage() {
  const { era } = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ gained: number; newBadge?: string } | null>(null);

  const q = era.quiz[step];

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  }

  function next() {
    const finalScore = score;
    if (step + 1 < era.quiz.length) {
      setStep(step + 1);
      setSelected(null);
    } else {
      const r = recordQuiz(era.id, finalScore, era.quiz.length);
      const earnedBadge = finalScore === era.quiz.length ? era.badge : undefined;
      setResult({ gained: r.gained, newBadge: earnedBadge });
      setDone(true);
    }
  }

  if (done) {
    const perfect = score === era.quiz.length;
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="text-7xl animate-pop-in">{perfect ? "🏆" : score >= 2 ? "🎉" : "💪"}</div>
          <h1 className="mt-4 text-3xl font-extrabold">
            {perfect ? "Perfect!" : score >= 2 ? "Well done!" : "Keep going!"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            You scored <span className="font-bold text-foreground">{score}</span> out of{" "}
            {era.quiz.length}
          </p>
          {result && result.gained > 0 && (
            <div className="mt-4 inline-block px-4 py-2 rounded-full bg-accent/30 font-bold text-accent-foreground animate-float-up">
              +{result.gained} XP ⭐
            </div>
          )}
          {result?.newBadge && (
            <div
              className="mt-6 mx-auto max-w-sm rounded-2xl p-5 border-2 animate-pop-in"
              style={{
                borderColor: "var(--accent)",
                background: "color-mix(in oklab, var(--accent) 20%, var(--card))",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <div className="text-4xl">🎖️</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                Badge unlocked
              </div>
              <div className="font-bold text-lg">{result.newBadge}</div>
            </div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setStep(0);
                setSelected(null);
                setScore(0);
                setDone(false);
                setResult(null);
              }}
              className="px-6 py-3 rounded-xl bg-card border border-border font-semibold hover:bg-muted"
            >
              🔁 Try again
            </button>
            <button
              onClick={() => navigate({ to: "/timeline" })}
              className="px-6 py-3 rounded-xl text-primary-foreground font-semibold"
              style={{ background: "var(--gradient-warm)" }}
            >
              Continue journey →
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-8">
        <Link
          to="/era/$eraId"
          params={{ eraId: era.id }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {era.title}
        </Link>

        <div className="mt-4 mb-6">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>
              Question {step + 1} / {era.quiz.length}
            </span>
            <span className="text-primary">Score: {score}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((step + (selected !== null ? 1 : 0)) / era.quiz.length) * 100}%`,
                background: "var(--gradient-warm)",
              }}
            />
          </div>
        </div>

        <div
          key={step}
          className="rounded-2xl bg-card p-6 border border-border animate-float-up"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <h2 className="text-xl font-bold mb-5">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.answerIndex;
              const isPicked = selected === i;
              const showState = selected !== null;
              let cls =
                "w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all ";
              if (!showState) {
                cls += "border-border bg-background hover:border-primary hover:bg-muted";
              } else if (isCorrect) {
                cls += "border-success bg-success/15 text-foreground animate-pop-in";
              } else if (isPicked) {
                cls += "border-destructive bg-destructive/15 text-foreground animate-shake";
              } else {
                cls += "border-border bg-background opacity-60";
              }
              return (
                <button key={i} onClick={() => pick(i)} className={cls} disabled={showState}>
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {showState && isCorrect && <span>✅</span>}
                    {showState && isPicked && !isCorrect && <span>❌</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <button
              onClick={next}
              className="mt-6 w-full px-6 py-3 rounded-xl text-primary-foreground font-bold animate-float-up"
              style={{ background: "var(--gradient-warm)" }}
            >
              {step + 1 < era.quiz.length ? "Next question →" : "See results 🎉"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
