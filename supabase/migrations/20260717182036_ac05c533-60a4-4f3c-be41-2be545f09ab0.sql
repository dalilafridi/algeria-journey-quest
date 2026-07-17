REVOKE ALL ON FUNCTION public.mark_notifications_read(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_notifications_read(uuid[]) TO authenticated;
REVOKE ALL ON FUNCTION public.clone_figure_draft(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clone_figure_draft(uuid, boolean) TO authenticated;
REVOKE ALL ON FUNCTION public.clone_source(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clone_source(uuid) TO authenticated;