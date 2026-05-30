import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";

import { figures, type Figure } from "@/data/figures";
import { figureMeta } from "@/data/figureMeta";
import { eraOfCategory, badgeKindOf, LEGEND_ERAS } from "@/lib/figureEras";
import { collectionOf, currentExhibitionId } from "@/lib/figureCollections";
import {
  DISCOVERY_ROWS,
  ERA_ROWS,
  resolveRow,
  slugOfRow,
  type DiscoveryRow,
} from "@/lib/figureDiscovery";
import { EraBadge } from "@/components/brand/EraBadge";
import { FigureExhibitCard } from "@/components/figures/FigureExhibitCard";
import { t, tu, useLang, type Lang } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";


export const Route = createFileRoute("/figures/")({
  head: () => ({
    meta: [
      { title: "Hall of Legends — Discover the People Who Shaped Algeria" },
      {
        name: "description",
        content:
          "Browse the Hall of Legends like a living museum — a featured exhibition, curated collections and era-by-era galleries of the women and men who shaped Algeria. Arrive for one story, leave having discovered ten.",
      },
      { property: "og:title", content: "Hall of Legends — Discover the People Who Shaped Algeria" },
      {
        property: "og:description",
        content:
          "A cinematic, browse-first museum of Algeria's most influential historical figures — curated collections and era galleries.",
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

  /** The rotating headline legend — the featured exhibition billboard. */
  const featured = useMemo(() => {
    const id = currentExhibitionId();
    return figures.find((f) => f.id === id) ?? figures[0];
  }, []);

  const themedRows = useMemo(
    () => DISCOVERY_ROWS.map((row) => ({ row, items: resolveRow(row) })).filter((r) => r.items.length > 0),
    [],
  );
  const eraRows = useMemo(
    () => ERA_ROWS.map((row) => ({ row, items: resolveRow(row) })).filter((r) => r.items.length > 0),
    [],
  );

  const collectionsLabel =
    lang === "fr" ? "Collections" : lang === "ar" ? "مجموعات" : "Collections";
  const collectionsIntro =
    lang === "fr"
      ? "Avancez de salle en salle. Chaque rangée est une collection conservée — faites défiler pour découvrir."
      : lang === "ar"
        ? "تنقّل من قاعة إلى قاعة. كل صف مجموعة مختارة — مرّر لتكتشف."
        : "Walk room to room. Each row is a curated collection — scroll sideways to discover.";
  const erasLabel =
    lang === "fr" ? "Explorer par ère" : lang === "ar" ? "استكشف حسب الحقبة" : "Explore by era";
  const erasIntro =
    lang === "fr"
      ? "Traversez l'histoire âge par âge, de la Numidie antique à l'Algérie d'aujourd'hui."
      : lang === "ar"
        ? "اعبر التاريخ عصرًا بعد عصر، من نوميديا القديمة إلى جزائر اليوم."
        : "Move through history age by age, from ancient Numidia to Algeria today.";

  return (
    <div className="min-h-screen">
      <Header />

      {/* ============ FEATURED EXHIBITION BILLBOARD ============ */}
      {featured && <FeaturedBillboard figure={featured} lang={lang} />}

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        {/* ---- Quick jump strip (browse, not filter) ---- */}
        <nav
          aria-label={collectionsLabel}
          className="-mx-4 px-4 mb-8 flex gap-2 overflow-x-auto no-scrollbar snap-x"
        >
          {themedRows.map(({ row, items }) => (
            <a
              key={row.id}
              href={`#row-${row.id}`}
              className="snap-start shrink-0 group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
              style={{
                borderColor: "color-mix(in oklab, var(--brand-gold) 30%, var(--border))",
                background: "var(--card)",
              }}
            >
              <span aria-hidden style={{ color: row.accent }}>
                {row.emblem}
              </span>
              <span className="group-hover:text-primary transition-colors whitespace-nowrap">
                {t(row.label, lang)}
              </span>
              <span className="text-[11px] text-muted-foreground">{items.length}</span>
            </a>
          ))}
        </nav>

        {/* ============ THEMATIC COLLECTIONS ============ */}
        <RowGroupHeader title={collectionsLabel} intro={collectionsIntro} />
        <div className="space-y-10 sm:space-y-12">
          {themedRows.map(({ row, items }) => (
            <DiscoverySection key={row.id} row={row} items={items} lang={lang} />
          ))}
        </div>

        {/* ============ ERA GALLERIES ============ */}
        <div className="mt-16">
          <RowGroupHeader title={erasLabel} intro={erasIntro} />
          <div className="space-y-10 sm:space-y-12">
            {eraRows.map(({ row, items }) => (
              <DiscoverySection key={row.id} row={row} items={items} lang={lang} />
            ))}
          </div>
        </div>

        {/* ============ SEARCH & REFINE (secondary) ============ */}
        <RefineCollection lang={lang} />
      </main>
    </div>
  );
}

/* ---------------- Featured exhibition billboard ---------------- */

function FeaturedBillboard({ figure: f, lang }: { figure: Figure; lang: Lang }) {
  const fm = figureMeta[f.id];
  const era = LEGEND_ERAS.find((e) => e.id === eraOfCategory(f.category))!;
  const col = collectionOf(f.id);
  const exploreLabel =
    lang === "fr" ? "Explorer son histoire" : lang === "ar" ? "اكتشف قصته" : "Explore their story";
  const nowShowingLabel =
    lang === "fr" ? "Exposition à l'affiche" : lang === "ar" ? "المعرض المعروض الآن" : "Now showing";

  return (
    <section className="relative museum-hero">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05] text-[16rem] sm:text-[24rem] font-black leading-none flex items-center justify-center select-none"
        style={{ color: "var(--accent)" }}
      >
        ⵣ
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-2 sm:pt-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
            <span aria-hidden>ⵣ</span>
            {lang === "fr" ? "Le Panthéon des Légendes" : lang === "ar" ? "قاعة العظماء" : "The Hall of Legends"}
          </div>
          <Link to="/figures/quiz" className="text-sm font-semibold text-primary hover:underline">
            {tu("guessThisFigureCta", lang)}
          </Link>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-10 sm:pb-12">
        <Link
          to="/figures/$figureId"
          params={{ figureId: f.id }}
          className="group relative block overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 animate-cinematic-in"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 32%, var(--border))",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--accent) 20%, var(--card)) 0%, var(--card) 55%, color-mix(in oklab, var(--primary) 12%, var(--card)) 100%)",
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

          <div
            className="relative z-10 flex items-center gap-2 px-6 sm:px-9 pt-6 text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 88%, var(--foreground))" }}
          >
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "var(--brand-gold)" }} />
            ★ {nowShowingLabel}
          </div>

          <div className="relative grid md:grid-cols-[auto_1fr] gap-6 sm:gap-10 p-6 sm:p-9 pt-4 items-center">
            {/* Large portrait medallion */}
            <div className="flex justify-center md:block">
              <div
                className="relative flex items-center justify-center w-44 h-44 sm:w-56 sm:h-56 rounded-full transition-transform duration-700 group-hover:scale-[1.03]"
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
                  className="relative text-7xl sm:text-8xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  style={{ filter: "saturate(0.9)" }}
                >
                  {f.emoji}
                </span>
                <div className="absolute -bottom-2 -end-2">
                  <EraBadge kind={era.badge} size={52} label={t(era.label, lang)} />
                </div>
              </div>
            </div>

            {/* Plaque */}
            <div className="text-center md:text-start">
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start text-xs">
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
              <h1
                className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.04] group-hover:text-primary transition-colors"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(f.displayName, lang)}
              </h1>
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
      </div>
    </section>
  );
}

