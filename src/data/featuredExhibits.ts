/**
 * Featured (flagship) exhibits shown on the museum entrance hall (homepage).
 *
 * Each entry describes a single museum-quality exhibit already published in
 * the app. Adding a new flagship exhibit is a one-line append to
 * `FEATURED_EXHIBITS` — the homepage will render it automatically.
 *
 * `target` is discriminated so we can render TanStack's typed <Link>
 * without loosening router types.
 */

import type { LocalizedString } from "@/lib/i18n";

import mzabHero from "@/assets/mzab-hero.jpg";
import kabylieHero from "@/assets/exhibit-kabylie.jpg";
import timgadHero from "@/assets/exhibit-timgad.jpg";
import tassiliHero from "@/assets/exhibit-tassili.jpg";
import casbahHero from "@/assets/exhibit-casbah.jpg";
import footballHero from "@/assets/football-hero-vitrine.jpg";

export type ExhibitTarget =
  | { kind: "mzab" }
  | { kind: "football" }
  | { kind: "region"; regionId: string }
  | { kind: "era"; eraId: string }
  | { kind: "club"; clubId: string };

export type FeaturedExhibit = {
  id: string;
  title: LocalizedString;
  teaser: LocalizedString;
  image: string;
  /** ISO date the exhibit was first published — powers "Latest Exhibits". */
  publishedAt: string;
  themes: ThemeId[];
  target: ExhibitTarget;
  /**
   * Optional CTA override. Use when the destination is a broader gallery
   * (region, era) rather than a dedicated standalone exhibit, so visitors
   * know what room they are entering.
   */
  cta?: LocalizedString;
  /**
   * Optional flag: mark true when the hero image is illustrative /
   * generated rather than a documentary archival photograph.
   */
  illustrative?: boolean;
};

export type ThemeId =
  | "ancient"
  | "unesco"
  | "regions"
  | "architecture"
  | "culture"
  | "cuisine"
  | "figures"
  | "football";

export const MUSEUM_THEMES: {
  id: ThemeId;
  title: LocalizedString;
  hint: LocalizedString;
  to: { pathname: string; hash?: string };
}[] = [
  {
    id: "ancient",
    title: { en: "Ancient Civilizations", fr: "Civilisations antiques", ar: "الحضارات القديمة" },
    hint: { en: "Numidia, Rome, early kingdoms", fr: "Numidie, Rome, royaumes anciens", ar: "نوميديا، روما، الممالك القديمة" },
    to: { pathname: "/timeline" },
  },
  {
    id: "unesco",
    title: { en: "UNESCO Heritage", fr: "Patrimoine UNESCO", ar: "التراث العالمي لليونسكو" },
    hint: { en: "World-heritage sites of Algeria", fr: "Sites du patrimoine mondial", ar: "مواقع التراث العالمي" },
    to: { pathname: "/atlas" },
  },
  {
    id: "regions",
    title: { en: "Regions", fr: "Régions", ar: "المناطق" },
    hint: { en: "Six landscapes, one country", fr: "Six paysages, un pays", ar: "ستّ مناطق، بلد واحد" },
    to: { pathname: "/map" },
  },
  {
    id: "architecture",
    title: { en: "Architecture", fr: "Architecture", ar: "العمارة" },
    hint: { en: "Ksour, mosques, medinas", fr: "Ksour, mosquées, médinas", ar: "قصور، مساجد، مدن" },
    to: { pathname: "/mzab" },
  },
  {
    id: "culture",
    title: { en: "Culture", fr: "Culture", ar: "الثقافة" },
    hint: { en: "Words, cinema, ideas", fr: "Mots, cinéma, idées", ar: "كلمات، سينما، أفكار" },
    to: { pathname: "/culture" },
  },
  {
    id: "cuisine",
    title: { en: "Cuisine", fr: "Cuisine", ar: "المطبخ" },
    hint: { en: "Flavours across the land", fr: "Les saveurs du pays", ar: "نكهات البلاد" },
    to: { pathname: "/cuisine" },
  },
  {
    id: "figures",
    title: { en: "Historical Figures", fr: "Figures historiques", ar: "الشخصيات التاريخية" },
    hint: { en: "The people who shaped Algeria", fr: "Celles et ceux qui ont façonné l'Algérie", ar: "الذين شكّلوا الجزائر" },
    to: { pathname: "/figures" },
  },
  {
    id: "football",
    title: { en: "Football", fr: "Football", ar: "كرة القدم" },
    hint: { en: "Les Verts, Les Vertes, the clubs", fr: "Les Verts, Les Vertes, les clubs", ar: "الخضر، الخضراوات، الأندية" },
    to: { pathname: "/football" },
  },
];

