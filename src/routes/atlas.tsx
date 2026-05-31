import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ContextRibbon } from "@/components/museum/Exhibit";
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
  // NW corner, just inland from the Moroccan border
  "M 14 22",
  // Mediterranean coastline — long, almost horizontal with quiet swells
  "C 22 19, 34 18, 44 18",
  "S 62 19, 72 21",
  // Small Tunisia inset, then a short jut east
  "Q 76 22 76 25",
  "L 80 27",
  // East border (Libya) — single calm line, very slight bow
  "C 83 38, 83 50, 81 60",
  // SE shoulder turning toward the Sahel
  "C 78 70, 72 76, 66 80",
  // Southern tip tapering toward Mali (asymmetric, slightly west of center)
  "C 56 88, 46 90, 38 86",
  // SW edge climbing back up through the Sahara
  "C 28 80, 22 72, 18 62",
  // West border (Morocco) — gentle inward sway
  "C 14 52, 11 42, 12 32",
  "C 12 27, 13 24, 14 22",
  "Z",
].join(" ");

/** Coastline-only path (top edge) — for label arc + soft glow accent. */
const ALGERIA_COAST =
  "M 14 22 C 22 19, 34 18, 44 18 S 62 19, 72 21 Q 76 22 76 25";

/** Region map pins — smaller, integrated into the terrain. */
const REGION_POINTS: Record<string, { x: number; y: number; size: number }> = {
  "oran-west":   { x: 22, y: 26, size: 3.4 },
  algiers:       { x: 43, y: 22, size: 3.2 },
  kabylie:       { x: 54, y: 23, size: 3.1 },
  constantine:   { x: 65, y: 24, size: 3.2 },
  aures:         { x: 62, y: 33, size: 3.3 },
  sahara:        { x: 48, y: 58, size: 5.0 },
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
    <div className="min-h-dvh">
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
                <linearGradient id="atlas-land" x1="0" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 22%, var(--card))" />
                  <stop offset="55%" stopColor="color-mix(in oklab, var(--accent) 12%, var(--card))" />
                  <stop offset="100%" stopColor="color-mix(in oklab, var(--primary) 18%, var(--card))" />
                </linearGradient>
                <linearGradient id="atlas-sahara" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 0%, transparent)" stopOpacity="0" />
                  <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 28%, transparent)" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="atlas-sea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="color-mix(in oklab, var(--primary) 10%, transparent)" stopOpacity="0" />
                  <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 18%, transparent)" stopOpacity="0.45" />
                </linearGradient>
                <pattern id="atlas-dots" width="3.6" height="3.6" patternUnits="userSpaceOnUse">
                  <circle cx="1.8" cy="1.8" r="0.16" fill="color-mix(in oklab, var(--primary) 30%, transparent)" />
                </pattern>
                <clipPath id="atlas-clip">
                  <path d={ALGERIA_PATH} />
                </clipPath>
                <filter id="atlas-soft" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="0.4" />
                </filter>
                <path id="atlas-coast-arc" d={ALGERIA_COAST} />
              </defs>

              {/* Mediterranean shading above the coast */}
              <rect x="0" y="0" width="100" height="20" fill="url(#atlas-sea)" />
              {/* A single, very quiet sea swell */}
              <path
                d="M 14 12 Q 28 10 44 12 T 76 12"
                fill="none"
                stroke="color-mix(in oklab, var(--accent) 50%, transparent)"
                strokeWidth="0.15"
                opacity="0.35"
              />

              {/* Compass rose */}
              <g transform="translate(91,11)" opacity="0.55">
                <circle r="3.2" fill="none" stroke="var(--accent)" strokeWidth="0.18" />
                <circle r="1.9" fill="none" stroke="var(--accent)" strokeWidth="0.1" opacity="0.55" />
                <path d="M 0 -3 L 0.45 0 L 0 3 L -0.45 0 Z" fill="var(--accent)" />
                <text x="0" y="-3.7" textAnchor="middle" fontSize="1.8" fill="var(--muted-foreground)" fontWeight="700">N</text>
              </g>

              {/* Soft parchment shadow behind the land */}
              <path
                d={ALGERIA_PATH}
                fill="color-mix(in oklab, var(--primary) 18%, transparent)"
                opacity="0.3"
                filter="url(#atlas-soft)"
                transform="translate(0.5,0.8)"
              />

              {/* Base land */}
              <path
                d={ALGERIA_PATH}
                fill="url(#atlas-land)"
                stroke="color-mix(in oklab, var(--primary) 38%, var(--border))"
                strokeWidth="0.35"
                strokeLinejoin="round"
              />
              {/* Quiet topographic texture */}
              <path d={ALGERIA_PATH} fill="url(#atlas-dots)" opacity="0.28" />

              {/* Interior cartographic hints — clipped to land */}
              <g clipPath="url(#atlas-clip)">
                {/* Sahara wash (south) */}
                <rect x="0" y="42" width="100" height="56" fill="url(#atlas-sahara)" />

                {/* Tell Atlas — a single restrained ridge line, not repeated peaks */}
                <path
                  d="M 18 29 Q 26 26.6 34 28.4 T 50 28.6 T 68 28.8"
                  fill="none"
                  stroke="color-mix(in oklab, var(--primary) 45%, transparent)"
                  strokeWidth="0.28"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                {/* Saharan Atlas — a softer parallel ridge */}
                <path
                  d="M 22 40 Q 32 38 44 39.2 T 66 40"
                  fill="none"
                  stroke="color-mix(in oklab, var(--accent) 55%, transparent)"
                  strokeWidth="0.22"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                {/* Hoggar massif — one tiny contour cluster, deep south */}
                <g
                  fill="none"
                  stroke="color-mix(in oklab, var(--primary) 45%, transparent)"
                  strokeWidth="0.22"
                  opacity="0.5"
                >
                  <path d="M 50 74 q 4 -2.5 8 0" />
                  <path d="M 51 76 q 3.5 -1.8 7 0" />
                </g>

                {/* Coastal inner shading */}
                <path
                  d={ALGERIA_COAST}
                  fill="none"
                  stroke="color-mix(in oklab, var(--accent) 55%, transparent)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.28"
                  filter="url(#atlas-soft)"
                />
              </g>

              {/* Crisp coastline accent on top */}
              <path
                d={ALGERIA_COAST}
                fill="none"
                stroke="color-mix(in oklab, var(--accent) 72%, transparent)"
                strokeWidth="0.4"
                strokeLinecap="round"
              />

              {/* Mediterranean label, curved along the coast */}
              <text
                fontSize="1.9"
                fill="color-mix(in oklab, var(--accent) 70%, var(--muted-foreground))"
                fontStyle="italic"
                letterSpacing="0.45"
              >
                <textPath href="#atlas-coast-arc" startOffset="32%" textAnchor="middle">
                  M E D I T E R R A N E A N   S E A
                </textPath>
              </text>
              <text
                x="50" y="97"
                textAnchor="middle"
                fontSize="1.8"
                fill="color-mix(in oklab, var(--primary) 55%, var(--muted-foreground))"
                fontStyle="italic"
                letterSpacing="0.55"
                opacity="0.65"
              >
                S A H A R A  ·  T A S S I L I  ·  H O G G A R
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(r.id);
                      }
                    }}
                    onFocus={() => setHovered(r.id)}
                    onBlur={() => setHovered(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={t(r.name, lang)}
                  >
                    {/* Glow halo — quieter, smaller */}
                    {(isFocus || isActive) && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={radius * 1.6}
                        fill="url(#atlas-region-glow)"
                        opacity={isActive ? 0.7 : 0.35}
                      >
                        {isFocus && (
                          <animate
                            attributeName="opacity"
                            values={isActive ? "0.6;0.8;0.6" : "0.22;0.4;0.22"}
                            dur="4.2s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                    )}
                    {/* Pin — small, integrated */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={radius * 0.55}
                      fill={isActive ? "var(--primary)" : "color-mix(in oklab, var(--card) 92%, var(--accent))"}
                      stroke={isActive ? "var(--accent)" : "color-mix(in oklab, var(--primary) 55%, var(--border))"}
                      strokeWidth={isActive ? "0.5" : "0.32"}
                      style={{ transition: "all .35s ease" }}
                    />
                    {/* Hit area for touch */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={Math.max(radius * 2.4, 4)}
                      fill="transparent"
                    />
                    {/* Label */}
                    <text
                      x={p.x}
                      y={p.y + radius * 0.55 + 2.6}
                      textAnchor="middle"
                      fontSize="2.1"
                      fontWeight={isActive ? 700 : 600}
                      letterSpacing="0.1"
                      fill={
                        isActive
                          ? "var(--primary)"
                          : "color-mix(in oklab, var(--foreground) 72%, transparent)"
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
              <div className="absolute bottom-3 inset-x-3 sm:start-4 sm:end-auto text-center sm:text-start text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground bg-card/80 backdrop-blur px-3 py-1.5 rounded-full border border-border w-fit mx-auto sm:mx-0">
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
        "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-full text-xs font-semibold border transition whitespace-nowrap " +
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
                <span className="me-1">{e.emoji}</span>
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
      <ContextRibbon connects={["figures", "eras", "regions", "culture", "timeline"]} lang={lang} />
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
