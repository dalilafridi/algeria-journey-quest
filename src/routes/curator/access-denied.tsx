import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ROLE_LABEL, type AppRole } from "@/lib/curator-portal/permissions";

export const Route = createFileRoute("/curator/access-denied")({
  component: AccessDenied,
});

function AccessDenied() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
      if (!data.user) return;
      const { data: r } = await supabase.rpc("get_my_studio_roles");
      setRoles(((r ?? []) as Array<{ role: AppRole } | AppRole>).map((x) =>
        typeof x === "string" ? x : x.role,
      ) as AppRole[]);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/curator/sign-in", replace: true });
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--cp-bg, #f7f2e8)", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 520, background: "white", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 14, padding: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a7a5a" }}>DZ Odyssey Studio</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "6px 0 12px", color: "#2c1e10" }}>Access not granted</h1>
        <p style={{ fontSize: 14, color: "#4a3a20", lineHeight: 1.6 }}>
          You are signed in {email ? <>as <strong>{email}</strong></> : null}, but your account does not
          currently have permission to access this workspace of DZ Odyssey Studio.
        </p>
        <div style={{ marginTop: 16, padding: 12, background: "#faf6ec", borderRadius: 8, fontSize: 13, color: "#4a3a20" }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Your current roles</div>
          {roles.length === 0
            ? <em>No Studio roles assigned.</em>
            : roles.map((r) => ROLE_LABEL[r]).join(" · ")}
        </div>
        <p style={{ fontSize: 13, color: "#6a5a40", marginTop: 16 }}>
          To request access, contact a Museum Director or Technical Administrator.
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <Link to="/curator" style={btnPrimary}>Return to Studio</Link>
          <Link to="/" style={btnGhost}>View public museum</Link>
          <button onClick={signOut} style={btnGhost}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = { padding: "8px 14px", background: "#2c1e10", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 13, border: "none", cursor: "pointer" };
const btnGhost: React.CSSProperties = { padding: "8px 14px", background: "transparent", color: "#4a3a20", borderRadius: 8, textDecoration: "none", fontSize: 13, border: "1px solid var(--cp-border, #e6dfd0)", cursor: "pointer" };
