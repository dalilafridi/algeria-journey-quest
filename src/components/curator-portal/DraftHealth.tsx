/**
 * Draft health — advisory readiness surface for figure drafts.
 *
 * Two rendering modes:
 *   - "chip"    tiny inline row (compact, no border) for lists / mission control
 *   - "panel"   full card at the top of the editor page
 *
 * Never blocks any workflow action; the DB is the authoritative gate.
 */
import type { ReadinessReport, ReadinessLevel } from "@/lib/curator-portal/readiness";

const TONE_BG: Record<ReadinessLevel, string> = {
  ok: "#e6efd8",
  warn: "#fdf3d4",
  missing: "#fadfd2",
};
const TONE_FG: Record<ReadinessLevel, string> = {
  ok: "#3a5a1e",
  warn: "#7a5a10",
  missing: "#8a2a10",
};
const TONE_ICON: Record<ReadinessLevel, string> = { ok: "●", warn: "◐", missing: "○" };

export function DraftHealthChips({ report }: { report: ReadinessReport }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {report.buckets.map((b) => (
        <span
          key={b.key}
          title={`${b.label}: ${b.detail}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            background: TONE_BG[b.level], color: TONE_FG[b.level],
          }}
        >
          <span aria-hidden style={{ fontSize: 10 }}>{TONE_ICON[b.level]}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}

export function DraftHealthPanel({ report }: { report: ReadinessReport }) {
  const overallTone: ReadinessLevel = report.missing > 0 ? "missing" : report.warn > 0 ? "warn" : "ok";
  return (
    <section
      aria-label="Draft readiness"
      style={{
        border: "1px solid var(--cp-border)",
        background: "white",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--cp-ink-soft)" }}>
            Draft health · advisory
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2, color: TONE_FG[overallTone] }}>
            {report.score}<span style={{ fontSize: 12, color: "var(--cp-ink-soft)", fontWeight: 400 }}> / 100</span>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "var(--cp-ink-soft)" }}>
          <div>{report.ok} healthy · {report.warn} attention · {report.missing} missing</div>
          {report.formalApprovalReady ? (
            <div style={{ color: "#3a5a1e", marginTop: 2 }}>Meets minimum approval fields</div>
          ) : (
            <div style={{ color: "#8a2a10", marginTop: 2 }}>
              Approval blocked: {report.formalBlockers.join(", ")}
            </div>
          )}
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
        {report.buckets.map((b) => (
          <li
            key={b.key}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              gap: 10, padding: "6px 10px", background: TONE_BG[b.level], borderRadius: 6, fontSize: 13,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, color: TONE_FG[b.level] }}>
              <span aria-hidden>{TONE_ICON[b.level]}</span>
              {b.label}
            </span>
            <span style={{ color: TONE_FG[b.level], opacity: 0.9 }}>{b.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
