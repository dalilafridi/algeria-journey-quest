import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import {
  listFigureDrafts, STATUS_LABEL,
  type FigureDraftRow, type FigureDraftStatus,
} from "@/lib/curator-portal/figure-drafts.functions";
import type { AppRole } from "@/lib/curator-portal/permissions";

const READ_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "curator", "researcher",
  "fact_checker", "translator", "translation_reviewer", "educator",
];

const STATUS_TONE: Record<FigureDraftStatus, "ok" | "warn" | "muted" | "info" | "gold"> = {
  draft: "muted", research_review: "info", fact_check: "info",
  translation_review: "info", curator_review: "gold",
  approved: "ok", changes_requested: "warn", archived: "muted",
};

export const Route = createFileRoute("/curator/_studio/figures/")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!roles.some((r) => READ_ROLES.includes(r))) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: FiguresIndex,
});

function FiguresIndex() {
  const [rows, setRows] = useState<FigureDraftRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | FigureDraftStatus>("all");
  const [q, setQ] = useState("");

  useEffect(() => { void reload(); }, []);
  async function reload() {
    try { setRows(await listFigureDrafts()); }
    catch (e) { setErr((e as Error).message); }
  }

  const visible = (rows ?? []).filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      if (!r.name_en.toLowerCase().includes(s) && !r.slug.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <>
      <header>
        <h1 className="cp-page-title">Historical figure drafts</h1>
        <p className="cp-page-sub">Private Studio workflow. Drafts never appear on the public museum until an explicit publish flow is designed in a later phase.</p>
      </header>
      {err && <div role="alert" style={{ color: "#a03030" }}>{err}</div>}
      <SectionCard
        title="Drafts"
        action={<Link to="/curator/figures/new" style={{ padding: "6px 14px", background: "#2c1e10", color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>+ New figure draft</Link>}
      >
        <div className="cp-row" style={{ gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <input placeholder="Search name or slug…" value={q} onChange={(e) => setQ(e.target.value)}
            style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, minWidth: 220 }} />
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}
            style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
            <option value="all">All statuses</option>
            {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--cp-ink-soft)", alignSelf: "center" }}>
            {rows == null ? "Loading…" : `${visible.length} shown · ${rows.length} total`}
          </span>
        </div>
        {rows && visible.length === 0 && <p style={{ fontSize: 13, color: "var(--cp-ink-soft)" }}>No drafts match.</p>}
        {visible.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--cp-ink-soft)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>
                <th style={{ padding: "6px 8px" }}>Name</th>
                <th style={{ padding: "6px 8px" }}>Slug</th>
                <th style={{ padding: "6px 8px" }}>Status</th>
                <th style={{ padding: "6px 8px" }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid var(--cp-border)" }}>
                  <td style={{ padding: "8px" }}>
                    <Link to="/curator/figures/$draftId" params={{ draftId: r.id }} style={{ fontWeight: 600, textDecoration: "none" }}>
                      {r.name_en}
                    </Link>
                    {r.subtitle_en && <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>{r.subtitle_en}</div>}
                  </td>
                  <td style={{ padding: "8px" }}><code style={{ fontSize: 11 }}>{r.slug}</code></td>
                  <td style={{ padding: "8px" }}><StatusPill tone={STATUS_TONE[r.status as FigureDraftStatus]}>{STATUS_LABEL[r.status as FigureDraftStatus]}</StatusPill></td>
                  <td style={{ padding: "8px", fontSize: 11, color: "var(--cp-ink-soft)" }}>{new Date(r.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </>
  );
}
