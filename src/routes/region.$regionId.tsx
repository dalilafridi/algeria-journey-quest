/**
 * Region exhibit — rebuilt on the shared museum-exhibit architecture first
 * used for the M'Zab Valley (`@/components/exhibit`).
 *
 * Same canonical routes as before (/region/kabylie, /region/algiers, ...).
 * All content still comes from the existing typed data
 * (mapRegions, regionExtras, cinematic intros, figures, eras) so nothing was
 * rewritten or invented; only the presentation changed. Each region keeps its
 * own imagery, accent colour and specialised sections (Kabyle jewellery, the
 * curator's reflection, provenance).
 */

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";

import { Header } from "@/components/Header";
import { RegionIcon } from "@/components/RegionIcon";
import { pageMeta, headLang, siteSuffix } from "@/lib/seo";
import { mapRegions, type MapRegion } from "@/data/mapRegions";
import { getRegionExtras } from "@/data/regionExtras";
import { regionIntros } from "@/data/cinematic";
import { eras, eraDateRange } from "@/data/eras";
import { getFigure } from "@/data/figures";
import { saveJourneyPlace } from "@/lib/continuity";
import { t as tr, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { AudioGuideButton } from "@/components/audio/AudioGuide";
import type { AudioGuide } from "@/lib/audioGuide";
import { CuratorRecommendations } from "@/components/CuratorRecommendations";
import { ContinueExploring } from "@/components/curator/ContinueExploring";
import { ExhibitProvenance } from "@/components/provenance/ExhibitProvenance";
import { getRegionExploreGroups } from "@/lib/exploreGroups";
import { KabyleJewelry } from "@/components/regions/KabyleJewelry";
import {
  Section,
  EyebrowTitle,
  Prose,
  ExhibitHero,
  NumberedGrid,
  DiscoveryCards,
  DataStatsCard,
  PullQuote,
  RelatedExhibits,
  type NumberedItem,
  type RelatedExhibit,
} from "@/components/exhibit";

import kabylieImg from "@/assets/exhibit-kabylie.jpg";
import casbahImg from "@/assets/exhibit-casbah.jpg";

export const Route = createFileRoute("/region/$regionId")({
  loader: ({ params }) => {
    const region = mapRegions.find((r) => r.id === params.regionId);
    if (!region) throw notFound();
    return { region };
  },
  head: ({ loaderData, params, match }) => {
    const lang = headLang(match);
    if (!loaderData) {
      return pageMeta({
        lang,
        path: `/region/${params.regionId}`,
        title: {
          en: "Region not found, DZ Odyssey",
          fr: "Région introuvable, DZ Odyssey",
          ar: "المنطقة غير موجودة، دي زد أوديسي",
        },
        description: {
          en: "This region exhibit could not be found.",
          fr: "Cette exposition régionale est introuvable.",
          ar: "لم يتم العثور على معرض هذه المنطقة.",
        },
        noindex: true,
      });
    }
    const kind = { en: "Region", fr: "Région", ar: "منطقة" }[lang];
    return pageMeta({
      lang,
      path: `/region/${loaderData.region.id}`,
      title: `${tr(loaderData.region.name, lang)}, ${kind}${siteSuffix(lang)}`,
      description: tr(loaderData.region.summary, lang),
      type: "article",
    });
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

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });
const tri = (lang: Lang, en: string, fr: string, ar: string) =>
  lang === "fr" ? fr : lang === "ar" ? ar : en;

/* ------------------------------------------------------------------ */
/*  per-region visual identity                                        */
/* ------------------------------------------------------------------ */

type RegionIdentity = {
  /** Hero photograph or interpretive plate, when the museum holds one. */
  image?: string;
  imageAlt?: LocalizedString;
  imageCaption?: LocalizedString;
  /** Hero wash, so no two regions read as copies of one another. */
  wash: string;
};

const IDENTITY: Record<string, RegionIdentity> = {
  kabylie: {
    image: kabylieImg,
    imageAlt: L(
      "Kabyle mountain village of stone houses with tiled roofs, terraced slopes of the Djurdjura rising behind.",
      "Village kabyle de maisons de pierre aux toits de tuiles, versants en terrasses du Djurdjura à l'arrière-plan.",
      "قرية قبائلية من بيوت الحجر بسقوف القرميد، ومدرّجات جرجرة ترتفع خلفها.",
    ),
    imageCaption: L(
      "A village of the Djurdjura, built facing the mountain",
      "Un village du Djurdjura, bâti face à la montagne",
      "قرية من جرجرة، بُنيت في مواجهة الجبل",
    ),
    wash: "radial-gradient(ellipse at 50% 20%, oklch(0.9 0.06 150 / 0.30), transparent 65%), var(--gradient-parchment)",
  },
  algiers: {
    image: casbahImg,
    imageAlt: L(
      "White terraced houses of the Casbah of Algiers cascading in narrow steps toward the Mediterranean.",
      "Maisons blanches en terrasses de la Casbah d'Alger descendant par ruelles étroites vers la Méditerranée.",
      "بيوت قصبة الجزائر البيضاء المتدرّجة تنحدر في أزقة ضيّقة نحو البحر المتوسط.",
    ),
    imageCaption: L(
      "The Casbah of Algiers, stepping down toward the bay",
      "La Casbah d'Alger, en escalier vers la baie",
      "قصبة الجزائر، تنحدر درجاً نحو الخليج",
    ),
    wash: "radial-gradient(ellipse at 50% 20%, oklch(0.9 0.06 240 / 0.30), transparent 65%), var(--gradient-parchment)",
  },
  aures: {
    wash: "radial-gradient(ellipse at 50% 20%, oklch(0.9 0.07 45 / 0.32), transparent 65%), var(--gradient-parchment)",
  },
  constantine: {
    wash: "radial-gradient(ellipse at 50% 20%, oklch(0.9 0.05 300 / 0.28), transparent 65%), var(--gradient-parchment)",
  },
  "oran-west": {
    wash: "radial-gradient(ellipse at 50% 20%, oklch(0.9 0.06 200 / 0.30), transparent 65%), var(--gradient-parchment)",
  },
  sahara: {
    wash: "radial-gradient(ellipse at 50% 20%, oklch(0.92 0.07 75 / 0.38), transparent 65%), var(--gradient-parchment)",
  },
};

function RegionPage() {
  const { region } = Route.useLoaderData() as { region: MapRegion };
  const lang = useLang();
  const extras = getRegionExtras(region.id);
  const intro = regionIntros[region.id];
  const identity = IDENTITY[region.id] ?? { wash: "" };

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
        en: `Regions · ${tr(region.name, "en")}`,
        fr: `Régions · ${tr(region.name, "fr")}`,
        ar: `المناطق · ${tr(region.name, "ar")}`,
      },
      description:
        typeof region.focus === "string"
          ? { en: region.focus, fr: region.focus, ar: region.focus }
          : region.focus,
      href: `/region/${region.id}`,
    });
  }, [region]);

  /* ---------------- audio guide (unchanged content) ---------------- */
  const guide: AudioGuide = (() => {
    const segs: { id: string; text: string }[] = [
      {
        id: "intro",
        text: `${tr(region.name, lang)}. ${tr(region.focus, lang)}. ${tr(region.summary, lang)}`,
      },
    ];
    if (extras?.geography) segs.push({ id: "geo", text: tr(extras.geography, lang) });
    if (extras?.culturalImportance)
      segs.push({ id: "culture", text: tr(extras.culturalImportance, lang) });
    if (extras?.historicalSignificance)
      segs.push({ id: "history", text: tr(extras.historicalSignificance, lang) });
    (extras?.museumNotes ?? []).forEach((n, i) =>
      segs.push({ id: `note-${i}`, text: `${tr(n.title, lang)}. ${tr(n.body, lang)}` }),
    );
    if (extras?.reflection?.quote)
      segs.push({ id: "reflection", text: tr(extras.reflection.quote, lang) });
    return {
      id: `region:${region.id}`,
      title: tr(region.name, lang),
      subtitle: tr(region.focus, lang),
      segments: segs,
    };
  })();

  /* ---------------- derived exhibit blocks ---------------- */
  const stats = [
    { label: L("Focus", "Thème", "المحور"), value: region.focus },
    {
      label: L("Connected eras", "Époques reliées", "عصور مرتبطة"),
      value: L(String(connectedEras.length), String(connectedEras.length), String(connectedEras.length)),
    },
    {
      label: L("Notable figures", "Figures notables", "شخصيات بارزة"),
      value: L(String(figureCards.length), String(figureCards.length), String(figureCards.length)),
    },
    {
      label: L("Cultural pillars", "Piliers culturels", "ركائز ثقافية"),
      value: L(
        String(extras?.culturePillars.length ?? 0),
        String(extras?.culturePillars.length ?? 0),
        String(extras?.culturePillars.length ?? 0),
      ),
    },
  ];

  const pillarItems: NumberedItem[] = (extras?.culturePillars ?? []).map((p) => ({
    title: p.label,
    body: p.body,
  }));

  const noteItems: NumberedItem[] = (extras?.museumNotes ?? []).map((n) => ({
    title: n.title,
    body: n.body,
  }));

  const related: RelatedExhibit[] = [
    ...connectedEras.map((e) => ({
      to: "/era/$eraId",
      params: { eraId: e.id },
      label: e.title,
      body: L(eraDateRange(e, "en"), eraDateRange(e, "fr"), eraDateRange(e, "ar")),
    })),
    ...nearbyRegions.map((r) => ({
      to: "/region/$regionId",
      params: { regionId: r.id },
      label: r.name,
      body: r.focus,
    })),
    {
      to: "/atlas",
      label: L("The Historical Atlas", "L'Atlas historique", "الأطلس التاريخي"),
      body: L(
        "Place this region on the wall map of Algeria.",
        "Situez cette région sur la carte murale de l'Algérie.",
        "ضع هذه المنطقة على خريطة الجزائر.",
      ),
    },
  ];

  const figureRelated: RelatedExhibit[] = figureCards.slice(0, 6).map((f) => ({
    to: "/figures/$figureId",
    params: { figureId: f.id },
    label: f.displayName,
    body: f.era,
  }));

  return (
    <div className="min-h-dvh bg-parchment text-foreground">
      <Header />
      <main id="main" tabIndex={-1}>
        <ExhibitHero
          eyebrow={L(
            `Region of Algeria · ${tr(region.focus, "en")}`,
            `Région d'Algérie · ${tr(region.focus, "fr")}`,
            `منطقة من الجزائر · ${tr(region.focus, "ar")}`,
          )}
          title={region.name}
          subtitle={intro}
          lede={region.summary}
          image={identity.image}
          imageAlt={identity.imageAlt}
          imageCaption={identity.imageCaption}
          imageMediaKind={identity.image ? "interpretive-illustration" : undefined}
          medallion={
            identity.image ? undefined : (
              <RegionIcon regionId={region.id} className="h-40 w-40 sm:h-52 sm:w-52 icon-glow" />
            )
          }
          background={identity.wash || undefined}
          ctaHref="#land"
          ctaLabel={L("Enter the exhibit", "Entrer dans l'exposition", "ادخل المعرض")}
          backTo="/map"
          backLabel={L("← Back to regions", "← Retour aux régions", "← العودة إلى المناطق")}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <AudioGuideButton
            guide={guide}
            label={tri(lang, "Listen to this region", "Écouter cette région", "استمع إلى هذه المنطقة")}
          />
        </div>

        {extras && (
          <Section id="land" tone="ivory">
            <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] items-start">
              <div>
                <EyebrowTitle
                  eyebrow={L("The land", "Le territoire", "الأرض")}
                  title={L("Where this region stands", "Où se tient cette région", "أين تقوم هذه المنطقة")}
                />
                <Prose>
                  <p>{tr(extras.geography, lang)}</p>
                </Prose>
              </div>
              <DataStatsCard
                label={L(
                  `Museum data card · ${tr(region.name, "en")}`,
                  `Fiche muséale · ${tr(region.name, "fr")}`,
                  `بطاقة متحفية · ${tr(region.name, "ar")}`,
                )}
                stats={stats}
                footer={region.facts[0]}
              />
            </div>
          </Section>
        )}

        {extras?.culturalImportance && (
          <Section id="culture" tone="parchment">
            <EyebrowTitle
              eyebrow={L("Cultural meaning", "Sens culturel", "المعنى الثقافي")}
              title={L("What this place carries", "Ce que ce lieu porte", "ما يحمله هذا المكان")}
            />
            <Prose>
              <p>{tr(extras.culturalImportance, lang)}</p>
            </Prose>
          </Section>
        )}

        {extras?.historicalSignificance && (
          <Section id="history" tone="ivory">
            <EyebrowTitle
              eyebrow={L("Historical significance", "Importance historique", "الأهمية التاريخية")}
              title={L("Why historians return here", "Pourquoi les historiens y reviennent", "لماذا يعود المؤرخون إلى هنا")}
            />
            <Prose>
              <p>{tr(extras.historicalSignificance, lang)}</p>
            </Prose>
          </Section>
        )}

        {region.facts.length > 0 && (
          <Section id="facts" tone="sand">
            <EyebrowTitle
              eyebrow={L("Key facts", "Faits clés", "حقائق أساسية")}
              title={L("What the record shows", "Ce que dit le dossier", "ما يقوله السجلّ")}
            />
            <DiscoveryCards items={region.facts} label={L("Fact", "Fait", "معلومة")} />
          </Section>
        )}

        {pillarItems.length > 0 && (
          <Section id="pillars" tone="parchment">
            <EyebrowTitle
              eyebrow={L("Cultural pillars", "Piliers culturels", "ركائز ثقافية")}
              title={L("How the region expresses itself", "Comment la région s'exprime", "كيف تعبّر المنطقة عن نفسها")}
            />
            <NumberedGrid items={pillarItems} columns={2} />
          </Section>
        )}

        {noteItems.length > 0 && (
          <Section id="stories" tone="ivory">
            <EyebrowTitle
              eyebrow={L("Connected stories", "Récits liés", "قصص مرتبطة")}
              title={L("Notes from the curator's desk", "Notes du bureau du conservateur", "ملاحظات من مكتب القيّم")}
            />
            <NumberedGrid items={noteItems} columns={2} />
          </Section>
        )}

        {region.id === "kabylie" && (
          <Section id="kabyle-jewelry" tone="sand">
            <KabyleJewelry />
          </Section>
        )}

        {extras?.reflection && (
          <Section id="reflection" tone="parchment">
            <EyebrowTitle
              eyebrow={L("Curator's reflection", "Réflexion du conservateur", "تأمّل القيّم")}
              title={L("A closing word", "Un mot pour finir", "كلمة ختام")}
            />
            <PullQuote
              quote={extras.reflection.quote}
              attribution={
                extras.reflection.attribution ??
                L("Museum curator", "Le conservateur", "أمين المتحف")
              }
            />
          </Section>
        )}

        {figureRelated.length > 0 && (
          <Section id="figures" tone="ivory">
            <EyebrowTitle
              eyebrow={L("Notable figures", "Figures notables", "شخصيات بارزة")}
              title={L("Lives shaped by this region", "Des vies façonnées par cette région", "حيواتٌ شكّلتها هذه المنطقة")}
            />
            <RelatedExhibits
              items={figureRelated}
              label={L("Figure", "Figure", "شخصية")}
              enterLabel={L("Open →", "Ouvrir →", "افتح ←")}
            />
          </Section>
        )}

        <Section id="related" tone="sand">
          <EyebrowTitle
            eyebrow={L("Related exhibits", "Expositions liées", "معارض ذات صلة")}
            title={L("Where to go next in the museum", "Où poursuivre la visite", "أين تُتابع الزيارة")}
          />
          <RelatedExhibits
            items={related}
            label={L("Related exhibit", "Exposition liée", "معرض ذو صلة")}
            enterLabel={L("Enter →", "Entrer →", "ادخل ←")}
          />
        </Section>

        <CuratorRecommendations kind="region" id={region.id} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-4">
          <ContinueExploring groups={getRegionExploreGroups(region.id)} />
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <ExhibitProvenance exhibitId={`region:${region.id}`} />
        </section>

        <footer className="border-t border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground italic">
              {tr(region.name, lang)} ·{" "}
              {tri(lang, "a region exhibit of DZ Odyssey.", "exposition régionale de DZ Odyssey.", "معرض إقليمي في دي زد أوديسي.")}
            </p>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition"
            >
              {tri(lang, "← Back to regions", "← Retour aux régions", "← العودة إلى المناطق")}
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default RegionPage;
