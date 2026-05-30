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

/* ---------------- Collection depth (wall-text) ---------------- */

/**
 * Curatorial deep content for each gallery — a longer museum introduction and a
 * "why it matters" significance note. Keyed by row id; rows without an entry
 * fall back gracefully to their tagline.
 */
export type RowDeep = { intro: LocalizedString; significance: LocalizedString };

export const ROW_DEEP: Record<string, RowDeep> = {
  resistance: {
    intro: L(
      "From ancient rebels to the great leaders of the anti-colonial struggle, this room gathers the defenders of the land — those who chose to stand when standing cost everything.",
      "Des rebelles antiques aux grands chefs de la lutte anticoloniale, cette salle réunit les défenseurs de la terre — ceux qui choisirent de résister quand résister coûtait tout.",
      "من ثوار القدماء إلى كبار قادة الكفاح ضد الاستعمار، تجمع هذه القاعة المدافعين عن الأرض — من اختاروا الوقوف حين كان الوقوف يكلّف كل شيء.",
    ),
    significance: L(
      "Their resistance became the moral spine of Algerian identity: proof that a people could refuse domination across centuries, and a memory the nation still draws strength from today.",
      "Leur résistance devint la colonne vertébrale morale de l'identité algérienne : la preuve qu'un peuple pouvait refuser la domination à travers les siècles, et une mémoire dont la nation tire encore sa force.",
      "غدت مقاومتهم العمود الأخلاقي للهوية الجزائرية: دليلٌ على أن شعبًا يستطيع رفض الهيمنة عبر القرون، وذاكرةٌ ما زالت الأمة تستمدّ منها قوّتها.",
    ),
  },
  revolutionaries: {
    intro: L(
      "The generation of November 1954 — organisers, strategists and martyrs who turned a clandestine network into a revolution and a revolution into a free state.",
      "La génération de novembre 1954 — organisateurs, stratèges et martyrs qui firent d'un réseau clandestin une révolution, et d'une révolution un État libre.",
      "جيل نوفمبر 1954 — منظّمون واستراتيجيون وشهداء حوّلوا شبكة سرية إلى ثورة، والثورة إلى دولة حرة.",
    ),
    significance: L(
      "They paid for independence with their lives, and their names became the founding language of the republic — streets, schools and the collective memory of a nation born in 1962.",
      "Ils payèrent l'indépendance de leur vie, et leurs noms devinrent la langue fondatrice de la république — rues, écoles et mémoire collective d'une nation née en 1962.",
      "دفعوا الاستقلال بأرواحهم، فصارت أسماؤهم اللغة المؤسِّسة للجمهورية — شوارع ومدارس وذاكرة جماعية لأمة وُلدت عام 1962.",
    ),
  },
  women: {
    intro: L(
      "Queens, fighters, writers and singers — a gallery for the women whose courage and voice carried Algeria across every era, often without the recognition their deeds deserved.",
      "Reines, combattantes, écrivaines et chanteuses — une salle pour les femmes dont le courage et la voix portèrent l'Algérie à travers chaque époque, souvent sans la reconnaissance que méritaient leurs actes.",
      "ملكات ومقاتلات وكاتبات ومغنيات — قاعة للنساء اللواتي حملت شجاعتهنّ وأصواتهنّ الجزائر عبر كل العصور، غالبًا دون ما تستحقه أفعالهنّ من تقدير.",
    ),
    significance: L(
      "Together they rewrite the story of the nation as one shaped as much by women as by men — from the throne of the Aurès to the prisons of the war and the pages of world literature.",
      "Ensemble, elles réécrivent l'histoire de la nation comme une histoire façonnée autant par les femmes que par les hommes — du trône des Aurès aux prisons de la guerre et aux pages de la littérature mondiale.",
      "معًا يُعِدن كتابة قصة الأمة بوصفها قصة صنعتها النساء كما صنعها الرجال — من عرش الأوراس إلى سجون الحرب وصفحات الأدب العالمي.",
    ),
  },
  rulers: {
    intro: L(
      "Kings, dynasty founders and heads of state — the builders of order, from the unified kingdom of ancient Numidia to the leaders of the modern republic.",
      "Rois, fondateurs de dynasties et chefs d'État — les bâtisseurs de l'ordre, du royaume unifié de la Numidie antique aux dirigeants de la république moderne.",
      "ملوك ومؤسسو دول ورؤساء — بُناة النظام، من مملكة نوميديا القديمة الموحّدة إلى قادة الجمهورية الحديثة.",
    ),
    significance: L(
      "Their statecraft gave North Africa some of its earliest political structures and, much later, the institutions of a sovereign Algeria.",
      "Leur art de gouverner donna à l'Afrique du Nord certaines de ses premières structures politiques et, bien plus tard, les institutions d'une Algérie souveraine.",
      "منحت سياستهم شمال إفريقيا بعضًا من أولى بُناه السياسية، ثم — بعد قرون — مؤسسات جزائر ذات سيادة.",
    ),
  },
  thinkers: {
    intro: L(
      "Philosophers, historians and theorists born of this soil whose ideas crossed centuries and continents — a room where Algeria thinks aloud.",
      "Philosophes, historiens et théoriciens nés de cette terre, dont les idées traversèrent siècles et continents — une salle où l'Algérie pense à voix haute.",
      "فلاسفة ومؤرخون ومنظّرون من هذه الأرض عبرت أفكارهم القرون والقارات — قاعة تفكّر فيها الجزائر بصوت عالٍ.",
    ),
    significance: L(
      "From Augustine to Ibn Khaldun to Fanon, their work shaped theology, the social sciences and the very vocabulary of liberation used around the world.",
      "D'Augustin à Ibn Khaldoun à Fanon, leur œuvre a façonné la théologie, les sciences sociales et le vocabulaire même de la libération employé dans le monde entier.",
      "من أوغسطين إلى ابن خلدون إلى فانون، صاغت أعمالهم اللاهوت والعلوم الاجتماعية ومفردات التحرر ذاتها المستعملة في العالم كله.",
    ),
  },
  faith: {
    intro: L(
      "Mystics, theologians and reformers who shaped the spiritual life of the land — from the Sufi saints of the lodges to the modern movement of religious reform.",
      "Mystiques, théologiens et réformateurs qui façonnèrent la vie spirituelle du pays — des saints soufis des zaouïas au mouvement moderne de réforme religieuse.",
      "متصوفة وعلماء ومصلحون صاغوا الحياة الروحية للبلاد — من أولياء الزوايا الصوفية إلى حركة الإصلاح الديني الحديثة.",
    ),
    significance: L(
      "Their teaching bound communities together, preserved learning through hard centuries, and — in the reform era — helped reawaken a national consciousness.",
      "Leur enseignement souda les communautés, préserva le savoir à travers des siècles difficiles et — à l'ère réformiste — contribua à réveiller une conscience nationale.",
      "وحّد تعليمهم المجتمعات، وحفظ العلم عبر قرون عسيرة، وأسهم — في عصر الإصلاح — في إيقاظ وعي وطني.",
    ),
  },
  culture: {
    intro: L(
      "Poets, novelists and musicians who carried memory, language and longing — from oral tradition to chaâbi, raï and modern letters.",
      "Poètes, romanciers et musiciens porteurs de mémoire, de langue et de nostalgie — de la tradition orale au chaâbi, au raï et aux lettres modernes.",
      "شعراء وروائيون وموسيقيون حملوا الذاكرة واللغة والحنين — من التراث الشفوي إلى الشعبي والراي والأدب الحديث.",
    ),
    significance: L(
      "They kept the soul of a people audible under censorship and exile, turning songs and stories into the most durable archive of Algerian identity.",
      "Ils gardèrent l'âme d'un peuple audible sous la censure et l'exil, faisant des chansons et des récits l'archive la plus durable de l'identité algérienne.",
      "أبقوا روح شعب مسموعةً تحت الرقابة والمنفى، فجعلوا من الأغاني والحكايات أكثر أرشيف للهوية الجزائرية بقاءً.",
    ),
  },
  modern: {
    intro: L(
      "Statesmen, filmmakers and contemporary artists holding up a mirror to a changing nation, on screens and stages at home and abroad.",
      "Hommes d'État, cinéastes et artistes contemporains qui tendent un miroir à une nation en mouvement, sur les écrans et les scènes d'ici et d'ailleurs.",
      "رجال دولة وسينمائيون وفنانون معاصرون يرفعون مرآة لأمة متحوّلة، على الشاشات والمسارح في الداخل والخارج.",
    ),
    significance: L(
      "They translate Algeria for a new century — winning the world's highest honours while asking, at home, what the nation has become and might still be.",
      "Ils traduisent l'Algérie pour un siècle nouveau — remportant les plus hautes distinctions mondiales tout en interrogeant, chez eux, ce que la nation est devenue et pourrait encore être.",
      "يترجمون الجزائر لقرن جديد — يفوزون بأرفع جوائز العالم بينما يسائلون، في الداخل، ما صارت إليه الأمة وما قد تصير.",
    ),
  },
};

