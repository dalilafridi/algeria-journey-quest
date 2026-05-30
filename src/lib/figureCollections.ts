/**
 * Hall of Legends — curated museum collections.
 *
 * Figures are no longer presented as a flat searchable directory. Instead the
 * hall is organised into themed galleries ("collections"), each dedicated to a
 * kind of legend: leaders, warriors, revolutionaries, scholars, religious
 * figures, poets & artists, and modern voices. Every figure belongs to exactly
 * one gallery, so visitors walk from room to room rather than scrolling a list.
 */

import { figures, type FigureCategory } from "@/data/figures";
import type { EraBadgeKind } from "@/components/brand/EraBadge";
import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type CollectionId =
  | "leaders"
  | "warriors"
  | "revolutionaries"
  | "religious"
  | "scholars"
  | "poets"
  | "modern";

export type CollectionDef = {
  id: CollectionId;
  /** Emblem glyph shown on the gallery plaque (kept within the bronze system). */
  emblem: string;
  /** Engraved era medallion used as the room's seal. */
  badge: EraBadgeKind;
  label: LocalizedString;
  /** One curatorial line describing the gallery. */
  tagline: LocalizedString;
  /** Longer wall-text intro for the gallery. */
  intro: LocalizedString;
  /** CSS color token used as the gallery accent. */
  accent: string;
  /** Curated figure ids, in display order. */
  members: string[];
};

/**
 * The order below is the order visitors walk the hall — from the founders of
 * the land, through its defenders and revolutionaries, to its thinkers,
 * faith-keepers, artists and modern voices.
 */
