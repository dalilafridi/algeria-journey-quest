import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { figureQuiz, type FigureQuizQuestion } from "@/data/figureQuiz";
import { shuffle } from "@/lib/quiz";
import { addXp } from "@/lib/progress";
import { t, tu, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/figures/quiz")({
  head: () => ({
    meta: [
      { title: "Guess the Figure — Algeria Through Time" },
      { name: "description", content: "Read the clues and identify the right person from Algerian history." },
    ],
  }),
  component: GuessQuiz,
});

const XP_PER_CORRECT = 10;

type Picked = { q: FigureQuizQuestion; options: { label: string; isAnswer: boolean }[] };

function pickQuestions(lang: "en" | "fr" | "ar"): Picked[] {
  // Balance difficulty: 2 easy, 2 medium, 2 hard when possible.
  const byDiff = {
    easy: shuffle(figureQuiz.filter((q) => q.difficulty === "easy")),
    medium: shuffle(figureQuiz.filter((q) => q.difficulty === "medium")),
    hard: shuffle(figureQuiz.filter((q) => q.difficulty === "hard")),
  };
  const picked: FigureQuizQuestion[] = [];
  for (const d of ["easy", "medium", "hard"] as const) {
    picked.push(...byDiff[d].slice(0, 2));
  }
  // Top up if short.
  while (picked.length < 6) {
    const rest = shuffle(figureQuiz.filter((q) => !picked.includes(q)));
    if (!rest.length) break;
    picked.push(rest[0]);
  }
  return shuffle(picked.slice(0, 6)).map((q) => {
    const opts = q.options.map((opt, i) => ({ label: t(opt, lang), isAnswer: i === q.answerIndex }));
    return { q, options: shuffle(opts) };
  });
}

