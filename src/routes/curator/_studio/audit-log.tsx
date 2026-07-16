import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionCard, Workspace, BulletList } from "@/components/curator-portal/primitives";
import { canAccessRoute, type AppRole } from "@/lib/curator-portal/permissions";
import { listAuditLog } from "@/lib/curator-portal/studio-auth.functions";

export const Route = createFileRoute("/curator/_studio/audit-log")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!canAccessRoute("/curator/audit-log", roles)) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: AuditLogPage,
});

interface Row {
  id: string;
  actor_user_id: string | null;
  actor_email_snapshot: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  entity_label: string | null;
  before_summary: unknown;
  after_summary: unknown;
  created_at: string;
}

function AuditLogPage() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<{ action: string; entity_type: string }>({ action: "", entity_type: "" });

  async function load() {
    setErr(null);
    try {
      const data = await listAuditLog({ data: {
        limit: 100,
        action: filter.action || undefined,
        entity_type: filter.entity_type || undefined,
      } });
      setRows(data as Row[]);
    } catch (e) { setErr((e as Error).message); }
  }
  useEffect(() => { void load(); }, []);

  return (
    <Workspace
      title="Audit Log"
      subtitle="Append-only record of every privileged Studio action. Read access: Museum Director, Senior Curator, Technical Administrator."
      purpose="Give governance roles a permanent, tamper-evident record of who did what and when — the foundation for institutional trust."
      why="A museum's authority rests on process. Audit trails make that process auditable in fact, not just in principle."
      dataModel={
        <SectionCard title={`Recent events (${rows?.length ?? "…"})`}>
          <div className="cp-row" style={{ gap: 8, marginBottom: 10 }}>
            <input placeholder="Filter by action (e.g. role.assign)" value={filter.action}
              onChange={(e) => setFilter({ ...filter, action: e.target.value })}
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12 }} />
            <input placeholder="Filter by entity_type" value={filter.entity_type}
              onChange={(e) => setFilter({ ...filter, entity_type: e.target.value })}
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12 }} />
            <button onClick={load} style={{ padding: "6px 14px", background: "#2c1e10", color: "white", border: "none", borderRadius: 6, fontSize: 12 }}>Apply</button>
          </div>
          {err && <div role="alert" style={{ color: "#a03030", fontSize: 12, marginBottom: 10 }}>{err}</div>}
          {!rows ? <div className="cp-muted">Loading…</div> : rows.length === 0 ? <div className="cp-muted">No matching events.</div> : (
            <div style={{ overflowX: "auto" }}>
              <table className="cp-table" style={{ fontSize: 12 }}>
                <thead><tr><th>When</th><th>Actor</th><th>Action</th><th>Entity</th><th>Detail</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td style={{ whiteSpace: "nowrap" }}>{new Date(r.created_at).toLocaleString()}</td>
                      <td>{r.actor_email_snapshot ?? <em>—</em>}</td>
                      <td style={{ fontFamily: "monospace" }}>{r.action}</td>
                      <td>{r.entity_type ?? ""}{r.entity_label ? ` · ${r.entity_label}` : ""}</td>
                      <td style={{ fontFamily: "monospace", maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {JSON.stringify(r.after_summary ?? r.before_summary ?? {})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      }
      available={<BulletList items={[
        "role.assign and role.revoke logged in the same transaction as the role change.",
        "profile.update logged via update_my_profile RPC.",
        "Governance-only SELECT policy; no client can INSERT, UPDATE, or DELETE audit rows.",
      ]} />}
      missing={<BulletList items={[
        "No sign-in event log (provider-side logs are the source of truth).",
        "No export UI (Phase 2B).",
        "Request fingerprint / IP hash intentionally omitted pending a privacy review.",
      ]} />}
      future={<BulletList items={["Phase 2B: signed CSV export, retention policy, and per-entity drill-down."]} />}
    />
  );
}
