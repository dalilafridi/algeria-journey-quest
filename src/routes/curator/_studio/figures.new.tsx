import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SectionCard } from "@/components/curator-portal/primitives";
import { createFigureDraft, identityPayloadSchema } from "@/lib/curator-portal/figure-drafts.functions";
import type { AppRole } from "@/lib/curator-portal/permissions";

const WRITE_ROLES: AppRole[] = ["museum_director", "senior_curator", "curator", "researcher"];

export const Route = createFileRoute("/curator/_studio/figures/new")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!roles.some((r) => WRITE_ROLES.includes(r))) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: NewFigureDraft,
});

function NewFigureDraft() {
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [name_en, setNameEn] = useState("");
  const [subtitle_en, setSubtitleEn] = useState("");
  const [birth_year, setBirthYear] = useState("");
  const [death_year, setDeathYear] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true); setErr(null);
    try {
      const parsed = identityPayloadSchema.parse({
        slug: slug.trim().toLowerCase(),
        name_en: name_en.trim(),
        subtitle_en: subtitle_en.trim() || null,
        birth_year: birth_year ? Number(birth_year) : null,
        death_year: death_year ? Number(death_year) : null,
      });
      const { id } = await createFigureDraft({ data: parsed as never });
      navigate({ to: "/curator/figures/$draftId", params: { draftId: id } });
    } catch (e) { setErr((e as Error).message); setBusy(false); }
  }

  return (
    <>
      <header>
        <h1 className="cp-page-title">New historical figure draft</h1>
        <p className="cp-page-sub">Start with a slug and English name. All other fields — biography, translations, relationships, sources — are added in the editor.</p>
      </header>
      {err && <div role="alert" style={{ color: "#a03030", padding: 10, background: "#fbebe6", borderRadius: 6 }}>{err}</div>}
      <SectionCard title="Identity">
        <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
          <label style={{ display: "grid", gap: 4, fontSize: 12 }}>
            <span style={{ color: "var(--cp-ink-soft)" }}>Slug (URL segment) *</span>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={120} disabled={busy}
              placeholder="e.g. lalla-fatma-nsoumer"
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }} />
            <span style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>Lowercase letters, digits, hyphens only. Must be unique.</span>
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 12 }}>
            <span style={{ color: "var(--cp-ink-soft)" }}>Name (English) *</span>
            <input value={name_en} onChange={(e) => setNameEn(e.target.value)} maxLength={200} disabled={busy}
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }} />
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 12 }}>
            <span style={{ color: "var(--cp-ink-soft)" }}>Subtitle (English)</span>
            <input value={subtitle_en} onChange={(e) => setSubtitleEn(e.target.value)} maxLength={300} disabled={busy}
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }} />
          </label>
          <div className="cp-row" style={{ gap: 12 }}>
            <label style={{ display: "grid", gap: 4, fontSize: 12, flex: 1 }}>
              <span style={{ color: "var(--cp-ink-soft)" }}>Birth year</span>
              <input type="number" value={birth_year} onChange={(e) => setBirthYear(e.target.value)} disabled={busy}
                style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }} />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 12, flex: 1 }}>
              <span style={{ color: "var(--cp-ink-soft)" }}>Death year</span>
              <input type="number" value={death_year} onChange={(e) => setDeathYear(e.target.value)} disabled={busy}
                style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }} />
            </label>
          </div>
          <div className="cp-row" style={{ gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" onClick={() => navigate({ to: "/curator/figures" })} disabled={busy}
              style={{ padding: "8px 16px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 8, cursor: "pointer" }}>
              Cancel
            </button>
            <button type="button" onClick={submit} disabled={busy || !slug.trim() || !name_en.trim()}
              style={{ padding: "8px 16px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
              {busy ? "Creating…" : "Create draft"}
            </button>
          </div>
        </div>
      </SectionCard>
    </>
  );
}
