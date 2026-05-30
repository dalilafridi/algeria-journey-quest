import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { Header } from "@/components/Header";

import { figures, type Figure } from "@/data/figures";
import { figureMeta, FIGURE_THEMES } from "@/data/figureMeta";
import { eras } from "@/data/eras";
import { mapRegions } from "@/data/mapRegions";
import { LEGEND_ERAS, eraOfCategory, badgeKindOf } from "@/lib/figureEras";
import {
  COLLECTIONS,
  collectionOf,
  currentExhibitionId,
  type CollectionDef,
} from "@/lib/figureCollections";
import { EraBadge } from "@/components/brand/EraBadge";
import { t, tu, useLang, type Lang } from "@/lib/i18n";
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
      { title: "Hall of Legends — The People Who Shaped Algeria" },
      {
        name: "description",
        content:
          "Walk the Hall of Legends — a museum wing dedicated to the people who shaped Algeria, presented in curated galleries of leaders, warriors, revolutionaries, scholars, faith-keepers, poets and modern voices.",
      },
      { property: "og:title", content: "Hall of Legends — The People Who Shaped Algeria" },
      {
        property: "og:description",
        content:
          "A cinematic museum wing of Algeria's most influential historical figures, curated into themed galleries.",
      },
    ],
  }),
  component: FiguresIndex,
});

