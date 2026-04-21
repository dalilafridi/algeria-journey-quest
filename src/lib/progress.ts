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
const PASS_RATIO = 0.6;

export function recordQuiz(eraId: string, score: number, total: number) {
  const p = getProgress();
  const prev = p.completed[eraId]?.bestScore ?? 0;
  const prevTotal = p.completed[eraId]?.total ?? total;
  const prevRatio = prevTotal > 0 ? prev / prevTotal : 0;
  const newRatio = total > 0 ? score / total : 0;
  // Award XP based on improvement in ratio (so variable totals are fair).
  const ratioGain = Math.max(0, newRatio - prevRatio);
  const gained = Math.round(ratioGain * total * 50);
  p.xp += gained;
  const isBetter = newRatio > prevRatio;
  p.completed[eraId] = {
    score: isBetter ? score : prev,
    bestScore: isBetter ? score : prev,
    total: isBetter ? total : prevTotal,
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
