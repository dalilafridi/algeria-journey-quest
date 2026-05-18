import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";

import { figures, FIGURE_CATEGORIES, FIGURE_REGIONS, type FigureCategory, type FigureRegion } from "@/data/figures";
import { figureMeta, FIGURE_THEMES } from "@/data/figureMeta";
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

export const Route = createFileRoute("/figures/")({
  head: () => ({
    meta: [
      { title: "Great Figures of Algeria — Algeria Through Time" },
      { name: "description", content: "Bios of the people who shaped Algerian history, from Massinissa to Matoub." },
    ],
  }),
  component: FiguresIndex,
});

function FiguresIndex() {
  const lang = useLang();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<FigureCategory | "all">("all");
  const [reg, setReg] = useState<FigureRegion | "all">("all");
  

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: { fr: "Figures", en: "Figures", ar: "الشخصيات" },
      description: { fr: "Explorer les grandes figures", en: "Explore great figures", ar: "استكشف الشخصيات البارزة" },
      href: "/figures",
    });
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return figures.filter((f) => {
      if (cat !== "all" && f.category !== cat) return false;
      if (reg !== "all" && f.region !== reg) return false;
      if (!q) return true;
      const names = [f.name, t(f.displayName, "en"), t(f.displayName, "fr"), t(f.displayName, "ar")];
      return names.some((n) => n.toLowerCase().includes(q));
    });
  }, [query, cat, reg]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-3">🏛️</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{tu("figuresTitle", lang)}</h1>
          <p className="mt-3 text-muted-foreground">{tu("figuresSubtitle", lang)}</p>

          <Link
            to="/figures/quiz"
            className="inline-block mt-5 px-5 py-2.5 rounded-xl text-primary-foreground font-semibold transition-transform hover:scale-105"
            style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
          >
            {tu("guessThisFigureCta", lang)}
          </Link>
          <div className="mt-3 text-sm text-muted-foreground">
            {lang === "fr" ? "Relié aux" : lang === "ar" ? "مرتبط بـ" : "Related to"}{" "}
            <Link to="/map" className="font-semibold text-primary hover:underline">
              {lang === "fr" ? "régions" : lang === "ar" ? "المناطق" : "regions"}
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 grid gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tu("searchFigures", lang)}
            className="w-full rounded-xl bg-card border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <FilterRow
            label={tu("filterEra", lang)}
            allLabel={tu("filterAll", lang)}
            value={cat}
            onChange={(v) => setCat(v as FigureCategory | "all")}
            options={FIGURE_CATEGORIES.map((c) => ({ id: c.id, label: t(c.label, lang), emoji: c.emoji }))}
          />
          <FilterRow
            label={tu("filterRegion", lang)}
            allLabel={tu("filterAll", lang)}
            value={reg}
            onChange={(v) => setReg(v as FigureRegion | "all")}
            options={FIGURE_REGIONS.map((r) => ({ id: r.id, label: t(r.label, lang) }))}
          />
        </div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((f) => {
            const era = f.relatedEraId ? eras.find((e) => e.id === f.relatedEraId) : undefined;
            const regionMapId = FIGURE_REGION_TO_MAP[f.region];
            const region = regionMapId ? mapRegions.find((r) => r.id === regionMapId) : undefined;
            const fm = figureMeta[f.id];
            const curated = fm?.relatedFigureIds
              ?.map((id) => figures.find((x) => x.id === id))
              .filter((x): x is NonNullable<typeof x> => Boolean(x));
            const related =
              curated && curated.length > 0
                ? curated.slice(0, 2)
                : figures
                    .filter((x) => x.id !== f.id && (x.region === f.region || x.category === f.category))
                    .slice(0, 2);
            return (
              <div
                key={f.id}
                className="card-hover rounded-2xl bg-card border border-border p-5 hover:border-primary/50 transition group flex flex-col"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <Link
                  to="/figures/$figureId"
                  params={{ figureId: f.id }}
                  className="block"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{f.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg leading-tight group-hover:text-primary transition">
                        {t(f.displayName, lang)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t(f.era, lang)}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{t(f.fact, lang)}</p>
                </Link>

                {/* Connections */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                  {region ? (
                    <Link
                      to="/map"
                      hash={`region-${region.id}`}
                      className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition"
                    >
                      📍 {t(region.name, lang)}
                    </Link>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t(f.regionLabel, lang)}
                    </span>
                  )}
                  {era && (
                    <Link
                      to="/era/$eraId"
                      params={{ eraId: era.id }}
                      className="px-2 py-0.5 rounded-full bg-accent/15 text-accent-foreground hover:bg-accent/30 transition"
                    >
                      {era.emoji} {t(era.title, lang)}
                    </Link>
                  )}
                </div>

                {related.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/60">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">
                      {lang === "fr" ? "Figures liées" : lang === "ar" ? "شخصيات مرتبطة" : "Related figures"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {related.map((r) => (
                        <Link
                          key={r.id}
                          to="/figures/$figureId"
                          params={{ figureId: r.id }}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition"
                        >
                          <span className="mr-0.5">{r.emoji}</span>
                          {t(r.displayName, lang)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="mt-8 text-center text-muted-foreground">{tu("noFigureMatch", lang)}</div>
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
      <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}:</span>
      {items.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={
              "px-3 py-1 rounded-full text-xs font-semibold border transition " +
              (active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:text-foreground")
            }
          >
            {o.emoji ? `${o.emoji} ` : ""}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
