/**
 * Museum search index (public exhibits only).
 *
 * A single in-memory index aggregates every published public exhibit —
 * eras, figures, collections, regions, culture topics, cuisine, football
 * (hall + les vertes + club museums + match theater), journeys, lessons,
 * cinema, quotes, and curated daily facts — so that:
 *
 *   1. The ⌘K / header search overlay can search everything at once.
 *   2. Any exhibit page can request `getRelatedExhibits(itemId)` without
 *      duplicating relationships in each page component.
 *   3. Future data files become searchable automatically the moment they
 *      are imported by their existing data-hub module.
 *
 * Studio-only content (drafts, sources, curator tools) is never touched
 * here — the index only reads from the public typed-TS data modules.
 *
 * The matcher is intentionally dependency-free:
 *   - Unicode-aware fold (accents + Arabic diacritics + tatweel).
 *   - Multi-term substring + word-prefix scoring with alias/title bonuses.
 *   - Levenshtein fallback (distance ≤ 2) for terms ≥ 4 chars so that
 *     "Numid" still returns "Numidia" and "Masinissa" still finds Massinissa.
 */

import type { LocalizedString } from "@/lib/i18n";
import { t, type Lang } from "@/lib/i18n";

import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { words, WORD_CATEGORIES } from "@/data/words";
import { lessons } from "@/data/lessons";
import { cuisineRegions } from "@/data/cuisine";
import { featuredFilms } from "@/data/cinema";
import { IDEAS } from "@/data/ideas";
import { CULTURE_TOPICS } from "@/data/cultureTopics";
import { COLLECTIONS } from "@/lib/figureCollections";
import { JOURNEYS } from "@/lib/journeys";
import { FOOTBALL_EXHIBITS } from "@/data/football";
import { LES_VERTES_HERO } from "@/data/lesVertes";
import { CLUB_MUSEUMS } from "@/data/clubs";
import { listMatchTheaterSummaries } from "@/data/matchTheater";
import { curatedFacts } from "@/data/didYouKnow";

// ---------------------------------------------------------------- Types

export type SearchKind =
  | "era"
  | "figure"
  | "collection"
  | "region"
  | "culture"
  | "word"
  | "lesson"
  | "dish"
  | "cuisine"
  | "film"
  | "cinema"
  | "idea"
  | "football"
  | "club"
  | "match"
  | "journey"
  | "fact";

/** Broad filter category chips shown above the results list. */
export type SearchCategory =
  | "all"
  | "history"
  | "football"
  | "culture"
  | "cuisine"
  | "regions"
  | "people"
  | "journeys"
  | "lessons";

export type SearchItem = {
  id: string;
  kind: SearchKind;
  emoji: string;
  title: LocalizedString;
  snippet: LocalizedString;
  context?: LocalizedString;
  href: string;
  /** Bag of trilingual strings used for relevance. */
  haystack: LocalizedString[];
  /** Curated alternate spellings / native scripts / nicknames. */
  aliases?: string[];
  /** Popularity boost (0–20). Higher = surfaces earlier for weak queries. */
  popularity?: number;
};

// ---------------------------------------------------------------- Fold

/**
 * Strip diacritics / case for forgiving matching. Works across Latin
 * accents and most Arabic diacritics so users can type "kabyl",
 * "amazigh", "صحراء" or "amir abdelkader" interchangeably.
 */
export function fold(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[\u0622\u0623\u0625]/g, "\u0627")
    .replace(/\u0629/g, "\u0647")
    .replace(/\u0649/g, "\u064A")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function flatten(value: LocalizedString | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return [value.en, value.fr, value.ar].filter(Boolean).join(" • ");
}

function buildHaystack(item: SearchItem): string {
  const base = item.haystack.map(flatten).join("  ");
  const aliasStr = item.aliases?.join("  ") ?? "";
  return fold(`${base}  ${aliasStr}`);
}

