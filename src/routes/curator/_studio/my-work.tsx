/**
 * My Work — the operator's personal workspace.
 *
 * Combines things I've recently touched (server-authoritative:
 * updated_by = me) with things I've recently viewed (per-user,
 * browser-local). Both are always in sync with reality; the
 * browser layer is convenience only.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { SectionCard } from "@/components/curator-portal/primitives";
import { getMyWork } from "@/lib/curator-portal/mission-control.functions";
import type { MissionControlDraftRow, MissionControlSourceRow } from "@/lib/curator-portal/mission-control.functions";
import { STATUS_LABEL } from "@/lib/curator-portal/figure-drafts.functions";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import { listRecent, clearRecent, type RecentEntry } from "@/lib/curator-portal/recently-viewed";

export const Route = createFileRoute("/curator/_studio/my-work")({
  component: MyWork,
});

function MyWork() {
  const session = useStudioSession();
  const [drafts, setDrafts] = useState<MissionControlDraftRow[]>([]);
  const [sources, setSources] = useState<MissionControlSourceRow[]>([]);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const r = await getMyWork();
      setDrafts(r.drafts); setSources(r.sources);
    } catch (e) { setErr((e as Error).message); }
    setRecent(listRecent(session.userId));
  }, [session.userId]);
  useEffect(() => { void refresh(); }, [refresh]);

  return (
    <>
      <header style={{ marginBottom: 6 }}>
        <h1 className="cp-page-title">My Work</h1>
        <p className="cp-page-sub">
          Everything you've recently edited or viewed, in one place.
        </p>
      </header>

      {err && <div role="alert" style={{ color: "#a03030" }}>{err}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 16 }}>
        <SectionCard title="Drafts I recently edited">
          {drafts.length === 0 ? <p className="cp-muted">You haven't edited any drafts yet.</p> : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
              {drafts.map((d) => (
                <li key={d.id} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
                  <Link to="/curator/figures/$draftId" params={{ draftId: d.id }} style={{ fontWeight: 600, color: "inherit" }}>
                    {d.name_en || d.slug}
                  </Link>
                  <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>
                    {STATUS_LABEL[d.status as keyof typeof STATUS_LABEL] ?? d.status} · {d.updated_at.slice(0, 10)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Sources I recently edited">
          {sources.length === 0 ? <p className="cp-muted">You haven't edited any sources yet.</p> : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
              {sources.map((s) => (
                <li key={s.id} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
                  <Link to="/curator/sources/$sourceId" params={{ sourceId: s.id }} style={{ fontWeight: 600, color: "inherit" }}>
                    {s.title}
                  </Link>
                  <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>{s.status} · {s.updated_at.slice(0, 10)}</div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Recently viewed" subtitle="Per-browser, per-user history. Cleared any time.">
          {recent.length === 0 ? <p className="cp-muted">Nothing viewed yet on this device.</p> : (
            <>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
                {recent.map((r) => (
                  <li key={`${r.kind}-${r.id}`} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
                    {r.kind === "figure_draft" ? (
                      <Link to="/curator/figures/$draftId" params={{ draftId: r.id }} style={{ fontWeight: 600, color: "inherit" }}>{r.title}</Link>
                    ) : (
                      <Link to="/curator/sources/$sourceId" params={{ sourceId: r.id }} style={{ fontWeight: 600, color: "inherit" }}>{r.title}</Link>
                    )}
                    <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>
                      {r.kind === "figure_draft" ? "Figure draft" : "Source"} · {new Date(r.at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 10 }}>
                <button type="button" onClick={() => { clearRecent(session.userId); setRecent([]); }}
                  style={{ padding: "4px 10px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  Clear history
                </button>
              </div>
            </>
          )}
        </SectionCard>
      </div>
    </>
  );
}
