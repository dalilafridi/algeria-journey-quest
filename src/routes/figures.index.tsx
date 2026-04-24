import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { cinemaQuiz, cinemaThemeLabels, featuredFilms } from "@/data/cinema";
import { figures, FIGURE_CATEGORIES, FIGURE_REGIONS, type FigureCategory, type FigureRegion } from "@/data/figures";
import { t, tu, useLang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";

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
  const [cinemaAnswers, setCinemaAnswers] = useState<Record<string, number>>({});

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
          {list.map((f) => (
            <Link
              key={f.id}
              to="/figures/$figureId"
              params={{ figureId: f.id }}
              className="card-hover rounded-2xl bg-card border border-border p-5 hover:border-primary/50 transition group"
              style={{ boxShadow: "var(--shadow-soft)" }}
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
              <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {t(f.regionLabel, lang)}
              </div>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-8 text-center text-muted-foreground">{tu("noFigureMatch", lang)}</div>
        )}

        <section className="mt-12 border-t border-border pt-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {lang === "fr" ? "Cinéma & Film" : lang === "ar" ? "السينما والفن" : "Cinema & Film"}
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === "fr" ? "Films emblématiques" : lang === "ar" ? "أفلام بارزة" : "Featured Films"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {lang === "fr"
                ? "Le cinéma raconte l'identité algérienne à travers la mémoire, la jeunesse, les femmes, la société et la résistance."
                : lang === "ar"
                  ? "تروي السينما الهوية الجزائرية عبر الذاكرة والشباب والنساء والمجتمع والمقاومة."
                  : "Cinema tells Algerian identity through memory, youth, women, society and resistance."}
            </p>
            <Link to="/moments" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              {lang === "fr" ? "Related · Explorer les récits" : lang === "ar" ? "مرتبط · استكشف القصص" : "Related · Explore stories"} →
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(cinemaThemeLabels).map(([key, label]) => (
              <span key={key} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                {t(label, lang)}
              </span>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {featuredFilms.map((film) => (
              <article key={film.id} className="card-hover rounded-2xl bg-card border border-border p-5 transition hover:border-primary/40" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-lg leading-tight">{t(film.title, lang)}</h3>
                  <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground">{film.year}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(film.description, lang)}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground font-semibold">
                    {t(cinemaThemeLabels[film.theme], lang)}
                  </span>
                  {film.director && <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">{t(film.director, lang)}</span>}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-card border border-border p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
            <h3 className="text-lg font-bold">
              {lang === "fr" ? "Mini-quiz cinéma" : lang === "ar" ? "اختبار سينمائي قصير" : "Cinema mini quiz"}
            </h3>
            <div className="mt-4 grid gap-4">
              {cinemaQuiz.map((q) => {
                const selected = cinemaAnswers[q.id];
                const locked = selected !== undefined;
                return (
                  <div key={q.id} className="rounded-xl bg-muted/40 border border-border p-4">
                    <div className="font-semibold text-sm">{t(q.prompt, lang)}</div>
                    <div className="mt-3 grid gap-2">
                      {q.options.map((option, index) => {
                        const correct = locked && index === q.answerIndex;
                        const wrong = locked && selected === index && index !== q.answerIndex;
                        return (
                          <button
                            key={index}
                            type="button"
                            disabled={locked}
                            onClick={() => setCinemaAnswers((prev) => ({ ...prev, [q.id]: index }))}
                            className={
                              "text-start px-3 py-2 rounded-lg border text-sm font-semibold transition " +
                              (correct
                                ? "bg-success/20 border-success/60"
                                : wrong
                                  ? "bg-destructive/15 border-destructive/50"
                                  : "bg-card border-border hover:border-primary/40")
                            }
                          >
                            {t(option, lang)}
                          </button>
                        );
                      })}
                    </div>
                    {locked && <p className="mt-3 text-xs text-muted-foreground leading-relaxed">💡 {t(q.explanation, lang)}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
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
