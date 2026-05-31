/**
 * CuratorNote — the museum's interpretive voice on an exhibit.
 *
 * A reflective note ("why does this matter?"), not a summary or biography.
 * Rendered as an elegant wall-text plaque so it reads like a curator speaking,
 * not a database field. Renders nothing when no note is provided.
 */

import { t, useLang, type LocalizedString } from "@/lib/i18n";

const LABEL: LocalizedString = { en: "Curator's Note", fr: "Note du conservateur", ar: "ملاحظة القيّم" };

export function CuratorNote({
  note,
  className,
}: {
  note?: LocalizedString;
  className?: string;
}) {
  const lang = useLang();
  if (!note) return null;

  return (
    <aside
      aria-label={t(LABEL, lang)}
      className={`relative rounded-2xl border p-5 sm:p-6 overflow-hidden ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 30%, var(--border))",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--brand-gold) 9%, var(--card)), var(--card))",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 start-0 w-1"
        style={{ background: "color-mix(in oklab, var(--brand-gold-deep) 70%, transparent)" }}
      />
      <div className="flex items-center gap-2 mb-2.5">
        <span aria-hidden style={{ color: "var(--brand-gold-deep)" }}>
          ❝
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {t(LABEL, lang)}
        </span>
      </div>
      <p
        className="text-[15px] sm:text-base leading-relaxed text-foreground/90 italic"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {t(note, lang)}
      </p>
    </aside>
  );
}

export default CuratorNote;
