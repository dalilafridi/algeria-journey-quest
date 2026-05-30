/**
 * Hall of Legends — discovery model ("Netflix for Algerian history").
 *
 * The hall is browsed, not filtered. Figures are surfaced through curated,
 * horizontally-scrolling rows: thematic collections (resistance leaders,
 * thinkers, women who shaped Algeria…) and chronological era rows (Numidian,
 * Roman, Islamic…). Search and filters remain available but secondary.
 *
 * Rows reuse the curated membership from `figureCollections` where possible so
 * there is a single source of truth, and add cross-cutting rows (e.g. women)
 * that span every gallery.
 */

import { figures, type Figure, type FigureCategory } from "@/data/figures";
import type { EraBadgeKind } from "@/components/brand/EraBadge";
import type { LocalizedString } from "@/lib/i18n";
import { COLLECTIONS, type CollectionId } from "@/lib/figureCollections";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type DiscoveryRow = {
  id: string;
  /** Engraved era medallion used as the row seal. */
  badge: EraBadgeKind;
  /** Emblem glyph (kept within the bronze system). */
  emblem: string;
  /** CSS color token used as the row accent. */
  accent: string;
  label: LocalizedString;
  tagline: LocalizedString;
  /** Curated figure ids, in display order. */
  members: string[];
};

const collectionMembers = (id: CollectionId): string[] =>
  COLLECTIONS.find((c) => c.id === id)?.members ?? [];

/** Women who shaped Algeria — a cross-cutting row that spans every gallery. */
const WOMEN_IDS = [
  "dihya",
  "lalla-fatma-nsoumer",
  "djamila-bouhired",
  "hassiba-ben-bouali",
  "djamila-boupacha",
  "assia-djebar",
  "fadhma-amrouche",
  "taos-amrouche",
  "warda",
  "tassadit-yacine",
  "yamina-bachir-chouikh",
  "djamila-sahraoui",
  "habiba-djahnine",
  "narimane-mari",
];

/**
 * Thematic discovery rows — the curated "collections" a visitor browses first.
 * Order is the order they appear down the hall.
 */
