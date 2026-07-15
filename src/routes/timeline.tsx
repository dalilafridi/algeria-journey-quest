import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Crown, BookOpen, Moon, Shield, Swords, Flag, Lock, Sparkles, Lightbulb, Sun } from "lucide-react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getProgress, hasPassed, isUnlocked, type Progress } from "@/lib/progress";
import { t, tu, useLang, type Lang } from "@/lib/i18n";
import earlyImg from "@/assets/era-earlynorthafrica.jpg";
import numidiaImg from "@/assets/era-numidia.png";
import romanImg from "@/assets/era-roman.png";
import islamicImg from "@/assets/era-islamic.png";
import ottomanImg from "@/assets/era-ottoman.jpg";
import frenchImg from "@/assets/era-french.png";
import independenceImg from "@/assets/era-independence.png";
import { saveJourneyPlace } from "@/lib/continuity";
import { JourneyNext } from "@/components/JourneyNext";
import { EraPreview } from "@/components/EraPreview";
import { EraBadge, type EraBadgeKind } from "@/components/brand/EraBadge";
import { AchievementMedallion } from "@/components/brand/AchievementMedallion";


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
  earlynorthafrica: { image: earlyImg, icon: Sun, category: "ancient" },
  numidia: { image: numidiaImg, icon: Crown, category: "ancient" },
  roman: { image: romanImg, icon: BookOpen, category: "ancient" },
  islamic: { image: islamicImg, icon: Moon, category: "islamic" },
  ottoman: { image: ottomanImg, icon: Shield, category: "islamic" },
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

  useEffect(() => {
    saveJourneyPlace({
      section: "story",
      label: { fr: "Parcours · Histoire", en: "Journey · History", ar: "الرحلة · التاريخ" },
      description: { fr: "Le récit principal de l’Algérie", en: "The main learning path through Algeria", ar: "المسار التعليمي الأساسي عبر الجزائر" },
      href: "/timeline",
    });
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

  const progressPct = eras.length > 0 ? (completedEras / eras.length) * 100 : 0;

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        {/* Top section */}
        <div className="text-center mb-6 animate-cinematic-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span aria-hidden className="text-accent-foreground">ⵣ</span>
            {lang === "fr" ? "Le parcours" : lang === "ar" ? "المسار" : "The journey"}
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            {tu("journeyTitle", lang)}
          </h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">{tu("journeySubtitle", lang)}</p>

          {/* Progress ribbon */}
          <div className="mt-6 mx-auto max-w-md">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              <span>{tu("yourProgress", lang)}</span>
              <span className="text-foreground">
                {completedEras}/{eras.length}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: "var(--gradient-warm)" }}
              />
            </div>
          </div>

          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-xs font-semibold text-muted-foreground">
            <Link to="/moments" hash="education-title" className="hover:text-primary transition">
              {lang === "fr" ? "Éducation & Identité" : lang === "ar" ? "التعليم والهوية" : "Education & Identity"}
            </Link>
            <span aria-hidden className="inline-block rtl:rotate-180">→</span>
            <Link to="/moments" hash="independence-war-title" className="hover:text-primary transition">
              {lang === "fr" ? "Guerre d’indépendance" : lang === "ar" ? "ثورة التحرير" : "War of Independence"}
            </Link>
          </div>
        </div>

        {/* Interactive Chronicle invitation */}
        <Link
          to="/chronicle"
          className="group relative block mb-8 overflow-hidden rounded-2xl border border-border animate-fade-in"
          style={{
            background:
              "linear-gradient(120deg, #0b0906 0%, #14100a 55%, #1a130a 100%)",
            boxShadow: "var(--shadow-glow), var(--shadow-soft)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px 200px at 20% 0%, oklch(0.75 0.13 82 / 0.35), transparent 60%), radial-gradient(400px 200px at 90% 100%, oklch(0.65 0.12 78 / 0.25), transparent 60%)",
            }}
          />
          <div className="relative flex items-center gap-4 p-4 sm:p-5">
            <div
              className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full shrink-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.9 0.11 82) 0%, oklch(0.55 0.11 70) 70%, oklch(0.3 0.05 55) 100%)",
                color: "#1a120a",
              }}
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.28em]" style={{ color: "oklch(0.82 0.13 82)" }}>
                {lang === "fr" ? "Nouveau" : lang === "ar" ? "جديد" : "New"} · {lang === "fr" ? "Chronique interactive" : lang === "ar" ? "السجل التفاعلي" : "Interactive Chronicle"}
              </div>
              <div className="text-base sm:text-lg font-semibold text-[oklch(0.92_0.03_82)] mt-0.5">
                {lang === "fr"
                  ? "Faites glisser 3 000 ans d'histoire"
                  : lang === "ar"
                    ? "اسحب ثلاثة آلاف عام من التاريخ"
                    : "Drag through 3,000 years of history"}
              </div>
            </div>
            <span
              className="shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition group-hover:scale-105"
              style={{ background: "oklch(0.82 0.13 82)", color: "#1a120a" }}
            >
              {lang === "fr" ? "Ouvrir" : lang === "ar" ? "افتح" : "Open"}
              <span aria-hidden className="rtl:rotate-180">→</span>
            </span>
          </div>
        </Link>

        {/* Filter chips — horizontally scrollable on mobile to avoid wrapping */}
        <div className="-mx-4 px-4 mb-8 overflow-x-auto no-scrollbar">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 w-max sm:w-auto mx-auto">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium border transition-all min-h-[44px] ${
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

        {completedEras >= eras.length && eras.length > 0 && (
          <div className="mt-6 flex justify-center animate-fade-in">
            <AchievementMedallion
              kind="exhibition-finished"
              variant="reveal"
              title={
                lang === "fr"
                  ? "Exposition achevée"
                  : lang === "ar"
                    ? "اكتملت الزيارة"
                    : "Exhibition finished"
              }
              subtitle={
                lang === "fr"
                  ? "Vous avez parcouru toutes les époques de l'Algérie."
                  : lang === "ar"
                    ? "لقد عبرت كل حقب الجزائر."
                    : "You have walked every era of Algeria."
              }
            />
          </div>
        )}

        <JourneyNext current="history" />
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

  const unlocked = isUnlocked(era.id);
  const progress = getProgress();
  const c = progress.completed[era.id];
  const best = c?.bestScore ?? 0;
  const total = c?.total ?? era.quiz?.length ?? 0;
  const done = hasPassed(era.id);
  const factsTotal = era.facts?.length ?? 0;
  const factsFound = done ? factsTotal : 0;

  const lockedMsg = {
    fr: "Bientôt accessible — terminez l’époque précédente",
    en: "Coming soon — complete the previous era",
    ar: "قريبًا — أكمل الحقبة السابقة",
  }[lang];

  return (
    <li
      className="relative ps-16 pb-7 animate-float-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Era medallion milestone */}
      <div
        className="absolute top-3"
        style={{ insetInlineStart: -6 }}
      >
        <EraBadge
          kind={era.id as EraBadgeKind}
          unlocked={unlocked}
          size={56}
          animate={done}
          label={t(era.title, lang)}
        />
      </div>


      <article
        className={`relative rounded-2xl bg-card border overflow-hidden transition-all card-hover ${
          done ? "border-accent/60" : unlocked ? "border-border" : "border-border/70"
        }`}
        style={{
          boxShadow: done
            ? "var(--shadow-glow), var(--shadow-soft)"
            : "var(--shadow-soft)",
        }}
      >
        {/* Museum seal for completed eras */}
        {done && (
          <div
            className="absolute top-3 end-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-accent/50 bg-accent/15 text-accent-foreground backdrop-blur"
            aria-hidden
          >
            <span>ⵣ</span>
            {lang === "fr" ? "Chapitre achevé" : lang === "ar" ? "فصل مكتمل" : "Chapter complete"}
          </div>
        )}

        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-[40%] aspect-[16/10] sm:aspect-auto overflow-hidden">
            <img
              src={meta?.image}
              alt={t(era.title, lang)}
              loading="lazy"
              width={768}
              height={768}
              className={`w-full h-full object-cover transition-all duration-700 ${
                unlocked ? "" : "grayscale-[40%]"
              }`}
            />
            {/* Cinematic bottom gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--foreground) 35%, transparent))",
              }}
              aria-hidden
            />
            {!unlocked && (
              <div className="absolute inset-0 flex items-end p-3">
                <span className="px-2.5 py-1 rounded-full bg-card/90 backdrop-blur text-[11px] font-semibold text-muted-foreground inline-flex items-center gap-1 border border-border">
                  <Lock className="w-3 h-3" /> {tu("locked", lang)}
                </span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-primary uppercase tracking-[0.16em]">
                  {tu("chapter", lang)} {index + 1}
                </div>
                <h2 className="text-lg sm:text-xl font-bold mt-1 leading-tight">
                  {t(era.title, lang)}
                </h2>
                <div className="text-xs text-muted-foreground mt-0.5">{era.dateRange}</div>
              </div>
              {done ? (
                <span className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {best}/{total}
                </span>
              ) : unlocked ? (
                <span className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full bg-accent/30 text-accent-foreground border border-accent/40">
                  {tu("statusNew", lang)}
                </span>
              ) : null}
            </div>

            <p className="text-sm text-foreground/80 line-clamp-2">{t(era.summary, lang)}</p>

            {/* Progress + facts mini-bar (only when unlocked) */}
            {unlocked && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    <span className="font-semibold text-foreground/80">
                      {factsFound}/{factsTotal}
                    </span>{" "}
                    {tu("funFactsDiscovered", lang)}
                  </span>
                  {total > 0 && (
                    <span className="font-semibold text-foreground/70">
                      {best}/{total}
                    </span>
                  )}
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${factsTotal > 0 ? (factsFound / factsTotal) * 100 : 0}%`,
                      background: "var(--gradient-warm)",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
              {!unlocked ? (
                <div className="text-[11px] italic text-muted-foreground/90 leading-snug basis-full sm:basis-auto">
                  {lockedMsg}
                </div>
              ) : null}
              <div className="flex items-center gap-2 ms-auto">
                <EraPreview era={era} image={meta?.image} lang={lang} />
                {unlocked ? (
                  <Link
                    to="/era/$eraId"
                    params={{ eraId: era.id }}
                    className="shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity min-h-[36px]"
                    style={{ boxShadow: "var(--shadow-glow)" }}
                  >
                    {done ? tu("continueBtn", lang) : tu("startBtn", lang)}{" "}
                    <span aria-hidden className="inline-block rtl:rotate-180">→</span>
                  </Link>
                ) : (
                  <span className="shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold border border-border text-muted-foreground min-h-[36px]">
                    <Lock className="w-3.5 h-3.5" /> {tu("lockedBtn", lang)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
