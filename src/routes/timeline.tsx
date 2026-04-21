import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Crown, BookOpen, Moon, Swords, Flag, Lock, Sparkles, Lightbulb } from "lucide-react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getProgress, hasPassed, isUnlocked, type Progress } from "@/lib/progress";
import { t, tu, useLang, type Lang } from "@/lib/i18n";
import numidiaImg from "@/assets/era-numidia.jpg";
import romanImg from "@/assets/era-roman.jpg";
import islamicImg from "@/assets/era-islamic.jpg";
import frenchImg from "@/assets/era-french.jpg";
import independenceImg from "@/assets/era-independence.jpg";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Algeria Through Time" },
      {
        name: "description",
        content: "Explore the major eras of Algerian history, from Numidia to independence.",
      },
      { property: "og:title", content: "Algerian History Timeline" },
      {
        property: "og:description",
        content: "Five eras of Algerian history, from antiquity to modern liberation.",
      },
    ],
  }),
  component: Timeline,
});

type Category = "all" | "ancient" | "islamic" | "colonial" | "modern";

const ERA_META: Record<
  string,
  { image: string; icon: typeof Crown; category: Exclude<Category, "all"> }
> = {
  numidia: { image: numidiaImg, icon: Crown, category: "ancient" },
  roman: { image: romanImg, icon: BookOpen, category: "ancient" },
  islamic: { image: islamicImg, icon: Moon, category: "islamic" },
  french: { image: frenchImg, icon: Swords, category: "colonial" },
  independence: { image: independenceImg, icon: Flag, category: "modern" },
};

const FILTERS: { key: Category; labelKey: "filterAllEras" | "filterAncient" | "filterIslamic" | "filterColonial" | "filterModern" }[] = [
  { key: "all", labelKey: "filterAllEras" },
  { key: "ancient", labelKey: "filterAncient" },
  { key: "islamic", labelKey: "filterIslamic" },
  { key: "colonial", labelKey: "filterColonial" },
  { key: "modern", labelKey: "filterModern" },
];

