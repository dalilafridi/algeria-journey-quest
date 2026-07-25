/**
 * Cite — inline citation marker (superscript number).
 *
 * Renders as a small clickable superscript. Clicking opens the exhibit's
 * Sources panel and highlights the referenced source. Fully accessible:
 * <button> semantics, keyboard focusable, screen reader label reads
 * "Source N: <title>". Numbering is assigned per-page via <CiteScope>.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getSource } from "@/data/provenance/sources";
import { getExhibitProvenance } from "@/data/provenance/registry";
import { openProvenance } from "@/components/provenance/ExhibitProvenance";
import { t, useLang } from "@/lib/i18n";

type CiteContextValue = {
  exhibitId: string;
  numbering: Map<string, number>;
};

const CiteContext = createContext<CiteContextValue | null>(null);

/**
 * Provides a stable numbering scope for <Cite/> markers on a single exhibit.
 * Numbers follow the order of `sourceIds` in the exhibit's provenance record.
 */
export function CiteScope({ exhibitId, children }: { exhibitId: string; children: ReactNode }) {
  const value = useMemo<CiteContextValue>(() => {
    const rec = getExhibitProvenance(exhibitId);
    const numbering = new Map<string, number>();
    if (rec) {
      const ordered = [...rec.sourceIds, ...(rec.furtherReadingIds ?? [])];
      ordered.forEach((id, i) => numbering.set(id, i + 1));
    }
    return { exhibitId, numbering };
  }, [exhibitId]);
  return <CiteContext.Provider value={value}>{children}</CiteContext.Provider>;
}

export function Cite({ id }: { id: string }) {
  const ctx = useContext(CiteContext);
  const lang = useLang();
  const source = getSource(id);
  const n = ctx?.numbering.get(id);
  const label = source ? t(source.title, lang) : id;
  const exhibitId = ctx?.exhibitId;

  return (
    <button
      type="button"
      onClick={() => exhibitId && openProvenance(exhibitId, id)}
      className="align-super mx-0.5 inline-flex items-center justify-center rounded-sm px-1 py-0 text-[10px] font-bold leading-none hover:underline focus:outline-none focus-visible:ring-2"
      style={{
        color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
        minWidth: 14,
      }}
      aria-label={`Source ${n ?? ""}: ${label}`}
      title={label}
    >
      {n ?? "•"}
    </button>
  );
}

export default Cite;
