/**
 * ContentPicker — searchable picker for public museum content records.
 *
 * Reads the read-only inventory derived from the TypeScript museum data.
 * Only used inside the Studio (behind the auth gate). Does not mutate
 * public content — it only returns { content_type, content_id, label,
 * public_route } for the caller to persist into source_links.
 */
import { useMemo, useState } from "react";
import { getInventory } from "@/lib/curator-portal/inventory";
import type { ContentKind, ContentRecord } from "@/lib/curator-portal/models";

const KIND_LABEL: Record<ContentKind, string> = {
  era: "Era",
  figure: "Figure",
  region: "Region",
  culture: "Culture",
  cuisine: "Cuisine",
  cinema: "Cinema",
  football: "Football",
  club: "Club Museum",
  "match-theater": "Match Theater",
  "on-this-day": "On This Day",
  "did-you-know": "Did You Know",
  lesson: "Lesson",
  word: "Word",
  journey: "Journey",
  quiz: "Quiz",
};

export interface PickedContent {
  content_type: ContentKind;
  content_id: string;
  content_label: string;
  public_route?: string;
}

export function ContentPicker({
  onPick,
  disabled,
}: {
  onPick: (picked: PickedContent) => void | Promise<void>;
  disabled?: boolean;
}) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<ContentKind | "all">("all");
  const inv = useMemo(() => getInventory(), []);
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return inv
      .filter((r) => (kind === "all" ? true : r.kind === kind))
      .filter((r) => (needle ? r.titleEn.toLowerCase().includes(needle) : true))
      .slice(0, 40);
  }, [inv, kind, q]);

  return (
    <div style={{ border: "1px solid var(--cp-border)", borderRadius: 8, padding: 12 }}>
      <div className="cp-row" style={{ gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <input
          type="search"
          placeholder="Search museum records…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={disabled}
          style={{ flex: "1 1 220px", padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6 }}
        />
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as ContentKind | "all")}
          disabled={disabled}
          style={{ padding: "6px 8px", border: "1px solid var(--cp-border)", borderRadius: 6 }}
        >
          <option value="all">All kinds</option>
          {Object.entries(KIND_LABEL).map(([k, l]) => (
            <option key={k} value={k}>{l}</option>
          ))}
        </select>
      </div>
      <div style={{ maxHeight: 260, overflow: "auto", border: "1px solid var(--cp-border)", borderRadius: 6 }}>
        {results.length === 0 && (
          <div className="cp-muted" style={{ padding: 12, fontSize: 13 }}>No matches.</div>
        )}
        {results.map((r: ContentRecord) => (
          <div
            key={`${r.kind}-${r.id}`}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              gap: 10, padding: "6px 10px", borderBottom: "1px solid var(--cp-border-soft, #eee)", fontSize: 13,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.titleEn}</div>
              <div style={{ color: "var(--cp-muted)", fontSize: 11 }}>
                {KIND_LABEL[r.kind]} · <code>{r.id}</code>
              </div>
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onPick({
                content_type: r.kind,
                content_id: r.id,
                content_label: r.titleEn,
                public_route: r.href,
              })}
              style={{
                padding: "3px 10px", background: "#2c1e10", color: "white",
                border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer",
              }}
            >Link</button>
          </div>
        ))}
      </div>
    </div>
  );
}
