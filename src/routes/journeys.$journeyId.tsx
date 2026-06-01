/**
 * Signature Journey detail page — the flagship of the museum-catalog layout.
 *
 * A guided narrative presented as an open exhibition book: a strong left story
 * column (label, serif title, poetic subtitle, metadata, narrative, "about"
 * card, start-this-journey CTA) and a right context sidebar (journey overview
 * timeline, "you will explore" stats, curator's tip), closed by a subtle
 * bottom context ribbon. Starting the journey opens the immersive walkthrough.
 */

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { JourneyPlayer } from "@/components/journeys/JourneyPlayer";
import {
  MuseumCatalogPage,
  MuseumHero,
  MuseumLabel,
  MuseumBack,
  MuseumChip,
  MuseumPill,
  MuseumCatalogCard,
  MuseumTimelinePanel,
  MuseumExploreGrid,
  MuseumCTASection,
  MuseumActionButton,
  MuseumCuratorTip,
  MuseumContextRibbon,
  type TimelineStop,
} from "@/components/museum/MuseumCatalog";
import { getJourney, type Journey, type JourneyStop } from "@/lib/journeys";
import { getFigure } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { eras } from "@/data/eras";
import { t, useLang, type Lang, type LocalizedString } from "@/lib/i18n";

export const Route = createFileRoute("/journeys/$journeyId")({
  loader: ({ params }) => {
    const journey = getJourney(params.journeyId);
    if (!journey) throw notFound();
    return { journey };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const titleEn = t(loaderData.journey.title, "en");
    const taglineEn = t(loaderData.journey.tagline, "en");
    return {
      meta: [
        { title: `${titleEn} — Signature Journey | Algeria Through Time` },
        { name: "description", content: taglineEn },
        { property: "og:title", content: titleEn },
        { property: "og:description", content: taglineEn },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-dvh bg-parchment">
      <Header />
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-xl font-bold">Journey not found</p>
          <Link to="/" className="text-primary underline">
            Back to the museum
          </Link>
        </div>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-dvh bg-parchment">
      <Header />
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-xl font-bold">Something went wrong</p>
          <Link to="/" className="text-primary underline">
            Back to the museum
          </Link>
        </div>
      </div>
    </div>
  ),
  component: JourneyDetail,
});

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

const COPY = {
  signatureJourneys: L("Signature Journeys", "Parcours signature", "رحلات مميّزة"),
  backToAll: L("Back to all journeys", "Retour aux parcours", "العودة إلى كل الرحلات"),
  signatureJourney: L("Signature Journey", "Parcours signature", "رحلة مميّزة"),
  grandTour: L("Grand Tour", "Grande Visite", "الجولة الكبرى"),
  about: L("About this journey", "À propos de ce parcours", "عن هذه الرحلة"),
  aboutBody: L(
    "This journey connects the people, events, and places that shaped Algeria's identity through time. Each stop reveals a chapter of our shared story.",
    "Ce parcours relie les personnes, les événements et les lieux qui ont façonné l'identité de l'Algérie à travers le temps. Chaque étape révèle un chapitre de notre histoire commune.",
    "تربط هذه الرحلة الناس والأحداث والأماكن التي شكّلت هوية الجزائر عبر الزمن. كل محطة تكشف فصلًا من قصتنا المشتركة.",
  ),
  overview: L("Journey overview", "Aperçu du parcours", "نظرة على الرحلة"),
  youWillExplore: L("You will explore", "Vous explorerez", "ستكتشف"),
  readyToBegin: L("Ready to begin?", "Prêt à commencer ?", "مستعد للبدء؟"),
  startThis: L("Start this journey", "Commencer ce parcours", "ابدأ هذه الرحلة"),
  beginWalk: L("Begin your walk through history.", "Commencez votre marche dans l'histoire.", "ابدأ مسيرتك عبر التاريخ."),
  startJourney: L("Start Journey", "Commencer", "ابدأ الرحلة"),
  curatorTip: L("Curator's tip", "Conseil du conservateur", "نصيحة القيّم"),
  curatorTipBody: L(
    "Take your time with each stop. The journey is more meaningful when you explore, not hurry.",
    "Prenez votre temps à chaque étape. Le parcours prend tout son sens quand on explore sans se presser.",
    "خذ وقتك مع كل محطة. تصبح الرحلة أكثر معنى حين تستكشف دون عجلة.",
  ),
  connects: L("This journey connects:", "Ce parcours relie :", "تربط هذه الرحلة:"),
  keyFigures: L("Key Figures", "Personnages", "شخصيات"),
  majorEras: L("Major Eras", "Époques", "عصور"),
  regions: L("Regions", "Régions", "مناطق"),
  storiesLegacies: L("Stories & Legacies", "Récits & Legs", "قصص وإرث"),
  minutes: (m: number, lang: Lang) =>
    lang === "fr" ? `≈ ${m} min` : lang === "ar" ? `≈ ${m} دقيقة` : `≈ ${m} min`,
  stops: (n: number, lang: Lang) =>
    lang === "fr" ? `${n} étapes` : lang === "ar" ? `${n} محطات` : `${n} stops`,
  eraTag: (label: string, lang: Lang) =>
    lang === "fr" ? `Époque : ${label}` : lang === "ar" ? `حقبة: ${label}` : `Era: ${label}`,
} as const;

const KIND_LABEL: Record<JourneyStop["kind"], LocalizedString> = {
  figure: L("Figure", "Figure", "شخصية"),
  region: L("Region", "Région", "منطقة"),
  era: L("Era", "Époque", "حقبة"),
  culture: L("Culture", "Culture", "ثقافة"),
  atlas: L("Atlas", "Atlas", "أطلس"),
};

type ResolvedStop = {
  name: LocalizedString;
  tag: LocalizedString;
  to: string;
  params?: Record<string, string>;
};

function resolveStop(stop: JourneyStop, lang: Lang): ResolvedStop {
  if (stop.kind === "figure") {
    const f = getFigure(stop.id);
    return {
      name: f?.displayName ?? stop.title,
      tag: { en: COPY.eraTag(t(f?.era ?? KIND_LABEL.figure, "en"), "en"), fr: COPY.eraTag(t(f?.era ?? KIND_LABEL.figure, "fr"), "fr"), ar: COPY.eraTag(t(f?.era ?? KIND_LABEL.figure, "ar"), "ar") },
      to: "/figures/$figureId",
      params: { figureId: stop.id },
    };
  }
  if (stop.kind === "era") {
    const e = eras.find((x) => x.id === stop.id);
    return {
      name: e?.title ?? stop.title,
      tag: e ? { en: e.dateRange, fr: e.dateRange, ar: e.dateRange } : KIND_LABEL.era,
      to: "/era/$eraId",
      params: { eraId: stop.id },
    };
  }
  if (stop.kind === "region") {
    const r = mapRegions.find((m) => m.id === stop.id);
    return { name: r?.name ?? stop.title, tag: KIND_LABEL.region, to: "/map" };
  }
  if (stop.kind === "culture") {
    return { name: stop.name, tag: KIND_LABEL.culture, to: "/culture" };
  }
  return { name: stop.name, tag: KIND_LABEL.atlas, to: "/atlas" };
}

function JourneyDetail() {
  const { journey } = Route.useLoaderData() as { journey: Journey };
  const lang = useLang();
  const [playing, setPlaying] = useState(false);

  const figureCount = journey.stops.filter((s) => s.kind === "figure").length;
  const eraCount = new Set(journey.stops.filter((s) => s.kind === "era").map((s) => "id" in s && s.id)).size;
  const regionCount = journey.stops.filter((s) => s.kind === "region").length;

  const timeline: TimelineStop[] = journey.stops.map((s) => {
    const r = resolveStop(s, lang);
    return {
      title: t(r.name, lang),
      note: t(s.title, lang),
      tag: t(r.tag, lang),
      to: r.to,
      params: r.params,
    };
  });

  const exploreStats = [
    { glyph: "♟", value: figureCount > 0 ? `${figureCount}` : "—", label: t(COPY.keyFigures, lang) },
    { glyph: "♜", value: eraCount > 0 ? `${eraCount}` : "—", label: t(COPY.majorEras, lang) },
    { glyph: "❖", value: regionCount > 0 ? `${regionCount}` : "—", label: t(COPY.regions, lang) },
    { glyph: "✦", value: `${journey.stops.length}`, label: t(COPY.storiesLegacies, lang) },
  ];

  const main = (
    <>
      <MuseumBack to="/">{t(COPY.backToAll, lang)}</MuseumBack>

      <MuseumHero
        label={<MuseumChip>{t(journey.grandTour ? COPY.grandTour : COPY.signatureJourney, lang)}</MuseumChip>}
        title={t(journey.title, lang)}
        subtitle={t(journey.tagline, lang)}
        pills={
          <>
            <MuseumPill icon="◷">{COPY.minutes(journey.minutes, lang)}</MuseumPill>
            <MuseumPill icon="❖">{COPY.stops(journey.stops.length, lang)}</MuseumPill>
          </>
        }
        intro={t(journey.overview, lang)}
        medallion={
          <CollectionEmblem emblem={journey.emblem} size={156} glow interactive animate="reveal" />
        }
      />

      <MuseumCatalogCard
        accent="var(--brand-gold-deep)"
        eyebrow={t(COPY.about, lang)}
        marker={<span aria-hidden>❦</span>}
      >
        <p className="text-sm sm:text-[15px] text-foreground/80 leading-relaxed">
          {t(COPY.aboutBody, lang)}
        </p>
      </MuseumCatalogCard>

      <MuseumCTASection
        eyebrow={t(COPY.readyToBegin, lang)}
        title={t(COPY.startThis, lang)}
        subtitle={t(COPY.beginWalk, lang)}
        seal={<CollectionEmblem emblem="✦" size={58} glow tone="gold" />}
        action={
          <MuseumActionButton onClick={() => setPlaying(true)}>
            {t(COPY.startJourney, lang)}
          </MuseumActionButton>
        }
      />
    </>
  );

  const sidebar = (
    <>
      <MuseumTimelinePanel
        eyebrow={t(COPY.overview, lang)}
        marker={<span aria-hidden>❧</span>}
        stops={timeline}
      />

      <MuseumLabel className="px-1 pt-1">{t(COPY.youWillExplore, lang)}</MuseumLabel>
      <MuseumExploreGrid stats={exploreStats} />

      <MuseumCuratorTip title={t(COPY.curatorTip, lang)}>
        {t(COPY.curatorTipBody, lang)}
      </MuseumCuratorTip>
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
            connects={["figures", "eras", "regions", "culture", "atlas"]}
            title={COPY.connects}
            lang={lang}
          />
        }
      />
      <JourneyPlayer journey={playing ? journey : null} open={playing} onClose={() => setPlaying(false)} lang={lang} />
    </>
  );
}

export default JourneyDetail;
