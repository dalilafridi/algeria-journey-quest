// Words section — independent local progress tracker.
// CRITICAL: This must NOT touch the main `algeria-history-progress-v1` store
// nor any era unlock logic. It only powers the Words page UI (reveals,
// quiz tally, optional Words badge).

import { words, WORD_CATEGORIES, type WordCategoryId } from "@/data/words";

const KEY = "algeria-words-progress-v1";

export type WordsProgress = {
  /** Word IDs the user opened/revealed at least once. */
  revealed: string[];
  /** Word IDs the user answered correctly in the inline quiz. */
  quizCorrect: string[];
  /** Word XP — separate tally, not added to chapter XP. */
  xp: number;
  /** Category badge keys earned (e.g. "national-voice"). */
  badges: string[];
};

const empty: WordsProgress = { revealed: [], quizCorrect: [], xp: 0, badges: [] };

function read(): WordsProgress {
  if (typeof window === "undefined") return { ...empty };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return { ...empty };
  }
}

function write(p: WordsProgress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("words-progress-updated"));
}

export function getWordsProgress(): WordsProgress {
  return read();
}

/** Award a small XP bonus when a word is revealed for the first time. */
export const REVEAL_XP = 2;
/** Award when the inline quiz is answered correctly the first time. */
export const QUIZ_XP = 5;

export function markRevealed(wordId: string): { gained: number; newBadge?: WordCategoryId } {
  const p = read();
  if (p.revealed.includes(wordId)) return { gained: 0 };
  p.revealed.push(wordId);
  p.xp += REVEAL_XP;
  const newBadge = checkCategoryBadge(p, wordId);
  write(p);
  return { gained: REVEAL_XP, newBadge };
}

export function markQuizCorrect(wordId: string): { gained: number } {
  const p = read();
  if (p.quizCorrect.includes(wordId)) return { gained: 0 };
  p.quizCorrect.push(wordId);
  // Reveal counts too — once you answer correctly you've engaged with it.
  if (!p.revealed.includes(wordId)) {
    p.revealed.push(wordId);
    p.xp += REVEAL_XP;
  }
  p.xp += QUIZ_XP;
  write(p);
  return { gained: QUIZ_XP };
}

function checkCategoryBadge(p: WordsProgress, wordId: string): WordCategoryId | undefined {
  const w = words.find((x) => x.id === wordId);
  if (!w) return;
  const inCat = words.filter((x) => x.category === w.category).map((x) => x.id);
  const allRevealed = inCat.every((id) => p.revealed.includes(id));
  if (allRevealed && !p.badges.includes(w.category)) {
    p.badges.push(w.category);
    return w.category;
  }
  return;
}

export function wordsTotals() {
  const p = read();
  const total = words.length;
  const revealed = p.revealed.length;
  return {
    total,
    revealed,
    pct: total > 0 ? Math.round((revealed / total) * 100) : 0,
    xp: p.xp,
    badges: p.badges,
    quizCorrect: p.quizCorrect,
  };
}

export function categoryTotals(cat: WordCategoryId) {
  const p = read();
  const inCat = words.filter((w) => w.category === cat);
  const revealed = inCat.filter((w) => p.revealed.includes(w.id)).length;
  return {
    total: inCat.length,
    revealed,
    pct: inCat.length > 0 ? Math.round((revealed / inCat.length) * 100) : 0,
    complete: revealed === inCat.length && inCat.length > 0,
  };
}

export { WORD_CATEGORIES };
