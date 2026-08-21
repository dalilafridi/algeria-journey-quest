/**
 * Museum Highlights — Algeria's flagship destinations, shown on /map
 * (Explore Algeria) beneath the geographic region cards.
 *
 * Same data shape as `FEATURED_EXHIBITS`, so the very same card UI renders
 * both. Adding a future masterpiece (Constantine, Numidia, the Sahara,
 * Music of Algeria, the Road to Independence, the Hall of Algerian Football)
 * is a one-object append here. No UI change is required.
 */

import type { FeaturedExhibit } from "@/data/featuredExhibits";

import mzabHero from "@/assets/mzab-hero.jpg";
import tassiliHero from "@/assets/exhibit-tassili.jpg";
import timgadHero from "@/assets/exhibit-timgad.jpg";
import djemilaHero from "@/assets/exhibit-djemila.jpg";
import casbahHero from "@/assets/exhibit-casbah.jpg";
import tipasaHero from "@/assets/exhibit-tipasa.jpg";

export const MUSEUM_HIGHLIGHTS: FeaturedExhibit[] = [
  {
    id: "mzab",
    title: { en: "The M'Zab Valley", fr: "La vallée du M'Zab", ar: "وادي مزاب" },
    teaser: {
      en: "Five fortified ksour in the desert, built around one shared hydraulic mind.",
      fr: "Cinq ksour fortifiés dans le désert, bâtis autour d'un même génie hydraulique.",
      ar: "خمسة قصور محصّنة في الصحراء، بُنيت حول عقل هيدروليكي واحد.",
    },
    image: mzabHero,
    publishedAt: "2026-06-18",
    themes: ["unesco", "architecture", "regions"],
    target: { kind: "mzab" },
    unesco: true,
  },
  {
    id: "tassili",
    title: { en: "Tassili n'Ajjer", fr: "Tassili n'Ajjer", ar: "طاسيلي ناجّر" },
    teaser: {
      en: "Sandstone galleries painted before writing existed, a Saharan prehistory in colour.",
      fr: "Des galeries de grès peintes avant l'écriture, une préhistoire saharienne en couleur.",
      ar: "أروقة من الحجر الرملي رُسمت قبل أن تُخترع الكتابة، عصور ما قبل التاريخ بألوانها.",
    },
    image: tassiliHero,
    publishedAt: "2025-08-01",
    themes: ["ancient", "unesco", "regions"],
    target: { kind: "tassili" },
    cta: {
      en: "Enter the Tassili exhibit",
      fr: "Entrer dans l'exposition Tassili",
      ar: "ادخل معرض طاسيلي",
    },
    unesco: true,
    illustrative: true,
  },
  {
    id: "timgad",
    title: { en: "Timgad", fr: "Timgad", ar: "تيمقاد" },
    teaser: {
      en: "A Roman city planned as a grid on the edge of the Aurès, arches, streets, silence.",
      fr: "Une cité romaine tracée en damier aux portes de l'Aurès, arcs, rues, silence.",
      ar: "مدينة رومانية مرسومة كشبكة على تخوم الأوراس، أقواس وشوارع وصمت.",
    },
    image: timgadHero,
    publishedAt: "2025-09-14",
    themes: ["ancient", "unesco", "architecture"],
    target: { kind: "timgad" },
    cta: {
      en: "Enter the Timgad exhibit",
      fr: "Entrer dans l'exposition Timgad",
      ar: "ادخل معرض تيمقاد",
    },
    unesco: true,
    illustrative: true,
  },
  {
    id: "djemila",
    title: { en: "Djémila", fr: "Djémila", ar: "جميلة" },
    teaser: {
      en: "Cuicul in the mountains of Sétif, a forum, a theatre and mosaics kept by the highlands.",
      fr: "Cuicul dans les monts de Sétif, un forum, un théâtre et des mosaïques gardés par les hauteurs.",
      ar: "كويكول في جبال سطيف، ساحةٌ ومسرحٌ وفسيفساء حفظتها المرتفعات.",
    },
    image: djemilaHero,
    publishedAt: "2026-07-30",
    themes: ["ancient", "unesco", "architecture"],
    target: { kind: "era", eraId: "roman" },
    cta: {
      en: "Explore Roman Algeria",
      fr: "Découvrir l'Algérie romaine",
      ar: "استكشف الجزائر الرومانية",
    },
    unesco: true,
    illustrative: true,
  },
  {
    id: "casbah",
    title: { en: "Casbah of Algiers", fr: "Casbah d'Alger", ar: "قصبة الجزائر" },
    teaser: {
      en: "White stairs cascading toward the sea, an Ottoman medina that outlived empires.",
      fr: "Des escaliers blancs qui dévalent vers la mer, une médina ottomane qui a survécu aux empires.",
      ar: "درجات بيضاء تنحدر نحو البحر، مدينةٌ عثمانية عاشت بعد الإمبراطوريات.",
    },
    image: casbahHero,
    publishedAt: "2025-07-20",
    themes: ["unesco", "architecture", "regions", "culture"],
    target: { kind: "region", regionId: "algiers" },
    cta: {
      en: "Visit the Algiers gallery",
      fr: "Visiter la galerie d'Alger",
      ar: "زُر قاعة الجزائر العاصمة",
    },
    unesco: true,
    illustrative: true,
  },
  {
    id: "tipasa",
    title: { en: "Tipasa", fr: "Tipasa", ar: "تيبازة" },
    teaser: {
      en: "Punic tombs and Roman columns on the Mediterranean shore, ruins with the sea for a wall.",
      fr: "Tombes puniques et colonnes romaines au bord de la Méditerranée, des ruines dont la mer est le mur.",
      ar: "قبورٌ بونية وأعمدة رومانية على شاطئ المتوسط، أطلالٌ جدارها البحر.",
    },
    image: tipasaHero,
    publishedAt: "2026-07-30",
    themes: ["ancient", "unesco", "regions"],
    target: { kind: "era", eraId: "roman" },
    cta: {
      en: "Explore Roman Algeria",
      fr: "Découvrir l'Algérie romaine",
      ar: "استكشف الجزائر الرومانية",
    },
    unesco: true,
    illustrative: true,
  },
];
