import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList, SectionCard, StatusPill } from "@/components/curator-portal/primitives";

export const Route = createFileRoute("/curator/_studio/publishing")({
  component: Publishing,
});

const STAGES = [
  { name: "Draft", note: "Curator drafts the exhibit outline and prose." },
  { name: "Research", note: "Attach primary sources, verify facts, log open questions." },
  { name: "Fact Check", note: "Second curator verifies every claim against sources." },
  { name: "Translation", note: "French and Arabic translations produced and reviewed." },
  { name: "Media Review", note: "Rights, attribution, alt text, and captions confirmed." },
  { name: "Accessibility Review", note: "Contrast, keyboard, screen reader, motion checked." },
  { name: "Curator Approval", note: "Senior curator signs off." },
  { name: "Scheduled", note: "Publication date set; embargo respected." },
  { name: "Published", note: "Visible in the public museum." },
  { name: "Archived", note: "Retired from public view; permanent record kept." },
];

function Publishing() {
  return (
    <Workspace
      title="Publishing & Exhibitions"
      subtitle="Formal workflow that turns curatorial work into published exhibitions — with approvals, scheduling, versioning, and rollback."
      purpose="Every exhibit that reaches the public should have gone through research, translation, media rights, accessibility, and curator approval — with a permanent record of who approved what."
      why="A museum's authority depends on process. Publishing is the moment content becomes an institutional statement, so the pipeline must be visible, auditable, and reversible."
      dataModel={
        <>
          <SectionCard title="Ten-stage publishing pipeline" subtitle="Every exhibit follows the same path.">
            <ol style={{ display: "flex", flexDirection: "column", gap: 6, paddingLeft: 20 }}>
              {STAGES.map((s, i) => (
                <li key={s.name} style={{ fontSize: 13 }}>
                  <div className="cp-row" style={{ gap: 8 }}>
                    <StatusPill tone={i < 4 ? "info" : i < 8 ? "warn" : "ok"}>{s.name}</StatusPill>
                    <span className="cp-muted" style={{ fontSize: 12 }}>{s.note}</span>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>
          <BulletList items={[
            "Permanent, temporary, and seasonal exhibitions",
            "Scheduled publication and unpublishing",
            "Version history with rollback to any prior approved version",
            "Release notes attached to every publish event",
            "Approval records: who approved, when, from which stage",
          ]} />
        </>
      }
      available={
        <BulletList items={[
          "The public museum currently renders content directly from TypeScript data files.",
          "There is no separation between 'draft' and 'published' at runtime — every commit is a publish.",
          "Release notes are tracked informally under Releases.",
        ]} />
      }
      missing={
        <BulletList items={[
          "No workflow state persisted per exhibit.",
          "No approval records or reviewer sign-off.",
          "No scheduled publishing or embargo.",
          "No rollback, no version history beyond git.",
          "No archival state for retired exhibits.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: exhibit workflow state in Lovable Cloud, gated by curator roles.",
          "Phase 2: publish / unpublish / archive actions with audit log.",
          "Phase 3: scheduled publishing and embargoed releases.",
          "Phase 3: version snapshots with one-click rollback.",
        ]} />
      }
    />
  );
}
