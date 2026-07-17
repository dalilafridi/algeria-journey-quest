/**
 * Mission Control aggregation — one round-trip; every card is actionable.
 *
 * All reads run through requireSupabaseAuth (RLS scopes to Studio users).
 * The returned shape is a plain DTO: rows already trimmed to the fields
 * the dashboard renders. No PII beyond email_snapshot from audit_log.
 */
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface MissionControlDraftRow {
  id: string;
  slug: string;
  name_en: string;
  status: string;
  updated_at: string;
  updated_by: string | null;
  summary_en: string | null;
  biography_en: string | null;
  summary_fr: string | null;
  summary_ar: string | null;
  biography_fr: string | null;
  biography_ar: string | null;
}

export interface MissionControlSourceRow {
  id: string;
  title: string;
  status: string;
  rights_status: string;
  updated_at: string;
  updated_by: string | null;
  verification_date: string | null;
}

export interface MissionControlPayload {
  totals: {
    figuresTotal: number;
    figuresApproved: number;
    figuresInReview: number;
    figuresChangesRequested: number;
    sourcesTotal: number;
    sourcesVerified: number;
    sourcesDraft: number;
    unreadNotifications: number;
  };
  myActiveDrafts: MissionControlDraftRow[];
  awaitingReview: MissionControlDraftRow[];
  missingTranslations: MissionControlDraftRow[];
  recentlyEdited: MissionControlDraftRow[];
  rightsReview: MissionControlSourceRow[];
  unverifiedSources: MissionControlSourceRow[];
  recentActivity: Array<{
    id: string;
    action: string;
    entity_type: string | null;
    entity_id: string | null;
    entity_label: string | null;
    actor_email_snapshot: string | null;
    created_at: string;
  }>;
}

const DRAFT_COLS =
  "id, slug, name_en, status, updated_at, updated_by, summary_en, biography_en, summary_fr, summary_ar, biography_fr, biography_ar";
const REVIEW_STATUSES = ["research_review", "fact_check", "translation_review", "curator_review"];

export const getMissionControl = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MissionControlPayload> => {
    const sb = context.supabase;
    const userId = context.userId;

    const [
      draftsAll,
      sourcesAll,
      unreadRes,
      recentActivityRes,
    ] = await Promise.all([
      sb.from("figure_drafts").select(DRAFT_COLS).order("updated_at", { ascending: false }).limit(500),
      sb.from("source_records").select("id, title, status, rights_status, updated_at, updated_by, verification_date").order("updated_at", { ascending: false }).limit(500),
      // studio_notifications was created in this phase's migration; types are auto-regenerated.
      (sb.from as unknown as (t: string) => ReturnType<typeof sb.from>)("studio_notifications")
        .select("id", { count: "exact", head: true })
        .eq("recipient_user_id", userId)
        .is("read_at", null),
      sb.from("audit_log")
        .select("id, action, entity_type, entity_id, entity_label, actor_email_snapshot, created_at")
        .order("created_at", { ascending: false })
        .limit(15),
    ]);

    if (draftsAll.error) throw new Error(draftsAll.error.message);
    if (sourcesAll.error) throw new Error(sourcesAll.error.message);
    if (recentActivityRes.error) throw new Error(recentActivityRes.error.message);

    const drafts = (draftsAll.data ?? []) as MissionControlDraftRow[];
    const sources = (sourcesAll.data ?? []) as MissionControlSourceRow[];

    const nonArchived = drafts.filter((d) => d.status !== "archived");

    const myActiveDrafts = nonArchived
      .filter((d) => d.updated_by === userId && d.status !== "approved")
      .slice(0, 8);

    const awaitingReview = nonArchived
      .filter((d) => REVIEW_STATUSES.includes(d.status))
      .slice(0, 8);

    const missingTranslations = nonArchived
      .filter(
        (d) =>
          (d.status === "translation_review" || d.status === "curator_review" || d.status === "approved") &&
          !(d.summary_fr && d.summary_ar && d.biography_fr && d.biography_ar),
      )
      .slice(0, 8);

    const recentlyEdited = nonArchived.slice(0, 6);

    const rightsReview = sources
      .filter((s) => s.status !== "archived" && (s.rights_status === "unknown" || s.rights_status === "permission_required"))
      .slice(0, 6);

    const unverifiedSources = sources
      .filter((s) => s.status === "draft")
      .slice(0, 6);

    const totals = {
      figuresTotal: drafts.length,
      figuresApproved: drafts.filter((d) => d.status === "approved").length,
      figuresInReview: drafts.filter((d) => REVIEW_STATUSES.includes(d.status)).length,
      figuresChangesRequested: drafts.filter((d) => d.status === "changes_requested").length,
      sourcesTotal: sources.length,
      sourcesVerified: sources.filter((s) => s.status === "verified").length,
      sourcesDraft: sources.filter((s) => s.status === "draft").length,
      unreadNotifications: (unreadRes as { count?: number | null }).count ?? 0,
    };

    return {
      totals,
      myActiveDrafts,
      awaitingReview,
      missingTranslations,
      recentlyEdited,
      rightsReview,
      unverifiedSources,
      recentActivity: (recentActivityRes.data ?? []) as MissionControlPayload["recentActivity"],
    };
  });

/** Per-user "My Work" — separate call so it can be refreshed independently. */
export const getMyWork = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const sb = context.supabase;
    const userId = context.userId;
    const [draftsRes, sourcesRes] = await Promise.all([
      sb.from("figure_drafts").select(DRAFT_COLS).eq("updated_by", userId).order("updated_at", { ascending: false }).limit(100),
      sb.from("source_records").select("id, title, status, rights_status, updated_at, updated_by, verification_date").eq("updated_by", userId).order("updated_at", { ascending: false }).limit(100),
    ]);
    if (draftsRes.error) throw new Error(draftsRes.error.message);
    if (sourcesRes.error) throw new Error(sourcesRes.error.message);
    return {
      drafts: (draftsRes.data ?? []) as MissionControlDraftRow[],
      sources: (sourcesRes.data ?? []) as MissionControlSourceRow[],
    };
  });
