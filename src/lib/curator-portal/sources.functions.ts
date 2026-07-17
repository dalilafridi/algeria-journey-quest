/**
 * Research Library — authenticated server functions.
 *
 * Every mutation goes through a SECURITY DEFINER RPC that:
 *   1. re-verifies auth.uid() server-side,
 *   2. enforces role-based authorization (can_write_sources, can_archive_sources,
 *      can_verify_sources),
 *   3. writes an audit_log row in the same transaction.
 *
 * The client-facing server functions below are defense-in-depth wrappers that
 * validate input with Zod before the RPC runs. Never trust `created_by` /
 * `updated_by` from the client — the RPCs derive them from `auth.uid()`.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ---- Enums (must match the DB) ----------------------------------------
export const SOURCE_TYPES = [
  "primary_source", "academic_book", "academic_article", "archive",
  "museum_record", "government_record", "oral_history", "interview",
  "newspaper", "map", "photograph", "film", "audio", "documentary",
  "website", "other",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const RELIABILITY_TIERS = [
  "primary", "scholarly", "institutional", "reputable_secondary",
  "contextual", "unverified",
] as const;
export type ReliabilityTier = (typeof RELIABILITY_TIERS)[number];

export const RIGHTS_STATUSES = [
  "public_domain", "licensed", "permission_required",
  "fair_use_review", "unknown", "not_applicable",
] as const;
export type RightsStatus = (typeof RIGHTS_STATUSES)[number];

export const SOURCE_STATUSES = ["draft", "verified", "archived"] as const;
export type SourceStatus = (typeof SOURCE_STATUSES)[number];

export const SOURCE_TYPE_LABEL: Record<SourceType, string> = {
  primary_source: "Primary source",
  academic_book: "Academic book",
  academic_article: "Academic article",
  archive: "Archive",
  museum_record: "Museum record",
  government_record: "Government record",
  oral_history: "Oral history",
  interview: "Interview",
  newspaper: "Newspaper",
  map: "Map",
  photograph: "Photograph",
  film: "Film",
  audio: "Audio",
  documentary: "Documentary",
  website: "Website",
  other: "Other",
};
export const RELIABILITY_LABEL: Record<ReliabilityTier, string> = {
  primary: "Primary",
  scholarly: "Scholarly",
  institutional: "Institutional",
  reputable_secondary: "Reputable secondary",
  contextual: "Contextual",
  unverified: "Unverified",
};
export const RIGHTS_LABEL: Record<RightsStatus, string> = {
  public_domain: "Public domain",
  licensed: "Licensed",
  permission_required: "Permission required",
  fair_use_review: "Fair-use review",
  unknown: "Unknown",
  not_applicable: "Not applicable",
};
export const STATUS_LABEL: Record<SourceStatus, string> = {
  draft: "Draft",
  verified: "Verified",
  archived: "Archived",
};

// ---- Types ------------------------------------------------------------
export interface SourceRow {
  id: string;
  title: string;
  author: string | null;
  publisher: string | null;
  publication_date: string | null;
  publication_year: number | null;
  source_type: SourceType;
  language: string | null;
  url: string | null;
  isbn: string | null;
  archive_or_institution: string | null;
  identifier: string | null;
  accessed_date: string | null;
  verification_date: string | null;
  reliability_tier: ReliabilityTier;
  rights_status: RightsStatus;
  citation_text: string | null;
  notes: string | null;
  link_count?: number;
  status: SourceStatus;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}

export interface SourceLinkRow {
  id: string;
  source_id: string;
  content_type: string;
  content_id: string;
  content_label: string;
  public_route: string | null;
  relationship_note: string | null;
  created_by: string;
  created_at: string;
}

// ---- Validators -------------------------------------------------------
const optionalText = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => (v && v.length > 0 ? v : undefined));
const optionalDate = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined));

const sourcePayloadSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(500),
  author: optionalText(300),
  publisher: optionalText(300),
  publication_date: optionalDate,
  publication_year: z
    .union([z.number().int().min(-3000).max(3000), z.string().length(0)])
    .optional()
    .transform((v) => (typeof v === "number" ? v : undefined)),
  source_type: z.enum(SOURCE_TYPES),
  language: optionalText(20),
  url: optionalText(2048),
  isbn: optionalText(60),
  archive_or_institution: optionalText(300),
  identifier: optionalText(200),
  accessed_date: optionalDate,
  reliability_tier: z.enum(RELIABILITY_TIERS),
  rights_status: z.enum(RIGHTS_STATUSES),
  citation_text: optionalText(2000),
  notes: optionalText(4000),
});
export type SourcePayload = z.infer<typeof sourcePayloadSchema>;

// ---- Reads ------------------------------------------------------------
export const listSources = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Two queries — no N+1. Sources plus a flat list of link source_ids
    // aggregated in memory into an exact link_count per source.
    const [srcRes, linkRes] = await Promise.all([
      context.supabase
        .from("source_records")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(500),
      context.supabase.from("source_links").select("source_id"),
    ]);
    if (srcRes.error) throw new Error(srcRes.error.message);
    if (linkRes.error) throw new Error(linkRes.error.message);
    const counts = new Map<string, number>();
    for (const l of (linkRes.data ?? []) as { source_id: string }[]) {
      counts.set(l.source_id, (counts.get(l.source_id) ?? 0) + 1);
    }
    return (srcRes.data ?? []).map((r) => ({
      ...(r as SourceRow),
      link_count: counts.get((r as SourceRow).id) ?? 0,
    })) as SourceRow[];
  });

// Studio-only aggregate: for every (content_type, content_id) referenced
// in source_links, return the exact linked/verified/draft counts and the
// most recent verification date of any linked source. Single joined query
// — no N+1. Public museum surfaces do NOT consume this.
export interface ContentCoverageRow {
  content_type: string;
  content_id: string;
  linked: number;
  verified: number;
  draft: number;
  archived: number;
  last_verification_date: string | null;
}
export const listContentCoverage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("source_links")
      .select("content_type, content_id, source_records(status, verification_date)")
      .limit(5000);
    if (error) throw new Error(error.message);
    type Row = {
      content_type: string;
      content_id: string;
      source_records:
        | { status: SourceStatus; verification_date: string | null }
        | { status: SourceStatus; verification_date: string | null }[]
        | null;
    };
    const map = new Map<string, ContentCoverageRow>();
    for (const row of (data ?? []) as Row[]) {
      const key = `${row.content_type}:${row.content_id}`;
      let agg = map.get(key);
      if (!agg) {
        agg = {
          content_type: row.content_type,
          content_id: row.content_id,
          linked: 0, verified: 0, draft: 0, archived: 0,
          last_verification_date: null,
        };
        map.set(key, agg);
      }
      agg.linked += 1;
      const sr = Array.isArray(row.source_records) ? row.source_records[0] : row.source_records;
      if (sr) {
        if (sr.status === "verified") agg.verified += 1;
        else if (sr.status === "draft") agg.draft += 1;
        else if (sr.status === "archived") agg.archived += 1;
        if (sr.verification_date && (!agg.last_verification_date || sr.verification_date > agg.last_verification_date)) {
          agg.last_verification_date = sr.verification_date;
        }
      }
    }
    return Array.from(map.values());
  });

export type CoverageState = "none" | "linked" | "verified" | "needs_review";
export function coverageStateFor(c: ContentCoverageRow | undefined): CoverageState {
  if (!c || c.linked === 0) return "none";
  if (c.verified > 0 && c.draft === 0) return "verified";
  if (c.verified > 0 && c.draft > 0) return "needs_review";
  return "linked";
}
export const COVERAGE_LABEL: Record<CoverageState, string> = {
  none: "No structured sources",
  linked: "Sources linked",
  verified: "Verified coverage",
  needs_review: "Needs review",
};

// Reverse lookup: all sources linked to a specific Studio content record.
export const listSourcesForContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    content_type: z.string().trim().min(1).max(60),
    content_id: z.string().trim().min(1).max(200),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: links, error } = await context.supabase
      .from("source_links")
      .select("*, source_records(*)")
      .eq("content_type", data.content_type)
      .eq("content_id", data.content_id)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    type Row = SourceLinkRow & { source_records: SourceRow | SourceRow[] | null };
    return ((links ?? []) as Row[]).map((l) => ({
      link: {
        id: l.id, source_id: l.source_id, content_type: l.content_type,
        content_id: l.content_id, content_label: l.content_label,
        public_route: l.public_route, relationship_note: l.relationship_note,
        created_by: l.created_by, created_at: l.created_at,
      } as SourceLinkRow,
      source: (Array.isArray(l.source_records) ? l.source_records[0] : l.source_records) as SourceRow | null,
    }));
  });


export const getSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("source_records")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Source not found");
    const { data: links, error: lErr } = await context.supabase
      .from("source_links")
      .select("*")
      .eq("source_id", data.id)
      .order("created_at", { ascending: true });
    if (lErr) throw new Error(lErr.message);
    const { data: audit, error: aErr } = await context.supabase
      .from("audit_log")
      .select("id, action, actor_user_id, actor_email_snapshot, before_summary, after_summary, created_at")
      .eq("entity_type", "source_record")
      .eq("entity_id", data.id)
      .order("created_at", { ascending: false })
      .limit(200);
    if (aErr) throw new Error(aErr.message);
    return {
      source: row as SourceRow,
      links: (links ?? []) as SourceLinkRow[],
      audit: audit ?? [],
    };
  });

// ---- Mutations --------------------------------------------------------
export const createSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => sourcePayloadSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: id, error } = await context.supabase.rpc("create_source", {
      _payload: data as never,
    });
    if (error) throw new Error(error.message);
    return { id: id as string };
  });

const updateInput = z.object({ id: z.string().uuid(), payload: sourcePayloadSchema.partial() });
export const updateSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => updateInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("update_source", {
      _id: data.id,
      _payload: data.payload as never,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const archiveSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("archive_source", { _id: data.id });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const restoreSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("restore_source", { _id: data.id });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const verifyInput = z.object({
  id: z.string().uuid(),
  verified: z.boolean(),
  verification_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
export const setSourceVerificationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => verifyInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("set_source_verification", {
      _id: data.id,
      _verified: data.verified,
      _verification_date: data.verification_date ?? (null as unknown as string),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const linkInput = z.object({
  source_id: z.string().uuid(),
  content_type: z.string().trim().min(1).max(60),
  content_id: z.string().trim().min(1).max(200),
  content_label: z.string().trim().min(1).max(300),
  public_route: z.string().trim().max(500).optional(),
  relationship_note: z.string().trim().max(1000).optional(),
});
export const linkSourceToContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => linkInput.parse(d))
  .handler(async ({ data, context }) => {
    const { data: id, error } = await context.supabase.rpc("link_source_to_content", {
      _source_id: data.source_id,
      _content_type: data.content_type,
      _content_id: data.content_id,
      _content_label: data.content_label,
      _public_route: data.public_route ?? "",
      _relationship_note: data.relationship_note ?? "",
    });
    if (error) throw new Error(error.message);
    return { id: id as string };
  });

export const unlinkSourceFromContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ link_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("unlink_source_from_content", {
      _link_id: data.link_id,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
