/**
 * Historical Figure Drafts — authenticated Studio server functions.
 *
 * SECURITY POSTURE (matches the migration):
 *  - Every mutation is a wrapper around a SECURITY DEFINER RPC.
 *  - The RPCs derive actor from auth.uid() — the client CANNOT set
 *    created_by / updated_by / approved_by / submitted_by.
 *  - The RPCs re-verify the caller's role via can_* helpers
 *    (can_write_figure_drafts, can_research_figure_drafts,
 *    can_fact_check_figure_drafts, can_translate_figure_drafts,
 *    can_translation_review_figure_drafts, can_approve_figure_drafts).
 *  - transition_figure_draft enforces the workflow transition matrix
 *    and rejects any invalid next state at the database level.
 *  - update_figure_draft with scope='narrative' or scope='identity' is
 *    REJECTED for drafts in the "approved" state. Approved drafts cannot
 *    be silently edited (only archived/restored).
 *  - Every material update calls _snapshot_figure_draft under a
 *    per-draft advisory lock, so revision_number is monotonic even
 *    under concurrent updates.
 *  - Every mutation writes an audit_log row in the same transaction.
 *
 * Client-side Zod validation below is defense-in-depth (fast feedback,
 * strong typing); it is NOT the security boundary.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import type { AppRole } from "./permissions";
import { isValidTaxonomyId, type RelationKind } from "./taxonomies";

// ---------------- Enums / labels --------------------------------------

export const FIGURE_DRAFT_STATUSES = [
  "draft",
  "research_review",
  "fact_check",
  "translation_review",
  "curator_review",
  "approved",
  "changes_requested",
  "archived",
] as const;
export type FigureDraftStatus = (typeof FIGURE_DRAFT_STATUSES)[number];

export const STATUS_LABEL: Record<FigureDraftStatus, string> = {
  draft: "Draft",
  research_review: "Research review",
  fact_check: "Fact check",
  translation_review: "Translation review",
  curator_review: "Curator review",
  approved: "Approved",
  changes_requested: "Changes requested",
  archived: "Archived",
};

// ---------------- Transition matrix -----------------------------------
//
// Client-side mirror of the DB matrix. The DB is authoritative — this
// exists to build the correct action buttons. Every entry lists:
//   next state, human label, roles allowed to perform, whether a
//   review note is required.

export interface TransitionSpec {
  next: FigureDraftStatus;
  label: string;
  roles: AppRole[];
  requireNote: boolean;
}

const AUTHOR_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "curator", "researcher",
];
const RESEARCH_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "curator", "researcher",
];
const FACT_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "fact_checker",
];
const TRANSLATION_REVIEW_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "translation_reviewer",
];
const APPROVE_ROLES: AppRole[] = ["museum_director", "senior_curator"];

export const TRANSITIONS: Record<FigureDraftStatus, TransitionSpec[]> = {
  draft: [
    { next: "research_review", label: "Send to research review", roles: AUTHOR_ROLES, requireNote: false },
  ],
  research_review: [
    { next: "fact_check", label: "Pass research → fact check", roles: RESEARCH_ROLES, requireNote: false },
    { next: "changes_requested", label: "Request changes", roles: RESEARCH_ROLES, requireNote: true },
  ],
  fact_check: [
    { next: "translation_review", label: "Pass fact check → translation review", roles: FACT_ROLES, requireNote: false },
    { next: "changes_requested", label: "Request changes", roles: FACT_ROLES, requireNote: true },
  ],
  translation_review: [
    { next: "curator_review", label: "Pass translation → curator review", roles: TRANSLATION_REVIEW_ROLES, requireNote: false },
    { next: "changes_requested", label: "Request changes", roles: TRANSLATION_REVIEW_ROLES, requireNote: true },
  ],
  curator_review: [
    { next: "approved", label: "Approve draft (locks editing)", roles: APPROVE_ROLES, requireNote: false },
    { next: "changes_requested", label: "Request changes", roles: APPROVE_ROLES, requireNote: true },
  ],
  changes_requested: [
    { next: "draft", label: "Reopen as draft", roles: AUTHOR_ROLES, requireNote: false },
  ],
  approved: [], // locked — only archive/restore actions apply
  archived: [], // restore is a dedicated action (not a transition)
};

// ---------------- Row types (typed against generated Database) --------

type Row<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type FigureDraftRow = Row<"figure_drafts">;
export type FigureDraftRevisionRow = Row<"figure_draft_revisions">;
export type FigureDraftEraRow = Row<"figure_draft_eras">;
export type FigureDraftRegionRow = Row<"figure_draft_regions">;
export type FigureDraftThemeRow = Row<"figure_draft_themes">;
export type FigureDraftRelatedFigureRow = Row<"figure_draft_related_figures">;

// ---------------- Scoped-update payload types -------------------------

export const identityPayloadSchema = z.object({
  slug: z.string().trim().min(2).max(120)
    .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "lowercase letters, digits and hyphens only"),
  name_en: z.string().trim().min(1).max(200),
  name_fr: z.string().trim().max(200).optional().nullable(),
  name_ar: z.string().trim().max(200).optional().nullable(),
  subtitle_en: z.string().trim().max(300).optional().nullable(),
  subtitle_fr: z.string().trim().max(300).optional().nullable(),
  subtitle_ar: z.string().trim().max(300).optional().nullable(),
  birth_year: z.number().int().min(-3000).max(3000).optional().nullable(),
  death_year: z.number().int().min(-3000).max(3000).optional().nullable(),
  birth_date_text: z.string().trim().max(120).optional().nullable(),
  death_date_text: z.string().trim().max(120).optional().nullable(),
  birthplace_text_en: z.string().trim().max(200).optional().nullable(),
  birthplace_text_fr: z.string().trim().max(200).optional().nullable(),
  birthplace_text_ar: z.string().trim().max(200).optional().nullable(),
});
export type IdentityPayload = z.infer<typeof identityPayloadSchema>;

export const narrativePayloadSchema = z.object({
  summary_en: z.string().trim().max(2000).optional().nullable(),
  biography_en: z.string().trim().max(50_000).optional().nullable(),
});
export type NarrativePayload = z.infer<typeof narrativePayloadSchema>;

export const translationPayloadSchema = z.object({
  summary_fr: z.string().trim().max(2000).optional().nullable(),
  summary_ar: z.string().trim().max(2000).optional().nullable(),
  biography_fr: z.string().trim().max(50_000).optional().nullable(),
  biography_ar: z.string().trim().max(50_000).optional().nullable(),
});
export type TranslationPayload = z.infer<typeof translationPayloadSchema>;

// Server function signature mirrors the DB RPC's contract exactly.
export type UpdateScope = "identity" | "narrative" | "translation";

// ---------------- Reads ----------------------------------------------

export const listFigureDrafts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<FigureDraftRow[]> => {
    const { data, error } = await context.supabase
      .from("figure_drafts")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []) as FigureDraftRow[];
  });

export interface FigureDraftDetail {
  draft: FigureDraftRow;
  revisions: FigureDraftRevisionRow[];
  eras: FigureDraftEraRow[];
  regions: FigureDraftRegionRow[];
  themes: FigureDraftThemeRow[];
  relatedFigures: FigureDraftRelatedFigureRow[];
  audit: Array<{
    id: string;
    action: string;
    actor_user_id: string | null;
    actor_email_snapshot: string | null;
    before_summary: unknown;
    after_summary: unknown;
    metadata: unknown;
    created_at: string;
  }>;
}

export const getFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }): Promise<FigureDraftDetail> => {
    const [dRes, rRes, eRes, gRes, tRes, fRes, aRes] = await Promise.all([
      context.supabase.from("figure_drafts").select("*").eq("id", data.id).maybeSingle(),
      context.supabase.from("figure_draft_revisions").select("*").eq("figure_draft_id", data.id).order("revision_number", { ascending: false }),
      context.supabase.from("figure_draft_eras").select("*").eq("figure_draft_id", data.id).order("created_at"),
      context.supabase.from("figure_draft_regions").select("*").eq("figure_draft_id", data.id).order("created_at"),
      context.supabase.from("figure_draft_themes").select("*").eq("figure_draft_id", data.id).order("created_at"),
      context.supabase.from("figure_draft_related_figures").select("*").eq("figure_draft_id", data.id).order("created_at"),
      context.supabase
        .from("audit_log")
        .select("id, action, actor_user_id, actor_email_snapshot, before_summary, after_summary, metadata, created_at")
        .eq("entity_type", "figure_draft")
        .eq("entity_id", data.id)
        .order("created_at", { ascending: false })
        .limit(200),
    ]);
    if (dRes.error) throw new Error(dRes.error.message);
    if (!dRes.data) throw new Error("Draft not found");
    if (rRes.error) throw new Error(rRes.error.message);
    if (eRes.error) throw new Error(eRes.error.message);
    if (gRes.error) throw new Error(gRes.error.message);
    if (tRes.error) throw new Error(tRes.error.message);
    if (fRes.error) throw new Error(fRes.error.message);
    if (aRes.error) throw new Error(aRes.error.message);
    return {
      draft: dRes.data as FigureDraftRow,
      revisions: (rRes.data ?? []) as FigureDraftRevisionRow[],
      eras: (eRes.data ?? []) as FigureDraftEraRow[],
      regions: (gRes.data ?? []) as FigureDraftRegionRow[],
      themes: (tRes.data ?? []) as FigureDraftThemeRow[],
      relatedFigures: (fRes.data ?? []) as FigureDraftRelatedFigureRow[],
      audit: (aRes.data ?? []) as FigureDraftDetail["audit"],
    };
  });

// ---------------- Create ---------------------------------------------

export const createFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => identityPayloadSchema.parse(d))
  .handler(async ({ data, context }) => {
    // RPC re-verifies auth.uid() + can_write_figure_drafts, derives
    // created_by/updated_by from auth.uid(), snapshots as revision 1,
    // and writes an audit_log entry.
    const { data: id, error } = await context.supabase.rpc("create_figure_draft", {
      _payload: data as never,
    });
    if (error) throw new Error(error.message);
    return { id: id as string };
  });

// ---------------- Scoped update --------------------------------------

const updateInput = z.object({
  id: z.string().uuid(),
  scope: z.enum(["identity", "narrative", "translation"]),
  payload: z.record(z.string(), z.unknown()),
});

export const updateFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => {
    const parsed = updateInput.parse(d);
    // Structural validation per-scope (belt-and-braces; the DB re-validates).
    if (parsed.scope === "identity") identityPayloadSchema.partial().parse(parsed.payload);
    else if (parsed.scope === "narrative") narrativePayloadSchema.partial().parse(parsed.payload);
    else if (parsed.scope === "translation") translationPayloadSchema.partial().parse(parsed.payload);
    return parsed;
  })
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("update_figure_draft", {
      _id: data.id,
      _scope: data.scope,
      _payload: data.payload as never,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- Workflow transition --------------------------------

const transitionInput = z.object({
  id: z.string().uuid(),
  next: z.enum(FIGURE_DRAFT_STATUSES),
  note: z.string().trim().max(4000).optional(),
});

export const transitionFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => transitionInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("transition_figure_draft", {
      _id: data.id,
      _next: data.next,
      _note: data.note ?? "",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- Archive / Restore ----------------------------------

export const archiveFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("archive_figure_draft", { _id: data.id });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const restoreFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("restore_figure_draft", { _id: data.id });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- Structured relationships ---------------------------

const relationAddInput = z.object({
  draft_id: z.string().uuid(),
  kind: z.enum(["era", "region", "theme", "related_figure"]),
  ref_id: z.string().trim().min(1).max(200),
  label: z.string().trim().min(1).max(300),
  relationship_type: z.string().trim().max(80).optional(),
  relationship_note: z.string().trim().max(1000).optional(),
}).superRefine((v, ctx) => {
  if (!isValidTaxonomyId(v.kind as RelationKind, v.ref_id)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${v.ref_id} is not a recognised ${v.kind} ID in the museum inventory.`,
      path: ["ref_id"],
    });
  }
});

export const addFigureDraftRelation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => relationAddInput.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("add_figure_draft_relation", {
      _draft_id: data.draft_id,
      _kind: data.kind,
      _ref_id: data.ref_id,
      _label: data.label,
      _relationship_type: data.relationship_type ?? "",
      _relationship_note: data.relationship_note ?? "",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const removeFigureDraftRelation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({
    draft_id: z.string().uuid(),
    kind: z.enum(["era", "region", "theme", "related_figure"]),
    ref_id: z.string().trim().min(1).max(200),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("remove_figure_draft_relation", {
      _draft_id: data.draft_id,
      _kind: data.kind,
      _ref_id: data.ref_id,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
