import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { t, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { figures, type Figure } from "@/data/figures";
import { eras, type Era } from "@/data/eras";
import { mapRegions, type MapRegion } from "@/data/mapRegions";

type Kind = "figures" | "eras" | "regions";

type CompareSearch = { kind: Kind; a?: string; b?: string };

export const Route = createFileRoute("/compare")({
  validateSearch: (raw: Record<string, unknown>): CompareSearch => {
    const k = raw.kind;
    const kind: Kind =
      k === "eras" || k === "regions" || k === "figures" ? (k as Kind) : "figures";
    const a = typeof raw.a === "string" ? raw.a : undefined;
    const b = typeof raw.b === "string" ? raw.b : undefined;
    return { kind, a, b };
  },
  head: () => ({
    meta: [
      { title: "Compare Mode — Algeria Through Time" },
      {
        name: "description",
        content:
          "Side-by-side museum plaques comparing Algerian figures, eras, and regions across timeline, geography, achievements, legacy and significance.",
      },
      { property: "og:title", content: "Compare Mode — Algeria Through Time" },
      {
        property: "og:description",
        content:
          "Place two figures, eras, or regions side by side and study their timeline, geography, achievements, legacy and historical significance.",
      },
    ],
  }),
  component: ComparePage,
});

const SERIF = "Georgia, 'Times New Roman', serif";

const TXT = {
  title: { en: "Compare Mode", fr: "Mode Comparaison", ar: "وضع المقارنة" },
  subtitle: {
    en: "Place two exhibits side by side and read them like museum plaques.",
    fr: "Placez deux vitrines côte à côte et lisez-les comme des plaques de musée.",
    ar: "ضع معروضين جنبًا إلى جنب واقرأهما كأنهما لوحتان في متحف.",
  },
  choose: { en: "Choose what to compare", fr: "Choisir ce qu'on compare", ar: "اختر ما تريد مقارنته" },
  figures: { en: "Two figures", fr: "Deux figures", ar: "شخصيتان" },
  eras: { en: "Two eras", fr: "Deux ères", ar: "حقبتان" },
  regions: { en: "Two regions", fr: "Deux régions", ar: "منطقتان" },
  selectA: { en: "Left plaque", fr: "Plaque de gauche", ar: "اللوحة اليسرى" },
  selectB: { en: "Right plaque", fr: "Plaque de droite", ar: "اللوحة اليمنى" },
  swap: { en: "Swap", fr: "Inverser", ar: "تبديل" },
  suggestions: { en: "Suggested pairings", fr: "Rapprochements suggérés", ar: "مقارنات مقترحة" },
  open: { en: "Open exhibit", fr: "Ouvrir la vitrine", ar: "افتح المعرض" },
  rowTimeline: { en: "Timeline", fr: "Chronologie", ar: "الخط الزمني" },
  rowGeography: { en: "Geography", fr: "Géographie", ar: "الجغرافيا" },
  rowAchievements: { en: "Achievements", fr: "Réalisations", ar: "الإنجازات" },
  rowLegacy: { en: "Legacy", fr: "Héritage", ar: "الإرث" },
  rowSignificance: { en: "Historical significance", fr: "Portée historique", ar: "الأهمية التاريخية" },
  emptyPick: {
    en: "Pick two exhibits above to open their plaques.",
    fr: "Choisissez deux vitrines ci-dessus pour afficher leurs plaques.",
    ar: "اختر معروضين أعلاه لعرض لوحتيهما.",
  },
  vs: { en: "vs", fr: "vs", ar: "مقابل" },
} as const;

const SUGGESTIONS: Record<Kind, { a: string; b: string }[]> = {
  figures: [
    { a: "massinissa", b: "jugurtha" },
    { a: "abdelkader", b: "lalla-fatma-nsoumer" },
    { a: "ben-badis", b: "mammeri" },
  ],
  eras: [
    { a: "numidia", b: "ottoman" },
    { a: "roman", b: "islamic" },
    { a: "french", b: "independence" },
  ],
  regions: [
    { a: "kabylie", b: "aures" },
    { a: "algiers", b: "constantine" },
    { a: "oran-west", b: "sahara" },
  ],
};

function ComparePage() {
  const lang = useLang();
  const search = Route.useSearch() as CompareSearch;
  const { kind, a, b } = search;
  const navigate = useNavigate({ from: "/compare" });

  const setSearch = (patch: Partial<CompareSearch>) =>
    navigate({ search: (prev: CompareSearch) => ({ ...prev, ...patch }) });

  const options = useMemo(() => buildOptions(kind, lang), [kind, lang]);
  const T = (k: keyof typeof TXT) => t(TXT[k], lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <PageBackdrop />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50/40 px-4 py-1 text-xs uppercase tracking-[0.28em] text-amber-800 dark:text-amber-200"
            style={{ fontFamily: SERIF }}
          >
            <span aria-hidden>◇</span>
            {T("title")}
            <span aria-hidden>◇</span>
          </div>
          <h1
            className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground"
            style={{ fontFamily: SERIF, letterSpacing: "0.01em" }}
          >
            {T("title")}
          </h1>
          <p
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground"
            style={{ fontFamily: SERIF }}
          >
            {T("subtitle")}
          </p>
        </header>

        {/* Controls */}
        <section className="rounded-2xl border border-border bg-card/80 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.4)] p-4 sm:p-6 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              style={{ fontFamily: SERIF }}
            >
              {T("choose")}:
            </span>
            {(["figures", "eras", "regions"] as Kind[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => navigate({ search: { kind: k, a: undefined, b: undefined } })}
                className={
                  "rounded-full border px-3 py-1.5 text-sm transition-colors " +
                  (kind === k
                    ? "border-amber-500/60 bg-amber-500/10 text-foreground shadow-inner"
                    : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted")
                }
                style={{ fontFamily: SERIF }}
              >
                {T(k)}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] items-end">
            <Selector
              label={T("selectA")}
              value={a}
              options={options}
              onChange={(v) => setSearch({ a: v })}
            />
            <button
              type="button"
              onClick={() => setSearch({ a: b, b: a })}
              className="justify-self-center rounded-full border border-border bg-background px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-muted transition"
              style={{ fontFamily: SERIF }}
              aria-label={T("swap")}
            >
              ⇄ {T("swap")}
            </button>
            <Selector
              label={T("selectB")}
              value={b}
              options={options}
              onChange={(v) => setSearch({ b: v })}
            />
          </div>

          {/* Suggestions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              style={{ fontFamily: SERIF }}
            >
              {T("suggestions")}:
            </span>
            {SUGGESTIONS[kind].map((s) => {
              const la = labelFor(kind, s.a, lang);
              const lb = labelFor(kind, s.b, lang);
              if (!la || !lb) return null;
              return (
                <button
                  key={s.a + "-" + s.b}
                  type="button"
                  onClick={() => setSearch({ a: s.a, b: s.b })}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-amber-500/50 hover:bg-amber-500/5 transition"
                  style={{ fontFamily: SERIF }}
                >
                  {la} <span className="opacity-60">{T("vs")}</span> {lb}
                </button>
              );
            })}
          </div>
        </section>

        {/* Comparison */}
        {a && b ? (
          <ComparisonPlaques kind={kind} aId={a} bId={b} lang={lang} T={T} />
        ) : (
          <div
            className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center text-muted-foreground"
            style={{ fontFamily: SERIF }}
          >
            {T("emptyPick")}
          </div>
        )}
      </main>
    </div>
  );
}

/* ============================================================ */
/* Selector                                                     */
/* ============================================================ */

function Selector({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | undefined;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span
        className="block text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-1.5"
        style={{ fontFamily: SERIF }}
      >
        {label}
      </span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        style={{ fontFamily: SERIF }}
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ============================================================ */
/* Plaques                                                      */
/* ============================================================ */

type Row = { key: string; title: string; content: React.ReactNode };
type Plaque = {
  id: string;
  kind: Kind;
  title: string;
  emoji: string;
  eyebrow: string;
  intro: string;
  rows: Row[];
  href: string;
  linkParams: Record<string, string>;
};

function ComparisonPlaques({
  kind,
  aId,
  bId,
  lang,
  T,
}: {
  kind: Kind;
  aId: string;
  bId: string;
  lang: Lang;
  T: (k: keyof typeof TXT) => string;
}) {
  const a = buildPlaque(kind, aId, lang);
  const b = buildPlaque(kind, bId, lang);
  if (!a || !b) return null;

  const rowTitles: Record<string, string> = {
    timeline: T("rowTimeline"),
    geography: T("rowGeography"),
    achievements: T("rowAchievements"),
    legacy: T("rowLegacy"),
    significance: T("rowSignificance"),
  };
  const keys = ["timeline", "geography", "achievements", "legacy", "significance"] as const;

  return (
    <section className="space-y-4">
      {/* Header row: two titles + vs sigil */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-6 items-center">
        <PlaqueTitle plaque={a} align="start" T={T} />
        <div className="hidden md:flex flex-col items-center gap-1 text-amber-700 dark:text-amber-300">
          <span className="text-2xl" style={{ fontFamily: SERIF }}>⚜</span>
          <span
            className="text-[10px] uppercase tracking-[0.35em] opacity-80"
            style={{ fontFamily: SERIF }}
          >
            {T("vs")}
          </span>
        </div>
        <PlaqueTitle plaque={b} align="end" T={T} />
      </div>

      {/* Rows */}
      <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-50/40 via-background to-amber-50/20 dark:from-amber-950/10 dark:to-amber-950/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] overflow-hidden">
        {keys.map((k, i) => {
          const ra = a.rows.find((r) => r.key === k);
          const rb = b.rows.find((r) => r.key === k);
          return (
            <div
              key={k}
              className={
                "grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-6 px-4 sm:px-6 py-5 " +
                (i > 0 ? "border-t border-amber-500/15" : "")
              }
            >
              <RowCell content={ra?.content} />
              <div className="hidden md:flex flex-col items-center justify-start pt-1 text-amber-800/80 dark:text-amber-200/70">
                <div
                  className="text-[10px] uppercase tracking-[0.28em] whitespace-nowrap px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30"
                  style={{ fontFamily: SERIF }}
                >
                  {rowTitles[k]}
                </div>
              </div>
              <div className="md:hidden text-[10px] uppercase tracking-[0.28em] text-amber-800 dark:text-amber-200" style={{ fontFamily: SERIF }}>
                {rowTitles[k]}
              </div>
              <RowCell content={rb?.content} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PlaqueTitle({
  plaque,
  align,
  T,
}: {
  plaque: Plaque;
  align: "start" | "end";
  T: (k: keyof typeof TXT) => string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-amber-500/30 bg-card p-5 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.15),0_10px_30px_-20px_rgba(0,0,0,0.4)] " +
        (align === "end" ? "md:text-right" : "")
      }
    >
      <div
        className="text-[10px] uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300"
        style={{ fontFamily: SERIF }}
      >
        {plaque.eyebrow}
      </div>
      <div className={"mt-1 flex items-baseline gap-2 " + (align === "end" ? "md:justify-end" : "")}>
        <span aria-hidden className="text-xl opacity-80">{plaque.emoji}</span>
        <h2
          className="text-xl sm:text-2xl font-semibold text-foreground"
          style={{ fontFamily: SERIF }}
        >
          {plaque.title}
        </h2>
      </div>
      {plaque.intro ? (
        <p
          className="mt-2 text-sm text-muted-foreground leading-relaxed"
          style={{ fontFamily: SERIF }}
        >
          {plaque.intro}
        </p>
      ) : null}
      <div className={"mt-3 " + (align === "end" ? "md:text-right" : "")}>
        <Link
          to={plaque.href as string as "/era/$eraId"}
          params={plaque.linkParams as { eraId: string }}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200 hover:underline"
          style={{ fontFamily: SERIF }}
        >
          {T("open")} →
        </Link>
      </div>
    </div>
  );
}

function RowCell({ content }: { content: React.ReactNode }) {
  return (
    <div
      className="text-sm text-foreground/90 leading-relaxed"
      style={{ fontFamily: SERIF }}
    >
      {content ?? <span className="text-muted-foreground">—</span>}
    </div>
  );
}

/* ============================================================ */
/* Data → Plaque adapters                                        */
/* ============================================================ */

function tt(v: LocalizedString | undefined, lang: Lang): string {
  return v ? t(v, lang) : "";
}

function buildOptions(kind: Kind, lang: Lang): { id: string; label: string }[] {
  if (kind === "figures") {
    return figures
      .map((f) => ({ id: f.id, label: tt(f.displayName, lang) || f.name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
  if (kind === "eras") {
    return eras.map((e) => ({ id: e.id, label: tt(e.title, lang) + " · " + e.dateRange }));
  }
  return mapRegions
    .map((r) => ({ id: r.id, label: tt(r.name, lang) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function labelFor(kind: Kind, id: string, lang: Lang): string | null {
  if (kind === "figures") {
    const f = figures.find((x) => x.id === id);
    return f ? tt(f.displayName, lang) || f.name : null;
  }
  if (kind === "eras") {
    const e = eras.find((x) => x.id === id);
    return e ? tt(e.title, lang) : null;
  }
  const r = mapRegions.find((x) => x.id === id);
  return r ? tt(r.name, lang) : null;
}

function buildPlaque(kind: Kind, id: string, lang: Lang): Plaque | null {
  if (kind === "figures") {
    const f = figures.find((x) => x.id === id);
    if (!f) return null;
    return figurePlaque(f, lang);
  }
  if (kind === "eras") {
    const e = eras.find((x) => x.id === id);
    if (!e) return null;
    return eraPlaque(e, lang);
  }
  const r = mapRegions.find((x) => x.id === id);
  if (!r) return null;
  return regionPlaque(r, lang);
}

function figurePlaque(f: Figure, lang: Lang): Plaque {
  const legacy =
    f.extended?.aftermath && f.extended.aftermath.length > 0
      ? f.extended.aftermath.slice(0, 2).map((p) => tt(p, lang)).join(" ")
      : tt(f.fact, lang);
  const achievements =
    f.extended?.whatHappened && f.extended.whatHappened.length > 0
      ? (
          <ul className="list-disc ps-4 space-y-1">
            {f.extended.whatHappened.slice(0, 4).map((p, i) => (
              <li key={i}>{tt(p, lang)}</li>
            ))}
          </ul>
        )
      : tt(f.importance, lang);
  return {
    id: f.id,
    kind: "figures",
    title: tt(f.displayName, lang) || f.name,
    emoji: f.emoji,
    eyebrow: tt(f.regionLabel, lang),
    intro: tt(f.story, lang),
    href: "/figures/$figureId",
    linkParams: { figureId: f.id },
    rows: [
      { key: "timeline", title: "Timeline", content: tt(f.era, lang) },
      { key: "geography", title: "Geography", content: tt(f.regionLabel, lang) },
      { key: "achievements", title: "Achievements", content: achievements },
      { key: "legacy", title: "Legacy", content: legacy },
      {
        key: "significance",
        title: "Significance",
        content: f.extended?.keyLesson ? tt(f.extended.keyLesson, lang) : tt(f.importance, lang),
      },
    ],
  };
}

function eraPlaque(e: Era, lang: Lang): Plaque {
  const places = e.places.slice(0, 4);
  const figuresNames = e.figures.slice(0, 4);
  return {
    id: e.id,
    kind: "eras",
    title: tt(e.title, lang),
    emoji: e.emoji,
    eyebrow: e.dateRange,
    intro: tt(e.summary, lang),
    href: "/era/$eraId",
    linkParams: { eraId: e.id },
    rows: [
      { key: "timeline", title: "Timeline", content: e.dateRange },
      {
        key: "geography",
        title: "Geography",
        content:
          places.length > 0 ? (
            <ul className="list-disc ps-4 space-y-1">
              {places.map((p, i) => (
                <li key={i}>
                  <span className="font-medium">{tt(p.name, lang)}</span>
                  <span className="text-muted-foreground"> — {tt(p.note, lang)}</span>
                </li>
              ))}
            </ul>
          ) : (
            "—"
          ),
      },
      {
        key: "achievements",
        title: "Achievements",
        content: (
          <ul className="list-disc ps-4 space-y-1">
            {e.facts.slice(0, 4).map((f, i) => (
              <li key={i}>{tt(f, lang)}</li>
            ))}
          </ul>
        ),
      },
      {
        key: "legacy",
        title: "Legacy",
        content: (
          <>
            <div className="mb-1">
              <span
                className="inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-xs text-amber-800 dark:text-amber-200"
                style={{ fontFamily: SERIF }}
              >
                {tt(e.badge, lang)}
              </span>
            </div>
            {figuresNames.length > 0 && (
              <div className="text-muted-foreground text-xs">
                {figuresNames.map((f) => tt(f.name, lang)).join(" · ")}
              </div>
            )}
          </>
        ),
      },
      { key: "significance", title: "Significance", content: tt(e.summary, lang) },
    ],
  };
}

function regionPlaque(r: MapRegion, lang: Lang): Plaque {
  const linkedEra = r.eraId ? eras.find((e) => e.id === r.eraId) : undefined;
  const linkedFigures = r.figureIds
    .map((id) => figures.find((f) => f.id === id))
    .filter(Boolean)
    .slice(0, 4) as Figure[];
  return {
    id: r.id,
    kind: "regions",
    title: tt(r.name, lang),
    emoji: r.emoji,
    eyebrow: tt(r.focus, lang),
    intro: tt(r.summary, lang),
    href: "/region/$regionId",
    linkParams: { regionId: r.id },
    rows: [
      {
        key: "timeline",
        title: "Timeline",
        content: linkedEra
          ? `${tt(linkedEra.title, lang)} · ${linkedEra.dateRange}`
          : r.facts[0]
          ? tt(r.facts[0], lang)
          : "—",
      },
      { key: "geography", title: "Geography", content: tt(r.focus, lang) },
      {
        key: "achievements",
        title: "Achievements",
        content: (
          <ul className="list-disc ps-4 space-y-1">
            {r.facts.slice(0, 4).map((f, i) => (
              <li key={i}>{tt(f, lang)}</li>
            ))}
          </ul>
        ),
      },
      {
        key: "legacy",
        title: "Legacy",
        content:
          linkedFigures.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {linkedFigures.map((f) => (
                <span
                  key={f.id}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs"
                >
                  <span aria-hidden>{f.emoji}</span>
                  {tt(f.displayName, lang) || f.name}
                </span>
              ))}
            </div>
          ) : (
            tt(r.summary, lang)
          ),
      },
      { key: "significance", title: "Significance", content: tt(r.summary, lang) },
    ],
  };
}

/* ============================================================ */
/* Backdrop                                                     */
/* ============================================================ */

function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
    </div>
  );
}
