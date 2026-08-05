CREATE TABLE public.public_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message_type text NOT NULL,
  page_title text,
  page_url text,
  message text NOT NULL,
  source_url text,
  status text NOT NULL DEFAULT 'new',
  reference_number text NOT NULL UNIQUE,
  ip_hash text,
  user_agent text
);

GRANT SELECT, UPDATE ON public.public_feedback TO authenticated;
GRANT ALL ON public.public_feedback TO service_role;

ALTER TABLE public.public_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Studio leadership can read feedback"
ON public.public_feedback FOR SELECT TO authenticated
USING (public.is_studio_admin(auth.uid()) OR public.has_role(auth.uid(), 'senior_curator'));

CREATE POLICY "Studio leadership can update feedback status"
ON public.public_feedback FOR UPDATE TO authenticated
USING (public.is_studio_admin(auth.uid()) OR public.has_role(auth.uid(), 'senior_curator'))
WITH CHECK (public.is_studio_admin(auth.uid()) OR public.has_role(auth.uid(), 'senior_curator'));

CREATE INDEX public_feedback_created_at_idx ON public.public_feedback (created_at DESC);
CREATE INDEX public_feedback_email_created_idx ON public.public_feedback (email, created_at DESC);