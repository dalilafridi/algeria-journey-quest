/**
 * Shared provenance / source data model — DZ Odyssey v1.0 Phase 4.
 *
 * A centralized model so every exhibit can declare traceable sources without
 * duplicating records. Sources are defined once in the registry and referenced
 * by id from any exhibit (figure, era, region, club, match, culture topic,
 * cuisine, timeline, football, women's football, …).
 *
 * All human-facing fields accept a `LocalizedString` so citations render in
 * English, French, and Arabic without duplicated records.
 */

import type { LocalizedString } from "@/lib/i18n";

/** Fine-grained kind used for badges and archival cues. */
export type ProvenanceKind =
  | "book"
  | "article"
  | "journal"
  | "newspaper"
  | "archive"
  | "official"
  | "museum"
  | "web"
  | "broadcast"
  | "image"
  | "database"
  | "interview"
  | "map"
  | "documentary"
  | "other";

/**
 * Curator-facing display group. Exhibits render source lists grouped by
 * these categories in the Sources & Further Reading panel.
 */
export type SourceCategory =
  | "primary"
  | "academic"
  | "museum"
  | "international"
  | "archive"
  | "media"
  | "football"
  | "further";

/** Scholarly consensus indicator — descriptive, never editorial. */
export type ConfidenceLevel =
  | "verified"
  | "widely-accepted"
  | "academic-debate"
  | "traditional"
  | "legend";

/** A single canonical source, defined once in the shared registry. */
export interface ProvenanceSource {
  /** Stable id, unique across the whole museum. e.g. "unesco-timgad". */
  id: string;
  /** Fine-grained kind (drives an icon / badge). */
  kind: ProvenanceKind;
  /** Display category — controls grouping in the panel. */
  category: SourceCategory;
  /** Title of the work, article, or archival item. */
  title: LocalizedString;
  /** Author, editor, journalist, or curator responsible. */
  author?: LocalizedString;
  /** Publishing institution, museum, archive, or outlet. */
  publisher?: LocalizedString;
  /** Optional archive or museum collection reference. */
  archive?: LocalizedString;
  /** URL to the publicly accessible source, when one exists. */
  url?: string;
  /** ISO 8601 date the source was published (YYYY, YYYY-MM, or YYYY-MM-DD). */
  publishedAt?: string;
  /** Language of the source (ISO 639-1). */
  language?: "en" | "fr" | "ar" | "mixed";
  /** Short curator's note explaining relevance or reliability. */
  note?: LocalizedString;
  /** Short institutional badge label, e.g. "UNESCO", "FIFA". */
  badge?: string;
}

/** Rights / attribution metadata for a media asset. */
export interface MediaAttribution {
  /** Description of what the asset depicts. */
  caption?: LocalizedString;
  photographer?: LocalizedString;
  collection?: LocalizedString;
  license?:
    | "public-domain"
    | "cc-by"
    | "cc-by-sa"
    | "cc-by-nc"
    | "fair-use"
    | "editorial"
    | "unknown";
  /** Reference to a source id in the registry. */
  sourceId?: string;
}

/** Optional curator note attached to an exhibit's provenance. */
export interface CuratorNote {
  body: LocalizedString;
  /** e.g. "dates", "reconstruction", "debate", "oral-tradition" */
  kind?: "dates" | "reconstruction" | "debate" | "oral-tradition" | "note";
}

/** Provenance record attached to a single exhibit. */
export interface ExhibitProvenanceRecord {
  /** Ordered list of shared source ids used by the exhibit. */
  sourceIds: string[];
  /** Overall confidence label — describes scholarly consensus. */
  confidence?: ConfidenceLevel;
  /** Optional intro shown above the source list. */
  intro?: LocalizedString;
  /** Curator notes (dates vary, reconstruction, ongoing debate, …). */
  notes?: CuratorNote[];
  /** Media attribution for imagery / archival items on the page. */
  media?: MediaAttribution[];
  /** Further-reading source ids (rendered under a separate group). */
  furtherReadingIds?: string[];
}
