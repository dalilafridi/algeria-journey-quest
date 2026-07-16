import { createFileRoute } from "@tanstack/react-router";
import { SectionCard, StatusPill } from "@/components/curator-portal/primitives";

export const Route = createFileRoute("/curator/settings")({
  component: Settings,
});

function Settings() {
  return (
    <>
      <header>
        <h1 className="cp-page-title">Settings</h1>
        <p className="cp-page-sub">Portal preferences and Phase-2 recommendations.</p>
      </header>

      <SectionCard title="Access status">
        <p><StatusPill tone="warn">Temporary development access</StatusPill></p>
        <p className="cp-muted" style={{ marginTop: 8 }}>
          The Curator Portal is served only when <code>import.meta.env.DEV</code> is true. On production builds every
          <code> /curator/* </code> path returns 404 through the museum's normal not-found handler. No secret, token or
          <code> VITE_* </code> variable protects this route in the browser.
        </p>
      </SectionCard>

      <SectionCard title="Phase 2 — authentication plan">
        <ol style={{ paddingLeft: 18, listStyle: "decimal", fontSize: 13.5, display: "flex", flexDirection: "column", gap: 6 }}>
          <li>Enable Lovable Cloud on the project.</li>
          <li>Create a <code>profiles</code> table trigger on new auth users.</li>
          <li>Introduce a <code>public.user_roles</code> table with an <code>app_role</code> enum including <code>curator</code>.</li>
          <li>Add a <code>SECURITY DEFINER</code> function <code>public.has_role(user_id, role)</code>.</li>
          <li>Replace this dev-only client gate with a server-side <code>beforeLoad</code> using <code>requireSupabaseAuth</code> that
              throws <code>redirect(&#123; to: "/auth" &#125;)</code> when the caller does not have the curator role.</li>
          <li>If a specific preview deployment needs temporary access, gate on a non-<code>VITE_</code> server env var and set an
              HttpOnly/Secure/SameSite cookie inside a server route.</li>
        </ol>
      </SectionCard>

      <SectionCard title="Theme">
        <p className="cp-muted">Toggle from the top header. The portal supports light and dark themes independently of the public museum.</p>
      </SectionCard>

      <SectionCard title="Data model handover">
        <p className="cp-muted">
          Phase-1 TypeScript interfaces live in <code>src/lib/curator-portal/models.ts</code>. Each has a suggested Postgres
          mapping in a comment at the top of that file. Phase-2 migrations should create one table per interface with
          the same field names, plus RLS policies scoped to the curator role.
        </p>
      </SectionCard>
    </>
  );
}
