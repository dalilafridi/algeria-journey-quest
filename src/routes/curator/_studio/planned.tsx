/**
 * Planned Workspaces — the single home for future Studio surfaces.
 *
 * Each retired top-level workspace (Blueprint, Roadmap, Decisions,
 * Preservation, Acquisitions, Releases, Education, Analytics,
 * Publishing, Media, Technical Health) still has its own route with
 * institutional documentation. This landing page consolidates them so
 * the sidebar stays focused on what's operational today.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionCard } from "@/components/curator-portal/primitives";

interface PlannedItem {
  to: string;
  title: string;
  summary: string;
  status: "planned" | "reference";
}

const ITEMS: PlannedItem[] = [
  { to: "/curator/blueprint",    title: "Museum Constitution",         summary: "The invariants, governance model, and editorial charter that bind every decision.", status: "reference" },
  { to: "/curator/decisions",    title: "Governance & Decisions",       summary: "Directoral decisions, exhibit approvals, and dissent — the institutional record.", status: "reference" },
  { to: "/curator/roadmap",      title: "Roadmap & Idea Lab",           summary: "Future exhibits, restorations, and research programmes.", status: "planned" },
  { to: "/curator/releases",     title: "Releases",                     summary: "Public-museum release notes and rollback plans.", status: "planned" },
  { to: "/curator/publishing",   title: "Publishing & Exhibitions",     summary: "The public-facing publication pipeline for exhibits and dossiers.", status: "planned" },
  { to: "/curator/media",        title: "Media & Digital Assets",       summary: "Ingest, transcode, and rights-clear media objects.", status: "planned" },
  { to: "/curator/acquisitions", title: "Acquisitions & Provenance",    summary: "New collection items, chain of custody, and legal footing.", status: "planned" },
  { to: "/curator/preservation", title: "Digital Preservation",         summary: "Long-term durability plans, checksums, and format migration.", status: "planned" },
  { to: "/curator/education",    title: "Education Studio",             summary: "Teaching guides, school partnerships, and reading lists.", status: "planned" },
  { to: "/curator/analytics",    title: "Museum Intelligence",          summary: "Visitor engagement, dwell time, and curatorial outcomes.", status: "planned" },
  { to: "/curator/technical",    title: "Technical Health",             summary: "Infrastructure, dependency, and reliability posture.", status: "planned" },
];

export const Route = createFileRoute("/curator/_studio/planned")({
  component: PlannedWorkspaces,
});

function PlannedWorkspaces() {
  return (
    <>
      <header style={{ marginBottom: 6 }}>
        <h1 className="cp-page-title">Planned Workspaces</h1>
        <p className="cp-page-sub">
          The full institutional map. Everything below is on the roadmap; only the operational
          workspaces (Mission Control, My Work, Content, Figure Drafts, Research Library, Coverage,
          Quality, Translations, Team, Audit Log) appear in the primary sidebar today.
        </p>
      </header>

      <SectionCard title="Reference · read this before opening a new workspace">
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          {ITEMS.filter((i) => i.status === "reference").map((i) => (
            <PlannedRow key={i.to} item={i} />
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Planned · scaffolded but not operational" subtitle="Each link still opens the current institutional record for that workspace.">
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
          {ITEMS.filter((i) => i.status === "planned").map((i) => (
            <PlannedRow key={i.to} item={i} />
          ))}
        </ul>
      </SectionCard>
    </>
  );
}

function PlannedRow({ item }: { item: PlannedItem }) {
  return (
    <li style={{ padding: "10px 12px", border: "1px solid var(--cp-border)", borderRadius: 8, background: "white" }}>
      <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <Link to={item.to as never} style={{ fontWeight: 700, color: "inherit" }}>{item.title}</Link>
          <div style={{ fontSize: 12, color: "var(--cp-ink-soft)", marginTop: 3 }}>{item.summary}</div>
        </div>
        <span style={{
          fontSize: 10, textTransform: "uppercase", letterSpacing: 0.6, padding: "2px 8px", borderRadius: 999,
          background: item.status === "reference" ? "#e6efd8" : "#fdf3d4",
          color: item.status === "reference" ? "#3a5a1e" : "#7a5a10",
        }}>{item.status}</span>
      </div>
    </li>
  );
}
