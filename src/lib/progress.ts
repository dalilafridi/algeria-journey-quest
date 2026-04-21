import { eras } from "@/data/eras";

const KEY = "algeria-history-progress-v1";

export type Progress = {
  xp: number;
  completed: Record<string, { score: number; bestScore: number }>;
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

export function recordQuiz(eraId: string, score: number, total: number) {
  const p = getProgress();
  const prev = p.completed[eraId]?.bestScore ?? 0;
  const gained = Math.max(0, score - prev) * 50;
  p.xp += gained;
  p.completed[eraId] = {
    score,
    bestScore: Math.max(prev, score),
  };
  if (score === total) {
    const era = eras.find((e) => e.id === eraId);
    if (era && !p.badges.includes(era.badge)) p.badges.push(era.badge);
  }
  saveProgress(p);
  return { gained, newBadge: p.badges[p.badges.length - 1] };
}

export function isUnlocked(eraId: string): boolean {
  const idx = eras.findIndex((e) => e.id === eraId);
  if (idx <= 0) return true;
  const p = getProgress();
  const prev = eras[idx - 1];
  return (p.completed[prev.id]?.bestScore ?? 0) >= 2;
}

export function totalProgressPct(): number {
  const p = getProgress();
  const done = Object.values(p.completed).filter((c) => c.bestScore >= 2).length;
  return Math.round((done / eras.length) * 100);
}
