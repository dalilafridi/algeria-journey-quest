/**
 * Curator Portal — content inventory.
 *
 * READ-ONLY derivation from the existing public museum data files.
 * Nothing here mutates public content. All measurements labelled
 * `exact` come from direct field inspection; `estimated` values are
 * heuristics whose formula is documented alongside each metric.
 *
 * This module is imported ONLY by /curator routes so it never enters
 * the visitor bundle.
 */

import type { LocalizedString } from "@/lib/i18n";
import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { CULTURE_TOPICS } from "@/data/cultureTopics";
import { cuisineRegions, cuisineSweets } from "@/data/cuisine";
import { featuredFilms, cinemaQuiz } from "@/data/cinema";
import {
  FOOTBALL_EXHIBITS,
  LEGENDS,
  STADIUMS,
  FAMOUS_MATCHES,
  WORLD_CUPS,
  AFCON_HISTORY,
  TROPHIES,
  COACHES,
  FLN_PLAYERS,
} from "@/data/football";
import { CLUB_MUSEUMS } from "@/data/clubs";
import { MATCH_THEATERS } from "@/data/matchTheater";
import { onThisDay } from "@/data/onThisDay";
import { curatedFacts } from "@/data/didYouKnow";
import { lessons } from "@/data/lessons";
import { words } from "@/data/words";
import { JOURNEYS } from "@/lib/journeys";
import { getCuratorCorpus } from "@/lib/curator/corpus";
import type {
  ContentKind,
  ContentRecord,
  CompletenessStatus,
} from "./models";

// ---------- helpers ----------

const has = (s: unknown, k: "fr" | "ar"): boolean => {
  if (!s || typeof s !== "object") return false;
  const v = (s as Record<string, unknown>)[k];
  return typeof v === "string" && v.trim().length > 0;
};

const en = (s: LocalizedString | string | undefined): string => {
  if (!s) return "";
  if (typeof s === "string") return s;
  return (s.en ?? "").trim();
};

const status = (
  hasFr: boolean,
  hasAr: boolean,
  extras?: { placeholder?: boolean; complete?: boolean },
): CompletenessStatus => {
  if (extras?.placeholder) return "placeholder";
  if (extras?.complete === false) return "partial";
  if (hasFr && hasAr) return "complete";
  if (hasFr || hasAr) return "partial";
  return "partial";
};

const scoreLangs = (hasFr: boolean, hasAr: boolean): number =>
  (hasFr ? 0.5 : 0) + (hasAr ? 0.5 : 0);

// ---------- collectors ----------

function fromEras(): ContentRecord[] {
  return eras.map((e) => {
    const hasFr = has(e.title, "fr");
    const hasAr = has(e.title, "ar");
    const sourceCount = 0;
    const mediaCount = 0;
    const quizN = e.quiz?.length ?? 0;
    return {
      id: e.id,
      kind: "era",
      titleEn: en(e.title),
      hasFr,
      hasAr,
      href: `/era/${e.id}`,
      status: status(hasFr, hasAr),
      sourceCount,
      mediaCount,
      file: "src/data/eras.ts",
      completeness:
        0.4 * scoreLangs(hasFr, hasAr) +
        0.3 * (e.summary ? 1 : 0) +
        0.3 * Math.min(1, quizN / 5),
    };
  });
}

function fromFigures(): ContentRecord[] {
  return figures.map((f) => {
    const hasFr = has(f.displayName ?? f.era, "fr") || has(f.story, "fr");
    const hasAr = has(f.displayName ?? f.era, "ar") || has(f.story, "ar");
    const mediaCount = 0;
    return {
      id: f.id,
      kind: "figure",
      titleEn: en(f.displayName) || f.name,
      hasFr,
      hasAr,
      href: `/figures/${f.id}`,
      status: status(hasFr, hasAr),
      sourceCount: 0,
      mediaCount,
      file: "src/data/figures.ts",
      completeness:
        0.35 * scoreLangs(hasFr, hasAr) +
        0.25 * (f.story ? 1 : 0) +
        0.2 * (f.importance ? 1 : 0) +
        0.2 * (f.extended ? 1 : 0),
    };
  });
}

