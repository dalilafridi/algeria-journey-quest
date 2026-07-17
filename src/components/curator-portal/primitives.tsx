/**
 * Small reusable Studio primitives (read-only Phase 1).
 */

import type { ReactNode } from "react";

export type Precision = "exact" | "estimated" | "unknown" | "not-started" | "planned" | "critical";

export function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="cp-card">
      <header className="cp-card__head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </header>
      <div className="cp-card__body">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  precision = "exact",
  formula,
}: {
  label: string;
  value: number | string;
  hint?: string;
  precision?: Precision;
  formula?: string;
}) {
  return (
    <div className="cp-stat">
      <div className="cp-stat__label">{label}</div>
      <div className="cp-stat__value">{value}</div>
      <div className="cp-stat__meta">
        <MetricLabel precision={precision} />
        {hint && <span className="cp-stat__hint">{hint}</span>}
      </div>
      {formula && <div className="cp-stat__formula">{formula}</div>}
    </div>
  );
}

const PRECISION_MAP: Record<Precision, { text: string; cls: string }> = {
  exact: { text: "Exact", cls: "cp-tag cp-tag--exact" },
  estimated: { text: "Estimated", cls: "cp-tag cp-tag--estimated" },
  unknown: { text: "Unknown", cls: "cp-tag cp-tag--unknown" },
  "not-started": { text: "Not started", cls: "cp-tag cp-tag--unknown" },
  planned: { text: "Planned", cls: "cp-tag cp-tag--planned" },
  critical: { text: "Critical", cls: "cp-tag cp-tag--critical" },
};

export function MetricLabel({ precision }: { precision: Precision }) {
  const it = PRECISION_MAP[precision];
  return <span className={it.cls}>{it.text}</span>;
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "ok" | "warn" | "danger" | "muted" | "info" | "gold" | "planned";
  children: ReactNode;
}) {
  return <span className={`cp-pill cp-pill--${tone}`}>{children}</span>;
}

export function CoverageBar({
  value,
  max = 1,
  label,
}: {
  value: number;
  max?: number;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div className="cp-bar" role="img" aria-label={label ? `${label}: ${pct}%` : `${pct}%`}>
      <div className="cp-bar__track">
        <div className="cp-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="cp-bar__value">{pct}%</div>
    </div>
  );
}

export function HealthGauge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const tone = pct >= 75 ? "ok" : pct >= 55 ? "warn" : "danger";
  return (
    <div className={`cp-gauge cp-gauge--${tone}`} role="img" aria-label={`Museum health ${pct}%`}>
      <svg viewBox="0 0 120 120" className="cp-gauge__svg" aria-hidden>
        <circle cx="60" cy="60" r="52" className="cp-gauge__track" />
        <circle
          cx="60"
          cy="60"
          r="52"
          className="cp-gauge__fill"
          style={{ strokeDasharray: `${(pct / 100) * 326.7} 326.7` }}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="cp-gauge__label">
        <span className="cp-gauge__num">{pct}</span>
        <span className="cp-gauge__unit">/ 100</span>
      </div>
    </div>
  );
}

export function DisabledAction({ label, note }: { label: string; note?: string }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled
      title={note ?? "Editing will be enabled in a future phase."}
      className="cp-action cp-action--disabled"
    >
      <span>{label}</span>
      <small>Phase 2</small>
    </button>
  );
}

/**
 * Standard read-only workspace layout used by every Studio workspace.
 * Each workspace answers six museum-oriented questions in the same order
 * so the Studio feels like one system, not a collection of pages.
 */
export function Workspace({
  title,
  subtitle,
  purpose,
  why,
  dataModel,
  available,
  missing,
  future,
  children,
}: {
  title: string;
  subtitle: string;
  purpose: string;
  why: string;
  dataModel: ReactNode;
  available: ReactNode;
  missing: ReactNode;
  future: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <header>
        <h1 className="cp-page-title">{title}</h1>
        <p className="cp-page-sub">{subtitle}</p>
      </header>

      <SectionCard title="Purpose" subtitle={purpose}>
        <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>{why}</p>
      </SectionCard>

      <div className="cp-grid cp-grid--2">
        <SectionCard title="Data & workflow" subtitle="What this workspace manages or will manage.">
          {dataModel}
        </SectionCard>
        <SectionCard title="Available today" subtitle="Inventory and capabilities derived from the current system.">
          {available}
        </SectionCard>
        <SectionCard title="What is missing" subtitle="Explicitly not present today.">
          {missing}
        </SectionCard>
        <SectionCard title="Not yet enabled" subtitle="Planned capabilities — not yet built.">
          {future}
        </SectionCard>
      </div>

      {children}
    </>
  );
}

/**
 * A simple labeled bullet list used inside Workspace slots.
 */
export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13.5, lineHeight: 1.55, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}
