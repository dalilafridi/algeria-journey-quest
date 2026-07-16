import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList, SectionCard } from "@/components/curator-portal/primitives";

export const Route = createFileRoute("/curator/_studio/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <Workspace
      title="Museum Intelligence"
      subtitle="Visitor behaviour, content performance, curator-question analytics, and content-gap detection."
      purpose="Understand how visitors move through the museum so curators can invest in the exhibits, journeys, and languages that need it."
      why="A museum without visitor intelligence cannot learn. Analytics is a curatorial tool — it reveals which stories resonate, which are under-visited, and which questions visitors ask that the museum has not answered."
      dataModel={
        <BulletList items={[
          "Most viewed exhibits, regions, figures",
          "Time spent per exhibit",
          "Search terms and zero-result searches",
          "Curator (Ask Curator) questions and topic clusters",
          "Quiz starts, completions, and difficulty",
          "Audio-guide plays, resumes, completions",
          "Visitor journeys (path through exhibits)",
          "Return visits and depth of exploration",
          "Translation usage by language",
          "Device, viewport, and assistive-tech mix",
          "Under-visited collections (surface gaps for curation)",
          "Content gaps derived from unanswered questions",
        ]} />
      }
      available={
        <SectionCard title="Analytics state" subtitle="Honesty over vanity metrics.">
          <p style={{ fontSize: 13.5, lineHeight: 1.55 }}>
            <strong>No analytics system is currently connected.</strong> The public museum does not emit
            page-view events, search events, curator-question events, or audio-guide events to any collector.
            No dashboards below this line contain real visitor data.
          </p>
        </SectionCard>
      }
      missing={
        <BulletList items={[
          "No analytics collector wired into the public museum.",
          "No event schema defined for exhibits, search, curator questions, or audio.",
          "No privacy-first policy documented for visitor data.",
          "No content-gap detection loop.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: privacy-first, cookieless event collector for exhibits, search, and audio.",
          "Phase 2: Ask-Curator question log with topic clustering.",
          "Phase 3: under-visited-collections report drives roadmap.",
          "Phase 3: content-gap detection from unanswered curator questions.",
        ]} />
      }
    />
  );
}