function FiguresIndex() {
  const lang = useLang();

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: { fr: "Panthéon", en: "Hall of Legends", ar: "قاعة العظماء" },
      description: {
        fr: "Découvrir les figures qui ont façonné l'Algérie",
        en: "Discover the people who shaped Algeria",
        ar: "اكتشف من صاغوا تاريخ الجزائر",
      },
      href: "/figures",
    });
  }, []);

  /** The rotating headline legend — the "Current Exhibition". */
  const spotlight = useMemo(() => {
    const id = currentExhibitionId();
    return figures.find((f) => f.id === id) ?? figures[0];
  }, []);

  /** Each curated gallery, with its members resolved to figures. */
  const galleries = useMemo(
    () =>
      COLLECTIONS.map((col) => ({
        col,
        items: col.members
          .map((id) => figures.find((f) => f.id === id))
          .filter((f): f is Figure => Boolean(f)),
      })).filter((g) => g.items.length > 0),
    [],
  );

  const figureWord = lang === "fr" ? "figures" : lang === "ar" ? "شخصية" : "figures";
  const galleryWord = lang === "fr" ? "galeries" : lang === "ar" ? "قاعة" : "galleries";
  const planVisitLabel =
    lang === "fr" ? "Plan de la visite" : lang === "ar" ? "خريطة الزيارة" : "Plan your visit";

  return (
    <div className="min-h-screen">
      <Header />

      {/* ============ ENTRANCE — walking into the hall ============ */}
      <section className="relative museum-hero">
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
            <span aria-hidden>ⵣ</span>
            <span>
              {lang === "fr"
                ? "Une aile du musée vivant"
                : lang === "ar"
                  ? "جناح من المتحف الحي"
                  : "A wing of the living museum"}
            </span>
          </div>
          <h1
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {lang === "fr" ? "Le Panthéon des Légendes" : lang === "ar" ? "قاعة العظماء" : "The Hall of Legends"}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            {lang === "fr"
              ? "Avancez de galerie en galerie à la rencontre des femmes et des hommes qui ont façonné l'Algérie — non pas une liste de noms, mais une collection vivante d'histoires."
              : lang === "ar"
                ? "تنقّل من قاعة إلى قاعة لتلتقي النساء والرجال الذين صاغوا الجزائر — ليست قائمة أسماء، بل مجموعة حيّة من الحكايات."
                : "Move from gallery to gallery to meet the women and men who shaped Algeria — not a list of names, but a living collection of stories."}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-foreground font-bold">{figures.length}</span>
              <span>{figureWord}</span>
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-foreground font-bold">{galleries.length}</span>
              <span>{galleryWord}</span>
            </span>
            <span aria-hidden>·</span>
            <Link to="/figures/quiz" className="font-semibold text-primary hover:underline">
              {tu("guessThisFigureCta", lang)}
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ============ CURRENT EXHIBITION ============ */}
        {spotlight && <CurrentExhibition figure={spotlight} lang={lang} />}

        {/* ============ GALLERY MAP — plan your visit ============ */}
        <nav aria-label={planVisitLabel} className="mt-12 mb-10">
          <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground mb-3">
            {planVisitLabel}
          </div>
          <div className="flex gap-2 flex-wrap">
            {galleries.map(({ col, items }) => (
              <a
                key={col.id}
                href={`#gallery-${col.id}`}
                className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  borderColor: "color-mix(in oklab, var(--brand-gold) 30%, var(--border))",
                  background: "var(--card)",
                }}
              >
                <span aria-hidden style={{ color: col.accent }}>
                  {col.emblem}
                </span>
                <span className="group-hover:text-primary transition-colors">{t(col.label, lang)}</span>
                <span className="text-[11px] text-muted-foreground">{items.length}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ============ GALLERIES ============ */}
        <div className="space-y-16">
          {galleries.map(({ col, items }) => (
            <GallerySection key={col.id} col={col} items={items} lang={lang} />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Current Exhibition (rotating headline) ---------------- */

function CurrentExhibition({ figure: f, lang }: { figure: Figure; lang: Lang }) {
  const fm = figureMeta[f.id];
  const era = LEGEND_ERAS.find((e) => e.id === eraOfCategory(f.category))!;
  const col = collectionOf(f.id);
  const exploreLabel =
    lang === "fr" ? "Entrer dans son histoire" : lang === "ar" ? "ادخل قصته" : "Enter their story";
  const nowShowingLabel =
    lang === "fr" ? "Exposition du moment" : lang === "ar" ? "معرض هذه اللحظة" : "Current exhibition";

  return (
    <Link
      to="/figures/$figureId"
      params={{ figureId: f.id }}
      className="group relative block overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 32%, var(--border))",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--accent) 18%, var(--card)) 0%, var(--card) 55%, color-mix(in oklab, var(--primary) 12%, var(--card)) 100%)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] text-[18rem] font-black leading-none flex items-center justify-center select-none"
        style={{ color: "var(--foreground)" }}
      >
        ⵣ
      </div>
      {/* Now-showing ribbon */}
      <div
        className="relative z-10 flex items-center gap-2 px-6 sm:px-8 pt-5 text-[10px] font-bold uppercase tracking-[0.24em]"
        style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 88%, var(--foreground))" }}
      >
        <span aria-hidden className="inline-block w-6 h-px" style={{ background: "var(--brand-gold)" }} />
        ★ {nowShowingLabel}
      </div>

      <div className="relative grid md:grid-cols-[auto_1fr] gap-6 sm:gap-9 p-6 sm:p-8 pt-4 items-center">
        {/* Portrait medallion */}
        <div className="flex justify-center md:block">
          <div
            className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-full transition-transform duration-700 group-hover:scale-[1.03]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 28%, var(--card)) 100%)",
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--brand-gold) 55%, transparent), inset 0 -10px 22px color-mix(in oklab, var(--foreground) 22%, transparent), var(--shadow-gold-glow)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-2 rounded-full border"
              style={{ borderColor: "color-mix(in oklab, var(--background) 55%, transparent)" }}
            />
            <span
              aria-hidden
              className="relative text-7xl sm:text-[5rem] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              style={{ filter: "saturate(0.9)" }}
            >
              {f.emoji}
            </span>
            <div className="absolute -bottom-2 -end-2">
              <EraBadge kind={era.badge} size={46} label={t(era.label, lang)} />
            </div>
          </div>
        </div>

        {/* Plaque */}
        <div className="text-center md:text-start">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight group-hover:text-primary transition-colors"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {t(f.displayName, lang)}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5 justify-center md:justify-start text-xs">
            <span
              className="px-2.5 py-0.5 rounded-full font-semibold border inline-flex items-center gap-1"
              style={{
                borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
                background: "color-mix(in oklab, var(--brand-gold) 10%, var(--card))",
                color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
              }}
            >
              <span aria-hidden style={{ color: col.accent }}>{col.emblem}</span>
              {t(col.label, lang)}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
              {t(f.era, lang)}
            </span>
          </div>
          {fm?.cinematicLine ? (
            <p
              className="mt-5 text-lg sm:text-xl lg:text-2xl italic text-foreground/85 leading-relaxed max-w-2xl mx-auto md:mx-0"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              “{t(fm.cinematicLine, lang)}”
            </p>
          ) : (
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0 line-clamp-3">
              {t(f.importance, lang)}
            </p>
          )}
          {fm?.modernRelevance && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0 line-clamp-2">
              {t(fm.modernRelevance, lang)}
            </p>
          )}
          <span
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary-foreground font-semibold text-sm"
            style={{ background: "var(--gradient-warm)" }}
          >
            {exploreLabel}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------------- A single gallery (room) ---------------- */

