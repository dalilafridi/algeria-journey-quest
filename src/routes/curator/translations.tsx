import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList, StatCard, MetricLabel } from "@/components/curator-portal/primitives";
import { getInventory } from "@/lib/curator-portal/inventory";

export const Route = createFileRoute("/curator/translations")({
  component: Translations,
});

function Translations() {
  const inv = getInventory();
  const total = inv.length;
  const en = inv.filter((r) => r.title && r.title.length > 0).length;
  const fr = inv.filter((r) => r.hasFr).length;
  const ar = inv.filter((r) => r.hasAr).length;
  const missingFr = total - fr;
  const missingAr = total - ar;

  return (
    <Workspace
      title="Translation Center"
      subtitle="Coordinate English, French, and Arabic across every collection — plus RTL review, terminology, and reviewer assignment."
      purpose="Give the museum a single place to track what is translated, what needs review, and what is still missing across all three languages."
      why="A national digital museum must speak to its audience in the languages that shaped its history. Translation is a curatorial act, not a mechanical task — it carries interpretation, tone, and historical naming conventions."
      dataModel={
        <BulletList items={[
          "Languages: English, French, Arabic (with RTL review workflow)",
          "Status per string: missing, machine-drafted, human-translated, reviewed, approved",
          "Reviewer assignment and approval trail",
          "Terminology consistency checks and approved glossary",
          "Historical-name consistency (Amazigh / Arabic / French variants)",
          "Translation memory reused across exhibits",
          "Bulk export / import for professional translators",
        ]} />
      }
      available={
        <>
          <div className="cp-grid cp-grid--stats" style={{ marginBottom: 8 }}>
            <StatCard label="Records with English" value={en} precision="exact" />
            <StatCard label="Records with French" value={fr} precision="exact" formula="records where fr string is non-empty" />
            <StatCard label="Records with Arabic" value={ar} precision="exact" formula="records where ar string is non-empty" />
            <StatCard label="Missing French" value={missingFr} precision="exact" />
            <StatCard label="Missing Arabic" value={missingAr} precision="exact" />
          </div>
          <BulletList items={[
            <>Trilingual `LocalizedString` primitive already wired through the codebase.</>,
            <>Language switcher and RTL layout for Arabic are functional in the public museum.</>,
            <>Content inventory reports per-record language presence — see <MetricLabel precision="exact" />.</>,
          ]} />
        </>
      }
      missing={
        <BulletList items={[
          "No review workflow: strings cannot be marked reviewed, approved, or rejected.",
          "No reviewer assignment or notification system.",
          "No approved glossary or terminology enforcement.",
          "No translation memory across exhibits.",
          "No RTL visual QA queue.",
          "No side-by-side diff view for revisions.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: per-string review state stored in Lovable Cloud with role-scoped writes.",
          "Phase 3: approved glossary + terminology consistency scanner.",
          "Phase 3: side-by-side reviewer view with inline comments.",
          "Phase 4: professional-translator export/import round-trip.",
        ]} />
      }
    />
  );
}
