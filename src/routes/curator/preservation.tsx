import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList } from "@/components/curator-portal/primitives";

export const Route = createFileRoute("/curator/preservation")({
  component: Preservation,
});

function Preservation() {
  return (
    <Workspace
      title="Digital Preservation"
      subtitle="File integrity, versioning, backups, checksums, format migration, and disaster recovery for every museum asset."
      purpose="Guarantee that the museum's digital record survives — bit-perfect, attributable, and recoverable — for decades."
      why="A museum promises permanence. Digital collections, unlike physical objects, degrade silently: link rot, bit rot, format obsolescence, lost credentials. Preservation is a policy, not a plugin."
      dataModel={
        <BulletList items={[
          "Per-asset file integrity checks (SHA-256 checksums)",
          "Full version history for every asset and exhibit",
          "Scheduled backups (daily, weekly, monthly, yearly)",
          "Format migration policy (e.g. JPEG → AVIF, WAV → FLAC)",
          "Archived editions (immutable snapshots)",
          "Restoration notes (what was restored, by whom, from what)",
          "Original vs enhanced assets kept side-by-side",
          "AI restoration disclosure attached to every AI-processed asset",
          "Retention policy per asset class",
          "Disaster-recovery runbook and quarterly drills",
        ]} />
      }
      available={
        <BulletList items={[
          "The museum is currently a static application: no user-uploaded assets exist.",
          "All content lives in version-controlled TypeScript files (git is the only history mechanism).",
          "External media (if any) is referenced by URL, not stored or checksummed.",
        ]} />
      }
      missing={
        <BulletList items={[
          "No checksums, no integrity verification.",
          "No backup policy beyond git history.",
          "No format-migration plan.",
          "No AI-restoration disclosure fields.",
          "No retention policy or disaster-recovery runbook.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: asset storage with checksums and per-asset version history.",
          "Phase 2: daily automated backups with quarterly restore drills.",
          "Phase 3: format-migration jobs (originals kept immutable).",
          "Phase 3: mandatory AI-restoration disclosure on every enhanced asset.",
        ]} />
      }
    />
  );
}
