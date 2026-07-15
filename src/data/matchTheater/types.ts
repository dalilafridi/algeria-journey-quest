/**
 * Match Theater — reusable data model.
 *
 * A single MatchTheater fully describes a cinematic museum experience for
 * one historic Algerian match. All future matches (Chile '82, England '10,
 * Germany '14, Senegal AFCON '19 final, …) are added by dropping another
 * data file into src/data/matchTheater/ and registering it in index.ts —
 * no UI code changes required.
 */

import type { LocalizedString } from "@/lib/i18n";

/** Two teams in a match. */
export type Side = "home" | "away";

/**
 * A team as it appeared for this specific match. `crestGlyph` is a stylised
 * single-glyph engraving used in place of the real crest; UI always labels
 * it as a stylised recreation so nothing is mistaken for archival material.
 */
export type TeamInfo = {
  id: string;
  name: LocalizedString;
  /** Country/entity name for the sub-line (e.g. "Algeria", "West Germany"). */
  country: LocalizedString;
  /** Stylised single glyph rendered inside a medallion. Never presented as an archival crest. */
  crestGlyph: string;
  /** Two accent colours; used only for accent bars, never to convey standalone meaning. */
  colors: { primary: string; secondary: string };
  /** Head coach on the day. Optional if the record is uncertain. */
  coach?: LocalizedString;
  /** Starting formation (e.g. "4-3-3"). Optional. */
  formation?: string;
};

export type PlayerRole =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward";

export type LineupPlayer = {
  id: string;
  number?: number;
  name: string; // proper name; not localised
  role: PlayerRole;
  /** Position label shown on the plaque (e.g. "Centre-back", "Right winger"). */
  position?: LocalizedString;
  /** Club at the time of the match. */
  clubAtTime?: string;
  /** Country of the club at the time (helps disambiguate). */
  clubCountry?: string;
  isCaptain?: boolean;
  /** Role/contribution in this specific match. */
  matchRole?: LocalizedString;
  /** Career one-liner shown on the plaque. */
  career?: LocalizedString;
  /** Optional deep-link into the Legends Hall figure exhibit. */
  figureExhibitId?: string;
};

export type Lineup = {
  side: Side;
  starting: LineupPlayer[];
  substitutes: LineupPlayer[];
};

/** A single moment on the timeline. */
export type MatchEventKind =
  | "kickoff"
  | "goal"
  | "chance"
  | "save"
  | "yellow-card"
  | "red-card"
  | "substitution"
  | "tactical"
  | "halftime"
  | "fulltime";

export type MatchEvent = {
  id: string;
  minute: number; // 0..120
  side?: Side;
  kind: MatchEventKind;
  /** Short label surfaced on the timeline node and in the chip. */
  label: LocalizedString;
  /** Long form shown when the event opens. */
  detail?: LocalizedString;
  /** For goals — id of a NarrationSegment to bind. */
  narrationSegmentId?: string;
  /** For goals — build-up, assist, historical weight. */
  goal?: {
    scorerPlayerId: string;
    assistPlayerId?: string;
    buildup?: LocalizedString;
    significance?: LocalizedString;
    /**
     * Optional passing sequence on the pitch, coordinates in the shared
     * 0..100 space used by PitchDiagram.
     */
    sequence?: { x: number; y: number }[];
  };
  substitution?: { onPlayerId: string; offPlayerId: string; side: Side };
  card?: { playerId?: string; side: Side };
};

export type NarrationSegment = {
  id: string;
  /** Human minute anchor for display + captions. */
  minute?: number;
  kind: "intro" | "buildup" | "goal" | "context" | "finalWhistle" | "legacy";
  title: LocalizedString;
  body: LocalizedString;
};

export type HistoricalContext = {
  id: string;
  when: "pre-match" | "half-time" | "post-match" | "legacy";
  title: LocalizedString;
  body: LocalizedString;
};

export type ArchivalItem = {
  id: string;
  kind:
    | "photo"
    | "portrait"
    | "program"
    | "ticket"
    | "newspaper"
    | "jersey"
    | "poster"
    | "video";
  caption: LocalizedString;
  date?: string;
  source: LocalizedString;
  rights?: LocalizedString;
  /** True when the item is a reproduction/recreation rather than original archival material. */
  reproduction: boolean;
  /** Only set once the item has been sourced and cleared for use. */
  url?: string;
};

export type QuizQuestion = {
  id: string;
  question: LocalizedString;
  choices: LocalizedString[];
  answerIndex: number;
  rationale: LocalizedString;
};

export type SourceReference = {
  id: string;
  label: LocalizedString;
  publisher?: LocalizedString;
  url?: string;
};

export type RelatedExhibit = {
  label: LocalizedString;
  href: string;
};

/** Optional tactical description. Empty arrays render the "data not available" note. */
export type TacticsDescription = {
  side: Side;
  approach?: LocalizedString;
  keyChanges?: LocalizedString[];
};

export type MatchTheater = {
  id: string;
  /** Cinematic title card, e.g. "The Day Algeria Shocked the World". */
  cinematicTitle: LocalizedString;
  cinematicSubtitle?: LocalizedString;

  competition: LocalizedString;
  stage: LocalizedString;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  displayDate: LocalizedString;
  venue: LocalizedString;
  city: LocalizedString;
  country: LocalizedString;

  teams: { home: TeamInfo; away: TeamInfo };
  finalScore: { home: number; away: number };

  lineups: { home: Lineup; away: Lineup };

  /** Ordered by minute. Include kickoff (0), halftime (45), fulltime (90). */
  events: MatchEvent[];

  tactics: TacticsDescription[];
  narration: NarrationSegment[];
  context: HistoricalContext[];
  gallery: ArchivalItem[];
  sources: SourceReference[];
  quiz: QuizQuestion[];
  relatedExhibits: RelatedExhibit[];

  /** Passport stamp awarded at the final whistle. */
  passportStamp: {
    id: string;
    title: LocalizedString;
    hint: LocalizedString;
  };

  /** Reflection copy shown after the final whistle. */
  finalReflection: LocalizedString;

  /** id of the next Match Theater to link into, if any. */
  nextMatchId?: string;
};

export type MatchTheaterSummary = {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  date: string;
  displayDate: LocalizedString;
  venue: LocalizedString;
};
