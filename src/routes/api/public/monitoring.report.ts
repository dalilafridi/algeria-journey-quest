/**
 * Public monitoring ingest — POST /api/public/monitoring/report
 *
 * Called by the museum front-end when something breaks. Public by necessity
 * (visitors are not signed in), so the handler validates strictly, caps the
 * batch size, stores nothing free-form beyond truncated diagnostics, and
 * writes through the service-role client. It never returns stored data.
 */

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createHash } from "node:crypto";

const eventSchema = z.object({
  event_type: z.enum([
    "js_error",
    "unhandled_rejection",
    "failed_request",
    "broken_image",
    "not_found",
    "manual",
  ]),
  severity: z.enum(["error", "warning", "info"]).default("error"),
  message: z.string().trim().min(1).max(500),
  route: z.string().max(300).nullish(),
  page_url: z.string().max(800).nullish(),
  resource_url: z.string().max(800).nullish(),
  status_code: z.number().int().min(100).max(599).nullish(),
  stack: z.string().max(4000).nullish(),
  language: z.string().max(12).nullish(),
  viewport: z.string().max(24).nullish(),
  occurred_at: z.string().datetime().optional(),
});

const bodySchema = z.object({ events: z.array(eventSchema).min(1).max(20) });

function fingerprint(type: string, message: string, route: string | null | undefined) {
  return createHash("sha256")
    .update(`${type}|${message.replace(/\d+/g, "#")}|${route ?? ""}`)
    .digest("hex")
    .slice(0, 32);
}

export const Route = createFileRoute("/api/public/monitoring/report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed: z.infer<typeof bodySchema>;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return new Response(JSON.stringify({ ok: false }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 300);
        const environment = new URL(request.url).hostname.includes("localhost")
          ? "development"
          : "production";

        const rows = parsed.events.map((e) => ({
          event_type: e.event_type,
          severity: e.severity,
          message: e.message,
          route: e.route ?? null,
          page_url: e.page_url ?? null,
          resource_url: e.resource_url ?? null,
          status_code: e.status_code ?? null,
          stack: e.stack ?? null,
          language: e.language ?? null,
          viewport: e.viewport ?? null,
          user_agent: userAgent,
          environment,
          fingerprint: fingerprint(e.event_type, e.message, e.route),
          occurred_at: e.occurred_at ?? new Date().toISOString(),
        }));

        const { error } = await supabaseAdmin.from("monitoring_events").insert(rows);
        if (error) {
          console.error("monitoring ingest failed", error.message);
          return new Response(JSON.stringify({ ok: false }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        // Burst detection: if the recent error volume crosses the configured
        // threshold, record an alert (deduplicated by the alert window).
        try {
          await evaluateAlert(supabaseAdmin);
        } catch (err) {
          console.error("monitoring alert evaluation failed", (err as Error).message);
        }

        return new Response(JSON.stringify({ ok: true, stored: rows.length }), {
          status: 202,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});

type AdminClient = Awaited<
  typeof import("@/integrations/supabase/client.server")
>["supabaseAdmin"];

async function evaluateAlert(supabaseAdmin: AdminClient) {
  const { data: settings } = await supabaseAdmin
    .from("monitoring_alert_settings")
    .select("enabled, alert_email, error_threshold, window_minutes, last_alert_at")
    .eq("id", true)
    .maybeSingle();
  if (!settings?.enabled) return;

  const windowMinutes = settings.window_minutes ?? 15;
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();

  if (settings.last_alert_at && settings.last_alert_at > since) return;

  const { count } = await supabaseAdmin
    .from("monitoring_events")
    .select("id", { count: "exact", head: true })
    .eq("severity", "error")
    .gte("occurred_at", since);

  const total = count ?? 0;
  if (total < (settings.error_threshold ?? 10)) return;

  await supabaseAdmin.from("monitoring_alerts").insert({
    kind: "error_spike",
    summary: `${total} errors reported in the last ${windowMinutes} minutes.`,
    event_count: total,
    window_minutes: windowMinutes,
    recipient: settings.alert_email,
    delivered: false,
    delivery_error: settings.alert_email
      ? "Email delivery pending: no sender domain is configured yet."
      : "No alert email address configured.",
  });

  await supabaseAdmin
    .from("monitoring_alert_settings")
    .update({ last_alert_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", true);
}
