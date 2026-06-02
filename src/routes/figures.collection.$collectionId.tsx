/**
 * Collection detail page — a museum gallery dedicated to a theme.
 *
 * Rebuilt on the shared MuseumCatalogPage template so a collection reads like
 * walking into an exhibition room rather than scrolling a filtered list. The
 * left story column carries the gallery's emblem, exhibition introduction, why
 * it matters, featured stories, the full figure gallery and a curator note; the
 * right context sidebar gathers the gallery overview, connected eras and
 * regions, related collections and quick navigation; a bottom ribbon connects
 * the rest of the museum.
 */

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
import { LEGEND_ERAS, eraOfCategory, type LegendEra } from "@/lib/figureEras";
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
import {
  MuseumCatalogPage,
  MuseumHero,
  MuseumLabel,
  MuseumBack,
  MuseumChip,
  MuseumPill,
  MuseumCatalogCard,
  MuseumOverviewPanel,
  MuseumCuratorNote,
  MuseumRelatedContent,
  MuseumCTASection,
  MuseumActionButton,
  MuseumContextRibbon,
  type RelatedItem,
} from "@/components/museum/MuseumCatalog";

const SERIF = "Georgia, 'Times New Roman', serif";

/** Map a legend era to its era detail route id. */
const LEGEND_ERA_TO_ROUTE: Record<LegendEra, string> = {
  numidian: "numidia",
  roman: "roman",
  islamic: "islamic",
  ottoman: "ottoman",
  colonial: "french",
  independence: "independence",
};

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

