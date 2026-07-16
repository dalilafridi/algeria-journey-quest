import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList } from "@/components/curator-portal/primitives";

export const Route = createFileRoute("/curator/_studio/acquisitions")({
  component: Acquisitions,
});

function Acquisitions() {
  return (
    <Workspace
      title="Acquisitions & Provenance"
      subtitle="How each object, record, and asset entered the museum — with donor, source, rights, and provenance chain."
      purpose="Document the origin and chain of custody of every item so the museum can defend authenticity and respect rights."
      why="Provenance is the museum's proof of legitimacy. Digital content requires it as much as physical objects: where did this photograph come from, who owned the rights, who transcribed this oral history, when, and under what license?"
      dataModel={
        <BulletList items={[
          "Acquisition type: donation, transfer, licensed, commissioned, public-domain, original research",
          "Donor or contributor (person or institution)",
          "Source institution and reference",
          "Acquisition date and jurisdiction",
          "Ownership and rights holder",
          "License (with expiration if any)",
          "Authenticity classification and verification notes",
          "Provenance chain (custody events over time)",
          "Restrictions on use, display, or reproduction",
          "Related collection and exhibits",
          "Curatorial notes and open questions",
        ]} />
      }
      available={
        <BulletList items={[
          "No acquisitions workspace exists yet.",
          "Current content is authored directly in code without formal provenance fields.",
          "Some exhibits cite sources informally in their prose.",
        ]} />
      }
      missing={
        <BulletList items={[
          "No structured provenance fields on any content record.",
          "No donor / contributor registry.",
          "No license or restriction tracking.",
          "No custody / chain-of-events log.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: provenance schema attached to every asset and exhibit.",
          "Phase 2: donor and source-institution registry.",
          "Phase 3: license expiration monitoring and takedown workflow.",
        ]} />
      }
    />
  );
}
