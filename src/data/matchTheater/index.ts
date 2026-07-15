/**
 * Match Theater registry.
 *
 * Add new matches by creating another data file (e.g. `chile-1982.ts`) and
 * registering it below. The route file `theater.$matchId.tsx` reads only
 * from this registry — no other UI code touches match data.
 */

import type { MatchTheater, MatchTheaterSummary } from "./types";
import { gijon1982 } from "./gijon-1982";

export const MATCH_THEATERS: Record<string, MatchTheater> = {
  [gijon1982.id]: gijon1982,
  // Prepared slots for future Match Theater experiences. Add the data file,
  // import it above, and register it here to enable the route.
  // "chile-1982": …,
  // "england-2010": …,
  // "south-korea-2014": …,
  // "germany-2014": …,
  // "senegal-afcon-2019-final": …,
  // "egypt-2009-playoff": …,
};

export function getMatchTheater(id: string): MatchTheater | undefined {
  return MATCH_THEATERS[id];
}

export function listMatchTheaterSummaries(): MatchTheaterSummary[] {
  return Object.values(MATCH_THEATERS).map((m) => ({
    id: m.id,
    title: m.cinematicTitle,
    subtitle: m.cinematicSubtitle ?? { en: "", fr: "", ar: "" },
    date: m.date,
    displayDate: m.displayDate,
    venue: m.venue,
  }));
}

/** True when a Match Theater exists for the given (football-wing) match id. */
export function hasMatchTheater(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(MATCH_THEATERS, id);
}

/**
 * Football wing famous-match ids often differ slightly from theater ids.
 * This map lets callers translate a football exhibit id to a theater id
 * without leaking wing-specific naming into the theater layer.
 */
export const FOOTBALL_MATCH_TO_THEATER: Record<string, string> = {
  "algeria-germany-1982": "gijon-1982",
};

export function theaterIdForFootballMatch(footballMatchId: string): string | undefined {
  const id = FOOTBALL_MATCH_TO_THEATER[footballMatchId];
  if (!id) return undefined;
  return hasMatchTheater(id) ? id : undefined;
}
