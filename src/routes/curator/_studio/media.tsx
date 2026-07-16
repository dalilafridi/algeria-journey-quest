import { createFileRoute } from "@tanstack/react-router";
import { SectionCard, DisabledAction, StatusPill } from "@/components/curator-portal/primitives";
import { getInventory } from "@/lib/curator-portal/inventory";

export const Route = createFileRoute("/curator/_studio/media")({
  component: Media,
});

function Media() {
  const inv = getInventory();
  const withMedia = inv.filter((r) => r.mediaCount > 0);
  const withoutMedia = inv.length - withMedia.length;

  return (
    <>
      <header>
        <h1 className="cp-page-title">Media & Digital Assets</h1>
        <p className="cp-page-sub">Foundation for a first-party media asset store with rights, attribution and alt-text tracking.</p>
      </header>

      <div className="cp-grid cp-grid--stats">
        <div className="cp-stat"><div className="cp-stat__label">Records with tracked media</div><div className="cp-stat__value">{withMedia.length}</div></div>
        <div className="cp-stat"><div className="cp-stat__label">Records without tracked media</div><div className="cp-stat__value">{withoutMedia}</div></div>
        <div className="cp-stat"><div className="cp-stat__label">External images downloaded</div><div className="cp-stat__value">0</div><div className="cp-stat__meta"><StatusPill tone="muted">policy</StatusPill><span className="cp-stat__hint">no external media republished</span></div></div>
      </div>

      <SectionCard title="Proposed media asset model">
        <ul style={{ columnCount: 2, columnGap: 20, fontSize: 13 }}>
          <li>File / URL</li><li>Type (image / audio / video / document)</li>
          <li>Title</li><li>Caption (EN / FR / AR)</li>
          <li>Creator</li><li>Date</li><li>Source</li>
          <li>Rights holder</li><li>License</li><li>Attribution</li>
          <li>Alt text (EN / FR / AR)</li>
          <li>Authentic archival material</li>
          <li>Reconstruction</li>
          <li>AI-generated</li>
          <li>Related exhibits</li>
          <li>Upload date / verified date</li>
        </ul>
        <div className="cp-row" style={{ marginTop: 12, gap: 10 }}>
          <DisabledAction label="Upload media" />
          <DisabledAction label="Import from S3" />
          <DisabledAction label="Rights audit" />
        </div>
      </SectionCard>

      <SectionCard title="Records currently tracking media" subtitle="Extracted from public data — no external downloads.">
        {withMedia.length === 0 ? (
          <p className="cp-muted">No record currently exposes structured media metadata. Rich media exists in the museum but is authored as URLs inline; the Media Library will normalize this.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="cp-table">
              <thead><tr><th scope="col">Kind</th><th scope="col">Title</th><th scope="col">Media count</th><th scope="col">File</th></tr></thead>
              <tbody>
                {withMedia.map((r) => (
                  <tr key={`${r.kind}-${r.id}`}>
                    <td>{r.kind}</td>
                    <td>{r.titleEn}</td>
                    <td>{r.mediaCount}</td>
                    <td style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--cp-ink-soft)" }}>{r.file}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </>
  );
}
