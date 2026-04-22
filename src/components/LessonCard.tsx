import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { t, useLang } from "@/lib/i18n";
import { useExplainMode } from "@/lib/explainMode";
import type { Lesson } from "@/data/lessons";

const LBL = {
  oneMin: { en: "1-Minute Lesson", fr: "Leçon en 1 minute", ar: "درس في دقيقة" },
  why: { en: "Why it matters", fr: "Pourquoi c'est important", ar: "لماذا يهمّ" },
  quick: { en: "Quick question", fr: "Question rapide", ar: "سؤال سريع" },
  reveal: { en: "Show a hint", fr: "Voir un indice", ar: "إظهار تلميح" },
  hide: { en: "Hide", fr: "Masquer", ar: "إخفاء" },
  hint: {
    en: "Think about what makes this moment unique. Then explore the related figure or era to confirm!",
    fr: "Pense à ce qui rend ce moment unique. Explore ensuite la figure ou l'époque liée pour vérifier !",
    ar: "فكّر فيما يجعل هذه اللحظة فريدة، ثم استكشف الشخصية أو الحقبة المرتبطة للتأكّد!",
  },
  figure: { en: "See the figure", fr: "Voir la figure", ar: "اطّلع على الشخصية" },
  era: { en: "See the era", fr: "Voir l'époque", ar: "اطّلع على الحقبة" },
} as const;

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const lang = useLang();
  const [mode] = useExplainMode();
  const [open, setOpen] = useState(false);

  return (
    <article
      className="rounded-2xl bg-card border border-border p-5 sm:p-6 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{lesson.emoji}</span>
        <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-muted text-muted-foreground">
          {LBL.oneMin[lang]}
        </span>
        <span className="text-xs text-muted-foreground truncate">· {t(lesson.topic, lang)}</span>
      </div>

      <h3 className="font-bold text-lg leading-snug">{t(lesson.title, lang)}</h3>

      <ul className="mt-3 space-y-2">
        {lesson.facts.map((f, i) => (
          <li key={i} className="text-sm leading-relaxed rounded-xl bg-muted/50 px-3 py-2">
            <span className="font-bold text-primary me-1.5">{i + 1}.</span>
            {t(f[mode], lang)}
          </li>
        ))}
      </ul>

      <div
        className="mt-3 rounded-xl px-3 py-2 border"
        style={{
          borderColor: "color-mix(in oklab, var(--accent) 45%, transparent)",
          background: "color-mix(in oklab, var(--accent) 14%, var(--card))",
        }}
      >
        <div className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground/80">
          💡 {LBL.why[lang]}
        </div>
        <p className="text-sm mt-1">{t(lesson.whyItMatters[mode], lang)}</p>
      </div>

      <div className="mt-3 rounded-xl px-3 py-2 border border-border">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          ❓ {LBL.quick[lang]}
        </div>
        <p className="text-sm mt-1 font-medium">{t(lesson.question, lang)}</p>
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-2 text-xs font-semibold text-primary hover:underline"
        >
          {open ? LBL.hide[lang] : LBL.reveal[lang]}
        </button>
        {open && (
          <p className="mt-1 text-xs text-muted-foreground">{LBL.hint[lang]}</p>
        )}
      </div>

      {(lesson.figureId || lesson.era) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.figureId && (
            <Link
              to="/figures/$figureId"
              params={{ figureId: lesson.figureId }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/40 transition"
            >
              👤 {LBL.figure[lang]}
            </Link>
          )}
          {lesson.era && (
            <Link
              to="/era/$eraId"
              params={{ eraId: lesson.era }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/40 transition"
            >
              📜 {LBL.era[lang]}
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
