/**
 * Cloning — wraps the SECURITY DEFINER RPCs clone_figure_draft and
 * clone_source. Both RPCs run inside a transaction, take an advisory
 * lock on the target slug, and audit-log the copy. New rows always
 * start in "draft" / "draft" status and are attributed to the caller.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const cloneFigureInput = z.object({
  id: z.string().uuid(),
  new_slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "lowercase letters, digits and hyphens only"),
  copy_relations: z.boolean().default(true),
});

export const cloneFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => cloneFigureInput.parse(d))
  .handler(async ({ data, context }) => {
    const { data: id, error } = await context.supabase.rpc("clone_figure_draft", {
      _source_id: data.id,
      _new_slug: data.new_slug,
      _copy_relations: data.copy_relations,
    } as never);
    if (error) throw new Error(error.message);
    return { id: id as string };
  });

const cloneSourceInput = z.object({
  id: z.string().uuid(),
  title_suffix: z.string().trim().max(120).default(" (copy)"),
});

export const cloneSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => cloneSourceInput.parse(d))
  .handler(async ({ data, context }) => {
    const { data: id, error } = await context.supabase.rpc("clone_source", {
      _source_id: data.id,
      _title_suffix: data.title_suffix,
    } as never);
    if (error) throw new Error(error.message);
    return { id: id as string };
  });
