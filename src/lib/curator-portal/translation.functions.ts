/**
 * Reusable editorial translation service.
 *
 * Content-type-agnostic on purpose: the input takes an opaque `content_type`
 * discriminator plus a bag of source fields, so historical figures today and
 * events / eras / regions / culture / cuisine / football / future exhibits
 * tomorrow can all call the same endpoint without redesign.
 *
 * Guarantees (per editorial policy):
 *   1. Never writes to the database. Callers persist accepted translations
 *      through the content-type's existing update RPC (e.g. update_figure_draft)
 *      so revisions, audit-log, permissions, and validation stay centralized.
 *   2. Never overwrites protected fields. Fields marked `protected: true`
 *      (historical names, canonical spellings) are echoed back unchanged with
 *      a `protected` flag so the UI can surface them as *suggestions only*.
 *   3. Explicit user-triggered only. No polling, no on-keystroke calls.
 *   4. Trilingual: source language is one of en/fr/ar; targets are the other two
 *      by default, or an explicit subset the caller passes in.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

// ---------------- Shared types ---------------------------------------

export type TranslationState =
  | "missing"
  | "machine"
  | "human_edited"
  | "reviewed"
  | "approved";

export interface TranslationStatusRow {
  id: string;
  content_type: string;
  content_id: string;
  field_key: string;
  language: "en" | "fr" | "ar";
  state: TranslationState;
  protected: boolean;
  source_language: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export const TRANSLATION_STATE_LABEL: Record<TranslationState, string> = {
  missing: "Missing",
  machine: "AI Suggestion",
  human_edited: "AI Suggestion",
  reviewed: "Reviewed",
  approved: "Approved",
};

// ---------------- Reusable translate action --------------------------

const Lang = z.enum(["en", "fr", "ar"]);

const FieldInput = z.object({
  key: z.string().min(1).max(64),
  text: z.string().max(20_000),
  /** Editorial protection — machine output is returned untouched. */
  protected: z.boolean().optional().default(false),
  /** Optional per-field hint, e.g. "historical figure name" | "biography". */
  kind: z.string().max(64).optional(),
});

const TranslateInput = z.object({
  content_type: z.string().min(1).max(64),
  /** Free-form domain hint for the model, e.g. "Algerian historical figure". */
  domain_hint: z.string().max(240).optional(),
  source_language: Lang,
  target_languages: z.array(Lang).min(1).max(2),
  fields: z.array(FieldInput).min(1).max(24),
});

export type TranslateFieldGroupInput = z.infer<typeof TranslateInput>;

export type TranslatedField = {
  key: string;
  language: "en" | "fr" | "ar";
  text: string;
  /** True when the field was protected — text is the original source value. */
  protected: boolean;
};

export type TranslateFieldGroupResult = {
  source_language: "en" | "fr" | "ar";
  translations: TranslatedField[];
};

const LANG_NAME: Record<"en" | "fr" | "ar", string> = {
  en: "English",
  fr: "French",
  ar: "Modern Standard Arabic",
};

