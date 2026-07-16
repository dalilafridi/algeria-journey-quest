import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({ redirect: z.string().optional() }).partial();

export const Route = createFileRoute("/curator/sign-in")({
  validateSearch: searchSchema,
  component: SignIn,
});

function SignIn() {
  const nav = useNavigate();
  const search = useSearch({ from: "/curator/sign-in" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "reset">("signin");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: (search.redirect as string) || "/curator", replace: true });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/curator/sign-in`,
        });
        if (error) throw error;
        setMsg("If that email is registered, a reset link has been sent.");
      }
    } catch (e) {
      setErr((e as Error).message || "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--cp-bg, #f7f2e8)", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "white", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 14, padding: 32, boxShadow: "0 10px 40px rgba(60,40,20,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a7a5a" }}>DZ Odyssey</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "6px 0 4px", color: "#2c1e10" }}>Studio</h1>
          <p style={{ fontSize: 12, color: "#8a7a5a", margin: 0 }}>Museum Operating System</p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#4a3a20" }}>
            Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              style={{ padding: "10px 12px", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 8, fontSize: 14 }} />
          </label>
          {mode === "signin" && (
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#4a3a20" }}>
              Password
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
                style={{ padding: "10px 12px", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 8, fontSize: 14 }} />
            </label>
          )}

          {err && <div role="alert" style={{ fontSize: 12, color: "#a03030", background: "#fdecec", padding: 10, borderRadius: 6 }}>{err}</div>}
          {msg && <div style={{ fontSize: 12, color: "#2a5a2a", background: "#ecf7ec", padding: 10, borderRadius: 6 }}>{msg}</div>}

          <button type="submit" disabled={busy}
            style={{ padding: "10px 12px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: busy ? "wait" : "pointer" }}>
            {busy ? "Working…" : mode === "signin" ? "Sign in" : "Send reset email"}
          </button>

          <button type="button" onClick={() => { setMode(mode === "signin" ? "reset" : "signin"); setErr(null); setMsg(null); }}
            style={{ background: "transparent", border: "none", color: "#8a6a30", fontSize: 12, textDecoration: "underline", cursor: "pointer" }}>
            {mode === "signin" ? "Forgot your password?" : "Back to sign in"}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "#8a7a5a", borderTop: "1px solid var(--cp-border, #e6dfd0)", paddingTop: 16 }}>
          Access to DZ Odyssey Studio is restricted to authorized contributors.<br />
          <Link to="/" style={{ color: "#8a6a30" }}>← Return to the public museum</Link>
        </div>
      </div>
    </div>
  );
}
