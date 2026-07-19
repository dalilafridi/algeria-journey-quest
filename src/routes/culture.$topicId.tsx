/**
 * Culture topic detail page — a cultural exhibit within the museum.
 *
 * Built on the shared MuseumCatalogPage template: a storytelling-first left
 * column (topic title, cultural significance, historical context, living
 * traditions, influence on Algerian identity, curator note, related stories)
 * and a right context sidebar (connected regions, eras, related figures,
 * cultural themes, atlas connections), closed by a bottom ribbon connecting
 * figures, regions, eras, journeys and collections.
 */

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { getCultureTopic, type CultureTopic, type CultureStory } from "@/data/cultureTopics";
import { mapRegions } from "@/data/mapRegions";
import { eras } from "@/data/eras";
import { getFigure } from "@/data/figures";
import { saveJourneyPlace } from "@/lib/continuity";
import { t, useLang, type Lang } from "@/lib/i18n";
import {
  MuseumCatalogPage,
  MuseumHero,
  MuseumLabel,
  MuseumBack,
  MuseumChip,
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
import { getCultureExploreGroups } from "@/lib/exploreGroups";

const SERIF = "Georgia, 'Times New Roman', serif";

export const Route = createFileRoute("/culture/$topicId")({
  loader: ({ params }) => {
    const topic = getCultureTopic(params.topicId);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const titleEn = t(loaderData.topic.title, "en");
    const descEn = t(loaderData.topic.intro, "en");
    return {
      meta: [
        { title: `${titleEn} — Culture | Algeria Through Time` },
        { name: "description", content: descEn },
        { property: "og:title", content: titleEn },
        { property: "og:description", content: descEn },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-dvh bg-parchment flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold">Culture topic not found</p>
        <Link to="/culture" className="text-primary underline">
          Back to Culture
        </Link>
      </div>
    </div>
  ),
  component: CultureTopicPage,
});

const tri = (lang: Lang, en: string, fr: string, ar: string) =>
  lang === "fr" ? fr : lang === "ar" ? ar : en;

function CultureTopicPage() {
  const { topic } = Route.useLoaderData() as { topic: CultureTopic };
  const lang = useLang();

  useEffect(() => {
    saveJourneyPlace({
      section: "regions",
      label: {
        en: `Culture · ${t(topic.title, "en")}`,
        fr: `Culture · ${t(topic.title, "fr")}`,
        ar: `الثقافة · ${t(topic.title, "ar")}`,
      },
      description: {
        en: t(topic.tagline, "en"),
        fr: t(topic.tagline, "fr"),
        ar: t(topic.tagline, "ar"),
      },
      href: `/culture/${topic.id}`,
    });
  }, [topic]);

  /* ---- Labels ---- */
  const themeLabel = tri(lang, "Cultural exhibit", "Exposition culturelle", "معرض ثقافي");
  const significanceLabel = tri(lang, "Cultural significance", "Importance culturelle", "الأهمية الثقافية");
  const contextLabel = tri(lang, "Historical context", "Contexte historique", "السياق التاريخي");
  const traditionsLabel = tri(lang, "Living traditions", "Traditions vivantes", "تقاليد حيّة");
  const influenceLabel = tri(lang, "Influence on identity", "Influence sur l'identité", "الأثر في الهوية");
  const relatedLabel = tri(lang, "Related stories", "Récits liés", "قصص مرتبطة");
  const regionsLabel = tri(lang, "Connected regions", "Régions reliées", "مناطق مرتبطة");
  const erasLabel = tri(lang, "Connected eras", "Époques reliées", "عصور مرتبطة");
  const figuresLabel = tri(lang, "Related figures", "Figures liées", "شخصيات مرتبطة");
  const themesLabel = tri(lang, "Cultural themes", "Thèmes culturels", "محاور ثقافية");
  const atlasLabel = tri(lang, "Atlas connections", "Connexions Atlas", "روابط الأطلس");
  const factsLabel = tri(lang, "Did you know", "Le saviez-vous", "هل تعلم");

  /* ---- Resolve connections ---- */
  const regionData = topic.regionIds
    .map((id) => mapRegions.find((r) => r.id === id))
    .filter((r): r is (typeof mapRegions)[number] => Boolean(r));

  const eraData = topic.eraIds
    .map((id) => eras.find((e) => e.id === id))
    .filter((e): e is (typeof eras)[number] => Boolean(e));

  const figureData = topic.figureIds
    .map((id) => getFigure(id))
    .filter((f): f is NonNullable<ReturnType<typeof getFigure>> => Boolean(f));

  const regionItems: RelatedItem[] = regionData.map((r) => ({
    title: t(r.name, lang),
    note: t(r.focus, lang),
    glyph: r.emoji ?? "❖",
    to: "/region/$regionId",
    params: { regionId: r.id },
  }));

  const eraItems: RelatedItem[] = eraData.map((e) => ({
    title: t(e.title, lang),
    note: e.dateRange,
    glyph: e.emoji ?? "♜",
    to: "/era/$eraId",
    params: { eraId: e.id },
  }));

  const figureItems: RelatedItem[] = figureData.slice(0, 6).map((f) => ({
    title: t(f.displayName, lang),
    note: t(f.era, lang),
    glyph: f.emoji,
    to: "/figures/$figureId",
    params: { figureId: f.id },
  }));

  const themeItems: RelatedItem[] = topic.themes.map((th) => ({
    title: t(th.label, lang),
    glyph: th.emoji,
  }));

  const atlasItems: RelatedItem[] = [
    {
      title: tri(lang, "Open the Atlas", "Ouvrir l'Atlas", "افتح الأطلس"),
      note: tri(lang, "See this culture on the map", "Voir cette culture sur la carte", "شاهد هذه الثقافة على الخريطة"),
      glyph: "❂",
      to: "/atlas",
    },
  ];

  const storyItem = (s: CultureStory): RelatedItem => ({
    title: t(s.title, lang),
    note: t(s.note, lang),
    glyph: s.glyph ?? "◈",
    to: s.to,
    params: s.params,
  });

  /* =========================================================== MAIN === */
  const main = (
    <>
      <MuseumBack to="/culture">
        {tri(lang, "Back to Culture", "Retour à la Culture", "العودة إلى الثقافة")}
      </MuseumBack>

      <MuseumHero
        label={<MuseumChip>{themeLabel}</MuseumChip>}
        title={t(topic.title, lang)}
        subtitle={`“${t(topic.tagline, lang)}”`}
        intro={t(topic.intro, lang)}
        medallion={
          <CollectionEmblem emblem={topic.emblem} size={140} glow tone="gold" animate="reveal" />
        }
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <MuseumCatalogCard
          accent="var(--brand-gold-deep)"
          eyebrow={significanceLabel}
          marker={<span aria-hidden>✦</span>}
        >
          <p className="text-sm text-foreground/85 leading-relaxed">{t(topic.significance, lang)}</p>
        </MuseumCatalogCard>
        <MuseumCatalogCard
          accent="var(--brand-gold-deep)"
          eyebrow={contextLabel}
          marker={<span aria-hidden>🏛️</span>}
        >
          <p className="text-sm text-foreground/85 leading-relaxed">{t(topic.historicalContext, lang)}</p>
        </MuseumCatalogCard>
      </div>

      <section className="space-y-3">
        <MuseumLabel marker={<span aria-hidden>❦</span>}>{traditionsLabel}</MuseumLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {topic.traditions.map((trad, i) => (
            <MuseumCatalogCard
              key={i}
              eyebrow={t(trad.title, lang)}
              marker={<span aria-hidden>{trad.emoji}</span>}
            >
              <p className="text-sm text-foreground/80 leading-relaxed">{t(trad.body, lang)}</p>
            </MuseumCatalogCard>
          ))}
        </div>
      </section>

      <MuseumCatalogCard accent="var(--primary)" eyebrow={influenceLabel} marker={<span aria-hidden>🇩🇿</span>}>
        <p className="leading-relaxed text-foreground/90">{t(topic.influence, lang)}</p>
      </MuseumCatalogCard>

      <MuseumCuratorNote
        title={tri(lang, "Curator's note", "Note du conservateur", "ملاحظة القيّم")}
        attribution={tri(lang, "Museum curator", "Le conservateur", "أمين المتحف")}
        seal={<CollectionEmblem emblem={topic.emblem} size={44} />}
      >
        <p className="italic" style={{ fontFamily: SERIF }}>
          “{t(topic.curatorNote, lang)}”
        </p>
      </MuseumCuratorNote>

      {topic.relatedStories.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedLabel}
          marker={<span aria-hidden>❧</span>}
          items={topic.relatedStories.map(storyItem)}
          columns={2}
        />
      )}

      <MuseumCTASection
        eyebrow={tri(lang, "Keep wandering", "Continuez la visite", "واصل التجوّل")}
        title={tri(lang, "Return to the culture hall", "Retour à la salle de la culture", "العودة إلى قاعة الثقافة")}
        subtitle={tri(
          lang,
          "Step back into the wider exhibition of a living Algeria.",
          "Replongez dans l'exposition d'une Algérie vivante.",
          "عُد إلى معرض جزائر حيّة الأوسع.",
        )}
        seal={<CollectionEmblem emblem="✦" size={56} glow tone="gold" />}
        action={
          <MuseumActionButton to="/culture">
            {tri(lang, "Culture hall", "Salle de la culture", "قاعة الثقافة")}
          </MuseumActionButton>
        }
      />
    </>
  );

  /* ======================================================== SIDEBAR === */
  const sidebar = (
    <>
      {topic.facts.length > 0 && (
        <MuseumOverviewPanel eyebrow={factsLabel} marker={<span aria-hidden>✨</span>}>
          <MuseumFactsList facts={topic.facts.map((f) => t(f, lang))} />
        </MuseumOverviewPanel>
      )}

      {regionItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={regionsLabel}
          marker={<span aria-hidden>❖</span>}
          items={regionItems}
          columns={1}
        />
      )}

      {eraItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={erasLabel}
          marker={<span aria-hidden>♜</span>}
          items={eraItems}
          columns={1}
        />
      )}

      {figureItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={figuresLabel}
          marker={<span aria-hidden>♟</span>}
          items={figureItems}
          columns={1}
        />
      )}

      {themeItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={themesLabel}
          marker={<span aria-hidden>✦</span>}
          items={themeItems}
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
            connects={["figures", "regions", "eras", "journeys", "collections"]}
            lang={lang}
          />
        }
      />
      <CuratorRecommendations kind="culture" id={topic.id} />
      <div className="h-16" />
    </>
  );
}

export default CultureTopicPage;
