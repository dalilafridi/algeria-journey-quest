import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  RELIABILITY_LABEL, RELIABILITY_TIERS, RIGHTS_LABEL, RIGHTS_STATUSES,
  SOURCE_TYPES, SOURCE_TYPE_LABEL, STATUS_LABEL, SOURCE_STATUSES,
  listSources, type SourceRow, type SourceStatus, type SourceType,
  type ReliabilityTier, type RightsStatus,
} from "@/lib/curator-portal/sources.functions";
import { SectionCard, StatCard, StatusPill } from "@/components/curator-portal/primitives";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import { canAccessRoute } from "@/lib/curator-portal/permissions";

export const Route = createFileRoute("/curator/_studio/sources/")({
  component: ResearchLibrary,
});

const STATUS_TONE: Record<SourceStatus, "ok" | "warn" | "muted"> = {
  verified: "ok", draft: "warn", archived: "muted",
};

function ResearchLibrary() {
  const navigate = useNavigate();
  const session = useStudioSession();
  const canCreate = canAccessRoute("/curator/sources", session.roles) &&
    session.roles.some((r) => ["museum_director", "senior_curator", "curator", "researcher", "fact_checker"].includes(r));

  const [rows, setRows] = useState<SourceRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [type, setType] = useState<SourceType | "all">("all");
  const [lang, setLang] = useState<string>("all");
  const [rel, setRel] = useState<ReliabilityTier | "all">("all");
  const [rights, setRights] = useState<RightsStatus | "all">("all");
  const [status, setStatus] = useState<SourceStatus | "active">("active");
  const [linked, setLinked] = useState<"all" | "linked" | "unlinked">("all");
  const [view, setView] = useState<"table" | "cards">("table");

  useEffect(() => {
    listSources()
      .then((r) => setRows(r as SourceRow[]))
      .catch((e) => setErr((e as Error).message));
  }, []);

  const languages = useMemo(() => {
    const s = new Set<string>();
    rows?.forEach((r) => r.language && s.add(r.language));
    return Array.from(s).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status === "active" ? r.status === "archived" : r.status !== status) return false;
      if (type !== "all" && r.source_type !== type) return false;
      if (lang !== "all" && r.language !== lang) return false;
      if (rel !== "all" && r.reliability_tier !== rel) return false;
      if (rights !== "all" && r.rights_status !== rights) return false;
      if (needle) {
        const hay = [r.title, r.author, r.publisher, r.citation_text, r.identifier].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      const lc = r.link_count ?? 0;
      if (linked === "linked" && lc === 0) return false;
      if (linked === "unlinked" && lc > 0) return false;
      return true;
    });
  }, [rows, q, type, lang, rel, rights, status, linked]);


  const counts = useMemo(() => {
    const total = rows?.length ?? 0;
    const verified = rows?.filter((r) => r.status === "verified").length ?? 0;
    const draft = rows?.filter((r) => r.status === "draft").length ?? 0;
    const archived = rows?.filter((r) => r.status === "archived").length ?? 0;
    const missingVerification = rows?.filter((r) => r.status === "verified" && !r.verification_date).length ?? 0;
    const unknownRights = rows?.filter((r) => r.rights_status === "unknown").length ?? 0;
    return { total, verified, draft, archived, missingVerification, unknownRights };
  }, [rows]);

  const recent = useMemo(() =>
    (rows ?? []).slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 5),
  [rows]);

  const mine = useMemo(() =>
    (rows ?? []).filter((r) => r.updated_by === session.userId).slice(0, 5),
  [rows, session.userId]);

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 className="cp-page-title">Research Library</h1>
          <p className="cp-page-sub">
            Structured, audited catalogue of the sources behind every exhibit. All changes are recorded.
          </p>
        </div>
        {canCreate && (
          <button
            type="button"
            onClick={() => navigate({ to: "/curator/sources/new" })}
            style={{ padding: "8px 16px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
          >+ New source</button>
        )}
      </header>

      {err && <div role="alert" style={{ color: "#a03030", padding: 10 }}>{err}</div>}

      {rows && rows.length === 0 ? (
        <SectionCard title="Your Research Library is ready.">
          <p className="cp-muted" style={{ marginBottom: 12 }}>
            No sources have been catalogued yet. Add your first source to begin building the museum's research foundation.
          </p>
          <ul style={{ fontSize: 13, color: "var(--cp-ink-soft)", lineHeight: 1.8, paddingLeft: 18 }}>
            <li>Bulk import is not available yet.</li>
            <li>Public museum content remains unchanged.</li>
          </ul>
          {canCreate && (
            <div style={{ marginTop: 14 }}>
              <button type="button" onClick={() => navigate({ to: "/curator/sources/new" })}
                style={{ padding: "8px 16px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                Add first source
              </button>
            </div>
          )}
        </SectionCard>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            <StatCard label="Total sources" value={counts.total} />
            <StatCard label="Verified" value={counts.verified} />
            <StatCard label="Draft" value={counts.draft} />
            <StatCard label="Archived" value={counts.archived} />
            <StatCard label="Verified w/o date" value={counts.missingVerification} hint="Awaiting verification date" />
            <StatCard label="Unknown rights" value={counts.unknownRights} hint="Rights review pending" />
          </div>

          <SectionCard title="Records">
            <div className="cp-row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <input
                type="search" placeholder="Search title, author, publisher…"
                value={q} onChange={(e) => setQ(e.target.value)}
                style={{ flex: "1 1 240px", padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6 }}
              />
              <Select value={type} onChange={(v) => setType(v as SourceType | "all")}
                options={[["all", "All types"], ...SOURCE_TYPES.map((t) => [t, SOURCE_TYPE_LABEL[t]] as const)]} />
              <Select value={lang} onChange={setLang}
                options={[["all", "All languages"], ...languages.map((l) => [l, l] as const)]} />
              <Select value={rel} onChange={(v) => setRel(v as ReliabilityTier | "all")}
                options={[["all", "All reliability"], ...RELIABILITY_TIERS.map((t) => [t, RELIABILITY_LABEL[t]] as const)]} />
              <Select value={rights} onChange={(v) => setRights(v as RightsStatus | "all")}
                options={[["all", "All rights"], ...RIGHTS_STATUSES.map((t) => [t, RIGHTS_LABEL[t]] as const)]} />
              <Select value={status} onChange={(v) => setStatus(v as SourceStatus | "active")}
                options={[["active", "Active (draft + verified)"], ...SOURCE_STATUSES.map((t) => [t, STATUS_LABEL[t]] as const)]} />
              <Select value={linked} onChange={(v) => setLinked(v as "all" | "linked" | "unlinked")}
                options={[["all", "Any link state"], ["linked", "Linked"], ["unlinked", "Unlinked"]]} />
              <Select value={view} onChange={(v) => setView(v as "table" | "cards")}
                options={[["table", "Table"], ["cards", "Cards"]]} />
            </div>

            {!rows ? <div className="cp-muted">Loading…</div> :
              filtered.length === 0 ? <div className="cp-muted">No records match these filters.</div> :
              view === "table" ? (
                <div style={{ overflowX: "auto" }}>
                  <table className="cp-table" style={{ fontSize: 13 }}>
                    <thead><tr>
                      <th>Title</th><th>Author</th><th>Type</th><th>Year</th><th>Language</th>
                      <th>Reliability</th><th>Rights</th><th>Status</th>
                      <th>Verified</th><th>Updated</th>
                    </tr></thead>
                    <tbody>
                      {filtered.map((r) => (
                        <tr key={r.id} style={{ cursor: "pointer" }}
                          onClick={() => navigate({ to: "/curator/sources/$sourceId", params: { sourceId: r.id } })}>
                          <td style={{ fontWeight: 600, maxWidth: 320 }}>
                            <Link to="/curator/sources/$sourceId" params={{ sourceId: r.id }} style={{ color: "inherit" }}>{r.title}</Link>
                          </td>
                          <td>{r.author ?? "—"}</td>
                          <td>{SOURCE_TYPE_LABEL[r.source_type]}</td>
                          <td>{r.publication_year ?? (r.publication_date ? r.publication_date.slice(0, 4) : "—")}</td>
                          <td>{r.language ?? "—"}</td>
                          <td>{RELIABILITY_LABEL[r.reliability_tier]}</td>
                          <td>{RIGHTS_LABEL[r.rights_status]}</td>
                          <td><StatusPill tone={STATUS_TONE[r.status]}>{STATUS_LABEL[r.status]}</StatusPill></td>
                          <td>{r.verification_date ?? "—"}</td>
                          <td>{r.updated_at.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                  {filtered.map((r) => (
                    <Link key={r.id} to="/curator/sources/$sourceId" params={{ sourceId: r.id }}
                      style={{ display: "block", border: "1px solid var(--cp-border)", borderRadius: 8, padding: 12, background: "white", color: "inherit", textDecoration: "none" }}>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.title}</div>
                      <div className="cp-muted" style={{ fontSize: 12, marginBottom: 8 }}>
                        {[r.author, r.publisher, r.publication_year].filter(Boolean).join(" · ") || "—"}
                      </div>
                      <div className="cp-row" style={{ gap: 4, flexWrap: "wrap" }}>
                        <StatusPill tone={STATUS_TONE[r.status]}>{STATUS_LABEL[r.status]}</StatusPill>
                        <StatusPill tone="muted">{SOURCE_TYPE_LABEL[r.source_type]}</StatusPill>
                        <StatusPill tone="muted">{RELIABILITY_LABEL[r.reliability_tier]}</StatusPill>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </SectionCard>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
            <SectionCard title="Recently updated">
              <MiniList rows={recent} navigate={navigate} />
            </SectionCard>
            <SectionCard title="My recent work">
              <MiniList rows={mine} navigate={navigate} empty="You haven't edited any sources yet." />
            </SectionCard>
            <SectionCard title="Rights review">
              <MiniList
                rows={(rows ?? []).filter((r) => r.rights_status === "unknown" || r.rights_status === "permission_required").slice(0, 5)}
                navigate={navigate} empty="No rights review pending." />
            </SectionCard>
            <SectionCard title="Missing verification date">
              <MiniList
                rows={(rows ?? []).filter((r) => r.status === "verified" && !r.verification_date).slice(0, 5)}
                navigate={navigate} empty="All verified sources carry a verification date." />
            </SectionCard>
          </div>
        </>
      )}
    </>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: ReadonlyArray<readonly [string, string]> }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ padding: "6px 8px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

function MiniList({ rows, navigate, empty }: { rows: SourceRow[]; navigate: ReturnType<typeof useNavigate>; empty?: string }) {
  if (rows.length === 0) return <div className="cp-muted" style={{ fontSize: 13 }}>{empty ?? "Nothing here yet."}</div>;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {rows.map((r) => (
        <li key={r.id} style={{ padding: "6px 0", borderBottom: "1px solid var(--cp-border-soft, #eee)" }}>
          <button type="button"
            onClick={() => navigate({ to: "/curator/sources/$sourceId", params: { sourceId: r.id } })}
            style={{ background: "none", border: "none", padding: 0, color: "inherit", cursor: "pointer", textAlign: "left", width: "100%" }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{r.title}</div>
            <div className="cp-muted" style={{ fontSize: 11 }}>
              {STATUS_LABEL[r.status]} · updated {r.updated_at.slice(0, 10)}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