function buildSystemPrompt(domainHint: string | undefined) {
  return [
    "You are a museum-grade editorial translator for the DZ Odyssey Studio.",
    "Translate the provided fields faithfully, preserving tone, register, and meaning.",
    "Do not add commentary, footnotes, or explanations.",
    "Preserve proper nouns, dates, and numbers exactly.",
    "For Arabic, use Modern Standard Arabic with proper diacritics only where standard.",
    "For French, use standard metropolitan French with correct diacritics.",
    "Return STRICT JSON matching the requested schema. No prose outside JSON.",
    domainHint ? `Domain context: ${domainHint}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

function buildUserPrompt(
  source: "en" | "fr" | "ar",
  targets: ("en" | "fr" | "ar")[],
  fields: { key: string; text: string; kind?: string }[],
) {
  const targetList = targets.map((t) => LANG_NAME[t]).join(" and ");
  const payload = fields.map((f) => ({
    key: f.key,
    kind: f.kind ?? null,
    text: f.text,
  }));
  return [
    `Source language: ${LANG_NAME[source]}.`,
    `Target languages: ${targetList}.`,
    `For each field, produce a translation into each target language.`,
    `Return JSON of shape: { "translations": [{ "key": string, "language": "${targets.join('"|"')}", "text": string }] }`,
    `Fields:`,
    JSON.stringify(payload),
  ].join("\n");
}

/**
 * Ask the Lovable AI Gateway to translate a group of fields.
 * Does NOT persist anything. Returns generated text for the caller to review.
 */
export const translateFieldGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => TranslateInput.parse(v))
  .handler(async ({ data }): Promise<TranslateFieldGroupResult> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Translation service is not configured.");

    // Partition protected fields out — they are echoed back untouched.
    const protectedFields = data.fields.filter((f) => f.protected);
    const translatable = data.fields.filter((f) => !f.protected && f.text.trim().length > 0);

    const protectedEcho: TranslatedField[] = protectedFields.flatMap((f) =>
      data.target_languages.map((lang) => ({
        key: f.key,
        language: lang,
        text: f.text,
        protected: true,
      })),
    );

    if (translatable.length === 0) {
      return { source_language: data.source_language, translations: protectedEcho };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: buildSystemPrompt(data.domain_hint) },
          {
            role: "user",
            content: buildUserPrompt(
              data.source_language,
              data.target_languages,
              translatable.map(({ key: k, text, kind }) => ({ key: k, text, kind })),
            ),
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Translation service is busy. Please try again shortly.");
      if (res.status === 402) throw new Error("Translation credits are exhausted. Please add credits to continue.");
      throw new Error(`Translation failed (${res.status}) ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";

    let parsed: { translations?: unknown };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("Translation service returned an unreadable response.");
    }

    const RowSchema = z.object({
      key: z.string(),
      language: Lang,
      text: z.string(),
    });
    const rows = z.array(RowSchema).safeParse(parsed.translations);
    if (!rows.success) {
      throw new Error("Translation service returned an unexpected shape.");
    }

    // Constrain to requested keys+langs, drop anything else the model added.
    const wantedKeys = new Set(translatable.map((f) => f.key));
    const wantedLangs = new Set(data.target_languages);
    const generated: TranslatedField[] = rows.data
      .filter((r) => wantedKeys.has(r.key) && wantedLangs.has(r.language))
      .map((r) => ({ key: r.key, language: r.language, text: r.text, protected: false }));

    return {
      source_language: data.source_language,
      translations: [...generated, ...protectedEcho],
    };
  });

// ---------------- Translation status: list ---------------------------

const ListInput = z.object({
  content_type: z.string().min(1).max(64),
  content_id: z.string().uuid(),
});

export const listTranslationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ListInput.parse(v))
  .handler(async ({ data, context }): Promise<TranslationStatusRow[]> => {
    const { data: rows, error } = await context.supabase
      .from("content_translation_status")
      .select("*")
      .eq("content_type", data.content_type)
      .eq("content_id", data.content_id);
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as TranslationStatusRow[];
  });

// ---------------- Translation status: upsert -------------------------

const UpsertInput = z.object({
  content_type: z.string().min(1).max(64),
  content_id: z.string().uuid(),
  field_key: z.string().min(1).max(64),
  language: Lang,
  state: z.enum(["missing", "machine", "human_edited", "reviewed", "approved"]),
  protected: z.boolean().optional(),
});

export const upsertTranslationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => UpsertInput.parse(v))
  .handler(async ({ data, context }): Promise<TranslationStatusRow> => {
    const { data: row, error } = await context.supabase.rpc(
      "upsert_translation_status" as never,
      {
        _content_type: data.content_type,
        _content_id: data.content_id,
        _field_key: data.field_key,
        _language: data.language,
        _state: data.state,
        _protected: data.protected ?? null,
      } as never,
    );
    if (error) throw new Error(error.message);
    return row as unknown as TranslationStatusRow;
  });

// Silence unused Database import if types haven't caught up yet.
export type _DbAnchor = Database;

