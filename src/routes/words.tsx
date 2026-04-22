import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { WORD_CATEGORIES, words, type WordCategoryId } from "@/data/words";
import { quizForWord, type WordsQuizItem } from "@/data/wordsQuiz";
import {
  categoryTotals,
  claimWotd,
  getWordOfTheDay,
  getWordsProgress,
  isWotdClaimedToday,
  markQuizCorrect,
  markRevealed,
  wordsTotals,
} from "@/lib/wordsProgress";
import { t, useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/words")({
  head: () => ({
    meta: [
      { title: "Words That Shaped History — Algeria Through Time" },
      {
        name: "description",
        content:
          "Quotes, verses and song lines that shaped Algerian identity — from Kassaman to Mammeri, Aït Menguellet, Matoub and Idir.",
      },
    ],
  }),
  component: WordsPage,
});

const COPY = {
  title: { en: "Words That Shaped History", fr: "Paroles qui ont marqué l'histoire", ar: "كلمات صنعت التاريخ" },
  intro: {
    en: "Words carry memory. They turn struggle into song and identity into voice.",
    fr: "Les mots portent la mémoire. Ils transforment la lutte en chant et l'identité en voix.",
    ar: "الكلماتُ تحمل الذاكرة، فتحوّل النضال إلى نشيد والهويّة إلى صوت.",
  },
  context: { en: "Context", fr: "Contexte", ar: "السياق" },
  meaning: { en: "Meaning", fr: "Signification", ar: "المعنى" },
  tapToReveal: { en: "Tap to reveal context & meaning", fr: "Touchez pour révéler contexte et sens", ar: "اضغط لكشف السياق والمعنى" },
  viewFigure: { en: "About this figure →", fr: "À propos de cette figure →", ar: "عن هذه الشخصية ←" },
  all: { en: "All", fr: "Toutes", ar: "الكل" },
  progress: { en: "Word progress", fr: "Progression des paroles", ar: "تقدّم الكلمات" },
  revealed: { en: "revealed", fr: "révélés", ar: "مكشوفة" },
  wordXp: { en: "Word XP", fr: "XP des paroles", ar: "نقاط الكلمات" },
  quiz: { en: "Quick quiz", fr: "Mini-quiz", ar: "اختبار سريع" },
  correct: { en: "Correct!", fr: "Bonne réponse !", ar: "إجابة صحيحة!" },
  tryAgain: { en: "Try again", fr: "Réessayez", ar: "حاول مجدّدًا" },
  alreadyDone: { en: "Already mastered", fr: "Déjà maîtrisé", ar: "تمّ إتقانها" },
  catComplete: { en: "Category complete", fr: "Catégorie complète", ar: "اكتملت الفئة" },
  badgeEarned: { en: "Badge earned!", fr: "Badge obtenu !", ar: "حصلت على شارة!" },
  plusXp: { en: "+%n XP", fr: "+%n XP", ar: "+%n نقطة" },
} as const;

