/**
 * TranslationField — reusable trilingual editorial field with AI-assist.
 *
 * Content-type agnostic. Mounted today only inside Historical Figures
 * (Slice B), but the API is deliberately generic so it can be dropped into
 * future editors (Events, Eras, Regions, Cuisine, Culture, Football) without
 * change.
 *
 * Governance model (per editorial spec):
 *   Missing        — no value stored
 *   AI Suggestion  — machine-drafted, awaiting curator review
 *   Reviewed       — curator has read and endorsed the translation
 *   Approved       — elevated editorial roles have signed off
 *
 * Protected fields (names, titles, canonical historical terms):
 *   AI never overwrites the current value. Suggestions render side-by-side
 *   with explicit Accept / Keep existing / Edit manually controls.
 *
 * All persistence flows through the caller's onSaveValue / onSetStatus
 * closures — the component never writes to the database or the AI gateway
 * directly. This preserves audit, permissions, and validation upstream.
 */

import { useEffect, useRef, useState } from "react";
import type { TranslationState } from "@/lib/curator-portal/translation.functions";
import { TRANSLATION_STATE_LABEL } from "@/lib/curator-portal/translation.functions";

export type TranslationFieldKind = "short" | "long" | "name";

const BADGE_STYLE: Record<TranslationState, { bg: string; fg: string }> = {
  missing: { bg: "#f2eadf", fg: "#7a5a10" },
  machine: { bg: "#e6dcf5", fg: "#4b2b7a" },
  human_edited: { bg: "#e6dcf5", fg: "#4b2b7a" },
  reviewed: { bg: "#e6efd8", fg: "#3a5a1e" },
  approved: { bg: "#d8ecd0", fg: "#1e4a1e" },
};

function StatusBadge({ state }: { state: TranslationState }) {
  const s = BADGE_STYLE[state];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.3,
        textTransform: "uppercase",
        background: s.bg,
        color: s.fg,
      }}
    >
      {TRANSLATION_STATE_LABEL[state]}
    </span>
  );
}

const BTN_BASE: React.CSSProperties = {
  padding: "5px 10px",
  fontSize: 12,
  fontWeight: 600,
  borderRadius: 6,
  cursor: "pointer",
  border: "1px solid var(--cp-border)",
  background: "white",
  color: "var(--cp-ink)",
};
const BTN_PRIMARY: React.CSSProperties = { ...BTN_BASE, background: "#2c1e10", color: "white", border: "none" };
const BTN_SUCCESS: React.CSSProperties = { ...BTN_BASE, background: "#2c6a3b", color: "white", border: "none" };
const BTN_GOLD: React.CSSProperties = { ...BTN_BASE, background: "#7a5a10", color: "white", border: "none" };

export interface TranslationFieldProps {
  label: string;
  language: "fr" | "ar";
  kind: TranslationFieldKind;
  /** English (or source-language) reference for the curator to translate from. */
  sourceText: string;
  /** Current persisted value. */
  currentValue: string;
  /** True when the field is a canonical name/title that must never be overwritten silently. */
  isProtected?: boolean;
  status: TranslationState;
  /** True when the current user is entitled to mark this translation Approved. */
  canApprove: boolean;
  /** True when editing is disabled (draft is locked, approved, or archived). */
  disabled?: boolean;
  /** Fetch a machine translation for this single field. Returns the suggested text. */
  onSuggest: () => Promise<string>;
  /** Persist a new value for this field. Routes through the content type's save RPC. */
  onSaveValue: (value: string) => Promise<void>;
  /** Update the translation status (Missing → AI Suggestion → Reviewed → Approved). */
  onSetStatus: (next: TranslationState) => Promise<void>;
}

