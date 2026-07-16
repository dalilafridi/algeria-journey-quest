/**
 * Curator Portal — Phase 1 TypeScript models.
 *
 * These interfaces describe the entities the internal governance portal
 * will eventually manage. They are intentionally kept SEPARATE from the
 * public museum's content models in `src/data/` so that:
 *
 *  1. Public visitor bundles never import portal types.
 *  2. Phase 2 can back these with a database (Lovable Cloud / Supabase)
 *     without disturbing the current typed content files.
 *
 * Suggested Phase-2 Postgres mapping:
 *   ContentRecord     → public.content_records
 *   SourceRecord      → public.sources          (FK content_record_id)
 *   MediaAsset        → public.media_assets     (FK content_record_id)
 *   RoadmapItem       → public.roadmap_items
 *   DecisionRecord    → public.decisions
 *   ReleaseRecord     → public.releases
 *   QualityReview     → public.quality_reviews  (FK content_record_id)
 *   CoverageMetric    → public.coverage_metrics
 *   Contributor       → public.contributors     (FK profiles.id)
 *   ReviewTask        → public.review_tasks
 *
 * All Phase-1 usage is READ-ONLY. Editing is disabled in the UI.
 */

export type ContentKind =
  | "era"
  | "figure"
  | "region"
  | "culture"
  | "cuisine"
  | "cinema"
  | "football"
  | "club"
  | "match-theater"
  | "on-this-day"
  | "did-you-know"
  | "lesson"
  | "word"
  | "journey"
  | "quiz";

export type CompletenessStatus =
  | "complete"
  | "partial"
  | "placeholder"
  | "unknown";

export type LanguageCode = "en" | "fr" | "ar";

export interface ContentRecord {
  id: string;
  kind: ContentKind;
  titleEn: string;
  hasFr: boolean;
  hasAr: boolean;
  href?: string;
  status: CompletenessStatus;
  sourceCount: number;
  mediaCount: number;
  file: string;
  /** 0..1 — heuristic completeness score for sortable inventory. */
  completeness: number;
}

export type SourceKindId =
  | "primary"
  | "academic-book"
  | "academic-paper"
  | "archive"
  | "museum"
  | "government"
  | "news"
  | "documentary"
  | "interview"
  | "website"
  | "other";

export type ReliabilityTier = "high" | "medium" | "low" | "unverified";

export interface SourceRecord {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  publicationDate?: string;
  kind: SourceKindId;
  language?: LanguageCode | string;
  url?: string;
  archive?: string;
  identifier?: string;
  accessedDate?: string;
  verifiedDate?: string;
  reliability: ReliabilityTier;
  notes?: string;
  relatedExhibits: string[];
  rights?: string;
}

export type MediaKind = "image" | "audio" | "video" | "document";

export interface MediaAsset {
  id: string;
  location: string;
  kind: MediaKind;
  title?: string;
  caption?: string;
  creator?: string;
  date?: string;
  source?: string;
  rightsHolder?: string;
  license?: string;
  attribution?: string;
  altText?: string;
  isAuthenticArchive: boolean;
  isReconstruction: boolean;
  isAiGenerated: boolean;
  relatedExhibits: string[];
  uploadedAt?: string;
  verifiedAt?: string;
}

export type RoadmapStatus =
  | "proposed"
  | "researching"
  | "approved"
  | "in-progress"
  | "blocked"
  | "complete"
  | "deferred"
  | "rejected";

export type Priority = "critical" | "high" | "medium" | "low";
export type Effort = "xs" | "s" | "m" | "l" | "xl";

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  area: string;
  priority: Priority;
  status: RoadmapStatus;
  effort: Effort;
  dependencies?: string[];
  owner?: string;
  targetRelease?: string;
  acceptance?: string[];
  notes?: string;
  isIdea?: boolean;
}

export type DecisionStatus =
  | "accepted"
  | "proposed"
  | "superseded"
  | "deprecated";

export interface DecisionRecord {
  id: string;
  date: string;
  title: string;
  status: DecisionStatus;
  context: string;
  decision: string;
  alternatives: string[];
  consequences: string[];
  reviewDate?: string;
  related: string[];
}

export interface ReleaseRecord {
  version: string;
  date: string;
  title: string;
  added: string[];
  changed: string[];
  fixed: string[];
  content: string[];
  accessibility: string[];
  technical: string[];
  knownLimitations: string[];
}

export type QualityGrade =
  | "excellent"
  | "good"
  | "needs-review"
  | "incomplete"
  | "unknown";

export interface QualityReview {
  contentId: string;
  contentKind: ContentKind;
  english: QualityGrade;
  french: QualityGrade;
  arabic: QualityGrade;
  sources: QualityGrade;
  mediaCaptions: QualityGrade;
  mediaRights: QualityGrade;
  audioGuide: QualityGrade;
  quiz: QualityGrade;
  related: QualityGrade;
  mobile: QualityGrade;
  accessibility: QualityGrade;
  corpusIntegrated: QualityGrade;
}

export interface CoverageMetric {
  id: string;
  label: string;
  actual: number;
  target: number;
  /** Whether `actual/target` was computed from real files vs. estimated. */
  precision: "exact" | "estimated" | "not-started";
  formula?: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  languages: LanguageCode[];
}

export type ReviewTaskStatus = "open" | "in-progress" | "done" | "cancelled";

export interface ReviewTask {
  id: string;
  title: string;
  assignee?: string;
  status: ReviewTaskStatus;
  dueDate?: string;
  related: string[];
}
