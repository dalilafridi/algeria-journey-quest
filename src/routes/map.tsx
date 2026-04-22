import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { t, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map Explorer — Algeria Through Time" },
      { name: "description", content: "Explore Algerian history by region: Kabylie, Aurès, Algiers, Constantine, the West and the Sahara." },
    ],
  }),
  component: MapPage,
});

const COPY = {
  title: { en: "Map Explorer", fr: "Explorateur de carte", ar: "مستكشف الخريطة" },
  subtitle: {
    en: "Tap a region to discover its stories, figures and events.",
    fr: "Touchez une région pour découvrir ses récits, figures et événements.",
    ar: "اضغط على منطقة لاكتشاف قصصها وشخصياتها وأحداثها.",
  },
  pickRegion: { en: "Pick a region on the map", fr: "Choisissez une région sur la carte", ar: "اختر منطقة على الخريطة" },
  relatedFigures: { en: "Related figures", fr: "Figures liées", ar: "شخصيات مرتبطة" },
  relatedEvents: { en: "Related events", fr: "Événements liés", ar: "أحداث مرتبطة" },
} as const;

function MapPage() {
  const lang = useLang();
  const [selectedId, setSelectedId] = useState<string>(mapRegions[0].id);
  const selected: MapRegion | undefined = mapRegions.find((r) => r.id === selectedId);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 safe-pb">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{COPY.title[lang]}</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">{COPY.subtitle[lang]}</p>

        <div
          className="mt-6 rounded-2xl border border-border bg-card p-3 sm:p-5"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <svg
            viewBox="0 0 100 120"
            className="w-full h-auto"
            role="img"
            aria-label="Simplified map of Algeria"
          >
            {/* Simplified Algeria silhouette */}
            <path
              d="M14 18 L30 12 L52 8 L74 12 L88 16 L92 28 L86 44 L88 64 L80 92 L70 110 L40 112 L18 96 L8 70 L6 44 Z"
              fill="color-mix(in oklab, var(--secondary) 18%, var(--card))"
              stroke="color-mix(in oklab, var(--secondary) 60%, transparent)"
              strokeWidth="0.6"
            />
            {/* Mediterranean hint */}
            <path
              d="M14 18 L30 12 L52 8 L74 12 L88 16"
              fill="none"
              stroke="color-mix(in oklab, var(--primary) 60%, transparent)"
              strokeWidth="0.8"
              strokeDasharray="1.5 1.2"
            />
            {mapRegions.map((r) => {
              const isSel = r.id === selectedId;
              return (
                <g
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={r.cx}
                    cy={r.cy}
                    r={isSel ? 3.2 : 2.2}
                    fill={isSel ? "var(--primary)" : "var(--accent)"}
                    stroke="var(--background)"
                    strokeWidth="0.8"
                  />
                  {isSel && (
                    <circle
                      cx={r.cx}
                      cy={r.cy}
                      r={5.5}
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="0.5"
                      opacity={0.6}
                    />
                  )}
                  <text
                    x={r.cx}
                    y={r.cy - 4}
                    textAnchor="middle"
                    fontSize="3.2"
                    fontWeight="700"
                    fill="var(--foreground)"
                    style={{ pointerEvents: "none" }}
                  >
                    {t(r.name, lang)}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tappable chip list (mobile-friendly fallback) */}
          <div className="mt-3 flex flex-wrap gap-2">
            {mapRegions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={
                  "text-xs font-semibold px-3 py-1.5 rounded-full border transition " +
                  (r.id === selectedId
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40")
                }
              >
                {t(r.name, lang)}
              </button>
            ))}
          </div>
        </div>

        {selected ? (
          <article
            className="mt-6 rounded-2xl border border-border bg-card p-5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <h2 className="text-xl font-bold">{t(selected.name, lang)}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t(selected.description, lang)}
            </p>

            {selected.figureIds.length > 0 && (
              <section className="mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.relatedFigures[lang]}
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
                        className="text-sm font-semibold px-3 py-1.5 rounded-full bg-muted hover:bg-card border border-border transition"
                      >
                        👤 {t(f.name, lang)}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {selected.events.length > 0 && (
              <section className="mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {COPY.relatedEvents[lang]}
                </div>
                <ul className="space-y-1.5">
                  {selected.events.map((ev, i) => (
                    <li key={i} className="text-sm rounded-xl bg-muted/60 px-3 py-2">
                      📍 {t(ev, lang)}
                    </li>
                  ))}
                </ul>
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