// ---------------------------------------------------------------- Aliases
// Curated alternate spellings + native-script names + nicknames.
// Keyed by SearchItem.id ("figure:massinissa", "region:kabylie", …).
// Additive: unrecognised keys are simply ignored.
const ALIASES: Record<string, string[]> = {
  // Figures
  "figure:massinissa": ["masinissa", "massinisa", "ⵎⴰⵙⵉⵏⵉⵙⵙⴰ", "ماسينيسا"],
  "figure:jugurtha": ["yugurten", "ⵢⵓⴳⵓⵔⵜⴻⵏ", "يوغرطة"],
  "figure:dihya": ["kahina", "al-kahina", "el kahina", "la kahina", "ⴷⵉⵀⵢⴰ", "ديهيا", "الكاهنة"],
  "figure:emir-abdelkader": [
    "abd el kader", "abdelkader", "amir abdelkader", "amir abd al qadir",
    "الأمير عبد القادر", "abd al-qadir",
  ],
  "figure:saint-augustine": ["augustin", "augustinus", "aurelius augustinus", "أوغسطينوس"],
  "figure:ibn-badis": ["abdelhamid ben badis", "ben badis", "بن باديس", "عبد الحميد بن باديس"],
  "figure:messali-hadj": ["messali", "el hadj messali", "مصالي الحاج"],
  "figure:ferhat-abbas": ["ferhat", "فرحات عباس"],
  "figure:ben-bella": ["ahmed ben bella", "أحمد بن بلة"],
  "figure:boumediene": ["houari boumediene", "boumédiène", "هواري بومدين"],
  "figure:mouloud-mammeri": ["dda l mulud", "مولود معمري"],
  "figure:kateb-yacine": ["kateb", "كاتب ياسين"],
  "figure:assia-djebar": ["assia", "آسيا جبار"],
  "figure:matoub-lounes": ["lounes matoub", "matoub", "معطوب الوناس", "معطوب لوناس"],
  "figure:aissa-djermouni": ["aissa", "chaoui singer"],
  "figure:cheikh-el-hasnaoui": ["hasnaoui", "الشيخ الحسناوي"],
  "figure:lalla-fatma-nsoumer": ["fatma n'soumer", "fadhma n soumer", "لالة فاطمة نسومر"],

  // Regions
  "region:kabylie": ["kabylia", "kabylia region", "iqbayliyen", "ⵜⴰⵇⴱⴰⵢⵍⵉⵜ", "القبائل", "بلاد القبائل"],
  "region:aures": ["aurès", "chaouia", "chaoui land", "ⴰⵡⵔⴰⵙ", "الأوراس"],
  "region:sahara": ["desert", "grand sud", "الصحراء الكبرى", "الصحراء"],
  "region:algiers": ["alger", "el djazair", "الجزائر العاصمة"],
  "region:oran-west": ["oran", "wahran", "وهران"],
  "region:constantine": ["cirta", "قسنطينة"],
  "region:numidia": ["numidie", "royaume numide", "نوميديا"],

  // Eras (ids: earlynorthafrica, numidia, roman, islamic, ottoman, french, independence)
  "era:earlynorthafrica": ["prehistory", "préhistoire", "tassili", "ما قبل التاريخ", "north africa"],
  "era:numidia": ["numidian kingdom", "royaume numide", "المملكة النوميدية"],
  "era:roman": ["rome", "romain", "roman africa", "afrique romaine", "roman algeria", "روما", "الرومان"],
  "era:islamic": ["medieval", "islamic period", "période islamique", "العصر الإسلامي", "medieval algeria"],
  "era:ottoman": ["regency of algiers", "régence d'alger", "الإيالة العثمانية", "العهد العثماني"],
  "era:french": ["colonial", "french colonial", "colonisation française", "الاستعمار الفرنسي"],
  "era:independence": ["war of independence", "revolution", "guerre d'algérie", "algerian war", "ثورة التحرير", "حرب الاستقلال"],

  // Culture
  "culture:music": ["musique", "chaabi", "rai", "raï", "gnawa", "kabyle music", "andalous", "الموسيقى"],
  "culture:language": ["tamazight", "amazigh", "berber", "arabe", "darja", "darija", "اللغة", "الأمازيغية"],
  "culture:calligraphy": ["arabic calligraphy", "خط عربي"],
  "culture:crafts": ["artisanat", "carpet", "poterie", "الحرف", "الصناعات التقليدية"],
  "culture:dress": ["haik", "burnous", "clothing", "الزي التقليدي"],
  "culture:literature": ["littérature", "poetry", "الأدب"],
  "culture:cinema": ["film", "movies", "السينما"],

  // Cuisine
  "cuisine:hub": ["food", "gastronomie", "cuisine algérienne", "المطبخ الجزائري", "الأكل"],
  "dish:couscous": ["seksu", "kseksou", "kuskus", "الكسكس"],
  "dish:mechoui": ["méchoui", "roast lamb", "المشوي"],
  "dish:rechta": ["rechta constantinoise", "الرشتة"],

  // Football
  "football:hub": ["soccer", "football algérien", "les fennecs", "les verts", "كرة القدم", "الخضر"],
  "football:fln-team": ["fln", "front de libération nationale team", "onze de l'indépendance", "فريق جبهة التحرير"],
  "football:gijon": ["gijón 1982", "algérie allemagne 1982", "algeria west germany 1982", "غيخون"],
  "football:world-cup": ["coupe du monde", "world cup", "كأس العالم"],
  "football:afcon": ["can", "coupe d'afrique", "africa cup of nations", "كأس أفريقيا"],
  "football:les-vertes": ["les vertes", "women", "femmes", "women's football", "football féminin", "نساء", "الخضراوات"],
  "club:js-kabylie": [
    "jsk", "js kabylie", "jeunesse sportive de kabylie", "canaris", "canaries",
    "شبيبة القبائل", "الكناري",
  ],

  // Match theater
  "match:gijon-1982": [
    "gijón", "gijon", "algeria germany", "algérie rfa", "algérie allemagne",
    "1982 world cup", "الجزائر ألمانيا 1982",
  ],

  // Collections
  "collection:leaders": ["kings", "rulers", "chefs d'état", "قادة", "ملوك"],
  "collection:warriors": ["resistance", "résistance", "warriors", "المقاومة", "المحاربون"],
  "collection:women": ["women who shaped algeria", "femmes", "نساء الجزائر"],
  "collection:writers": ["intellectuals", "poets", "écrivains", "الأدباء", "الكتّاب"],
};

