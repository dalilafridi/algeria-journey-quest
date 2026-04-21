import { eras } from "@/data/eras";

const KEY = "algeria-history-progress-v1";

export type Progress = {
  xp: number;
  completed: Record<string, { score: number; bestScore: number; total?: number }>;
  badges: string[];
};

const empty: Progress = { xp: 0, completed: {}, badges: [] };

export function getProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function saveProgress(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("progress-updated"));
}

// Pass percentage threshold to unlock the next era (0–1).
export const PASS_RATIO = 0.6;

// Dev fallback: when true, every chapter is unlocked regardless of progress.
// Keep `false` for normal progression. Flip to `true` for testing.
export const UNLOCK_ALL_FOR_DEV = false;

export function recordQuiz(eraId: string, score: number, total: number) {
  const p = getProgress();
  const prev = p.completed[eraId]?.bestScore ?? 0;
  const prevTotal = p.completed[eraId]?.total ?? 0;
  const prevRatio = prevTotal > 0 ? prev / prevTotal : 0;
  const newRatio = total > 0 ? score / total : 0;
  // Award XP based on improvement in ratio (so variable totals are fair).
  const ratioGain = Math.max(0, newRatio - prevRatio);
  const gained = Math.round(ratioGain * total * 50);
  p.xp += gained;
  const isBetter = newRatio > prevRatio;
  // Always persist the latest attempt so progression unlocks; keep the best score.
  p.completed[eraId] = {
    score,
    bestScore: isBetter ? score : prev,
    total: isBetter ? total : prevTotal || total,
  };
  let newBadge: string | undefined;
  if (score === total) {
    const era = eras.find((e) => e.id === eraId);
    if (era && !p.badges.includes(era.badge)) {
      p.badges.push(era.badge);
      newBadge = era.badge;
    }
  }
  saveProgress(p);
  return { gained, newBadge };
}

export function hasPassed(eraId: string): boolean {
  const p = getProgress();
  const c = p.completed[eraId];
  if (!c || !c.total) return false;
  return c.bestScore / c.total >= PASS_RATIO;
}

export function isUnlocked(eraId: string): boolean {
  const idx = eras.findIndex((e) => e.id === eraId);
  if (idx <= 0) return true;
  return hasPassed(eras[idx - 1].id);
}

export function totalProgressPct(): number {
  const p = getProgress();
  const done = eras.filter((e) => hasPassed(e.id)).length;
  return Math.round((done / eras.length) * 100);
}

// ---- Levels ----
// 10 levels. XP needed to reach level N from 1 grows gently.
export const MAX_LEVEL = 10;
const LEVEL_THRESHOLDS: number[] = Array.from({ length: MAX_LEVEL }, (_, i) => i * 100 + i * i * 20);
// → [0, 120, 280, 480, 720, 1000, 1320, 1680, 2080, 2520]

export const LEVEL_TITLES = [
  "Curious Wanderer",
  "Story Seeker",
  "History Apprentice",
  "Chronicle Keeper",
  "Era Explorer",
  "Sage of the Sands",
  "Master Storyteller",
  "Living Archive",
  "Grand Historian",
  "Legend of Algeria",
];

export type LevelInfo = {
  level: number; // 1..MAX_LEVEL
  title: string;
  xpIntoLevel: number;
  xpForNext: number; // 0 if maxed
  pct: number; // 0..100 progress within current level
  isMax: boolean;
};

export function getLevelInfo(xp: number): LevelInfo {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  const isMax = level >= MAX_LEVEL;
  const base = LEVEL_THRESHOLDS[level - 1];
  const next = isMax ? base : LEVEL_THRESHOLDS[level];
  const xpIntoLevel = xp - base;
  const xpForNext = isMax ? 0 : next - xp;
  const span = isMax ? 1 : next - base;
  const pct = isMax ? 100 : Math.round((xpIntoLevel / span) * 100);
  return {
    level,
    title: LEVEL_TITLES[level - 1],
    xpIntoLevel,
    xpForNext,
    pct,
    isMax,
  };
}

export function addXp(amount: number): { gained: number; leveledUp: boolean; newLevel: number } {
  if (amount <= 0) return { gained: 0, leveledUp: false, newLevel: getLevelInfo(getProgress().xp).level };
  const p = getProgress();
  const before = getLevelInfo(p.xp).level;
  p.xp += amount;
  saveProgress(p);
  const after = getLevelInfo(p.xp).level;
  return { gained: amount, leveledUp: after > before, newLevel: after };
}
