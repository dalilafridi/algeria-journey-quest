import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { mapRegions } from "@/data/mapRegions";
import { regionExtras } from "@/data/regionExtras";
import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { t, useLang, type LocalizedString } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";

/** ----------------------------------------------------------------
 *  Hand-illustrated Algeria silhouette in a 100x100 viewBox.
 *  Not GIS-accurate — drawn with organic Bezier curves so the country
 *  reads as instantly recognizable while keeping a parchment / museum
 *  wall-map feeling (soft coast, wide Sahara, narrow north).
 * ---------------------------------------------------------------- */
const ALGERIA_PATH = [
  "M 11 22",
  // Mediterranean coast — gentle curves W → E
  "Q 14 17 22 18",
  "Q 34 14 46 16",
  "Q 58 14 68 18",
  "Q 74 19 78 20",
  // Tunisia notch (small inward dip then jut east)
  "Q 80 22 79 25",
  "L 82 28",
  // East border (Libya) — slightly bowed
  "Q 85 36 84 46",
  "Q 86 54 85 60",
  // SE corner angling toward Niger
  "Q 83 70 76 78",
  "Q 70 85 62 88",
  // South border (Niger / Mali) — gently jagged via soft curves
  "Q 50 93 38 91",
  "Q 28 90 22 84",
  // SW (Mauritania / W. Sahara) curving up
  "Q 14 76 13 66",
  "Q 11 56 12 48",
  // West border (Morocco) — wavy
  "Q 9 40 11 32",
  "Q 9 26 11 22",
  "Z",
].join(" ");

/** Coastline-only path (top edge) used as a glowing accent + label arc. */
const ALGERIA_COAST = "M 11 22 Q 14 17 22 18 Q 34 14 46 16 Q 58 14 68 18 Q 74 19 78 20";

/** Region map pins in the 100x100 viewBox — aligned to the new silhouette. */
const REGION_POINTS: Record<string, { x: number; y: number; size: number }> = {
  "oran-west":   { x: 20, y: 24, size: 5.2 },
  algiers:       { x: 44, y: 21, size: 4.8 },
  kabylie:       { x: 55, y: 22, size: 4.6 },
  constantine:   { x: 66, y: 23, size: 4.8 },
  aures:         { x: 63, y: 33, size: 5.0 },
  sahara:        { x: 48, y: 62, size: 8.0 },
};

/** Which regions glow most strongly per era. */
const ERA_REGION_FOCUS: Record<string, string[]> = {
  earlynorthafrica: ["sahara", "aures", "constantine", "kabylie"],
  numidia:          ["constantine", "aures", "oran-west"],
  roman:            ["constantine", "oran-west", "algiers"],
  islamic:          ["algiers", "oran-west", "constantine", "sahara"],
  ottoman:          ["algiers", "oran-west", "constantine"],
  french:           ["algiers", "kabylie", "aures", "oran-west", "constantine"],
  independence:     ["aures", "kabylie", "algiers", "constantine", "oran-west"],
};

type LayerId = "all" | string;

export const Route = createFileRoute("/atlas")({
  head: () => ({
    meta: [
      { title: "Interactive Atlas — Algeria Through Time" },
      {
        name: "description",
        content:
          "An interactive historical atlas of Algeria: explore regions, eras, figures and culture across the country's millennia.",
      },
      { property: "og:title", content: "Interactive Atlas — Algeria Through Time" },
      {
        property: "og:description",
        content: "A cinematic, museum-style historical map of Algeria.",
      },
    ],
  }),
  component: AtlasPage,
});