// ---------------------------------------------------------------- Popularity
// A small hand-picked set of exhibits that anchor the museum. Boost is
// applied on top of the raw text score so weak/misspelt queries still
// surface these landmarks first, and they double as the "no results"
// popular-exhibits list.
const POPULARITY: Record<string, number> = {
  "figure:massinissa": 20,
  "figure:dihya": 20,
  "figure:jugurtha": 16,
  "figure:emir-abdelkader": 18,
  "figure:saint-augustine": 14,
  "figure:ibn-badis": 12,
  "region:kabylie": 18,
  "region:aures": 14,
  "region:sahara": 14,
  "era:numidia": 16,
  "era:roman": 14,
  "era:war-of-independence": 16,
  "football:hub": 14,
  "football:les-vertes": 12,
  "club:js-kabylie": 14,
  "match:gijon-1982": 14,
  "cuisine:hub": 10,
  "culture:music": 10,
  "culture:language": 10,
};

const POPULAR_LANDMARK_IDS: string[] = [
  "figure:massinissa",
  "figure:dihya",
  "region:kabylie",
  "era:roman",
  "club:js-kabylie",
  "football:les-vertes",
  "football:hub",
  "cuisine:hub",
  "era:war-of-independence",
];

// ---------------------------------------------------------------- Index

let _index: SearchItem[] | null = null;
let _byId: Map<string, SearchItem> | null = null;
type HayCache = { hay: string; words: Set<string> };
let _hayCache: WeakMap<SearchItem, HayCache> | null = null;

function push(out: SearchItem[], item: SearchItem) {
  if (!item.aliases) item.aliases = ALIASES[item.id];
  else if (ALIASES[item.id]) item.aliases = [...item.aliases, ...ALIASES[item.id]];
  if (item.popularity == null && POPULARITY[item.id] != null) {
    item.popularity = POPULARITY[item.id];
  }
  out.push(item);
}

