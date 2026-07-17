import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import { SourceForm, sourceRowToValues, type SourceFormValues } from "@/components/curator-portal/SourceForm";
import { ContentPicker, type PickedContent } from "@/components/curator-portal/ContentPicker";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import type { AppRole } from "@/lib/curator-portal/permissions";
import { pushRecent } from "@/lib/curator-portal/recently-viewed";
import {
  archiveSource, getSource, linkSourceToContent, restoreSource,
  setSourceVerificationStatus, unlinkSourceFromContent, updateSource,
  STATUS_LABEL, SOURCE_TYPE_LABEL, RELIABILITY_LABEL, RIGHTS_LABEL,
  type SourceLinkRow, type SourceRow, type SourceStatus,
} from "@/lib/curator-portal/sources.functions";

interface AuditEntry {
  id: string;
  action: string;
  actor_user_id: string | null;
  actor_email_snapshot: string | null;
  before_summary: unknown;
  after_summary: unknown;
  created_at: string;
}

const WRITE: AppRole[] = ["museum_director", "senior_curator", "curator", "researcher", "fact_checker"];
const ARCHIVE: AppRole[] = ["museum_director", "senior_curator", "curator"];
const VERIFY: AppRole[] = ["museum_director", "senior_curator", "fact_checker"];
const has = (roles: AppRole[], list: AppRole[]) => roles.some((r) => list.includes(r));

const STATUS_TONE: Record<SourceStatus, "ok" | "warn" | "muted"> = {
  verified: "ok", draft: "warn", archived: "muted",
};

export const Route = createFileRoute("/curator/_studio/sources/$sourceId")({
  component: SourceDetail,
});

