/**
 * Notification bell — polls every 60s + refreshes on window focus.
 *
 * Clicking the bell opens an inline dropdown. Reading an item marks
 * it as read (batched to the RPC) and navigates to its link, if any.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import {
  listNotifications, markNotificationsRead, type StudioNotification,
} from "@/lib/curator-portal/notifications.functions";

const POLL_MS = 60_000;

export function NotificationBell() {
  const navigate = useNavigate();
  const [items, setItems] = useState<StudioNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const refresh = useCallback(async () => {
    try {
      const r = await listNotifications();
      setItems(r.items);
      setUnread(r.unread);
    } catch { /* silent — bell is best-effort */ }
  }, []);

  useEffect(() => {
    void refresh();
    timer.current = window.setInterval(refresh, POLL_MS);
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [refresh]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const openItem = useCallback(async (n: StudioNotification) => {
    setOpen(false);
    // optimistic
    setItems((xs) => xs.map((x) => (x.id === n.id ? { ...x, read_at: new Date().toISOString() } : x)));
    setUnread((u) => Math.max(0, u - (n.read_at ? 0 : 1)));
    try { await markNotificationsRead({ data: { ids: [n.id] } }); } catch { /* ignore */ }
    if (n.link) void navigate({ to: n.link as never });
  }, [navigate]);

  const markAll = useCallback(async () => {
    setItems((xs) => xs.map((x) => (x.read_at ? x : { ...x, read_at: new Date().toISOString() })));
    setUnread(0);
    try { await markNotificationsRead({ data: { all: true } }); } catch { /* ignore */ }
  }, []);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        type="button"
        className="cp-icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={unread > 0 ? `Notifications (${unread} unread)` : "Notifications"}
        aria-expanded={open}
        style={{ position: "relative" }}
      >
        <Bell className="h-5 w-5" aria-hidden />
        {unread > 0 && (
          <span
            aria-hidden
            style={{
              position: "absolute", top: 2, right: 2, minWidth: 16, height: 16,
              padding: "0 4px", borderRadius: 999, background: "#a03018", color: "white",
              fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 2px var(--cp-header-bg, white)",
            }}
          >{unread > 99 ? "99+" : unread}</span>
        )}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          style={{
            position: "absolute", top: "calc(100% + 6px)", right: 0, width: 360,
            background: "white", color: "#2a1e12", border: "1px solid var(--cp-border)",
            borderRadius: 8, boxShadow: "0 14px 40px rgba(0,0,0,0.18)", zIndex: 60,
            maxHeight: "70vh", display: "flex", flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid var(--cp-border)" }}>
            <strong style={{ fontSize: 13 }}>Notifications</strong>
            <div className="cp-row" style={{ gap: 6 }}>
              {unread > 0 && (
                <button type="button" onClick={markAll}
                  style={{ padding: "3px 8px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                  Mark all read
                </button>
              )}
              <button type="button" onClick={() => { setOpen(false); void navigate({ to: "/curator/notifications" as never }); }}
                style={{ padding: "3px 8px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                Open all
              </button>
            </div>
          </div>
          <div style={{ overflowY: "auto" }}>
            {items.length === 0 ? (
              <div style={{ padding: 16, fontSize: 12, color: "var(--cp-ink-soft)" }}>Nothing new.</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.slice(0, 15).map((n) => (
                  <li key={n.id} style={{ borderBottom: "1px solid var(--cp-border)" }}>
                    <button type="button" onClick={() => openItem(n)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "10px 12px", background: n.read_at ? "transparent" : "#fdf6e3",
                        border: "none", cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{n.title}</div>
                      {n.body && <div style={{ fontSize: 11, color: "var(--cp-ink-soft)", marginTop: 2 }}>{n.body}</div>}
                      {n.entity_label && <div style={{ fontSize: 10, color: "var(--cp-ink-soft)", marginTop: 2 }}>{n.entity_label}</div>}
                      <div style={{ fontSize: 10, color: "var(--cp-ink-soft)", marginTop: 4 }}>{new Date(n.created_at).toLocaleString()}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
