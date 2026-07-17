/**
 * Studio in-app notifications — read + mark-read.
 *
 * Notifications are WRITTEN inside SECURITY DEFINER RPCs (workflow
 * transitions, source verification changes, role changes) with the
 * _notify / _notify_roles helpers. This module only READS.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type NotificationKind =
  | "workflow_transition"
  | "changes_requested"
  | "approved"
  | "review_needed"
  | "source_verified"
  | "role_change"
  | "mention"
  | "system";

export interface StudioNotification {
  id: string;
  kind: NotificationKind | string;
  title: string;
  body: string | null;
  entity_type: string | null;
  entity_id: string | null;
  entity_label: string | null;
  link: string | null;
  actor_user_id: string | null;
  actor_email_snapshot: string | null;
  read_at: string | null;
  created_at: string;
}

const NOTIF_COLS =
  "id, kind, title, body, entity_type, entity_id, entity_label, link, actor_user_id, actor_email_snapshot, read_at, created_at";

const NOTIF_TABLE = "studio_notifications";

export const listNotifications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ items: StudioNotification[]; unread: number }> => {
    const sb = context.supabase as unknown as {
      from: (t: string) => {
        select: (
          cols: string,
          opts?: { count?: "exact"; head?: boolean },
        ) => {
          eq: (col: string, val: unknown) => {
            is: (col: string, val: unknown) => Promise<{ count: number | null; error: unknown }>;
          };
          order: (col: string, opts: { ascending: boolean }) => {
            limit: (n: number) => Promise<{ data: StudioNotification[] | null; error: { message: string } | null }>;
          };
        };
      };
    };
    const [listRes, unreadRes] = await Promise.all([
      sb.from(NOTIF_TABLE).select(NOTIF_COLS).order("created_at", { ascending: false }).limit(60),
      sb.from(NOTIF_TABLE).select("id", { count: "exact", head: true })
        .eq("recipient_user_id", context.userId)
        .is("read_at", null),
    ]);
    if (listRes.error) throw new Error(listRes.error.message);
    return {
      items: (listRes.data ?? []) as StudioNotification[],
      unread: (unreadRes.count as number | null) ?? 0,
    };
  });

const markReadInput = z.object({
  ids: z.array(z.string().uuid()).max(200).optional(),
  all: z.boolean().optional(),
});

export const markNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => markReadInput.parse(d ?? {}))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc("mark_notifications_read", {
      _ids: data.ids ?? null,
      _all: data.all ?? false,
    } as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
