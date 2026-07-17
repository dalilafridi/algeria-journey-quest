/**
 * Cloning — wraps the SECURITY DEFINER RPCs clone_figure_draft and
 * clone_source. Both RPCs run inside a transaction, take an advisory
 * lock on the target slug (for figures), and audit-log the copy. New
 * rows always start in "draft" status, are attributed to the caller,
 * and their slug/title is auto-suffixed with "-copy" (uniquely) by the
 * RPC itself.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const cloneFigureInput = z.object({
  id: z.string().uuid(),
  include_relationships: z.boolean().default(true),
});

export const cloneFigureDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => cloneFigureInput.parse(d))
  .handler(async ({ data, context }) => {
    const { data: id, error } = await context.supabase.rpc("clone_figure_draft", {
      _id: data.id,
      _include_relationships: data.include_relationships,
    } as never);
    if (error) throw new Error(error.message);
    return { id: id as string };
  });

const cloneSourceInput = z.object({ id: z.string().uuid() });

export const cloneSource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => cloneSourceInput.parse(d))
  .handler(async ({ data, context }) => {
    const { data: id, error } = await context.supabase.rpc("clone_source", {
      _id: data.id,
    } as never);
    if (error) throw new Error(error.message);
    return { id: id as string };
  });
