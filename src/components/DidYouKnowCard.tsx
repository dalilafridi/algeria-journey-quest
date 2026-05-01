import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { t, tu, useLang, type LocalizedString, type Lang } from "@/lib/i18n";
import { eras, dailyFacts } from "@/data/eras";
import { figures } from "@/data/figures";
import { curatedFactByText } from "@/data/didYouKnow";
import { getProgress, hasPassed } from "@/lib/progress";

type Props = {
  fact?: LocalizedString;
};

const L = (en: string, fr: string, ar: string) => ({ en, fr, ar });

const COPY = {
  tapToExpand: L("Tap to discover", "Touchez pour découvrir", "اضغط للاكتشاف"),
  era: L("Era", "Époque", "الحقبة"),
  whyMatters: L("Why it matters", "Pourquoi c'est important", "لماذا يهمّ"),
  exploreEra: L("Explore this era", "Explorer cette époque", "استكشف هذه الحقبة"),
  viewFigure: L("View this figure", "Voir cette figure", "عرض هذه الشخصية"),
  close: L("Close", "Fermer", "إغلاق"),
  defaultWhy: L(
    "Small details like this stitch together the larger story of Algeria — its land, its people, and the memory passed between generations.",
    "Ces petits détails tissent ensemble la grande histoire de l'Algérie — sa terre, son peuple et la mémoire transmise entre les générations.",
    "تنسج هذه التفاصيل الصغيرة معًا الحكاية الكبرى للجزائر — أرضها وشعبها والذاكرة المتوارثة بين الأجيال.",
  ),
  remaining: (n: number) =>
    L(
      `${n} ${n === 1 ? "quiz" : "quizzes"} remaining to unlock the next journey step`,
      `${n} ${n === 1 ? "quiz restant" : "quiz restants"} pour débloquer la prochaine étape`,
      `${n} اختبار متبقٍ لفتح الخطوة التالية في الرحلة`,
    ),
  allUnlocked: L(
    "All eras unlocked — keep exploring",
    "Toutes les époques débloquées — continuez l'exploration",
    "تم فتح جميع الحقب — تابع الاستكشاف",
  ),
};

// ---------- Helpers ----------

function flatStr(v: LocalizedString | string | undefined): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return `${v.en ?? ""} ${v.fr ?? ""} ${v.ar ?? ""}`;
}
function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Pick a stable daily fact (same for the whole day, persisted in localStorage). */
function useDailyFact(override?: LocalizedString): LocalizedString {
  return useMemo(() => {
    if (override) return override;
    try {
      const today = new Date().toISOString().slice(0, 10);
      const KEY = "algeria-daily-fact-v1";
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { date: string; index: number };
        if (parsed.date === today && Number.isFinite(parsed.index) && dailyFacts[parsed.index]) {
          return dailyFacts[parsed.index];
        }
      }
      // Deterministic by date — same fact all day, rotates next day.
      const seed = Number(today.replace(/-/g, "")) || Date.now();
      const idx = seed % dailyFacts.length;
      if (typeof window !== "undefined") {
        localStorage.setItem(KEY, JSON.stringify({ date: today, index: idx }));
      }
      return dailyFacts[idx];
    } catch {
      // Fallback: random
      return dailyFacts[Math.floor(Math.random() * dailyFacts.length)] ?? dailyFacts[0];
    }
  }, [override]);
}

/** Robust era match: curated metadata first, then id reference, then text overlap. */
function findEraForFact(fact: LocalizedString) {
  // 0) Curated metadata — explicit linkage wins.
  const curated = typeof fact === "object" ? curatedFactByText.get(fact as never) : undefined;
  if (curated?.relatedType === "era" && curated.relatedId) {
    const byId = eras.find((e) => e.id === curated.relatedId);
    if (byId) return byId;
  }

  // 1) Reference equality (cheap)
  const direct = eras.find((e) => e.facts.some((f) => f === fact));
  if (direct) return direct;

  const factText = norm(flatStr(fact));
  if (!factText.trim()) return undefined;

  // 2) Match by era title keywords appearing in the fact
  let best: { era: (typeof eras)[number]; score: number } | undefined;
  for (const e of eras) {
    const titleWords = norm(flatStr(e.title))
      .split(/\s+/)
      .filter((w) => w.length > 3);
    let score = 0;
    for (const w of titleWords) if (factText.includes(w)) score += 2;
    // 3) Bonus: any era fact text overlap
    for (const f of e.facts) {
      const fNorm = norm(flatStr(f));
      if (fNorm && factText.includes(fNorm.slice(0, Math.min(40, fNorm.length)))) score += 5;
    }
    if (!best || score > best.score) best = { era: e, score };
  }
  return best && best.score > 0 ? best.era : undefined;
}