export const COLLECTIONS: CollectionDef[] = [
  {
    id: "leaders",
    emblem: "♔",
    badge: "numidia",
    label: L("Leaders & Statesmen", "Chefs & hommes d'État", "القادة ورجال الدولة"),
    tagline: L(
      "Kings, dynasty founders and heads of a nation.",
      "Rois, fondateurs de dynasties et chefs d'une nation.",
      "ملوك ومؤسسو دول وقادة أمة.",
    ),
    intro: L(
      "Those who built kingdoms, founded dynasties and steered the destiny of the state — from ancient Numidia to the modern republic.",
      "Ceux qui ont bâti des royaumes, fondé des dynasties et guidé le destin de l'État — de la Numidie antique à la république moderne.",
      "من بنوا الممالك وأسّسوا الدول ووجّهوا مصير الدولة — من نوميديا القديمة إلى الجمهورية الحديثة.",
    ),
    accent: "var(--brand-gold-deep)",
    members: [
      "massinissa",
      "syphax",
      "juba-i",
      "juba-ii",
      "ptolemy-mauretania",
      "septimius-severus",
      "yaghmurasen",
      "ibn-rustam",
      "ziri-ibn-manad",
      "buluggin-ibn-ziri",
      "hammad-ibn-buluggin",
      "yusuf-ibn-tashfin",
      "abd-al-mumin",
      "hassan-pacha",
      "baba-ali-chaouch",
      "messali-hadj",
      "ferhat-abbas",
      "ben-bella",
      "boumediene",
      "boudiaf",
      "benyoucef-benkhedda",
      "ait-ahmed",
    ],
  },
  {
    id: "warriors",
    emblem: "⚔",
    badge: "french",
    label: L("Warriors & Resistance", "Guerriers & Résistance", "المحاربون والمقاومة"),
    tagline: L(
      "Defenders who stood against empire and occupation.",
      "Défenseurs dressés contre l'empire et l'occupation.",
      "مدافعون وقفوا في وجه الإمبراطورية والاحتلال.",
    ),
    intro: L(
      "Sword-bearers of the land across the ages — ancient rebels, corsairs of the regency, and the great leaders of anti-colonial resistance.",
      "Porteurs de l'épée à travers les âges — rebelles antiques, corsaires de la régence et grands chefs de la résistance anticoloniale.",
      "حملة السيف عبر العصور — ثوار القدماء وبحّارة الإيالة وكبار قادة المقاومة ضد الاستعمار.",
    ),
    accent: "var(--primary)",
    members: [
      "jugurtha",
      "tacfarinas",
      "dihya",
      "kusayla",
      "firmus",
      "tariq-ibn-ziyad",
      "aruj-barbarossa",
      "barbarossa",
      "salah-rais",
      "rais-hamidou",
      "abdelkader",
      "ahmed-bey",
      "lalla-fatma-nsoumer",
      "el-mokrani",
      "cheikh-aheddad",
      "bou-baghla",
      "ben-nacer-benchohra",
      "si-el-haoussi",
      "ahmed-bouderba",
    ],
  },
  {
    id: "revolutionaries",
    emblem: "✶",
    badge: "independence",
    label: L("Revolutionaries", "Révolutionnaires", "الثوار"),
    tagline: L(
      "The generation that lit the war of independence.",
      "La génération qui alluma la guerre d'indépendance.",
      "الجيل الذي أشعل حرب الاستقلال.",
    ),
    intro: L(
      "The architects and martyrs of 1954 — those who organised, fought and fell for a free Algeria.",
      "Les architectes et martyrs de 1954 — ceux qui organisèrent, combattirent et tombèrent pour une Algérie libre.",
      "صنّاع وشهداء 1954 — من نظّموا وقاتلوا واستشهدوا من أجل جزائر حرة.",
    ),
    accent: "var(--primary)",
    members: [
      "mostefa-ben-boulaid",
      "didouche-mourad",
      "ben-mhidi",
      "krim-belkacem",
      "rabah-bitat",
      "abane-ramdane",
      "zighoud-youcef",
      "amirouche",
      "ali-la-pointe",
      "hassiba-ben-bouali",
      "djamila-bouhired",
      "djamila-boupacha",
    ],
  },
  {
    id: "religious",
    emblem: "☾",
    badge: "islamic",
    label: L("Religious Figures", "Figures religieuses", "أعلام الدين"),
    tagline: L(
      "Saints, reformers and keepers of faith.",
      "Saints, réformateurs et gardiens de la foi.",
      "أولياء ومصلحون وحفظة الإيمان.",
    ),
    intro: L(
      "Mystics, theologians and reformers who shaped the spiritual life of the land — from Sufi saints to the modern reform movement.",
      "Mystiques, théologiens et réformateurs qui ont façonné la vie spirituelle du pays — des saints soufis au mouvement réformiste moderne.",
      "متصوفة وعلماء ومصلحون صاغوا الحياة الروحية للبلاد — من أولياء التصوف إلى حركة الإصلاح الحديثة.",
    ),
    accent: "var(--secondary)",
    members: ["augustine", "sidi-boumediene", "ibn-tumart", "ben-badis"],
  },
  {
    id: "scholars",
    emblem: "✦",
    badge: "roman",
    label: L("Scholars & Thinkers", "Savants & Penseurs", "العلماء والمفكرون"),
    tagline: L(
      "Minds that gave the world a way of seeing.",
      "Des esprits qui offrirent au monde une façon de voir.",
      "عقول منحت العالم طريقة في الرؤية.",
    ),
    intro: L(
      "Philosophers, historians and theorists born of this soil whose ideas crossed centuries and continents.",
      "Philosophes, historiens et théoriciens nés de cette terre, dont les idées ont traversé siècles et continents.",
      "فلاسفة ومؤرخون ومنظّرون من هذه الأرض عبرت أفكارهم القرون والقارات.",
    ),
    accent: "var(--brand-gold-deep)",
    members: [
      "apuleius",
      "ibn-khaldun",
      "amar-imache",
      "malek-bennabi",
      "frantz-fanon",
      "tassadit-yacine",
    ],
  },
  {
    id: "poets",
    emblem: "❧",
    badge: "ottoman",
    label: L("Poets & Artists", "Poètes & Artistes", "الشعراء والفنانون"),
    tagline: L(
      "The voices that sang the soul of a people.",
      "Les voix qui ont chanté l'âme d'un peuple.",
      "الأصوات التي غنّت روح شعب.",
    ),
    intro: L(
      "Poets, novelists and musicians who carried memory, language and longing — from oral tradition to chaâbi, raï and modern letters.",
      "Poètes, romanciers et musiciens porteurs de mémoire, de langue et de nostalgie — de la tradition orale au chaâbi, au raï et aux lettres modernes.",
      "شعراء وروائيون وموسيقيون حملوا الذاكرة واللغة والحنين — من التراث الشفوي إلى الشعبي والراي والأدب الحديث.",
    ),
    accent: "var(--accent)",
    members: [
      "mohamed-belkheir",
      "el-anka",
      "moufdi-zakaria",
      "kateb-yacine",
      "mouloud-feraoun",
      "mammeri",
      "dib",
      "haddad",
      "assia-djebar",
      "fadhma-amrouche",
      "taos-amrouche",
      "jean-amrouche",
      "amrouche-family-thread",
      "idir",
      "ait-menguellet",
      "matoub",
      "yacine-titouh",
      "warda",
      "khaled",
      "rachid-taha",
    ],
  },
  {
    id: "modern",
    emblem: "◉",
    badge: "independence",
    label: L("Modern Voices", "Voix modernes", "أصوات معاصرة"),
    tagline: L(
      "Storytellers framing Algeria for a new century.",
      "Conteurs qui racontent l'Algérie d'un nouveau siècle.",
      "رواة يصوغون صورة الجزائر لقرن جديد.",
    ),
    intro: L(
      "Filmmakers and contemporary artists holding up a mirror to a changing nation, on screens at home and abroad.",
      "Cinéastes et artistes contemporains qui tendent un miroir à une nation en mouvement, sur les écrans d'ici et d'ailleurs.",
      "سينمائيون وفنانون معاصرون يرفعون مرآة لأمة متحوّلة، على الشاشات في الداخل والخارج.",
    ),
    accent: "var(--secondary)",
    members: [
      "mohammed-lakhdar-hamina",
      "merzak-allouache",
      "rachid-bouchareb",
      "yamina-bachir-chouikh",
      "djamila-sahraoui",
      "lyes-salem",
      "habiba-djahnine",
      "karim-moussaoui",
      "narimane-mari",
    ],
  },
];

