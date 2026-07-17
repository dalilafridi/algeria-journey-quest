/**
 * FigureDraftEditor — tabbed editor for a single figure draft.
 *
 * Tabs:
 *   Identity · Narrative · Historical Context · Research · Translation ·
 *   Review · Revision History · Private Preview
 *
 * All tabs use explicit **Save Draft** buttons per scope. Approved drafts
 * become read-only in Identity/Narrative/Translation tabs; only archive /
 * restore remain available (from the parent page's status bar).
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SectionCard, StatusPill } from "./primitives";
import { TranslationField } from "./TranslationField";
import {
  addFigureDraftRelation, removeFigureDraftRelation,
  updateFigureDraft, transitionFigureDraft,
  STATUS_LABEL, TRANSITIONS,
  type FigureDraftDetail, type FigureDraftStatus, type UpdateScope,
} from "@/lib/curator-portal/figure-drafts.functions";
import {
  translateFieldGroup, upsertTranslationStatus,
  type TranslationState, type TranslationStatusRow,
} from "@/lib/curator-portal/translation.functions";
import {
  eraOptions, regionOptions, themeOptions, figureOptions,
  RELATION_KIND_LABEL, type RelationKind,
} from "@/lib/curator-portal/taxonomies";
import type { SourceLinkRow, SourceRow } from "@/lib/curator-portal/sources.functions";
import type { AppRole } from "@/lib/curator-portal/permissions";

const APPROVE_TRANSLATION_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "translation_reviewer",
];

const TABS = [
  "identity", "narrative", "historical", "research",
  "translation", "review", "history", "preview",
] as const;
type TabId = (typeof TABS)[number];
const TAB_LABEL: Record<TabId, string> = {
  identity: "Identity",
  narrative: "Narrative",
  historical: "Historical Context",
  research: "Research",
  translation: "Translation",
  review: "Review",
  history: "Revision History",
  preview: "Private Preview",
};

const STATUS_TONE: Record<FigureDraftStatus, "ok" | "warn" | "muted" | "info" | "gold" | "planned"> = {
  draft: "muted",
  research_review: "info",
  fact_check: "info",
  translation_review: "info",
  curator_review: "gold",
  approved: "ok",
  changes_requested: "warn",
  archived: "muted",
};

export interface EditorSourceRow { link: SourceLinkRow; source: SourceRow | null }

export function FigureDraftEditor({
  detail, roles, sources, translationStatuses, onReload,
}: {
  detail: FigureDraftDetail;
  roles: AppRole[];
  sources: EditorSourceRow[];
  translationStatuses?: TranslationStatusRow[];
  onReload: () => Promise<void>;
}) {
  const [tab, setTab] = useState<TabId>("identity");
  const draft = detail.draft;
  const isApproved = draft.status === "approved";
  const isArchived = draft.status === "archived";
  const locked = isApproved || isArchived;

  const verifiedCount = sources.filter((s) => s.source?.status === "verified").length;
  const draftCount = sources.filter((s) => s.source?.status === "draft").length;
  const archivedCount = sources.filter((s) => s.source?.status === "archived").length;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <SectionCard
        title={draft.name_en}
        subtitle={draft.subtitle_en ?? draft.slug}
        action={
          <div className="cp-row" style={{ gap: 8, alignItems: "center" }}>
            <StatusPill tone={STATUS_TONE[draft.status]}>
              {STATUS_LABEL[draft.status]}
            </StatusPill>
            {isApproved && <span className="cp-tag cp-tag--exact">Locked (approved)</span>}
            {isArchived && <span className="cp-tag cp-tag--unknown">Archived</span>}
          </div>
        }
      >
        {verifiedCount === 0 && (
          <div role="alert" style={{ marginBottom: 12, padding: 10, border: "1px solid #d1a04a", background: "#fdf3d4", borderRadius: 6, fontSize: 13 }}>
            ⚠ No <strong>verified</strong> source is linked to this figure yet. A draft cannot be
            approved without at least one verified source in the Research Library.
          </div>
        )}
        <div className="cp-row" style={{ gap: 12, flexWrap: "wrap", fontSize: 12, color: "var(--cp-ink-soft)" }}>
          <span>Sources linked: <strong>{sources.length}</strong></span>
          <span>Verified: <strong>{verifiedCount}</strong></span>
          <span>Draft: <strong>{draftCount}</strong></span>
          <span>Archived: <strong>{archivedCount}</strong></span>
          <span>Revisions: <strong>{detail.revisions.length}</strong></span>
        </div>
      </SectionCard>

      <div className="cp-tabs" role="tablist" style={{ display: "flex", gap: 4, flexWrap: "wrap", borderBottom: "1px solid var(--cp-border)" }}>
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: tab === t ? "var(--cp-surface)" : "transparent",
              border: "1px solid var(--cp-border)",
              borderBottom: tab === t ? "1px solid var(--cp-surface)" : "1px solid var(--cp-border)",
              marginBottom: -1, borderTopLeftRadius: 6, borderTopRightRadius: 6,
              color: tab === t ? "var(--cp-ink)" : "var(--cp-ink-soft)",
            }}
          >
            {TAB_LABEL[t]}
          </button>
        ))}
      </div>

      {tab === "identity" && <IdentityTab detail={detail} locked={locked} onReload={onReload} />}
      {tab === "narrative" && <NarrativeTab detail={detail} locked={locked} onReload={onReload} />}
      {tab === "historical" && <HistoricalTab detail={detail} locked={locked} onReload={onReload} />}
      {tab === "research" && <ResearchTab detail={detail} sources={sources} />}
      {tab === "translation" && (
        <TranslationTab
          detail={detail}
          locked={locked}
          statuses={translationStatuses ?? []}
          canApprove={roles.some((r) => APPROVE_TRANSLATION_ROLES.includes(r))}
          onReload={onReload}
        />
      )}
      {tab === "review" && <ReviewTab detail={detail} roles={roles} onReload={onReload} />}
      {tab === "history" && <HistoryTab detail={detail} />}
      {tab === "preview" && <PreviewTab detail={detail} />}
    </div>
  );
}

// ---------------- Shared primitives -----------------------------------

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
      <span style={{ color: "var(--cp-ink-soft)" }}>{label}</span>
      {children}
      {hint && <span style={{ fontSize: 11, color: "var(--cp-ink-soft)", opacity: 0.8 }}>{hint}</span>}
    </label>
  );
}
function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, background: props.disabled ? "#f7f1e5" : "white", ...props.style }} />;
}
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: props.disabled ? "#f7f1e5" : "white", resize: "vertical", ...props.style }} />;
}
function SaveBar({ dirty, busy, onSave, note }: { dirty: boolean; busy: boolean; onSave: () => void; note?: string }) {
  return (
    <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
      <span style={{ fontSize: 12, color: "var(--cp-ink-soft)" }}>
        {note ?? (dirty ? "Unsaved changes" : "Saved")}
      </span>
      <button type="button" onClick={onSave} disabled={!dirty || busy}
        style={{ padding: "8px 16px", background: dirty ? "#2c1e10" : "#a89988", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: dirty ? "pointer" : "not-allowed" }}>
        {busy ? "Saving…" : "Save draft"}
      </button>
    </div>
  );
}

// ---------------- Identity tab ----------------------------------------

function IdentityTab({ detail, locked, onReload }: { detail: FigureDraftDetail; locked: boolean; onReload: () => Promise<void> }) {
  const d = detail.draft;
  const [v, setV] = useState({
    slug: d.slug,
    name_en: d.name_en,
    name_fr: d.name_fr ?? "",
    name_ar: d.name_ar ?? "",
    subtitle_en: d.subtitle_en ?? "",
    subtitle_fr: d.subtitle_fr ?? "",
    subtitle_ar: d.subtitle_ar ?? "",
    birth_year: d.birth_year != null ? String(d.birth_year) : "",
    death_year: d.death_year != null ? String(d.death_year) : "",
    birth_date_text: d.birth_date_text ?? "",
    death_date_text: d.death_date_text ?? "",
    birthplace_text_en: d.birthplace_text_en ?? "",
    birthplace_text_fr: d.birthplace_text_fr ?? "",
    birthplace_text_ar: d.birthplace_text_ar ?? "",
  });
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = <K extends keyof typeof v>(k: K, val: string) => { setV((s) => ({ ...s, [k]: val })); setDirty(true); };

  async function save() {
    setBusy(true); setErr(null);
    try {
      await updateFigureDraft({ data: {
        id: d.id, scope: "identity" as UpdateScope,
        payload: {
          slug: v.slug,
          name_en: v.name_en,
          name_fr: v.name_fr || null,
          name_ar: v.name_ar || null,
          subtitle_en: v.subtitle_en || null,
          subtitle_fr: v.subtitle_fr || null,
          subtitle_ar: v.subtitle_ar || null,
          birth_year: v.birth_year ? Number(v.birth_year) : null,
          death_year: v.death_year ? Number(v.death_year) : null,
          birth_date_text: v.birth_date_text || null,
          death_date_text: v.death_date_text || null,
          birthplace_text_en: v.birthplace_text_en || null,
          birthplace_text_fr: v.birthplace_text_fr || null,
          birthplace_text_ar: v.birthplace_text_ar || null,
        },
      }});
      await onReload();
      setDirty(false);
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }

  return (
    <SectionCard title="Identity" subtitle="Names, dates, birthplace. Trilingual (English required, French / Arabic optional at Identity stage).">
      {err && <div role="alert" style={{ color: "#a03030", marginBottom: 10 }}>{err}</div>}
      {locked && <div style={{ marginBottom: 10, fontSize: 12, color: "var(--cp-ink-soft)" }}>This draft is locked (approved or archived). Restore/reopen to edit.</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <Field label="Slug (URL segment)" hint="lowercase, digits, hyphens">
          <TextInput value={v.slug} onChange={(e) => set("slug", e.target.value)} disabled={locked} maxLength={120} />
        </Field>
        <Field label="Name (English) *"><TextInput value={v.name_en} onChange={(e) => set("name_en", e.target.value)} disabled={locked} maxLength={200} required /></Field>
        <Field label="Nom (Français)"><TextInput value={v.name_fr} onChange={(e) => set("name_fr", e.target.value)} disabled={locked} maxLength={200} /></Field>
        <Field label="الاسم (العربية)"><TextInput value={v.name_ar} onChange={(e) => set("name_ar", e.target.value)} disabled={locked} maxLength={200} style={{ direction: "rtl" }} /></Field>
        <Field label="Subtitle (English)"><TextInput value={v.subtitle_en} onChange={(e) => set("subtitle_en", e.target.value)} disabled={locked} maxLength={300} /></Field>
        <Field label="Sous-titre (Français)"><TextInput value={v.subtitle_fr} onChange={(e) => set("subtitle_fr", e.target.value)} disabled={locked} maxLength={300} /></Field>
        <Field label="العنوان الفرعي (العربية)"><TextInput value={v.subtitle_ar} onChange={(e) => set("subtitle_ar", e.target.value)} disabled={locked} maxLength={300} style={{ direction: "rtl" }} /></Field>
        <Field label="Birth year"><TextInput type="number" value={v.birth_year} onChange={(e) => set("birth_year", e.target.value)} disabled={locked} /></Field>
        <Field label="Death year"><TextInput type="number" value={v.death_year} onChange={(e) => set("death_year", e.target.value)} disabled={locked} /></Field>
        <Field label="Birth date (text)"><TextInput value={v.birth_date_text} onChange={(e) => set("birth_date_text", e.target.value)} disabled={locked} maxLength={120} /></Field>
        <Field label="Death date (text)"><TextInput value={v.death_date_text} onChange={(e) => set("death_date_text", e.target.value)} disabled={locked} maxLength={120} /></Field>
        <Field label="Birthplace (English)"><TextInput value={v.birthplace_text_en} onChange={(e) => set("birthplace_text_en", e.target.value)} disabled={locked} maxLength={200} /></Field>
        <Field label="Lieu de naissance (Français)"><TextInput value={v.birthplace_text_fr} onChange={(e) => set("birthplace_text_fr", e.target.value)} disabled={locked} maxLength={200} /></Field>
        <Field label="مسقط الرأس (العربية)"><TextInput value={v.birthplace_text_ar} onChange={(e) => set("birthplace_text_ar", e.target.value)} disabled={locked} maxLength={200} style={{ direction: "rtl" }} /></Field>
      </div>
      {!locked && <SaveBar dirty={dirty} busy={busy} onSave={save} />}
    </SectionCard>
  );
}

// ---------------- Narrative tab (English long-form) -------------------

function NarrativeTab({ detail, locked, onReload }: { detail: FigureDraftDetail; locked: boolean; onReload: () => Promise<void> }) {
  const d = detail.draft;
  const [v, setV] = useState({ summary_en: d.summary_en ?? "", biography_en: d.biography_en ?? "" });
  const [dirty, setDirty] = useState(false); const [busy, setBusy] = useState(false); const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof v, val: string) => { setV((s) => ({ ...s, [k]: val })); setDirty(true); };
  async function save() {
    setBusy(true); setErr(null);
    try {
      await updateFigureDraft({ data: { id: d.id, scope: "narrative" as UpdateScope,
        payload: { summary_en: v.summary_en || null, biography_en: v.biography_en || null } } });
      await onReload(); setDirty(false);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  return (
    <SectionCard title="Narrative (English)" subtitle="Authoritative English summary and biography. Translators work in the Translation tab from these.">
      {err && <div role="alert" style={{ color: "#a03030", marginBottom: 10 }}>{err}</div>}
      {locked && <div style={{ marginBottom: 10, fontSize: 12, color: "var(--cp-ink-soft)" }}>Approved drafts cannot be edited. Archive and reopen to make changes.</div>}
      <div style={{ display: "grid", gap: 12 }}>
        <Field label={`Summary (${v.summary_en.length}/2000)`}>
          <TextArea rows={4} value={v.summary_en} onChange={(e) => set("summary_en", e.target.value)} disabled={locked} maxLength={2000} />
        </Field>
        <Field label={`Biography (${v.biography_en.length}/50 000)`}>
          <TextArea rows={16} value={v.biography_en} onChange={(e) => set("biography_en", e.target.value)} disabled={locked} maxLength={50_000} />
        </Field>
      </div>
      {!locked && <SaveBar dirty={dirty} busy={busy} onSave={save} />}
    </SectionCard>
  );
}

// ---------------- Historical Context tab (relationships) --------------

function HistoricalTab({ detail, locked, onReload }: { detail: FigureDraftDetail; locked: boolean; onReload: () => Promise<void> }) {
  return (
    <>
      <RelationSection kind="era" detail={detail} locked={locked} onReload={onReload} />
      <RelationSection kind="region" detail={detail} locked={locked} onReload={onReload} />
      <RelationSection kind="theme" detail={detail} locked={locked} onReload={onReload} />
      <RelationSection kind="related_figure" detail={detail} locked={locked} onReload={onReload} />
    </>
  );
}

function RelationSection({ kind, detail, locked, onReload }: { kind: RelationKind; detail: FigureDraftDetail; locked: boolean; onReload: () => Promise<void> }) {
  const options = useMemo(() => {
    switch (kind) {
      case "era": return eraOptions();
      case "region": return regionOptions();
      case "theme": return themeOptions();
      case "related_figure": return figureOptions();
    }
  }, [kind]);
  const items = useMemo(() => {
    switch (kind) {
      case "era": return detail.eras.map((r) => ({ id: r.id, ref_id: r.era_id, label: r.era_label }));
      case "region": return detail.regions.map((r) => ({ id: r.id, ref_id: r.region_id, label: r.region_label }));
      case "theme": return detail.themes.map((r) => ({ id: r.id, ref_id: r.theme_id, label: r.theme_label }));
      case "related_figure": return detail.relatedFigures.map((r) => ({ id: r.id, ref_id: r.related_figure_id, label: r.related_figure_label, note: r.relationship_note, type: r.relationship_type }));
    }
  }, [kind, detail]);
  const [pick, setPick] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const usedIds = new Set(items.map((i) => i.ref_id));
  const available = options.filter((o) => !usedIds.has(o.id));

  async function add() {
    if (!pick) return;
    const opt = options.find((o) => o.id === pick);
    if (!opt) return;
    setBusy(true); setErr(null);
    try {
      await addFigureDraftRelation({ data: {
        draft_id: detail.draft.id, kind, ref_id: opt.id, label: opt.label,
        relationship_type: kind === "related_figure" ? (type || undefined) : undefined,
        relationship_note: kind === "related_figure" ? (note || undefined) : undefined,
      } });
      setPick(""); setNote(""); setType("");
      await onReload();
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  async function remove(ref_id: string) {
    setBusy(true); setErr(null);
    try {
      await removeFigureDraftRelation({ data: { draft_id: detail.draft.id, kind, ref_id } });
      await onReload();
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }

  return (
    <SectionCard title={RELATION_KIND_LABEL[kind]} subtitle={`Structured link to the typed museum inventory. Free-text IDs are rejected.`}>
      {err && <div role="alert" style={{ color: "#a03030", marginBottom: 8, fontSize: 12 }}>{err}</div>}
      {items.length === 0 && <div style={{ fontSize: 12, color: "var(--cp-ink-soft)", marginBottom: 8 }}>None linked.</div>}
      {items.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "grid", gap: 6 }}>
          {items.map((it) => (
            <li key={it.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
              <div>
                <strong>{it.label}</strong> <code style={{ fontSize: 11, opacity: 0.7 }}>{it.ref_id}</code>
                {"type" in it && it.type ? <span style={{ fontSize: 11, marginLeft: 8, color: "var(--cp-ink-soft)" }}>· {String(it.type)}</span> : null}
                {"note" in it && it.note ? <div style={{ fontSize: 11, color: "var(--cp-ink-soft)", marginTop: 2 }}>{String(it.note)}</div> : null}
              </div>
              {!locked && (
                <button type="button" onClick={() => remove(it.ref_id)} disabled={busy}
                  style={{ padding: "3px 10px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {!locked && (
        <div className="cp-row" style={{ gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
          <Field label={`Add ${RELATION_KIND_LABEL[kind].toLowerCase()}`}>
            <select value={pick} onChange={(e) => setPick(e.target.value)} disabled={busy || available.length === 0}
              style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, minWidth: 220 }}>
              <option value="">Select…</option>
              {available.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </Field>
          {kind === "related_figure" && (
            <>
              <Field label="Relationship type"><TextInput value={type} onChange={(e) => setType(e.target.value)} maxLength={80} placeholder="e.g. mentor, ally, contemporary" /></Field>
              <Field label="Note"><TextInput value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} placeholder="Brief context" /></Field>
            </>
          )}
          <button type="button" onClick={add} disabled={busy || !pick}
            style={{ padding: "8px 14px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            Add
          </button>
        </div>
      )}
    </SectionCard>
  );
}

// ---------------- Research tab (source counts + link to Library) ------

function ResearchTab({ detail, sources }: { detail: FigureDraftDetail; sources: EditorSourceRow[] }) {
  const verified = sources.filter((s) => s.source?.status === "verified");
  const drafts = sources.filter((s) => s.source?.status === "draft");
  const archived = sources.filter((s) => s.source?.status === "archived");
  const contentKey = { content_type: "figure_draft", content_id: detail.draft.id };
  return (
    <SectionCard title="Research sources" subtitle="Reuses the existing Research Library. Link, unlink, and open sources there.">
      <div className="cp-row" style={{ gap: 12, flexWrap: "wrap", fontSize: 13, marginBottom: 12 }}>
        <div><StatusPill tone="info">{sources.length} linked</StatusPill></div>
        <div><StatusPill tone="ok">{verified.length} verified</StatusPill></div>
        <div><StatusPill tone="warn">{drafts.length} draft</StatusPill></div>
        <div><StatusPill tone="muted">{archived.length} archived</StatusPill></div>
      </div>
      {sources.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--cp-ink-soft)" }}>
          No sources linked yet. Open the <Link to="/curator/sources">Research Library</Link>, find or create a source,
          then use its <em>Link to content</em> action and choose <code>figure_draft</code>
          {" · "}<code>{contentKey.content_id}</code>.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
          {sources.map(({ link, source }) => (
            <li key={link.id} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div>
                <strong>{source?.title ?? "(missing source)"}</strong>
                {source?.author && <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>{source.author}</div>}
                {source && (
                  <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>
                    Status: {source.status} · Reliability: {source.reliability_tier}
                  </div>
                )}
              </div>
              {source && (
                <Link to="/curator/sources/$sourceId" params={{ sourceId: source.id }}
                  style={{ alignSelf: "center", fontSize: 12, textDecoration: "underline" }}>
                  Open in Library
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

// ---------------- Translation tab ------------------------------------

function TranslationTab({ detail, locked, onReload }: { detail: FigureDraftDetail; locked: boolean; onReload: () => Promise<void> }) {
  const d = detail.draft;
  const [v, setV] = useState({
    summary_fr: d.summary_fr ?? "", summary_ar: d.summary_ar ?? "",
    biography_fr: d.biography_fr ?? "", biography_ar: d.biography_ar ?? "",
  });
  const [dirty, setDirty] = useState(false); const [busy, setBusy] = useState(false); const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof v, val: string) => { setV((s) => ({ ...s, [k]: val })); setDirty(true); };
  async function save() {
    setBusy(true); setErr(null);
    try {
      await updateFigureDraft({ data: { id: d.id, scope: "translation" as UpdateScope, payload: {
        summary_fr: v.summary_fr || null, summary_ar: v.summary_ar || null,
        biography_fr: v.biography_fr || null, biography_ar: v.biography_ar || null,
      } } });
      await onReload(); setDirty(false);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  return (
    <SectionCard title="Translation" subtitle="French and Arabic renditions. Translators must not alter facts — request changes to the English narrative instead.">
      {err && <div role="alert" style={{ color: "#a03030", marginBottom: 10 }}>{err}</div>}
      {locked && <div style={{ marginBottom: 10, fontSize: 12, color: "var(--cp-ink-soft)" }}>Approved drafts are locked. Archive and reopen to edit.</div>}
      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Reference — English summary</h3>
            <div style={{ padding: 10, background: "#faf4e6", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, minHeight: 80, whiteSpace: "pre-wrap" }}>{d.summary_en ?? "—"}</div>
          </div>
          <div>
            <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Reference — English biography</h3>
            <div style={{ padding: 10, background: "#faf4e6", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, minHeight: 80, whiteSpace: "pre-wrap", maxHeight: 240, overflow: "auto" }}>{d.biography_en ?? "—"}</div>
          </div>
        </div>
        <Field label="Résumé (Français)"><TextArea rows={4} value={v.summary_fr} onChange={(e) => set("summary_fr", e.target.value)} disabled={locked} maxLength={2000} /></Field>
        <Field label="ملخص (العربية)"><TextArea rows={4} value={v.summary_ar} onChange={(e) => set("summary_ar", e.target.value)} disabled={locked} maxLength={2000} style={{ direction: "rtl" }} /></Field>
        <Field label="Biographie (Français)"><TextArea rows={10} value={v.biography_fr} onChange={(e) => set("biography_fr", e.target.value)} disabled={locked} maxLength={50_000} /></Field>
        <Field label="سيرة ذاتية (العربية)"><TextArea rows={10} value={v.biography_ar} onChange={(e) => set("biography_ar", e.target.value)} disabled={locked} maxLength={50_000} style={{ direction: "rtl" }} /></Field>
      </div>
      {!locked && <SaveBar dirty={dirty} busy={busy} onSave={save} />}
    </SectionCard>
  );
}

// ---------------- Review tab (workflow transitions) -------------------

function ReviewTab({ detail, roles, onReload }: { detail: FigureDraftDetail; roles: AppRole[]; onReload: () => Promise<void> }) {
  const d = detail.draft;
  const specs = TRANSITIONS[d.status] ?? [];
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function go(next: FigureDraftStatus, requireNote: boolean) {
    if (requireNote && note.trim().length === 0) { setErr("A review note is required for this action."); return; }
    setBusy(true); setErr(null);
    try {
      await transitionFigureDraft({ data: { id: d.id, next, note: note.trim() || undefined } });
      setNote(""); await onReload();
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  const permitted = specs.filter((s) => s.roles.some((r) => roles.includes(r)));

  return (
    <SectionCard title="Review & workflow" subtitle={`Current status: ${STATUS_LABEL[d.status]}`}>
      {err && <div role="alert" style={{ color: "#a03030", marginBottom: 10 }}>{err}</div>}
      {d.review_note && (
        <div style={{ marginBottom: 12, padding: 10, background: "#fdf3d4", border: "1px solid #d1a04a", borderRadius: 6, fontSize: 13 }}>
          <strong>Latest review note:</strong>
          <div style={{ marginTop: 4, whiteSpace: "pre-wrap" }}>{d.review_note}</div>
        </div>
      )}
      {permitted.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--cp-ink-soft)" }}>
          {d.status === "approved" && "This draft is approved and locked. Archive it to reopen for edits."}
          {d.status === "archived" && "This draft is archived. Restore it to resume editing."}
          {d.status !== "approved" && d.status !== "archived" && "No actions available at this stage for your current role(s)."}
        </p>
      ) : (
        <>
          <Field label="Review note (required when requesting changes)">
            <TextArea rows={4} value={note} onChange={(e) => setNote(e.target.value)} maxLength={4000} placeholder="What must be corrected or improved?" />
          </Field>
          <div className="cp-row" style={{ gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {permitted.map((s) => (
              <button key={s.next} type="button" onClick={() => go(s.next, s.requireNote)} disabled={busy}
                style={{ padding: "8px 14px", background: s.next === "approved" ? "#2c6a3b" : s.next === "changes_requested" ? "#a06020" : "#2c1e10",
                  color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </SectionCard>
  );
}

// ---------------- Revision history tab --------------------------------

function HistoryTab({ detail }: { detail: FigureDraftDetail }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <SectionCard title="Revision history" subtitle="Every material change to identity, narrative, translation, workflow, and relationships snapshots the full draft state. Snapshots cannot be deleted from the Studio.">
        {detail.revisions.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--cp-ink-soft)" }}>No revisions yet.</p>
        ) : (
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
            {detail.revisions.map((r) => (
              <li key={r.id} style={{ padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13 }}>
                <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <div>
                    <strong>Revision #{r.revision_number}</strong>
                    <span style={{ marginLeft: 8, fontSize: 11, color: "var(--cp-ink-soft)" }}>{new Date(r.created_at).toLocaleString()}</span>
                    {r.change_summary && <div style={{ fontSize: 12, marginTop: 2 }}>{r.change_summary}</div>}
                  </div>
                  <button type="button" onClick={() => setOpen(open === r.id ? null : r.id)}
                    style={{ padding: "3px 10px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                    {open === r.id ? "Hide" : "View snapshot"}
                  </button>
                </div>
                {open === r.id && (
                  <pre style={{ marginTop: 8, padding: 10, background: "#faf4e6", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 11, maxHeight: 320, overflow: "auto", whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(r.snapshot, null, 2)}
                  </pre>
                )}
              </li>
            ))}
          </ol>
        )}
      </SectionCard>

      <SectionCard title="Audit trail" subtitle="Workflow, edit, and relationship events. Also visible in the Studio Audit Log for privileged roles.">
        {detail.audit.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--cp-ink-soft)" }}>No audit events yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 4, fontSize: 12 }}>
            {detail.audit.map((e) => (
              <li key={e.id} style={{ padding: "6px 10px", borderBottom: "1px solid var(--cp-border)" }}>
                <span style={{ color: "var(--cp-ink-soft)" }}>{new Date(e.created_at).toLocaleString()}</span>
                {" — "}
                <strong>{e.action}</strong>
                {e.actor_email_snapshot && <> · {e.actor_email_snapshot}</>}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  );
}

// ---------------- Preview tab (inline) --------------------------------

function PreviewTab({ detail }: { detail: FigureDraftDetail }) {
  return (
    <SectionCard title="Private preview" subtitle="Studio-only preview. Never appears in public search. Never enters the Curator AI corpus.">
      <p style={{ fontSize: 13, marginBottom: 10 }}>
        Open the full-page private preview to review the draft as visitors would eventually see it,
        in English, French, and Arabic (with RTL). The preview URL is authenticated and blocked from
        the public site.
      </p>
      <Link to="/curator/figures/$draftId/preview" params={{ draftId: detail.draft.id }}
        style={{ display: "inline-block", padding: "8px 14px", background: "#2c1e10", color: "white", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
        Open private preview →
      </Link>
    </SectionCard>
  );
}

// Silence unused import warnings if any bundler is strict.
useEffect;