function SourceDetail() {
  const { sourceId } = Route.useParams();
  const navigate = useNavigate();
  const session = useStudioSession();
  const canWrite = has(session.roles, WRITE);
  const canArchive = has(session.roles, ARCHIVE);
  const canVerify = has(session.roles, VERIFY);

  const [source, setSource] = useState<SourceRow | null>(null);
  const [links, setLinks] = useState<SourceLinkRow[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [values, setValues] = useState<SourceFormValues | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  async function load() {
    setErr(null);
    try {
      const res = await getSource({ data: { id: sourceId } });
      setSource(res.source);
      setLinks(res.links);
      setAudit(res.audit as AuditEntry[]);
      setValues(sourceRowToValues(res.source));
      setDirty(false);
      pushRecent(session.userId, { kind: "source", id: res.source.id, title: res.source.title });
    } catch (e) { setErr((e as Error).message); }
  }
  useEffect(() => { void load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [sourceId]);

  async function onSave() {
    if (!values || !source) return;
    setBusy(true); setErr(null);
    try {
      await updateSource({ data: { id: source.id, payload: values as never } });
      await load();
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }

  async function onToggleVerification() {
    if (!source) return;
    const nowVerified = source.status !== "verified";
    setBusy(true); setErr(null);
    try {
      await setSourceVerificationStatus({ data: { id: source.id, verified: nowVerified } });
      await load();
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }

  async function onArchive() {
    if (!source) return;
    if (!confirm(`Archive "${source.title}"? It can be restored later.`)) return;
    setBusy(true); setErr(null);
    try { await archiveSource({ data: { id: source.id } }); await load(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }
  async function onRestore() {
    if (!source) return;
    setBusy(true); setErr(null);
    try { await restoreSource({ data: { id: source.id } }); await load(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }

  async function onLink(p: PickedContent) {
    if (!source) return;
    setBusy(true); setErr(null);
    try {
      await linkSourceToContent({ data: { source_id: source.id, ...p } });
      await load();
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }
  async function onUnlink(id: string) {
    if (!confirm("Remove this link?")) return;
    setBusy(true); setErr(null);
    try { await unlinkSourceFromContent({ data: { link_id: id } }); await load(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }

  if (err && !source) return <div role="alert" style={{ color: "#a03030", padding: 12 }}>{err}</div>;
  if (!source || !values) return <div className="cp-muted">Loading…</div>;

  const readOnly = !canWrite || source.status === "archived";

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ marginBottom: 4 }}>
            <Link to="/curator/sources" style={{ fontSize: 13, color: "var(--cp-muted)" }}>← Research Library</Link>
          </div>
          <h1 className="cp-page-title" style={{ marginBottom: 4 }}>{source.title}</h1>
          <div className="cp-row" style={{ gap: 8, flexWrap: "wrap" }}>
            <StatusPill tone={STATUS_TONE[source.status]}>{STATUS_LABEL[source.status]}</StatusPill>
            <StatusPill tone="muted">{SOURCE_TYPE_LABEL[source.source_type]}</StatusPill>
            <StatusPill tone="muted">{RELIABILITY_LABEL[source.reliability_tier]}</StatusPill>
            <StatusPill tone="muted">{RIGHTS_LABEL[source.rights_status]}</StatusPill>
          </div>
        </div>
        <div className="cp-row" style={{ gap: 8, flexWrap: "wrap" }}>
          {source.status === "archived" && canArchive && (
            <button type="button" onClick={onRestore} disabled={busy}
              style={btn("secondary")}>Restore</button>
          )}
          {source.status !== "archived" && canVerify && (
            <button type="button" onClick={onToggleVerification} disabled={busy}
              style={btn("secondary")}>
              {source.status === "verified" ? "Revert to draft" : "Mark verified"}
            </button>
          )}
          {source.status !== "archived" && canArchive && (
            <button type="button" onClick={onArchive} disabled={busy}
              style={btn("danger")}>Archive</button>
          )}
        </div>
      </header>

      {err && <div role="alert" style={{ color: "#a03030", padding: 10, background: "#fbebe6", borderRadius: 6 }}>{err}</div>}

      {source.status === "archived" && (
        <div style={{ padding: 10, background: "#fbf1e0", border: "1px solid #e5c896", borderRadius: 6, fontSize: 13 }}>
          This source is archived. Restore it before editing.
        </div>
      )}

      <SectionCard title="Source details">
        <SourceForm
          values={values}
          onChange={(v) => { setValues(v); setDirty(true); }}
          disabled={busy || readOnly}
        />
        {canWrite && source.status !== "archived" && (
          <div className="cp-row" style={{ gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={() => { setValues(sourceRowToValues(source)); setDirty(false); }}
              disabled={busy || !dirty} style={btn("secondary")}>Reset</button>
            <button type="button" onClick={onSave} disabled={busy || !dirty || !values.title.trim()}
              style={btn("primary")}>{busy ? "Saving…" : "Save changes"}</button>
          </div>
        )}
      </SectionCard>

      <SectionCard title={`Museum relationships (${links.length})`}
        subtitle="Public museum records this source supports. Editing the museum's TypeScript content files is not enabled in this phase.">
        {links.length === 0 ? <div className="cp-muted" style={{ fontSize: 13, marginBottom: 12 }}>Not linked to any museum record yet.</div> : (
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px 0" }}>
            {links.map((l) => (
              <li key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid var(--cp-border-soft, #eee)" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600 }}>{l.content_label}</div>
                  <div className="cp-muted" style={{ fontSize: 11 }}>
                    {l.content_type} · <code>{l.content_id}</code>
                    {l.public_route && <> · <a href={l.public_route} target="_blank" rel="noreferrer">view public page</a></>}
                  </div>
                </div>
                {canWrite && source.status !== "archived" && (
                  <button type="button" onClick={() => onUnlink(l.id)} disabled={busy} style={btn("danger-ghost")}>Unlink</button>
                )}
              </li>
            ))}
          </ul>
        )}
        {canWrite && source.status !== "archived" && <ContentPicker onPick={onLink} disabled={busy} />}
      </SectionCard>

      <SectionCard title="Audit history"
        subtitle={`${audit.length} recorded event${audit.length === 1 ? "" : "s"}. Every change to this source is logged.`}
        action={
          <button type="button" onClick={() => setShowAudit((v) => !v)} style={btn("secondary")}>
            {showAudit ? "Hide technical details" : "Show technical details"}
          </button>
        }>
        {audit.length === 0 ? <div className="cp-muted">No events yet.</div> : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {audit.map((a) => (
              <li key={a.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--cp-border-soft, #eee)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{humaniseAction(a.action)}</span>
                  <span className="cp-muted" style={{ fontSize: 11 }}>{new Date(a.created_at).toLocaleString()}</span>
                </div>
                <div className="cp-muted" style={{ fontSize: 11 }}>
                  by {a.actor_email_snapshot ?? a.actor_user_id ?? "system"}
                </div>
                {showAudit && (
                  <pre style={{ marginTop: 6, background: "#f7f1e5", padding: 8, borderRadius: 4, fontSize: 11, overflowX: "auto" }}>
{JSON.stringify({ before: a.before_summary, after: a.after_summary }, null, 2)}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  );
}

function humaniseAction(a: string): string {
  switch (a) {
    case "source.create": return "Source created";
    case "source.update": return "Source updated";
    case "source.archive": return "Source archived";
    case "source.restore": return "Source restored";
    case "source.verification": return "Verification status changed";
    case "source.link": return "Linked to museum record";
    case "source.unlink": return "Unlinked from museum record";
    default: return a;
  }
}

function btn(kind: "primary" | "secondary" | "danger" | "danger-ghost"): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
    border: "1px solid transparent",
  };
  switch (kind) {
    case "primary": return { ...base, background: "#2c1e10", color: "white", border: "none" };
    case "secondary": return { ...base, background: "transparent", borderColor: "var(--cp-border)" };
    case "danger": return { ...base, background: "#8a2b2b", color: "white", border: "none" };
    case "danger-ghost": return { ...base, background: "transparent", color: "#8a2b2b", borderColor: "#e5b5b5", padding: "4px 10px" };
  }
}
