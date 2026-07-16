/**
 * Small reusable portal primitives.
 */

import type { ReactNode } from "react";

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
}: {
  label: string;
  value: number | string;
  hint?: string;
  precision?: "exact" | "estimated";
}) {
  return (
    <div className="cp-stat">
      <div className="cp-stat__label">{label}</div>
      <div className="cp-stat__value">{value}</div>
      <div className="cp-stat__meta">
        <MetricLabel precision={precision} />
        {hint && <span className="cp-stat__hint">{hint}</span>}
      </div>
    </div>
  );
}

export function MetricLabel({ precision }: { precision: "exact" | "estimated" | "not-started" }) {
  const map = {
    exact: { text: "Exact", cls: "cp-tag cp-tag--exact" },
    estimated: { text: "Estimated", cls: "cp-tag cp-tag--estimated" },
    "not-started": { text: "Not started", cls: "cp-tag cp-tag--muted" },
  } as const;
  const it = map[precision];
  return <span className={it.cls}>{it.text}</span>;
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "ok" | "warn" | "danger" | "muted" | "info" | "gold";
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
