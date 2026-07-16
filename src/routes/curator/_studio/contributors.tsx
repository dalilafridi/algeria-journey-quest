import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList, SectionCard, StatusPill } from "@/components/curator-portal/primitives";

export const Route = createFileRoute("/curator/_studio/contributors")({
  component: Contributors,
});

const ROLES: { role: string; scope: string }[] = [
  { role: "Museum Director", scope: "Approves mission, policy, and public-facing statements." },
  { role: "Senior Curator", scope: "Approves exhibits, sets curatorial standards." },
  { role: "Curator", scope: "Authors and edits exhibits, journeys, and collections." },
  { role: "Researcher", scope: "Adds and verifies sources; documents open questions." },
  { role: "Fact Checker", scope: "Independent verification against primary sources." },
  { role: "Translator", scope: "Produces French / Arabic translations." },
  { role: "Translation Reviewer", scope: "Approves translations and terminology." },
  { role: "Media Curator", scope: "Manages photographs, film, audio, and 3D assets." },
  { role: "Rights Manager", scope: "Confirms licenses, attribution, and takedowns." },
  { role: "Accessibility Reviewer", scope: "Contrast, keyboard, screen reader, motion, RTL." },
  { role: "Educator", scope: "Teacher guides, lesson plans, student and family modes." },
  { role: "Publisher", scope: "Executes scheduled publishing and unpublishing." },
  { role: "Technical Administrator", scope: "Infrastructure, backups, integrations." },
];

function Contributors() {
  return (
    <Workspace
      title="Contributors & Roles"
      subtitle="The people, roles, and permissions that will operate the museum in Phase 2 and beyond."
      purpose="Define who can do what before authentication exists, so the security and workflow designs are informed by a real role model — not invented at implementation time."
      why="A museum is a team. Roles clarify accountability: who authors, who verifies, who approves, who publishes, and who preserves. Without an explicit role model, everything collapses into 'admin'."
      dataModel={
        <SectionCard title="Planned roles" subtitle="Conceptual only — no authentication in Phase 1.">
          <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ROLES.map((r) => (
              <li key={r.role} className="cp-row" style={{ justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--cp-border)", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.role}</div>
                  <div className="cp-muted" style={{ fontSize: 12 }}>{r.scope}</div>
                </div>
                <StatusPill tone="planned">Planned</StatusPill>
              </li>
            ))}
          </ul>
        </SectionCard>
      }
      available={
        <BulletList items={[
          "No authentication system is enabled in Phase 1.",
          "The current Studio is a shared read-only surface for reviewers.",
          "No visitor accounts, no curator accounts, no roles enforced.",
        ]} />
      }
      missing={
        <BulletList items={[
          "No authentication provider.",
          "No user table, no roles table, no permission enforcement.",
          "No invitation flow for contributors.",
          "No audit log of contributor actions.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: Lovable Cloud auth + separate `user_roles` table (never on profiles).",
          "Phase 2: server-side `has_role()` used in every RLS policy.",
          "Phase 3: invitation flow, deactivation, and audit log.",
        ]} />
      }
    />
  );
}
