import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getDashboardCounts,
  getMuseumHealth,
  getInventory,
} from "@/lib/curator-portal/inventory";
import {
  SectionCard,
  StatCard,
  HealthGauge,
  MetricLabel,
  DisabledAction,
  CoverageBar,
  StatusPill,
} from "@/components/curator-portal/primitives";
import { RELEASES_SEED, ROADMAP_SEED } from "@/data/curator-portal/seeds";

export const Route = createFileRoute("/curator/_studio/")({
  component: MissionControl,
});

function MissionControl() {
  const counts = getDashboardCounts();
  const health = getMuseumHealth();
  const inv = getInventory();
  const criticalRoadmap = ROADMAP_SEED.filter((r) => r.priority === "critical" || r.priority === "high").slice(0, 6);

  const completion = health.factors.find((f) => f.key === "completion")!;
  const translation = health.factors.find((f) => f.key === "translation")!;
  const sources = health.factors.find((f) => f.key === "sources")!;
  const media = health.factors.find((f) => f.key === "media")!;
  const accessibility = health.factors.find((f) => f.key === "accessibility")!;
  const mobile = health.factors.find((f) => f.key === "mobile")!;
  const readyToPublish = inv.filter((r) => r.status === "complete" && r.hasFr && r.hasAr).length;
  const needsReview = inv.filter((r) => r.status !== "complete").length;

  const summary: { label: string; value: string; precision: "exact" | "estimated" | "unknown"; formula?: string }[] = [
    { label: "Museum completion", value: `${Math.round(completion.value * 100)}%`, precision: "exact", formula: completion.formula },
    { label: "Translation coverage", value: `${Math.round(translation.value * 100)}%`, precision: "exact", formula: translation.formula },
    { label: "Structured source coverage", value: `${Math.round(sources.value * 100)}%`, precision: "exact", formula: sources.formula },
    { label: "Media attribution coverage", value: "Unknown", precision: "unknown", formula: "no attribution field is tracked yet — media URLs alone do not prove rights" },
    { label: "Accessibility readiness", value: `${Math.round(accessibility.value * 100)}%`, precision: "estimated", formula: accessibility.formula },
    { label: "Mobile readiness", value: `${Math.round(mobile.value * 100)}%`, precision: "estimated", formula: mobile.formula },
    { label: "Ready to publish", value: `${readyToPublish}`, precision: "exact", formula: "records where status=complete AND both fr+ar strings exist" },
    { label: "Requires review", value: `${needsReview}`, precision: "exact", formula: "records where status ≠ complete" },
  ];

  const cards: { label: string; value: number; hint?: string }[] = [
    { label: "Historical eras", value: counts.eras },
    { label: "Historical figures", value: counts.figures },
    { label: "Regions", value: counts.regions },
    { label: "Culture topics", value: counts.culture },
    { label: "Cuisine entries", value: counts.cuisine },
    { label: "Cinema entries", value: counts.cinema },
    { label: "Football records", value: counts.football + counts.legends + counts.stadiums, hint: `${counts.football} exhibits · ${counts.legends} legends · ${counts.stadiums} stadiums` },
    { label: "Club Museums", value: counts.clubs, hint: `${counts.clubsComplete} complete · ${counts.clubsPlaceholder} placeholder` },
    { label: "Match Theater", value: counts.matchTheater },
    { label: "On This Day", value: counts.onThisDay },
    { label: "Did You Know", value: counts.didYouKnow },
    { label: "Quizzes", value: counts.quizzes },
    { label: "Guided journeys", value: counts.journeys },
    { label: "Curator corpus", value: counts.corpus, hint: "grounded assistant sources" },
  ];

  return (
    <>
      <header>
        <h1 className="cp-page-title">Mission Control</h1>
        <p className="cp-page-sub">
          A single view of the museum's collections, research, quality, publishing readiness, and technical health.
          Every metric below is labelled <MetricLabel precision="exact" />, <MetricLabel precision="estimated" />,
          or <MetricLabel precision="unknown" /> — estimates include the heuristic that produced them.
        </p>
      </header>

      <section className="cp-grid cp-grid--stats" aria-label="Top summary metrics">
        {summary.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            precision={s.precision}
            formula={s.formula}
          />
        ))}
      </section>

      <SectionCard title="Collection counts" subtitle="Live counts derived directly from the museum's TypeScript data files.">
        <div className="cp-grid cp-grid--stats">
          {cards.map((c) => (
            <StatCard key={c.label} label={c.label} value={c.value} hint={c.hint} precision="exact" />
          ))}
        </div>
      </SectionCard>

      <div className="cp-grid cp-grid--2">
        <SectionCard title="Museum health" subtitle="Composite score across eight factors — each factor tagged Exact or Estimated.">
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}>
            <HealthGauge score={health.score} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {health.factors.map((f) => (
                <div key={f.key}>
                  <div className="cp-row" style={{ justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12.5 }}>{f.label}</span>
                    <MetricLabel precision={f.precision} />
                  </div>
                  <CoverageBar value={f.value} label={f.label} />
                  <div className="cp-muted" style={{ fontSize: 11, marginTop: 2 }}>{f.formula}</div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Current priorities" subtitle="Critical & high-priority items from the governance backlog.">
          <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {criticalRoadmap.map((r) => (
              <li key={r.id} style={{ border: "1px solid var(--cp-border)", borderRadius: 10, padding: 12 }}>
                <div className="cp-row" style={{ justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 13.5 }}>{r.title}</strong>
                  <StatusPill tone={r.priority === "critical" ? "danger" : "warn"}>{r.priority}</StatusPill>
                </div>
                <div className="cp-muted" style={{ marginTop: 4 }}>{r.description}</div>
                <div className="cp-row" style={{ marginTop: 8, gap: 6 }}>
                  <StatusPill tone="info">{r.status}</StatusPill>
                  <StatusPill tone="muted">{r.area}</StatusPill>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12 }}>
            <Link to={"/curator/roadmap" as never}>Open Roadmap & Idea Lab →</Link>
          </div>
        </SectionCard>

        <SectionCard title="Recent development milestones" subtitle="Grounded in the project audit and blueprint.">
          <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {RELEASES_SEED.map((r) => (
              <li key={r.version} style={{ borderLeft: "2px solid var(--cp-gold)", paddingLeft: 12 }}>
                <div className="cp-row" style={{ justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 13 }}>{r.title}</strong>
                  <span className="cp-muted" style={{ fontSize: 11 }}>{r.date}</span>
                </div>
                <div className="cp-muted" style={{ fontSize: 12 }}>{r.version}</div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Quick actions" subtitle="Editing, uploads, and publishing arrive in Phase 2.">
          <div className="cp-row" style={{ gap: 10, flexWrap: "wrap" }}>
            <DisabledAction label="New figure" />
            <DisabledAction label="New exhibit" />
            <DisabledAction label="Add source" />
            <DisabledAction label="Upload media" />
            <DisabledAction label="Create Match Theater" />
            <DisabledAction label="Create Club Museum" />
            <DisabledAction label="Add roadmap item" />
            <DisabledAction label="Record decision" />
          </div>
          <p className="cp-muted" style={{ marginTop: 12 }}>
            Read-only inventory of {inv.length} content records is live under Collections & Exhibits.
          </p>
        </SectionCard>
      </div>
    </>
  );
}
