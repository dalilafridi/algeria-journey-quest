/**
 * Club Museums — reusable data model.
 *
 * Every Algerian club museum (JSK, MCA, ESS, USMA, CRB, MCO, PAC…) is
 * fully described by one ClubMuseum record. The `/clubs` landing page
 * and the `/clubs/$clubId` museum route read only from this registry —
 * no component code hardcodes any club. To add a new club, drop another
 * data file into `src/data/clubs/` and register it in `index.ts`.
 *
 * Content policy: only publish verified information. When historical
 * sources disagree, use `note` to say so instead of picking a number.
 */

import type { LocalizedString } from "@/lib/i18n";

export type ClubStatus = "complete" | "coming-soon";

export type TrophyCategory =
  | "domestic-league"
  | "domestic-cup"
  | "super-cup"
  | "caf-champions"
  | "caf-cup-winners"
  | "caf-cup"
  | "regional";

export const TROPHY_CATEGORY_LABEL: Record<TrophyCategory, LocalizedString> = {
  "domestic-league": { en: "Algerian Ligue 1", fr: "Ligue 1 algérienne", ar: "الرابطة الجزائرية الأولى" },
  "domestic-cup": { en: "Algerian Cup", fr: "Coupe d'Algérie", ar: "كأس الجزائر" },
  "super-cup": { en: "Algerian Super Cup", fr: "Supercoupe d'Algérie", ar: "كأس السوبر الجزائرية" },
  "caf-champions": { en: "CAF Champions Cup / League", fr: "Coupe / Ligue des Champions de la CAF", ar: "دوري أبطال أفريقيا" },
  "caf-cup-winners": { en: "African Cup Winners' Cup", fr: "Coupe d'Afrique des vainqueurs de coupe", ar: "كأس الكؤوس الأفريقية" },
  "caf-cup": { en: "CAF Cup", fr: "Coupe de la CAF", ar: "كأس الكاف" },
  regional: { en: "Regional / Other", fr: "Régionale / Autre", ar: "إقليمية / أخرى" },
};

export type Trophy = {
  id: string;
  year: number;
  category: TrophyCategory;
  competition: LocalizedString;
  opponent?: LocalizedString;
  score?: string;
  location?: LocalizedString;
  significance?: LocalizedString;
  note?: LocalizedString;
};

export type TimelineEvent = {
  id: string;
  year: number;
  monthDay?: string;
  kind: "foundation" | "title" | "african" | "final" | "player" | "coach" | "stadium" | "milestone";
  title: LocalizedString;
  detail?: LocalizedString;
};

export type Player = {
  id: string;
  name: LocalizedString;
  position: LocalizedString;
  years: string;
  bio: LocalizedString;
  achievements?: LocalizedString[];
  stats?: { label: LocalizedString; value: string }[];
  note?: LocalizedString;
};

export type Coach = {
  id: string;
  name: LocalizedString;
  years: string;
  philosophy?: LocalizedString;
  bio: LocalizedString;
  achievements?: LocalizedString[];
};

export type Stadium = {
  id: string;
  name: LocalizedString;
  city: LocalizedString;
  capacity?: string;
  built?: string;
  bio: LocalizedString;
  architecture?: LocalizedString;
  historicMatches?: LocalizedString[];
};

export type JerseyEra = {
  id: string;
  decade: string;
  title: LocalizedString;
  colors: { primary: string; secondary: string };
  notes: LocalizedString;
};

export type ArchiveItem = {
  id: string;
  kind: "ticket" | "programme" | "newspaper" | "photograph" | "poster" | "memorabilia";
  title: LocalizedString;
  year?: number;
  description: LocalizedString;
  source?: LocalizedString;
};

export type StatRecord = {
  id: string;
  label: LocalizedString;
  value: LocalizedString;
  note?: LocalizedString;
};

export type CultureEntry = {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
};

export type HistoricMatch = {
  id: string;
  year: number;
  title: LocalizedString;
  summary: LocalizedString;
  /** If present and registered in Match Theater, links to /theater/<id>. */
  theaterId?: string;
};

export type QuizQuestion = {
  id: string;
  q: LocalizedString;
  choices: LocalizedString[];
  answerIndex: number;
  explain?: LocalizedString;
};

export type ClubIdentity = {
  colors: { primary: string; secondary: string };
  crestGlyph: string; // stylised placeholder glyph — never presented as archival crest
  motto?: LocalizedString;
  meaning?: LocalizedString;
  crestHistory?: LocalizedString;
};

export type ClubMuseum = {
  id: string;
  shortName: string; // e.g. "JSK"
  fullName: LocalizedString;
  city: LocalizedString;
  founded: number;
  status: ClubStatus;
  featured?: boolean;
  tagline: LocalizedString;
  identity: ClubIdentity;

  // Full-content sections (only required when status === "complete")
  origins?: {
    context: LocalizedString;
    foundation: LocalizedString;
    evolution: LocalizedString[];
  };
  timeline?: TimelineEvent[];
  trophies?: Trophy[];
  africanGlory?: {
    intro: LocalizedString;
    highlights: LocalizedString[];
    finals: {
      year: number;
      competition: LocalizedString;
      opponent: LocalizedString;
      score: string;
      note?: LocalizedString;
    }[];
  };
  legends?: Player[];
  coaches?: Coach[];
  historicMatches?: HistoricMatch[];
  stadiums?: Stadium[];
  culture?: {
    intro: LocalizedString;
    entries: CultureEntry[];
  };
  jerseys?: JerseyEra[];
  archive?: ArchiveItem[];
  stats?: {
    intro?: LocalizedString;
    records: StatRecord[];
  };
  quiz?: QuizQuestion[];

  /** Sources bibliography — always show for transparency. */
  sources?: LocalizedString[];
};
