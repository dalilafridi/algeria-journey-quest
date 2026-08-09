/**
 * Short quiz for the Women of the Algerian Revolution exhibit.
 * Awards XP through the shared progress store, once per visitor.
 */

import { useEffect, useState } from "react";
import { useLang, t as tr, type LocalizedString } from "@/lib/i18n";
import { Plaque, SERIF } from "@/components/exhibit";
import { WOI_QUIZ } from "@/data/womenOfIndependenceQuiz";
import { addXp } from "@/lib/progress";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

const XP_PER_CORRECT = 10;
const AWARD_KEY = "dzo-woi-quiz-awarded-v1";

const UI = {
  intro: L(
    "Six questions on what women actually did between 1954 and 1962. Correct answers add experience to your visitor progress.",
    "Six questions sur ce que les femmes ont réellement fait entre 1954 et 1962. Les bonnes réponses ajoutent de l'expérience à votre progression de visite.",
    "ستة أسئلة عمّا قامت به النساء فعلاً بين 1954 و1962. الإجابات الصحيحة تضيف نقاط خبرة إلى تقدّم زيارتك.",
  ),
  progress: L("Question", "Question", "سؤال"),
  of: L("of", "sur", "من"),
  next: L("Next question", "Question suivante", "السؤال التالي"),
  finish: L("See result", "Voir le résultat", "عرض النتيجة"),
  correct: L("Correct", "Correct", "إجابة صحيحة"),
  incorrect: L("Not quite", "Pas tout à fait", "ليست صحيحة"),
  resultTitle: L("Your result", "Votre résultat", "نتيجتك"),
  score: L("correct answers", "bonnes réponses", "إجابات صحيحة"),
  xpGained: L("experience added to your progress", "d'expérience ajoutée à votre progression", "نقطة خبرة أُضيفت إلى تقدّمك"),
  noXp: L(
    "You have already earned experience from this quiz. Replay it freely for revision.",
    "Vous avez déjà gagné de l'expérience avec ce quiz. Rejouez-le librement pour réviser.",
    "سبق أن حصلت على الخبرة من هذا الاختبار. أعد اللعب بحرية للمراجعة.",
  ),
  retry: L("Try again", "Recommencer", "أعد المحاولة"),
};

export function WomenQuiz() {
  const lang = useLang();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [awarded, setAwarded] = useState(0);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-64 rounded-2xl border border-border bg-card/60 animate-pulse" />;
  }

  const q = WOI_QUIZ[step];
  const locked = picked !== null;
  const isLast = step === WOI_QUIZ.length - 1;

  function choose(i: number) {
    if (locked) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  }

  function advance() {
    const finalScore = score;
    if (!isLast) {
      setStep(step + 1);
      setPicked(null);
      return;
    }
    let gained = 0;
    try {
      if (!localStorage.getItem(AWARD_KEY)) {
        gained = finalScore * XP_PER_CORRECT;
        if (gained > 0) {
          addXp(gained);
          localStorage.setItem(AWARD_KEY, "1");
        }
      }
    } catch {
      /* storage unavailable */
    }
    setAwarded(gained);
    setDone(true);
  }

  function restart() {
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setAwarded(0);
  }

  if (done) {
    return (
      <Plaque className="max-w-3xl">
        <h3 className="text-xl font-bold text-foreground" style={SERIF}>
          {tr(UI.resultTitle, lang)}
        </h3>
        <p className="mt-3 text-2xl font-bold text-primary">
          <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
            {score} / {WOI_QUIZ.length}
          </span>{" "}
          <span className="text-sm font-normal text-muted-foreground">{tr(UI.score, lang)}</span>
        </p>
        <p className="mt-3 text-sm text-foreground/80">
          {awarded > 0 ? (
            <>
              <span className="font-semibold">+{awarded} XP</span> {tr(UI.xpGained, lang)}
            </>
          ) : (
            tr(UI.noXp, lang)
          )}
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-5 inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {tr(UI.retry, lang)}
        </button>
      </Plaque>
    );
  }

  return (
    <Plaque className="max-w-3xl">
      <p className="text-sm text-muted-foreground leading-[1.7]">{tr(UI.intro, lang)}</p>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {tr(UI.progress, lang)} {step + 1} {tr(UI.of, lang)} {WOI_QUIZ.length}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((step + (locked ? 1 : 0)) / WOI_QUIZ.length) * 100}%` }}
        />
      </div>

      <h3 className="mt-5 text-lg sm:text-xl font-bold text-foreground" style={SERIF}>
        {tr(q.question, lang)}
      </h3>

      <ul className="mt-4 grid gap-3" role="list">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answerIndex;
          const chosen = picked === i;
          let tone = "border-border bg-card hover:-translate-y-0.5";
          if (locked && isAnswer) tone = "border-primary bg-primary/10";
          else if (locked && chosen) tone = "border-destructive/50 bg-destructive/10";
          else if (locked) tone = "border-border bg-card opacity-70";
          return (
            <li key={i}>
              <button
                type="button"
                disabled={locked}
                onClick={() => choose(i)}
                aria-pressed={chosen}
                className={`w-full rounded-xl border px-4 py-3 text-start text-sm leading-[1.6] text-foreground transition ${tone}`}
              >
                {tr(opt, lang)}
              </button>
            </li>
          );
        })}
      </ul>

      {locked && (
        <div className="mt-4 rounded-xl border border-border/70 bg-background/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {picked === q.answerIndex ? tr(UI.correct, lang) : tr(UI.incorrect, lang)}
          </p>
          <p className="mt-2 text-sm text-foreground/80 leading-[1.7]">{tr(q.explanation, lang)}</p>
          <button
            type="button"
            onClick={advance}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            {isLast ? tr(UI.finish, lang) : tr(UI.next, lang)}
            <span aria-hidden className="rtl:rotate-180">
              →
            </span>
          </button>
        </div>
      )}
    </Plaque>
  );
}
