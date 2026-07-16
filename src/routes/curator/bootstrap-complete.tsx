import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/curator/bootstrap-complete")({
  component: BootstrapComplete,
});

function BootstrapComplete() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--cp-bg, #f7f2e8)", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 620, background: "white", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 14, padding: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a7a5a" }}>DZ Odyssey Studio</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "6px 0 12px", color: "#2c1e10" }}>Account created — one manual step remains</h1>
        <p style={{ fontSize: 14, color: "#4a3a20", lineHeight: 1.6 }}>
          Your account exists but has <strong>no Studio role yet</strong>. For security, the very first
          Museum Director role must be granted manually. This is a one-time procedure per environment.
        </p>

        <ol style={{ fontSize: 14, color: "#4a3a20", lineHeight: 1.7, paddingLeft: 20, marginTop: 16 }}>
          <li>Open the Lovable Cloud SQL editor for this project (Backend → SQL).</li>
          <li>
            Run the following, replacing the email with the address you just used:
            <pre style={{ background: "#faf6ec", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 8, padding: 12, marginTop: 8, fontSize: 12, overflowX: "auto" }}>{`INSERT INTO public.user_roles (user_id, role, assigned_by)
SELECT id, 'museum_director'::public.app_role, id
FROM auth.users
WHERE email = 'YOU@EXAMPLE.ORG'
ON CONFLICT (user_id, role) DO NOTHING;`}</pre>
          </li>
          <li>Return here and sign in.</li>
          <li>All subsequent role assignments happen inside Studio at <code>/curator/team</code>.</li>
        </ol>

        <p style={{ fontSize: 12, color: "#6a5a40", marginTop: 16 }}>
          Full details, including recovery guidance, live in <code>docs/STUDIO_ADMIN_BOOTSTRAP.md</code>.
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <Link to="/curator/sign-in" style={{ padding: "8px 14px", background: "#2c1e10", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 13 }}>Go to sign in</Link>
          <Link to="/" style={{ padding: "8px 14px", background: "transparent", color: "#4a3a20", borderRadius: 8, textDecoration: "none", fontSize: 13, border: "1px solid var(--cp-border, #e6dfd0)" }}>Public museum</Link>
        </div>
      </div>
    </div>
  );
}
