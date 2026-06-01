/**
 * Figure detail page — the flagship museum exhibit experience.
 *
 * Rebuilt on the shared MuseumCatalogPage template: a strong left story column
 * (exhibit label, serif title, role, narrative, significance, achievements,
 * legacy, memorable quote, curator note) and a right context sidebar (at a
 * glance, place in time, related figures / regions / eras), closed by a subtle
 * bottom context ribbon connecting journeys, collections, atlas and culture.
 *
 * Every historical figure reads as one curated exhibit rather than a biography
 * page — composed entirely from the MuseumCatalog primitives.
 */

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { eras } from "@/data/eras";
import { getFigure, figures, FIGURE_CATEGORIES } from "@/data/figures";
import { figureExtras } from "@/data/figureExtras";
import { figureMeta, FIGURE_THEMES, cultureKindEmoji, type FigureCultureLinkKind } from "@/data/figureMeta";
import { mapRegions } from "@/data/mapRegions";
import { LEGEND_ERAS, eraOfCategory } from "@/lib/figureEras";
import { collectionOf } from "@/lib/figureCollections";
import { EraBadge } from "@/components/brand/EraBadge";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { t, tu, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { StoryFlow, type StoryScene } from "@/components/story/StoryFlow";
import { getCurator } from "@/data/curatorContent";
import { MemoryMoment } from "@/components/curator/MemoryMoment";
import { SourcesList } from "@/components/curator/SourcesList";
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
  MuseumCTASection,
  MuseumActionButton,
  MuseumContextRibbon,
  type TimelineStop,
  type RelatedItem,
} from "@/components/museum/MuseumCatalog";

const SERIF = "Georgia, 'Times New Roman', serif";

const CULTURE_KIND_TO: Record<FigureCultureLinkKind, "/cuisine" | "/cinema" | "/words" | "/ideas" | "/moments" | "/timeline" | "/lessons"> = {
  cuisine: "/cuisine",
  cinema: "/cinema",
  words: "/words",
  ideas: "/ideas",
  moments: "/moments",
  timeline: "/timeline",
  lessons: "/lessons",
};

