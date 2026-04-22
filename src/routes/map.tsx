import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { t, useLang } from "@/lib/i18n";
import algeriaOutline from "@/assets/algeria-outline.png";

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
          <div
            className="relative w-full mx-auto"
            style={{
              maxWidth: "520px",
              aspectRatio: "1300 / 1230",
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--secondary) 14%, var(--card)), color-mix(in oklab, var(--accent) 8%, var(--card)))",
              borderRadius: "1rem",
            }}
          >
            <img
              src={algeriaOutline}
              alt="Outline map of Algeria"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(38%) sepia(18%) saturate(620%) hue-rotate(70deg) brightness(92%) contrast(88%) opacity(0.75)",
              }}
              draggable={false}
            />

            {mapRegions.map((r) => {
              const isSel = r.id === selectedId;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  aria-label={t(r.name, lang)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${r.cx}%`, top: `${r.cy}%` }}
                >
                  <span className="relative flex items-center justify-center">
                    {isSel && (
                      <span
                        className="absolute inline-flex h-6 w-6 rounded-full opacity-60 animate-ping"
                        style={{ background: "var(--primary)" }}
                      />
                    )}
                    <span
                      className="relative inline-block rounded-full transition-all duration-200 group-hover:scale-110"
                      style={{
                        width: isSel ? 16 : 12,
                        height: isSel ? 16 : 12,
                        background: isSel ? "var(--primary)" : "var(--accent)",
                        border: "2px solid var(--background)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                      }}
                    />
                  </span>
                  <span
                    className={
                      "absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-md transition-opacity " +
                      (isSel
                        ? "opacity-100 bg-primary text-primary-foreground"
                        : "opacity-80 bg-card/80 text-foreground border border-border")
                    }
                    style={{ top: "100%" }}
                  >
                    {t(r.name, lang)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground text-center">
            {COPY.pickRegion[lang]}
          </p>

          {/* Tappable chip list (mobile-friendly fallback) */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {mapRegions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={
                  "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 active:scale-95 " +
                  (r.id === selectedId
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground")
                }
              >
                {t(r.name, lang)}
              </button>
            ))}
          </div>
        </div>

        {selected ? (
          <article
            key={selected.id}
            className="mt-6 rounded-2xl border border-border bg-card p-5 animate-float-up"
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