export const DISCOVERY_ROWS: DiscoveryRow[] = [
  {
    id: "resistance",
    badge: "french",
    emblem: "⚔",
    accent: "var(--primary)",
    label: L("Resistance Leaders", "Chefs de la résistance", "قادة المقاومة"),
    tagline: L(
      "Those who stood against empire and occupation.",
      "Ceux qui se dressèrent contre l'empire et l'occupation.",
      "من وقفوا في وجه الإمبراطورية والاحتلال.",
    ),
    members: collectionMembers("warriors"),
  },
  {
    id: "revolutionaries",
    badge: "independence",
    emblem: "✶",
    accent: "var(--primary)",
    label: L("Revolutionaries", "Révolutionnaires", "الثوار"),
    tagline: L(
      "The generation that lit the war of independence.",
      "La génération qui alluma la guerre d'indépendance.",
      "الجيل الذي أشعل حرب الاستقلال.",
    ),
    members: collectionMembers("revolutionaries"),
  },
  {
    id: "women",
    badge: "independence",
    emblem: "✿",
    accent: "var(--accent)",
    label: L("Women Who Shaped Algeria", "Femmes qui ont façonné l'Algérie", "نساء صنعن الجزائر"),
    tagline: L(
      "Queens, fighters, writers and voices that carried a nation.",
      "Reines, combattantes, écrivaines et voix porteuses d'une nation.",
      "ملكات ومقاتلات وكاتبات وأصوات حملت أمّة.",
    ),
    members: WOMEN_IDS,
  },
  {
    id: "rulers",
    badge: "numidia",
    emblem: "♔",
    accent: "var(--brand-gold-deep)",
    label: L("Kings & Rulers", "Rois & souverains", "ملوك وحكام"),
    tagline: L(
      "Founders of kingdoms and heads of a nation.",
      "Fondateurs de royaumes et chefs d'une nation.",
      "مؤسسو ممالك وقادة أمة.",
    ),
    members: collectionMembers("leaders"),
  },
  {
    id: "thinkers",
    badge: "roman",
    emblem: "✦",
    accent: "var(--brand-gold-deep)",
    label: L("Great Thinkers", "Grands penseurs", "كبار المفكرين"),
    tagline: L(
      "Minds that gave the world a way of seeing.",
      "Des esprits qui offrirent au monde une façon de voir.",
      "عقول منحت العالم طريقة في الرؤية.",
    ),
    members: collectionMembers("scholars"),
  },
  {
    id: "faith",
    badge: "islamic",
    emblem: "☾",
    accent: "var(--secondary)",
    label: L("Saints & Reformers", "Saints & réformateurs", "أولياء ومصلحون"),
    tagline: L(
      "Mystics, theologians and keepers of faith.",
      "Mystiques, théologiens et gardiens de la foi.",
      "متصوفة وعلماء وحفظة الإيمان.",
    ),
    members: collectionMembers("religious"),
  },
  {
    id: "culture",
    badge: "ottoman",
    emblem: "❧",
    accent: "var(--accent)",
    label: L("Voices of Culture", "Voix de la culture", "أصوات الثقافة"),
    tagline: L(
      "Poets, novelists and musicians who sang a people's soul.",
      "Poètes, romanciers et musiciens qui chantèrent l'âme d'un peuple.",
      "شعراء وروائيون وموسيقيون غنّوا روح شعب.",
    ),
    members: collectionMembers("poets"),
  },
  {
    id: "modern",
    badge: "independence",
    emblem: "◉",
    accent: "var(--secondary)",
    label: L("Builders of Modern Algeria", "Bâtisseurs de l'Algérie moderne", "بُناة الجزائر الحديثة"),
    tagline: L(
      "Statesmen, storytellers and artists of a new century.",
      "Hommes d'État, conteurs et artistes d'un siècle nouveau.",
      "رجال دولة ورواة وفنانون لقرن جديد.",
    ),
    members: collectionMembers("modern"),
  },
];

/** Chronological era rows — explore history naturally, age by age. */
type EraRowDef = {
  id: string;
  badge: EraBadgeKind;
  emblem: string;
  accent: string;
  label: LocalizedString;
  tagline: LocalizedString;
  categories: FigureCategory[];
};

const ERA_ROW_DEFS: EraRowDef[] = [
  {
    id: "era-numidian",
    badge: "numidia",
    emblem: "ⵣ",
    accent: "var(--brand-gold-deep)",
    label: L("Numidian Era", "Ère numide", "العصر النوميدي"),
    tagline: L(
      "Kings and warriors of ancient North Africa.",
      "Rois et guerriers de l'Afrique du Nord antique.",
      "ملوك ومحاربو شمال إفريقيا القديم.",
    ),
    categories: ["ancient"],
  },
  {
    id: "era-roman",
    badge: "roman",
    emblem: "✦",
    accent: "var(--muted-foreground)",
    label: L("Roman Era", "Ère romaine", "العصر الروماني"),
    tagline: L(
      "Thinkers and saints of a Mediterranean world.",
      "Penseurs et saints d'un monde méditerranéen.",
      "مفكرون وقديسون في عالم متوسطي.",
    ),
    categories: ["roman"],
  },
  {
    id: "era-islamic",
    badge: "islamic",
    emblem: "☾",
    accent: "var(--secondary)",
    label: L("Islamic Era", "Ère islamique", "العصر الإسلامي"),
    tagline: L(
      "Scholars, mystics and early defenders of the land.",
      "Savants, mystiques et premiers défenseurs de la terre.",
      "علماء وصوفية وأوائل المدافعين عن الأرض.",
    ),
    categories: ["early-islamic", "early-resistance"],
  },
  {
    id: "era-ottoman",
    badge: "ottoman",
    emblem: "❧",
    accent: "var(--accent)",
    label: L("Ottoman Era", "Ère ottomane", "العهد العثماني"),
    tagline: L(
      "Rulers and corsairs of the Regency of Algiers.",
      "Dirigeants et corsaires de la Régence d'Alger.",
      "حكام وبحّارة إيالة الجزائر.",
    ),
    categories: ["ottoman"],
  },
  {
    id: "era-colonial",
    badge: "french",
    emblem: "⚔",
    accent: "var(--primary)",
    label: L("Colonial Resistance", "Résistance coloniale", "المقاومة الاستعمارية"),
    tagline: L(
      "Those who stood against a century of occupation.",
      "Ceux qui résistèrent à un siècle d'occupation.",
      "من وقفوا في وجه قرن من الاحتلال.",
    ),
    categories: ["colonial-resistance"],
  },
  {
    id: "era-war",
    badge: "independence",
    emblem: "✶",
    accent: "var(--primary)",
    label: L("War of Independence", "Guerre d'indépendance", "حرب الاستقلال"),
    tagline: L(
      "The architects and martyrs of 1954.",
      "Les architectes et martyrs de 1954.",
      "صنّاع وشهداء 1954.",
    ),
    categories: ["war-of-independence"],
  },
  {
    id: "era-modern",
    badge: "independence",
    emblem: "◉",
    accent: "var(--secondary)",
    label: L("Modern Algeria", "Algérie moderne", "الجزائر الحديثة"),
    tagline: L(
      "Statesmen, thinkers, poets and artists of a free nation.",
      "Hommes d'État, penseurs, poètes et artistes d'une nation libre.",
      "رجال دولة ومفكرون وشعراء وفنانو أمة حرّة.",
    ),
    categories: [
      "post-independence",
      "intellectuals-culture",
      "cultural-identity",
      "cinema-film",
    ],
  },
];

