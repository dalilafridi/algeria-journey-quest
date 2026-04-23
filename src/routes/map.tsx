import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { t, useLang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Region Explorer — Algeria Through Time" },
      {
        name: "description",
        content:
          "Explore Algeria region by region: Kabylie, Aurès, Algiers, Constantine, the West and the Sahara — facts, figures and stories.",
      },
    ],
  }),
  component: RegionExplorerPage,
});

const COPY = {
  title: { en: "Region Explorer", fr: "Explorateur des régions", ar: "مستكشف المناطق" },
  subtitle: {
    en: "Tap a region to discover its story, key facts and great figures.",
    fr: "Touchez une région pour découvrir son histoire, ses faits clés et ses grandes figures.",
    ar: "اضغط على منطقة لاكتشاف قصتها وأهم حقائقها وكبار شخصياتها.",
  },
  pickRegion: { en: "Choose a region to begin", fr: "Choisissez une région pour commencer", ar: "اختر منطقة للبدء" },
  keyFacts: { en: "Key facts", fr: "Faits clés", ar: "حقائق أساسية" },
  greatFigures: { en: "Great figures", fr: "Grandes figures", ar: "شخصيات بارزة" },
  focus: { en: "Focus", fr: "Thème", ar: "المحور" },
} as const;

function RegionExplorerPage() {
  const lang = useLang();
  const [selectedId, setSelectedId] = useState<string>(mapRegions[0].id);
  const selected: MapRegion | undefined = mapRegions.find((r) => r.id === selectedId);

  useEffect(() => {
    const id = window.location.hash.replace("#region-", "");
    if (id && mapRegions.some((r) => r.id === id)) setSelectedId(id);
  }, []);

  useEffect(() => {
    if (!selected) return;
    saveJourneyPlace({
      section: "regions",
      label: { fr: `Régions · ${t(selected.name, "fr")}`, en: `Regions · ${t(selected.name, "en")}`, ar: `المناطق · ${t(selected.name, "ar")}` },
      description:
        typeof selected.focus === "string"
          ? { fr: selected.focus, en: selected.focus, ar: selected.focus }
          : selected.focus,
      href: `/map#region-${selected.id}`,
    });
  }, [selected]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{COPY.subtitle[lang]}</p>

        {/* Region cards grid */}
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mapRegions.map((r) => {
            const isSel = r.id === selectedId;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={
                  "text-left rounded-2xl border p-3 sm:p-4 transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 " +
                  (isSel
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40")
                }
                style={isSel ? { boxShadow: "var(--shadow-soft)" } : undefined}
                aria-pressed={isSel}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none" aria-hidden>
                    {r.emoji}
                  </span>
                  <span className="font-bold text-sm sm:text-base">{t(r.name, lang)}</span>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-2">
                  {t(r.focus, lang)}
                </p>
              </button>
            );
          })}
        </section>

        {/* Selected region detail */}
        {selected ? (
          <article
            key={selected.id}
            id={`region-${selected.id}`}
            className="mt-6 rounded-2xl border border-border bg-card p-5 animate-float-up"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <header className="flex items-start gap-3">
              <span className="text-3xl leading-none" aria-hidden>
                {selected.emoji}
              </span>
              <div className="min-w-0">
                <h2 className="text-xl font-bold">{t(selected.name, lang)}</h2>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {COPY.focus[lang]} · {t(selected.focus, lang)}
                </div>
              </div>
            </header>

            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {t(selected.summary, lang)}
            </p>

            {/* Key facts */}
            <section className="mt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {COPY.keyFacts[lang]}
              </div>
              <ul className="space-y-1.5">
                {selected.facts.map((f, i) => (
                  <li
                    key={i}
                    className="text-sm rounded-xl bg-muted/60 px-3 py-2 leading-relaxed flex gap-2"
                  >
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span>{t(f, lang)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Figures */}
            {selected.figureIds.length > 0 && (
              <section className="mt-5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.greatFigures[lang]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.figureIds.map((fid) => {
                    const f = getFigure(fid);
                    if (!f) return null;
                    return (
                      <Link
                        key={fid}
                        to="/figures/$figureId"
                        params={{ figureId: fid }}
                        className="text-sm font-semibold px-3 py-1.5 rounded-full bg-muted hover:bg-card border border-border hover:border-primary/40 transition"
                      >
                        <span className="mr-1" aria-hidden>
                          {f.emoji}
                        </span>
                        {t(f.displayName, lang)}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </article>
        ) : (
          <p className="mt-6 text-muted-foreground">{COPY.pickRegion[lang]}</p>
        )}
      </main>
    </div>
  );
}