export function getSearchIndex(): SearchItem[] {
  if (_index) return _index;
  const out: SearchItem[] = [];

  // Eras --------------------------------------------------------------
  for (const e of eras) {
    push(out, {
      id: `era:${e.id}`,
      kind: "era",
      emoji: e.emoji || "📜",
      title: e.title,
      snippet: e.summary,
      context: { en: e.dateRange, fr: e.dateRange, ar: e.dateRange },
      href: `/era/${e.id}`,
      haystack: [
        e.title,
        e.summary,
        e.badge,
        ...(e.facts ?? []),
        ...(e.figures?.flatMap((f) => [f.name, f.note]) ?? []),
        ...(e.places?.flatMap((p) => [p.name, p.note]) ?? []),
      ],
    });
  }

  // Figures -----------------------------------------------------------
  for (const f of figures) {
    push(out, {
      id: `figure:${f.id}`,
      kind: "figure",
      emoji: f.emoji || "🪶",
      title: f.displayName,
      snippet: f.importance ?? f.story,
      context: f.regionLabel ?? f.era,
      href: `/figures/${f.id}`,
      haystack: [
        f.displayName,
        { en: f.name, fr: f.name, ar: f.name },
        f.story,
        f.importance,
        f.fact,
        f.era,
        f.regionLabel,
      ],
    });
  }

  // Figure collections -----------------------------------------------
  for (const c of COLLECTIONS) {
    push(out, {
      id: `collection:${c.id}`,
      kind: "collection",
      emoji: c.emblem || "❖",
      title: c.label,
      snippet: c.tagline,
      context: { en: "Collection", fr: "Collection", ar: "مجموعة" },
      href: `/figures/collection/${c.id}`,
      haystack: [c.label, c.tagline, c.intro],
    });
  }

  // Regions -----------------------------------------------------------
  for (const r of mapRegions) {
    push(out, {
      id: `region:${r.id}`,
      kind: "region",
      emoji: r.emoji || "🗺️",
      title: r.name,
      snippet: r.summary,
      context: r.focus,
      href: `/region/${r.id}`,
      haystack: [r.name, r.summary, r.focus, ...(r.facts ?? [])],
    });
  }

  // Culture topics ----------------------------------------------------
  for (const c of CULTURE_TOPICS) {
    push(out, {
      id: `culture:${c.id}`,
      kind: "culture",
      emoji: c.emblem || "✦",
      title: c.title,
      snippet: c.tagline,
      context: { en: "Culture", fr: "Culture", ar: "ثقافة" },
      href: `/culture/${c.id}`,
      haystack: [c.title, c.tagline, c.intro, c.significance, ...(c.facts ?? [])],
    });
  }

  // Words / quotes ----------------------------------------------------
  for (const w of words) {
    const cat = WORD_CATEGORIES.find((c) => c.id === w.category);
    push(out, {
      id: `word:${w.id}`,
      kind: "word",
      emoji: w.emoji || cat?.emoji || "❝",
      title: w.author,
      snippet: w.quote,
      context: cat?.label,
      href: `/words#word-${w.id}`,
      haystack: [w.quote, w.author, w.context, w.meaning, cat?.label ?? ""].filter(
        Boolean,
      ) as LocalizedString[],
    });
  }

  // Lessons -----------------------------------------------------------
  for (const l of lessons) {
    push(out, {
      id: `lesson:${l.id}`,
      kind: "lesson",
      emoji: l.emoji || "📖",
      title: l.title,
      snippet: l.facts?.[0]?.simple ?? l.whyItMatters?.simple ?? l.topic,
      context: l.topic,
      href: `/lessons#lesson-${l.id}`,
      haystack: [
        l.title,
        l.topic,
        l.question,
        ...(l.facts?.flatMap((f) => [f.simple, f.deeper]) ?? []),
        l.whyItMatters?.simple,
        l.whyItMatters?.deeper,
      ].filter(Boolean) as LocalizedString[],
    });
  }

  // Cuisine hub + dishes ---------------------------------------------
  push(out, {
    id: "cuisine:hub",
    kind: "cuisine",
    emoji: "🍲",
    title: { en: "Algerian Cuisine", fr: "Cuisine algérienne", ar: "المطبخ الجزائري" },
    snippet: {
      en: "A living map of Algeria told through dishes, spices, and hospitality.",
      fr: "Une carte vivante de l'Algérie racontée par ses plats, ses épices et l'hospitalité.",
      ar: "خريطة حيّة للجزائر تُروى عبر الأطباق والتوابل والضيافة.",
    },
    context: { en: "Museum wing", fr: "Aile", ar: "قسم" },
    href: "/cuisine",
    haystack: [
      { en: "Cuisine food gastronomy", fr: "Cuisine nourriture gastronomie", ar: "طعام مطبخ ضيافة" },
    ],
  });
  for (const r of cuisineRegions) {
    for (const d of r.dishes) {
      push(out, {
        id: `dish:${d.id}`,
        kind: "dish",
        emoji: d.emoji || "🍽️",
        title: d.name,
        snippet: d.description,
        context: r.name,
        href: `/cuisine#dish-${d.id}`,
        haystack: [d.name, d.description, d.note, d.whenEaten, r.name].filter(
          Boolean,
        ) as LocalizedString[],
      });
    }
  }

  // Cinema hub + films ------------------------------------------------
  push(out, {
    id: "cinema:hub",
    kind: "cinema",
    emoji: "🎬",
    title: { en: "Algerian Cinema", fr: "Cinéma algérien", ar: "السينما الجزائرية" },
    snippet: {
      en: "Films that carried Algeria's voice from the maquis to Cannes.",
      fr: "Des films qui ont porté la voix de l'Algérie du maquis à Cannes.",
      ar: "أفلام حملت صوت الجزائر من الجبل إلى كان.",
    },
    context: { en: "Museum wing", fr: "Aile", ar: "قسم" },
    href: "/cinema",
    haystack: [
      { en: "Cinema film movies", fr: "Cinéma films", ar: "سينما أفلام" },
    ],
  });
  for (const f of featuredFilms) {
    push(out, {
      id: `film:${f.id}`,
      kind: "film",
      emoji: "🎬",
      title: f.title,
      snippet: f.description,
      context: f.director
        ? f.director
        : { en: String(f.year), fr: String(f.year), ar: String(f.year) },
      href: `/cinema#film-${f.id}`,
      haystack: [f.title, f.description, f.director].filter(Boolean) as LocalizedString[],
    });
  }

  // Ideas -------------------------------------------------------------
  for (const i of IDEAS) {
    push(out, {
      id: `idea:${i.id}`,
      kind: "idea",
      emoji: i.emoji || "💭",
      title: i.title,
      snippet: i.summary,
      href: `/ideas#idea-${i.id}`,
      haystack: [i.title, i.summary],
    });
  }

  // Football hub + exhibits ------------------------------------------
  push(out, {
    id: "football:hub",
    kind: "football",
    emoji: "⚽",
    title: { en: "The Hall of Algerian Football", fr: "La Salle du football algérien", ar: "قاعة الكرة الجزائرية" },
    snippet: {
      en: "Origins, national team, FLN team, legends, stadiums, and famous matches.",
      fr: "Origines, sélection, équipe FLN, légendes, stades et matches historiques.",
      ar: "الأصول والمنتخب وفريق جبهة التحرير والأساطير والملاعب والمباريات الشهيرة.",
    },
    context: { en: "Museum wing", fr: "Aile", ar: "قسم" },
    href: "/football",
    haystack: [
      { en: "Football soccer les fennecs les verts", fr: "Football les fennecs les verts", ar: "كرة القدم الفنك الخضر" },
    ],
  });
  for (const ex of FOOTBALL_EXHIBITS) {
    push(out, {
      id: `football:${ex.id}`,
      kind: "football",
      emoji: ex.emblem || "⚽",
      title: ex.title,
      snippet: ex.subtitle,
      context: { en: "Football exhibit", fr: "Exposition football", ar: "معرض كرة القدم" },
      href: `/football#exhibit-${ex.id}`,
      haystack: [ex.title, ex.subtitle, ex.intro],
    });
  }
  push(out, {
    id: "football:les-vertes",
    kind: "football",
    emoji: "🟢",
    title: LES_VERTES_HERO?.title ?? {
      en: "Les Vertes — Algeria's Women's National Team",
      fr: "Les Vertes — Sélection féminine d'Algérie",
      ar: "الخضراوات — منتخب الجزائر للسيدات",
    },
    snippet: LES_VERTES_HERO?.subtitle ?? {
      en: "A permanent exhibit for the women who wear the green.",
      fr: "Une exposition permanente pour celles qui portent le vert.",
      ar: "معرض دائم للنساء اللواتي يرتدين الأخضر.",
    },
    context: { en: "Football wing", fr: "Aile football", ar: "قسم الكرة" },
    href: "/football/lesvertes",
    haystack: [
      LES_VERTES_HERO?.title,
      LES_VERTES_HERO?.subtitle,
      LES_VERTES_HERO?.intro,
    ].filter(Boolean) as LocalizedString[],
  });

  // Club museums (published only) ------------------------------------
  for (const club of CLUB_MUSEUMS) {
    if (club.status !== "complete") continue; // never expose placeholders
    push(out, {
      id: `club:${club.id}`,
      kind: "club",
      emoji: "🏟️",
      title: club.fullName,
      snippet: club.tagline,
      context: club.city,
      href: `/clubs/${club.id}`,
      haystack: [
        club.fullName,
        club.tagline,
        club.city,
        { en: club.shortName, fr: club.shortName, ar: club.shortName },
      ],
    });
  }

  // Match theater (published only via registry) ---------------------
  for (const m of listMatchTheaterSummaries()) {
    push(out, {
      id: `match:${m.id}`,
      kind: "match",
      emoji: "🎞️",
      title: m.title,
      snippet: m.subtitle,
      context: m.displayDate,
      href: `/theater/${m.id}`,
      haystack: [m.title, m.subtitle, m.venue, m.displayDate],
    });
  }

  // Journeys ---------------------------------------------------------
  for (const j of JOURNEYS) {
    push(out, {
      id: `journey:${j.id}`,
      kind: "journey",
      emoji: j.emblem || "🚶",
      title: j.title,
      snippet: j.tagline,
      context: { en: "Signature Journey", fr: "Parcours signature", ar: "مسار مميّز" },
      href: `/journeys/${j.id}`,
      haystack: [j.title, j.tagline, j.overview],
    });
  }

  // Curated daily facts ---------------------------------------------
  for (const cf of curatedFacts) {
    const href =
      cf.relatedType === "figure"
        ? `/figures/${cf.relatedId}`
        : cf.relatedType === "region"
          ? `/region/${cf.relatedId}`
          : cf.relatedType === "era"
            ? `/era/${cf.relatedId}`
            : `/timeline`;
    push(out, {
      id: `fact:${cf.id}`,
      kind: "fact",
      emoji: "✨",
      title: cf.text,
      snippet: { en: "Museum fact", fr: "Fait du musée", ar: "معلومة من المتحف" },
      href,
      haystack: [cf.text],
    });
  }

  _index = out;
  _byId = new Map(out.map((i) => [i.id, i]));
  _hayCache = new WeakMap();
  return out;
}