function Timeline() {
  const [progress, setProgress] = useState<Progress>({ xp: 0, completed: {}, badges: [] });
  const [filter, setFilter] = useState<Category>("all");
  const lang = useLang();

  useEffect(() => {
    const update = () => setProgress(getProgress());
    update();
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, []);

  const filtered = useMemo(
    () => eras.filter((e) => filter === "all" || ERA_META[e.id]?.category === filter),
    [filter],
  );

  const completedEras = eras.filter((e) => hasPassed(e.id)).length;
  const quizzesCompleted = Object.keys(progress.completed).length;
  const totalFacts = eras.reduce((sum, e) => sum + (e.facts?.length ?? 0), 0);
  const factsDiscovered = eras.reduce(
    (sum, e) => sum + (hasPassed(e.id) ? e.facts?.length ?? 0 : 0),
    0,
  );

  // Random "Did you know?" fact across unlocked eras (or all on first load).
  const randomFact = useMemo(() => {
    const pool = eras.flatMap((e) => (e.facts ?? []).map((f) => ({ fact: f, era: e })));
    if (pool.length === 0) return null;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.xp]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        {/* Top section */}
        <div className="text-center mb-6 animate-float-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{tu("journeyTitle", lang)}</h1>
          <p className="mt-2 text-muted-foreground">{tu("journeySubtitle", lang)}</p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground/80 border-border hover:bg-muted"
                }`}
              >
                {tu(f.labelKey, lang)}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <ol className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-2 bottom-2 w-[3px] rounded-full bg-secondary/30"
            style={{ insetInlineStart: "1.375rem" }}
            aria-hidden
          />
          {/* Filled progress line */}
          <div
            className="absolute top-2 w-[3px] rounded-full bg-secondary transition-all duration-700"
            style={{
              insetInlineStart: "1.375rem",
              height: `${eras.length > 0 ? (completedEras / eras.length) * 100 : 0}%`,
            }}
            aria-hidden
          />

          {filtered.map((era, i) => (
            <ChapterRow key={era.id} era={era} index={eras.findIndex((e) => e.id === era.id)} delay={i * 60} lang={lang} />
          ))}
        </ol>

        {/* Bottom stats section */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {randomFact && (
            <div
              className="rounded-2xl p-5 bg-card border border-border"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                {tu("didYouKnow", lang)}
              </div>
              <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                {t(randomFact.fact, lang)}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">— {t(randomFact.era.title, lang)}</div>
            </div>
          )}
          <div
            className="rounded-2xl p-5 bg-card border border-border"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {tu("yourProgress", lang)}
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Stat value={completedEras} label={tu("erasCompleted", lang)} />
              <Stat value={quizzesCompleted} label={tu("quizzesCompleted", lang)} />
              <Stat value={`${factsDiscovered}/${totalFacts}`} label={tu("factsCount", lang)} />
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-xl bg-muted/60 py-2.5 px-2">
      <div className="text-xl font-extrabold text-foreground">{value}</div>
      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{label}</div>
    </div>
  );
}

function ChapterRow({
  era,
  index,
  delay,
  lang,
}: {
  era: (typeof eras)[number];
  index: number;
  delay: number;
  lang: Lang;
}) {
  const meta = ERA_META[era.id];
  const Icon = meta?.icon ?? BookOpen;
  const unlocked = isUnlocked(era.id);
  const progress = getProgress();
  const c = progress.completed[era.id];
  const best = c?.bestScore ?? 0;
  const total = c?.total ?? era.quiz?.length ?? 0;
  const done = hasPassed(era.id);
  const factsTotal = era.facts?.length ?? 0;
  const factsFound = done ? factsTotal : 0;

  return (
    <li
      className="relative ps-16 pb-6 animate-float-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Milestone icon */}
      <div
        className={`absolute top-4 w-11 h-11 rounded-full flex items-center justify-center border-4 border-background transition-all ${
          unlocked ? "text-primary-foreground" : "text-muted-foreground"
        }`}
        style={{
          insetInlineStart: 0,
          background: unlocked ? "var(--gradient-warm)" : "var(--muted)",
          boxShadow: unlocked ? "var(--shadow-glow)" : "none",
        }}
      >
        {unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
      </div>

      <article
        className={`rounded-2xl bg-card border border-border overflow-hidden transition-all ${
          unlocked ? "hover:scale-[1.01]" : "opacity-75"
        }`}
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-[40%] aspect-[16/10] sm:aspect-auto overflow-hidden">
            <img
              src={meta?.image}
              alt={t(era.title, lang)}
              loading="lazy"
              width={768}
              height={768}
              className={`w-full h-full object-cover transition-all ${
                unlocked ? "" : "grayscale-[60%] opacity-80"
              }`}
            />
            {!unlocked && (
              <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                <span className="px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-[11px] font-bold text-muted-foreground inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" /> {tu("locked", lang)}
                </span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                  {tu("chapter", lang)} {index + 1}
                </div>
                <h2 className="text-lg sm:text-xl font-bold mt-0.5 leading-tight">
                  {t(era.title, lang)}
                </h2>
                <div className="text-xs text-muted-foreground mt-0.5">{era.dateRange}</div>
              </div>
              <span
                className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  done
                    ? "bg-secondary text-secondary-foreground"
                    : unlocked
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? `${best}/${total}` : unlocked ? tu("statusNew", lang) : tu("locked", lang)}
              </span>
            </div>

            <p className="text-sm text-foreground/80 line-clamp-2">{t(era.summary, lang)}</p>

            <div className="mt-auto flex items-end justify-between gap-3 pt-1">
              <div className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground/80">
                  {factsFound}/{factsTotal}
                </span>{" "}
                {tu("funFactsDiscovered", lang)}
              </div>
              {unlocked ? (
                <Link
                  to="/era/$eraId"
                  params={{ eraId: era.id }}
                  className="shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                >
                  {done ? tu("continueBtn", lang) : tu("startBtn", lang)} →
                </Link>
              ) : (
                <span className="shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed">
                  <Lock className="w-3.5 h-3.5" /> {tu("lockedBtn", lang)}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
