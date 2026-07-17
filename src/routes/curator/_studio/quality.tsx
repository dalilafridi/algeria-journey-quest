import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import { getInventory } from "@/lib/curator-portal/inventory";
import {
  listContentCoverage, coverageStateFor,
  type ContentCoverageRow, type CoverageState,
} from "@/lib/curator-portal/sources.functions";

export const Route = createFileRoute("/curator/_studio/quality")({
  component: Quality,
});

type SourcesGrade = "verified" | "good" | "needs-review" | "unknown";
function sourcesGradeFor(state: CoverageState): SourcesGrade {
  if (state === "verified") return "verified";
  if (state === "linked") return "good";
  if (state === "needs_review") return "needs-review";
  return "unknown";
}
function gradeFrom(r: { hasFr: boolean; hasAr: boolean }, sources: SourcesGrade) {
  return {
    english: "good" as const,
    french: (r.hasFr ? "good" : "incomplete") as "good" | "incomplete",
    arabic: (r.hasAr ? "good" : "incomplete") as "good" | "incomplete",
    sources,
  };
}

function toneOf(g: string) {
  if (g === "excellent" || g === "verified" || g === "good") return "ok" as const;
  if (g === "needs-review") return "warn" as const;
  if (g === "incomplete") return "danger" as const;
  return "muted" as const;
}

function Quality() {
  const inv = getInventory();
  const [coverage, setCoverage] = useState<Map<string, ContentCoverageRow>>(new Map());
  useEffect(() => {
    listContentCoverage()
      .then((rs) => {
        const m = new Map<string, ContentCoverageRow>();
        for (const r of rs) m.set(`${r.content_type}:${r.content_id}`, r);
        setCoverage(m);
      })
      .catch(() => { /* stays empty */ });
  }, []);
  const rows = inv.map((r) => {
    const state = coverageStateFor(coverage.get(`${r.kind}:${r.id}`));
    return { ...r, grades: gradeFrom(r, sourcesGradeFor(state)) };
  });
  const summary = {
    completeBoth: rows.filter((r) => r.hasFr && r.hasAr).length,
    missingFr: rows.filter((r) => !r.hasFr).length,
    missingAr: rows.filter((r) => !r.hasAr).length,
    placeholders: rows.filter((r) => r.status === "placeholder").length,
    unknownSources: rows.filter((r) => r.grades.sources === "unknown").length,
  };


  return (
    <>
      <header>
        <h1 className="cp-page-title">Curatorial Quality</h1>
        <p className="cp-page-sub">Each exhibit is graded on translation, sources, media, audio, quiz and accessibility signals derivable from the codebase. Fields we cannot measure are marked <StatusPill tone="muted">Unknown</StatusPill> instead of guessed.</p>
      </header>

      <div className="cp-grid cp-grid--stats">
        <div className="cp-stat"><div className="cp-stat__label">Fully trilingual</div><div className="cp-stat__value">{summary.completeBoth}</div></div>
        <div className="cp-stat"><div className="cp-stat__label">Missing FR</div><div className="cp-stat__value">{summary.missingFr}</div></div>
        <div className="cp-stat"><div className="cp-stat__label">Missing AR</div><div className="cp-stat__value">{summary.missingAr}</div></div>
        <div className="cp-stat"><div className="cp-stat__label">Placeholders</div><div className="cp-stat__value">{summary.placeholders}</div></div>
        <div className="cp-stat"><div className="cp-stat__label">Records without sources</div><div className="cp-stat__value">{summary.unknownSources}</div></div>
      </div>

      <SectionCard title="Exhibit quality matrix" subtitle="Sample of the first 60 records. Every measure is derivable from public data files; other measures show Unknown.">
        <div style={{ overflowX: "auto" }}>
          <table className="cp-table">
            <thead>
              <tr>
                <th scope="col">Kind</th>
                <th scope="col">Title</th>
                <th scope="col">EN</th>
                <th scope="col">FR</th>
                <th scope="col">AR</th>
                <th scope="col">Sources</th>
                <th scope="col">Media captions</th>
                <th scope="col">Audio guide</th>
                <th scope="col">Quiz</th>
                <th scope="col">Mobile</th>
                <th scope="col">Accessibility</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 60).map((r) => (
                <tr key={`${r.kind}-${r.id}`}>
                  <td>{r.kind}</td>
                  <td>{r.titleEn}</td>
                  <td><StatusPill tone={toneOf(r.grades.english)}>{r.grades.english}</StatusPill></td>
                  <td><StatusPill tone={toneOf(r.grades.french)}>{r.grades.french}</StatusPill></td>
                  <td><StatusPill tone={toneOf(r.grades.arabic)}>{r.grades.arabic}</StatusPill></td>
                  <td><StatusPill tone={toneOf(r.grades.sources)}>{r.grades.sources}</StatusPill></td>
                  <td><StatusPill tone="muted">unknown</StatusPill></td>
                  <td><StatusPill tone="muted">unknown</StatusPill></td>
                  <td><StatusPill tone="muted">unknown</StatusPill></td>
                  <td><StatusPill tone="muted">unknown</StatusPill></td>
                  <td><StatusPill tone="muted">unknown</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Manual review queue">
        <ul style={{ fontSize: 13.5, display: "flex", flexDirection: "column", gap: 6 }}>
          <li>Translations review across FR / AR (see Missing FR / Missing AR counts above).</li>
          <li>Structured source attachment for every era, region and figure.</li>
          <li>Alt-text audit for every image reference (blocked on Media Library).</li>
          <li>Placeholder Club Museums promotion to complete status.</li>
          <li>Known technical debt catalogued under Technical Health.</li>
        </ul>
      </SectionCard>
    </>
  );
}
