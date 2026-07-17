import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FigureDraftPreview } from "@/components/curator-portal/FigureDraftPreview";
import { getFigureDraft, type FigureDraftDetail } from "@/lib/curator-portal/figure-drafts.functions";
import type { AppRole } from "@/lib/curator-portal/permissions";

const READ_ROLES: AppRole[] = [
  "museum_director", "senior_curator", "curator", "researcher",
  "fact_checker", "translator", "translation_reviewer", "educator",
];

export const Route = createFileRoute("/curator/_studio/figures/$draftId/preview")({
  beforeLoad: ({ context }) => {
    const roles = (context as { studioSession?: { roles: AppRole[] } }).studioSession?.roles ?? [];
    if (!roles.some((r) => READ_ROLES.includes(r))) {
      throw redirect({ to: "/curator/access-denied" });
    }
  },
  component: FigureDraftPreviewPage,
});

function FigureDraftPreviewPage() {
  const { draftId } = Route.useParams();
  const [detail, setDetail] = useState<FigureDraftDetail | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    void (async () => {
      try { setDetail(await getFigureDraft({ data: { id: draftId } })); }
      catch (e) { setErr((e as Error).message); }
    })();
  }, [draftId]);
  if (err) return <div role="alert" style={{ color: "#a03030" }}>{err}</div>;
  if (!detail) return <p>Loading…</p>;
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <Link to="/curator/figures/$draftId" params={{ draftId }} style={{ fontSize: 12, textDecoration: "none" }}>
          ← Back to editor
        </Link>
      </div>
      <FigureDraftPreview detail={detail} />
    </>
  );
}
