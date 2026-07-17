/**
 * Notifications — the full inbox, backed by studio_notifications.
 * Reading here uses the same server functions as the header bell.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import {
  listNotifications, markNotificationsRead, type StudioNotification,
} from "@/lib/curator-portal/notifications.functions";

export const Route = createFileRoute("/curator/_studio/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [items, setItems] = useState<StudioNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await listNotifications();
      setItems(r.items); setUnread(r.unread);
    } catch (e) { setErr((e as Error).message); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const markAll = async () => {
    setBusy(true);
    try {
      await markNotificationsRead({ data: { all: true } });
      await load();
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };
  const markOne = async (id: string) => {
    try {
      await markNotificationsRead({ data: { ids: [id] } });
      setItems((xs) => xs.map((x) => (x.id === id ? { ...x, read_at: x.read_at ?? new Date().toISOString() } : x)));
      setUnread((u) => Math.max(0, u - 1));
    } catch (e) { setErr((e as Error).message); }
  };

  const visible = filter === "unread" ? items.filter((x) => !x.read_at) : items;

  return (
    <>
      <header style={{ marginBottom: 6 }}>
        <h1 className="cp-page-title">Notifications</h1>
        <p className="cp-page-sub">
          Workflow transitions, review requests, approvals, and role changes.
        </p>
      </header>

      {err && <div role="alert" style={{ color: "#a03030" }}>{err}</div>}

      <SectionCard title={unread > 0 ? `${unread} unread` : "All caught up"}>
        <div className="cp-row" style={{ gap: 8, marginBottom: 12 }}>
          <button type="button" onClick={() => setFilter("all")}
            style={{ padding: "6px 12px", background: filter === "all" ? "#2c1e10" : "transparent", color: filter === "all" ? "white" : "inherit", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
            All
          </button>
          <button type="button" onClick={() => setFilter("unread")}
            style={{ padding: "6px 12px", background: filter === "unread" ? "#2c1e10" : "transparent", color: filter === "unread" ? "white" : "inherit", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
            Unread only
          </button>
          {unread > 0 && (
            <button type="button" onClick={markAll} disabled={busy}
              style={{ marginLeft: "auto", padding: "6px 12px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
              Mark all read
            </button>
          )}
        </div>
        {visible.length === 0 ? (
          <p className="cp-muted">Nothing here.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
            {visible.map((n) => (
              <li key={n.id} style={{
                padding: "10px 12px", border: "1px solid var(--cp-border)", borderRadius: 6,
                background: n.read_at ? "transparent" : "#fdf6e3",
              }}>
                <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
                    {n.body && <div style={{ fontSize: 12, color: "var(--cp-ink-soft)", marginTop: 3 }}>{n.body}</div>}
                    {n.entity_label && <div style={{ fontSize: 11, color: "var(--cp-ink-soft)", marginTop: 3 }}>{n.entity_label}</div>}
                    <div style={{ fontSize: 11, color: "var(--cp-ink-soft)", marginTop: 4 }}>
                      {new Date(n.created_at).toLocaleString()}
                      {n.actor_email_snapshot && <> · {n.actor_email_snapshot}</>}
                    </div>
                  </div>
                  <div className="cp-row" style={{ gap: 6 }}>
                    {!n.read_at && <StatusPill tone="info">new</StatusPill>}
                    {n.link && <a href={n.link} style={{ fontSize: 12, textDecoration: "underline" }}>Open</a>}
                    {!n.read_at && (
                      <button type="button" onClick={() => markOne(n.id)}
                        style={{ padding: "3px 8px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  );
}
