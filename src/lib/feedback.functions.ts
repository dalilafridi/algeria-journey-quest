import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

export const MESSAGE_TYPES = [
  "historical_correction",
  "translation_correction",
  "content_suggestion",
  "technical_issue",
  "rights_concern",
  "general_feedback",
] as const;

export type MessageType = (typeof MESSAGE_TYPES)[number];

const MESSAGE_TYPE_LABEL: Record<MessageType, string> = {
  historical_correction: "Historical correction",
  translation_correction: "Translation correction",
  content_suggestion: "Content suggestion",
  technical_issue: "Technical issue",
  rights_concern: "Rights or attribution concern",
  general_feedback: "General feedback",
};

const Input = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  messageType: z.enum(MESSAGE_TYPES),
  pageTitle: z.string().trim().max(200).optional().or(z.literal("")),
  pageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(5000),
  sourceUrl: z.string().trim().max(500).optional().or(z.literal("")),
  consent: z.literal(true),
  // Spam controls.
  website: z.string().max(0).optional().or(z.literal("")),
  elapsedMs: z.number().int().nonnegative(),
});

/** Result codes are stable, translatable keys. Never provider details. */
export type FeedbackResult =
  | { ok: true; reference: string }
  | { ok: false; code: "invalid" | "rate_limited" | "duplicate" | "failed" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function makeReference(): string {
  const now = new Date();
  const day = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DZO-${day}-${rand}`;
}

async function hashIp(ip: string): Promise<string> {
  const bytes = new TextEncoder().encode(`dzo-feedback:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => v)
  .handler(async ({ data }): Promise<FeedbackResult> => {
    const parsed = Input.safeParse(data);
    if (!parsed.success) return { ok: false, code: "invalid" };
    const input = parsed.data;

    // Bots fill hidden fields and submit instantly.
    if ((input.website ?? "") !== "") return { ok: true, reference: makeReference() };
    if (input.elapsedMs < 3000) return { ok: false, code: "invalid" };

    const sourceUrl = (input.sourceUrl ?? "").trim();
    if (sourceUrl && !isHttpUrl(sourceUrl)) return { ok: false, code: "invalid" };
    const pageUrl = (input.pageUrl ?? "").trim();
    if (pageUrl && !isHttpUrl(pageUrl)) return { ok: false, code: "invalid" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const forwarded = getRequestHeader("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0]?.trim() || "unknown";
    const ipHash = await hashIp(ip);
    const userAgent = (getRequestHeader("user-agent") ?? "").slice(0, 300);

    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    try {
      const { count: recent } = await supabaseAdmin
        .from("public_feedback")
        .select("id", { count: "exact", head: true })
        .or(`email.eq.${input.email},ip_hash.eq.${ipHash}`)
        .gte("created_at", hourAgo);
      if ((recent ?? 0) >= 3) return { ok: false, code: "rate_limited" };

      const { data: dupes } = await supabaseAdmin
        .from("public_feedback")
        .select("id")
        .eq("email", input.email)
        .eq("message", input.message)
        .gte("created_at", dayAgo)
        .limit(1);
      if (dupes && dupes.length > 0) return { ok: false, code: "duplicate" };
    } catch (error) {
      console.error("[feedback] pre-check failed", error);
      return { ok: false, code: "failed" };
    }

    const reference = makeReference();

    try {
      const { error } = await supabaseAdmin.from("public_feedback").insert({
        name: input.name,
        email: input.email,
        message_type: input.messageType,
        page_title: input.pageTitle || null,
        page_url: pageUrl || null,
        message: input.message,
        source_url: sourceUrl || null,
        reference_number: reference,
        ip_hash: ipHash,
        user_agent: userAgent || null,
      });
      if (error) throw error;
    } catch (error) {
      console.error("[feedback] store failed", error);
      return { ok: false, code: "failed" };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !recipient || !from) {
      console.error("[feedback] email not configured; submission stored only");
      return { ok: true, reference };
    }

    const typeLabel = MESSAGE_TYPE_LABEL[input.messageType];
    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#6b6257;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#2b2723">${escapeHtml(value)}</td></tr>`;

    const html = `<div style="font-family:Georgia,serif;color:#2b2723;max-width:640px">
<h2 style="font-size:18px;margin:0 0 12px">DZ Odyssey: ${escapeHtml(typeLabel)}</h2>
<table style="font-size:14px;border-collapse:collapse">
${row("Date and time", new Date().toISOString())}
${row("Reference number", reference)}
${row("Name", input.name)}
${row("Email", input.email)}
${row("Message type", typeLabel)}
${row("Page or exhibit", input.pageTitle || "Not provided")}
${row("Page URL", pageUrl || "Not provided")}
${row("Supporting source", sourceUrl || "Not provided")}
</table>
<h3 style="font-size:15px;margin:20px 0 8px">Message</h3>
<div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(input.message)}</div>
</div>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [recipient],
          reply_to: input.email,
          subject: `DZ Odyssey: ${typeLabel}`,
          html,
        }),
      });
      if (!res.ok) {
        console.error("[feedback] email provider error", res.status, await res.text());
      }
    } catch (error) {
      console.error("[feedback] email send failed", error);
    }

    return { ok: true, reference };
  });
