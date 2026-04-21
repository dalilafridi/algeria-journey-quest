import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { eras, type QuizQuestion } from "@/data/eras";
import { recordQuiz } from "@/lib/progress";
import { isAnswerCorrect, pickQuizQuestions, shuffle } from "@/lib/quiz";

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

  // Pick a fresh random subset (5–7) per attempt.
  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    () => pickQuizQuestions(era.quiz),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [era.id, seed],
  );

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<unknown>(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ gained: number; newBadge?: string } | null>(null);

  const q = questions[step];

  function commit(a: unknown) {
    if (locked) return;
    setAnswer(a);
    setLocked(true);
    if (isAnswerCorrect(q, a)) setScore((s) => s + 1);
  }

  function next() {
    if (step + 1 < questions.length) {
      setStep(step + 1);
      setAnswer(null);
      setLocked(false);
    } else {
      const r = recordQuiz(era.id, score, questions.length);
      setResult(r);
      setDone(true);
    }
  }

  function restart() {
    setSeed((s) => s + 1);
    setStep(0);
    setAnswer(null);
    setLocked(false);
    setScore(0);
    setDone(false);
    setResult(null);
  }

  if (done) {
    const ratio = score / questions.length;
    const perfect = score === questions.length;
    const passed = ratio >= 0.6;
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="text-7xl animate-pop-in">{perfect ? "🏆" : passed ? "🎉" : "💪"}</div>
          <h1 className="mt-4 text-3xl font-extrabold">
            {perfect ? "Perfect!" : passed ? "Well done!" : "Keep going!"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            You scored <span className="font-bold text-foreground">{score}</span> out of{" "}
            {questions.length}
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
              onClick={restart}
              className="px-6 py-3 rounded-xl bg-card border border-border font-semibold hover:bg-muted"
            >
              🔁 New questions
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
              Question {step + 1} / {questions.length}
            </span>
            <span className="text-primary">Score: {score}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((step + (locked ? 1 : 0)) / questions.length) * 100}%`,
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
          <TypeBadge type={q.type} />
          <QuestionView
            q={q}
            answer={answer}
            locked={locked}
            onAnswer={commit}
            onChange={setAnswer}
          />

          {locked && (
            <Feedback q={q} answer={answer} />
          )}

          {locked && (
            <button
              onClick={next}
              className="mt-6 w-full px-6 py-3 rounded-xl text-primary-foreground font-bold animate-float-up"
              style={{ background: "var(--gradient-warm)" }}
            >
              {step + 1 < questions.length ? "Next question →" : "See results 🎉"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function TypeBadge({ type }: { type: QuizQuestion["type"] }) {
  const labels: Record<QuizQuestion["type"], { label: string; emoji: string }> = {
    mcq: { label: "Multiple choice", emoji: "🔘" },
    truefalse: { label: "True or False", emoji: "⚖️" },
    whoami: { label: "Who am I?", emoji: "🕵️" },
    order: { label: "Timeline order", emoji: "🗓️" },
    image: { label: "Picture round", emoji: "🖼️" },
  };
  const { label, emoji } = labels[type];
  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground mb-4">
      <span>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

function QuestionView({
  q,
  answer,
  locked,
  onAnswer,
  onChange,
}: {
  q: QuizQuestion;
  answer: unknown;
  locked: boolean;
  onAnswer: (a: unknown) => void;
  onChange: (a: unknown) => void;
}) {
  switch (q.type) {
    case "mcq":
      return (
        <ChoiceList
          prompt={q.question}
          options={q.options}
          correctIndex={q.answerIndex}
          picked={answer as number | null}
          locked={locked}
          onPick={onAnswer}
        />
      );
    case "image":
      return (
        <>
          <div
            className="mb-4 rounded-xl border border-dashed border-border bg-muted/40 h-40 flex items-center justify-center text-6xl"
            aria-label="Image placeholder"
          >
            {q.imageEmoji ?? "🖼️"}
          </div>
          <ChoiceList
            prompt={q.question}
            options={q.options}
            correctIndex={q.answerIndex}
            picked={answer as number | null}
            locked={locked}
            onPick={onAnswer}
          />
        </>
      );
    case "whoami":
      return (
        <>
          <h2 className="text-xl font-bold mb-3">Who am I?</h2>
          <ul className="space-y-2 mb-5">
            {q.clues.map((c, i) => (
              <li
                key={i}
                className="flex gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm"
              >
                <span className="font-bold text-primary">#{i + 1}</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <ChoiceList
            options={q.options}
            correctIndex={q.answerIndex}
            picked={answer as number | null}
            locked={locked}
            onPick={onAnswer}
          />
        </>
      );
    case "truefalse":
      return (
        <>
          <h2 className="text-xl font-bold mb-5">{q.statement}</h2>
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((val) => {
              const isPicked = answer === val;
              const isCorrect = q.answer === val;
              let cls =
                "px-4 py-4 rounded-xl border-2 font-bold text-lg transition-all ";
              if (!locked) {
                cls += "border-border bg-background hover:border-primary hover:bg-muted";
              } else if (isCorrect) {
                cls += "border-success bg-success/15 animate-pop-in";
              } else if (isPicked) {
                cls += "border-destructive bg-destructive/15 animate-shake";
              } else {
                cls += "border-border bg-background opacity-60";
              }
              return (
                <button
                  key={String(val)}
                  onClick={() => onAnswer(val)}
                  disabled={locked}
                  className={cls}
                >
                  {val ? "✅ True" : "❌ False"}
                </button>
              );
            })}
          </div>
        </>
      );
    case "order":
      return (
        <OrderQuestionView
          q={q}
          answer={answer as string[] | null}
          locked={locked}
          onChange={onChange}
          onSubmit={() => onAnswer(answer)}
        />
      );
  }
}

function ChoiceList({
  prompt,
  options,
  correctIndex,
  picked,
  locked,
  onPick,
}: {
  prompt?: string;
  options: string[];
  correctIndex: number;
  picked: number | null;
  locked: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <>
      {prompt && <h2 className="text-xl font-bold mb-5">{prompt}</h2>}
      <div className="space-y-3">
        {options.map((opt, i) => {
          const isCorrect = i === correctIndex;
          const isPicked = picked === i;
          let cls =
            "w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all ";
          if (!locked) {
            cls += "border-border bg-background hover:border-primary hover:bg-muted";
          } else if (isCorrect) {
            cls += "border-success bg-success/15 text-foreground animate-pop-in";
          } else if (isPicked) {
            cls += "border-destructive bg-destructive/15 text-foreground animate-shake";
          } else {
            cls += "border-border bg-background opacity-60";
          }
          return (
            <button key={i} onClick={() => onPick(i)} className={cls} disabled={locked}>
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {locked && isCorrect && <span>✅</span>}
                {locked && isPicked && !isCorrect && <span>❌</span>}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function OrderQuestionView({
  q,
  answer,
  locked,
  onChange,
  onSubmit,
}: {
  q: Extract<QuizQuestion, { type: "order" }>;
  answer: string[] | null;
  locked: boolean;
  onChange: (a: string[]) => void;
  onSubmit: () => void;
}) {
  // Initialise the working order with a stable shuffle the first time.
  const initial = useMemo(
    () => shuffle(q.items.map((it) => it.label)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q],
  );
  const order = answer ?? initial;
  const correct = q.items.map((it) => it.label);
  const hints = new Map(q.items.map((it) => [it.label, it.hint]));

  function move(idx: number, dir: -1 | 1) {
    if (locked) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = order.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2">{q.prompt}</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Use the arrows to put events from earliest to latest.
      </p>
      <ol className="space-y-2 mb-4">
        {order.map((label, i) => {
          const correctHere = locked && correct[i] === label;
          const wrongHere = locked && correct[i] !== label;
          return (
            <li
              key={label}
              className={
                "flex items-center gap-2 px-3 py-2 rounded-xl border-2 " +
                (correctHere
                  ? "border-success bg-success/15"
                  : wrongHere
                    ? "border-destructive bg-destructive/15"
                    : "border-border bg-background")
              }
            >
              <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}.</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{label}</div>
                {locked && hints.get(label) && (
                  <div className="text-xs text-muted-foreground">{hints.get(label)}</div>
                )}
              </div>
              {!locked && (
                <div className="flex gap-1">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="w-7 h-7 rounded-md bg-muted hover:bg-muted/70 disabled:opacity-30 text-sm"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === order.length - 1}
                    aria-label="Move down"
                    className="w-7 h-7 rounded-md bg-muted hover:bg-muted/70 disabled:opacity-30 text-sm"
                  >
                    ▼
                  </button>
                </div>
              )}
              {correctHere && <span>✅</span>}
              {wrongHere && <span>❌</span>}
            </li>
          );
        })}
      </ol>
      {!locked && (
        <button
          onClick={() => {
            onChange(order);
            // small hack: ensure answer state is set before commit
            setTimeout(onSubmit, 0);
          }}
          className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90"
        >
          Lock in order
        </button>
      )}
    </>
  );
}

function Feedback({ q, answer }: { q: QuizQuestion; answer: unknown }) {
  const correct = isAnswerCorrect(q, answer);
  const explanation =
    q.type === "truefalse" ? q.explanation : undefined;
  return (
    <div
      className={
        "mt-5 px-4 py-3 rounded-xl text-sm font-medium " +
        (correct
          ? "bg-success/15 text-foreground border border-success/40"
          : "bg-destructive/10 text-foreground border border-destructive/30")
      }
    >
      <div className="font-bold mb-0.5">{correct ? "Correct! 🎉" : "Not quite."}</div>
      {explanation && <div className="text-muted-foreground">{explanation}</div>}
      {q.type === "order" && !correct && (
        <div className="text-muted-foreground">
          Correct order: {q.items.map((it) => it.label).join(" → ")}
        </div>
      )}
    </div>
  );
}
