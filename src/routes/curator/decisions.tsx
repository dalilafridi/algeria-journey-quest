import { createFileRoute } from "@tanstack/react-router";
import { SectionCard, StatusPill, DisabledAction } from "@/components/curator-portal/primitives";
import { DECISIONS_SEED } from "@/data/curator-portal/seeds";

export const Route = createFileRoute("/curator/decisions")({
  component: Decisions,
});

function Decisions() {
  return (
    <>
      <header>
        <h1 className="cp-page-title">Decision records</h1>
        <p className="cp-page-sub">Architecture and product decisions (ADRs). Read-only in Phase 1.</p>
      </header>

      <div className="cp-row"><DisabledAction label="Record decision" /></div>

      <div className="cp-grid cp-grid--2">
        {DECISIONS_SEED.map((d) => (
          <article key={d.id} className="cp-card">
            <header className="cp-card__head">
              <div>
                <h2>{d.id} · {d.title}</h2>
                <p>{d.date}</p>
              </div>
              <StatusPill tone={d.status === "accepted" ? "ok" : d.status === "proposed" ? "info" : "muted"}>{d.status}</StatusPill>
            </header>
            <div className="cp-card__body">
              <p><strong>Context.</strong> {d.context}</p>
              <p style={{ marginTop: 8 }}><strong>Decision.</strong> {d.decision}</p>
              {d.alternatives.length > 0 && (
                <>
                  <p style={{ marginTop: 8 }}><strong>Alternatives considered</strong></p>
                  <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13 }}>{d.alternatives.map((a) => <li key={a}>{a}</li>)}</ul>
                </>
              )}
              {d.consequences.length > 0 && (
                <>
                  <p style={{ marginTop: 8 }}><strong>Consequences</strong></p>
                  <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13 }}>{d.consequences.map((a) => <li key={a}>{a}</li>)}</ul>
                </>
              )}
              {d.related.length > 0 && (
                <div className="cp-row" style={{ marginTop: 8, gap: 6 }}>
                  {d.related.map((r) => <StatusPill key={r} tone="muted">{r}</StatusPill>)}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
