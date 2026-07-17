import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { FigureDraftEditor, type EditorSourceRow } from "@/components/curator-portal/FigureDraftEditor";
import { SectionCard } from "@/components/curator-portal/primitives";
import {
  getFigureDraft, archiveFigureDraft, restoreFigureDraft,
  type FigureDraftDetail,
} from "@/lib/curator-portal/figure-drafts.functions";
import { listSourcesForContent } from "@/lib/curator-portal/sources.functions";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import type { AppRole } from "@/lib/curator-portal/permissions";

const READ_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "curator", "researcher",
  "fact_checker", "translator", "translation_reviewer", "educator",
];

export const Route = createFileRoute("/curator/_studio/figures/$draftId")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!roles.some((r) => READ_ROLES.includes(r))) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: FigureDraftPage,
});

function FigureDraftPage() {
  const { draftId } = Route.useParams();
  const session = useStudioSession();
  const [detail, setDetail] = useState<FigureDraftDetail | null>(null);
  const [sources, setSources] = useState<EditorSourceRow[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    try {
      const [d, s] = await Promise.all([
        getFigureDraft({ data: { id: draftId } }),
        listSourcesForContent({ data: { content_type: "figure_draft", content_id: draftId } }),
      ]);
      setDetail(d);
      setSources(s as EditorSourceRow[]);
    } catch (e) { setErr((e as Error).message); }
  }, [draftId]);

  useEffect(() => { void reload(); }, [reload]);

  async function onArchive() {
    if (!confirm("Archive this draft? It becomes read-only until restored.")) return;
    setBusy(true);
    try { await archiveFigureDraft({ data: { id: draftId } }); await reload(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }
  async function onRestore() {
    setBusy(true);
    try { await restoreFigureDraft({ data: { id: draftId } }); await reload(); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  }

  if (err) return <div role="alert" style={{ color: "#a03030" }}>{err}</div>;
  if (!detail) return <p>Loading…</p>;

  const status = detail.draft.status;
  const canArchive = session.roles.some((r) => (["museum_director", "senior_curator"] as AppRole[]).includes(r));

  return (
    <>
      <header className="cp-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 4 }}>
        <div>
          <Link to="/curator/figures" style={{ fontSize: 12, color: "var(--cp-ink-soft)", textDecoration: "none" }}>← All drafts</Link>
          <h1 className="cp-page-title" style={{ marginTop: 4 }}>Editing figure draft</h1>
        </div>
        {canArchive && (
          <div className="cp-row" style={{ gap: 8 }}>
            {status !== "archived" ? (
              <button type="button" onClick={onArchive} disabled={busy}
                style={{ padding: "6px 12px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                Archive
              </button>
            ) : (
              <button type="button" onClick={onRestore} disabled={busy}
                style={{ padding: "6px 12px", background: "#2c1e10", color: "white", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                Restore
              </button>
            )}
          </div>
        )}
      </header>
      <SectionCard title="Private draft" subtitle="This content is Studio-only. It is not indexed by public search, not included in the Curator AI corpus, and not visible outside the Studio.">
        <p style={{ fontSize: 12, color: "var(--cp-ink-soft)", margin: 0 }}>Draft ID <code>{detail.draft.id}</code></p>
      </SectionCard>
      <FigureDraftEditor detail={detail} roles={session.roles} sources={sources} onReload={reload} />
    </>
  );
}