/* ---------------- Row group header ---------------- */

function RowGroupHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3">
        <h2
          className="text-2xl sm:text-[1.7rem] font-bold leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {title}
        </h2>
        <span
          aria-hidden
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--brand-gold) 55%, transparent), transparent)",
          }}
        />
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>
    </div>
  );
}

/* ---------------- A single horizontally-scrolling row ---------------- */

function DiscoverySection({
  row,
  items,
  lang,
}: {
  row: DiscoveryRow;
  items: Figure[];
  lang: Lang;
}) {
  const figureWord = lang === "fr" ? "figures" : lang === "ar" ? "شخصية" : "figures";
  const viewLabel =
    lang === "fr" ? "Voir la collection" : lang === "ar" ? "عرض المجموعة" : "View collection";
  return (
    <section id={`row-${row.id}`} aria-label={t(row.label, lang)} className="scroll-mt-24">
      {/* Row plaque */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="relative shrink-0">
          <EraBadge kind={row.badge} size={48} label={t(row.label, lang)} />
          <span
            aria-hidden
            className="absolute -bottom-1 -end-1 flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
            style={{
              background: "var(--card)",
              border: "1px solid color-mix(in oklab, var(--brand-gold) 45%, var(--border))",
              color: row.accent,
            }}
          >
            {row.emblem}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3
              className="text-xl sm:text-2xl font-bold leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {t(row.label, lang)}
            </h3>
            <span className="text-xs text-muted-foreground font-semibold">
              {items.length} {figureWord}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-snug">{t(row.tagline, lang)}</p>
        </div>
        <Link
          to="/figures/collection/$collectionId"
          params={{ collectionId: slugOfRow(row) }}
          className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors hover:text-primary"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 32%, var(--border))",
            background: "var(--card)",
          }}
        >
          {viewLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Horizontal scroll track */}
      <div className="-mx-4 px-4 flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
        {items.map((f) => (
          <FigureExhibitCard key={f.id} figure={f} lang={lang} accent={row.accent} />
        ))}
        {/* End-of-row "view collection" tile */}
        <Link
          to="/figures/collection/$collectionId"
          params={{ collectionId: slugOfRow(row) }}
          aria-label={viewLabel}
          className="snap-start shrink-0 w-[10.5rem] sm:w-[11.5rem] flex flex-col items-center justify-center gap-2 rounded-[1.1rem] border border-dashed text-center px-4 transition-colors hover:text-primary"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 38%, var(--border))",
            background: "color-mix(in oklab, var(--brand-gold) 6%, var(--card))",
          }}
        >
          <span
            aria-hidden
            className="flex items-center justify-center w-11 h-11 rounded-full text-lg"
            style={{
              border: "1px solid color-mix(in oklab, var(--brand-gold) 45%, var(--border))",
              color: row.accent,
            }}
          >
            →
          </span>
          <span className="text-sm font-semibold leading-tight">{viewLabel}</span>
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Search & refine (secondary) ---------------- */


