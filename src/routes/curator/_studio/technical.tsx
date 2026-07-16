import { createFileRoute } from "@tanstack/react-router";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import { getDashboardCounts, getInventory } from "@/lib/curator-portal/inventory";

export const Route = createFileRoute("/curator/_studio/technical")({
  component: Technical,
});

type Status = "healthy" | "attention" | "missing" | "planned" | "unknown";
function tone(s: Status) {
  return s === "healthy" ? "ok" : s === "attention" ? "warn" : s === "missing" ? "danger" : s === "planned" ? "gold" : "muted";
}

function Technical() {
  const counts = getDashboardCounts();
  const inv = getInventory();

  const rows: { label: string; value: string; status: Status; note?: string }[] = [
    { label: "Framework", value: "TanStack Start v1", status: "healthy" },
    { label: "Runtime", value: "Cloudflare Workers (nodejs_compat)", status: "healthy" },
    { label: "React", value: "React 19", status: "healthy" },
    { label: "Bundler", value: "Vite 7", status: "healthy" },
    { label: "Routes", value: `${inv.length ? "30+" : "unknown"} file routes under src/routes/`, status: "healthy" },
    { label: "Portal routes", value: "12 (Phase 1)", status: "healthy" },
    { label: "Data files", value: `${countOf(inv)} public content records`, status: "healthy" },
    { label: "Curator corpus", value: `${counts.corpus} grounded sources`, status: "healthy" },
    { label: "Server endpoints", value: "src/routes/api/curator.ts (streaming assistant)", status: "healthy" },
    { label: "localStorage stores", value: "progress · passport · footballBookmarks · matchTheaterState · wordsProgress", status: "healthy" },
    { label: "AI Gateway", value: "Lovable AI Gateway (chat + TTS)", status: "healthy" },
    { label: "Authentication", value: "None yet — Phase 2 will introduce Lovable Cloud auth with a curator role", status: "missing" },
    { label: "Database", value: "None yet — public content lives in typed TS files", status: "planned" },
    { label: "Automated tests", value: "None currently", status: "missing" },
    { label: "Analytics", value: "None instrumented", status: "missing" },
    { label: "PWA", value: "Not enabled", status: "planned" },
    { label: "Mobile app packaging", value: "Deferred to Idea Lab (native shell candidate)", status: "planned" },
    { label: "Security scan", value: "Run via Lovable security tooling before publishing", status: "attention" },
  ];

  const debt = [
    "Structured source metadata missing across most exhibits.",
    "No first-party media library — media is referenced ad-hoc.",
    "No automated test suite.",
    "No performance instrumentation (LCP/CLS baselines).",
    "Curator Portal gate is client-side dev-only until Phase 2.",
  ];

  return (
    <>
      <header>
        <h1 className="cp-page-title">Technical Health</h1>
        <p className="cp-page-sub">Codebase inspection — no invented bundle sizes, no fabricated performance scores.</p>
      </header>

      <SectionCard title="Stack & operational status">
        <div style={{ overflowX: "auto" }}>
          <table className="cp-table">
            <thead><tr><th scope="col">Area</th><th scope="col">Value</th><th scope="col">Status</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td>{r.value}</td>
                  <td><StatusPill tone={tone(r.status)}>{r.status}</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Known technical debt">
        <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13.5, display: "flex", flexDirection: "column", gap: 6 }}>
          {debt.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </SectionCard>

      <SectionCard title="Security notes">
        <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13.5 }}>
          <li>/curator is served only when <code>import.meta.env.DEV</code> is true. Production builds return 404 for every /curator/* path.</li>
          <li>No <code>VITE_*</code> variable is used as a secret or gate.</li>
          <li>Server routes under /api/public/* must verify their callers explicitly.</li>
          <li>Phase 2 introduces Lovable Cloud auth with a <code>curator</code> role checked server-side via <code>has_role()</code>.</li>
        </ul>
      </SectionCard>
    </>
  );
}

function countOf(inv: ReturnType<typeof getInventory>) {
  return inv.length;
}
