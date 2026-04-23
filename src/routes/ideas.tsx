import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { IDEAS, type IdeaTopic } from "@/data/ideas";
import { words } from "@/data/words";
import { figures } from "@/data/figures";
import { t, useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/ideas")({
  head: () => ({
    meta: [
      { title: "Debates & Ideas — Algeria Through Time" },
      {
        name: "description",
        content:
          "Key ideas, debates and intellectual currents that shaped Algerian thought — from plural Algeria to civilizational renewal.",
      },
      { property: "og:title", content: "Debates & Ideas — Algeria Through Time" },
      {
        property: "og:description",
        content:
          "A museum of ideas: plural Algeria, national identity, culture & language, and the thinkers behind them.",
      },
    ],
  }),
  component: IdeasPage,
});

const COPY = {
  title: { en: "Debates & Ideas", fr: "Débats & idées", ar: "نقاشات وأفكار" },
  intro: {
    en: "History is not only events — it is also ideas. Explore the debates and intellectual currents that shaped Algeria.",
    fr: "L'histoire n'est pas faite que d'événements — elle est aussi faite d'idées. Explorez les débats et les courants qui ont façonné l'Algérie.",
    ar: "التاريخ ليس وقائع وحسب — هو أفكارٌ أيضًا. استكشف النقاشات والتيارات التي صنعت الجزائر.",
  },
  thinkers: { en: "Thinkers", fr: "Penseurs", ar: "المفكرون" },
  quotes: { en: "Supporting voices", fr: "Voix associées", ar: "أصوات مرافقة" },
  readMore: { en: "Read more →", fr: "En savoir plus →", ar: "اقرأ المزيد ←" },
  inWords: { en: "Open in Words", fr: "Ouvrir dans Paroles", ar: "افتح في كلمات" },
  founder: { en: "Founder", fr: "Fondateur", ar: "المؤسِّس" },
  alsoAssociated: { en: "Also associated", fr: "Également associés", ar: "مرتبطون أيضًا" },
  openProfile: { en: "Open profile →", fr: "Voir le profil →", ar: "فتح الصفحة ←" },
} as const;

function IdeasPage() {
  const lang = useLang();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base leading-relaxed">
          {COPY.intro[lang]}
        </p>

        <ul className="mt-6 space-y-4">
          {IDEAS.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} lang={lang} />
          ))}
        </ul>
      </main>
    </div>
  );
}

function IdeaCard({ idea, lang }: { idea: IdeaTopic; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const linkedFigures = idea.figureIds
    .map((id) => figures.find((f) => f.id === id))
    .filter(Boolean) as typeof figures;
  const linkedWords = idea.wordIds
    .map((id) => words.find((w) => w.id === id))
    .filter(Boolean) as typeof words;

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
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full text-left p-4 sm:p-5 active:scale-[0.99] transition-transform rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none shrink-0" aria-hidden>
              {idea.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-bold leading-snug">
                {t(idea.title, lang)}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t(idea.summary, lang)}
              </p>
            </div>
          </div>
        </button>

        {open && (
          <div className="px-4 sm:px-5 pb-5 pt-0 space-y-4 animate-float-up">
            {idea.founder && (() => {
              const founderFigure = figures.find((f) => f.id === idea.founder!.figureId);
              if (!founderFigure) return null;
              return (
                <div className="pt-4 border-t border-border">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    {COPY.founder[lang]}
                  </div>
                  <Link
                    to="/figures/$figureId"
                    params={{ figureId: founderFigure.id }}
                    className="block rounded-xl border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition p-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none shrink-0" aria-hidden>
                        {founderFigure.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold leading-snug">
                          {t(founderFigure.displayName, lang)}
                        </div>
                        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {t(idea.founder!.role, lang)}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {t(idea.founder!.description, lang)}
                        </p>
                        <div className="mt-1.5 text-[11px] font-semibold text-primary">
                          {COPY.openProfile[lang]}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })()}

            {idea.miniFigures && idea.miniFigures.length > 0 && (
              <div className={idea.founder ? "" : "pt-4 border-t border-border"}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.alsoAssociated[lang]}
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {idea.miniFigures.map((m) => (
                    <li
                      key={m.id}
                      className="rounded-xl border border-border bg-background/40 p-3"
                    >
                      <div className="flex items-start gap-2">
                        {m.emoji && (
                          <span className="text-lg leading-none shrink-0" aria-hidden>
                            {m.emoji}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-semibold leading-snug">
                            {t(m.name, lang)}
                          </div>
                          <div className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                            {t(m.role, lang)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {linkedFigures.length > 0 && (
              <div className="pt-4 border-t border-border">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.thinkers[lang]}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {linkedFigures.map((f) => (
                    <li key={f.id}>
                      <Link
                        to="/figures/$figureId"
                        params={{ figureId: f.id }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary hover:bg-secondary/25 transition"
                      >
                        <span aria-hidden>{f.emoji}</span>
                        {t(f.displayName, lang)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {linkedWords.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {COPY.quotes[lang]}
                </div>
                <ul className="space-y-2">
                  {linkedWords.map((w) => (
                    <li
                      key={w.id}
                      className="rounded-xl border border-border bg-background/40 p-3"
                    >
                      <blockquote className="text-sm italic leading-snug">
                        « {t(w.quote, lang)} »
                      </blockquote>
                      <div className="mt-1.5 flex items-center justify-between gap-2 flex-wrap">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {t(w.author, lang)}
                        </div>
                        <Link
                          to="/words"
                          className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition"
                        >
                          {COPY.inWords[lang]} →
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
