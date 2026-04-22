import { useEffect, useMemo, useRef, useState } from "react";
import { AmazighSymbol } from "@/components/brand/AmazighSymbol";
import type { Lang, Localized } from "@/lib/i18n";

// ---------- Shared multilingual helpers ----------
export type L3 = Localized<string>;
export const L = (fr: string, en: string, ar: string): L3 => ({ fr, en, ar });
export const tr = (v: L3, lang: Lang): string => v[lang] ?? v.en;

// ---------- GuideBubble — soft narrator voice ----------
export function GuideBubble({ text, lang }: { text: L3; lang: Lang }) {
  return (
    <div
      className="my-6 flex items-start gap-3 rounded-2xl border border-secondary/30 bg-secondary/5 px-4 py-3 sm:px-5 sm:py-4 animate-fade-in"
      role="note"
    >
      <div
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg bg-secondary/15 border border-secondary/40"
        aria-hidden
      >
        🪶
      </div>
      <p className="text-sm sm:text-[15px] text-foreground/85 leading-relaxed italic">
        {tr(text, lang)}
      </p>
    </div>
  );
}

// ---------- MuseumReveal — section that fades in when scrolled ----------
export function MuseumReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        "transition-all duration-700 ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

// ---------- DecisionGame — multiple scenarios, reflective ----------
export type DecisionChoice = { label: L3; feedback: L3 };
export type DecisionScenario = { prompt: L3; choices: DecisionChoice[] };

const UI_DECISION = {
  title: L("Et toi, que ferais-tu ?", "What would you do?", "وأنت، ماذا ستفعل؟"),
  reflect: L("Réfléchis…", "Take a moment…", "تأمّل قليلاً…"),
  again: L("Choisir à nouveau", "Choose again", "اختر مجدّدًا"),
  next: L("Scénario suivant", "Next scenario", "السيناريو التالي"),
  prev: L("Précédent", "Previous", "السابق"),
  step: L("Scénario", "Scenario", "سيناريو"),
};