function GuessQuiz() {
  const lang = useLang();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [seed, setSeed] = useState(0);
  useEffect(() => setMounted(true), []);

  const set = useMemo(() => (mounted ? pickQuestions(lang) : []), [mounted, seed, lang]);

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<{ q: FigureQuizQuestion; correct: boolean; chosen: string }[]>([]);
  const [done, setDone] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);

  if (!mounted || set.length === 0) {
    return (
      <div className="min-h-dvh">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-12">
          <div className="h-2 rounded-full bg-muted overflow-hidden" />
          <div className="mt-6 h-64 rounded-2xl bg-card border border-border animate-pulse" />
        </main>
      </div>
    );
  }

  const item = set[step];
  const locked = picked !== null;

  function commit(i: number) {
    if (locked) return;
    setPicked(i);
    const correct = item.options[i].isAnswer;
    setHistory((h) => [...h, { q: item.q, correct, chosen: item.options[i].label }]);
    if (correct) {
      setScore((s) => s + 1);
      setSessionXp((x) => x + XP_PER_CORRECT);
    }
  }

  function next() {
    if (step + 1 < set.length) {
      setStep(step + 1);
      setPicked(null);
    } else {
      if (sessionXp > 0) addXp(sessionXp);
      setDone(true);
    }
  }

  function restart() {
    setSeed((s) => s + 1);
    setStep(0);
    setPicked(null);
    setScore(0);
    setHistory([]);
    setDone(false);
    setSessionXp(0);
  }

  if (done) {
    const pct = Math.round((score / set.length) * 100);
    return (
      <div className="min-h-dvh">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="text-7xl">{score === set.length ? "🏆" : pct >= 60 ? "🎉" : "💪"}</div>
          <h1 className="mt-4 text-3xl font-extrabold">
            {score === set.length ? tu("perfectRun", lang) : pct >= 60 ? tu("wellDone", lang) : tu("keepGoing", lang)}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {tu("youScored", lang)} <span className="font-bold text-foreground">{score}</span> {tu("outOf", lang)} {set.length}
          </p>
          <div className="mt-4 inline-block px-4 py-2 rounded-full bg-accent/30 font-bold text-accent-foreground">
            +{sessionXp} {tu("xpEarned", lang)}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={restart} className="px-6 py-3 rounded-xl bg-card border border-border font-semibold hover:bg-muted">
              {tu("newQuestions", lang)}
            </button>
            <button
              onClick={() => navigate({ to: "/figures" })}
              className="px-6 py-3 rounded-xl text-primary-foreground font-semibold"
              style={{ background: "var(--gradient-warm)" }}
            >
              {tu("backToFigures", lang)}
            </button>
          </div>

          <div className="mt-8 text-left space-y-3">
            {history.map((h, i) => (
              <div
                key={i}
                className={
                  "rounded-xl border p-4 " +
                  (h.correct ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10")
                }
              >
                <div className="text-xs font-bold text-muted-foreground mb-1">Q{i + 1}</div>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-muted-foreground">{tu("yourAnswer", lang)} </span>
                    <span className={h.correct ? "font-semibold" : "font-semibold text-destructive"}>{h.chosen}</span>
                  </div>
                  {!h.correct && (
                    <div>
                      <span className="text-muted-foreground">{tu("correctAnswer", lang)} </span>
                      <span className="font-semibold text-success">
                        {t(h.q.options[h.q.answerIndex], lang)}
                      </span>
                    </div>
                  )}
                  <div className="text-muted-foreground pt-1">💡 {t(h.q.explanation, lang)}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-8">
        <Link to="/figures" className="text-sm text-muted-foreground hover:text-foreground">
          {tu("backToFigures", lang)}
        </Link>

        <div className="mt-4 mb-6">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>
              {tu("question", lang)} {step + 1} / {set.length}
            </span>
            <span className="text-primary">
              {tu("score", lang)}: {score}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((step + (locked ? 1 : 0)) / set.length) * 100}%`,
                background: "var(--gradient-warm)",
              }}
            />
          </div>
        </div>

        <div
          key={step}
          className="rounded-2xl bg-card border border-border p-6 animate-float-up"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground mb-3">
            🕵️ {tu("guessTheFigure", lang)}
          </div>
          <h2 className="text-xl font-bold">{tu("whoAmI", lang)}</h2>

          <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            {tu("clues", lang)}
          </div>
          <ul className="mt-2 space-y-2">
            {item.q.clues.map((c, i) => (
              <li key={i} className="rounded-xl bg-muted/60 px-3 py-2 text-sm">
                <span className="font-bold text-primary me-2">{i + 1}.</span>
                {t(c, lang)}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-2">
            {item.options.map((o, i) => {
              const isPicked = picked === i;
              const showCorrect = locked && o.isAnswer;
              const showWrong = locked && isPicked && !o.isAnswer;
              return (
                <button
                  key={i}
                  onClick={() => commit(i)}
                  disabled={locked}
                  className={
                    "text-start px-4 py-3 rounded-xl border font-semibold transition " +
                    (showCorrect
                      ? "bg-success/20 border-success/60 text-foreground"
                      : showWrong
                        ? "bg-destructive/15 border-destructive/50 text-foreground"
                        : isPicked
                          ? "bg-primary/15 border-primary"
                          : "bg-card border-border hover:border-primary/40")
                  }
                >
                  {o.label}
                </button>
              );
            })}
          </div>

          {locked && (
            <>
              <div
                className={
                  "mt-5 px-4 py-3 rounded-xl text-sm " +
                  (item.options[picked!].isAnswer
                    ? "bg-success/15 border border-success/40"
                    : "bg-destructive/10 border border-destructive/30")
                }
              >
                <div className="font-bold mb-0.5">
                  {item.options[picked!].isAnswer ? `✅ ${tu("correct", lang)}` : `❌ ${tu("wrong", lang)}`}
                </div>
                <div className="text-muted-foreground">💡 {t(item.q.explanation, lang)}</div>
              </div>
              <button
                onClick={next}
                className="mt-5 w-full px-6 py-3 rounded-xl text-primary-foreground font-bold"
                style={{ background: "var(--gradient-warm)" }}
              >
                {step + 1 < set.length ? tu("next", lang) : tu("seeResults", lang)}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
