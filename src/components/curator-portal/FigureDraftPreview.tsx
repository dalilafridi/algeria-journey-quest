/**
 * FigureDraftPreview — Studio-only, trilingual, RTL-aware.
 *
 * Reuses the museum's parchment styling via the .cp-card / .cp-page-*
 * classes but does not import public public-figure components (those
 * are tightly coupled to the Figure type in src/data/figures.ts).
 *
 * SECURITY: This component is rendered ONLY inside the /curator/_studio
 * subtree, which is gated by the getStudioSession beforeLoad. It is
 * never linked from public pages and never fetched during SSR of the
 * public site.
 */
import { useState } from "react";
import type { FigureDraftDetail } from "@/lib/curator-portal/figure-drafts.functions";
import { STATUS_LABEL } from "@/lib/curator-portal/figure-drafts.functions";
import { RELATION_KIND_LABEL } from "@/lib/curator-portal/taxonomies";

type Lang = "en" | "fr" | "ar";
const LANG_LABEL: Record<Lang, string> = { en: "English", fr: "Français", ar: "العربية" };

export function FigureDraftPreview({ detail }: { detail: FigureDraftDetail }) {
  const [lang, setLang] = useState<Lang>("en");
  const d = detail.draft;
  const rtl = lang === "ar";
  const name = lang === "fr" ? (d.name_fr ?? d.name_en)
    : lang === "ar" ? (d.name_ar ?? d.name_en)
    : d.name_en;
  const subtitle = lang === "fr" ? d.subtitle_fr
    : lang === "ar" ? d.subtitle_ar
    : d.subtitle_en;
  const summary = lang === "fr" ? d.summary_fr
    : lang === "ar" ? d.summary_ar
    : d.summary_en;
  const biography = lang === "fr" ? d.biography_fr
    : lang === "ar" ? d.biography_ar
    : d.biography_en;
  const birthplace = lang === "fr" ? d.birthplace_text_fr
    : lang === "ar" ? d.birthplace_text_ar
    : d.birthplace_text_en;
  const dates = [d.birth_date_text ?? (d.birth_year != null ? String(d.birth_year) : null),
                 d.death_date_text ?? (d.death_year != null ? String(d.death_year) : null)]
    .filter(Boolean).join(" – ");

  return (
    <article
      dir={rtl ? "rtl" : "ltr"}
      style={{ display: "grid", gap: 20 }}
    >
      <div role="alert" style={{ padding: "8px 12px", background: "#2c1e10", color: "#faf4e6", borderRadius: 8, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", textAlign: "center", direction: "ltr" }}>
        Private Draft Preview · Studio-only · Not indexed · Not in Curator AI corpus
      </div>

      <div className="cp-row" style={{ gap: 8, justifyContent: "center", direction: "ltr" }}>
        {(["en", "fr", "ar"] as Lang[]).map((l) => (
          <button key={l} type="button" onClick={() => setLang(l)}
            aria-pressed={lang === l}
            style={{ padding: "6px 14px", borderRadius: 999, border: "1px solid var(--cp-border)",
              background: lang === l ? "#2c1e10" : "transparent",
              color: lang === l ? "white" : "var(--cp-ink)", cursor: "pointer", fontSize: 13 }}>
            {LANG_LABEL[l]}
          </button>
        ))}
      </div>

      <header style={{ textAlign: "center", padding: "24px 12px", background: "#faf4e6", border: "1px solid var(--cp-border)", borderRadius: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--cp-ink-soft)" }}>
          {STATUS_LABEL[d.status]}
        </div>
        <h1 style={{ fontSize: 34, margin: "8px 0 4px", fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>{name}</h1>
        {subtitle && <p style={{ fontSize: 15, color: "var(--cp-ink-soft)", margin: 0 }}>{subtitle}</p>}
        {(dates || birthplace) && (
          <p style={{ fontSize: 13, color: "var(--cp-ink-soft)", marginTop: 8 }}>
            {dates}{dates && birthplace ? " · " : ""}{birthplace}
          </p>
        )}
      </header>

      {summary && (
        <section style={{ padding: 18, background: "white", border: "1px solid var(--cp-border)", borderRadius: 10 }}>
          <p style={{ fontSize: 16, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>{summary}</p>
        </section>
      )}

      {biography && (
        <section style={{ padding: 20, background: "white", border: "1px solid var(--cp-border)", borderRadius: 10 }}>
          <h2 style={{ fontSize: 20, marginTop: 0, fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
            {lang === "fr" ? "Biographie" : lang === "ar" ? "سيرة ذاتية" : "Biography"}
          </h2>
          <div style={{ fontSize: 14.5, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{biography}</div>
        </section>
      )}

      <section style={{ padding: 18, background: "white", border: "1px solid var(--cp-border)", borderRadius: 10, direction: "ltr" }}>
        <h2 style={{ fontSize: 18, marginTop: 0 }}>Historical context</h2>
        <RelBlock label={RELATION_KIND_LABEL.era} items={detail.eras.map((r) => r.era_label)} />
        <RelBlock label={RELATION_KIND_LABEL.region} items={detail.regions.map((r) => r.region_label)} />
        <RelBlock label={RELATION_KIND_LABEL.theme} items={detail.themes.map((r) => r.theme_label)} />
        <RelBlock label={RELATION_KIND_LABEL.related_figure} items={detail.relatedFigures.map((r) => r.related_figure_label)} />
      </section>

      <footer style={{ padding: 12, textAlign: "center", fontSize: 11, color: "var(--cp-ink-soft)" }}>
        Draft ID: <code>{d.id}</code> · Revision count: {detail.revisions.length}
      </footer>
    </article>
  );
}

function RelBlock({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ marginBottom: 8, fontSize: 13 }}>
      <strong>{label}: </strong>
      {items.join(" · ")}
    </div>
  );
}
