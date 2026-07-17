import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { SectionCard } from "@/components/curator-portal/primitives";
import { createFigureDraft, identityPayloadSchema } from "@/lib/curator-portal/figure-drafts.functions";
import type { AppRole } from "@/lib/curator-portal/permissions";

const WRITE_ROLES: AppRole[] = ["museum_director", "senior_curator", "curator", "researcher"];

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

/**
 * Deterministic slugifier. Rules (per QA spec):
 * lowercase, spaces → hyphens, strip punctuation, collapse duplicate hyphens,
 * preserve digits, trim leading/trailing hyphens.
 */
function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function friendlyError(e: unknown): string {
  if (e instanceof z.ZodError) {
    const issue = e.issues[0];
    if (!issue) return "Please review the highlighted fields.";
    const field = issue.path.join(".");
    if (field === "slug") {
      if (issue.code === "invalid_format")
        return "Slug may only contain lowercase letters, numbers, and hyphens.";
      if (issue.code === "too_small") return "Slug must be at least 2 characters.";
      if (issue.code === "too_big") return "Slug must be 120 characters or fewer.";
      return "Please enter a valid slug.";
    }
    if (field === "name_en") return "English name is required.";
    return issue.message || "Please review the highlighted fields.";
  }
  const msg = (e as Error)?.message ?? "";
  if (/duplicate key|unique constraint|figure_drafts_slug|already exists/i.test(msg)) {
    return "This URL already exists. Please choose another slug.";
  }
  return "Something went wrong while creating the draft. Please try again.";
}

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
  const slugEditedRef = useRef(false);

  const slugError = useMemo(() => {
    if (!slug) return null;
    if (slug.length < 2) return "Slug must be at least 2 characters.";
    if (!SLUG_RE.test(slug)) return "Slug may only contain lowercase letters, numbers, and hyphens.";
    return null;
  }, [slug]);

  function onNameChange(value: string) {
    setNameEn(value);
    if (!slugEditedRef.current) {
      setSlug(slugify(value));
    }
  }

  function onSlugChange(value: string) {
    slugEditedRef.current = true;
    // Keep the field constrained to legal characters as the user types.
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  }

  async function submit() {
    setBusy(true);
    setErr(null);
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
    } catch (e) {
      setErr(friendlyError(e));
      setBusy(false);
    }
  }

  const canSubmit = !busy && !!slug.trim() && !!name_en.trim() && !slugError;

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
            <span style={{ color: "var(--cp-ink-soft)" }}>Name (English) *</span>
            <input value={name_en} onChange={(e) => onNameChange(e.target.value)} maxLength={200} disabled={busy}
              placeholder="e.g. Lalla Fatma N'Soumer"
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }} />
          </label>
          <label style={{ display: "grid", gap: 4, fontSize: 12 }}>
            <span style={{ color: "var(--cp-ink-soft)" }}>Slug (URL segment) *</span>
            <input value={slug} onChange={(e) => onSlugChange(e.target.value)} maxLength={120} disabled={busy}
              placeholder="auto-generated from name"
              aria-invalid={!!slugError}
              style={{ padding: "6px 10px", border: `1px solid ${slugError ? "#a03030" : "var(--cp-border)"}`, borderRadius: 6, fontSize: 13 }} />
            <span style={{ fontSize: 11, color: slugError ? "#a03030" : "var(--cp-ink-soft)" }}>
              {slugError ?? "Auto-generated from the English name until you edit it. Lowercase letters, digits, hyphens only. Must be unique."}
            </span>
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
            <button type="button" onClick={submit} disabled={!canSubmit}
              style={{ padding: "8px 16px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: canSubmit ? "pointer" : "not-allowed", opacity: canSubmit ? 1 : 0.6 }}>
              {busy ? "Creating…" : "Create draft"}
            </button>
          </div>
        </div>
      </SectionCard>
    </>
  );
}
