/**
 * SourceForm — reusable structured editor for a source record.
 * Grouped: Identification, Location, Evaluation, Rights, Citation.
 * Purely presentational; parent owns submit behaviour.
 */
import {
  RELIABILITY_LABEL, RELIABILITY_TIERS, RIGHTS_LABEL, RIGHTS_STATUSES,
  SOURCE_TYPES, SOURCE_TYPE_LABEL,
  type ReliabilityTier, type RightsStatus, type SourceRow, type SourceType,
} from "@/lib/curator-portal/sources.functions";

export interface SourceFormValues {
  title: string;
  author: string;
  publisher: string;
  publication_date: string;
  publication_year: string;
  source_type: SourceType;
  language: string;
  url: string;
  isbn: string;
  archive_or_institution: string;
  identifier: string;
  accessed_date: string;
  reliability_tier: ReliabilityTier;
  rights_status: RightsStatus;
  citation_text: string;
  notes: string;
}

export function emptySourceValues(): SourceFormValues {
  return {
    title: "", author: "", publisher: "", publication_date: "", publication_year: "",
    source_type: "other", language: "", url: "", isbn: "",
    archive_or_institution: "", identifier: "", accessed_date: "",
    reliability_tier: "unverified", rights_status: "unknown",
    citation_text: "", notes: "",
  };
}

export function sourceRowToValues(r: SourceRow): SourceFormValues {
  return {
    title: r.title,
    author: r.author ?? "",
    publisher: r.publisher ?? "",
    publication_date: r.publication_date ?? "",
    publication_year: r.publication_year != null ? String(r.publication_year) : "",
    source_type: r.source_type,
    language: r.language ?? "",
    url: r.url ?? "",
    isbn: r.isbn ?? "",
    archive_or_institution: r.archive_or_institution ?? "",
    identifier: r.identifier ?? "",
    accessed_date: r.accessed_date ?? "",
    reliability_tier: r.reliability_tier,
    rights_status: r.rights_status,
    citation_text: r.citation_text ?? "",
    notes: r.notes ?? "",
  };
}

export function SourceForm({
  values, onChange, disabled,
}: {
  values: SourceFormValues;
  onChange: (v: SourceFormValues) => void;
  disabled?: boolean;
}) {
  const set = <K extends keyof SourceFormValues>(k: K, v: SourceFormValues[K]) =>
    onChange({ ...values, [k]: v });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <FormSection title="Identification">
        <Field label="Title" required>
          <Input value={values.title} onChange={(v) => set("title", v)} disabled={disabled} maxLength={500} />
        </Field>
        <Row>
          <Field label="Author"><Input value={values.author} onChange={(v) => set("author", v)} disabled={disabled} /></Field>
          <Field label="Publisher"><Input value={values.publisher} onChange={(v) => set("publisher", v)} disabled={disabled} /></Field>
        </Row>
        <Row>
          <Field label="Publication date"><Input type="date" value={values.publication_date} onChange={(v) => set("publication_date", v)} disabled={disabled} /></Field>
          <Field label="Publication year (if only year)"><Input type="number" value={values.publication_year} onChange={(v) => set("publication_year", v)} disabled={disabled} /></Field>
        </Row>
        <Row>
          <Field label="Type">
            <SelectField value={values.source_type} onChange={(v) => set("source_type", v as SourceType)} disabled={disabled}
              options={SOURCE_TYPES.map((t) => [t, SOURCE_TYPE_LABEL[t]] as const)} />
          </Field>
          <Field label="Language (BCP-47, e.g. en, fr, ar)"><Input value={values.language} onChange={(v) => set("language", v)} disabled={disabled} maxLength={20} /></Field>
        </Row>
        <Field label="ISBN / DOI / identifier"><Input value={values.isbn} onChange={(v) => set("isbn", v)} disabled={disabled} maxLength={60} /></Field>
      </FormSection>

      <FormSection title="Location">
        <Field label="URL"><Input value={values.url} onChange={(v) => set("url", v)} disabled={disabled} maxLength={2048} /></Field>
        <Row>
          <Field label="Archive or institution"><Input value={values.archive_or_institution} onChange={(v) => set("archive_or_institution", v)} disabled={disabled} /></Field>
          <Field label="Local identifier / call number"><Input value={values.identifier} onChange={(v) => set("identifier", v)} disabled={disabled} /></Field>
        </Row>
        <Field label="Accessed date"><Input type="date" value={values.accessed_date} onChange={(v) => set("accessed_date", v)} disabled={disabled} /></Field>
      </FormSection>

      <FormSection title="Evaluation">
        <Row>
          <Field label="Reliability tier">
            <SelectField value={values.reliability_tier} onChange={(v) => set("reliability_tier", v as ReliabilityTier)} disabled={disabled}
              options={RELIABILITY_TIERS.map((t) => [t, RELIABILITY_LABEL[t]] as const)} />
          </Field>
        </Row>
        <Field label="Curator notes">
          <Textarea value={values.notes} onChange={(v) => set("notes", v)} disabled={disabled} maxLength={4000} rows={4} />
        </Field>
      </FormSection>

      <FormSection title="Rights">
        <Field label="Rights status">
          <SelectField value={values.rights_status} onChange={(v) => set("rights_status", v as RightsStatus)} disabled={disabled}
            options={RIGHTS_STATUSES.map((t) => [t, RIGHTS_LABEL[t]] as const)} />
        </Field>
      </FormSection>

      <FormSection title="Citation">
        <Field label="Full citation">
          <Textarea value={values.citation_text} onChange={(v) => set("citation_text", v)} disabled={disabled} maxLength={2000} rows={3} />
        </Field>
      </FormSection>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: "1px solid var(--cp-border)", borderRadius: 8, padding: "12px 16px", margin: 0 }}>
      <legend style={{ padding: "0 6px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--cp-ink-soft)" }}>{title}</legend>
      <div style={{ display: "grid", gap: 12 }}>{children}</div>
    </fieldset>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>{children}</div>;
}
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
      <span style={{ color: "var(--cp-ink-soft)" }}>{label}{required && <span style={{ color: "#a03030" }}> *</span>}</span>
      {children}
    </label>
  );
}
function Input({ value, onChange, disabled, type = "text", maxLength }: { value: string; onChange: (v: string) => void; disabled?: boolean; type?: string; maxLength?: number }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} maxLength={maxLength}
    style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, background: disabled ? "#f7f1e5" : "white" }} />;
}
function Textarea({ value, onChange, disabled, maxLength, rows }: { value: string; onChange: (v: string) => void; disabled?: boolean; maxLength?: number; rows?: number }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} maxLength={maxLength} rows={rows}
    style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: disabled ? "#f7f1e5" : "white", resize: "vertical" }} />;
}
function SelectField({ value, onChange, options, disabled }: { value: string; onChange: (v: string) => void; options: ReadonlyArray<readonly [string, string]>; disabled?: boolean }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}
      style={{ padding: "6px 10px", border: "1px solid var(--cp-border)", borderRadius: 6, fontSize: 13, background: disabled ? "#f7f1e5" : "white" }}>
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}
