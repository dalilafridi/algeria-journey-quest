
CREATE OR REPLACE FUNCTION public.upsert_translation_status(
  _content_type text,
  _content_id uuid,
  _field_key text,
  _language text,
  _state public.translation_state,
  _protected boolean DEFAULT NULL
)
RETURNS public.content_translation_status
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _row public.content_translation_status;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  IF NOT public.has_any_studio_role(_uid) THEN
    RAISE EXCEPTION 'Studio role required' USING ERRCODE = '42501';
  END IF;

  IF _language NOT IN ('en', 'fr', 'ar') THEN
    RAISE EXCEPTION 'Invalid language: %', _language USING ERRCODE = '22023';
  END IF;

  IF _content_type IS NULL OR length(trim(_content_type)) = 0 THEN
    RAISE EXCEPTION 'content_type required' USING ERRCODE = '22023';
  END IF;

  IF _field_key IS NULL OR length(trim(_field_key)) = 0 THEN
    RAISE EXCEPTION 'field_key required' USING ERRCODE = '22023';
  END IF;

  -- Only elevated editorial roles can mark a translation Approved.
  IF _state = 'approved' THEN
    IF NOT (
      public.has_role(_uid, 'museum_director'::app_role) OR
      public.has_role(_uid, 'senior_curator'::app_role) OR
      public.has_role(_uid, 'translation_reviewer'::app_role)
    ) THEN
      RAISE EXCEPTION 'Approving translations requires museum_director, senior_curator, or translation_reviewer'
        USING ERRCODE = '42501';
    END IF;
  END IF;

  INSERT INTO public.content_translation_status AS s
    (content_type, content_id, field_key, language, state, protected,
     updated_by, reviewed_by, reviewed_at)
  VALUES
    (_content_type, _content_id, _field_key, _language, _state,
     COALESCE(_protected, false),
     _uid,
     CASE WHEN _state IN ('reviewed', 'approved') THEN _uid ELSE NULL END,
     CASE WHEN _state IN ('reviewed', 'approved') THEN now() ELSE NULL END)
  ON CONFLICT (content_type, content_id, field_key, language) DO UPDATE
    SET state       = EXCLUDED.state,
        protected   = COALESCE(_protected, s.protected),
        updated_by  = _uid,
        reviewed_by = CASE WHEN EXCLUDED.state IN ('reviewed', 'approved') THEN _uid ELSE s.reviewed_by END,
        reviewed_at = CASE WHEN EXCLUDED.state IN ('reviewed', 'approved') THEN now() ELSE s.reviewed_at END,
        updated_at  = now()
  RETURNING * INTO _row;

  RETURN _row;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_translation_status(text, uuid, text, text, public.translation_state, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.upsert_translation_status(text, uuid, text, text, public.translation_state, boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.upsert_translation_status(text, uuid, text, text, public.translation_state, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_translation_status(text, uuid, text, text, public.translation_state, boolean) TO service_role;
