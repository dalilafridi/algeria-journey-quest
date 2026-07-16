import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  createFirstAdminAccount,
  getStudioBootstrapStatus,
} from "@/lib/curator-portal/bootstrap.functions";

const searchSchema = z.object({ redirect: z.string().optional() }).partial();

export const Route = createFileRoute("/curator/sign-in")({
  validateSearch: searchSchema,
  component: SignIn,
});

type Mode = "signin" | "reset" | "bootstrap";

function SignIn() {
  const nav = useNavigate();
  const search = useSearch({ from: "/curator/sign-in" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [mode, setMode] = useState<Mode>("signin");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [needsBootstrap, setNeedsBootstrap] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const status = await getStudioBootstrapStatus();
        setNeedsBootstrap(status.needsBootstrap);
        if (status.needsBootstrap) setMode("bootstrap");
      } catch {
        setNeedsBootstrap(false);
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: (search.redirect as string) || "/curator", replace: true });
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/curator/sign-in`,
        });
        if (error) throw error;
        setMsg("If that email is registered, a reset link has been sent.");
      } else {
        // bootstrap — create the very first account
        if (password.length < 12) throw new Error("Password must be at least 12 characters.");
        if (password !== passwordConfirm) throw new Error("Passwords do not match.");
        await createFirstAdminAccount({ data: { email, password } });
        nav({ to: "/curator/bootstrap-complete", replace: true });
      }
    } catch (e) {
      setErr((e as Error).message || "Request failed");
    } finally {
      setBusy(false);
    }
  }

  const title =
    mode === "bootstrap" ? "Create the first Museum Director account"
    : mode === "reset" ? "Reset your password"
    : "Sign in";

  return (
    <div style={{ minHeight: "100dvh", background: "var(--cp-bg, #f7f2e8)", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 460, background: "white", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 14, padding: 32, boxShadow: "0 10px 40px rgba(60,40,20,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a7a5a" }}>DZ Odyssey</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "6px 0 4px", color: "#2c1e10" }}>Studio</h1>
          <p style={{ fontSize: 12, color: "#8a7a5a", margin: 0 }}>Museum Operating System</p>
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: "#2c1e10", marginBottom: 12 }}>{title}</div>

        {mode === "bootstrap" && (
          <div style={{ fontSize: 12, color: "#4a3a20", background: "#faf6ec", padding: 10, borderRadius: 6, marginBottom: 12, lineHeight: 1.5 }}>
            No account exists yet in this environment. Create the founding account below.
            For security, the Museum Director role is <strong>not</strong> granted automatically — you'll
            complete a one-time SQL step afterwards.
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#4a3a20" }}>
            Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              style={{ padding: "10px 12px", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 8, fontSize: 14 }} />
          </label>
          {mode !== "reset" && (
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#4a3a20" }}>
              Password {mode === "bootstrap" && <span style={{ color: "#8a7a5a" }}>(min. 12 characters)</span>}
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "bootstrap" ? "new-password" : "current-password"}
                minLength={mode === "bootstrap" ? 12 : undefined}
                style={{ padding: "10px 12px", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 8, fontSize: 14 }} />
            </label>
          )}
          {mode === "bootstrap" && (
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#4a3a20" }}>
              Confirm password
              <input type="password" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password" minLength={12}
                style={{ padding: "10px 12px", border: "1px solid var(--cp-border, #e6dfd0)", borderRadius: 8, fontSize: 14 }} />
            </label>
          )}

          {err && <div role="alert" style={{ fontSize: 12, color: "#a03030", background: "#fdecec", padding: 10, borderRadius: 6 }}>{err}</div>}
          {msg && <div style={{ fontSize: 12, color: "#2a5a2a", background: "#ecf7ec", padding: 10, borderRadius: 6 }}>{msg}</div>}

          <button type="submit" disabled={busy}
            style={{ padding: "10px 12px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: busy ? "wait" : "pointer" }}>
            {busy ? "Working…"
              : mode === "signin" ? "Sign in"
              : mode === "reset" ? "Send reset email"
              : "Create founding account"}
          </button>

          {mode !== "bootstrap" && (
            <button type="button" onClick={() => { setMode(mode === "signin" ? "reset" : "signin"); setErr(null); setMsg(null); }}
              style={{ background: "transparent", border: "none", color: "#8a6a30", fontSize: 12, textDecoration: "underline", cursor: "pointer" }}>
              {mode === "signin" ? "Forgot your password?" : "Back to sign in"}
            </button>
          )}
          {mode === "bootstrap" && needsBootstrap === false && (
            <button type="button" onClick={() => { setMode("signin"); setErr(null); setMsg(null); }}
              style={{ background: "transparent", border: "none", color: "#8a6a30", fontSize: 12, textDecoration: "underline", cursor: "pointer" }}>
              Back to sign in
            </button>
          )}
        </form>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "#8a7a5a", borderTop: "1px solid var(--cp-border, #e6dfd0)", paddingTop: 16 }}>
          {needsBootstrap === false && mode === "signin" && (
            <div style={{ marginBottom: 8 }}>
              Self-registration is disabled. New accounts are provisioned by a Museum Director.
            </div>
          )}
          Access to DZ Odyssey Studio is restricted to authorized contributors.<br />
          <Link to="/" style={{ color: "#8a6a30" }}>← Return to the public museum</Link>
        </div>
      </div>
    </div>
  );
}