export const ERA_ROWS: DiscoveryRow[] = ERA_ROW_DEFS.map((def) => ({
  id: def.id,
  badge: def.badge,
  emblem: def.emblem,
  accent: def.accent,
  label: def.label,
  tagline: def.tagline,
  members: figures.filter((f) => def.categories.includes(f.category)).map((f) => f.id),
}));

/** Resolve a row's member ids to figures, dropping any that no longer exist. */
export function resolveRow(row: DiscoveryRow): Figure[] {
  const seen = new Set<string>();
  const out: Figure[] = [];
  for (const id of row.members) {
    if (seen.has(id)) continue;
    const fig = figures.find((f) => f.id === id);
    if (fig) {
      seen.add(id);
      out.push(fig);
    }
  }
  return out;
}

/* ---------------- Collection page slugs ---------------- */

/**
 * Stable, human-readable URL slugs for every row, used by the dedicated
 * "View Collection" exhibit pages (`/figures/collection/<slug>`). Thematic and
 * era rows live in one flat namespace so a single route resolves both.
 */
const ROW_SLUGS: Record<string, string> = {
  // Thematic collections
  resistance: "resistance-leaders",
  revolutionaries: "revolutionaries",
  women: "women-who-shaped-algeria",
  rulers: "kings-and-rulers",
  thinkers: "great-thinkers",
  faith: "saints-and-reformers",
  culture: "voices-of-culture",
  modern: "builders-of-modern-algeria",
  // Era galleries
  "era-numidian": "numidian-era",
  "era-roman": "roman-late-antiquity",
  "era-islamic": "early-islamic-medieval",
  "era-ottoman": "ottoman-period",
  "era-colonial": "colonial-resistance",
  "era-war": "war-of-independence",
  "era-modern": "modern-algeria",
};

/** Every browsable row in one list (thematic collections, then era galleries). */
export const ALL_ROWS: DiscoveryRow[] = [...DISCOVERY_ROWS, ...ERA_ROWS];

/** The URL slug for a row (falls back to its id). */
export function slugOfRow(row: DiscoveryRow): string {
  return ROW_SLUGS[row.id] ?? row.id;
}

/** Resolve a URL slug back to its row, if any. */
export function findRowBySlug(slug: string): DiscoveryRow | undefined {
  return ALL_ROWS.find((row) => slugOfRow(row) === slug);
}