function cacheFor(item: SearchItem): HayCache {
  if (!_hayCache) _hayCache = new WeakMap();
  const cached = _hayCache.get(item);
  if (cached) return cached;
  const hay = buildHaystack(item);
  const words = new Set(hay.split(" ").filter((w) => w.length > 1));
  const rec = { hay, words };
  _hayCache.set(item, rec);
  return rec;
}

function foldedAliases(item: SearchItem): string[] {
  return (item.aliases ?? []).map(fold).filter(Boolean);
}

function foldedTitle(item: SearchItem): string {
  return fold(flatten(item.title));
}

// ---------------------------------------------------------------- Fuzzy

/** Bounded Levenshtein — early-exits when distance > max. */
function editDistance(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = new Array<number>(n + 1);
  let curr = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= n; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1;
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// ---------------------------------------------------------------- Search

export type SearchHit = SearchItem & { score: number };

export interface SearchOptions {
  limit?: number;
  /** Filter to a category chip; "all" keeps everything. */
  category?: SearchCategory;
}

const KIND_BOOST: Record<SearchKind, number> = {
  era: 14,
  figure: 14,
  collection: 8,
  region: 12,
  culture: 10,
  match: 12,
  club: 11,
  football: 11,
  journey: 9,
  cinema: 6,
  cuisine: 8,
  idea: 6,
  lesson: 6,
  word: 5,
  dish: 5,
  film: 5,
  fact: 3,
};

const CATEGORY_KINDS: Record<SearchCategory, SearchKind[] | null> = {
  all: null,
  history: ["era", "figure", "collection", "fact"],
  football: ["football", "club", "match"],
  culture: ["culture", "word", "cinema", "film", "idea"],
  cuisine: ["cuisine", "dish"],
  regions: ["region"],
  people: ["figure", "collection"],
  journeys: ["journey"],
  lessons: ["lesson"],
};

export function categoryMatches(kind: SearchKind, category: SearchCategory | undefined): boolean {
  if (!category || category === "all") return true;
  const allowed = CATEGORY_KINDS[category];
  return allowed ? allowed.includes(kind) : true;
}

export function searchAll(query: string, limitOrOpts: number | SearchOptions = 40): SearchHit[] {
  const opts: SearchOptions =
    typeof limitOrOpts === "number" ? { limit: limitOrOpts } : limitOrOpts;
  const limit = opts.limit ?? 40;
  const category = opts.category ?? "all";

  const q = fold(query);
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const items = getSearchIndex();
  const out: SearchHit[] = [];

  for (const item of items) {
    if (!categoryMatches(item.kind, category)) continue;
    const cache = cacheFor(item);
    const hay = cache.hay;
    const title = foldedTitle(item);
    const aliases = foldedAliases(item);

    let score = 0;
    let allMatched = true;

    for (const term of terms) {
      // 1. Exact title / alias hits — highest weight.
      if (title === term) score += 90;
      else if (title.startsWith(term + " ") || title === term) score += 40;
      if (aliases.some((a) => a === term)) score += 70;
      else if (aliases.some((a) => a.startsWith(term) || a.includes(term))) score += 25;

      // 2. Substring in haystack.
      const idx = hay.indexOf(term);
      if (idx >= 0) {
        score += Math.max(1, 40 - Math.min(idx, 40));
        if (idx === 0 || hay[idx - 1] === " ") score += 12;
        score += term.length;
        continue;
      }

      // 3. Fuzzy fallback — for terms ≥ 4 chars, try Levenshtein against
      //    each haystack word. Distance 1 counts more than 2.
      if (term.length >= 4) {
        const max = term.length <= 5 ? 1 : 2;
        let bestDist = max + 1;
        for (const w of cache.words) {
          if (Math.abs(w.length - term.length) > max) continue;
          const d = editDistance(term, w, max);
          if (d < bestDist) {
            bestDist = d;
            if (d === 0) break;
          }
        }
        if (bestDist <= max) {
          score += Math.max(6, 22 - bestDist * 8);
          continue;
        }
      }

      allMatched = false;
      break;
    }

    if (!allMatched) continue;

    score += KIND_BOOST[item.kind] ?? 0;
    score += item.popularity ?? 0;

    out.push({ ...item, score });
  }

  out.sort((a, b) => b.score - a.score);
  return out.slice(0, limit);
}

// ---------------------------------------------------------------- Related

/**
 * Related exhibits from anywhere in the museum. Reuses the same index so
 * pages never hardcode their own "related" lists. Ranks by shared haystack
 * words + a small kind-diversity bonus + popularity.
 */
export function getRelatedExhibits(itemId: string, limit = 6): SearchItem[] {
  getSearchIndex();
  const self = _byId?.get(itemId);
  if (!self) return [];
  const selfCache = cacheFor(self);
  const selfWords = new Set(
    [...selfCache.words, ...foldedAliases(self), foldedTitle(self)]
      .flatMap((s) => s.split(" "))
      .filter((w) => w.length > 2),
  );

  const scored: { item: SearchItem; score: number }[] = [];
  const seenKind = new Map<SearchKind, number>();

  for (const item of _index!) {
    if (item.id === self.id) continue;
    const cache = cacheFor(item);
    let overlap = 0;
    for (const w of cache.words) if (selfWords.has(w)) overlap++;
    for (const a of foldedAliases(item)) {
      for (const w of a.split(" ")) if (selfWords.has(w)) overlap += 2;
    }
    if (overlap < 2) continue;
    const kindPenalty = (seenKind.get(item.kind) ?? 0) * 3;
    const score = overlap * 5 + (item.popularity ?? 0) - kindPenalty;
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  const out: SearchItem[] = [];
  for (const { item } of scored) {
    seenKind.set(item.kind, (seenKind.get(item.kind) ?? 0) + 1);
    out.push(item);
    if (out.length >= limit) break;
  }
  return out;
}

// ---------------------------------------------------------------- Popular

/** Popular / landmark exhibits shown in empty state + zero-result state. */
export function getPopularExhibits(limit = 9): SearchItem[] {
  getSearchIndex();
  const out: SearchItem[] = [];
  for (const id of POPULAR_LANDMARK_IDS) {
    const item = _byId?.get(id);
    if (item) out.push(item);
    if (out.length >= limit) break;
  }
  return out;
}

// ---------------------------------------------------------------- Recent

const RECENT_KEY = "dz-museum-recent-search-v1";
const RECENT_MAX = 6;

export function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string").slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

export function pushRecent(query: string) {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;
  try {
    const prev = getRecent().filter((q) => fold(q) !== fold(trimmed));
    const next = [trimmed, ...prev].slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
}

export function clearRecent() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    /* noop */
  }
}

// ---------------------------------------------------------------- Discoveries

/**
 * Curated "suggested discoveries" shown when the search box is empty —
 * a deterministic daily rotation so it feels like a hand-picked archive.
 */
export function getDiscoveries(): SearchItem[] {
  const idx = getSearchIndex();
  const today = new Date().toISOString().slice(0, 10);
  const seed = Number(today.replace(/-/g, "")) || 1;

  const buckets: SearchKind[] = ["figure", "era", "region", "culture", "match", "journey"];
  const out: SearchItem[] = [];
  let cursor = seed;
  for (const k of buckets) {
    const pool = idx.filter((i) => i.kind === k);
    if (!pool.length) continue;
    cursor = (cursor * 9301 + 49297) % 233280;
    out.push(pool[cursor % pool.length]);
  }
  return out;
}

// ---------------------------------------------------------------- Labels

export const KIND_LABEL: Record<SearchKind, LocalizedString> = {
  era: { en: "Era", fr: "Époque", ar: "حقبة" },
  figure: { en: "Figure", fr: "Figure", ar: "شخصية" },
  collection: { en: "Collection", fr: "Collection", ar: "مجموعة" },
  region: { en: "Region", fr: "Région", ar: "منطقة" },
  culture: { en: "Culture", fr: "Culture", ar: "ثقافة" },
  word: { en: "Words", fr: "Paroles", ar: "كلمات" },
  lesson: { en: "Lesson", fr: "Leçon", ar: "درس" },
  dish: { en: "Cuisine", fr: "Cuisine", ar: "مطبخ" },
  cuisine: { en: "Cuisine", fr: "Cuisine", ar: "مطبخ" },
  film: { en: "Cinema", fr: "Cinéma", ar: "سينما" },
  cinema: { en: "Cinema", fr: "Cinéma", ar: "سينما" },
  idea: { en: "Idea", fr: "Idée", ar: "فكرة" },
  football: { en: "Football", fr: "Football", ar: "كرة القدم" },
  club: { en: "Club Museum", fr: "Musée de club", ar: "متحف نادٍ" },
  match: { en: "Match Theater", fr: "Théâtre du match", ar: "مسرح المباراة" },
  journey: { en: "Journey", fr: "Parcours", ar: "مسار" },
  fact: { en: "Fact", fr: "Fait", ar: "معلومة" },
};

export function kindLabel(kind: SearchKind, lang: Lang): string {
  return t(KIND_LABEL[kind], lang);
}

export const CATEGORY_LABEL: Record<SearchCategory, LocalizedString> = {
  all: { en: "All", fr: "Tout", ar: "الكل" },
  history: { en: "History", fr: "Histoire", ar: "التاريخ" },
  football: { en: "Football", fr: "Football", ar: "كرة القدم" },
  culture: { en: "Culture", fr: "Culture", ar: "الثقافة" },
  cuisine: { en: "Cuisine", fr: "Cuisine", ar: "المطبخ" },
  regions: { en: "Regions", fr: "Régions", ar: "المناطق" },
  people: { en: "People", fr: "Personnes", ar: "الشخصيات" },
  journeys: { en: "Journeys", fr: "Parcours", ar: "المسارات" },
  lessons: { en: "Lessons", fr: "Leçons", ar: "الدروس" },
};

export const CATEGORIES: SearchCategory[] = [
  "all",
  "history",
  "football",
  "culture",
  "cuisine",
  "regions",
  "people",
  "journeys",
  "lessons",
];

// ---------------------------------------------------------------- Analytics
//
// Analytics instrumentation is intentionally decoupled — this module only
// emits window CustomEvents. A future analytics adapter can subscribe to
// "museum:search-analytics" without touching UI code.

export type SearchAnalyticsEvent =
  | { type: "search-query"; query: string; results: number; category: SearchCategory }
  | { type: "search-zero-results"; query: string; category: SearchCategory }
  | { type: "search-result-selected"; query: string; itemId: string; kind: SearchKind; rank: number }
  | { type: "search-category-selected"; category: SearchCategory }
  | { type: "related-exhibit-selected"; fromId: string; itemId: string; kind: SearchKind };

export function emitSearchAnalytics(event: SearchAnalyticsEvent) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("museum:search-analytics", { detail: event }));
  } catch {
    /* noop */
  }
}

