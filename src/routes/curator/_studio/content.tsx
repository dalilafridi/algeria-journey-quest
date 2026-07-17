import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getInventory } from "@/lib/curator-portal/inventory";
import type { ContentKind, ContentRecord } from "@/lib/curator-portal/models";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import {
  listContentCoverage, coverageStateFor, COVERAGE_LABEL,
  getSource, type ContentCoverageRow, type SourceLinkRow, type SourceRow,
} from "@/lib/curator-portal/sources.functions";


const KIND_LABEL: Record<ContentKind, string> = {
  era: "Era",
  figure: "Figure",
  region: "Region",
  culture: "Culture",
  cuisine: "Cuisine",
  cinema: "Cinema",
  football: "Football",
  club: "Club Museum",
  "match-theater": "Match Theater",
  "on-this-day": "On This Day",
  "did-you-know": "Did You Know",
  lesson: "Lesson",
  word: "Word",
  journey: "Journey",
  quiz: "Quiz",
};

export const Route = createFileRoute("/curator/_studio/content")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  component: ContentInventory,
});

function ContentInventory() {
  const search = Route.useSearch();
  const inv = getInventory();
  const [q, setQ] = useState<string>(search.q || "");
  const [kind, setKind] = useState<ContentKind | "all">("all");
  const [sort, setSort] = useState<"title" | "completeness" | "kind">("kind");
  const [selected, setSelected] = useState<ContentRecord | null>(null);

  const rows = useMemo(() => {
    let list = inv;
    if (kind !== "all") list = list.filter((r) => r.kind === kind);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.titleEn.toLowerCase().includes(s) ||
          r.id.toLowerCase().includes(s) ||
          r.file.toLowerCase().includes(s),
      );
    }
    const sorted = [...list];
    if (sort === "title") sorted.sort((a, b) => a.titleEn.localeCompare(b.titleEn));
    else if (sort === "completeness") sorted.sort((a, b) => b.completeness - a.completeness);
    else sorted.sort((a, b) => a.kind.localeCompare(b.kind) || a.titleEn.localeCompare(b.titleEn));
    return sorted;
  }, [inv, kind, q, sort]);

  const kinds: ContentKind[] = [
    "era", "figure", "region", "culture", "cuisine", "cinema",
    "football", "club", "match-theater", "on-this-day",
    "did-you-know", "lesson", "word", "journey", "quiz",
  ];

  return (
    <>
      <header>
        <h1 className="cp-page-title">Collections & Exhibits</h1>
        <p className="cp-page-sub">
          {inv.length} records derived from public TypeScript data files. Read-only.
        </p>
      </header>

      <SectionCard title="Filters">
        <div className="cp-row" style={{ gap: 12 }}>
          <input
            type="search"
            placeholder="Search title, id or file…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ minWidth: 260 }}
            aria-label="Search inventory"
          />
          <select value={kind} onChange={(e) => setKind(e.target.value as ContentKind | "all")} aria-label="Filter by kind">
            <option value="all">All kinds ({inv.length})</option>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {KIND_LABEL[k]} ({inv.filter((r) => r.kind === k).length})
              </option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as "title" | "completeness" | "kind")} aria-label="Sort by">
            <option value="kind">Sort: kind</option>
            <option value="title">Sort: title</option>
            <option value="completeness">Sort: completeness</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard title={`${rows.length} record${rows.length === 1 ? "" : "s"}`}>
        <div style={{ overflowX: "auto" }}>
          <table className="cp-table">
            <caption className="sr-only">Content inventory table</caption>
            <thead>
              <tr>
                <th scope="col">Kind</th>
                <th scope="col">ID</th>
                <th scope="col">Title (EN)</th>
                <th scope="col">FR</th>
                <th scope="col">AR</th>
                <th scope="col">Sources</th>
                <th scope="col">Media</th>
                <th scope="col">Status</th>
                <th scope="col">Complete</th>
                <th scope="col">File</th>
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.kind}-${r.id}`}>
                  <td><StatusPill tone="muted">{KIND_LABEL[r.kind]}</StatusPill></td>
                  <td style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{r.id}</td>
                  <td>{r.titleEn}</td>
                  <td>{r.hasFr ? "✓" : "—"}</td>
                  <td>{r.hasAr ? "✓" : "—"}</td>
                  <td>{r.sourceCount}</td>
                  <td>{r.mediaCount}</td>
                  <td>
                    <StatusPill tone={r.status === "complete" ? "ok" : r.status === "placeholder" ? "danger" : "warn"}>
                      {r.status}
                    </StatusPill>
                  </td>
                  <td style={{ fontVariantNumeric: "tabular-nums" }}>{Math.round(r.completeness * 100)}%</td>
                  <td style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--cp-ink-soft)" }}>{r.file}</td>
                  <td className="cp-row" style={{ gap: 6 }}>
                    {r.href && (
                      <a href={r.href} target="_blank" rel="noreferrer">Open</a>
                    )}
                    <button type="button" onClick={() => setSelected(r)} style={{ background: "transparent", border: "1px solid var(--cp-border)", padding: "2px 8px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="cp-detail-title" onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "grid", placeItems: "center", zIndex: 60, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--cp-panel)", color: "var(--cp-ink)", border: "1px solid var(--cp-border)", borderRadius: 14, padding: 20, maxWidth: 520, width: "100%" }}>
            <h2 id="cp-detail-title" style={{ fontSize: 16, fontWeight: 700 }}>{selected.titleEn}</h2>
            <p className="cp-muted" style={{ marginTop: 4 }}>{KIND_LABEL[selected.kind]} · {selected.id}</p>
            <dl style={{ marginTop: 12, display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", fontSize: 13 }}>
              <dt className="cp-muted">Status</dt><dd>{selected.status}</dd>
              <dt className="cp-muted">Completeness</dt><dd>{Math.round(selected.completeness * 100)}%</dd>
              <dt className="cp-muted">Translations</dt><dd>EN ✓ · FR {selected.hasFr ? "✓" : "—"} · AR {selected.hasAr ? "✓" : "—"}</dd>
              <dt className="cp-muted">Sources</dt><dd>{selected.sourceCount}</dd>
              <dt className="cp-muted">Media</dt><dd>{selected.mediaCount}</dd>
              <dt className="cp-muted">File</dt><dd style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{selected.file}</dd>
              <dt className="cp-muted">Public route</dt><dd>{selected.href ?? "—"}</dd>
            </dl>
            <div className="cp-row" style={{ justifyContent: "flex-end", marginTop: 14, gap: 8 }}>
              {selected.href && <a href={selected.href} target="_blank" rel="noreferrer">Open exhibit</a>}
              <button type="button" onClick={() => setSelected(null)} style={{ padding: "6px 12px", borderRadius: 8, background: "var(--cp-brand-deep)", color: "white", border: 0, cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