export function DecisionGame({
  scenarios,
  lang,
}: {
  scenarios: DecisionScenario[];
  lang: Lang;
}) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const s = scenarios[step];

  const goto = (i: number) => {
    setStep(Math.max(0, Math.min(scenarios.length - 1, i)));
    setPicked(null);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/95 shadow-sm p-6 sm:p-7">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            🤔
          </span>
          <h3 className="text-lg sm:text-xl font-bold">{tr(UI_DECISION.title, lang)}</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {tr(UI_DECISION.step, lang)} {step + 1} / {scenarios.length}
        </span>
      </div>

      <p className="text-foreground/85 leading-relaxed mb-4">{tr(s.prompt, lang)}</p>

      {picked === null ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {s.choices.map((c, i) => (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className="text-start p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-secondary/50 transition-all"
            >
              <span className="text-sm font-semibold">{tr(c.label, lang)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-4 animate-fade-in">
          <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
            {tr(UI_DECISION.reflect, lang)}
          </div>
          <p className="text-foreground/90 leading-relaxed">
            {tr(s.choices[picked].feedback, lang)}
          </p>
          <button
            onClick={() => setPicked(null)}
            className="mt-3 text-sm font-semibold text-secondary hover:underline"
          >
            ↺ {tr(UI_DECISION.again, lang)}
          </button>
        </div>
      )}

      {scenarios.length > 1 && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <button
            onClick={() => goto(step - 1)}
            disabled={step === 0}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            ← {tr(UI_DECISION.prev, lang)}
          </button>
          <div className="flex gap-1.5">
            {scenarios.map((_, i) => (
              <span
                key={i}
                className={
                  "w-1.5 h-1.5 rounded-full transition " +
                  (i === step ? "bg-secondary w-4" : "bg-border")
                }
              />
            ))}
          </div>
          <button
            onClick={() => goto(step + 1)}
            disabled={step === scenarios.length - 1}
            className="text-sm font-semibold text-secondary hover:underline disabled:opacity-30"
          >
            {tr(UI_DECISION.next, lang)} →
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- MapSection — light SVG map of Algeria regions ----------
export type MapRegion = {
  id: string;
  name: L3;
  /** Approximate bbox on the SVG viewBox 0 0 100 100 */
  cx: number;
  cy: number;
  r: number;
  description: L3;
  events: L3[];
  figures: L3[];
};

const UI_MAP = {
  title: L("Carte d'Algérie", "Map of Algeria", "خريطة الجزائر"),
  hint: L(
    "Touche une région pour découvrir ses événements et figures.",
    "Tap a region to discover its events and figures.",
    "اضغط على منطقة لاكتشاف أحداثها وأعلامها.",
  ),
  events: L("Événements", "Events", "أحداث"),
  figures: L("Figures", "Figures", "أعلام"),
  pickRegion: L(
    "Choisis une région pour commencer.",
    "Pick a region to begin.",
    "اختر منطقة للبدء.",
  ),
};

export function MapSection({
  regions,
  lang,
}: {
  regions: MapRegion[];
  lang: Lang;
}) {
  const [active, setActive] = useState<string | null>(null);
  const region = useMemo(
    () => regions.find((r) => r.id === active) ?? null,
    [active, regions],
  );

  return (
    <div className="rounded-2xl border border-border bg-card/95 shadow-sm p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl" aria-hidden>
          🗺️
        </span>
        <h3 className="text-lg sm:text-xl font-bold">{tr(UI_MAP.title, lang)}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{tr(UI_MAP.hint, lang)}</p>

      <div className="grid md:grid-cols-2 gap-5 items-start">
        <div className="relative aspect-[4/5] rounded-xl border border-border bg-gradient-to-br from-secondary/5 to-primary/5 overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Algeria map"
          >
            {/* Stylised Algeria silhouette */}
            <path
              d="M22 12 L60 8 L78 14 L82 26 L74 38 L82 52 L70 70 L62 88 L46 92 L34 84 L26 70 L18 56 L14 40 L18 24 Z"
              fill="color-mix(in oklab, var(--secondary) 12%, var(--card))"
              stroke="color-mix(in oklab, var(--secondary) 35%, transparent)"
              strokeWidth="0.6"
            />
            {/* Coastline accent */}
            <path
              d="M22 12 L60 8 L78 14"
              fill="none"
              stroke="color-mix(in oklab, var(--primary) 50%, transparent)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />

            {regions.map((r) => {
              const isActive = r.id === active;
              return (
                <g key={r.id}>
                  <circle
                    cx={r.cx}
                    cy={r.cy}
                    r={isActive ? r.r + 1.5 : r.r}
                    fill={
                      isActive
                        ? "var(--secondary)"
                        : "color-mix(in oklab, var(--secondary) 60%, transparent)"
                    }
                    stroke="white"
                    strokeWidth="0.8"
                    className="cursor-pointer transition-all"
                    onClick={() => setActive(r.id)}
                  />
                  <text
                    x={r.cx}
                    y={r.cy - r.r - 1.5}
                    textAnchor="middle"
                    fontSize="3.2"
                    fontWeight={isActive ? 700 : 500}
                    fill="var(--foreground)"
                    className="cursor-pointer select-none"
                    onClick={() => setActive(r.id)}
                  >
                    {tr(r.name, lang)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="min-h-[12rem]">
          {region ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <AmazighSymbol size={18} glow={false} />
                <h4 className="text-base sm:text-lg font-bold">{tr(region.name, lang)}</h4>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                {tr(region.description, lang)}
              </p>
              {region.events.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                    {tr(UI_MAP.events, lang)}
                  </div>
                  <ul className="space-y-1">
                    {region.events.map((e, i) => (
                      <li key={i} className="text-sm text-foreground/85 flex gap-2">
                        <span className="text-secondary">•</span>
                        <span>{tr(e, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {region.figures.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                    {tr(UI_MAP.figures, lang)}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {region.figures.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-foreground/85"
                      >
                        {tr(f, lang)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-sm text-muted-foreground p-6 rounded-xl border border-dashed border-border">
              {tr(UI_MAP.pickRegion, lang)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- ReflectionCard — "How does this connect to today?" ----------
const UI_REFLECT = {
  title: L(
    "Comment cela résonne aujourd'hui ?",
    "How does this connect to today?",
    "كيف يرتبط هذا بالحاضر؟",
  ),
};

export function ReflectionCard({
  points,
  accent = "var(--primary)",
  lang,
}: {
  points: L3[];
  accent?: string;
  lang: Lang;
}) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, " +
          accent +
          " 12%, var(--card)), var(--card))",
        borderColor: "color-mix(in oklab, " + accent + " 30%, var(--border))",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl" aria-hidden>
          🌱
        </span>
        <h3 className="text-base sm:text-lg font-bold">{tr(UI_REFLECT.title, lang)}</h3>
      </div>
      <ul className="space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span>{tr(p, lang)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- WeRemember — gentle memorial card ----------
const UI_REMEMBER = {
  title: L("Nous nous souvenons", "We Remember", "نتذكَّر"),
};

export function WeRememberCard({ text, lang }: { text: L3; lang: Lang }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-7 text-center">
      <div className="flex justify-center mb-3" aria-hidden>
        <span className="text-2xl">🕯️</span>
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
        {tr(UI_REMEMBER.title, lang)}
      </div>
      <p className="text-foreground/85 leading-relaxed max-w-prose mx-auto italic">
        {tr(text, lang)}
      </p>
    </div>
  );
}

// ---------- DailyCard — daily fact + question + soft streak ----------
const UI_DAILY = {
  title: L("Ton moment du jour", "Your daily moment", "لحظتك اليوم"),
  fact: L("Fait du jour", "Daily fact", "حقيقة اليوم"),
  question: L("Question du jour", "Daily question", "سؤال اليوم"),
  streak: L("jours d'affilée", "day streak", "أيام متتالية"),
  correct: L("Bien vu !", "Nice!", "أحسنت!"),
  notQuite: L("Pas tout à fait. La bonne réponse est mise en avant.", "Not quite. The correct one is highlighted.", "ليست تمامًا. الإجابة الصحيحة مميّزة."),
};

const STREAK_KEY = "att-daily-streak-v1";

function readStreak(): { count: number; lastDay: string } {
  if (typeof window === "undefined") return { count: 0, lastDay: "" };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastDay: "" };
    const parsed = JSON.parse(raw);
    return { count: Number(parsed.count) || 0, lastDay: String(parsed.lastDay || "") };
  } catch {
    return { count: 0, lastDay: "" };
  }
}

function writeStreak(s: { count: number; lastDay: string }) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
  } catch {
    /* noop */
  }
}

export type DailyQuestion = { q: L3; options: L3[]; answerIndex: number };

export function DailyCard({
  facts,
  questions,
  lang,
}: {
  facts: L3[];
  questions: DailyQuestion[];
  lang: Lang;
}) {
  const today = useMemo(() => new Date(), []);
  const dayKey = today.toISOString().slice(0, 10);
  const dayIdx = today.getDate();
  const fact = facts[dayIdx % facts.length];
  const q = questions[dayIdx % questions.length];

  const [picked, setPicked] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const s = readStreak();
    setStreak(s.count);
  }, []);

  const onPick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answerIndex) {
      const prev = readStreak();
      const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
      let count = 1;
      if (prev.lastDay === dayKey) count = prev.count;
      else if (prev.lastDay === yesterday) count = prev.count + 1;
      writeStreak({ count, lastDay: dayKey });
      setStreak(count);
    }
  };

  return (
    <div
      className="rounded-2xl border border-secondary/40 p-5 sm:p-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--secondary) 14%, var(--card)), var(--card))",
      }}
    >
      <div
        className="absolute -right-6 -top-6 text-7xl opacity-10 select-none pointer-events-none"
        aria-hidden
      >
        ⵣ
      </div>

      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            🌅
          </span>
          <h3 className="font-bold">{tr(UI_DAILY.title, lang)}</h3>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary/15 border border-secondary/30">
            <span aria-hidden>🔥</span>
            <span className="font-semibold">
              {streak} {tr(UI_DAILY.streak, lang)}
            </span>
          </div>
        )}
      </div>

      <div className="mb-4 relative">
        <div className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-1">
          {tr(UI_DAILY.fact, lang)}
        </div>
        <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
          {tr(fact, lang)}
        </p>
      </div>

      <div className="relative">
        <div className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">
          {tr(UI_DAILY.question, lang)}
        </div>
        <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed mb-3">
          {tr(q.q, lang)}
        </p>
        <div className="grid gap-2">
          {q.options.map((opt, i) => {
            const isCorrect = picked !== null && i === q.answerIndex;
            const isWrong = picked === i && i !== q.answerIndex;
            return (
              <button
                key={i}
                onClick={() => onPick(i)}
                disabled={picked !== null}
                className={
                  "text-start text-sm p-3 rounded-xl border transition-all " +
                  (isCorrect
                    ? "border-secondary bg-secondary/15"
                    : isWrong
                      ? "border-destructive/60 bg-destructive/10"
                      : "border-border bg-card hover:bg-muted/40 hover:border-secondary/40")
                }
              >
                {tr(opt, lang)}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <p className="mt-3 text-xs text-muted-foreground italic">
            {picked === q.answerIndex ? tr(UI_DAILY.correct, lang) : tr(UI_DAILY.notQuite, lang)}
          </p>
        )}
      </div>
    </div>
  );
}