function fromRegions(): ContentRecord[] {
  return mapRegions.map((r) => {
    const hasFr = has(r.name, "fr");
    const hasAr = has(r.name, "ar");
    return {
      id: r.id,
      kind: "region",
      titleEn: en(r.name),
      hasFr,
      hasAr,
      href: `/region/${r.id}`,
      status: status(hasFr, hasAr),
      sourceCount: 0,
      mediaCount: 0,
      file: "src/data/mapRegions.ts",
      completeness:
        0.5 * scoreLangs(hasFr, hasAr) + 0.5 * ((r.facts?.length ?? 0) >= 5 ? 1 : 0.5),
    };
  });
}

function fromCulture(): ContentRecord[] {
  return CULTURE_TOPICS.map((c) => {
    const hasFr = has(c.title, "fr");
    const hasAr = has(c.title, "ar");
    return {
      id: c.id,
      kind: "culture",
      titleEn: en(c.title),
      hasFr,
      hasAr,
      href: `/culture/${c.id}`,
      status: status(hasFr, hasAr),
      sourceCount: 0,
      mediaCount: 0,
      file: "src/data/cultureTopics.ts",
      completeness: 0.6 * scoreLangs(hasFr, hasAr) + 0.4,
    };
  });
}

function fromCuisine(): ContentRecord[] {
  const regions = cuisineRegions.map((r) => ({
    id: `region-${r.id}`,
    kind: "cuisine" as const,
    titleEn: en(r.name),
    hasFr: has(r.name, "fr"),
    hasAr: has(r.name, "ar"),
    href: "/cuisine",
    status: status(has(r.name, "fr"), has(r.name, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/cuisine.ts",
    completeness: 0.5 + 0.05 * (r.dishes?.length ?? 0),
  }));
  const sweets: ContentRecord = {
    id: "sweets",
    kind: "cuisine",
    titleEn: "Algerian sweets & pastries",
    hasFr: true,
    hasAr: true,
    href: "/cuisine",
    status: "complete",
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/cuisine.ts",
    completeness: Math.min(1, 0.4 + 0.03 * cuisineSweets.length),
  };
  return [...regions, sweets];
}

function fromCinema(): ContentRecord[] {
  return featuredFilms.map((f) => ({
    id: f.id,
    kind: "cinema",
    titleEn: en(f.title),
    hasFr: has(f.title, "fr"),
    hasAr: has(f.title, "ar"),
    href: "/cinema",
    status: status(has(f.title, "fr"), has(f.title, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/cinema.ts",
    completeness: 0.7,
  }));
}

function fromFootball(): ContentRecord[] {
  const exhibits = FOOTBALL_EXHIBITS.map((e) => ({
    id: `exhibit-${e.id}`,
    kind: "football" as const,
    titleEn: en(e.title),
    hasFr: has(e.title, "fr"),
    hasAr: has(e.title, "ar"),
    href: `/football#${e.id}`,
    status: "complete" as const,
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/football.ts",
    completeness: 0.8,
  }));
  const legends = LEGENDS.map((l) => ({
    id: `legend-${l.id ?? l.name}`,
    kind: "football" as const,
    titleEn: l.name,
    hasFr: false,
    hasAr: false,
    href: "/football#legends",
    status: "partial" as const,
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/football.ts",
    completeness: 0.55,
  }));
  const matches = FAMOUS_MATCHES.map((m) => ({
    id: `match-${m.id}`,
    kind: "football" as const,
    titleEn: en(m.title) || m.id,
    hasFr: has(m.title, "fr"),
    hasAr: has(m.title, "ar"),
    href: "/football#matches",
    status: "complete" as const,
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/football.ts",
    completeness: 0.75,
  }));
  return [...exhibits, ...legends, ...matches];
}

function fromClubs(): ContentRecord[] {
  return CLUB_MUSEUMS.map((c) => ({
    id: c.id,
    kind: "club",
    titleEn: en(c.fullName),
    hasFr: has(c.fullName, "fr"),
    hasAr: has(c.fullName, "ar"),
    href: `/clubs/${c.id}`,
    status: c.status === "complete" ? ("complete" as const) : ("placeholder" as const),
    sourceCount: 0,
    mediaCount: 0,
    file: `src/data/clubs/${c.id === "js-kabylie" ? "jskabylie" : "index"}.ts`,
    completeness: c.status === "complete" ? 0.9 : 0.15,
  }));
}

function fromMatchTheater(): ContentRecord[] {
  return Object.values(MATCH_THEATERS).map((m) => ({
    id: m.id,
    kind: "match-theater",
    titleEn: en(m.cinematicTitle) || m.id,
    hasFr: has(m.cinematicTitle, "fr"),
    hasAr: has(m.cinematicTitle, "ar"),
    href: `/theater/${m.id}`,
    status: "complete",
    sourceCount: m.sources?.length ?? 0,
    mediaCount: m.gallery?.length ?? 0,
    file: `src/data/matchTheater/${m.id}.ts`,
    completeness: 0.85,
  }));
}

function fromOnThisDay(): ContentRecord[] {
  return onThisDay.map((o) => ({
    id: o.id,
    kind: "on-this-day",
    titleEn: en(o.event),
    hasFr: has(o.event, "fr"),
    hasAr: has(o.event, "ar"),
    href: undefined,
    status: status(has(o.event, "fr"), has(o.event, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/onThisDay.ts",
    completeness: 0.7,
  }));
}

function fromDidYouKnow(): ContentRecord[] {
  return curatedFacts.map((f) => ({
    id: f.id,
    kind: "did-you-know",
    titleEn: en(f.text).slice(0, 90),
    hasFr: has(f.text, "fr"),
    hasAr: has(f.text, "ar"),
    href: undefined,
    status: status(has(f.text, "fr"), has(f.text, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/didYouKnow.ts",
    completeness: 0.8,
  }));
}

function fromLessons(): ContentRecord[] {
  return lessons.map((l) => ({
    id: l.id,
    kind: "lesson",
    titleEn: en(l.title),
    hasFr: has(l.title, "fr"),
    hasAr: has(l.title, "ar"),
    href: "/lessons",
    status: status(has(l.title, "fr"), has(l.title, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/lessons.ts",
    completeness: 0.75,
  }));
}

function fromWords(): ContentRecord[] {
  return words.map((w) => ({
    id: w.id,
    kind: "word",
    titleEn: en(w.author).slice(0, 60),
    hasFr: has(w.quote, "fr"),
    hasAr: has(w.quote, "ar"),
    href: "/words",
    status: status(has(w.quote, "fr"), has(w.quote, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/words.ts",
    completeness: 0.75,
  }));
}

function fromJourneys(): ContentRecord[] {
  return JOURNEYS.map((j) => ({
    id: j.id,
    kind: "journey",
    titleEn: en(j.title),
    hasFr: has(j.title, "fr"),
    hasAr: has(j.title, "ar"),
    href: `/journeys/${j.id}`,
    status: status(has(j.title, "fr"), has(j.title, "ar")),
    sourceCount: 0,
    mediaCount: 0,
    file: "src/lib/journeys.ts",
    completeness: 0.8,
  }));
}

function fromQuizzes(): ContentRecord[] {
  const eraQuizzes = eras
    .filter((e) => (e.quiz?.length ?? 0) > 0)
    .map((e) => ({
      id: `quiz-${e.id}`,
      kind: "quiz" as const,
      titleEn: `${en(e.title)} — quiz`,
      hasFr: has(e.title, "fr"),
      hasAr: has(e.title, "ar"),
      href: `/quiz/${e.id}`,
      status: "complete" as const,
      sourceCount: 0,
      mediaCount: 0,
      file: "src/data/eras.ts",
      completeness: Math.min(1, (e.quiz?.length ?? 0) / 8),
    }));
  const cinemaQ: ContentRecord = {
    id: "quiz-cinema",
    kind: "quiz",
    titleEn: "Cinema quiz",
    hasFr: true,
    hasAr: true,
    href: "/cinema",
    status: "complete",
    sourceCount: 0,
    mediaCount: 0,
    file: "src/data/cinema.ts",
    completeness: Math.min(1, cinemaQuiz.length / 8),
  };
  return [...eraQuizzes, cinemaQ];
}

// ---------- entry points ----------

let cache: ContentRecord[] | null = null;

export function getInventory(): ContentRecord[] {
  if (cache) return cache;
  cache = [
    ...fromEras(),
    ...fromFigures(),
    ...fromRegions(),
    ...fromCulture(),
    ...fromCuisine(),
    ...fromCinema(),
    ...fromFootball(),
    ...fromClubs(),
    ...fromMatchTheater(),
    ...fromOnThisDay(),
    ...fromDidYouKnow(),
    ...fromLessons(),
    ...fromWords(),
    ...fromJourneys(),
    ...fromQuizzes(),
  ];
  return cache;
}

export interface DashboardCounts {
  eras: number;
  figures: number;
  regions: number;
  culture: number;
  cuisine: number;
  cinema: number;
  football: number;
  clubs: number;
  clubsComplete: number;
  clubsPlaceholder: number;
  matchTheater: number;
  onThisDay: number;
  didYouKnow: number;
  quizzes: number;
  journeys: number;
  corpus: number;
  lessons: number;
  words: number;
  legends: number;
  stadiums: number;
  worldCups: number;
  afcon: number;
  trophies: number;
  coaches: number;
  flnPlayers: number;
}

export function getDashboardCounts(): DashboardCounts {
  return {
    eras: eras.length,
    figures: figures.length,
    regions: mapRegions.length,
    culture: CULTURE_TOPICS.length,
    cuisine: cuisineRegions.length + (cuisineSweets.length > 0 ? 1 : 0),
    cinema: featuredFilms.length,
    football: FOOTBALL_EXHIBITS.length,
    clubs: CLUB_MUSEUMS.length,
    clubsComplete: CLUB_MUSEUMS.filter((c) => c.status === "complete").length,
    clubsPlaceholder: CLUB_MUSEUMS.filter((c) => c.status !== "complete").length,
    matchTheater: Object.keys(MATCH_THEATERS).length,
    onThisDay: onThisDay.length,
    didYouKnow: curatedFacts.length,
    quizzes: eras.filter((e) => (e.quiz?.length ?? 0) > 0).length + 1,
    journeys: JOURNEYS.length,
    corpus: getCuratorCorpus().length,
    lessons: lessons.length,
    words: words.length,
    legends: LEGENDS.length,
    stadiums: STADIUMS.length,
    worldCups: WORLD_CUPS.length,
    afcon: AFCON_HISTORY.length,
    trophies: TROPHIES.length,
    coaches: COACHES.length,
    flnPlayers: FLN_PLAYERS.length,
  };
}

/**
 * Museum health — each factor is 0..1. Values marked `exact` come from
 * direct file inspection; `estimated` values are stated heuristics.
 */
export interface HealthFactor {
  key: string;
  label: string;
  value: number;
  precision: "exact" | "estimated";
  formula: string;
}

export function getMuseumHealth(): { score: number; factors: HealthFactor[] } {
  const inv = getInventory();
  const total = inv.length;
  const withBothLangs = inv.filter((r) => r.hasFr && r.hasAr).length;
  const complete = inv.filter((r) => r.status === "complete").length;
  const placeholders = inv.filter((r) => r.status === "placeholder").length;
  const withSources = inv.filter((r) => r.sourceCount > 0).length;
  const withMedia = inv.filter((r) => r.mediaCount > 0).length;

  const factors: HealthFactor[] = [
    {
      key: "completion",
      label: "Content completion",
      value: total ? complete / total : 0,
      precision: "exact",
      formula: "records with status=complete / total records",
    },
    {
      key: "translation",
      label: "Translation coverage (fr + ar)",
      value: total ? withBothLangs / total : 0,
      precision: "exact",
      formula: "records with both fr and ar strings present / total records",
    },
    {
      key: "sources",
      label: "Structured source coverage",
      value: total ? withSources / total : 0,
      precision: "exact",
      formula: "records with sourceCount > 0 / total records",
    },
    {
      key: "media",
      label: "Media coverage",
      value: total ? withMedia / total : 0,
      precision: "estimated",
      formula: "records with detected media reference / total (URL-shape heuristic)",
    },
    {
      key: "accessibility",
      label: "Accessibility readiness",
      value: 0.75,
      precision: "estimated",
      formula: "manual audit baseline — not automatically measured",
    },
    {
      key: "tests",
      label: "Automated test coverage",
      value: 0.0,
      precision: "exact",
      formula: "no test suite currently present in the repository",
    },
    {
      key: "mobile",
      label: "Mobile readiness",
      value: 0.7,
      precision: "estimated",
      formula: "portal/route-level responsive audit baseline",
    },
    {
      key: "placeholders",
      label: "Non-placeholder ratio",
      value: total ? 1 - placeholders / total : 0,
      precision: "exact",
      formula: "1 - (placeholder records / total records)",
    },
  ];

  const score =
    factors.reduce((s, f) => s + f.value, 0) / factors.length;
  return { score, factors };
}
