/**
 * Shared provenance / source data model.
 *
 * Defined in Phase 1 so exhibit content can already declare citations in the
 * final shape. The visible `SourcesDrawer` UI is implemented in Phase 8, but
 * introducing the type now avoids a downstream content-model refactor.
 *
 * All human-facing fields accept a `LocalizedString` so citations render in
 * English, French, and Arabic without duplicated records.
 */

import type { LocalizedString } from "@/lib/i18n";

/** Kind of source, used for badges and grouping in the drawer. */
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
  | "other";

/** A single citation — the atomic unit rendered in the SourcesDrawer. */
export interface ProvenanceSource {
  /** Stable id, unique within an exhibit. */
  id: string;
  /** Source kind (drives an icon / badge in Phase 8). */
  kind?: ProvenanceKind;
  /** Title of the work, article, or archival item. */
  title: LocalizedString;
  /** Author, editor, journalist, or curator responsible. */
  author?: LocalizedString;
  /** Publishing institution, museum, archive, or outlet. */
  institution?: LocalizedString;
  /** URL to the publicly accessible source, when one exists. */
  url?: string;
  /** ISO 8601 date the source was published (YYYY, YYYY-MM, or YYYY-MM-DD). */
  publishedAt?: string;
  /** ISO 8601 date the DZ Odyssey team last consulted the source. */
  accessedAt?: string;
  /** Credit line for an image / archival item associated with this source. */
  imageCredit?: LocalizedString;
  /** Short curator's note explaining relevance or reliability. */
  curatorNote?: LocalizedString;
}

/** Bundle of citations for a single exhibit (figure, era, match, club, ...). */
export interface Provenance {
  /** Short intro shown above the citation list. */
  intro?: LocalizedString;
  /** Ordered list of sources. First entries take visual priority. */
  sources: ProvenanceSource[];
  /** Optional additional curator note (research context, gaps, caveats). */
  curatorNote?: LocalizedString;
}