function WordsPage() {
  const lang = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<WordCategoryId | "all">("all");
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Re-render when words progress changes.
  useEffect(() => {
    const update = () => setTick((n) => n + 1);
    window.addEventListener("words-progress-updated", update);
    return () => window.removeEventListener("words-progress-updated", update);
  }, []);

  // Refer to tick so it's "used" for the linter — values come from getters.
  void tick;

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const totals = wordsTotals();
  const progress = getWordsProgress();
  const visible = activeCat === "all" ? words : words.filter((w) => w.category === activeCat);

  const handleReveal = (wordId: string) => {
    const wasOpen = openId === wordId;
    setOpenId(wasOpen ? null : wordId);
    if (!wasOpen) {
      const res = markRevealed(wordId);
      if (res.gained > 0) {
        setToast(COPY.plusXp[lang].replace("%n", String(res.gained)));
      }
      if (res.newBadge) {
        const cat = WORD_CATEGORIES.find((c) => c.id === res.newBadge);
        if (cat) setToast(`🏅 ${COPY.badgeEarned[lang]} — ${t(cat.label, lang)}`);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base leading-relaxed">{COPY.intro[lang]}</p>

        {/* Words progress strip */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="font-semibold">{COPY.progress[lang]}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="tabular-nums">
                {totals.revealed}/{totals.total} {COPY.revealed[lang]}
              </span>
              <span aria-hidden>·</span>
              <span className="font-bold text-accent-foreground">
                ⭐ {totals.xp} {COPY.wordXp[lang]}
              </span>
            </div>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${totals.pct}%`, background: "var(--gradient-warm)" }}
            />
          </div>
          {progress.badges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {progress.badges.map((b) => {
                const c = WORD_CATEGORIES.find((x) => x.id === b);
                if (!c) return null;
                return (
                  <span
                    key={b}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary"
                  >
                    🏅 {t(c.label, lang)}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Category chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <CatChip
            active={activeCat === "all"}
            onClick={() => setActiveCat("all")}
            emoji="✦"
            label={COPY.all[lang]}
          />
          {WORD_CATEGORIES.map((c) => {
            const ct = categoryTotals(c.id);
            return (
              <CatChip
                key={c.id}
                active={c.id === activeCat}
                onClick={() => setActiveCat(c.id)}
                emoji={c.emoji}
                label={t(c.label, lang)}
                badge={ct.complete ? "🏅" : undefined}
              />
            );
          })}
        </div>

        {/* Grouped sections (when "all"), or flat list when filtered */}
        <div className="mt-6 space-y-8">
          {activeCat === "all" ? (
            WORD_CATEGORIES.map((c) => {
              const items = visible.filter((w) => w.category === c.id);
              if (items.length === 0) return null;
              const ct = categoryTotals(c.id);
              return (
                <section key={c.id}>
                  <header className="flex items-baseline justify-between gap-2 mb-3">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="text-xl" aria-hidden>{c.emoji}</span>
                      <h2 className="text-lg font-bold truncate">{t(c.label, lang)}</h2>
                    </div>
                    <div className="text-[11px] font-semibold text-muted-foreground tabular-nums shrink-0">
                      {ct.revealed}/{ct.total}
                      {ct.complete && <span className="ml-1 text-secondary">🏅</span>}
                    </div>
                  </header>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{t(c.blurb, lang)}</p>
                  <ul className="space-y-3">
                    {items.map((w) => (
                      <WordCard
                        key={w.id}
                        item={w}
                        open={openId === w.id}
                        onToggle={() => handleReveal(w.id)}
                        lang={lang}
                        quizDone={progress.quizCorrect.includes(w.id)}
                        onQuizCorrect={(gained) => {
                          if (gained > 0) setToast(COPY.plusXp[lang].replace("%n", String(gained)));
                        }}
                      />
                    ))}
                  </ul>
                </section>
              );
            })
          ) : (
            <ul className="space-y-3">
              {visible.map((w) => (
                <WordCard
                  key={w.id}
                  item={w}
                  open={openId === w.id}
                  onToggle={() => handleReveal(w.id)}
                  lang={lang}
                  quizDone={progress.quizCorrect.includes(w.id)}
                  onQuizCorrect={(gained) => {
                    if (gained > 0) setToast(COPY.plusXp[lang].replace("%n", String(gained)));
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* XP toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-foreground text-background text-sm font-bold shadow-lg animate-float-up"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function CatChip({
  active,
  onClick,
  emoji,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border transition " +
        (active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40")
      }
    >
      <span className="mr-1" aria-hidden>{emoji}</span>
      {label}
      {badge && <span className="ml-1" aria-hidden>{badge}</span>}
    </button>
  );
}

function WordCard({
  item,
  open,
  onToggle,
  lang,
  quizDone,
  onQuizCorrect,
}: {
  item: (typeof words)[number];
  open: boolean;
  onToggle: () => void;
  lang: Lang;
  quizDone: boolean;
  onQuizCorrect: (gained: number) => void;
}) {
  const quiz = quizForWord(item.id);

  return (
    <li>
      <div
        className={
          "rounded-2xl border bg-card transition-all duration-200 " +
          (open ? "border-primary/60" : "border-border hover:border-primary/40")
        }
        style={open ? { boxShadow: "var(--shadow-soft)" } : undefined}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="w-full text-left p-4 sm:p-5 active:scale-[0.99] transition-transform rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none shrink-0" aria-hidden>{item.emoji ?? "❝"}</span>
            <div className="min-w-0 flex-1">
              <blockquote className="text-base sm:text-lg font-semibold leading-snug italic">
                « {t(item.quote, lang)} »
              </blockquote>
              <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {t(item.author, lang)}
              </div>
              {!open && (
                <div className="mt-2 text-[11px] text-muted-foreground">
                  {COPY.tapToReveal[lang]}
                </div>
              )}
            </div>
            {quizDone && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary shrink-0"
                title={COPY.alreadyDone[lang]}
                aria-label={COPY.alreadyDone[lang]}
              >
                ✓
              </span>
            )}
          </div>
        </button>

        {open && (
          <div className="px-4 sm:px-5 pb-5 pt-0 space-y-4 animate-float-up">
            <div className="pt-4 border-t border-border space-y-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {COPY.context[lang]}
                </div>
                <p className="text-sm leading-relaxed">{t(item.context, lang)}</p>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {COPY.meaning[lang]}
                </div>
                <p className="text-sm leading-relaxed">{t(item.meaning, lang)}</p>
              </div>
              {item.figureId && (
                <Link
                  to="/figures/$figureId"
                  params={{ figureId: item.figureId }}
                  className="inline-block text-xs font-semibold text-primary hover:underline"
                >
                  {COPY.viewFigure[lang]}
                </Link>
              )}
            </div>

            {quiz && (
              <InlineQuiz
                quiz={quiz}
                lang={lang}
                done={quizDone}
                onCorrect={() => {
                  const r = markQuizCorrect(item.id);
                  onQuizCorrect(r.gained);
                }}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function InlineQuiz({
  quiz,
  lang,
  done,
  onCorrect,
}: {
  quiz: WordsQuizItem;
  lang: Lang;
  done: boolean;
  onCorrect: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const isCorrect = picked !== null && picked === quiz.correctIndex;

  const kindLabel: Record<WordsQuizItem["kind"], { en: string; fr: string; ar: string }> = {
    "true-false": { en: "True / False", fr: "Vrai / Faux", ar: "صحيح / خطأ" },
    "who-am-i": { en: "Who am I?", fr: "Qui suis-je ?", ar: "من أكون؟" },
    "who-said": { en: "Who said this?", fr: "Qui l'a dit ?", ar: "من قال هذا؟" },
  };

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {COPY.quiz[lang]} · {kindLabel[quiz.kind][lang]}
        </div>
        {done && (
          <span className="text-[10px] font-bold text-secondary">
            ✓ {COPY.alreadyDone[lang]}
          </span>
        )}
      </div>
      <p className="text-sm font-semibold leading-snug mb-3">{t(quiz.question, lang)}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quiz.options.map((opt, i) => {
          const chosen = picked === i;
          const correctChoice = picked !== null && i === quiz.correctIndex;
          const wrongChoice = chosen && i !== quiz.correctIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (picked !== null && isCorrect) return;
                setPicked(i);
                if (i === quiz.correctIndex && !done) onCorrect();
              }}
              disabled={picked !== null && isCorrect}
              className={
                "text-left text-sm px-3 py-2 rounded-lg border transition " +
                (correctChoice
                  ? "bg-primary/15 border-primary text-foreground"
                  : wrongChoice
                  ? "bg-destructive/10 border-destructive text-foreground"
                  : "bg-card border-border hover:border-primary/40")
              }
            >
              {t(opt, lang)}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className={
            "mt-3 text-xs leading-relaxed rounded-lg px-3 py-2 " +
            (isCorrect
              ? "bg-primary/10 text-foreground border border-primary/30"
              : "bg-destructive/10 text-foreground border border-destructive/30")
          }
        >
          <div className="font-bold mb-0.5">
            {isCorrect ? `✓ ${COPY.correct[lang]}` : `↻ ${COPY.tryAgain[lang]}`}
          </div>
          <div>{t(quiz.explanation, lang)}</div>
        </div>
      )}
    </div>
  );
}