function RefineCollection({ lang }: { lang: Lang }) {
  const [query, setQuery] = useState("");
  const [eraFilter, setEraFilter] = useState<string | null>(null);

  const heading =
    lang === "fr" ? "Affiner la collection" : lang === "ar" ? "تنقيح المجموعة" : "Refine the collection";
  const intro =
    lang === "fr"
      ? "Vous cherchez quelqu'un de précis ? Recherchez par nom ou filtrez par ère."
      : lang === "ar"
        ? "تبحث عن شخص بعينه؟ ابحث بالاسم أو صفِّ حسب الحقبة."
        : "Looking for someone specific? Search by name or filter by era.";
  const placeholder =
    lang === "fr" ? "Rechercher une figure…" : lang === "ar" ? "ابحث عن شخصية…" : "Search a legend…";
  const allLabel = lang === "fr" ? "Toutes les ères" : lang === "ar" ? "كل الحقب" : "All eras";
  const noResults =
    lang === "fr" ? "Aucune figure trouvée." : lang === "ar" ? "لا توجد نتائج." : "No legends found.";

  const normalized = query.trim().toLowerCase();
  const active = normalized.length > 0 || eraFilter !== null;

  const results = useMemo(() => {
    if (!active) return [];
    return figures.filter((f) => {
      if (eraFilter && eraOfCategory(f.category) !== eraFilter) return false;
      if (normalized) {
        const hay = [
          t(f.displayName, lang),
          f.name,
          t(f.era, lang),
          t(f.regionLabel, lang),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(normalized)) return false;
      }
      return true;
    });
  }, [active, eraFilter, normalized, lang]);

  return (
    <section className="mt-16 scroll-mt-24" id="refine">
      <div
        className="rounded-[1.25rem] border p-5 sm:p-6"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--accent) 7%, var(--card)), var(--card))",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground mb-1.5">
          {lang === "fr" ? "Explorer plus" : lang === "ar" ? "استكشف المزيد" : "Explore more"}
        </div>
        <h2
          className="text-2xl font-bold leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {heading}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{intro}</p>

        {/* Search */}
        <div className="mt-4">
          <label className="relative block">
            <span aria-hidden className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-xl border bg-card ps-9 pe-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 28%, var(--border))" }}
            />
          </label>
        </div>

        {/* Era filter chips */}
        <div className="mt-3 flex gap-2 flex-wrap">
          <FilterChip active={eraFilter === null} onClick={() => setEraFilter(null)}>
            {allLabel}
          </FilterChip>
          {LEGEND_ERAS.map((e) => (
            <FilterChip
              key={e.id}
              active={eraFilter === e.id}
              onClick={() => setEraFilter(eraFilter === e.id ? null : e.id)}
            >
              {t(e.label, lang)}
            </FilterChip>
          ))}
        </div>

        {/* Results */}
        {active && (
          <div className="mt-6">
            <div className="text-xs text-muted-foreground font-semibold mb-3">
              {results.length}{" "}
              {lang === "fr" ? "résultat(s)" : lang === "ar" ? "نتيجة" : "result(s)"}
            </div>
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground">{noResults}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {results.map((f) => (
                  <PortraitCard key={f.id} figure={f} lang={lang} accent="var(--brand-gold)" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
      style={{
        borderColor: active
          ? "color-mix(in oklab, var(--brand-gold) 55%, var(--border))"
          : "var(--border)",
        background: active ? "color-mix(in oklab, var(--brand-gold) 14%, var(--card))" : "var(--card)",
        color: active ? "color-mix(in oklab, var(--brand-gold-deep) 88%, var(--foreground))" : "var(--foreground)",
      }}
    >
      {children}
    </button>
  );
}
