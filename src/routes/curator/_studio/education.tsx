import { createFileRoute } from "@tanstack/react-router";
import { Workspace, BulletList, StatCard } from "@/components/curator-portal/primitives";
import { getDashboardCounts } from "@/lib/curator-portal/inventory";

export const Route = createFileRoute("/curator/_studio/education")({
  component: Education,
});

function Education() {
  const c = getDashboardCounts();
  return (
    <Workspace
      title="Education Studio"
      subtitle="Teacher guides, lesson plans, school tours, student and family modes, quizzes, worksheets, and age-level adaptations."
      purpose="Turn the museum into a curriculum-ready resource for Algerian schools, universities, and families — with materials teachers can actually use."
      why="Museums earn their public role through education. A digital museum multiplies that reach when it packages its collections into age-appropriate, exportable learning materials."
      dataModel={
        <BulletList items={[
          "Teacher guides per era, region, and figure",
          "Lesson plans mapped to learning objectives",
          "School tours (curated multi-stop journeys)",
          "Student mode and Family mode presentation layers",
          "Worksheets and exportable PDFs",
          "Quizzes with difficulty and scoring",
          "Age-level adaptations (primary, secondary, university)",
          "Classroom collections shareable by teachers",
          "Learning objectives tied to national curriculum",
        ]} />
      }
      available={
        <>
          <div className="cp-grid cp-grid--stats" style={{ marginBottom: 8 }}>
            <StatCard label="Lessons" value={c.lessons} precision="exact" />
            <StatCard label="Quizzes" value={c.quizzes} precision="exact" />
            <StatCard label="Guided journeys" value={c.journeys} precision="exact" />
            <StatCard label="Vocabulary entries" value={c.words} precision="exact" />
            <StatCard label="On This Day" value={c.onThisDay} precision="exact" />
          </div>
          <BulletList items={[
            "Lessons, quizzes, guided journeys, and vocabulary already live in the public museum.",
            "Passport and journey progress tracking exists on the visitor side.",
          ]} />
        </>
      }
      missing={
        <BulletList items={[
          "No teacher-facing packaging or export.",
          "No age-level adaptation of exhibits.",
          "No worksheets or printable materials.",
          "No mapping to a formal curriculum framework.",
          "No classroom / cohort concept.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: teacher accounts with a lightweight classroom concept.",
          "Phase 2: exportable lesson-plan PDFs per era and region.",
          "Phase 3: age-level presentation layer over existing exhibits.",
          "Phase 3: curriculum alignment reports.",
        ]} />
      }
    />
  );
}
