import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { RegionIcon } from "@/components/RegionIcon";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { regionIntros, cinematicCopy } from "@/data/cinematic";
import { discover } from "@/lib/discoveries";
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
  keyFigure: { en: "Key figure", fr: "Figure clé", ar: "شخصية بارزة" },
  keyFact: { en: "Key fact", fr: "Fait clé", ar: "حقيقة بارزة" },
  relatedFigures: { en: "Related figures", fr: "Figures liées", ar: "شخصيات مرتبطة" },
} as const;

function RegionExplorerPage() {
  const lang = useLang();
  const [selectedId, setSelectedId] = useState<string>(mapRegions[0].id);
  const [highlight, setHighlight] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const [introPhase, setIntroPhase] = useState(false);
  const selected: MapRegion | undefined = mapRegions.find((r) => r.id === selectedId);

  useEffect(() => {
    const id = window.location.hash.replace("#region-", "");
    if (id && mapRegions.some((r) => r.id === id)) {
      setSelectedId(id);
      // trigger intro on hash deep-link
      window.requestAnimationFrame(() => {
        const el = document.getElementById(`region-${id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIntroKey((k) => k + 1);
    setIntroPhase(true);
    const r = mapRegions.find((x) => x.id === id);
    if (r) discover("region", id, r.name, lang);
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      const el = document.getElementById(`region-intro-${id}`) ?? document.getElementById(`region-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    window.setTimeout(() => {
      setIntroPhase(false);
      setHighlight(false);
      window.requestAnimationFrame(() => setHighlight(true));
      window.setTimeout(() => setHighlight(false), 1400);
    }, 1200);
  };

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

  const intro = selected ? regionIntros[selected.id] : undefined;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{COPY.subtitle[lang]}</p>

        {/* Region cards grid */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mapRegions.map((r) => {
            const isSel = r.id === selectedId;
            const keyFigure = getFigure(r.figureIds[0]);
            return (
              <button
                key={r.id}
                onClick={() => handleSelect(r.id)}
                className={
                  "group text-left rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 " +
                  (isSel
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40")
                }
                style={isSel ? { boxShadow: "var(--shadow-soft)" } : undefined}
                aria-pressed={isSel}
              >
                <div className="flex items-start gap-4">
                  <RegionIcon
                    regionId={r.id}
                    className="h-16 w-20 shrink-0 transition-transform duration-200 group-hover:scale-[1.03] sm:h-[4.75rem] sm:w-24"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-base sm:text-lg leading-tight">{t(r.name, lang)}</span>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2">
                      {t(r.summary, lang)}
                    </p>
                    <div className="mt-3 grid gap-1.5 text-[11px] leading-snug text-muted-foreground">
                      {keyFigure && (
                        <span>
                          <span className="font-bold text-foreground/80">{COPY.keyFigure[lang]}:</span>{" "}
                          {t(keyFigure.displayName, lang)}
                        </span>
                      )}
                      <span className="line-clamp-2">
                        <span className="font-bold text-foreground/80">{COPY.keyFact[lang]}:</span>{" "}
                        {t(r.facts[0], lang)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {/* Cinematic intro line */}
        {selected && intro && (
          <figure
            key={`intro-${selected.id}-${introKey}`}
            id={`region-intro-${selected.id}`}
            className={
              "mt-6 rounded-2xl border border-border/70 bg-gradient-to-br from-muted/40 to-card px-5 py-6 sm:py-7 text-center scroll-mt-24 transition-opacity duration-500 animate-cinematic-in " +
              (introPhase ? "opacity-100" : "opacity-90")
            }
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/80 mb-2">
              {t(cinematicCopy.cinematicLabel, lang)}
            </div>
            <blockquote className="text-base sm:text-lg italic font-semibold text-foreground/90 leading-relaxed max-w-xl mx-auto">
              “{t(intro, lang)}”
            </blockquote>
          </figure>
        )}

        {/* Selected region detail */}
        {selected ? (
          <article
            key={selected.id}
            id={`region-${selected.id}`}
            className={
              "mt-6 rounded-2xl border bg-card p-5 animate-float-up scroll-mt-24 transition-all duration-700 " +
              (highlight ? "border-primary/60" : "border-border")
            }
            style={{
              boxShadow: highlight
                ? "0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent), var(--shadow-soft)"
                : "var(--shadow-soft)",
            }}
          >
            <header className="flex items-start gap-3">
              <RegionIcon regionId={selected.id} className="h-16 w-20 shrink-0" />
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
                <Link to="/figures" className="mb-3 inline-block text-xs font-semibold text-primary hover:underline">
                  {COPY.relatedFigures[lang]} →
                </Link>
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
