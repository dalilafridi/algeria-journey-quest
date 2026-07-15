/**
 * MatchQuiz — optional post-experience quiz sourced from match content.
 * Answers are hidden until the visitor submits. Score is stored via the
 * theater state helper, which awards XP on improvement.
 */

import { useMemo, useState } from "react";

import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import type { MatchTheater } from "@/data/matchTheater/types";
import { recordTheaterQuiz } from "@/lib/matchTheaterState";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  heading: { en: "Optional quiz", fr: "Quiz facultatif", ar: "اختبار اختياري" },
  intro: {
    en: "Five short questions based only on what you just experienced.",
    fr: "Cinq questions courtes, uniquement à partir de ce que vous venez de vivre.",
    ar: "خمسة أسئلة قصيرة تعتمد فقط على ما شاهدتموه للتوّ.",
  },
  submit: { en: "Submit answers", fr: "Envoyer les réponses", ar: "إرسال الإجابات" },
  again: { en: "Try again", fr: "Réessayer", ar: "حاول مجدّداً" },
  score: { en: "Your score", fr: "Votre score", ar: "نتيجتك" },
  correct: { en: "Correct", fr: "Correct", ar: "صحيح" },
  incorrect: { en: "Not quite", fr: "Pas tout à fait", ar: "ليست الإجابة" },
  xp: { en: "XP gained", fr: "XP gagnés", ar: "نقاط الخبرة" },
} as const;

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function MatchQuiz({ match }: { match: MatchTheater }) {
  const lang = useLang();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return match.quiz.reduce(
      (acc, q) => acc + (answers[q.id] === q.answerIndex ? 1 : 0),
      0,
    );
  }, [answers, match.quiz, submitted]);

  const handleSubmit = () => {
    const s = match.quiz.reduce(
      (acc, q) => acc + (answers[q.id] === q.answerIndex ? 1 : 0),
      0,
    );
    const { xpGained: gained } = recordTheaterQuiz(match.id, s);
    setXpGained(gained);
    setSubmitted(true);
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setXpGained(null);
  };

  if (match.quiz.length === 0) return null;

  return (
    <section className="mx-auto mt-8 w-full max-w-3xl px-4 sm:px-6" style={SERIF}>
      <div className="rounded-2xl border border-white/15 bg-black/40 p-5 text-white">
        <div className="text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
          {T.heading[lang]}
        </div>
        <p className="mt-1 text-sm text-white/70">{T.intro[lang]}</p>

        <ol className="mt-5 space-y-5">
          {match.quiz.map((q, i) => {
            const chosen = answers[q.id];
            const correct = q.answerIndex;
            return (
              <li key={q.id}>
                <div className="text-sm font-semibold">
                  {i + 1}. {tt(q.question, lang)}
                </div>
                <div className="mt-2 grid gap-1.5">
                  {q.choices.map((c, idx) => {
                    const isChosen = chosen === idx;
                    const isCorrect = submitted && idx === correct;
                    const isWrong = submitted && isChosen && idx !== correct;
                    return (
                      <label
                        key={idx}
                        className={
                          "flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm transition " +
                          (isCorrect
                            ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-100"
                            : isWrong
                              ? "border-red-400/60 bg-red-400/10 text-red-100"
                              : isChosen
                                ? "border-[#c9a24a] bg-[#c9a24a]/10"
                                : "border-white/15 bg-white/5 hover:bg-white/10")
                        }
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={idx}
                          checked={isChosen}
                          disabled={submitted}
                          onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                          className="mt-0.5 accent-[#c9a24a]"
                        />
                        <span>{tt(c, lang)}</span>
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-2 text-[11px] italic text-white/70">
                    {tt(q.rationale, lang)}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < match.quiz.length}
              className="rounded-full bg-[#c9a24a] px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-40"
            >
              {T.submit[lang]}
            </button>
          ) : (
            <>
              <div className="text-sm">
                <span className="text-white/60">{T.score[lang]}: </span>
                <span className="font-mono text-lg font-bold text-[#c9a24a]">
                  {score} / {match.quiz.length}
                </span>
                {xpGained != null && xpGained > 0 && (
                  <span className="ms-3 text-xs text-emerald-300">
                    +{xpGained} {T.xp[lang]}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                {T.again[lang]}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