/** Detect a mentioned figure: prefer curated metadata, then match by canonical name. */
function findFigureForFact(fact: LocalizedString) {
  // Curated metadata first.
  const curated = typeof fact === "object" ? curatedFactByText.get(fact as never) : undefined;
  if (curated?.relatedType === "figure" && curated.relatedId) {
    const byId = figures.find((f) => f.id === curated.relatedId);
    if (byId) return byId;
  }

  const factText = norm(flatStr(fact));
  if (!factText.trim()) return undefined;
  for (const f of figures) {
    const n = norm(f.name);
    if (n && factText.includes(n)) return f;
    // also try displayName
    const dn = norm(flatStr(f.displayName));
    if (dn && factText.includes(dn)) return f;
  }
  return undefined;
}

/** Quizzes remaining until the next locked era is reached. */
function useRemainingQuizzes(): number | "all" {
  const [n, setN] = useState<number | "all">(() => computeRemaining());
  useEffect(() => {
    const update = () => setN(computeRemaining());
    window.addEventListener("progress-updated", update);
    return () => window.removeEventListener("progress-updated", update);
  }, []);
  return n;
}
function computeRemaining(): number | "all" {
  try {
    const p = getProgress();
    // Find first era not yet passed
    const idx = eras.findIndex((e) => !p.completed[e.id] || !hasPassed(e.id));
    if (idx === -1) return "all";
    // Count how many sequential eras still need passing to reach the next "unlocked" frontier (just 1 ahead is enough)
    return 1;
  } catch {
    return 1;
  }
}

// ---------- Component ----------

export function DidYouKnowCard({ fact: override }: Props) {
  const lang = useLang();
  const fact = useDailyFact(override);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const era = useMemo(() => findEraForFact(fact), [fact]);
  const figure = useMemo(() => findFigureForFact(fact), [fact]);
  const remaining = useRemainingQuizzes();

  const onToggle = () => setOpen((v) => !v);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const handleHighlight = (targetId: string) => (e: React.MouseEvent) => {
    // Only intercept if the target is on the same page
    const el = typeof document !== "undefined" ? document.getElementById(targetId) : null;
    if (!el) return; // graceful: let the link navigate
    e.preventDefault();
    e.stopPropagation();
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    el.classList.remove("highlight-target");
    // restart animation
    void el.offsetWidth;
    el.classList.add("highlight-target");
    window.setTimeout(() => el.classList.remove("highlight-target"), 2000);
  };

  return (
    <div
      ref={btnRef}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={onKey}
      aria-expanded={open}
      className="group block w-full text-left rounded-3xl border border-accent/40 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
      style={{
        backgroundColor: "color-mix(in oklab, var(--accent) 18%, var(--card))",
        boxShadow: open ? "var(--shadow-glow)" : "var(--shadow-soft)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl transition-transform duration-300 group-hover:scale-110" aria-hidden>
          💡
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-foreground/80">
              {tu("didYouKnow", lang)}
            </div>
            <span className="text-xs font-medium text-muted-foreground opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              {open ? t(COPY.close, lang) : t(COPY.tapToExpand, lang)}
            </span>
          </div>
          <p className="mt-1 text-foreground font-medium leading-relaxed">{t(fact, lang)}</p>

          <div
            className="grid transition-all duration-500 ease-out"
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              opacity: open ? 1 : 0,
              marginTop: open ? "1rem" : 0,
            }}
          >
            <div className="overflow-hidden">
              <div className={`rounded-2xl border border-border/60 bg-background/55 p-4 space-y-3 ${open ? "animate-fade-in" : ""}`}>
                {era && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t(COPY.era, lang)}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">
                      {t(era.title, lang)}
                      {era.dateRange ? (
                        <span className="ml-2 text-muted-foreground font-normal">· {era.dateRange}</span>
                      ) : null}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t(COPY.whyMatters, lang)}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85 line-clamp-3">
                    {era ? t(era.summary, lang) : t(COPY.defaultWhy, lang)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {era && (
                    <Link
                      to="/era/$eraId"
                      params={{ eraId: era.id }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Try in-page highlight first
                        const id = `era-${era.id}`;
                        if (typeof document !== "undefined" && document.getElementById(id)) {
                          handleHighlight(id)(e);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                    >
                      {t(COPY.exploreEra, lang)} →
                    </Link>
                  )}
                  {figure && (
                    <Link
                      to="/figures/$figureId"
                      params={{ figureId: figure.id }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const id = `figure-${figure.id}`;
                        if (typeof document !== "undefined" && document.getElementById(id)) {
                          handleHighlight(id)(e);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
                    >
                      {t(COPY.viewFigure, lang)} →
                    </Link>
                  )}
                </div>

                <div className="pt-1 text-[11px] text-muted-foreground/90 italic">
                  {remaining === "all"
                    ? t(COPY.allUnlocked, lang)
                    : t(COPY.remaining(remaining as number) as Record<Lang, string>, lang)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