export function TranslationField(props: TranslationFieldProps) {
  const {
    label, language, kind, sourceText, currentValue, isProtected,
    status, canApprove, disabled, onSuggest, onSaveValue, onSetStatus,
  } = props;

  const [value, setValue] = useState(currentValue);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "suggest" | "save" | "accept" | "review" | "approve" | "revert">(null);
  const [err, setErr] = useState<string | null>(null);
  const [wasFromSuggestion, setWasFromSuggestion] = useState(false);

  const rtl = language === "ar";
  const dirty = value !== currentValue;
  const isLong = kind === "long";
  const hasContent = value.trim().length > 0;

  // Sync when parent reloads.
  if (currentValue !== value && busy === null && !dirty && !suggestion) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }

  async function handleSuggest() {
    if (disabled) return;
    setBusy("suggest"); setErr(null);
    try {
      const text = await onSuggest();
      if (!text) throw new Error("The translation service did not return any text.");
      if (isProtected) {
        setSuggestion(text);
      } else {
        setValue(text);
        setWasFromSuggestion(true);
      }
    } catch (e) {
      setErr((e as Error).message);
    } finally { setBusy(null); }
  }

  async function handleSave(fromSuggestion: boolean) {
    if (disabled) return;
    setBusy(fromSuggestion ? "accept" : "save"); setErr(null);
    const previous = currentValue;
    try {
      const toSave = fromSuggestion && suggestion != null ? suggestion : value;
      await onSaveValue(toSave);
      // On success, always set status to AI Suggestion — reviewer must
      // explicitly advance it. Never auto-promote to Reviewed / Approved.
      await onSetStatus("machine");
      setValue(toSave);
      setSuggestion(null);
      setWasFromSuggestion(false);
    } catch (e) {
      // Preserve the user's in-progress edit on failure.
      setValue((v) => (previous && !v ? previous : v));
      setErr((e as Error).message);
    } finally { setBusy(null); }
  }

  async function handleSaveEdit() {
    if (disabled) return;
    setBusy("save"); setErr(null);
    try {
      await onSaveValue(value);
      // Manual save from user typing → human_edited (still not reviewed).
      await onSetStatus(wasFromSuggestion ? "machine" : "human_edited");
      setWasFromSuggestion(false);
    } catch (e) {
      setErr((e as Error).message);
    } finally { setBusy(null); }
  }

  async function handleStatus(next: TranslationState) {
    if (disabled) return;
    setBusy(next === "approved" ? "approve" : next === "reviewed" ? "review" : "revert");
    setErr(null);
    try { await onSetStatus(next); } catch (e) { setErr((e as Error).message); }
    finally { setBusy(null); }
  }

  const canMarkReviewed = hasContent && (status === "machine" || status === "human_edited");
  const canMarkApproved = canApprove && hasContent && (status === "reviewed" || status === "machine" || status === "human_edited");
  const canRevert = status === "reviewed" || status === "approved";

  return (
    <div
      style={{
        border: "1px solid var(--cp-border)",
        borderRadius: 8,
        padding: 12,
        background: "white",
        display: "grid",
        gap: 10,
      }}
    >
      <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <strong style={{ fontSize: 13 }}>{label}</strong>
          <StatusBadge state={status} />
          {isProtected && (
            <span
              title="Protected: AI suggestions are shown side-by-side and never overwrite the current value automatically."
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: "#7a5a10" }}
            >
              🛡 Protected
            </span>
          )}
        </div>
        <div className="cp-row" style={{ gap: 6, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleSuggest}
            disabled={disabled || busy !== null || sourceText.trim().length === 0}
            style={BTN_BASE}
          >
            {busy === "suggest" ? "Suggesting…" : "Suggest translation"}
          </button>
        </div>
      </div>

      {sourceText.trim().length === 0 ? (
        <p style={{ fontSize: 12, color: "var(--cp-ink-soft)", margin: 0 }}>
          Add the English source first — then AI can suggest a {language === "fr" ? "French" : "Arabic"} translation.
        </p>
      ) : null}

      {isProtected ? (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>Current value</div>
          {kind === "long" ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={3}
              disabled={disabled || busy !== null}
              maxLength={2000}
              style={{
                padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6,
                fontSize: 13, fontFamily: "inherit", resize: "vertical",
                direction: rtl ? "rtl" : "ltr",
                background: disabled ? "#f7f1e5" : "white",
              }}
            />
          ) : (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled || busy !== null}
              maxLength={300}
              style={{
                padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13,
                direction: rtl ? "rtl" : "ltr",
                background: disabled ? "#f7f1e5" : "white",
              }}
            />
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 6 }}>
          {isLong ? (
            <textarea
              value={value}
              onChange={(e) => { setValue(e.target.value); if (wasFromSuggestion) setWasFromSuggestion(false); }}
              rows={8}
              disabled={disabled || busy !== null}
              maxLength={50_000}
              style={{
                padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6,
                fontSize: 13, fontFamily: "inherit", resize: "vertical",
                direction: rtl ? "rtl" : "ltr",
                background: disabled ? "#f7f1e5" : "white",
              }}
            />
          ) : (
            <textarea
              value={value}
              onChange={(e) => { setValue(e.target.value); if (wasFromSuggestion) setWasFromSuggestion(false); }}
              rows={3}
              disabled={disabled || busy !== null}
              maxLength={2000}
              style={{
                padding: "8px 10px", border: "1px solid var(--cp-border)", borderRadius: 6,
                fontSize: 13, fontFamily: "inherit", resize: "vertical",
                direction: rtl ? "rtl" : "ltr",
                background: disabled ? "#f7f1e5" : "white",
              }}
            />
          )}
          {wasFromSuggestion && (
            <div style={{ fontSize: 11, color: "#4b2b7a", background: "#f2ecfa", padding: "4px 8px", borderRadius: 4 }}>
              This text is an AI suggestion. Save to record it, then review or approve.
            </div>
          )}
        </div>
      )}

      {isProtected && suggestion !== null && (
        <div
          role="region"
          aria-label="AI suggestion side-by-side"
          style={{
            border: "1px dashed #4b2b7a", background: "#f7f2fc", borderRadius: 6, padding: 10,
            display: "grid", gap: 6,
          }}
        >
          <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: 12, color: "#4b2b7a" }}>AI suggestion (not applied)</strong>
            <div className="cp-row" style={{ gap: 6 }}>
              <button type="button" onClick={() => handleSave(true)} disabled={busy !== null} style={BTN_PRIMARY}>
                {busy === "accept" ? "Accepting…" : "Accept suggestion"}
              </button>
              <button type="button" onClick={() => setSuggestion(null)} disabled={busy !== null} style={BTN_BASE}>
                Keep existing
              </button>
            </div>
          </div>
          <div
            style={{
              padding: 8, background: "white", border: "1px solid var(--cp-border)", borderRadius: 4,
              fontSize: 13, whiteSpace: "pre-wrap",
              direction: rtl ? "rtl" : "ltr",
            }}
          >
            {suggestion}
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "var(--cp-ink-soft)" }}>
            Accepting replaces the current value and marks the field as an AI Suggestion. You can also edit the
            current value manually below without accepting.
          </p>
        </div>
      )}

      {err && (
        <div role="alert" style={{ fontSize: 12, color: "#a03030", background: "#fbebe6", padding: "6px 10px", borderRadius: 4 }}>
          {err}
        </div>
      )}

      <div className="cp-row" style={{ justifyContent: "space-between", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: "var(--cp-ink-soft)" }}>
          {dirty ? "Unsaved changes" : status === "missing" ? "No translation on record." : "Saved."}
        </div>
        <div className="cp-row" style={{ gap: 6, flexWrap: "wrap" }}>
          {dirty && (
            <button
              type="button"
              onClick={handleSaveEdit}
              disabled={disabled || busy !== null}
              style={BTN_PRIMARY}
            >
              {busy === "save" ? "Saving…" : "Save changes"}
            </button>
          )}
          {canMarkReviewed && (
            <button type="button" onClick={() => handleStatus("reviewed")} disabled={disabled || busy !== null || dirty} style={BTN_SUCCESS} title={dirty ? "Save your edits first" : ""}>
              {busy === "review" ? "Marking…" : "Mark reviewed"}
            </button>
          )}
          {canMarkApproved && (
            <button type="button" onClick={() => handleStatus("approved")} disabled={disabled || busy !== null || dirty} style={BTN_GOLD} title={dirty ? "Save your edits first" : ""}>
              {busy === "approve" ? "Approving…" : "Mark approved"}
            </button>
          )}
          {canRevert && (
            <button type="button" onClick={() => handleStatus(hasContent ? "human_edited" : "missing")} disabled={disabled || busy !== null} style={BTN_BASE}>
              Revert to draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
