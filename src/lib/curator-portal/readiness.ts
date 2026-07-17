/**
 * Figure draft — deterministic readiness advisory.
 *
 * Shared, pure. Used by the editor header, the drafts list, Mission
 * Control, and My Work so the SAME rules and language appear everywhere.
 *
 * This is ADVISORY. The database-side transition matrix
 * (transition_figure_draft) is the authoritative approval gate.
 *
 * Signals we surface (five buckets):
 *   1. identity       — slug, name_en, subtitle_en, birth/death year
 *   2. narrative      — summary_en (~120–500 chars), biography_en (>= 800)
 *   3. sources        — >= 2 linked, at least 1 verified
 *   4. translations   — summary_fr/ar and biography_fr/ar present
 *   5. relationships  — >= 1 era, >= 1 region, >= 1 theme
 */
import type { FigureDraftDetail } from "./figure-drafts.functions";

export type ReadinessLevel = "ok" | "warn" | "missing";

export interface ReadinessBucket {
  key: "identity" | "narrative" | "sources" | "translations" | "relationships";
  label: string;
  level: ReadinessLevel;
  detail: string;
}

export interface ReadinessReport {
  buckets: ReadinessBucket[];
  score: number;         // 0–100
  ok: number;
  warn: number;
  missing: number;
  formalApprovalReady: boolean; // mirrors server rule (name_en + biography_en)
  formalBlockers: string[];
}

const LEVEL_SCORE: Record<ReadinessLevel, number> = { ok: 100, warn: 60, missing: 0 };

export function evaluateFigureReadiness(
  detail: FigureDraftDetail,
  sourceCount: { total: number; verified: number },
): ReadinessReport {
  const d = detail.draft;

  // 1. Identity
  const identityMissing: string[] = [];
  if (!d.slug) identityMissing.push("slug");
  if (!d.name_en) identityMissing.push("English name");
  const identityWarn: string[] = [];
  if (!d.subtitle_en) identityWarn.push("subtitle");
  if (d.birth_year == null && !d.birth_date_text) identityWarn.push("birth date");
  const identity: ReadinessBucket = {
    key: "identity",
    label: "Identity",
    level: identityMissing.length ? "missing" : identityWarn.length ? "warn" : "ok",
    detail: identityMissing.length
      ? `Missing: ${identityMissing.join(", ")}`
      : identityWarn.length
        ? `Add: ${identityWarn.join(", ")}`
        : "Slug, name and subtitle set.",
  };

  // 2. Narrative
  const summaryLen = (d.summary_en ?? "").trim().length;
  const bioLen = (d.biography_en ?? "").trim().length;
  let narrativeLevel: ReadinessLevel = "ok";
  const narrativeNotes: string[] = [];
  if (!d.biography_en || bioLen < 200) { narrativeLevel = "missing"; narrativeNotes.push("English biography < 200 chars"); }
  else if (bioLen < 800) { narrativeLevel = narrativeLevel === "missing" ? "missing" : "warn"; narrativeNotes.push(`biography ${bioLen} chars (target 800+)`); }
  if (!d.summary_en || summaryLen < 60) { narrativeLevel = "missing"; narrativeNotes.push("summary < 60 chars"); }
  else if (summaryLen < 120 || summaryLen > 600) { narrativeLevel = narrativeLevel === "missing" ? "missing" : "warn"; narrativeNotes.push(`summary ${summaryLen} chars (target 120–500)`); }
  const narrative: ReadinessBucket = {
    key: "narrative",
    label: "Narrative",
    level: narrativeLevel,
    detail: narrativeNotes.length ? narrativeNotes.join(" · ") : "Summary and biography present at healthy length.",
  };

  // 3. Sources
  let sourcesLevel: ReadinessLevel = "ok";
  let sourcesDetail = `${sourceCount.total} linked · ${sourceCount.verified} verified`;
  if (sourceCount.total === 0) { sourcesLevel = "missing"; sourcesDetail = "No sources linked"; }
  else if (sourceCount.verified === 0) { sourcesLevel = "warn"; sourcesDetail += " · none verified"; }
  else if (sourceCount.total < 2) { sourcesLevel = "warn"; sourcesDetail += " · fewer than 2 sources"; }
  const sources: ReadinessBucket = { key: "sources", label: "Sources", level: sourcesLevel, detail: sourcesDetail };

  // 4. Translations
  const trPresent = {
    fr: !!(d.summary_fr && d.biography_fr),
    ar: !!(d.summary_ar && d.biography_ar),
  };
  let trLevel: ReadinessLevel = "ok";
  const trMissing: string[] = [];
  if (!trPresent.fr) trMissing.push("French");
  if (!trPresent.ar) trMissing.push("Arabic");
  if (trMissing.length === 2) trLevel = "missing";
  else if (trMissing.length === 1) trLevel = "warn";
  const translations: ReadinessBucket = {
    key: "translations",
    label: "Translations",
    level: trLevel,
    detail: trMissing.length ? `Missing ${trMissing.join(" and ")}` : "French and Arabic present.",
  };

  // 5. Relationships
  const eras = detail.eras.length;
  const regions = detail.regions.length;
  const themes = detail.themes.length;
  const relMissing: string[] = [];
  if (eras === 0) relMissing.push("era");
  if (regions === 0) relMissing.push("region");
  if (themes === 0) relMissing.push("theme");
  const relationships: ReadinessBucket = {
    key: "relationships",
    label: "Context",
    level: relMissing.length >= 2 ? "missing" : relMissing.length === 1 ? "warn" : "ok",
    detail: relMissing.length
      ? `Missing: ${relMissing.join(", ")}`
      : `${eras} era · ${regions} region · ${themes} theme`,
  };

  const buckets = [identity, narrative, sources, translations, relationships];
  const score = Math.round(buckets.reduce((s, b) => s + LEVEL_SCORE[b.level], 0) / buckets.length);
  const ok = buckets.filter((b) => b.level === "ok").length;
  const warn = buckets.filter((b) => b.level === "warn").length;
  const missing = buckets.filter((b) => b.level === "missing").length;

  // Mirror of DB-side approval rule: name_en + biography_en are required.
  const formalBlockers: string[] = [];
  if (!d.name_en) formalBlockers.push("English name");
  if (!d.biography_en) formalBlockers.push("English biography");
  const formalApprovalReady = formalBlockers.length === 0;

  return { buckets, score, ok, warn, missing, formalApprovalReady, formalBlockers };
}

/** Cheap variant for the drafts LIST, where we don't have full detail. */
export interface ListReadinessInput {
  slug: string | null;
  name_en: string | null;
  summary_en: string | null;
  biography_en: string | null;
  summary_fr: string | null;
  summary_ar: string | null;
  biography_fr: string | null;
  biography_ar: string | null;
}

export function evaluateFigureListReadiness(row: ListReadinessInput): {
  score: number;
  translationsComplete: boolean;
  narrativeComplete: boolean;
} {
  const narrativeComplete =
    (row.summary_en ?? "").trim().length >= 120 && (row.biography_en ?? "").trim().length >= 800;
  const translationsComplete = !!(row.summary_fr && row.summary_ar && row.biography_fr && row.biography_ar);
  const identity = !!(row.slug && row.name_en);
  const score = Math.round(
    ((identity ? 100 : 0) + (narrativeComplete ? 100 : row.biography_en ? 60 : 0) + (translationsComplete ? 100 : (row.summary_fr || row.summary_ar ? 60 : 0))) / 3,
  );
  return { score, translationsComplete, narrativeComplete };
}
