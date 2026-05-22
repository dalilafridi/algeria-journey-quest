/**
 * Museum search index.
 *
 * Aggregates every cultural data source into a flat list of `SearchItem`s
 * that can be matched in any of the three languages (en / fr / ar).
 *
 * No external fuzzy-search library — we keep this lightweight and fast
 * on mobile: a small Unicode-aware fold + substring/word-prefix matcher
 * with a tiny scoring heuristic that still feels intelligent.
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

export type SearchKind =
  | "era"
  | "figure"
  | "region"
  | "word"
  | "lesson"
  | "dish"
  | "film"
  | "idea";

export type SearchItem = {
  id: string;
  kind: SearchKind;
  emoji: string;
  title: LocalizedString;
  /** Short museum-style snippet shown under the title. */
  snippet: LocalizedString;
  /** Small contextual tag (era name, region, category). */
  context?: LocalizedString;
  href: string;
  /** Bag of trilingual strings used to compute relevance. */
  haystack: LocalizedString[];
};

// ---------------------------------------------------------------- Helpers

/**
 * Strip diacritics / case for forgiving matching. Works across Latin
 * accents and most Arabic diacritics so users can type "kabyl",
 * "amazigh", "صحراء" or "amir abdelkader" interchangeably.
 */
export function fold(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    // Latin diacritics
    .replace(/[\u0300-\u036f]/g, "")
    // Arabic tashkīl + tatweel
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    // Normalize alef variants
    .replace(/[\u0622\u0623\u0625]/g, "\u0627")
    .replace(/\u0629/g, "\u0647") // ta marbuta → ha
    .replace(/\u0649/g, "\u064A") // alef maksura → ya
    .trim();
}

function flatten(value: LocalizedString | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return [value.en, value.fr, value.ar].filter(Boolean).join(" • ");
}

function buildHaystack(items: LocalizedString[]): string {
  return fold(items.map(flatten).join("  "));
}

// ---------------------------------------------------------------- Index

let _index: SearchItem[] | null = null;
let _hayCache: WeakMap<SearchItem, string> | null = null;

export function getSearchIndex(): SearchItem[] {
  if (_index) return _index;
  const out: SearchItem[] = [];

  // Eras
  for (const e of eras) {
    out.push({
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

  // Figures
  for (const f of figures) {
    out.push({
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

  // Regions
  for (const r of mapRegions) {
    out.push({
      id: `region:${r.id}`,
      kind: "region",
      emoji: r.emoji || "🗺️",
      title: r.name,
      snippet: r.summary,
      context: r.focus,
      href: `/map#region-${r.id}`,
      haystack: [r.name, r.summary, r.focus, ...(r.facts ?? [])],
    });
  }

  // Words / quotes
  for (const w of words) {
    const cat = WORD_CATEGORIES.find((c) => c.id === w.category);
    out.push({
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

  // Lessons
  for (const l of lessons) {
    out.push({
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

  // Cuisine dishes
  for (const r of cuisineRegions) {
    for (const d of r.dishes) {
      out.push({
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

  // Cinema — featured films
  for (const f of featuredFilms) {
    out.push({
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

  // Ideas
  for (const i of IDEAS) {
    out.push({
      id: `idea:${i.id}`,
      kind: "idea",
      emoji: i.emoji || "💭",
      title: i.title,
      snippet: i.summary,
      href: `/ideas#idea-${i.id}`,
      haystack: [i.title, i.summary],
    });
  }

  _index = out;
  _hayCache = new WeakMap();
  return out;
}

function hayFor(item: SearchItem): string {
  if (!_hayCache) _hayCache = new WeakMap();
  const cached = _hayCache.get(item);
  if (cached) return cached;
  const h = buildHaystack(item.haystack);
  _hayCache.set(item, h);
  return h;
}

// ---------------------------------------------------------------- Search

export type SearchHit = SearchItem & { score: number };

export function searchAll(query: string, limit = 40): SearchHit[] {
  const q = fold(query);
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const items = getSearchIndex();
  const out: SearchHit[] = [];

  for (const item of items) {
    const hay = hayFor(item);
    let score = 0;
    let allMatched = true;
    for (const term of terms) {
      const idx = hay.indexOf(term);
      if (idx < 0) {
        allMatched = false;
        break;
      }
      // Earlier hits = stronger relevance.
      score += Math.max(1, 40 - Math.min(idx, 40));
      // Word-boundary boost.
      if (idx === 0 || hay[idx - 1] === " ") score += 12;
      // Length-of-term boost so "ben badis" beats "ben".
      score += term.length;
    }
    if (!allMatched) continue;

    // Kind ranking — figures and eras tend to be the canonical landmarks.
    const kindBoost: Record<SearchKind, number> = {
      era: 14,
      figure: 12,
      region: 10,
      idea: 8,
      lesson: 6,
      word: 5,
      dish: 5,
      film: 5,
    };
    score += kindBoost[item.kind];

    out.push({ ...item, score });
  }

  out.sort((a, b) => b.score - a.score);
  return out.slice(0, limit);
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

  // Try to surface one of each main kind for variety.
  const buckets: SearchKind[] = ["figure", "era", "region", "word", "idea", "dish"];
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
  region: { en: "Region", fr: "Région", ar: "منطقة" },
  word: { en: "Words", fr: "Paroles", ar: "كلمات" },
  lesson: { en: "Lesson", fr: "Leçon", ar: "درس" },
  dish: { en: "Cuisine", fr: "Cuisine", ar: "مطبخ" },
  film: { en: "Cinema", fr: "Cinéma", ar: "سينما" },
  idea: { en: "Idea", fr: "Idée", ar: "فكرة" },
};

export function kindLabel(kind: SearchKind, lang: Lang): string {
  return t(KIND_LABEL[kind], lang);
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
  const segs: { text: string; match: boolean }[] = [];
  let i = 0;
  while (i < raw.length) {
    let hit: { start: number; len: number } | null = null;
    for (const term of terms) {
      const idx = lower.indexOf(term, i);
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
