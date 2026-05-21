import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";

import {
  figures,
  FIGURE_CATEGORIES,
  FIGURE_REGIONS,
  type FigureCategory,
  type FigureRegion,
} from "@/data/figures";
import { figureMeta, FIGURE_THEMES, type FigureTheme } from "@/data/figureMeta";
import { eras } from "@/data/eras";
import { mapRegions } from "@/data/mapRegions";
import { t, tu, useLang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";

/** Map a figure region id to a real region page id, when one exists. */
const FIGURE_REGION_TO_MAP: Partial<Record<string, string>> = {
  kabylie: "kabylie",
  aures: "aures",
  algiers: "algiers",
  constantine: "constantine",
  "oran-west": "oran-west",
  "mascara-west": "oran-west",
  sahara: "sahara",
  numidia: "constantine",
};

/** Chronological weight, derived from category order. */
const CATEGORY_ORDER: FigureCategory[] = FIGURE_CATEGORIES.map((c) => c.id);

type SortKey = "featured" | "chronological" | "alphabetical";

export const Route = createFileRoute("/figures/")({
  head: () => ({
    meta: [
      { title: "Great Figures of Algeria — Algeria Through Time" },
      {
        name: "description",
        content:
          "A curated gallery of the people who shaped Algeria — from Massinissa and Dihya to Assia Djebar and Matoub Lounès.",
      },
    ],
  }),
  component: FiguresIndex,
});

function FiguresIndex() {
  const lang = useLang();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<FigureCategory | "all">("all");
  const [reg, setReg] = useState<FigureRegion | "all">("all");
  const [theme, setTheme] = useState<FigureTheme | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: { fr: "Figures", en: "Figures", ar: "الشخصيات" },
      description: {
        fr: "Explorer les grandes figures",
        en: "Explore great figures",
        ar: "استكشف الشخصيات البارزة",
      },
      href: "/figures",
    });
  }, []);

  /** Only show theme chips that actually appear in curated meta. */
  const availableThemes = useMemo(() => {
    const set = new Set<FigureTheme>();
    Object.values(figureMeta).forEach((m) => m?.themes?.forEach((th) => set.add(th)));
    return Array.from(set);
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = figures.filter((f) => {
      if (cat !== "all" && f.category !== cat) return false;
      if (reg !== "all" && f.region !== reg) return false;
      if (theme !== "all") {
        const themes = figureMeta[f.id]?.themes;
        if (!themes || !themes.includes(theme)) return false;
      }
      if (!q) return true;
      const names = [
        f.name,
        t(f.displayName, "en"),
        t(f.displayName, "fr"),
        t(f.displayName, "ar"),
      ];
      return names.some((n) => n.toLowerCase().includes(q));
    });

    const sorted = [...filtered];
    if (sort === "alphabetical") {
      sorted.sort((a, b) => t(a.displayName, lang).localeCompare(t(b.displayName, lang)));
    } else if (sort === "chronological") {
      sorted.sort((a, b) => {
        const ai = CATEGORY_ORDER.indexOf(a.category);
        const bi = CATEGORY_ORDER.indexOf(b.category);
        if (ai !== bi) return ai - bi;
        return t(a.displayName, lang).localeCompare(t(b.displayName, lang));
      });
    } else {
      // featured: curated meta first, then chronological
      sorted.sort((a, b) => {
        const af = figureMeta[a.id] ? 0 : 1;
        const bf = figureMeta[b.id] ? 0 : 1;
        if (af !== bf) return af - bf;
        const ai = CATEGORY_ORDER.indexOf(a.category);
        const bi = CATEGORY_ORDER.indexOf(b.category);
        return ai - bi;
      });
    }
    return sorted;
  }, [query, cat, reg, theme, sort, lang]);

  const resetFilters = () => {
    setQuery("");
    setCat("all");
    setReg("all");
    setTheme("all");
    setSort("featured");
  };

  const hasActiveFilters = query || cat !== "all" || reg !== "all" || theme !== "all";

  const introCopy =
    lang === "fr"
      ? "Une galerie curatée des voix, mains et esprits qui ont façonné l'Algérie — de l'Antiquité numide aux artistes contemporains."
      : lang === "ar"
        ? "معرض منتقى للأصوات والعقول التي صاغت الجزائر — من نوميديا القديمة إلى الفنانين المعاصرين."
        : "A curated gallery of voices, hands and minds that shaped Algeria — from ancient Numidia to contemporary artists.";

  const resultsLabel =
    lang === "fr" ? "figures" : lang === "ar" ? "شخصية" : "figures";
  const sortLabel = lang === "fr" ? "Trier" : lang === "ar" ? "ترتيب" : "Sort";
  const themeLabel =
    lang === "fr" ? "Thème" : lang === "ar" ? "الموضوع" : "Theme";
  const resetLabel =
    lang === "fr" ? "Réinitialiser" : lang === "ar" ? "إعادة ضبط" : "Reset";

  return (
    <div className="min-h-screen">
      <Header />

      {/* Cinematic Hero */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, var(--background)), var(--background) 55%, color-mix(in oklab, var(--accent) 14%, var(--background)))",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06] text-[14rem] sm:text-[20rem] font-black tracking-tighter leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-14 sm:py-20 text-center animate-cinematic-in">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-bold border"
            style={{
              borderColor: "color-mix(in oklab, var(--accent) 45%, var(--border))",
              background: "color-mix(in oklab, var(--accent) 10%, var(--card))",
              color: "var(--accent-foreground)",
            }}
          >
            <span>ⵣ</span>
            <span>
              {lang === "fr"
                ? "Galerie des grandes figures"
                : lang === "ar"
                  ? "معرض الشخصيات الكبرى"
                  : "Gallery of great figures"}
            </span>
          </div>
          <h1
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {tu("figuresTitle", lang)}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            {introCopy}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-foreground font-bold">{figures.length}</span>
              <span>{resultsLabel}</span>
            </span>
            <span aria-hidden>·</span>
            <Link to="/figures/quiz" className="font-semibold text-primary hover:underline">
              {tu("guessThisFigureCta", lang)}
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Sticky filter bar */}
        <div className="sticky top-[60px] z-20 -mx-4 px-4 py-3 mb-6 backdrop-blur-md bg-background/85 border-b border-border/70">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <span className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                🔍
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tu("searchFigures", lang)}
                className="w-full rounded-xl bg-card border border-border ps-9 pe-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl bg-card border border-border px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={sortLabel}
            >
              <option value="featured">
                {lang === "fr" ? "★ En vedette" : lang === "ar" ? "★ المختارة" : "★ Featured"}
              </option>
              <option value="chronological">
                {lang === "fr" ? "Chronologique" : lang === "ar" ? "زمني" : "Chronological"}
              </option>
              <option value="alphabetical">
                {lang === "fr" ? "Alphabétique" : lang === "ar" ? "أبجدي" : "Alphabetical"}
              </option>
            </select>
          </div>
        </div>

        {/* Filter chips */}
        <div className="grid gap-3 mb-6">
          <FilterRow
            label={tu("filterEra", lang)}
            allLabel={tu("filterAll", lang)}
            value={cat}
            onChange={(v) => setCat(v as FigureCategory | "all")}
            options={FIGURE_CATEGORIES.map((c) => ({
              id: c.id,
              label: t(c.label, lang),
              emoji: c.emoji,
            }))}
          />
          <FilterRow
            label={tu("filterRegion", lang)}
            allLabel={tu("filterAll", lang)}
            value={reg}
            onChange={(v) => setReg(v as FigureRegion | "all")}
            options={FIGURE_REGIONS.map((r) => ({ id: r.id, label: t(r.label, lang) }))}
          />
          {availableThemes.length > 0 && (
            <FilterRow
              label={themeLabel}
              allLabel={tu("filterAll", lang)}
              value={theme}
              onChange={(v) => setTheme(v as FigureTheme | "all")}
              options={availableThemes.map((th) => ({
                id: th,
                label: t(FIGURE_THEMES[th].label, lang),
                emoji: FIGURE_THEMES[th].emoji,
              }))}
            />
          )}
          {hasActiveFilters && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                <span className="text-foreground font-bold">{list.length}</span> {resultsLabel}
              </span>
              <button
                onClick={resetFilters}
                className="font-semibold text-primary hover:underline"
              >
                {resetLabel}
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((f) => {
            const era = f.relatedEraId ? eras.find((e) => e.id === f.relatedEraId) : undefined;
            const regionMapId = FIGURE_REGION_TO_MAP[f.region];
            const region = regionMapId
              ? mapRegions.find((r) => r.id === regionMapId)
              : undefined;
            const fm = figureMeta[f.id];
            const isFeatured = Boolean(fm);
            return (
              <Link
                key={f.id}
                to="/figures/$figureId"
                params={{ figureId: f.id }}
                className="group relative rounded-2xl bg-card border border-border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 flex flex-col overflow-hidden"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                {/* Top accent ribbon */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 opacity-70 group-hover:opacity-100 transition"
                  style={{ background: "var(--gradient-warm)" }}
                />
                {isFeatured && (
                  <span
                    className="absolute top-3 end-3 text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: "color-mix(in oklab, var(--accent) 50%, var(--border))",
                      background: "color-mix(in oklab, var(--accent) 18%, var(--card))",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    ★
                  </span>
                )}

                {/* Portrait treatment */}
                <div
                  className="relative h-28 -mx-5 -mt-5 mb-4 flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, var(--card)), color-mix(in oklab, var(--accent) 10%, var(--card)))",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.05] text-[7rem] flex items-center justify-center select-none"
                    style={{ color: "var(--foreground)" }}
                  >
                    ⵣ
                  </div>
                  <div className="relative text-5xl transition-transform duration-300 group-hover:scale-110">
                    {f.emoji}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-lg leading-tight group-hover:text-primary transition"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {t(f.displayName, lang)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                    {t(f.era, lang)}
                  </div>

                  {fm?.cinematicLine ? (
                    <p
                      className="mt-3 text-sm italic text-foreground/80 line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      “{t(fm.cinematicLine, lang)}”
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {t(f.fact, lang)}
                    </p>
                  )}

                  {fm?.themes && fm.themes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {fm.themes.slice(0, 3).map((th) => {
                        const def = FIGURE_THEMES[th];
                        return (
                          <span
                            key={th}
                            className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold border border-border/60 bg-muted/40 text-muted-foreground"
                          >
                            <span className="mr-0.5">{def.emoji}</span>
                            {t(def.label, lang)}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                  {region ? (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      📍 {t(region.name, lang)}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t(f.regionLabel, lang)}
                    </span>
                  )}
                  {era && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent-foreground">
                      {era.emoji} {t(era.title, lang)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="mt-12 text-center">
            <div className="text-4xl mb-3">🕯️</div>
            <div className="text-muted-foreground">{tu("noFigureMatch", lang)}</div>
            <button
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              {resetLabel}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function FilterRow({
  label,
  allLabel,
  value,
  onChange,
  options,
}: {
  label: string;
  allLabel: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string; emoji?: string }[];
}) {
  const items = [{ id: "all", label: allLabel }, ...options];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold min-w-[58px]">
        {label}
      </span>
      <div className="flex gap-1.5 flex-wrap">
        {items.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className={
                "px-3 py-1 rounded-full text-xs font-semibold border transition " +
                (active
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40")
              }
            >
              {o.emoji ? `${o.emoji} ` : ""}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
