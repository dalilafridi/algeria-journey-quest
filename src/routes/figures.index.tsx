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

        {/* Portrait gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {list.map((f, i) => {
            const era = f.relatedEraId ? eras.find((e) => e.id === f.relatedEraId) : undefined;
            const regionMapId = FIGURE_REGION_TO_MAP[f.region];
            const region = regionMapId
              ? mapRegions.find((r) => r.id === regionMapId)
              : undefined;
            const fm = figureMeta[f.id];
            const isFeatured = Boolean(fm);
            const primaryTheme = fm?.themes?.[0];
            const themeDef = primaryTheme ? FIGURE_THEMES[primaryTheme] : null;
            const exhibitNo = String(i + 1).padStart(3, "0");
            return (
              <Link
                key={f.id}
                to="/figures/$figureId"
                params={{ figureId: f.id }}
                aria-label={t(f.displayName, lang)}
                className="figure-exhibit group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                {/* Portrait stage */}
                <div
                  className="relative h-44 sm:h-48 overflow-hidden bg-parchment-card"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in oklab, var(--accent) 14%, var(--card)) 0%, color-mix(in oklab, var(--primary) 8%, var(--card)) 100%)",
                  }}
                >
                  {/* Inner gold frame */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-2 rounded-[0.85rem] border"
                    style={{
                      borderColor: "color-mix(in oklab, var(--brand-gold) 38%, transparent)",
                      boxShadow:
                        "inset 0 0 0 1px color-mix(in oklab, var(--brand-gold-bright) 18%, transparent)",
                    }}
                  />
                  {/* Vignette */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 35%, transparent 40%, color-mix(in oklab, var(--foreground) 22%, transparent) 100%)",
                    }}
                  />
                  {/* ⵣ watermark */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8rem] leading-none font-black select-none opacity-[0.05]"
                    style={{ color: "var(--foreground)" }}
                  >
                    ⵣ
                  </div>
                  {/* Silhouette medallion */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 28%, var(--card)) 100%)",
                        boxShadow:
                          "0 0 0 1px color-mix(in oklab, var(--brand-gold) 55%, transparent), inset 0 -8px 18px color-mix(in oklab, var(--foreground) 22%, transparent), 0 12px 26px -12px color-mix(in oklab, var(--foreground) 50%, transparent)",
                      }}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-1 rounded-full border"
                        style={{
                          borderColor: "color-mix(in oklab, var(--background) 55%, transparent)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="relative text-4xl sm:text-[2.75rem] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                        style={{ filter: "saturate(0.85)" }}
                      >
                        {f.emoji}
                      </span>
                    </div>
                  </div>
                  {/* Soft warm light sweep on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 30%, color-mix(in oklab, var(--brand-gold-bright) 22%, transparent) 50%, transparent 70%)",
                    }}
                  />
                  {/* Exhibit number */}
                  <span
                    className="absolute top-3 start-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}
                  >
                    N° {exhibitNo}
                  </span>
                  {/* Featured star */}
                  {isFeatured && (
                    <span
                      className="absolute top-3 end-3 inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold"
                      style={{
                        background: "var(--gradient-brand-gold)",
                        color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
                        boxShadow: "0 4px 10px -4px color-mix(in oklab, var(--brand-gold) 60%, transparent)",
                      }}
                      title="Featured"
                    >
                      ★
                    </span>
                  )}
                </div>

                {/* Museum plaque */}
                <div className="relative px-5 pt-4 pb-5 flex-1 flex flex-col bg-parchment-card">
                  {/* Gilded divider */}
                  <div
                    aria-hidden
                    className="absolute inset-x-5 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, color-mix(in oklab, var(--brand-gold) 70%, transparent), transparent)",
                    }}
                  />
                  <div
                    className="text-[10px] uppercase tracking-[0.22em] font-bold"
                    style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--muted-foreground))" }}
                  >
                    {t(f.era, lang)}
                  </div>
                  <h3
                    className="mt-1.5 text-[1.2rem] sm:text-[1.3rem] leading-tight font-bold group-hover:text-primary transition-colors"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.005em" }}
                  >
                    {t(f.displayName, lang)}
                  </h3>

                  {fm?.cinematicLine ? (
                    <p
                      className="mt-2.5 text-[13px] italic text-foreground/75 line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      “{t(fm.cinematicLine, lang)}”
                    </p>
                  ) : (
                    <p className="mt-2.5 text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {t(f.fact, lang)}
                    </p>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <span aria-hidden>◈</span>
                      <span className="font-medium">
                        {region ? t(region.name, lang) : t(f.regionLabel, lang)}
                      </span>
                    </span>
                    {themeDef && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold border"
                        style={{
                          borderColor: "color-mix(in oklab, var(--brand-gold) 35%, var(--border))",
                          background: "color-mix(in oklab, var(--brand-gold) 10%, var(--card))",
                          color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--foreground))",
                        }}
                      >
                        <span aria-hidden>{themeDef.emoji}</span>
                        {t(themeDef.label, lang)}
                      </span>
                    )}
                  </div>
                  {/* Hover lift glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: "var(--shadow-gold-glow)" }}
                  />
                  {era && (
                    <span className="sr-only">
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
