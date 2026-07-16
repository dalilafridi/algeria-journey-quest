import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionCard, Workspace, BulletList, StatusPill } from "@/components/curator-portal/primitives";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import { ALL_ROLES, ROLE_LABEL, canAccessRoute, type AppRole } from "@/lib/curator-portal/permissions";
import { assignRole, listTeam, revokeRole } from "@/lib/curator-portal/studio-auth.functions";

export const Route = createFileRoute("/curator/_studio/team")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!canAccessRoute("/curator/team", roles)) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: TeamPage,
});

interface Member { id: string; display_name: string | null; roles: { role: AppRole; assigned_at: string }[] }

function TeamPage() {
  const session = useStudioSession();
  const [members, setMembers] = useState<Member[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    setErr(null);
    try {
      const rows = await listTeam();
      setMembers(rows as Member[]);
    } catch (e) { setErr((e as Error).message); }
  }
  useEffect(() => { void load(); }, []);

  async function onAssign(userId: string, role: AppRole) {
    setBusy(userId + role); setErr(null);
    try { await assignRole({ data: { target_user_id: userId, role } }); await load(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(null); }
  }
  async function onRevoke(userId: string, role: AppRole) {
    if (!confirm(`Remove role "${ROLE_LABEL[role]}" from this user?`)) return;
    setBusy(userId + role); setErr(null);
    try { await revokeRole({ data: { target_user_id: userId, role } }); await load(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(null); }
  }

  return (
    <Workspace
      title="Team & Roles"
      subtitle="Assign and revoke institutional roles. Restricted to Museum Director and Technical Administrator."
      purpose="Give administrators a controlled, auditable surface for managing who can operate the Studio and in what capacity."
      why="A museum runs on accountable people. Role assignment must be explicit, reversible, and recorded — never a side effect of code deploys."
      dataModel={
        <SectionCard title={`Studio members (${members?.length ?? "…"})`}>
          {err && <div role="alert" style={{ color: "#a03030", fontSize: 12, marginBottom: 10 }}>{err}</div>}
          {!members ? <div className="cp-muted">Loading…</div> : (
            <div style={{ overflowX: "auto" }}>
              <table className="cp-table" style={{ fontSize: 13 }}>
                <thead><tr><th>Member</th><th>Roles</th><th>Assign</th></tr></thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{m.display_name ?? "—"}</div>
                        <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--cp-muted)" }}>{m.id}</div>
                        {m.id === session.userId && <StatusPill tone="info">You</StatusPill>}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {m.roles.length === 0 && <em className="cp-muted">No roles</em>}
                          {m.roles.map((r) => (
                            <span key={r.role} className="cp-row" style={{ gap: 4, alignItems: "center", padding: "2px 6px 2px 8px", border: "1px solid var(--cp-border)", borderRadius: 999, fontSize: 11 }}>
                              {ROLE_LABEL[r.role]}
                              <button onClick={() => onRevoke(m.id, r.role)} disabled={busy === m.id + r.role}
                                title="Remove role" style={{ background: "transparent", border: "none", color: "#a03030", cursor: "pointer", fontSize: 12, lineHeight: 1 }}>×</button>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <AssignBox onAssign={(r) => onAssign(m.id, r)} existing={new Set(m.roles.map((r) => r.role))} disabled={!!busy} />
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
        "Assign and revoke roles via SECURITY DEFINER RPCs that verify auth.uid() and log every change.",
        "Continuity guard prevents removing the last museum_director or technical_administrator.",
        "Confirmation dialog before role removal.",
      ]} />}
      missing={<BulletList items={["No invitation flow — users must sign up separately first.", "No de-activation or hard delete.", "No last-sign-in column (auth.users is not exposed to app clients)."]} />}
      future={<BulletList items={["Phase 2B: email invitations, de-activation, and per-workspace assignments."]} />}
    />
  );
}

function AssignBox({ onAssign, existing, disabled }: { onAssign: (r: AppRole) => void; existing: Set<AppRole>; disabled: boolean }) {
  const [role, setRole] = useState<AppRole>("curator");
  return (
    <div className="cp-row" style={{ gap: 4 }}>
      <select value={role} onChange={(e) => setRole(e.target.value as AppRole)}
        style={{ padding: "4px 6px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12 }}>
        {ALL_ROLES.map((r) => (
          <option key={r} value={r} disabled={existing.has(r)}>{ROLE_LABEL[r]}</option>
        ))}
      </select>
      <button onClick={() => onAssign(role)} disabled={disabled || existing.has(role)}
        style={{ padding: "4px 10px", background: "#2c1e10", color: "white", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Add</button>
    </div>
  );
}
