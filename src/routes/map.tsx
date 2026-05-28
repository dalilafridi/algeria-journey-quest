import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { RegionIcon } from "@/components/RegionIcon";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { regionIntros, cinematicCopy } from "@/data/cinematic";
import { getRegionExtras } from "@/data/regionExtras";
import { eras } from "@/data/eras";
import { discover } from "@/lib/discoveries";
import { t, useLang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";
import { JourneyNext } from "@/components/JourneyNext";

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
  backToRegions: { en: "Back to Regions", fr: "Retour aux régions", ar: "العودة إلى المناطق" },
  identity: { en: "Region identity", fr: "Identité de la région", ar: "هويّة المنطقة" },
  geography: { en: "Geography", fr: "Géographie", ar: "الجغرافيا" },
  historical: { en: "Historical significance", fr: "Importance historique", ar: "الأهمية التاريخية" },
  cultural: { en: "Cultural importance", fr: "Importance culturelle", ar: "الأهمية الثقافية" },
  historicalConnections: { en: "Historical connections", fr: "Connexions historiques", ar: "صلاتٌ تاريخية" },
  culturalIdentity: { en: "Cultural identity", fr: "Identité culturelle", ar: "الهوية الثقافية" },
  museumNotes: { en: "Museum notes", fr: "Notes du musée", ar: "ملاحظات المتحف" },
  exploreNearby: { en: "Explore nearby", fr: "Explorer à proximité", ar: "اكتشف المجاور" },
  reflection: { en: "A regional reflection", fr: "Une réflexion régionale", ar: "تأمّلٌ من المنطقة" },
  curator: { en: "Curator", fr: "Conservateur", ar: "أمين المتحف" },
  exploreEra: { en: "Explore era", fr: "Découvrir l'époque", ar: "اكتشف الحقبة" },
} as const;

