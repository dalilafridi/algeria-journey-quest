import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionCard, StatusPill, DisabledAction } from "@/components/curator-portal/primitives";
import { ROADMAP_SEED, IDEA_LAB_SEED } from "@/data/curator-portal/seeds";
import type { RoadmapItem } from "@/lib/curator-portal/models";

export const Route = createFileRoute("/curator/_studio/roadmap")({
  component: Roadmap,
});

function priorityTone(p: RoadmapItem["priority"]) {
  return p === "critical" ? "danger" : p === "high" ? "warn" : p === "medium" ? "info" : "muted";
}
function statusTone(s: RoadmapItem["status"]) {
  if (s === "complete") return "ok";
  if (s === "in-progress") return "info";
  if (s === "blocked" || s === "rejected") return "danger";
  if (s === "approved") return "gold";
  return "muted";
}

function ItemList({ items }: { items: RoadmapItem[] }) {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((r) => (
        <li key={r.id} style={{ border: "1px solid var(--cp-border)", borderRadius: 10, padding: 12 }}>
          <div className="cp-row" style={{ justifyContent: "space-between" }}>
            <strong>{r.title}</strong>
            <div className="cp-row" style={{ gap: 6 }}>
              <StatusPill tone={priorityTone(r.priority)}>{r.priority}</StatusPill>
              <StatusPill tone={statusTone(r.status)}>{r.status}</StatusPill>
              <StatusPill tone="muted">effort {r.effort}</StatusPill>
            </div>
          </div>
          <p className="cp-muted" style={{ marginTop: 4 }}>{r.description}</p>
          <div className="cp-row" style={{ marginTop: 8, gap: 6, fontSize: 12 }}>
            <StatusPill tone="muted">{r.area}</StatusPill>
            {r.targetRelease && <StatusPill tone="gold">{r.targetRelease}</StatusPill>}
            {r.owner && <span className="cp-muted">Owner: {r.owner}</span>}
          </div>
          {r.acceptance && (
            <ul style={{ marginTop: 8, fontSize: 12.5, paddingLeft: 18, listStyle: "disc" }}>
              {r.acceptance.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function Roadmap() {
  const [tab, setTab] = useState<"delivery" | "ideas">("delivery");

  return (
    <>
      <header>
        <h1 className="cp-page-title">Roadmap & Idea Lab</h1>
        <p className="cp-page-sub">Approved delivery work is separated from visionary ideas.</p>
      </header>

      <div className="cp-row" role="tablist" aria-label="Roadmap view">
        <button role="tab" aria-selected={tab === "delivery"} onClick={() => setTab("delivery")} style={{ padding: "8px 14px", borderRadius: 8, background: tab === "delivery" ? "var(--cp-brand-deep)" : "transparent", color: tab === "delivery" ? "white" : "var(--cp-ink)", border: "1px solid var(--cp-border)", cursor: "pointer" }}>Delivery roadmap</button>
        <button role="tab" aria-selected={tab === "ideas"} onClick={() => setTab("ideas")} style={{ padding: "8px 14px", borderRadius: 8, background: tab === "ideas" ? "var(--cp-brand-deep)" : "transparent", color: tab === "ideas" ? "white" : "var(--cp-ink)", border: "1px solid var(--cp-border)", cursor: "pointer" }}>Idea Lab</button>
        <div style={{ flex: 1 }} />
        <DisabledAction label="Add roadmap item" />
      </div>

      {tab === "delivery" ? (
        <SectionCard title={`Delivery roadmap (${ROADMAP_SEED.length})`} subtitle="Grounded in the project audit and Master Blueprint.">
          <ItemList items={ROADMAP_SEED} />
        </SectionCard>
      ) : (
        <SectionCard title={`Idea Lab (${IDEA_LAB_SEED.length})`} subtitle="Not committed work — clearly separated so ideas do not masquerade as plans.">
          <ItemList items={IDEA_LAB_SEED} />
        </SectionCard>
      )}
    </>
  );
}
