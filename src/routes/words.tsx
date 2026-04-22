import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { WORD_CATEGORIES, words, type WordCategoryId } from "@/data/words";
import { t, useLang } from "@/lib/i18n";

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
  hide: { en: "Hide", fr: "Masquer", ar: "إخفاء" },
  viewFigure: { en: "About this figure →", fr: "À propos de cette figure →", ar: "عن هذه الشخصية ←" },
} as const;

function WordsPage() {
  const lang = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<WordCategoryId | "all">("all");

  const visible = activeCat === "all" ? words : words.filter((w) => w.category === activeCat);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base leading-relaxed">{COPY.intro[lang]}</p>

        {/* Category chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCat("all")}
            className={
              "text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border transition " +
              (activeCat === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40")
            }
          >
            ✦ {lang === "fr" ? "Toutes" : lang === "ar" ? "الكل" : "All"}
          </button>
          {WORD_CATEGORIES.map((c) => {
            const sel = c.id === activeCat;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={
                  "text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border transition " +
                  (sel
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40")
                }
              >
                <span className="mr-1" aria-hidden>{c.emoji}</span>
                {t(c.label, lang)}
              </button>
            );
          })}
        </div>

        {/* Grouped sections (when "all"), or flat list when filtered */}
        <div className="mt-6 space-y-8">
          {activeCat === "all" ? (
            WORD_CATEGORIES.map((c) => {
              const items = visible.filter((w) => w.category === c.id);
              if (items.length === 0) return null;
              return (
                <section key={c.id}>
                  <header className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl" aria-hidden>{c.emoji}</span>
                    <h2 className="text-lg font-bold">{t(c.label, lang)}</h2>
                  </header>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{t(c.blurb, lang)}</p>
                  <ul className="space-y-3">
                    {items.map((w) => (
                      <WordCard key={w.id} item={w} open={openId === w.id} onToggle={() => setOpenId(openId === w.id ? null : w.id)} lang={lang} />
                    ))}
                  </ul>
                </section>
              );
            })
          ) : (
            <ul className="space-y-3">
              {visible.map((w) => (
                <WordCard key={w.id} item={w} open={openId === w.id} onToggle={() => setOpenId(openId === w.id ? null : w.id)} lang={lang} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function WordCard({
  item,
  open,
  onToggle,
  lang,
}: {
  item: (typeof words)[number];
  open: boolean;
  onToggle: () => void;
  lang: "en" | "fr" | "ar";
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={
          "w-full text-left rounded-2xl border bg-card p-4 sm:p-5 transition-all duration-200 active:scale-[0.99] hover:-translate-y-0.5 " +
          (open ? "border-primary/60" : "border-border hover:border-primary/40")
        }
        style={open ? { boxShadow: "var(--shadow-soft)" } : undefined}
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
        </div>

        {open && (
          <div className="mt-4 pt-4 border-t border-border space-y-3 animate-float-up">
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
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-xs font-semibold text-primary hover:underline"
              >
                {COPY.viewFigure[lang]}
              </Link>
            )}
          </div>
        )}
      </button>
    </li>
  );
}