// ---------------------------------------------------------------- Highlight

/**
 * Lightweight highlighter: returns an array of segments tagged as
 * `match` or `text` so the renderer can wrap matches with a glow span.
 */
export function highlight(
  raw: string,
  query: string,
): { text: string; match: boolean }[] {
  if (!query.trim()) return [{ text: raw, match: false }];
  const terms = Array.from(
    new Set(fold(query).split(/\s+/).filter((t) => t.length > 1)),
  ).sort((a, b) => b.length - a.length);
  if (!terms.length) return [{ text: raw, match: false }];

  const lower = fold(raw);
  // Because fold() collapses punctuation to spaces, the folded string can be
  // shorter than the original — mapping match indices back is not safe. Use
  // a case/diacritic-insensitive scan on a NFKD-normalized copy of the raw
  // string instead so match ranges align with the original characters.
  const scanable = raw.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  void lower;

  const segs: { text: string; match: boolean }[] = [];
  let i = 0;
  while (i < raw.length) {
    let hit: { start: number; len: number } | null = null;
    for (const term of terms) {
      const idx = scanable.indexOf(term, i);
      if (idx < 0) continue;
      if (!hit || idx < hit.start) hit = { start: idx, len: term.length };
    }
    if (!hit) {
      segs.push({ text: raw.slice(i), match: false });
      break;
    }
    if (hit.start > i) segs.push({ text: raw.slice(i, hit.start), match: false });
    segs.push({ text: raw.slice(hit.start, hit.start + hit.len), match: true });
    i = hit.start + hit.len;
  }
  return segs;
}
