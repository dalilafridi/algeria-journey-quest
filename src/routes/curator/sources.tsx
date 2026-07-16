import { createFileRoute } from "@tanstack/react-router";
import {
  SectionCard,
  DisabledAction,
  StatusPill,
} from "@/components/curator-portal/primitives";
import { getInventory } from "@/lib/curator-portal/inventory";

export const Route = createFileRoute("/curator/sources")({
  component: Sources,
});

function Sources() {
  const inv = getInventory();
  const missing = inv.filter((r) => r.sourceCount === 0);
  const kinds = [
    "Primary source", "Academic book", "Academic paper",
    "Archive", "Museum", "Government institution",
    "Reputable news", "Documentary", "Interview", "Website", "Other",
  ];

  return (
    <>
      <header>
        <h1 className="cp-page-title">Source library</h1>
        <p className="cp-page-sub">Foundation for structured source management. Today most exhibits do not carry per-record source metadata; the proposed model below will land alongside Phase 2 authentication.</p>
      </header>

      <SectionCard title="Proposed source record">
        <p className="cp-muted">Every source will be recorded with:</p>
        <ul style={{ marginTop: 8, columnCount: 2, columnGap: 20, fontSize: 13 }}>
          <li>Title</li><li>Author</li><li>Publisher</li><li>Publication date</li>
          <li>Type</li><li>Language</li><li>URL</li><li>Archive / institution</li>
          <li>ISBN / identifier</li><li>Accessed date</li><li>Verified date</li>
          <li>Reliability tier</li><li>Rights status</li><li>Notes</li>
          <li>Related exhibits</li>
        </ul>
        <div className="cp-row" style={{ marginTop: 12, gap: 8 }}>
          {kinds.map((k) => <StatusPill key={k} tone="muted">{k}</StatusPill>)}
        </div>
        <div className="cp-row" style={{ marginTop: 14, gap: 10 }}>
          <DisabledAction label="Add source" />
          <DisabledAction label="Import bibliography" />
        </div>
      </SectionCard>

      <SectionCard title="Missing structured sources" subtitle={`${missing.length} of ${inv.length} records currently lack a structured source list.`}>
        <p className="cp-muted" style={{ marginBottom: 12 }}>
          This is not the same as saying the content is unsourced — the museum's copy was written from sources, they just live outside the code. Phase 2 will attach them here.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="cp-table">
            <thead>
              <tr><th scope="col">Kind</th><th scope="col">Title</th><th scope="col">File</th></tr>
            </thead>
            <tbody>
              {missing.slice(0, 40).map((r) => (
                <tr key={`${r.kind}-${r.id}`}>
                  <td>{r.kind}</td>
                  <td>{r.titleEn}</td>
                  <td style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--cp-ink-soft)" }}>{r.file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {missing.length > 40 && <p className="cp-muted" style={{ marginTop: 8 }}>Showing 40 of {missing.length} — full report will land with authoring tools.</p>}
      </SectionCard>
    </>
  );
}