/** Wall-text deep content for a row, if curated. */
export function rowDeep(row: DiscoveryRow): RowDeep | undefined {
  return ROW_DEEP[row.id];
}

/* ---------------- Relations between rows ---------------- */

/** The set of figure ids in a row (resolved + de-duplicated). */
function rowFigureIdSet(row: DiscoveryRow): Set<string> {
  return new Set(resolveRow(row).map((f) => f.id));
}

/**
 * Related rows — other galleries that share members with this one, ranked by
 * overlap. Used to power "continue discovering" at the foot of a collection.
 */
export function relatedRows(row: DiscoveryRow, pool: DiscoveryRow[], limit = 4): DiscoveryRow[] {
  const mine = rowFigureIdSet(row);
  const scored = pool
    .filter((r) => r.id !== row.id)
    .map((r) => {
      const ids = rowFigureIdSet(r);
      let overlap = 0;
      ids.forEach((id) => {
        if (mine.has(id)) overlap += 1;
      });
      return { row: r, overlap };
    })
    .filter((s) => s.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);
  return scored.slice(0, limit).map((s) => s.row);
}

/** Figures appearing in related galleries but NOT in this one (discovery tail). */
export function relatedFiguresForRow(row: DiscoveryRow, limit = 8): Figure[] {
  const mine = rowFigureIdSet(row);
  const related = relatedRows(row, ALL_ROWS, 6);
  const seen = new Set<string>();
  const out: Figure[] = [];
  for (const r of related) {
    for (const f of resolveRow(r)) {
      if (mine.has(f.id) || seen.has(f.id)) continue;
      seen.add(f.id);
      out.push(f);
      if (out.length >= limit) return out;
    }
  }
  return out;
}