const tri = (lang: Lang, en: string, fr: string, ar: string) =>
  lang === "fr" ? fr : lang === "ar" ? ar : en;

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
    const out: { id: string; name: LocalizedString; emoji?: string }[] = [];
    for (const f of items) {
      const mapId = FIGURE_REGION_TO_MAP[f.region];
      const region = mapId ? mapRegions.find((r) => r.id === mapId) : undefined;
      if (region && !seen.has(region.id)) {
        seen.add(region.id);
        out.push({ id: region.id, name: region.name, emoji: region.emoji });
      }
    }
    return out;
  }, [items]);

  const deep = row ? rowDeep(row) : undefined;
  const related = useMemo(
    () => (row ? relatedRows(row, DISCOVERY_ROWS, 4) : []),
    [row],
  );
  const featured = useMemo(() => items.slice(0, 4), [items]);

  if (!row) {
    return <CollectionNotFound lang={lang} />;
  }

  /* ---- Labels ---- */
  const exhibitLabel = tri(lang, "Exhibit room", "Salle d'exposition", "قاعة العرض");
  const figureWord = tri(lang, "figures", "figures", "شخصية");
  const erasWord = tri(lang, "eras", "époques", "عصور");
  const regionsWord = tri(lang, "regions", "régions", "مناطق");
  const introLabel = tri(lang, "Exhibition introduction", "Introduction de l'exposition", "مقدمة المعرض");
  const mattersLabel = tri(lang, "Why this collection matters", "Pourquoi cette collection compte", "لماذا تهمّ هذه المجموعة");
  const significanceLabel = tri(lang, "Collection significance", "Importance de la collection", "أهمية المجموعة");
  const featuredLabel = tri(lang, "Featured stories", "Récits en vedette", "قصص مختارة");
  const galleryLabel = tri(lang, "In this gallery", "Dans cette salle", "في هذه القاعة");
  const overviewLabel = tri(lang, "Collection overview", "Aperçu de la collection", "نظرة على المجموعة");
  const connectedErasLabel = tri(lang, "Connected eras", "Époques reliées", "عصور مرتبطة");
  const connectedRegionsLabel = tri(lang, "Connected regions", "Régions reliées", "مناطق مرتبطة");
  const relatedLabel = tri(lang, "Related collections", "Collections liées", "مجموعات ذات صلة");
  const quickNavLabel = tri(lang, "Quick navigation", "Navigation rapide", "تنقّل سريع");
  const erasStatLabel = tri(lang, "Eras", "Époques", "عصور");
  const figuresStatLabel = tri(lang, "Figures", "Figures", "شخصيات");
  const regionsStatLabel = tri(lang, "Regions", "Régions", "مناطق");
  const tourLabel = tri(lang, "Walk the Hall of Legends", "Faire la visite guidée", "ابدأ الجولة المُرشدة");
  const backLabel = tri(lang, "Back to the Hall of Legends", "Retour au Panthéon", "العودة إلى قاعة العظماء");
  const emptyTitle = tri(lang, "This room is being prepared", "Salle en préparation", "قاعة قيد الإعداد");
  const emptyBody = tri(
    lang,
    "The artifacts for this room aren't on display yet. Check back soon, or explore the other collections in the hall.",
    "Les artefacts de cette salle ne sont pas encore exposés. Revenez bientôt ou explorez les autres collections du Panthéon.",
    "لم تُعرض مقتنيات هذه القاعة بعد. عُد قريبًا أو استكشف بقية مجموعات القاعة.",
  );

  /* ---- Sidebar items ---- */
  const eraItems: RelatedItem[] = eraMarkers.map((e) => ({
    title: t(e.label, lang),
    note: t(e.tagline, lang),
    glyph: e.badge === "numidia" ? "ⵣ" : "♜",
    to: "/era/$eraId",
    params: { eraId: LEGEND_ERA_TO_ROUTE[e.id] },
  }));

  const regionItems: RelatedItem[] = regionMarkers.map((r) => ({
    title: t(r.name, lang),
    glyph: r.emoji ?? "❖",
    to: "/region/$regionId",
    params: { regionId: r.id },
  }));

  const relatedItems: RelatedItem[] = related.map((r) => ({
    title: t(r.label, lang),
    note: t(r.tagline, lang),
    glyph: r.emblem,
    to: "/figures/collection/$collectionId",
    params: { collectionId: slugOfRow(r) },
  }));

  const featuredItems: RelatedItem[] = featured.map((f) => ({
    title: t(f.displayName, lang),
    note: t(f.era, lang),
    glyph: f.emoji,
    to: "/figures/$figureId",
    params: { figureId: f.id },
  }));

  const quickNavItems: RelatedItem[] = [
    {
      title: tri(lang, "All collections", "Toutes les collections", "كل المجموعات"),
      glyph: "◈",
      to: "/figures",
    },
    {
      title: tri(lang, "Timeline of eras", "Chronologie des époques", "الخط الزمني"),
      glyph: "❧",
      to: "/timeline",
    },
    {
      title: tri(lang, "Atlas of regions", "Atlas des régions", "أطلس المناطق"),
      glyph: "❂",
      to: "/atlas",
    },
    {
      title: tri(lang, "Culture & heritage", "Culture et patrimoine", "الثقافة والتراث"),
      glyph: "✦",
      to: "/culture",
    },
  ];

  /* =========================================================== MAIN === */
  const main = (
    <>
      <MuseumBack to="/figures">{backLabel}</MuseumBack>

      <MuseumHero
        label={<MuseumChip>{exhibitLabel}</MuseumChip>}
        title={t(row.label, lang)}
        subtitle={`“${t(row.tagline, lang)}”`}
        pills={
          <>
            <MuseumPill icon="♟">
              {items.length} {figureWord}
            </MuseumPill>
            {eraMarkers.length > 0 && (
              <MuseumPill icon="♜">
                {eraMarkers.length} {erasWord}
              </MuseumPill>
            )}
            {regionMarkers.length > 0 && (
              <MuseumPill icon="❖">
                {regionMarkers.length} {regionsWord}
              </MuseumPill>
            )}
          </>
        }
        intro={deep ? t(deep.intro, lang) : t(row.tagline, lang)}
        medallion={
          <span className="relative inline-block">
            <CollectionEmblem
              emblem={row.emblem}
              accent={row.accent}
              size={120}
              glow
              animate="reveal"
              label={t(row.label, lang)}
            />
            <span className="absolute -bottom-1.5 -end-1.5">
              <EraBadge kind={row.badge} size={40} label={t(row.label, lang)} />
            </span>
          </span>
        }
      />

      {deep && (
        <MuseumCatalogCard
          accent="var(--brand-gold-deep)"
          eyebrow={mattersLabel}
          marker={<span aria-hidden>❦</span>}
        >
          <p className="leading-relaxed text-foreground/90">{t(deep.significance, lang)}</p>
        </MuseumCatalogCard>
      )}

      {featuredItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={featuredLabel}
          marker={<span aria-hidden>✦</span>}
          items={featuredItems}
          columns={2}
        />
      )}

      <section className="space-y-3">
        <MuseumLabel marker={<span aria-hidden>♟</span>}>{galleryLabel}</MuseumLabel>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {items.map((f) => (
              <FigureExhibitCard key={f.id} figure={f} lang={lang} accent={row.accent} fluid />
            ))}
          </div>
        )}
      </section>

      {deep && (
        <MuseumCuratorNote
          title={tri(lang, "Curator's note", "Note du conservateur", "ملاحظة القيّم")}
          attribution={tri(lang, "Museum curator", "Le conservateur", "أمين المتحف")}
          seal={<CollectionEmblem emblem={row.emblem} accent={row.accent} size={44} />}
        >
          <p className="italic" style={{ fontFamily: SERIF }}>
            “{t(deep.intro, lang)}”
          </p>
        </MuseumCuratorNote>
      )}

      <MuseumCTASection
        eyebrow={tri(lang, "Guided walk", "Visite guidée", "جولة مُرشدة")}
        title={tri(lang, "Walk this gallery with the curator", "Parcourez cette salle avec le conservateur", "تجوّل في هذه القاعة مع القيّم")}
        subtitle={tri(
          lang,
          "A guided tour through the Hall of Legends, room by room.",
          "Une visite guidée du Panthéon, salle après salle.",
          "جولة مُرشدة في قاعة العظماء، قاعةً تلو الأخرى.",
        )}
        seal={<CollectionEmblem emblem="❖" size={56} glow tone="gold" />}
        action={
          <MuseumActionButton onClick={() => setTourOpen(true)}>{tourLabel}</MuseumActionButton>
        }
      />
    </>
  );

  /* ======================================================== SIDEBAR === */
  const sidebar = (
    <>
      <MuseumOverviewPanel eyebrow={overviewLabel} marker={<span aria-hidden>❖</span>}>
        <div className="flex items-center gap-3 mb-3">
          <CollectionEmblem emblem={row.emblem} accent={row.accent} size={40} />
          <div className="min-w-0">
            <div className="font-bold text-sm leading-snug" style={{ fontFamily: SERIF }}>
              {t(row.label, lang)}
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed mb-4">{t(row.tagline, lang)}</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat value={items.length} label={figuresStatLabel} />
          <Stat value={eraMarkers.length} label={erasStatLabel} />
          <Stat value={regionMarkers.length} label={regionsStatLabel} />
        </div>
      </MuseumOverviewPanel>

      {eraItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={connectedErasLabel}
          marker={<span aria-hidden>♜</span>}
          items={eraItems}
          columns={1}
        />
      )}

      {regionItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={connectedRegionsLabel}
          marker={<span aria-hidden>❖</span>}
          items={regionItems}
          columns={1}
        />
      )}

      {relatedItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedLabel}
          marker={<span aria-hidden>◈</span>}
          items={relatedItems}
          columns={1}
        />
      )}

      <MuseumRelatedContent
        eyebrow={quickNavLabel}
        marker={<span aria-hidden>✧</span>}
        items={quickNavItems}
        columns={1}
      />
    </>
  );

  return (
    <>
      <Header />
      <GuidedTour open={tourOpen} onClose={() => setTourOpen(false)} lang={lang} />
      <MuseumCatalogPage
        main={main}
        sidebar={sidebar}
        ribbon={
          <MuseumContextRibbon
            connects={["figures", "regions", "eras", "culture", "journeys"]}
            lang={lang}
          />
        }
      />
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="rounded-xl border bg-card/80 px-2 py-2.5"
      style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))" }}
    >
      <div className="text-base font-extrabold leading-none" style={{ fontFamily: SERIF }}>
        {value}
      </div>
      <div className="text-[10px] text-muted-foreground leading-tight mt-1">{label}</div>
    </div>
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
    <div className="min-h-dvh bg-parchment">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold" style={{ fontFamily: SERIF }}>
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
      </main>
    </div>
  );
}

export default CollectionPage;
