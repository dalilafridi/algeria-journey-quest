import { createFileRoute } from "@tanstack/react-router";
import { SectionCard, StatusPill, DisabledAction } from "@/components/curator-portal/primitives";
import { RELEASES_SEED } from "@/data/curator-portal/seeds";

export const Route = createFileRoute("/curator/_studio/releases")({
  component: Releases,
});

function Releases() {
  const unreleased = RELEASES_SEED.filter((r) => r.date === "unreleased");
  const shipped = RELEASES_SEED.filter((r) => r.date !== "unreleased");

  return (
    <>
      <header>
        <h1 className="cp-page-title">Releases</h1>
        <p className="cp-page-sub">Unreleased changes, historical milestones and the release-note template.</p>
      </header>

      <SectionCard title={`Unreleased (${unreleased.length})`} action={<DisabledAction label="Cut release" />}>
        {unreleased.length === 0 ? (
          <p className="cp-muted">No unreleased notes.</p>
        ) : (
          unreleased.map((r) => <ReleaseCard key={r.version} r={r} />)
        )}
      </SectionCard>

      <SectionCard title={`Historical milestones (${shipped.length})`}>
        <ol style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {shipped.map((r) => (
            <li key={r.version}>
              <ReleaseCard r={r} />
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Release note template">
        <pre style={{ background: "color-mix(in oklab, var(--cp-bg) 60%, var(--cp-panel))", padding: 14, borderRadius: 10, fontSize: 12, overflowX: "auto" }}>
{`Version: v0.0.0
Date: YYYY-MM-DD
Title: Short cinematic title

Added:      new features
Changed:    what changed
Fixed:      bugs closed
Content:    new exhibits / translations
Accessibility: A11y improvements
Technical:  infra / performance
Known limitations: what still doesn't work`}
        </pre>
      </SectionCard>
    </>
  );
}

function ReleaseCard({ r }: { r: (typeof RELEASES_SEED)[number] }) {
  return (
    <article style={{ border: "1px solid var(--cp-border)", borderRadius: 12, padding: 14 }}>
      <div className="cp-row" style={{ justifyContent: "space-between" }}>
        <strong>{r.title}</strong>
        <div className="cp-row" style={{ gap: 6 }}>
          <StatusPill tone={r.date === "unreleased" ? "warn" : "ok"}>{r.date}</StatusPill>
          <StatusPill tone="muted">{r.version}</StatusPill>
        </div>
      </div>
      <div className="cp-grid cp-grid--2" style={{ marginTop: 10, gap: 8 }}>
        {([["Added", r.added], ["Changed", r.changed], ["Fixed", r.fixed], ["Content", r.content], ["Accessibility", r.accessibility], ["Technical", r.technical], ["Known limitations", r.knownLimitations]] as const).map(([k, list]) => (
          list.length > 0 && (
            <div key={k}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.06, color: "var(--cp-ink-soft)", marginBottom: 4 }}>{k}</div>
              <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13 }}>{list.map((i: string) => <li key={i}>{i}</li>)}</ul>
            </div>
          )
        ))}
      </div>
    </article>
  );
}
