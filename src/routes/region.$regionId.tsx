/**
 * Region detail page — a museum exhibit about a place.
 *
 * Rebuilt on the shared MuseumCatalogPage template: a strong left story column
 * (focus label, serif title, cinematic line, region identity overview,
 * geography & cultural meaning, historical significance, connected stories,
 * curator note, reflection, explore-the-atlas CTA) and a right context sidebar
 * (key facts, connected eras, notable figures, cultural themes, related
 * regions, atlas link), closed by a subtle bottom ribbon connecting figures,
 * eras, culture, atlas and signature journeys.
 */

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { RegionIcon } from "@/components/RegionIcon";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getRegionExtras } from "@/data/regionExtras";
import { regionIntros } from "@/data/cinematic";
import { eras } from "@/data/eras";
import { getFigure } from "@/data/figures";
import { saveJourneyPlace } from "@/lib/continuity";
import { t, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { AudioGuideButton } from "@/components/audio/AudioGuide";
import type { AudioGuide } from "@/lib/audioGuide";
import {
  MuseumCatalogPage,
  MuseumHero,
  MuseumLabel,
  MuseumBack,
  MuseumChip,
  MuseumPill,
  MuseumCatalogCard,
  MuseumOverviewPanel,
  MuseumFactsList,
  MuseumCuratorNote,
  MuseumRelatedContent,
  MuseumCTASection,
  MuseumActionButton,
  MuseumContextRibbon,
  type RelatedItem,
} from "@/components/museum/MuseumCatalog";
import { CuratorRecommendations } from "@/components/CuratorRecommendations";
import { ContinueExploring } from "@/components/curator/ContinueExploring";
import { getRegionExploreGroups } from "@/lib/exploreGroups";

const SERIF = "Georgia, 'Times New Roman', serif";

export const Route = createFileRoute("/region/$regionId")({
  loader: ({ params }) => {
    const region = mapRegions.find((r) => r.id === params.regionId);
    if (!region) throw notFound();
    return { region };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const titleEn = t(loaderData.region.name, "en");
    const summaryEn = t(loaderData.region.summary, "en");
    return {
      meta: [
        { title: `${titleEn} — Region | Algeria Through Time` },
        { name: "description", content: summaryEn },
        { property: "og:title", content: titleEn },
        { property: "og:description", content: summaryEn },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-dvh bg-parchment flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold">Region not found</p>
        <Link to="/map" className="text-primary underline">
          Back to Regions
        </Link>
      </div>
    </div>
  ),
  component: RegionPage,
});

const tri = (lang: Lang, en: string, fr: string, ar: string) =>
  lang === "fr" ? fr : lang === "ar" ? ar : en;

function RegionPage() {
  const { region } = Route.useLoaderData() as { region: MapRegion };
  const lang = useLang();
  const extras = getRegionExtras(region.id);
  const intro = regionIntros[region.id];

  const figureCards = region.figureIds
    .map((fid) => getFigure(fid))
    .filter((f): f is NonNullable<ReturnType<typeof getFigure>> => Boolean(f));

  const connectedEras = (extras?.eraIds ?? [])
    .map((eid) => eras.find((e) => e.id === eid))
    .filter((e): e is (typeof eras)[number] => Boolean(e));

  const nearbyRegions = (extras?.nearbyRegionIds ?? [])
    .map((rid) => mapRegions.find((r) => r.id === rid))
    .filter((r): r is (typeof mapRegions)[number] => Boolean(r));

  useEffect(() => {
    saveJourneyPlace({
      section: "regions",
      label: {
        en: `Regions · ${t(region.name, "en")}`,
        fr: `Régions · ${t(region.name, "fr")}`,
        ar: `المناطق · ${t(region.name, "ar")}`,
      },
      description:
        typeof region.focus === "string"
          ? { en: region.focus, fr: region.focus, ar: region.focus }
          : region.focus,
      href: `/region/${region.id}`,
    });
  }, [region]);

  /* ---- Labels ---- */
  const identityLabel = tri(lang, "Region identity", "Identité de la région", "هويّة المنطقة");
  const geographyLabel = tri(lang, "Geography & meaning", "Géographie et sens", "الجغرافيا والمعنى");
  const culturalLabel = tri(lang, "Cultural meaning", "Sens culturel", "المعنى الثقافي");
  const significanceLabel = tri(lang, "Historical significance", "Importance historique", "الأهمية التاريخية");
  const connectedStoriesLabel = tri(lang, "Connected stories", "Récits liés", "قصص مرتبطة");
  const keyFactsLabel = tri(lang, "Key facts", "Faits clés", "حقائق أساسية");
  const connectedErasLabel = tri(lang, "Connected eras", "Époques reliées", "عصور مرتبطة");
  const notableFiguresLabel = tri(lang, "Notable figures", "Figures notables", "شخصيات بارزة");
  const culturalThemesLabel = tri(lang, "Cultural themes", "Thèmes culturels", "محاور ثقافية");
  const relatedRegionsLabel = tri(lang, "Related regions", "Régions liées", "مناطق مرتبطة");
  const atlasLabel = tri(lang, "On the map", "Sur la carte", "على الخريطة");
  const focusLabel = tri(lang, "Focus", "Thème", "المحور");
  const erasStatLabel = tri(lang, "Eras", "Époques", "عصور");
  const figuresStatLabel = tri(lang, "Figures", "Figures", "شخصيات");
  const themesStatLabel = tri(lang, "Themes", "Thèmes", "محاور");

  /* ---- Sidebar items ---- */
  const eraItems: RelatedItem[] = connectedEras.map((e) => ({
    title: t(e.title, lang),
    note: e.dateRange,
    glyph: e.emoji ?? "♜",
    to: "/era/$eraId",
    params: { eraId: e.id },
  }));

  const figureItems: RelatedItem[] = figureCards.slice(0, 6).map((f) => ({
    title: t(f.displayName, lang),
    note: t(f.era, lang),
    glyph: f.emoji,
    to: "/figures/$figureId",
    params: { figureId: f.id },
  }));

  const themeItems: RelatedItem[] = (extras?.culturePillars ?? []).map((p) => ({
    title: t(p.label, lang),
    note: t(p.body, lang),
    glyph: p.emoji,
  }));

  const regionItems: RelatedItem[] = nearbyRegions.map((r) => ({
    title: t(r.name, lang),
    note: t(r.focus, lang),
    glyph: r.emoji ?? "❖",
    to: "/region/$regionId",
    params: { regionId: r.id },
  }));

  const atlasItems: RelatedItem[] = [
    {
      title: tri(lang, "Open the Atlas", "Ouvrir l'Atlas", "افتح الأطلس"),
      note: tri(lang, "See this region on the wall map", "Voir cette région sur la carte murale", "شاهد هذه المنطقة على الخريطة"),
      glyph: "❂",
      to: "/atlas",
    },
  ];

  /* =========================================================== MAIN === */
  const main = (
    <>
      <MuseumBack to="/map">{tri(lang, "Back to Regions", "Retour aux régions", "العودة إلى المناطق")}</MuseumBack>

      <MuseumHero
        label={
          <MuseumChip>
            {focusLabel} · {t(region.focus, lang)}
          </MuseumChip>
        }
        title={t(region.name, lang)}
        subtitle={intro ? `“${t(intro, lang)}”` : undefined}
        intro={t(region.summary, lang)}
        medallion={
          <RegionIcon regionId={region.id} className="h-36 w-36 sm:h-40 sm:w-40 icon-glow animate-cinematic-in" />
        }
      />

      {(() => {
        const segs: { id: string; text: string }[] = [
          {
            id: "intro",
            text: `${t(region.name, lang)}. ${t(region.focus, lang)}. ${t(region.summary, lang)}`,
          },
        ];
        if (extras?.geography) segs.push({ id: "geo", text: t(extras.geography, lang) });
        if (extras?.culturalImportance)
          segs.push({ id: "culture", text: t(extras.culturalImportance, lang) });
        if (extras?.historicalSignificance)
          segs.push({ id: "history", text: t(extras.historicalSignificance, lang) });
        (extras?.museumNotes ?? []).forEach((n, i) =>
          segs.push({ id: `note-${i}`, text: `${t(n.title, lang)}. ${t(n.body, lang)}` }),
        );
        if (extras?.reflection?.quote)
          segs.push({ id: "reflection", text: t(extras.reflection.quote, lang) });
        const guide: AudioGuide = {
          id: `region:${region.id}`,
          title: t(region.name, lang),
          subtitle: t(region.focus, lang),
          segments: segs,
        };
        return (
          <div className="flex justify-start -mt-2 mb-2">
            <AudioGuideButton
              guide={guide}
              label={
                lang === "fr"
                  ? "Écouter cette région"
                  : lang === "ar"
                    ? "استمع إلى هذه المنطقة"
                    : "Listen to this region"
              }
            />
          </div>
        );
      })()}


      {extras && (
        <div className="grid sm:grid-cols-2 gap-4">
          <MuseumCatalogCard accent="var(--brand-gold-deep)" eyebrow={geographyLabel} marker={<span aria-hidden>⛰️</span>}>
            <p className="text-sm text-foreground/80 leading-relaxed">{t(extras.geography, lang)}</p>
          </MuseumCatalogCard>
          <MuseumCatalogCard accent="var(--brand-gold-deep)" eyebrow={culturalLabel} marker={<span aria-hidden>🎶</span>}>
            <p className="text-sm text-foreground/80 leading-relaxed">{t(extras.culturalImportance, lang)}</p>
          </MuseumCatalogCard>
        </div>
      )}



      {extras?.historicalSignificance && (
        <MuseumCatalogCard accent="var(--primary)" eyebrow={significanceLabel} marker={<span aria-hidden>🏛️</span>}>
          <p className="leading-relaxed text-foreground/90">{t(extras.historicalSignificance, lang)}</p>
        </MuseumCatalogCard>
      )}

      {extras?.museumNotes && extras.museumNotes.length > 0 && (
        <section className="space-y-3">
          <MuseumLabel marker={<span aria-hidden>❦</span>}>{connectedStoriesLabel}</MuseumLabel>
          <div className="grid sm:grid-cols-2 gap-3">
            {extras.museumNotes.map((n, i) => (
              <MuseumCatalogCard key={i} eyebrow={t(n.title, lang)}>
                <p className="text-sm text-foreground/80 leading-relaxed">{t(n.body, lang)}</p>
              </MuseumCatalogCard>
            ))}
          </div>
        </section>
      )}

      {extras?.reflection && (
        <MuseumCuratorNote
          title={tri(lang, "Curator's note", "Note du conservateur", "ملاحظة القيّم")}
          attribution={
            extras.reflection.attribution
              ? t(extras.reflection.attribution, lang)
              : tri(lang, "Museum curator", "Le conservateur", "أمين المتحف")
          }
          seal={<CollectionEmblem emblem={region.emoji} size={44} />}
        >
          <p className="italic" style={{ fontFamily: SERIF }}>
            “{t(extras.reflection.quote, lang)}”
          </p>
        </MuseumCuratorNote>
      )}

      <MuseumCTASection
        eyebrow={tri(lang, "Keep exploring", "Continuez l'exploration", "واصل الاستكشاف")}
        title={tri(lang, "See this region on the Atlas", "Voir cette région sur l'Atlas", "شاهد هذه المنطقة على الأطلس")}
        subtitle={tri(
          lang,
          "Place this story on the wall map of Algeria.",
          "Situez cette histoire sur la carte murale de l'Algérie.",
          "ضع هذه القصة على خريطة الجزائر.",
        )}
        seal={<CollectionEmblem emblem="❂" size={56} glow tone="gold" />}
        action={<MuseumActionButton to="/atlas">{tri(lang, "Open Atlas", "Ouvrir l'Atlas", "افتح الأطلس")}</MuseumActionButton>}
      />
    </>
  );

  /* ======================================================== SIDEBAR === */
  const sidebar = (
    <>
      <MuseumOverviewPanel eyebrow={identityLabel} marker={<span aria-hidden>❖</span>}>
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <span aria-hidden>{region.emoji}</span>
          <span style={{ fontFamily: SERIF }}>{t(region.name, lang)}</span>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed mb-4">{t(region.focus, lang)}</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat value={connectedEras.length} label={erasStatLabel} />
          <Stat value={figureCards.length} label={figuresStatLabel} />
          <Stat value={extras?.culturePillars.length ?? 0} label={themesStatLabel} />
        </div>
      </MuseumOverviewPanel>

      <MuseumOverviewPanel eyebrow={keyFactsLabel} marker={<span aria-hidden>✨</span>}>
        <MuseumFactsList facts={region.facts.map((f) => t(f, lang))} />
      </MuseumOverviewPanel>

      {eraItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={connectedErasLabel}
          marker={<span aria-hidden>♜</span>}
          items={eraItems}
          columns={1}
        />
      )}

      {figureItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={notableFiguresLabel}
          marker={<span aria-hidden>♟</span>}
          items={figureItems}
          columns={1}
        />
      )}

      {themeItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={culturalThemesLabel}
          marker={<span aria-hidden>✦</span>}
          items={themeItems}
          columns={1}
        />
      )}

      {regionItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedRegionsLabel}
          marker={<span aria-hidden>❖</span>}
          items={regionItems}
          columns={1}
        />
      )}

      <MuseumRelatedContent
        eyebrow={atlasLabel}
        marker={<span aria-hidden>❂</span>}
        items={atlasItems}
        columns={1}
      />
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
            connects={["figures", "eras", "culture", "atlas", "journeys"]}
            lang={lang}
          />
        }
      />
      <CuratorRecommendations kind="region" id={region.id} />
      <div className="h-16" />
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

export default RegionPage;
