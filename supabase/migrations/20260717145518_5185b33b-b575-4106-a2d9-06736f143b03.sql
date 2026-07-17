REVOKE EXECUTE ON FUNCTION
  public.can_write_sources(uuid),
  public.can_archive_sources(uuid),
  public.can_verify_sources(uuid),
  public.can_write_figure_drafts(uuid),
  public.can_research_figure_drafts(uuid),
  public.can_fact_check_figure_drafts(uuid),
  public.can_translate_figure_drafts(uuid),
  public.can_translation_review_figure_drafts(uuid),
  public.can_approve_figure_drafts(uuid)
FROM PUBLIC, anon, authenticated;