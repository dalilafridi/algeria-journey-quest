/**
 * Studio · Production Monitoring
 *
 * Live health of the published museum: script errors, unhandled promise
 * rejections, failed requests, broken media and missing pages, grouped by
 * signature, plus the alerting rule and its history.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SectionCard, StatCard } from "@/components/curator-portal/primitives";
import { EVENT_LABEL, type MonitoringEventType } from "@/lib/monitoring/types";
import {
  acknowledgeMonitoringAlert,
  getMonitoringOverview,
  updateMonitoringSettings,
} from "@/lib/curator-portal/monitoring.functions";

export const Route = createFileRoute("/curator/_studio/monitoring")({
  component: MonitoringPage,
});

type Overview = Awaited<ReturnType<typeof getMonitoringOverview>>;

const RANGES = [
  { label: "Last hour", hours: 1 },
  { label: "Last 24 hours", hours: 24 },
  { label: "Last 7 days", hours: 168 },
  { label: "Last 30 days", hours: 720 },
];

const TYPES: (MonitoringEventType | "all")[] = [
  "all",
  "js_error",
  "unhandled_rejection",
  "failed_request",
  "broken_image",
  "not_found",
];

function MonitoringPage() {
  const load = useServerFn(getMonitoringOverview);
  const saveSettings = useServerFn(updateMonitoringSettings);
  const ackAlert = useServerFn(acknowledgeMonitoringAlert);

  const [hours, setHours] = useState(24);
  const [type, setType] = useState<MonitoringEventType | "all">("all");
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [threshold, setThreshold] = useState(10);
  const [windowMinutes, setWindowMinutes] = useState(15);

  const refresh = useCallback(async () => {
    setBusy(true);
    try {
      const res = await load({
        data: { hours, limit: 60, ...(type === "all" ? {} : { event_type: type }) },
      });
      setData(res);
      setError(null);
      if (res.settings) {
        setEmail(res.settings.alert_email ?? "");
        setEnabled(res.settings.enabled ?? true);
        setThreshold(res.settings.error_threshold ?? 10);
        setWindowMinutes(res.settings.window_minutes ?? 15);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [hours, type, load]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  if (error) {
    return (
      <div className="cp-page">
        <SectionCard title="Production Monitoring">
          <p style={{ fontSize: 13.5 }}>
            {error.includes("authorized")
              ? "You do not have permission to view production monitoring."
              : error}
          </p>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <header className="cp-page__head">
        <div>
          <h1>Production Monitoring</h1>
          <p>
            Errors, failed requests and broken media reported by the published museum. Data is
            captured directly from visitors' browsers.
          </p>
        </div>
      </header>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {RANGES.map((r) => (
          <button
            key={r.hours}
            type="button"
            className={`cp-chip${hours === r.hours ? " cp-chip--active" : ""}`}
            onClick={() => setHours(r.hours)}
          >
            {r.label}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            className={`cp-chip${type === t ? " cp-chip--active" : ""}`}
            onClick={() => setType(t)}
          >
            {t === "all" ? "All types" : EVENT_LABEL[t]}
          </button>
        ))}
      </div>

      <div className="cp-stats">
        <StatCard label="Events" value={data?.total ?? (busy ? "…" : 0)} hint="in range" />
        <StatCard label="Errors" value={data?.errors ?? 0} precision="exact" />
        <StatCard label="Warnings" value={data?.warnings ?? 0} precision="exact" />
        <StatCard
          label="Distinct issues"
          value={data?.groups.length ?? 0}
          hint="grouped by signature"
        />
      </div>

      <SectionCard
        title="Alerting"
        subtitle="Who gets notified when errors spike, and how sensitive the rule is."
        action={
          <button
            type="button"
            className="cp-btn cp-btn--primary"
            onClick={async () => {
              try {
                await saveSettings({
                  data: {
                    enabled,
                    alert_email: email.trim() ? email.trim() : null,
                    error_threshold: threshold,
                    window_minutes: windowMinutes,
                  },
                });
                toast.success("Alert settings saved");
                void refresh();
              } catch (e) {
                toast.error((e as Error).message);
              }
            }}
          >
            Save
          </button>
        }
      >
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          <label className="cp-field">
            <span>Curator alert email</span>
            <input
              type="email"
              value={email}
              placeholder="curator@yourdomain.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="cp-field">
            <span>Error threshold</span>
            <input
              type="number"
              min={1}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value) || 1)}
            />
          </label>
          <label className="cp-field">
            <span>Window (minutes)</span>
            <input
              type="number"
              min={5}
              value={windowMinutes}
              onChange={(e) => setWindowMinutes(Number(e.target.value) || 5)}
            />
          </label>
          <label className="cp-field" style={{ justifyContent: "end" }}>
            <span>Alerting</span>
            <button
              type="button"
              className="cp-btn"
              onClick={() => setEnabled((v) => !v)}
              aria-pressed={enabled}
            >
              {enabled ? "Enabled" : "Paused"}
            </button>
          </label>
        </div>
        <p style={{ fontSize: 12.5, marginTop: 10, opacity: 0.85 }}>
          Alerts are always recorded here in the Studio. Email delivery starts once a sender
          domain is configured for the museum.
        </p>
      </SectionCard>

      <SectionCard title="Alert history" subtitle="Every burst the rule has caught.">
        {(data?.alerts.length ?? 0) === 0 ? (
          <p style={{ fontSize: 13.5 }}>No alerts have been triggered.</p>
        ) : (
          <table className="cp-table">
            <thead>
              <tr>
                <th>Triggered</th>
                <th>Summary</th>
                <th>Events</th>
                <th>Email</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data?.alerts.map((a) => (
                <tr key={a.id}>
                  <td>{new Date(a.triggered_at).toLocaleString()}</td>
                  <td>{a.summary}</td>
                  <td>{a.event_count}</td>
                  <td>{a.delivered ? "Sent" : (a.delivery_error ?? "Not sent")}</td>
                  <td>
                    {a.acknowledged_at ? (
                      "Acknowledged"
                    ) : (
                      <button
                        type="button"
                        className="cp-btn"
                        onClick={async () => {
                          await ackAlert({ data: { id: a.id } });
                          void refresh();
                        }}
                      >
                        Acknowledge
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>

      <SectionCard title="Top issues" subtitle="Grouped by error signature, most frequent first.">
        {(data?.groups.length ?? 0) === 0 ? (
          <p style={{ fontSize: 13.5 }}>Nothing reported in this range. That is good news.</p>
        ) : (
          <table className="cp-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Message</th>
                <th>Page</th>
                <th>Count</th>
                <th>Last seen</th>
              </tr>
            </thead>
            <tbody>
              {data?.groups.map((g) => (
                <tr key={g.fingerprint}>
                  <td>{EVENT_LABEL[g.event_type as MonitoringEventType] ?? g.event_type}</td>
                  <td>{g.message}</td>
                  <td>{g.route ?? "—"}</td>
                  <td>{g.count}</td>
                  <td>{new Date(g.last_seen).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>

      <SectionCard title="Recent events" subtitle="Newest first, with the failing resource.">
        {(data?.recent.length ?? 0) === 0 ? (
          <p style={{ fontSize: 13.5 }}>No events in this range.</p>
        ) : (
          <table className="cp-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Type</th>
                <th>Message</th>
                <th>Route</th>
                <th>Resource</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.recent.map((e) => (
                <tr key={e.id}>
                  <td>{new Date(e.occurred_at).toLocaleTimeString()}</td>
                  <td>{EVENT_LABEL[e.event_type as MonitoringEventType] ?? e.event_type}</td>
                  <td>{e.message}</td>
                  <td>{e.route ?? "—"}</td>
                  <td style={{ maxWidth: 260, overflowWrap: "anywhere" }}>
                    {e.resource_url ?? "—"}
                  </td>
                  <td>{e.status_code ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </div>
  );
}
