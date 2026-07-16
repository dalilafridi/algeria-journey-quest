import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SectionCard } from "@/components/curator-portal/primitives";
import { SourceForm, type SourceFormValues, emptySourceValues } from "@/components/curator-portal/SourceForm";
import { createSource } from "@/lib/curator-portal/sources.functions";
import { useStudioSession } from "@/components/curator-portal/StudioSessionContext";
import type { AppRole } from "@/lib/curator-portal/permissions";

const WRITE_ROLES: AppRole[] = ["museum_director", "senior_curator", "curator", "researcher", "fact_checker"];

export const Route = createFileRoute("/curator/_studio/sources/new")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!roles.some((r) => WRITE_ROLES.includes(r))) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: NewSource,
});

function NewSource() {
  const navigate = useNavigate();
  useStudioSession(); // ensures session context is present
  const [values, setValues] = useState<SourceFormValues>(emptySourceValues());
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setBusy(true); setErr(null);
    try {
      const { id } = await createSource({ data: values as never });
      navigate({ to: "/curator/sources/$sourceId", params: { sourceId: id } });
    } catch (e) { setErr((e as Error).message); setBusy(false); }
  }

  return (
    <>
      <header>
        <h1 className="cp-page-title">New source</h1>
        <p className="cp-page-sub">Catalogue a new research source. It will be saved as a draft and can be verified later by a Museum Director, Senior Curator, or Fact Checker.</p>
      </header>
      {err && <div role="alert" style={{ color: "#a03030", padding: 10, background: "#fbebe6", borderRadius: 6 }}>{err}</div>}
      <SectionCard title="Source details">
        <SourceForm values={values} onChange={setValues} disabled={busy} />
        <div className="cp-row" style={{ gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
          <button type="button" onClick={() => navigate({ to: "/curator/sources" })} disabled={busy}
            style={{ padding: "8px 16px", background: "transparent", border: "1px solid var(--cp-border)", borderRadius: 8, cursor: "pointer" }}>
            Cancel
          </button>
          <button type="button" onClick={onSubmit} disabled={busy || !values.title.trim()}
            style={{ padding: "8px 16px", background: "#2c1e10", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            {busy ? "Saving…" : "Save draft"}
          </button>
        </div>
      </SectionCard>
    </>
  );
}