function GallerySection({
  col,
  items,
  lang,
}: {
  col: CollectionDef;
  items: Figure[];
  lang: Lang;
}) {
  const figureWord = lang === "fr" ? "figures" : lang === "ar" ? "شخصية" : "figures";
  return (
    <section id={`gallery-${col.id}`} aria-label={t(col.label, lang)} className="scroll-mt-24">
      {/* Gallery wall text */}
      <div
        className="relative overflow-hidden rounded-[1.25rem] border p-5 sm:p-6 mb-7"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--accent) 8%, var(--card)), var(--card))",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 start-0 w-1"
          style={{ background: `color-mix(in oklab, ${col.accent} 75%, transparent)` }}
        />
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <EraBadge kind={col.badge} size={58} label={t(col.label, lang)} />
            <span
              aria-hidden
              className="absolute -bottom-1.5 -end-1.5 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
              style={{
                background: "var(--card)",
                border: "1px solid color-mix(in oklab, var(--brand-gold) 45%, var(--border))",
                color: col.accent,
              }}
            >
              {col.emblem}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2
                className="text-2xl sm:text-[1.8rem] font-bold leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(col.label, lang)}
              </h2>
              <span className="text-xs text-muted-foreground font-semibold">
                {items.length} {figureWord}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground/80 mt-0.5">{t(col.tagline, lang)}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {t(col.intro, lang)}
        </p>
      </div>

      {/* Exhibits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {items.map((f, i) => (
          <FigureCard key={f.id} figure={f} lang={lang} index={i} accent={col.accent} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Artifact figure card ---------------- */

function FigureCard({
  figure: f,
  lang,
  index,
  accent,
}: {
  figure: Figure;
  lang: Lang;
  index: number;
  accent: string;
}) {
  const era = eras.find((e) => e.id === f.relatedEraId);
  const regionMapId = FIGURE_REGION_TO_MAP[f.region];
  const region = regionMapId ? mapRegions.find((r) => r.id === regionMapId) : undefined;
  const fm = figureMeta[f.id];
  const primaryTheme = fm?.themes?.[0];
  const themeDef = primaryTheme ? FIGURE_THEMES[primaryTheme] : null;
  const badgeKind = badgeKindOf(f.category);
  const exhibitNo = String(index + 1).padStart(2, "0");

  return (
    <Link
      to="/figures/$figureId"
      params={{ figureId: f.id }}
      aria-label={t(f.displayName, lang)}
      className="figure-exhibit group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* Portrait stage */}
      <div
        className="relative h-44 sm:h-48 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--accent) 14%, var(--card)) 0%, color-mix(in oklab, var(--primary) 8%, var(--card)) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-2 rounded-[0.85rem] border"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 38%, transparent)",
            boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--brand-gold-bright) 18%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, transparent 40%, color-mix(in oklab, var(--foreground) 22%, transparent) 100%)",
          }}
        />
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
              style={{ borderColor: "color-mix(in oklab, var(--background) 55%, transparent)" }}
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
        {/* Warm light sweep on hover */}
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
        {/* Era medallion marker */}
        <div className="absolute top-2.5 end-2.5">
          <EraBadge kind={badgeKind} size={30} />
        </div>
      </div>

      {/* Museum plaque */}
      <div className="relative px-5 pt-4 pb-5 flex-1 flex flex-col bg-parchment-card">
        <span
          aria-hidden
          className="absolute inset-x-5 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, color-mix(in oklab, ${accent} 70%, transparent), transparent)` }}
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
}
