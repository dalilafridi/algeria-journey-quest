# DZ Odyssey Studio — First-Administrator Bootstrap

Studio uses role-based access. The `assign_role()` and `revoke_role()`
RPCs both require the caller to already hold `museum_director` or
`technical_administrator`. Before any such user exists, no one can assign
roles through the app.

This document describes the **one-time** operator procedure for granting the
first privileged role. It is intentionally kept out of the browser UI.

## Procedure (run once, per environment)

1. The intended first administrator signs up normally at
   `/curator/sign-in` (or via the standard sign-up flow if enabled).
   This creates their `auth.users` row and, via the `handle_new_user`
   trigger, their `public.profiles` row.

2. A workspace operator (someone with access to the Lovable Cloud SQL
   editor for this project) runs the following SQL, substituting the
   correct email address:

   ```sql
   INSERT INTO public.user_roles (user_id, role, assigned_by)
   SELECT id, 'museum_director'::public.app_role, id
   FROM auth.users
   WHERE email = 'director@example.org'
   ON CONFLICT (user_id, role) DO NOTHING;
   ```

   For a purely technical operator instead of a museum director, use
   `'technical_administrator'::public.app_role`.

3. Confirm the assignment:

   ```sql
   SELECT u.email, ur.role, ur.assigned_at
   FROM public.user_roles ur
   JOIN auth.users u ON u.id = ur.user_id
   ORDER BY ur.assigned_at DESC;
   ```

4. The newly-privileged user signs in and manages all subsequent role
   assignments through **/curator/team**. Every assignment and removal
   goes through `assign_role()` / `revoke_role()`, which:

   - Derive the caller from `auth.uid()` — never from the client.
   - Verify the caller is a Studio administrator.
   - Refuse to remove the last remaining `museum_director` or
     `technical_administrator`.
   - Write an `audit_log` row in the same transaction as the change.

## What must NOT happen

- Do **not** hardcode the operator's email in application code.
- Do **not** paste this SQL into any browser-rendered page.
- Do **not** grant `INSERT`/`UPDATE`/`DELETE` on `public.user_roles` to
  the `authenticated` role — Phase 2A relies on RPC-only mutation.
- Do **not** widen `EXECUTE` on `log_audit_event` beyond `service_role`.

## Recovery

If every administrator is inadvertently locked out (extremely unlikely
because of the continuity guard), an operator with SQL editor access
can re-run step 2 to restore a Studio administrator. All such recovery
actions are visible in the SQL history and should be noted in Governance
& Decisions.