function AtlasPage() {
  const lang = useLang();
  const [layer, setLayer] = useState<LayerId>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    saveJourneyPlace({
      section: "regions",
      label: { en: "Historical Atlas", fr: "Atlas historique", ar: "الأطلس التاريخي" },
      description: {
        en: "Explore Algeria through time",
        fr: "Explorer l'Algérie à travers le temps",
        ar: "استكشف الجزائر عبر الزمن",
      },
      href: "/atlas",
    });
  }, []);

  const focusIds = useMemo(() => {
    if (layer === "all") return new Set(mapRegions.map((r) => r.id));
    return new Set(ERA_REGION_FOCUS[layer] ?? []);
  }, [layer]);

  const activeRegion = selected
    ? mapRegions.find((r) => r.id === selected)
    : null;

  const T = {
    title:
      lang === "fr"
        ? "Atlas historique"
        : lang === "ar"
          ? "الأطلس التاريخي"
          : "Historical Atlas",
    subtitle:
      lang === "fr"
        ? "Une carte interactive de l'Algérie à travers le temps — régions, époques, figures et héritage culturel."
        : lang === "ar"
          ? "خريطة تفاعلية للجزائر عبر الزمن — مناطق وحقب وشخصيات وإرث ثقافي."
          : "An interactive map of Algeria through time — regions, eras, figures, and cultural heritage.",
    eyebrow:
      lang === "fr" ? "Explorer l'Algérie" : lang === "ar" ? "استكشف الجزائر" : "Explore Algeria",
    layerLabel:
      lang === "fr" ? "Couche historique" : lang === "ar" ? "طبقة تاريخية" : "Historical layer",
    allLayer: lang === "fr" ? "Toutes les époques" : lang === "ar" ? "كل الحقب" : "All eras",
    selectHint:
      lang === "fr"
        ? "Touchez une région pour l'explorer"
        : lang === "ar"
          ? "اضغط على منطقة لاستكشافها"
          : "Tap a region to explore",
    overview: lang === "fr" ? "Aperçu" : lang === "ar" ? "نظرة عامة" : "Overview",
    eras: lang === "fr" ? "Époques liées" : lang === "ar" ? "حقب مرتبطة" : "Connected eras",
    figuresL: lang === "fr" ? "Figures clés" : lang === "ar" ? "شخصيات بارزة" : "Key figures",
    culture: lang === "fr" ? "Identité culturelle" : lang === "ar" ? "الهوية الثقافية" : "Cultural identity",
    explore: lang === "fr" ? "Explorer davantage" : lang === "ar" ? "استكشف أكثر" : "Explore deeper",
    regionPage: lang === "fr" ? "Page région" : lang === "ar" ? "صفحة المنطقة" : "Region page",
    figuresPage: lang === "fr" ? "Toutes les figures" : lang === "ar" ? "كل الشخصيات" : "All figures",
    timeline: lang === "fr" ? "Frise chronologique" : lang === "ar" ? "الخط الزمني" : "Timeline",
    legend:
      lang === "fr"
        ? "Choisissez une époque pour voir où elle a marqué l'Algérie."
        : lang === "ar"
          ? "اختر حقبة لرؤية أين تركت أثرها في الجزائر."
          : "Pick an era to see where it shaped Algeria.",
    pickRegion:
      lang === "fr"
        ? "Sélectionnez une région sur la carte pour révéler son histoire."
        : lang === "ar"
          ? "اختر منطقة من الخريطة لكشف قصتها."
          : "Select a region on the map to reveal its story.",
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="museum-hero">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] text-[16rem] sm:text-[22rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center animate-cinematic-in">
          <span className="museum-eyebrow">
            <span aria-hidden>🗺️</span>
            {T.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">{T.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            {T.subtitle}
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        {/* Era layer selector */}
        <div className="mb-6">
          <div className="museum-eyebrow mb-2">{T.layerLabel}</div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            <LayerChip
              active={layer === "all"}
              onClick={() => setLayer("all")}
              emoji="✦"
              label={T.allLayer}
            />
            {eras.map((e) => (
              <LayerChip
                key={e.id}
                active={layer === e.id}
                onClick={() => setLayer(e.id)}
                emoji={e.emoji}
                label={t(e.title, lang)}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground italic">{T.legend}</p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-8 items-start">
          {/* MAP */}
          <div
            className="relative rounded-3xl overflow-hidden border border-border"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%), linear-gradient(160deg, color-mix(in oklab, var(--primary) 12%, var(--card)), var(--card) 55%, color-mix(in oklab, var(--accent) 10%, var(--card)))",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            {/* Parchment texture overlay */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-60 bg-parchment"
            />
            <svg
              viewBox="0 0 100 100"
              className="relative w-full h-auto block"
              role="img"
              aria-label={T.title}
            >
              <defs>
                <radialGradient id="atlas-region-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="atlas-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 18%, var(--card))" />
                  <stop offset="100%" stopColor="color-mix(in oklab, var(--primary) 14%, var(--card))" />
                </linearGradient>
                <pattern id="atlas-dots" width="3" height="3" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.25" fill="color-mix(in oklab, var(--primary) 35%, transparent)" />
                </pattern>
              </defs>

              {/* Compass rose */}
              <g transform="translate(86,12)" opacity="0.55">
                <circle r="3.2" fill="none" stroke="var(--accent)" strokeWidth="0.25" />
                <path d="M 0 -3 L 0.5 0 L 0 3 L -0.5 0 Z" fill="var(--accent)" />
                <text x="0" y="-3.8" textAnchor="middle" fontSize="2.2" fill="var(--muted-foreground)" fontWeight="700">N</text>
              </g>

              {/* Algeria silhouette */}
              <path
                d={ALGERIA_PATH}
                fill="url(#atlas-land)"
                stroke="color-mix(in oklab, var(--primary) 40%, var(--border))"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
              <path
                d={ALGERIA_PATH}
                fill="url(#atlas-dots)"
                opacity="0.45"
              />
              {/* Coast accent (top) */}
              <path
                d="M 16 12 L 36 9 L 56 10 L 78 13"
                fill="none"
                stroke="color-mix(in oklab, var(--accent) 70%, transparent)"
                strokeWidth="0.6"
                strokeLinecap="round"
              />

              {/* Mediterranean label */}
              <text
                x="50" y="6"
                textAnchor="middle"
                fontSize="2.2"
                fill="color-mix(in oklab, var(--accent) 80%, var(--muted-foreground))"
                fontStyle="italic"
              >
                ⌒ Mediterranean ⌒
              </text>
              <text
                x="50" y="96"
                textAnchor="middle"
                fontSize="2"
                fill="color-mix(in oklab, var(--primary) 60%, var(--muted-foreground))"
                fontStyle="italic"
                opacity="0.7"
              >
                Sahara · Tassili · Hoggar
              </text>

              {/* Region pins */}
              {mapRegions.map((r) => {
                const p = REGION_POINTS[r.id];
                if (!p) return null;
                const isFocus = focusIds.has(r.id);
                const isActive = selected === r.id;
                const isHover = hovered === r.id;
                const radius = p.size * (isActive ? 1.15 : isHover ? 1.08 : 1);
                return (
                  <g
                    key={r.id}
                    style={{ cursor: "pointer", transition: "opacity .4s ease" }}
                    opacity={isFocus ? 1 : 0.32}
                    onMouseEnter={() => setHovered(r.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(r.id)}
                    role="button"
                    aria-label={t(r.name, lang)}
                  >
                    {/* Glow halo */}
                    {(isFocus || isActive) && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={radius * 1.9}
                        fill="url(#atlas-region-glow)"
                        opacity={isActive ? 0.95 : 0.55}
                      >
                        {isFocus && (
                          <animate
                            attributeName="opacity"
                            values={isActive ? "0.9;1;0.9" : "0.35;0.6;0.35"}
                            dur="3.6s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                    )}
                    {/* Pin */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={radius}
                      fill={isActive ? "var(--primary)" : "var(--card)"}
                      stroke={isActive ? "var(--accent)" : "color-mix(in oklab, var(--primary) 55%, var(--border))"}
                      strokeWidth={isActive ? "0.9" : "0.6"}
                      style={{ transition: "all .35s ease" }}
                    />
                    {/* Hit area for touch */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={radius * 2.2}
                      fill="transparent"
                    />
                    {/* Label */}
                    <text
                      x={p.x}
                      y={p.y + radius + 3.2}
                      textAnchor="middle"
                      fontSize="2.6"
                      fontWeight={isActive ? 800 : 600}
                      fill={
                        isActive
                          ? "var(--primary)"
                          : "color-mix(in oklab, var(--foreground) 80%, transparent)"
                      }
                      style={{ pointerEvents: "none", transition: "fill .3s ease" }}
                    >
                      {t(r.name, lang)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hint badge */}
            {!selected && (
              <div className="absolute bottom-3 inset-x-3 sm:left-4 sm:right-auto text-center sm:text-start text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground bg-card/80 backdrop-blur px-3 py-1.5 rounded-full border border-border w-fit mx-auto sm:mx-0">
                ✦ {T.selectHint}
              </div>
            )}
          </div>

          {/* INFO PANEL */}
          <aside className="lg:sticky lg:top-24">
            {activeRegion ? (
              <RegionPanel region={activeRegion} lang={lang} labels={T} />
            ) : (
              <EmptyPanel lang={lang} message={T.pickRegion} />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ============================================================
 *  Subcomponents
 * ============================================================ */

function LayerChip({
  active, onClick, emoji, label,
}: { active: boolean; onClick: () => void; emoji: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={
        "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition whitespace-nowrap " +
        (active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40")
      }
    >
      <span aria-hidden>{emoji}</span>
      {label}
    </button>
  );
}

function EmptyPanel({ lang, message }: { lang: string; message: string }) {
  return (
    <div className="museum-card text-center py-10">
      <div className="text-5xl mb-3 opacity-80">🧭</div>
      <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
        {message}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground">
        <span aria-hidden>ⵣ</span>
        <span>{lang === "fr" ? "Atlas vivant" : lang === "ar" ? "أطلس حيّ" : "A living atlas"}</span>
      </div>
    </div>
  );
}

type PanelLabels = {
  overview: string;
  eras: string;
  figuresL: string;
  culture: string;
  explore: string;
  regionPage: string;
  figuresPage: string;
  timeline: string;
};

function RegionPanel({
  region, lang, labels,
}: {
  region: (typeof mapRegions)[number];
  lang: ReturnType<typeof useLang>;
  labels: PanelLabels;
}) {
  const figureList = region.figureIds
    .map((id) => figures.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .slice(0, 6);

  const extras = regionExtras[region.id];

  // Connected eras: primary eraId + any era that focuses this region.
  const connectedEraIds = new Set<string>();
  if (region.eraId) connectedEraIds.add(region.eraId);
  Object.entries(ERA_REGION_FOCUS).forEach(([eraId, regs]) => {
    if (regs.includes(region.id)) connectedEraIds.add(eraId);
  });
  const connectedEras = eras.filter((e) => connectedEraIds.has(e.id));

  const culturalPillars: { emoji: string; label: LocalizedString }[] = [];
  if (extras?.culturePillars) {
    extras.culturePillars.slice(0, 4).forEach((p) =>
      culturalPillars.push({ emoji: p.emoji, label: p.label })
    );
  }

  return (
    <div className="museum-card animate-float-up">
      <div className="flex items-start gap-3">
        <div className="text-4xl leading-none">{region.emoji}</div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
            {t(region.name, lang)}
          </h2>
          <div className="mt-1 text-[11px] uppercase tracking-[0.18em] font-bold text-accent-foreground">
            {t(region.focus, lang)}
          </div>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-foreground/90">
        {t(region.summary, lang)}
      </p>

      {/* Connected eras */}
      {connectedEras.length > 0 && (
        <Block title={labels.eras} emoji="🕰️">
          <div className="flex flex-wrap gap-1.5">
            {connectedEras.map((e) => (
              <Link
                key={e.id}
                to="/era/$eraId"
                params={{ eraId: e.id }}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent-foreground border border-border hover:border-primary/40 hover:bg-accent/25 transition"
              >
                <span className="mr-1">{e.emoji}</span>
                {t(e.title, lang)}
              </Link>
            ))}
          </div>
        </Block>
      )}

      {/* Key figures */}
      {figureList.length > 0 && (
        <Block title={labels.figuresL} emoji="🏛️">
          <div className="grid grid-cols-2 gap-1.5">
            {figureList.map((f) => (
              <Link
                key={f.id}
                to="/figures/$figureId"
                params={{ figureId: f.id }}
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl border border-border bg-card hover:border-primary/40 hover:-translate-y-0.5 transition"
              >
                <span className="text-xl">{f.emoji}</span>
                <span className="text-xs font-semibold truncate">{t(f.displayName, lang)}</span>
              </Link>
            ))}
          </div>
        </Block>
      )}

      {/* Cultural identity */}
      {culturalPillars.length > 0 && (
        <Block title={labels.culture} emoji="ⵣ">
          <div className="grid grid-cols-2 gap-1.5">
            {culturalPillars.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl border border-border bg-muted/40"
              >
                <span className="text-lg">{p.emoji}</span>
                <span className="text-xs font-semibold truncate">{t(p.label, lang)}</span>
              </div>
            ))}
          </div>
        </Block>
      )}

      {/* Explore deeper */}
      <div className="mt-6 pt-5 border-t border-border/70">
        <div className="museum-eyebrow mb-2">{labels.explore}</div>
        <div className="flex flex-wrap gap-1.5">
          <Link
            to="/map"
            hash={`region-${region.id}`}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            📍 {labels.regionPage}
          </Link>
          <Link
            to="/figures"
            className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-card hover:border-primary/40 transition"
          >
            🏛️ {labels.figuresPage}
          </Link>
          <Link
            to="/timeline"
            className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-card hover:border-primary/40 transition"
          >
            🕰️ {labels.timeline}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Block({
  title, emoji, children,
}: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="museum-eyebrow mb-2">
        <span aria-hidden>{emoji}</span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
