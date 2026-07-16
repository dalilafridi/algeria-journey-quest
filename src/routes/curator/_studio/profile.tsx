import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionCard, Workspace, BulletList } from "@/components/curator-portal/primitives";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import { ROLE_LABEL } from "@/lib/curator-portal/permissions";
import { updateMyProfile } from "@/lib/curator-portal/studio-auth.functions";

export const Route = createFileRoute("/curator/_studio/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const session = useStudioSession();
  const [name, setName] = useState(session.displayName ?? "");
  const [lang, setLang] = useState<"en" | "fr" | "ar">((session.preferredLanguage as "en") ?? "en");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setName(session.displayName ?? ""); }, [session.displayName]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setErr(null); setBusy(true);
    try {
      await updateMyProfile({ data: { display_name: name.trim(), preferred_language: lang } });
      setMsg("Profile updated.");
    } catch (e) {
      setErr((e as Error).message);
    } finally { setBusy(false); }
  }

  return (
    <Workspace
      title="Profile"
      subtitle="Your Studio account and personal preferences."
      purpose="Manage the small set of personal fields you control. Roles and administrative fields are managed by Studio administrators and cannot be self-edited."
      why="Every operator of a museum needs an accountable identity. This page surfaces the identity attached to your Studio activity."
      dataModel={
        <>
          <SectionCard title="Identity">
            <dl className="cp-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr", rowGap: 6, columnGap: 12, fontSize: 13 }}>
              <dt className="cp-muted">Email</dt><dd>{session.email ?? "—"}</dd>
              <dt className="cp-muted">User ID</dt><dd style={{ fontFamily: "monospace", fontSize: 11 }}>{session.userId}</dd>
              <dt className="cp-muted">Assigned roles</dt>
              <dd>{session.roles.length === 0 ? <em>None</em> : session.roles.map((r) => ROLE_LABEL[r]).join(" · ")}</dd>
            </dl>
          </SectionCard>

          <SectionCard title="Preferences" subtitle="Only display name and preferred language are self-editable.">
            <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
              <label style={{ fontSize: 12 }}>
                Display name
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required
                  style={{ display: "block", width: "100%", padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, marginTop: 4 }} />
              </label>
              <label style={{ fontSize: 12 }}>
                Preferred language
                <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "fr" | "ar")}
                  style={{ display: "block", width: "100%", padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, marginTop: 4 }}>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </label>
              {err && <div role="alert" style={{ color: "#a03030", fontSize: 12 }}>{err}</div>}
              {msg && <div style={{ color: "#2a5a2a", fontSize: 12 }}>{msg}</div>}
              <div>
                <button type="submit" disabled={busy}
                  style={{ padding: "8px 14px", background: "#2c1e10", color: "white", border: "none", borderRadius: 6, fontSize: 13, cursor: busy ? "wait" : "pointer" }}>
                  {busy ? "Saving…" : "Save preferences"}
                </button>
              </div>
            </form>
          </SectionCard>
        </>
      }
      available={<BulletList items={["Display name and preferred language editable via a Zod-validated server RPC.", "Role list is read-only and mirrors user_roles."]} />}
      missing={<BulletList items={["No avatar upload.", "No email change flow.", "No password change UI (use the sign-in Forgot Password link)."]} />}
      future={<BulletList items={["Phase 2B: avatar upload with rights review.", "Phase 2B: contributor bio and public attribution."]} />}
    />
  );
}