/** Fallback assignment by category, used only if a figure is not curated above. */
const CATEGORY_FALLBACK: Record<FigureCategory, CollectionId> = {
  ancient: "leaders",
  roman: "scholars",
  "early-islamic": "leaders",
  ottoman: "warriors",
  "early-resistance": "warriors",
  "colonial-resistance": "warriors",
  "war-of-independence": "revolutionaries",
  "post-independence": "leaders",
  "intellectuals-culture": "poets",
  "cultural-identity": "poets",
  "cinema-film": "modern",
};

const COLLECTION_BY_FIGURE = new Map<string, CollectionId>();
COLLECTIONS.forEach((c) => c.members.forEach((id) => COLLECTION_BY_FIGURE.set(id, c.id)));

const COLLECTION_BY_ID = new Map<CollectionId, CollectionDef>();
COLLECTIONS.forEach((c) => COLLECTION_BY_ID.set(c.id, c));

/** The collection a figure belongs to (curated first, then category fallback). */
export function collectionOf(figureId: string): CollectionDef {
  const explicit = COLLECTION_BY_FIGURE.get(figureId);
  if (explicit) return COLLECTION_BY_ID.get(explicit)!;
  const fig = figures.find((f) => f.id === figureId);
  const fallback = fig ? CATEGORY_FALLBACK[fig.category] : "leaders";
  return COLLECTION_BY_ID.get(fallback)!;
}

export function getCollection(id: CollectionId): CollectionDef {
  return COLLECTION_BY_ID.get(id)!;
}

/**
 * The rotating "Current Exhibition" headline legend. Chosen from a curated
 * pool of the most iconic figures and rotated by day so the hall feels alive.
 */
const SPOTLIGHT_POOL = [
  "abdelkader",
  "massinissa",
  "jugurtha",
  "dihya",
  "lalla-fatma-nsoumer",
  "ibn-khaldun",
  "abane-ramdane",
  "ben-badis",
];

export function currentExhibitionId(date = new Date()): string {
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  const pool = SPOTLIGHT_POOL.filter((id) => figures.some((f) => f.id === id));
  if (pool.length === 0) return figures[0]?.id ?? "";
  return pool[dayIndex % pool.length];
}
