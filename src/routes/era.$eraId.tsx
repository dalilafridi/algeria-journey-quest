/**
 * Era detail page — an exhibition room explaining a historical period.
 *
 * Rebuilt on the shared MuseumCatalogPage template: a strong left story column
 * (date-range label, serif title, cinematic subtitle, era overview, curator
 * note, historical significance, major developments, key moments, cultural
 * memory, quiz CTA) and a right context sidebar (place in time, era at a
 * glance, notable figures, connected regions, related collections), closed by
 * a subtle bottom ribbon connecting figures, regions, culture, atlas, journeys.
 */

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getEraExtras } from "@/data/eraExtras";
import { mapRegions } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { collectionOf } from "@/lib/figureCollections";
import { getCurator } from "@/data/curatorContent";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { t, tu, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { AudioGuideButton } from "@/components/audio/AudioGuide";
import type { AudioGuide } from "@/lib/audioGuide";
import {
  MuseumCatalogPage,
  MuseumHero,
  MuseumLabel,
  MuseumBack,
  MuseumPill,
  MuseumCatalogCard,
  MuseumOverviewPanel,
  MuseumTimelinePanel,
  MuseumCuratorNote,
  MuseumRelatedContent,
  MuseumFactsList,
  MuseumCTASection,
  MuseumActionButton,
  MuseumContextRibbon,
  type TimelineStop,
  type RelatedItem,
} from "@/components/museum/MuseumCatalog";

const SERIF = "Georgia, 'Times New Roman', serif";

export const Route = createFileRoute("/era/$eraId")({
  loader: ({ params }) => {
    const era = eras.find((e) => e.id === params.eraId);
    if (!era) throw notFound();
    return { era };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const titleEn = t(loaderData.era.title, "en");
    const summaryEn = t(loaderData.era.summary, "en");
    return {
      meta: [
        { title: `${titleEn} — Algeria Through Time` },
        { name: "description", content: summaryEn },
        { property: "og:title", content: titleEn },
        { property: "og:description", content: summaryEn },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-dvh bg-parchment flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold">Era not found</p>
        <Link to="/timeline" className="text-primary underline">
          Back to timeline
        </Link>
      </div>
    </div>
  ),
  component: EraPage,
});

const tri = (lang: Lang, en: string, fr: string, ar: string) => (lang === "fr" ? fr : lang === "ar" ? ar : en);

function EraPage() {
  const { era } = Route.useLoaderData();
  const lang = useLang();
  const extras = getEraExtras(era.id);

  const relatedRegions = (extras?.relatedRegionIds ?? [])
    .map((rid) => mapRegions.find((r) => r.id === rid))
    .filter(Boolean) as typeof mapRegions;

  const keyFigureCards = (extras?.keyFigureIds ?? [])
    .map((fid) => getFigure(fid))
    .filter((f): f is NonNullable<ReturnType<typeof getFigure>> => Boolean(f));

  const curator = getCurator("era", era.id);

  useEffect(() => {
    /* keep scroll reset behaviour neutral */
  }, [era.id]);

  /* ---- Labels ---- */
  const overviewLabel = tri(lang, "Era overview", "Aperçu de l'époque", "نظرة على الحقبة");
  const significanceLabel = tri(lang, "Historical significance", "Importance historique", "الأهمية التاريخية");
  const developmentsLabel = tri(lang, "Major developments", "Évolutions majeures", "التطورات الكبرى");
  const keyEventsLabel = tri(lang, "Key moments", "Moments clés", "محطات بارزة");
  const keyPlacesLabel = tri(lang, "Key places", "Lieux clés", "أماكن مهمة");
  const culturalImpactLabel = tri(lang, "Cultural impact", "Empreinte culturelle", "الأثر الثقافي");
  const atAGlanceLabel = tri(lang, "Era at a glance", "L'époque en bref", "الحقبة باختصار");
  const placeInTimeLabel = tri(lang, "Place in time", "Repère chronologique", "الموقع الزمني");
  const notableFiguresLabel = tri(lang, "Notable figures", "Figures notables", "شخصيات بارزة");
  const connectedRegionsLabel = tri(lang, "Connected regions", "Régions reliées", "مناطق مرتبطة");
  const relatedCollectionsLabel = tri(lang, "Related collections", "Collections liées", "مجموعات مرتبطة");
  const dateRangeLabel = tri(lang, "Date range", "Période", "النطاق الزمني");
  const figuresStatLabel = tri(lang, "Figures", "Figures", "شخصيات");
  const placesStatLabel = tri(lang, "Places", "Lieux", "أماكن");
  const regionsStatLabel = tri(lang, "Regions", "Régions", "مناطق");

  /* ---- Sidebar: place in time timeline ---- */
  const timeline: TimelineStop[] = eras.map((e) => ({
    title: t(e.title, lang),
    note: e.dateRange,
    tag: e.id === era.id ? tri(lang, "Here", "Ici", "هنا") : undefined,
    to: "/era/$eraId",
    params: { eraId: e.id },
    active: e.id === era.id,
  }));

  /* ---- Sidebar: notable figures ---- */
  const figureItems: RelatedItem[] = keyFigureCards.slice(0, 6).map((f) => ({
    title: t(f.displayName, lang),
    note: t(f.era, lang),
    glyph: f.emoji,
    to: "/figures/$figureId",
    params: { figureId: f.id },
  }));

  /* ---- Sidebar: connected regions ---- */
  const regionItems: RelatedItem[] = relatedRegions.map((r) => ({
    title: t(r.name, lang),
    glyph: r.emoji ?? "◈",
    to: "/region/$regionId",
    params: { regionId: r.id },
  }));

  /* ---- Sidebar: related collections (derived from key figures) ---- */
  const collectionItems: RelatedItem[] = Array.from(
    new Map(
      keyFigureCards.map((f) => {
        const c = collectionOf(f.id);
        return [c.id, c] as const;
      }),
    ).values(),
  ).map((c) => ({
    title: t(c.label, lang),
    note: t(c.tagline, lang),
    glyph: c.emblem,
    to: "/figures",
    hash: `gallery-${c.id}`,
  }));

  /* =========================================================== MAIN === */
  const main = (
    <>
      <MuseumBack to="/timeline">{tu("backToTimeline", lang)}</MuseumBack>

      <MuseumHero
        label={<MuseumLabel>{era.dateRange}</MuseumLabel>}
        title={t(era.title, lang)}
        subtitle={extras?.cinematicLine ? `“${t(extras.cinematicLine, lang)}”` : undefined}
        intro={t(era.summary, lang)}
        medallion={
          <MedallionFrame size={152} tone="gold" glow animate="reveal" inset={0.2} label={t(era.title, lang)}>
            <span aria-hidden className="text-5xl sm:text-6xl">
              {era.emoji}
            </span>
          </MedallionFrame>
        }
      />

      {(() => {
        const segs: { id: string; text: string }[] = [
          { id: "intro", text: `${t(era.title, lang)}. ${era.dateRange}. ${t(era.summary, lang)}` },
        ];
        if (curator?.note) segs.push({ id: "curator", text: t(curator.note, lang) });
        if (extras?.whyItMatters) segs.push({ id: "why", text: t(extras.whyItMatters, lang) });
        (extras?.museumNotes ?? []).forEach((n, i) =>
          segs.push({ id: `note-${i}`, text: `${t(n.title, lang)}. ${t(n.body, lang)}` }),
        );
        (era.facts ?? []).slice(0, 4).forEach((f: LocalizedString, i: number) =>
          segs.push({ id: `fact-${i}`, text: t(f, lang) }),
        );
        const guide: AudioGuide = {
          id: `era:${era.id}`,
          title: t(era.title, lang),
          subtitle: era.dateRange,
          href: `/era/${era.id}` as unknown as AudioGuide["href"],
          segments: segs,
        };
        return (
          <div className="flex justify-start -mt-2 mb-2">
            <AudioGuideButton
              guide={guide}
              label={tri(lang, "Listen to this era", "Écouter cette époque", "استمع إلى هذه الحقبة")}
            />
          </div>
        );
      })()}


      {curator?.note && (
        <MuseumCuratorNote
          title={tri(lang, "Curator's note", "Note du conservateur", "ملاحظة القيّم")}
          attribution={tri(lang, "Museum curator", "Le conservateur", "أمين المتحف")}
          seal={<CollectionEmblem emblem={era.emoji} size={44} />}
        >
          <p>{t(curator.note, lang)}</p>
        </MuseumCuratorNote>
      )}

      {extras?.whyItMatters && (
        <MuseumCatalogCard accent="var(--primary)" eyebrow={significanceLabel} marker={<span aria-hidden>⭐</span>}>
          <p className="leading-relaxed text-foreground/90">{t(extras.whyItMatters, lang)}</p>
        </MuseumCatalogCard>
      )}

      {extras?.museumNotes && extras.museumNotes.length > 0 && (
        <section className="space-y-3">
          <MuseumLabel marker={<span aria-hidden>❦</span>}>{developmentsLabel}</MuseumLabel>
          <div className="grid sm:grid-cols-2 gap-3">
            {extras.museumNotes.map((n, i) => (
              <MuseumCatalogCard key={i} eyebrow={t(n.title, lang)}>
                <p className="text-sm text-foreground/80 leading-relaxed">{t(n.body, lang)}</p>
              </MuseumCatalogCard>
            ))}
          </div>
        </section>
      )}

      {era.places && era.places.length > 0 && (
        <MuseumCatalogCard eyebrow={keyPlacesLabel} marker={<span aria-hidden>📍</span>}>
          <ul className="grid sm:grid-cols-2 gap-3">
            {era.places.map((p: { name: LocalizedString; note: LocalizedString }, i: number) => (
              <li key={i} className="rounded-xl border border-border/60 bg-muted/40 px-3.5 py-3">
                <div className="font-semibold text-sm leading-tight">{t(p.name, lang)}</div>
                <div className="text-xs text-muted-foreground leading-snug mt-1">{t(p.note, lang)}</div>
              </li>
            ))}
          </ul>
        </MuseumCatalogCard>
      )}

      {era.facts && era.facts.length > 0 && (
        <MuseumCatalogCard accent="var(--accent)" eyebrow={keyEventsLabel} marker={<span aria-hidden>✨</span>}>
          <MuseumFactsList facts={era.facts.map((fct: LocalizedString) => t(fct, lang))} />
        </MuseumCatalogCard>
      )}

      {extras?.memoryCard && (
        <figure
          className="relative overflow-hidden rounded-2xl border p-6 sm:p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 14%, var(--card)), color-mix(in oklab, var(--accent) 12%, var(--card)))",
            borderColor: "color-mix(in oklab, var(--brand-gold) 35%, var(--border))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3"
            style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}
          >
            {culturalImpactLabel}
          </div>
          <blockquote className="text-xl sm:text-2xl leading-snug font-semibold italic text-foreground max-w-2xl mx-auto" style={{ fontFamily: SERIF }}>
            {t(extras.memoryCard.quote, lang)}
          </blockquote>
          {extras.memoryCard.attribution && (
            <figcaption className="mt-3 text-xs sm:text-sm text-muted-foreground">
              — {t(extras.memoryCard.attribution, lang)}
            </figcaption>
          )}
        </figure>
      )}

      <MuseumCTASection
        eyebrow={tri(lang, "Ready to test yourself?", "Prêt à tester ?", "جاهز للاختبار؟")}
        title={tu("takeQuiz", lang)}
        subtitle={tri(lang, "Put your knowledge of this era to the test.", "Mettez vos connaissances à l'épreuve.", "اختبر معلوماتك عن هذه الحقبة.")}
        seal={<CollectionEmblem emblem={era.emoji} size={56} glow tone="gold" />}
        action={
          <MuseumActionButton to="/quiz/$eraId" params={{ eraId: era.id }}>
            {tu("takeQuiz", lang)}
          </MuseumActionButton>
        }
      />
    </>
  );

  /* ======================================================== SIDEBAR === */
  const sidebar = (
    <>
      <MuseumOverviewPanel eyebrow={atAGlanceLabel} marker={<span aria-hidden>🏛️</span>}>
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <span aria-hidden>{era.emoji}</span>
          <span style={{ fontFamily: SERIF }}>{t(era.title, lang)}</span>
        </div>
        <dl className="space-y-3 text-sm">
          <GlanceRow label={dateRangeLabel} value={era.dateRange} />
          <GlanceRow label={overviewLabel} value={tri(lang, "Exhibition room", "Salle d'exposition", "قاعة عرض")} />
        </dl>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat value={keyFigureCards.length + (era.figures?.length ?? 0)} label={figuresStatLabel} />
          <Stat value={era.places?.length ?? 0} label={placesStatLabel} />
          <Stat value={relatedRegions.length} label={regionsStatLabel} />
        </div>
      </MuseumOverviewPanel>

      <MuseumTimelinePanel eyebrow={placeInTimeLabel} marker={<span aria-hidden>❧</span>} stops={timeline} />

      {figureItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={notableFiguresLabel}
          marker={<span aria-hidden>♟</span>}
          items={figureItems}
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

      {collectionItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedCollectionsLabel}
          marker={<span aria-hidden>◈</span>}
          items={collectionItems}
          columns={1}
        />
      )}
    </>
  );

  return (
    <>
      <Header />
      <MuseumCatalogPage
        main={main}
        sidebar={sidebar}
        ribbon={
          <MuseumContextRibbon
            connects={["figures", "regions", "culture", "atlas", "journeys"]}
            lang={lang}
          />
        }
      />
      <CuratorRecommendations kind="era" id={era.id} />
      <div className="h-16" />
    </>
  );
}

/* ---------------- Helpers ---------------- */

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold pt-0.5 shrink-0">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-foreground text-end">{value}</dd>
    </div>
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
