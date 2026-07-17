/**
 * Mission Control — the Museum Director's daily driver.
 *
 * Every card is either an actionable task list (drafts to review,
 * translations missing, rights review, unverified sources) or a live
 * heartbeat (recent activity). Nothing is decorative.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { SectionCard, StatCard, StatusPill } from "@/components/curator-portal/primitives";
import {
  getMissionControl, type MissionControlPayload, type MissionControlDraftRow, type MissionControlSourceRow,
} from "@/lib/curator-portal/mission-control.functions";
import { STATUS_LABEL } from "@/lib/curator-portal/figure-drafts.functions";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";

export const Route = createFileRoute("/curator/_studio/")({
  component: MissionControl,
});

function MissionControl() {
  const session = useStudioSession();
  const [data, setData] = useState<MissionControlPayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await getMissionControl();
      setData(r);
    } catch (e) { setErr((e as Error).message); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  return (
    <>
      <header style={{ marginBottom: 6 }}>
        <h1 className="cp-page-title">Mission Control</h1>
        <p className="cp-page-sub">
          Welcome back{session.displayName ? `, ${session.displayName}` : ""}. Everything here is actionable.
        </p>
      </header>

      {err && <div role="alert" style={{ color: "#a03030", padding: 10 }}>{err}</div>}

      {!data ? (
        <SectionCard title="Loading…"><p className="cp-muted">Aggregating today's Studio state.</p></SectionCard>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            <StatCard label="Figure drafts" value={data.totals.figuresTotal} hint={`${data.totals.figuresApproved} approved`} />
            <StatCard label="In review" value={data.totals.figuresInReview} hint="Across all review stages" />
            <StatCard label="Changes requested" value={data.totals.figuresChangesRequested} hint="Waiting on authors" />
            <StatCard label="Sources" value={data.totals.sourcesTotal} hint={`${data.totals.sourcesVerified} verified`} />
            <StatCard label="Unverified sources" value={data.totals.sourcesDraft} hint="Ready for fact-check" />
            <StatCard label="Unread notifications" value={data.totals.unreadNotifications} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 16, marginTop: 16 }}>
            <ActionCard title="My active drafts" empty="You have no active drafts. Start one from Figure Drafts.">
              <DraftList rows={data.myActiveDrafts} />
            </ActionCard>
            <ActionCard title="Awaiting review" empty="Nothing waiting on reviewers.">
              <DraftList rows={data.awaitingReview} />
            </ActionCard>
            <ActionCard title="Missing translations" empty="Every downstream draft is fully translated.">
              <DraftList rows={data.missingTranslations} showTranslationHint />
            </ActionCard>
            <ActionCard title="Recently edited" empty="No recent edits.">
              <DraftList rows={data.recentlyEdited} />
            </ActionCard>
            <ActionCard title="Rights review" empty="No rights review pending.">
              <SourceList rows={data.rightsReview} kind="rights" />
            </ActionCard>
            <ActionCard title="Unverified sources" empty="Every source has been verified.">
              <SourceList rows={data.unverifiedSources} kind="verify" />
            </ActionCard>
          </div>

          <SectionCard title="Recent Studio activity" subtitle="The last 15 audit events, newest first.">
            {data.recentActivity.length === 0 ? (
              <p className="cp-muted">No recent activity.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 4, fontSize: 12 }}>
                {data.recentActivity.map((a) => (
                  <li key={a.id} style={{ padding: "6px 10px", borderBottom: "1px solid var(--cp-border)" }}>
                    <span style={{ color: "var(--cp-ink-soft)" }}>{new Date(a.created_at).toLocaleString()}</span>
                    {" — "}
                    <strong>{a.action}</strong>
                    {a.entity_label && <> · {a.entity_label}</>}
                    {a.actor_email_snapshot && <> · <span style={{ color: "var(--cp-ink-soft)" }}>{a.actor_email_snapshot}</span></>}
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </>
      )}
    </>
  );
}

function ActionCard({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  return (
    <SectionCard title={title}>
      <div data-empty={empty} style={{ minHeight: 60 }}>{children}</div>
      <style>{`[data-empty]:empty::before { content: attr(data-empty); color: var(--cp-ink-soft); font-size: 13px; }`}</style>
    </SectionCard>
  );
}

function DraftList({ rows, showTranslationHint }: { rows: MissionControlDraftRow[]; showTranslationHint?: boolean }) {
  if (rows.length === 0) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
      {rows.map((r) => {
        const missing: string[] = [];
        if (showTranslationHint) {
          if (!r.summary_fr || !r.biography_fr) missing.push("FR");
          if (!r.summary_ar || !r.biography_ar) missing.push("AR");
        }
        return (
          <li key={r.id} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div>
                <Link to="/curator/figures/$draftId" params={{ draftId: r.id }} style={{ fontWeight: 600, color: "inherit" }}>
                  {r.name_en || r.slug}
                </Link>
                <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>
                  {STATUS_LABEL[r.status as keyof typeof STATUS_LABEL] ?? r.status} · updated {r.updated_at.slice(0, 10)}
                </div>
              </div>
              {missing.length > 0 && (
                <div className="cp-row" style={{ gap: 4 }}>
                  {missing.map((m) => <StatusPill key={m} tone="warn">missing {m}</StatusPill>)}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function SourceList({ rows, kind }: { rows: MissionControlSourceRow[]; kind: "rights" | "verify" }) {
  if (rows.length === 0) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
      {rows.map((r) => (
        <li key={r.id} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <Link to="/curator/sources/$sourceId" params={{ sourceId: r.id }} style={{ fontWeight: 600, color: "inherit" }}>
              {r.title}
            </Link>
            <StatusPill tone={kind === "verify" ? "warn" : "warn"}>
              {kind === "verify" ? r.status : r.rights_status}
            </StatusPill>
          </div>
          <div style={{ fontSize: 11, color: "var(--cp-ink-soft)", marginTop: 2 }}>
            updated {r.updated_at.slice(0, 10)}
          </div>
        </li>
      ))}
    </ul>
  );
}
