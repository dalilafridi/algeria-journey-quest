import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  SectionCard,
  CoverageBar,
  MetricLabel,
  StatusPill,
} from "@/components/curator-portal/primitives";
import { getDashboardCounts, getInventory } from "@/lib/curator-portal/inventory";
import {
  listContentCoverage, coverageStateFor,
  type ContentCoverageRow,
} from "@/lib/curator-portal/sources.functions";

export const Route = createFileRoute("/curator/_studio/coverage")({
  component: Coverage,
});

function Coverage() {
  const c = getDashboardCounts();
  const inv = getInventory();
  const [coverage, setCoverage] = useState<Map<string, ContentCoverageRow>>(new Map());
  useEffect(() => {
    listContentCoverage()
      .then((rows) => {
        const m = new Map<string, ContentCoverageRow>();
        for (const r of rows) m.set(`${r.content_type}:${r.content_id}`, r);
        setCoverage(m);
      })
      .catch(() => { /* stays empty */ });
  }, []);
  const covOf = (r: { kind: string; id: string }) => coverage.get(`${r.kind}:${r.id}`);
  const withLinks = inv.filter((r) => (covOf(r)?.linked ?? 0) > 0).length;
  const verified = inv.filter((r) => coverageStateFor(covOf(r)) === "verified").length;
  const needsReview = inv.filter((r) => coverageStateFor(covOf(r)) === "needs_review").length;


  const byKind = (k: string) => inv.filter((r) => r.kind === k).length;

  const languages = [
    { key: "en", label: "English", value: inv.length, of: inv.length, precision: "exact" as const, formula: "author language — always present" },
    { key: "fr", label: "French", value: inv.filter((r) => r.hasFr).length, of: inv.length, precision: "exact" as const, formula: "records with fr string / total" },
    { key: "ar", label: "Arabic", value: inv.filter((r) => r.hasAr).length, of: inv.length, precision: "exact" as const, formula: "records with ar string / total" },
  ];

  const categories = [
    { label: "History", value: byKind("era") + byKind("figure"), precision: "exact" as const, note: "eras + figures" },
    { label: "Culture", value: byKind("culture"), precision: "exact" as const },
    { label: "Cuisine", value: byKind("cuisine"), precision: "exact" as const },
    { label: "Cinema", value: byKind("cinema"), precision: "exact" as const },
    { label: "Football", value: byKind("football") + byKind("club") + byKind("match-theater"), precision: "exact" as const },
    { label: "Architecture", value: 0, precision: "exact" as const, note: "no current data source" },
    { label: "Literature", value: 0, precision: "exact" as const, note: "planned wing" },
    { label: "Music", value: 0, precision: "exact" as const, note: "planned wing" },
    { label: "Science", value: 0, precision: "exact" as const, note: "no current data source" },
    { label: "Nature", value: 0, precision: "exact" as const, note: "no current data source" },
    { label: "Archaeology", value: 0, precision: "exact" as const, note: "planned wing" },
    { label: "Other sports", value: 0, precision: "exact" as const, note: "reuse Hall of Football" },
  ];

  const geoRegions = byKind("region");
  const totalAlgerianRegions = 8; // Kabylie, Aurès, Constantinois, Algérois, Oranie, Mzab, Sahara, Kabylie côtière — informal
  const geoPct = geoRegions / totalAlgerianRegions;

  return (
    <>
      <header>
        <h1 className="cp-page-title">Museum Coverage</h1>
        <p className="cp-page-sub">Where content exists today and where it doesn't. Formulas are shown next to every ratio.</p>
      </header>

      <SectionCard title="Languages" subtitle="Coverage of the trilingual promise (EN · FR · AR).">
        <table className="cp-table">
          <thead>
            <tr><th scope="col">Language</th><th scope="col">Coverage</th><th scope="col">Records</th><th scope="col">Precision</th><th scope="col">Formula</th></tr>
          </thead>
          <tbody>
            {languages.map((l) => (
              <tr key={l.key}>
                <td>{l.label}</td>
                <td style={{ minWidth: 220 }}><CoverageBar value={l.value / (l.of || 1)} label={l.label} /></td>
                <td>{l.value} / {l.of}</td>
                <td><MetricLabel precision={l.precision} /></td>
                <td className="cp-muted" style={{ fontSize: 12 }}>{l.formula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Content categories" subtitle="How many records exist per wing.">
        <table className="cp-table">
          <thead>
            <tr><th scope="col">Category</th><th scope="col">Records</th><th scope="col">Precision</th><th scope="col">Note</th></tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.label}>
                <td>{cat.label}</td>
                <td>{cat.value === 0 ? <StatusPill tone="muted">not started</StatusPill> : cat.value}</td>
                <td><MetricLabel precision={cat.precision} /></td>
                <td className="cp-muted" style={{ fontSize: 12 }}>{cat.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <div className="cp-grid cp-grid--2">
        <SectionCard title="Football depth">
          <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>Football exhibits</span><strong>{c.football}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>Legends</span><strong>{c.legends}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>Coaches</span><strong>{c.coaches}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>Stadiums</span><strong>{c.stadiums}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>World Cup editions</span><strong>{c.worldCups}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>AFCON entries</span><strong>{c.afcon}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>Trophies catalogued</span><strong>{c.trophies}</strong></li>
            <li className="cp-row" style={{ justifyContent: "space-between" }}><span>FLN players</span><strong>{c.flnPlayers}</strong></li>
          </ul>
        </SectionCard>

        <SectionCard title="Club Museums">
          <div className="cp-row" style={{ justifyContent: "space-between" }}>
            <span>Complete</span><StatusPill tone="ok">{c.clubsComplete}</StatusPill>
          </div>
          <div className="cp-row" style={{ justifyContent: "space-between", marginTop: 6 }}>
            <span>Placeholder</span><StatusPill tone="warn">{c.clubsPlaceholder}</StatusPill>
          </div>
          <CoverageBar value={c.clubsComplete / (c.clubs || 1)} label="Club Museum completion" />
          <p className="cp-muted" style={{ fontSize: 12, marginTop: 6 }}>Formula: clubs.status="complete" / total clubs</p>
        </SectionCard>

        <SectionCard title="Match Theater">
          <p>{c.matchTheater} experience{c.matchTheater === 1 ? "" : "s"} available.</p>
          <p className="cp-muted" style={{ fontSize: 12 }}>Additional editions tracked under Roadmap.</p>
        </SectionCard>

        <SectionCard title="Geographic regions">
          <CoverageBar value={geoPct} label="Algerian regions covered" />
          <p className="cp-muted" style={{ fontSize: 12, marginTop: 6 }}>
            {geoRegions} region{geoRegions === 1 ? "" : "s"} — <MetricLabel precision="estimated" /> against an informal target of {totalAlgerianRegions} major cultural regions.
          </p>
        </SectionCard>

        <SectionCard title="Structured source coverage" subtitle="Live counts from the Research Library — updated as sources are linked.">
          <CoverageBar value={withLinks / (inv.length || 1)} label="Records with at least one linked source" />
          <ul style={{ marginTop: 10, fontSize: 13, display: "grid", gap: 4 }}>
            <li>Records with structured sources: <strong>{withLinks}</strong> / {inv.length}</li>
            <li>Records with <em>verified</em> coverage: <strong>{verified}</strong></li>
            <li>Records needing review (verified + draft mixed): <strong>{needsReview}</strong></li>
            <li>Records with tracked media: <strong>{inv.filter((r) => r.mediaCount > 0).length}</strong></li>
          </ul>
          <p className="cp-muted" style={{ fontSize: 12, marginTop: 6 }}>
            Formula: distinct museum records referenced in <code>source_links</code>, joined with <code>source_records.status</code>.
          </p>
        </SectionCard>


        <SectionCard title="Interactive Algeria map">
          <p className="cp-muted">Placeholder — a coverage map by wilaya will be introduced once the geographic dataset is authored. This page holds the architecture but does not render a fabricated map.</p>
        </SectionCard>
      </div>
    </>
  );
}
