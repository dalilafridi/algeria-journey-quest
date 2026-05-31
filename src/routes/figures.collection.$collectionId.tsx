import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";

import {
  findRowBySlug,
  resolveRow,
  rowDeep,
  relatedRows,
  slugOfRow,
  DISCOVERY_ROWS,
} from "@/lib/figureDiscovery";
import { MuseumEmptyState } from "@/components/figures/MuseumEmptyState";
import { LEGEND_ERAS, eraOfCategory } from "@/lib/figureEras";
import { EraBadge } from "@/components/brand/EraBadge";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { GuidedTour } from "@/components/figures/GuidedTour";
import {
  FigureExhibitCard,
  FIGURE_REGION_TO_MAP,
} from "@/components/figures/FigureExhibitCard";
import { mapRegions } from "@/data/mapRegions";
import { t, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";

export const Route = createFileRoute("/figures/collection/$collectionId")({
  head: ({ params }) => {
    const row = findRowBySlug(params.collectionId);
    const title = row
      ? `${t(row.label, "en")} — Hall of Legends`
      : "Collection — Hall of Legends";
    const description = row
      ? t(row.tagline, "en")
      : "A curated exhibit room of Algerian historical figures.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const lang = useLang();
  const [tourOpen, setTourOpen] = useState(false);
  const { collectionId } = useParams({ from: "/figures/collection/$collectionId" });
  const row = useMemo(() => findRowBySlug(collectionId), [collectionId]);
  const items = useMemo(() => (row ? resolveRow(row) : []), [row]);

  useEffect(() => {
    if (!row) return;
    saveJourneyPlace({
      section: "figures",
      label: { en: t(row.label, "en"), fr: t(row.label, "fr"), ar: t(row.label, "ar") },
      description: { en: t(row.tagline, "en"), fr: t(row.tagline, "fr"), ar: t(row.tagline, "ar") },
      href: `/figures/collection/${collectionId}`,
    });
  }, [row, collectionId]);

  /* Era + region context markers derived from the members. */
  const eraMarkers = useMemo(() => {
    const ids = new Set(items.map((f) => eraOfCategory(f.category)));
    return LEGEND_ERAS.filter((e) => ids.has(e.id));
  }, [items]);

  const regionMarkers = useMemo(() => {
    const seen = new Set<string>();
    const out: { id: string; name: LocalizedString }[] = [];
    for (const f of items) {
      const mapId = FIGURE_REGION_TO_MAP[f.region];
      const region = mapId ? mapRegions.find((r) => r.id === mapId) : undefined;
      if (region && !seen.has(region.id)) {
        seen.add(region.id);
        out.push({ id: region.id, name: region.name });
      }
    }
    return out;
  }, [items]);

  const deep = row ? rowDeep(row) : undefined;
  const related = useMemo(
    () => (row ? relatedRows(row, DISCOVERY_ROWS, 4) : []),
    [row],
  );
  const notable = useMemo(() => items.slice(0, 4), [items]);

  if (!row) {
    return <CollectionNotFound lang={lang} />;
  }



  const backLabel =
    lang === "fr" ? "Retour au Panthéon" : lang === "ar" ? "العودة إلى قاعة العظماء" : "Back to the Hall of Legends";
  const figureWord = lang === "fr" ? "figures" : lang === "ar" ? "شخصية" : "figures";
  const exhibitLabel =
    lang === "fr" ? "Salle d'exposition" : lang === "ar" ? "قاعة العرض" : "Exhibit room";
  const erasLabel = lang === "fr" ? "Ères" : lang === "ar" ? "الحقب" : "Eras";
  const regionsLabel = lang === "fr" ? "Régions" : lang === "ar" ? "المناطق" : "Regions";
  const tourLabel =
    lang === "fr" ? "Faire la visite guidée" : lang === "ar" ? "ابدأ الجولة المُرشدة" : "Walk the Hall of Legends";
  const overviewLabel = lang === "fr" ? "Aperçu de la salle" : lang === "ar" ? "نظرة على القاعة" : "Collection overview";
  const significanceLabel = lang === "fr" ? "Importance" : lang === "ar" ? "الأهمية" : "Collection significance";
  const notableLabel = lang === "fr" ? "Figures phares" : lang === "ar" ? "شخصيات بارزة" : "Notable figures";
  const continueLabel =
    lang === "fr" ? "Continuer la découverte" : lang === "ar" ? "تابع الاكتشاف" : "Continue discovering";
  const relatedLabel =
    lang === "fr" ? "Collections liées" : lang === "ar" ? "مجموعات ذات صلة" : "Related collections";
  const emptyTitle =
    lang === "fr" ? "Salle en préparation" : lang === "ar" ? "قاعة قيد الإعداد" : "This room is being prepared";
  const emptyBody =
    lang === "fr"
      ? "Les artefacts de cette salle ne sont pas encore exposés. Revenez bientôt ou explorez les autres collections du Panthéon."
      : lang === "ar"
        ? "لم تُعرض مقتنيات هذه القاعة بعد. عُد قريبًا أو استكشف بقية مجموعات القاعة."
        : "The artifacts for this room aren't on display yet. Check back soon, or explore the other collections in the hall.";

  return (
    <div className="min-h-dvh">
      <Header />

      <GuidedTour open={tourOpen} onClose={() => setTourOpen(false)} lang={lang} />


      {/* ===== Exhibit hero plaque ===== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] text-[16rem] sm:text-[22rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: row.accent }}
        >
          {row.emblem}
        </div>
        <div className="relative max-w-6xl mx-auto px-4 pt-6 pb-8 sm:pt-8 sm:pb-10">
          <Link
            to="/figures"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <span aria-hidden>←</span>
            {backLabel}
          </Link>

          <div className="mt-6 flex items-start gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <CollectionEmblem
                emblem={row.emblem}
                accent={row.accent}
                size={72}
                glow
                animate="reveal"
                label={t(row.label, lang)}
              />
              <span className="absolute -bottom-1.5 -end-1.5">
                <EraBadge kind={row.badge} size={30} label={t(row.label, lang)} />
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground">
                {exhibitLabel}
              </div>
              <h1
                className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(row.label, lang)}
              </h1>
              <p className="mt-3 max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed">
                {t(row.tagline, lang)}
              </p>
              <div className="mt-3 text-sm text-muted-foreground font-semibold">
                {items.length} {figureWord}
              </div>
              <button
                type="button"
                onClick={() => setTourOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-11"
                style={{
                  borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
                  background: "color-mix(in oklab, var(--brand-gold) 9%, var(--card))",
                  color: "var(--brand-gold-deep)",
                }}
              >
                <span aria-hidden>❖</span>
                {tourLabel}
              </button>
            </div>
          </div>


          {/* Context markers */}
          {(eraMarkers.length > 0 || regionMarkers.length > 0) && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {eraMarkers.length > 0 && (
                <MarkerGroup label={erasLabel}>
                  {eraMarkers.map((e) => (
                    <Marker key={e.id}>{t(e.label, lang)}</Marker>
                  ))}
                </MarkerGroup>
              )}
              {regionMarkers.length > 0 && (
                <MarkerGroup label={regionsLabel}>
                  {regionMarkers.map((r) => (
                    <Marker key={r.id}>{t(r.name, lang)}</Marker>
                  ))}
                </MarkerGroup>
              )}
            </div>
          )}
        </div>
        <span
          aria-hidden
          className="block h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--brand-gold) 50%, transparent), transparent)",
          }}
        />
      </section>

      {/* ===== Collection overview + significance ===== */}
      {(deep || notable.length > 0) && (
        <section className="max-w-6xl mx-auto px-4 pt-8 sm:pt-10">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px] items-start">
            <div className="space-y-5">
              {deep && (
                <div className="rounded-2xl border bg-card p-5 sm:p-6" style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" }}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">{overviewLabel}</div>
                  <p className="leading-relaxed text-foreground/90">{t(deep.intro, lang)}</p>
                </div>
              )}
              {deep && (
                <div
                  className="relative rounded-2xl border p-5 sm:p-6 overflow-hidden"
                  style={{
                    borderColor: "color-mix(in oklab, var(--brand-gold) 35%, var(--border))",
                    background: "linear-gradient(135deg, color-mix(in oklab, var(--brand-gold) 8%, var(--card)), var(--card))",
                  }}
                >
                  <div className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}>
                    {significanceLabel}
                  </div>
                  <p className="leading-relaxed text-foreground/90">{t(deep.significance, lang)}</p>
                </div>
              )}
            </div>

            {notable.length > 0 && (
              <aside className="rounded-2xl border bg-parchment-card p-5" style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" }}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-3">{notableLabel}</div>
                <ul className="space-y-2">
                  {notable.map((f) => (
                    <li key={f.id}>
                      <Link
                        to="/figures/$figureId"
                        params={{ figureId: f.id }}
                        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-muted/60 transition"
                      >
                        <span className="text-xl leading-none" aria-hidden>{f.emoji}</span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-sm truncate">{t(f.displayName, lang)}</span>
                          <span className="block text-[11px] text-muted-foreground truncate">{t(f.era, lang)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* ===== Figures grid ===== */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        {items.length === 0 ? (
          <MuseumEmptyState
            glyph={row.emblem}
            title={emptyTitle}
            body={emptyBody}
            action={
              <Link
                to="/figures"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-warm)" }}
              >
                <span aria-hidden>←</span>
                {backLabel}
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {items.map((f) => (
              <FigureExhibitCard key={f.id} figure={f} lang={lang} accent={row.accent} fluid />
            ))}
          </div>
        )}

        {/* ===== Related collections — continuous discovery ===== */}
        {related.length > 0 && (
          <section className="mt-14">
            <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground mb-1.5">
              {continueLabel}
            </div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {relatedLabel}
              </h2>
              <span aria-hidden className="flex-1 h-px" style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--brand-gold) 55%, transparent), transparent)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/figures/collection/$collectionId"
                  params={{ collectionId: slugOfRow(r) }}
                  className="group flex items-center gap-3.5 rounded-2xl border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40"
                  style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" }}
                >
                  <CollectionEmblem emblem={r.emblem} accent={r.accent} size={48} interactive />
                  <span className="min-w-0">
                    <span className="block font-bold leading-tight group-hover:text-primary transition-colors" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                      {t(r.label, lang)}
                    </span>
                    <span className="block text-xs text-muted-foreground truncate">{t(r.tagline, lang)}</span>
                  </span>
                  <span aria-hidden className="ms-auto text-muted-foreground group-hover:text-primary transition-colors">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/figures"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-warm)" }}
          >
            <span aria-hidden>←</span>
            {backLabel}
          </Link>
        </div>
      </main>
    </div>
  );

}

/* ---------------- Context markers ---------------- */

function MarkerGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border p-3.5"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
        background: "color-mix(in oklab, var(--accent) 6%, var(--card))",
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 35%, var(--border))",
        background: "var(--card)",
        color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--foreground))",
      }}
    >
      {children}
    </span>
  );
}

/* ---------------- Not found ---------------- */

function CollectionNotFound({ lang }: { lang: Lang }) {
  const title =
    lang === "fr" ? "Collection introuvable" : lang === "ar" ? "المجموعة غير موجودة" : "Collection not found";
  const body =
    lang === "fr"
      ? "Cette salle d'exposition n'existe pas. Revenez au Panthéon pour explorer les collections."
      : lang === "ar"
        ? "قاعة العرض هذه غير موجودة. عُد إلى قاعة العظماء لاستكشاف المجموعات."
        : "This exhibit room doesn't exist. Return to the Hall of Legends to explore the collections.";
  const backLabel =
    lang === "fr" ? "Retour au Panthéon" : lang === "ar" ? "العودة إلى قاعة العظماء" : "Back to the Hall of Legends";
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1
          className="text-3xl font-extrabold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{body}</p>
        <Link
          to="/figures"
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-warm)" }}
        >
          <span aria-hidden>←</span>
          {backLabel}
        </Link>
        <ContextRibbon connects={["figures", "eras", "regions", "culture", "atlas"]} lang={lang} className="px-0 pt-8" />
      </main>
    </div>
  );
}
