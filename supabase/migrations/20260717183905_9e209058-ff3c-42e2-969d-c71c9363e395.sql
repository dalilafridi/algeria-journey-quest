
-- Restore EXECUTE for authenticated on authorization predicate helpers.
-- Root cause: the recent RPC hardening revoked EXECUTE from PUBLIC on every
-- public-schema function. That also stripped `authenticated` access to the
-- SECURITY DEFINER helpers used inside RLS policies (has_any_studio_role,
-- has_role, is_studio_admin, can_*). RLS is evaluated as the calling role
-- (`authenticated`), so any SELECT hitting a policy that calls one of these
-- fails with `permission denied for function has_any_studio_role`.
-- SECURITY DEFINER controls what the body runs as, not who may call it.

GRANT EXECUTE ON FUNCTION public.has_any_studio_role(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_studio_admin(uuid) TO authenticated;

GRANT EXECUTE ON FUNCTION public.can_write_sources(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_archive_sources(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_verify_sources(uuid) TO authenticated;

GRANT EXECUTE ON FUNCTION public.can_write_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_approve_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_research_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_translate_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_translation_review_figure_drafts(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_fact_check_figure_drafts(uuid) TO authenticated;