export const Route = createFileRoute("/figures/$figureId")({
  loader: ({ params }) => {
    const figure = getFigure(params.figureId);
    if (!figure) throw notFound();
    return { figure };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${t(loaderData.figure.displayName, "en")} — Hall of Legends` },
            { name: "description", content: t(loaderData.figure.fact, "en") },
            { property: "og:title", content: `${t(loaderData.figure.displayName, "en")} — Hall of Legends` },
            { property: "og:description", content: t(loaderData.figure.fact, "en") },
          ],
        }
      : {},
  component: FigureDetail,
  notFoundComponent: () => (
    <div className="min-h-dvh bg-parchment">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Figure not found.</h1>
        <Link to="/figures" className="mt-4 inline-block text-primary underline">
          Back to the Hall of Legends
        </Link>
      </main>
    </div>
  ),
});

/* ---------------- Localized copy ---------------- */

const tri = (lang: Lang, en: string, fr: string, ar: string) => (lang === "fr" ? fr : lang === "ar" ? ar : en);

function FigureDetail() {
  const { figure: f } = Route.useLoaderData();
  const lang = useLang();

  const era = f.relatedEraId ? eras.find((e) => e.id === f.relatedEraId) : undefined;
  const extras = figureExtras[f.id];
  const relatedRegion = mapRegions.find(
    (r) => r.id === f.region || (f.region === "mascara-west" && r.id === "oran-west"),
  );
  const legendEra = LEGEND_ERAS.find((e) => e.id === eraOfCategory(f.category))!;
  const collection = collectionOf(f.id);
  const categoryDef = FIGURE_CATEGORIES.find((c) => c.id === f.category);
  const meta = figureMeta[f.id];
  const curator = getCurator("figure", f.id);

  const relatedFigures = Array.from(new Set(meta?.relatedFigureIds ?? []))
    .filter((id) => id !== f.id)
    .map((id) => figures.find((x) => x.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .filter((x, i, arr) => arr.findIndex((y) => y.id === x.id) === i);

  useEffect(() => {
    saveJourneyPlace({
      section: "figures",
      label: {
        fr: `Figure · ${t(f.displayName, "fr")}`,
        en: `Figure · ${t(f.displayName, "en")}`,
        ar: `شخصية · ${t(f.displayName, "ar")}`,
      },
      description: typeof f.era === "string" ? { fr: f.era, en: f.era, ar: f.era } : f.era,
      href: `/figures/${f.id}`,
    });
  }, [f]);

  /* ---- Labels ---- */
  const significanceLabel = tri(lang, "Historical significance", "Importance historique", "الأهمية التاريخية");
  const contributionsLabel = tri(lang, "Major achievements", "Grandes réalisations", "أبرز الإنجازات");
  const legacyLabel = tri(lang, "Lasting legacy", "Héritage durable", "الإرث الباقي");
  const quoteLabel = tri(lang, "Memorable quote", "Citation mémorable", "قول مأثور");
  const didYouKnowLabel = tri(lang, "Did you know?", "Le saviez-vous ?", "هل تعلم؟");
  const keyWorksLabel = tri(lang, "Key works & places", "Œuvres et lieux clés", "أعمال وأماكن بارزة");
  const atAGlanceLabel = tri(lang, "At a glance", "En un coup d'œil", "لمحة سريعة");
  const placeInTimeLabel = tri(lang, "Place in time", "Repère chronologique", "الموقع الزمني");
  const roleLabel = tri(lang, "Role", "Rôle", "الدور");
  const eraRowLabel = tri(lang, "Era", "Ère", "الحقبة");
  const periodLabel = tri(lang, "Lifespan", "Période", "الفترة");
  const regionRowLabel = tri(lang, "Region", "Région", "المنطقة");
  const galleryRowLabel = tri(lang, "Gallery", "Galerie", "القاعة");
  const knownForLabel = tri(lang, "Known for", "Connu pour", "اشتهر بـ");
  const relatedFiguresLabel = tri(lang, "Related figures", "Figures reliées", "شخصيات مرتبطة");
  const relatedRegionsLabel = tri(lang, "Related regions", "Régions reliées", "مناطق مرتبطة");
  const relatedErasLabel = tri(lang, "Related eras", "Époques reliées", "عصور مرتبطة");
  const culturalThreadsLabel = tri(lang, "Cultural threads", "Fils culturels", "خيوط ثقافية");

  /* ---- Sidebar: place in time timeline ---- */
  const timeline: TimelineStop[] = eras.map((e) => ({
    title: t(e.title, lang),
    note: e.dateRange,
    tag: e.id === f.relatedEraId ? tri(lang, "Here", "Ici", "هنا") : undefined,
    to: "/era/$eraId",
    params: { eraId: e.id },
    active: e.id === f.relatedEraId,
  }));

  /* ---- Sidebar: related figures / regions / eras ---- */
  const relatedFigureItems: RelatedItem[] = relatedFigures.slice(0, 6).map((x) => ({
    title: t(x.displayName, lang),
    note: t(x.era, lang),
    glyph: x.emoji,
    to: "/figures/$figureId",
    params: { figureId: x.id },
  }));

  const relatedRegionItems: RelatedItem[] = relatedRegion
    ? [
        {
          title: t(relatedRegion.name, lang),
          note: t(f.regionLabel, lang),
          glyph: relatedRegion.emoji ?? "◈",
          to: "/map",
          hash: `region-${relatedRegion.id}`,
        },
      ]
    : [];

  const relatedEraItems: RelatedItem[] = era
    ? [
        {
          title: t(era.title, lang),
          note: era.dateRange,
          glyph: era.emoji,
          to: "/era/$eraId",
          params: { eraId: era.id },
        },
      ]
    : [];

  /* ---- Cultural threads (main column related content) ---- */
  const cultureItems: RelatedItem[] = (meta?.cultureLinks ?? []).map((c) => ({
    title: t(c.label, lang),
    glyph: cultureKindEmoji(c.kind),
    to: CULTURE_KIND_TO[c.kind],
  }));

  const heroIntro = meta?.cinematicLine ? t(meta.cinematicLine, lang) : t(f.fact, lang);

  /* =========================================================== MAIN === */
  const main = (
    <>
      <MuseumBack to="/figures">{tu("backToFigures", lang)}</MuseumBack>

      <MuseumHero
        label={
          <MuseumLabel>
            {t(legendEra.label, lang)}
            {categoryDef ? ` · ${t(categoryDef.label, lang)}` : ""}
          </MuseumLabel>
        }
        title={t(f.displayName, lang)}
        subtitle={categoryDef ? t(categoryDef.label, lang) : t(f.regionLabel, lang)}
        pills={
          <>
            <MuseumPill icon="◈">{t(collection.label, lang)}</MuseumPill>
            <MuseumPill icon="❧">{t(f.era, lang)}</MuseumPill>
            <MuseumPill icon="❖">{t(f.regionLabel, lang)}</MuseumPill>
          </>
        }
        intro={
          meta?.cinematicLine ? (
            <span className="italic" style={{ fontFamily: SERIF }}>
              “{heroIntro}”
            </span>
          ) : (
            heroIntro
          )
        }
        medallion={
          <MedallionFrame
            size={156}
            tone="gold"
            glow
            animate="reveal"
            inset={0.2}
            label={t(f.displayName, lang)}
            seal={<EraBadge kind={legendEra.badge} size={46} label={t(legendEra.label, lang)} />}
          >
            <span
              aria-hidden
              className="relative text-6xl sm:text-7xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              style={{ filter: "saturate(0.9)" }}
            >
              {f.emoji}
            </span>
          </MedallionFrame>
        }
      />

      {curator?.note && (
        <MuseumCuratorNote
          title={tri(lang, "Curator's note", "Note du conservateur", "ملاحظة القيّم")}
          attribution={tri(lang, "Museum curator", "Le conservateur", "أمين المتحف")}
          seal={<CollectionEmblem emblem={collection.emblem} accent={collection.accent} size={44} />}
        >
          <p>{t(curator.note, lang)}</p>
        </MuseumCuratorNote>
      )}

      <MuseumCatalogCard accent="var(--primary)" eyebrow={significanceLabel} marker={<span aria-hidden>⭐</span>}>
        <p className="leading-relaxed text-foreground/90">{t(f.importance, lang)}</p>
        {meta?.modernRelevance && (
          <p className="mt-3 leading-relaxed text-foreground/80">{t(meta.modernRelevance, lang)}</p>
        )}
      </MuseumCatalogCard>

      <MuseumCatalogCard eyebrow={tu("theirStory", lang)} marker={<span aria-hidden>📖</span>}>
        <p className="leading-relaxed text-foreground/90">{t(f.story, lang)}</p>
      </MuseumCatalogCard>

      {f.extended?.storyMode && f.extended.storyMode.length > 0 && (
        <StoryFlow
          scenes={(f.extended.storyMode as LocalizedString[]).map((p, i): StoryScene => ({
            icon: i === 0 ? "✨" : undefined,
            body: p,
          }))}
          accent="var(--secondary)"
          title={tri(lang, "Story mode", "Mode récit", "وضع السرد")}
          continuityTitle={f.displayName}
          defaultGuide={tri(lang, "Follow the story, step by step…", "Suis le récit, pas à pas…", "تابع الحكاية، خطوةً بخطوة…")}
        />
      )}

      {f.extended?.whatHappened && f.extended.whatHappened.length > 0 && (
        <MuseumCatalogCard eyebrow={contributionsLabel} marker={<span aria-hidden>🏛️</span>}>
          <ul className="space-y-2.5">
            {f.extended.whatHappened.map((p: LocalizedString, i: number) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className="mt-1.5 shrink-0 inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--brand-gold)" }}
                />
                <span className="min-w-0">{t(p, lang)}</span>
              </li>
            ))}
          </ul>
        </MuseumCatalogCard>
      )}

      {extras?.keyPlacesAndWorks && extras.keyPlacesAndWorks.length > 0 && (
        <MuseumCatalogCard eyebrow={keyWorksLabel} marker={<span aria-hidden>🗺️</span>}>
          <ul className="space-y-2">
            {extras.keyPlacesAndWorks.map((item, i) => (
              <li key={i} className="rounded-xl border border-border bg-muted/40 px-3 py-2.5 flex gap-3 items-start">
                <span className="text-xl leading-none mt-0.5" aria-hidden>
                  {item.emoji}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{t(item.label, lang)}</div>
                  {item.note && (
                    <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{t(item.note, lang)}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </MuseumCatalogCard>
      )}

      {f.extended?.keyLesson && (
        <figure
          className="relative overflow-hidden rounded-2xl border p-6 sm:p-8 text-center"
          style={{
            background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 14%, var(--card)), var(--card))",
            borderColor: "color-mix(in oklab, var(--brand-gold) 35%, var(--border))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3"
            style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}
          >
            {quoteLabel}
          </div>
          <blockquote className="text-xl sm:text-2xl leading-relaxed font-semibold text-foreground" style={{ fontFamily: SERIF }}>
            <span aria-hidden style={{ color: "var(--brand-gold)" }}>
              “
            </span>
            {t(f.extended.keyLesson, lang)}
            <span aria-hidden style={{ color: "var(--brand-gold)" }}>
              ”
            </span>
          </blockquote>
        </figure>
      )}

      {(f.extended?.aftermath && f.extended.aftermath.length > 0) && (
        <MuseumCatalogCard accent="var(--secondary)" eyebrow={legacyLabel} marker={<span aria-hidden>🌿</span>}>
          <div className="space-y-3">
            {f.extended.aftermath.map((p: LocalizedString, i: number) => (
              <p key={i} className="leading-relaxed text-foreground/90">
                {t(p, lang)}
              </p>
            ))}
          </div>
        </MuseumCatalogCard>
      )}

      <MuseumCatalogCard accent="var(--accent)" eyebrow={tu("oneFact", lang)} marker={<span aria-hidden>💡</span>}>
        <p className="leading-relaxed font-medium text-foreground/90">{t(f.fact, lang)}</p>
      </MuseumCatalogCard>

      {extras?.didYouKnow && (
        <MuseumCatalogCard accent="var(--accent)" eyebrow={didYouKnowLabel} marker={<span aria-hidden>💭</span>}>
          <p className="leading-relaxed text-foreground/90">{t(extras.didYouKnow, lang)}</p>
        </MuseumCatalogCard>
      )}

      {cultureItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={culturalThreadsLabel}
          marker={<span aria-hidden>✦</span>}
          items={cultureItems}
        />
      )}

      <MuseumCTASection
        eyebrow={tri(lang, "Test yourself", "Mettez-vous à l'épreuve", "اختبر معلوماتك")}
        title={tu("guessThisFigureCta", lang)}
        subtitle={tri(lang, "Can you recognise the legends of Algeria?", "Saurez-vous reconnaître les légendes de l'Algérie ?", "هل تستطيع التعرّف على رموز الجزائر؟")}
        seal={<CollectionEmblem emblem="♟" size={56} glow tone="gold" />}
        action={<MuseumActionButton to="/figures/quiz">{tri(lang, "Play the quiz", "Jouer au quiz", "العب الاختبار")}</MuseumActionButton>}
      />

      {(curator?.memory || (curator?.sources && curator.sources.length > 0)) && (
        <div className="space-y-6">
          {curator?.memory && <MemoryMoment moment={curator.memory} />}
          {curator?.sources && curator.sources.length > 0 && <SourcesList sources={curator.sources} />}
        </div>
      )}
    </>
  );

  /* ======================================================== SIDEBAR === */
  const sidebar = (
    <>
      <MuseumOverviewPanel eyebrow={atAGlanceLabel} marker={<EraBadge kind={legendEra.badge} size={20} />}>
        <dl className="space-y-3 text-sm">
          <GlanceRow label={galleryRowLabel} value={`${collection.emblem} ${t(collection.label, lang)}`} />
          {categoryDef && <GlanceRow label={roleLabel} value={t(categoryDef.label, lang)} />}
          <GlanceRow label={eraRowLabel} value={t(legendEra.label, lang)} />
          <GlanceRow label={periodLabel} value={t(f.era, lang)} />
          <GlanceRow
            label={regionRowLabel}
            value={relatedRegion ? t(relatedRegion.name, lang) : t(f.regionLabel, lang)}
          />
          {meta?.themes && meta.themes.length > 0 && (
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold mb-1.5">
                {knownForLabel}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {meta.themes.slice(0, 5).map((th) => {
                  const def = FIGURE_THEMES[th];
                  return (
                    <span
                      key={th}
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold border border-border/70 bg-card/70 text-muted-foreground"
                    >
                      <span className="me-0.5" aria-hidden>
                        {def.emoji}
                      </span>
                      {t(def.label, lang)}
                    </span>
                  );
                })}
              </dd>
            </div>
          )}
        </dl>
      </MuseumOverviewPanel>

      <MuseumTimelinePanel eyebrow={placeInTimeLabel} marker={<span aria-hidden>❧</span>} stops={timeline} />

      {relatedFigureItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedFiguresLabel}
          marker={<span aria-hidden>♟</span>}
          items={relatedFigureItems}
          columns={1}
        />
      )}

      {relatedRegionItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedRegionsLabel}
          marker={<span aria-hidden>❖</span>}
          items={relatedRegionItems}
          columns={1}
        />
      )}

      {relatedEraItems.length > 0 && (
        <MuseumRelatedContent
          eyebrow={relatedErasLabel}
          marker={<span aria-hidden>♜</span>}
          items={relatedEraItems}
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
            connects={["journeys", "collections", "atlas", "culture", "regions"]}
            lang={lang}
          />
        }
      />
    </>
  );
}

/* ---------------- Helpers ---------------- */

import { saveJourneyPlace as saveJourneyPlaceRaw } from "@/lib/continuity";

function saveJourneyPlace(f: ReturnType<typeof getFigure> & object, lang: Lang) {
  if (!f) return;
  saveJourneyPlaceRaw({
    section: "figures",
    label: {
      fr: `Figure · ${t(f.displayName, "fr")}`,
      en: `Figure · ${t(f.displayName, "en")}`,
      ar: `شخصية · ${t(f.displayName, "ar")}`,
    },
    description: typeof f.era === "string" ? { fr: f.era, en: f.era, ar: f.era } : f.era,
    href: `/figures/${f.id}`,
  });
}

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
