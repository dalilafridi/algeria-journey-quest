/**
 * Persistence + reward hooks for the Match Theater experience.
 *
 * State is stored in localStorage per match id so a visitor can leave and
 * return without losing their place. Completion triggers a passport visit
 * (piggybacking on the existing culture bucket for stamp accounting) and
 * awards a small amount of XP through the existing progress system.
 */

import { useCallback, useEffect, useState } from "react";
import { addXp, getProgress, saveProgress } from "@/lib/progress";
import { recordVisit } from "@/lib/passport";

const KEY = (id: string) => `dz-theater-${id}-state-v1`;
const EVT = "dz-theater-state-updated";
const XP_COMPLETE = 60;
const XP_QUIZ_PER_ANSWER = 8;

export type TheaterState = {
  minute: number;
  introSeen: boolean;
  completed: boolean;
  quizBestScore?: number;
  quizAttempts: number;
  bookmarked: boolean;
};

const empty: TheaterState = {
  minute: 0,
  introSeen: false,
  completed: false,
  quizAttempts: 0,
  bookmarked: false,
};

function readState(id: string): TheaterState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY(id));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<TheaterState>;
    return { ...empty, ...parsed };
  } catch {
    return empty;
  }
}

function writeState(id: string, state: TheaterState) {
  try {
    localStorage.setItem(KEY(id), JSON.stringify(state));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* noop */
  }
}

export function useTheaterState(matchId: string) {
  const [state, setState] = useState<TheaterState>(() => readState(matchId));

  useEffect(() => {
    setState(readState(matchId));
    const sync = () => setState(readState(matchId));
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [matchId]);

  const update = useCallback(
    (patch: Partial<TheaterState>) => {
      const next = { ...readState(matchId), ...patch };
      writeState(matchId, next);
      setState(next);
    },
    [matchId],
  );

  return { state, update };
}

/**
 * Awarded once at the final whistle. Records a passport "culture" visit
 * for the match (so the stamp code can pick it up) and grants XP once.
 */
export function markTheaterCompleted(matchId: string, stampVisitId: string) {
  const s = readState(matchId);
  if (s.completed) return { xpGained: 0, alreadyCompleted: true };
  writeState(matchId, { ...s, completed: true, minute: 90 });
  recordVisit("culture", stampVisitId);
  const res = addXp(XP_COMPLETE);
  return { xpGained: res.gained, alreadyCompleted: false };
}

/**
 * Records a quiz score. XP awarded only for improvements over the previous
 * best. Uses the existing progress store so XP shows up in the same HUD.
 */
export function recordTheaterQuiz(matchId: string, score: number) {
  const s = readState(matchId);
  const prevBest = s.quizBestScore ?? 0;
  const improved = score > prevBest;
  writeState(matchId, {
    ...s,
    quizAttempts: s.quizAttempts + 1,
    quizBestScore: improved ? score : prevBest,
  });
  if (!improved) return { xpGained: 0 };
  const delta = score - prevBest;
  const gained = delta * XP_QUIZ_PER_ANSWER;
  const p = getProgress();
  p.xp += gained;
  saveProgress(p);
  return { xpGained: gained };
}
