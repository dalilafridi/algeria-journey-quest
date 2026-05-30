/**
 * Legend era system — every figure visibly belongs to one of six great eras
 * of Algerian history. Used by the Hall of Legends gallery and the figure
 * exhibition pages to anchor each person in a single curated collection,
 * branded with the shared engraved era medallion (EraBadge).
 */

import type { FigureCategory } from "@/data/figures";
import type { EraBadgeKind } from "@/components/brand/EraBadge";
import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type LegendEra =
  | "numidian"
  | "roman"
  | "islamic"
  | "ottoman"
  | "colonial"
  | "independence";

export type LegendEraDef = {
  id: LegendEra;
  badge: EraBadgeKind;
  label: LocalizedString;
  tagline: LocalizedString;
  categories: FigureCategory[];
};

/** Chronological collections — the structure of the Hall of Legends. */
export const LEGEND_ERAS: LegendEraDef[] = [
  {
    id: "numidian",
    badge: "numidia",
    label: L("Numidian Era", "Ère numide", "العصر النوميدي"),
    tagline: L(
      "Kings and warriors of ancient North Africa.",
      "Rois et guerriers de l'Afrique du Nord antique.",
      "ملوك ومحاربو شمال إفريقيا القديم.",
    ),
    categories: ["ancient"],
  },
  {
    id: "roman",
    badge: "roman",
    label: L("Roman & Late Antiquity", "Romaine & Antiquité tardive", "الرومان والعصور القديمة المتأخرة"),
    tagline: L(
      "Thinkers and saints of a Mediterranean world.",
      "Penseurs et saints d'un monde méditerranéen.",
      "مفكرون وقديسون في عالم متوسطي.",
    ),
    categories: ["roman"],
  },
  {
    id: "islamic",
    badge: "islamic",
    label: L("Islamic & Medieval Era", "Ère islamique & médiévale", "العصر الإسلامي والوسيط"),
    tagline: L(
      "Scholars, mystics and early defenders of the land.",
      "Savants, mystiques et premiers défenseurs de la terre.",
      "علماء وصوفية وأوائل المدافعين عن الأرض.",
    ),
    categories: ["early-islamic", "early-resistance"],
  },
  {
    id: "ottoman",
    badge: "ottoman",
    label: L("Ottoman Period", "Période ottomane", "العهد العثماني"),
    tagline: L(
      "Rulers and corsairs of the Regency of Algiers.",
      "Dirigeants et corsaires de la Régence d'Alger.",
      "حكام وبحّارة إيالة الجزائر.",
    ),
    categories: ["ottoman"],
  },
  {
    id: "colonial",
    badge: "french",
    label: L("Colonial Resistance", "Résistance coloniale", "المقاومة الاستعمارية"),
    tagline: L(
      "Those who stood against a century of occupation.",
      "Ceux qui résistèrent à un siècle d'occupation.",
      "من وقفوا في وجه قرن من الاحتلال.",
    ),
    categories: ["colonial-resistance"],
  },
  {
    id: "independence",
    badge: "independence",
    label: L("Independence & Modern Algeria", "Indépendance & Algérie moderne", "الاستقلال والجزائر الحديثة"),
    tagline: L(
      "Revolutionaries, poets, thinkers and artists of a free nation.",
      "Révolutionnaires, poètes, penseurs et artistes d'une nation libre.",
      "ثوار وشعراء ومفكرون وفنانو أمة حرّة.",
    ),
    categories: [
      "war-of-independence",
      "post-independence",
      "intellectuals-culture",
      "cultural-identity",
      "cinema-film",
    ],
  },
];

const CATEGORY_TO_ERA = new Map<FigureCategory, LegendEra>();
LEGEND_ERAS.forEach((e) => e.categories.forEach((c) => CATEGORY_TO_ERA.set(c, e.id)));

const ERA_BY_ID = new Map<LegendEra, LegendEraDef>();
LEGEND_ERAS.forEach((e) => ERA_BY_ID.set(e.id, e));

/** The legend era a figure category belongs to (defaults to independence). */
export function eraOfCategory(cat: FigureCategory): LegendEra {
  return CATEGORY_TO_ERA.get(cat) ?? "independence";
}

/** Full era definition for a figure category. */
export function legendEraOf(cat: FigureCategory): LegendEraDef {
  return ERA_BY_ID.get(eraOfCategory(cat))!;
}

/** The engraved medallion kind for a figure category. */
export function badgeKindOf(cat: FigureCategory): EraBadgeKind {
  return legendEraOf(cat).badge;
}
