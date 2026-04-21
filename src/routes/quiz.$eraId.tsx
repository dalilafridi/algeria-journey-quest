import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { eras, type QuizQuestion } from "@/data/eras";
import { getLevelInfo, recordQuiz } from "@/lib/progress";
import {
  describeCorrectAnswer,
  describeUserAnswer,
  getPrompt,
  isAnswerCorrect,
  pickQuizQuestions,
  shuffle,
} from "@/lib/quiz";
import { t, tArr, tu, useLang, type Lang } from "@/lib/i18n";

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
            { title: `Quiz: ${t(loaderData.era.title, "en")} — Algeria Through Time` },
            {
              name: "description",
              content: `Test your knowledge of ${t(loaderData.era.title, "en")}.`,
            },
          ],
        }
      : {},
  component: QuizPage,
});

const CORRECT_MESSAGES = [
  "You're becoming a historian!",
  "Brilliant! 🎓",
  "Spot on!",
  "Nailed it!",
];
const WRONG_MESSAGES = ["Close! Try again.", "Not quite — keep going!", "So close! 💪"];

function pickMessage(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

const XP_PER_CORRECT = 10;
const STREAK_BONUS_AT = 3;
const STREAK_BONUS = 5;

function QuizPage() {
  const { era } = Route.useLoaderData();
  const navigate = useNavigate();
  const lang = useLang();

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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{
    correct: boolean;
    message: string;
    xp: number;
    bonus: boolean;
  } | null>(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ gained: number; newBadge?: string } | null>(null);
  const [history, setHistory] = useState<{ q: QuizQuestion; answer: unknown; correct: boolean }[]>(
    [],
  );
  const [reviewing, setReviewing] = useState(false);
  const flyKey = useRef(0);

  const q = questions[step];

  function commit(a: unknown) {
    if (locked) return;
    setAnswer(a);
    setLocked(true);
    const correct = isAnswerCorrect(q, a);
    setHistory((h) => [...h, { q, answer: a, correct }]);
    if (correct) {
      const newStreak = streak + 1;
      const bonus = newStreak > 0 && newStreak % STREAK_BONUS_AT === 0;
      const earned = XP_PER_CORRECT + (bonus ? STREAK_BONUS : 0);
      setScore((s) => s + 1);
      setStreak(newStreak);
      setBestStreak((b) => Math.max(b, newStreak));
      setSessionXp((x) => x + earned);
      flyKey.current += 1;
      setLastFeedback({ correct: true, message: pickMessage(CORRECT_MESSAGES), xp: earned, bonus });
    } else {
      setStreak(0);
      setLastFeedback({ correct: false, message: pickMessage(WRONG_MESSAGES), xp: 0, bonus: false });
    }
  }

  function next() {
    if (step + 1 < questions.length) {
      setStep(step + 1);
      setAnswer(null);
      setLocked(false);
      setLastFeedback(null);
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
    setStreak(0);
    setBestStreak(0);
    setSessionXp(0);
    setLastFeedback(null);
    setDone(false);
    setResult(null);
    setHistory([]);
    setReviewing(false);
  }

  if (done) {
    const ratio = score / questions.length;
    const pct = Math.round(ratio * 100);
    const perfect = score === questions.length;
    const passed = ratio >= 0.6;
    const earnedBadge = result?.newBadge ?? (passed ? t(era.badge, lang) : undefined);
    const level = getLevelInfo(0);
    void level;
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="text-7xl animate-pop-in">{perfect ? "🏆" : passed ? "🎉" : "💪"}</div>
          <h1 className="mt-4 text-3xl font-extrabold">
            {perfect ? tu("perfectRun", lang) : passed ? tu("wellDone", lang) : tu("keepGoing", lang)}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {tu("youScored", lang)}{" "}
            <span className="font-bold text-foreground">{score}</span> {tu("outOf", lang)}{" "}
            {questions.length}
          </p>

          <div className="mt-6 flex justify-center">
            <ScoreRing pct={pct} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
            <Stat label={tu("xpEarned", lang)} value={`+${sessionXp}`} emoji="⭐" />
            <Stat label={tu("bestStreak", lang)} value={`${bestStreak}🔥`} />
            <Stat label={tu("accuracy", lang)} value={`${pct}%`} emoji="🎯" />
          </div>

          {result && result.gained > 0 && (
            <div className="mt-4 inline-block px-4 py-2 rounded-full bg-accent/30 font-bold text-accent-foreground animate-float-up">
              +{result.gained} {tu("xpSaved", lang)}
            </div>
          )}

          {earnedBadge && (
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
                {result?.newBadge ? tu("badgeUnlocked", lang) : tu("badgeEarned", lang)}
              </div>
              <div className="font-bold text-lg">{t(era.badge, lang)}</div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setReviewing((r) => !r)}
              className="px-6 py-3 rounded-xl bg-card border border-border font-semibold hover:bg-muted"
            >
              {reviewing ? tu("hideReview", lang) : tu("reviewAnswers", lang)}
            </button>
            <button
              onClick={restart}
              className="px-6 py-3 rounded-xl bg-card border border-border font-semibold hover:bg-muted"
            >
              {tu("newQuestions", lang)}
            </button>
            <button
              onClick={() => navigate({ to: "/timeline" })}
              className="px-6 py-3 rounded-xl text-primary-foreground font-semibold"
              style={{ background: "var(--gradient-warm)" }}
            >
              {tu("continueJourney", lang)}
            </button>
          </div>

          {reviewing && (
            <div className="mt-8 text-left space-y-3">
              {history.map((h, i) => (
                <ReviewCard key={i} index={i} item={h} lang={lang} />
              ))}
            </div>
          )}
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
          {tu("backTo", lang)} {t(era.title, lang)}
        </Link>

        <div className="mt-4 mb-6">
          <div className="flex justify-between items-center text-sm font-semibold mb-2 gap-2">
            <span>
              {tu("question", lang)} {step + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-2">
              {streak >= 2 && (
                <span
                  key={streak}
                  className="px-2 py-0.5 rounded-full bg-accent/30 text-accent-foreground text-xs font-bold animate-streak-pulse"
                >
                  🔥 {streak} {tu("streak", lang)}
                </span>
              )}
              <span className="text-primary">
                {tu("score", lang)}: {score}
              </span>
            </div>
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
          className="relative rounded-2xl bg-card p-6 border border-border animate-float-up"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <TypeBadge type={q.type} lang={lang} />
          <QuestionView
            q={q}
            answer={answer}
            locked={locked}
            onAnswer={commit}
            onChange={setAnswer}
            lang={lang}
          />

          {locked && lastFeedback?.correct && lastFeedback.xp > 0 && (
            <div
              key={flyKey.current}
              className="pointer-events-none absolute right-6 top-6 font-extrabold text-lg animate-xp-fly"
              style={{ color: "var(--accent-foreground)" }}
            >
              +{lastFeedback.xp} XP {lastFeedback.bonus && "🔥"}
            </div>
          )}

          {locked && lastFeedback && (
            <FeedbackBlock
              q={q}
              correct={lastFeedback.correct}
              message={lastFeedback.message}
              lang={lang}
            />
          )}

          {locked && (
            <button
              onClick={next}
              className="mt-6 w-full px-6 py-3 rounded-xl text-primary-foreground font-bold animate-float-up"
              style={{ background: "var(--gradient-warm)" }}
            >
              {step + 1 < questions.length ? tu("next", lang) : tu("seeResults", lang)}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, emoji }: { label: string; value: string; emoji?: string }) {
  return (
    <div
      className="rounded-xl border border-border bg-card px-3 py-3"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="text-lg font-extrabold">
        {emoji && <span className="mr-1">{emoji}</span>}
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
        {label}
      </div>
    </div>
  );
}

function ScoreRing({ pct }: { pct: number }) {
  const size = 140;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.14 80)" />
            <stop offset="100%" stopColor="oklch(0.62 0.16 40)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-extrabold">{pct}%</div>
        <div className="text-xs text-muted-foreground">score</div>
      </div>
    </div>
  );
}

function FeedbackBlock({
  q,
  correct,
  message,
  lang,
}: {
  q: QuizQuestion;
  correct: boolean;
  message: string;
  lang: Lang;
}) {
  const explanation = "explanation" in q ? q.explanation : undefined;
  return (
    <div
      className={
        "mt-5 px-4 py-3 rounded-xl text-sm font-medium animate-pop-in " +
        (correct
          ? "bg-success/15 text-foreground border border-success/40"
          : "bg-destructive/10 text-foreground border border-destructive/30")
      }
    >
      <div className="font-bold mb-0.5">
        {correct ? "✅ " : "❌ "}
        {message}
      </div>
      {explanation && <div className="text-muted-foreground">💡 {t(explanation, lang)}</div>}
      {q.type === "order" && !correct && (
        <div className="text-muted-foreground">
          {tu("correctOrder", lang)} {q.items.map((it) => t(it.label, lang)).join(" → ")}
        </div>
      )}
    </div>
  );
}

function ReviewCard({
  index,
  item,
  lang,
}: {
  index: number;
  item: { q: QuizQuestion; answer: unknown; correct: boolean };
  lang: Lang;
}) {
  const { q, answer, correct } = item;
  const explanation = "explanation" in q ? q.explanation : undefined;
  return (
    <div
      className={
        "rounded-xl border p-4 " +
        (correct ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10")
      }
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-muted-foreground">Q{index + 1}</span>
        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          {q.type}
        </span>
        <span className="ml-auto text-sm font-bold">
          {correct ? `✅ ${tu("correct", lang)}` : `❌ ${tu("wrong", lang)}`}
        </span>
      </div>
      <div className="text-sm font-semibold mb-2">{getPrompt(q, lang)}</div>
      <div className="text-xs space-y-1">
        <div>
          <span className="text-muted-foreground">{tu("yourAnswer", lang)} </span>
          <span className={correct ? "font-semibold" : "font-semibold text-destructive"}>
            {describeUserAnswer(q, answer, lang)}
          </span>
        </div>
        {!correct && (
          <div>
            <span className="text-muted-foreground">{tu("correctAnswer", lang)} </span>
            <span className="font-semibold text-success">{describeCorrectAnswer(q, lang)}</span>
          </div>
        )}
        {explanation && (
          <div className="text-muted-foreground pt-1">💡 {t(explanation, lang)}</div>
        )}
      </div>
    </div>
  );
}

function TypeBadge({ type, lang }: { type: QuizQuestion["type"]; lang: Lang }) {
  const labels: Record<QuizQuestion["type"], { label: string; emoji: string }> = {
    mcq: { label: tu("typeMcq", lang), emoji: "🔘" },
    truefalse: { label: tu("typeTf", lang), emoji: "⚖️" },
    whoami: { label: tu("typeWho", lang), emoji: "🕵️" },
    order: { label: tu("typeOrder", lang), emoji: "🗓️" },
    image: { label: tu("typeImage", lang), emoji: "🖼️" },
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
  lang,
}: {
  q: QuizQuestion;
  answer: unknown;
  locked: boolean;
  onAnswer: (a: unknown) => void;
  onChange: (a: unknown) => void;
  lang: Lang;
}) {
  switch (q.type) {
    case "mcq":
      return (
        <ChoiceList
          prompt={t(q.question, lang)}
          options={tArr(q.options, lang)}
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
            prompt={t(q.question, lang)}
            options={tArr(q.options, lang)}
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
          <h2 className="text-xl font-bold mb-3">{tu("whoAmI", lang)}</h2>
          <ul className="space-y-2 mb-5">
            {q.clues.map((c, i) => (
              <li key={i} className="flex gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm">
                <span className="font-bold text-primary">#{i + 1}</span>
                <span>{t(c, lang)}</span>
              </li>
            ))}
          </ul>
          <ChoiceList
            options={tArr(q.options, lang)}
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
          <h2 className="text-xl font-bold mb-5">{t(q.statement, lang)}</h2>
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
                  {val ? tu("trueLabel", lang) : tu("falseLabel", lang)}
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
          lang={lang}
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
  lang,
}: {
  q: Extract<QuizQuestion, { type: "order" }>;
  answer: string[] | null;
  locked: boolean;
  onChange: (a: string[]) => void;
  onSubmit: () => void;
  lang: Lang;
}) {
  // Working order is by item id (stable across languages).
  const initial = useMemo(
    () => shuffle(q.items.map((it) => it.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q],
  );
  const order = answer ?? initial;
  const correct = q.items.map((it) => it.id);
  const itemMap = new Map(q.items.map((it) => [it.id, it]));

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
      <h2 className="text-xl font-bold mb-2">{t(q.prompt, lang)}</h2>
      <p className="text-sm text-muted-foreground mb-4">{tu("orderPrompt", lang)}</p>
      <ol className="space-y-2 mb-4">
        {order.map((id, i) => {
          const it = itemMap.get(id);
          const correctHere = locked && correct[i] === id;
          const wrongHere = locked && correct[i] !== id;
          return (
            <li
              key={id}
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
                <div className="font-medium text-sm">{it ? t(it.label, lang) : id}</div>
                {locked && it?.hint && (
                  <div className="text-xs text-muted-foreground">{t(it.hint, lang)}</div>
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
            setTimeout(onSubmit, 0);
          }}
          className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90"
        >
          {tu("lockOrder", lang)}
        </button>
      )}
    </>
  );
}
