/**
 * DZ Odyssey Studio — production monitoring server functions.
 *
 * Every function authorizes independently: monitoring data is restricted to
 * the museum's oversight roles (director, senior curator, technical admin).
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AppRole } from "./permissions";

const OVERSIGHT: AppRole[] = ["museum_director", "senior_curator", "technical_administrator"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function assertOversight(supabase: any) {
  const { data, error } = await supabase.rpc("get_my_studio_roles");
  if (error) throw new Error("Not authorized");
  const roles = ((data ?? []) as Array<{ role: AppRole } | AppRole>).map((r) =>
    typeof r === "string" ? r : r.role,
  ) as AppRole[];
  if (!roles.some((r) => OVERSIGHT.includes(r))) throw new Error("Not authorized");
  return roles;
}

const querySchema = z.object({
  hours: z.number().int().min(1).max(720).default(24),
  event_type: z.string().max(40).optional(),
  limit: z.number().int().min(1).max(200).default(60),
});

export const getMonitoringOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => querySchema.parse(d ?? {}))
  .handler(async ({ data, context }) => {
    await assertOversight(context.supabase);
    const since = new Date(Date.now() - data.hours * 3600_000).toISOString();

    let q = context.supabase
      .from("monitoring_events")
      .select(
        "id, event_type, severity, message, route, page_url, resource_url, status_code, stack, language, viewport, environment, fingerprint, occurred_at",
      )
      .gte("occurred_at", since)
      .order("occurred_at", { ascending: false })
      .limit(1000);
    if (data.event_type) q = q.eq("event_type", data.event_type);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const events = rows ?? [];
    const byType = new Map<string, number>();
    const groups = new Map<
      string,
      { fingerprint: string; event_type: string; message: string; route: string | null; count: number; last_seen: string }
    >();
    for (const e of events) {
      byType.set(e.event_type, (byType.get(e.event_type) ?? 0) + 1);
      const g = groups.get(e.fingerprint);
      if (g) {
        g.count += 1;
        if (e.occurred_at > g.last_seen) g.last_seen = e.occurred_at;
      } else {
        groups.set(e.fingerprint, {
          fingerprint: e.fingerprint,
          event_type: e.event_type,
          message: e.message,
          route: e.route,
          count: 1,
          last_seen: e.occurred_at,
        });
      }
    }

    const { data: alerts } = await context.supabase
      .from("monitoring_alerts")
      .select("id, kind, summary, event_count, window_minutes, recipient, delivered, delivery_error, acknowledged_at, triggered_at")
      .order("triggered_at", { ascending: false })
      .limit(20);

    const { data: settings } = await context.supabase
      .from("monitoring_alert_settings")
      .select("enabled, alert_email, error_threshold, window_minutes, last_alert_at")
      .eq("id", true)
      .maybeSingle();

    return {
      since,
      total: events.length,
      errors: events.filter((e) => e.severity === "error").length,
      warnings: events.filter((e) => e.severity === "warning").length,
      byType: Object.fromEntries(byType),
      groups: [...groups.values()].sort((a, b) => b.count - a.count).slice(0, 25),
      recent: events.slice(0, data.limit),
      alerts: alerts ?? [],
      settings: settings ?? null,
    };
  });

const settingsSchema = z.object({
  enabled: z.boolean(),
  alert_email: z.string().email().max(200).nullable(),
  error_threshold: z.number().int().min(1).max(1000),
  window_minutes: z.number().int().min(5).max(1440),
});

export const updateMonitoringSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => settingsSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertOversight(context.supabase);
    const { error } = await context.supabase
      .from("monitoring_alert_settings")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", true);
    if (error) throw new Error(error.message);
    await context.supabase.rpc("log_audit_event", {
      _action: "monitoring.settings.updated",
      _entity_type: "monitoring",
      _entity_id: "alert_settings",
      _entity_label: "Monitoring alert settings",
      _before: null,
      _after: data,
      _metadata: null,
    });
    return { ok: true };
  });

export const acknowledgeMonitoringAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertOversight(context.supabase);
    const { error } = await context.supabase
      .from("monitoring_alerts")
      .update({ acknowledged_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