function RegionExplorerPage() {
  const lang = useLang();
  const [selectedId, setSelectedId] = useState<string>(mapRegions[0].id);
  const [highlight, setHighlight] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const [introPhase, setIntroPhase] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const selected: MapRegion | undefined = mapRegions.find((r) => r.id === selectedId);
  const extras = selected ? getRegionExtras(selected.id) : undefined;
  const connectedEras = useMemo(
    () =>
      (extras?.eraIds ?? [])
        .map((eid) => eras.find((e) => e.id === eid))
        .filter(Boolean) as typeof eras,
    [extras],
  );
  const nearbyRegions = useMemo(
    () =>
      (extras?.nearbyRegionIds ?? [])
        .map((rid) => mapRegions.find((r) => r.id === rid))
        .filter(Boolean) as typeof mapRegions,
    [extras],
  );

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const el = document.getElementById("region-explorer-top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <div id="region-explorer-top" />
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{COPY.subtitle[lang]}</p>

        {/* Sticky region selector */}
        <nav
          aria-label={t(COPY.title, lang)}
          className="sticky top-14 z-20 -mx-4 mt-4 border-y border-border/60 bg-background/85 backdrop-blur-md px-4 py-2"
        >
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {mapRegions.map((r) => {
              const isSel = r.id === selectedId;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r.id)}
                  aria-current={isSel ? "true" : undefined}
                  className={
                    "shrink-0 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border transition " +
                    (isSel
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-foreground")
                  }
                >
                  {t(r.name, lang)}
                </button>
              );
            })}
          </div>
        </nav>

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
                  <RegionIcon
                    regionId={r.id}
                    className="h-16 w-20 shrink-0 icon-glow sm:h-[4.75rem] sm:w-24"
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
              "mt-6 rounded-2xl border border-border/70 bg-gradient-to-br from-muted/40 to-card px-5 py-6 sm:py-7 text-center scroll-mt-32 transition-opacity duration-500 animate-cinematic-in " +
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
              "mt-6 rounded-2xl border bg-card p-5 scroll-mt-32 transition-all duration-700 " +
              (introPhase ? "opacity-0 translate-y-2 pointer-events-none " : "opacity-100 translate-y-0 animate-float-up ") +
              (highlight ? "border-primary/60" : "border-border")
            }
            aria-hidden={introPhase}
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

                {/* Highlighted key figures (first 1–2) */}
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {selected.figureIds.slice(0, 2).map((fid) => {
                    const f = getFigure(fid);
                    if (!f) return null;
                    return (
                      <Link
                        key={fid}
                        to="/figures/$figureId"
                        params={{ figureId: fid }}
                        className="rounded-xl border border-border bg-muted/40 hover:bg-card hover:border-primary/40 p-3 transition group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-2xl shrink-0" aria-hidden>{f.emoji}</span>
                          <div className="min-w-0">
                            <div className="font-bold text-sm leading-tight group-hover:text-primary transition">
                              {t(f.displayName, lang)}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{t(f.era, lang)}</div>
                            <p className="text-xs text-foreground/80 mt-1.5 line-clamp-2 leading-snug">
                              {t(f.fact, lang)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <Link to="/figures" className="mb-3 inline-block text-xs font-semibold text-primary hover:underline">
                  {COPY.relatedFigures[lang]} →
                </Link>
                <div className="flex flex-wrap gap-2">
                  {selected.figureIds.slice(2).map((fid) => {
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

            {/* ===== Region identity (geography / historical / cultural) ===== */}
            {extras && (
              <section className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.identity[lang]}
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: COPY.geography[lang], body: extras.geography, emoji: "🗺️" },
                    { label: COPY.historical[lang], body: extras.historicalSignificance, emoji: "🏛️" },
                    { label: COPY.cultural[lang], body: extras.culturalImportance, emoji: "🎶" },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/70 bg-card/95 p-3.5"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
                        <span aria-hidden>{b.emoji}</span>
                        {b.label}
                      </div>
                      <p className="mt-1.5 text-sm text-foreground/85 leading-relaxed">
                        {t(b.body, lang)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ===== Historical connections (linked eras) ===== */}
            {connectedEras.length > 0 && (
              <section className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.historicalConnections[lang]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {connectedEras.map((e) => (
                    <Link
                      key={e.id}
                      to="/era/$eraId"
                      params={{ eraId: e.id }}
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-muted/40 hover:border-primary/40 px-3.5 py-1.5 text-sm font-semibold transition"
                    >
                      <span aria-hidden>{e.emoji}</span>
                      <span>{t(e.title, lang)}</span>
                      <span className="text-[10px] text-muted-foreground">{e.dateRange}</span>
                      <span className="text-primary text-xs rtl:rotate-180 opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ===== Cultural identity pillars ===== */}
            {extras?.culturePillars?.length ? (
              <section className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.culturalIdentity[lang]}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {extras.culturePillars.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/70 bg-card/95 p-3.5"
                      style={{ boxShadow: "var(--shadow-soft)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="text-lg">
                          {p.emoji}
                        </span>
                        <h4 className="font-bold text-sm">{t(p.label, lang)}</h4>
                      </div>
                      <p className="mt-1.5 text-sm text-foreground/80 leading-snug">
                        {t(p.body, lang)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* ===== Museum notes ===== */}
            {extras?.museumNotes?.length ? (
              <section className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.museumNotes[lang]}
                </div>
                <div className="space-y-3">
                  {extras.museumNotes.map((n, i) => (
                    <article
                      key={i}
                      className="rounded-2xl border border-border/70 bg-mosaic-soft p-4"
                      style={{
                        backgroundColor: "color-mix(in oklab, var(--accent) 10%, var(--card))",
                        boxShadow: "var(--shadow-soft)",
                      }}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">
                        {COPY.curator[lang]}
                      </div>
                      <h4 className="mt-1 font-bold text-sm">{t(n.title, lang)}</h4>
                      <p className="mt-1.5 text-sm text-foreground/85 leading-relaxed">
                        {t(n.body, lang)}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {/* ===== Explore nearby ===== */}
            {nearbyRegions.length > 0 && (
              <section className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.exploreNearby[lang]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {nearbyRegions.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelect(r.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-muted/40 hover:border-primary/40 px-3.5 py-1.5 text-sm font-semibold transition"
                    >
                      <span aria-hidden>{r.emoji}</span>
                      <span>{t(r.name, lang)}</span>
                      <span className="text-primary text-xs rtl:rotate-180">→</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* ===== Regional reflection ===== */}
            {extras?.reflection && (
              <figure
                className="mt-7 relative overflow-hidden rounded-3xl border border-primary/30 px-5 py-7 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, var(--card)), color-mix(in oklab, var(--accent) 12%, var(--card)))",
                  boxShadow: "var(--shadow-glow, var(--shadow-soft))",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary mb-1.5">
                  {COPY.reflection[lang]}
                </div>
                <blockquote className="text-base sm:text-xl italic font-semibold text-foreground leading-snug max-w-xl mx-auto">
                  “{t(extras.reflection.quote, lang)}”
                </blockquote>
                {extras.reflection.attribution && (
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    — {t(extras.reflection.attribution, lang)}
                  </figcaption>
                )}
              </figure>
            )}
          </article>
        ) : (
          <p className="mt-6 text-muted-foreground">{COPY.pickRegion[lang]}</p>
        )}
        <JourneyNext current="regions" />
      </main>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t(COPY.backToRegions, lang)}
        className={
          "fixed bottom-6 right-6 z-30 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 backdrop-blur-md px-4 py-2 text-xs font-semibold text-foreground shadow-md transition-all duration-300 hover:border-primary/40 hover:text-primary " +
          (showBackToTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none")
        }
      >
        <span aria-hidden>↑</span>
        {t(COPY.backToRegions, lang)}
      </button>
    </div>
  );
}
