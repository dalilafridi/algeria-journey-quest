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
      subtitle="The people, roles, and permissions that operate the museum."
      purpose="Reference view of the institutional role model that governs Studio access and editorial workflows."
      why="A museum is a team. Roles clarify accountability: who authors, who verifies, who approves, who publishes, and who preserves."
      dataModel={
        <SectionCard title="Institutional roles" subtitle="Enforced today via Studio authentication and RLS.">
          <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ROLES.map((r) => (
              <li key={r.role} className="cp-row" style={{ justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--cp-border)", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.role}</div>
                  <div className="cp-muted" style={{ fontSize: 12 }}>{r.scope}</div>
                </div>
                <StatusPill tone="ok">Active</StatusPill>
              </li>
            ))}
          </ul>
        </SectionCard>
      }
      available={
        <BulletList items={[
          "Studio authentication is live (email/password with role-based access).",
          "Roles govern Research Library and Figure Draft workflows server-side.",
          "Public visitors remain anonymous — Studio accounts are separate.",
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
