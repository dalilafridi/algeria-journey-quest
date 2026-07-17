
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TYPE public.translation_state AS ENUM (
  'missing',
  'machine',
  'human_edited',
  'reviewed',
  'approved'
);

CREATE TABLE public.content_translation_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  field_key text NOT NULL,
  language text NOT NULL CHECK (language IN ('en','fr','ar')),
  state public.translation_state NOT NULL DEFAULT 'missing',
  protected boolean NOT NULL DEFAULT false,
  source_language text,
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (content_type, content_id, field_key, language)
);

CREATE INDEX content_translation_status_lookup
  ON public.content_translation_status (content_type, content_id);

GRANT SELECT ON public.content_translation_status TO authenticated;
GRANT ALL ON public.content_translation_status TO service_role;

ALTER TABLE public.content_translation_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Studio users read translation status"
  ON public.content_translation_status
  FOR SELECT
  TO authenticated
  USING (public.has_any_studio_role(auth.uid()));

CREATE TRIGGER content_translation_status_updated_at
  BEFORE UPDATE ON public.content_translation_status
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