/**
 * The flagship collection. Add or remove entries freely — the homepage grid,
 * curator's pick rotation and "Latest Exhibits" strip will pick up changes.
 */
export const FEATURED_EXHIBITS: FeaturedExhibit[] = [
  {
    id: "mzab",
    title: { en: "The M'Zab Valley", fr: "La vallée du M'Zab", ar: "وادي مزاب" },
    teaser: {
      en: "A thousand-year lesson in living with the desert — five ksour, one hydraulic mind.",
      fr: "Une leçon millénaire pour habiter le désert — cinq ksour, un même génie hydraulique.",
      ar: "درسٌ ألفيّ في العيش مع الصحراء — خمسة قصور بعقل هيدروليكي واحد.",
    },
    image: mzabHero,
    publishedAt: "2026-06-18",
    themes: ["unesco", "architecture", "regions"],
    target: { kind: "mzab" },
  },
  {
    id: "kabylie",
    title: { en: "Kabylie", fr: "Kabylie", ar: "بلاد القبائل" },
    teaser: {
      en: "Mountain villages, Amazigh memory and a language that refused to disappear.",
      fr: "Villages de montagne, mémoire amazighe et une langue qui a refusé de disparaître.",
      ar: "قرى الجبال، ذاكرة أمازيغية ولغةٌ رفضت أن تختفي.",
    },
    image: kabylieHero,
    publishedAt: "2025-11-02",
    themes: ["regions", "culture", "figures"],
    target: { kind: "region", regionId: "kabylie" },
  },
  {
    id: "timgad",
    title: { en: "Timgad", fr: "Timgad", ar: "تيمقاد" },
    teaser: {
      en: "A Roman city planned as a grid on the edge of the Aurès — arches, streets, silence.",
      fr: "Une cité romaine tracée en damier aux portes de l'Aurès — arcs, rues, silence.",
      ar: "مدينة رومانية مرسومة كشبكة على تخوم الأوراس — أقواس وشوارع وصمت.",
    },
    image: timgadHero,
    publishedAt: "2025-09-14",
    themes: ["ancient", "unesco", "architecture"],
    target: { kind: "era", eraId: "roman" },
  },
  {
    id: "tassili",
    title: { en: "Tassili n'Ajjer", fr: "Tassili n'Ajjer", ar: "طاسيلي ناجّر" },
    teaser: {
      en: "Sandstone galleries painted before writing existed — a Saharan prehistory in colour.",
      fr: "Des galeries de grès peintes avant l'écriture — une préhistoire saharienne en couleur.",
      ar: "أروقة من الحجر الرملي رُسمت قبل أن تُخترع الكتابة — عصور ما قبل التاريخ بألوانها.",
    },
    image: tassiliHero,
    publishedAt: "2025-08-01",
    themes: ["ancient", "unesco", "regions"],
    target: { kind: "era", eraId: "earlynorthafrica" },
  },
  {
    id: "casbah",
    title: { en: "Casbah of Algiers", fr: "Casbah d'Alger", ar: "قصبة الجزائر" },
    teaser: {
      en: "White stairs cascading toward the sea — an Ottoman medina that outlived empires.",
      fr: "Des escaliers blancs qui dévalent vers la mer — une médina ottomane qui a survécu aux empires.",
      ar: "درجات بيضاء تنحدر نحو البحر — مدينةٌ عثمانية عاشت بعد الإمبراطوريات.",
    },
    image: casbahHero,
    publishedAt: "2025-07-20",
    themes: ["unesco", "architecture", "regions", "culture"],
    target: { kind: "region", regionId: "algiers" },
  },
  {
    id: "football",
    title: { en: "Hall of Algerian Football", fr: "Hall du football algérien", ar: "قاعة الكرة الجزائرية" },
    teaser: {
      en: "From the FLN team of 1958 to Les Vertes — a nation, told through ninety minutes.",
      fr: "De l'équipe FLN de 1958 aux Vertes — une nation, racontée en quatre-vingt-dix minutes.",
      ar: "من فريق جبهة التحرير 1958 إلى الخضراوات — أمّةٌ تُروى في تسعين دقيقة.",
    },
    image: footballHero,
    publishedAt: "2026-04-10",
    themes: ["football", "culture", "figures"],
    target: { kind: "football" },
  },
];
