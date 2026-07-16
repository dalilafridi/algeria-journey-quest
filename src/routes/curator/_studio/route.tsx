/**
 * /curator/_studio — pathless authenticated layout.
 *
 * Server-enforced gate: uses TanStack's `beforeLoad` to call the
 * `getStudioSession` server function. Any non-authenticated visitor is
 * redirected to `/curator/sign-in`; authenticated users without any Studio
 * role are redirected to `/curator/access-denied`. All child routes render
 * inside `CuratorShell`.
 *
 * The gate here is only the *layout-level* check. Every server function
 * that reads privileged data (team, audit log) re-authorizes independently.
 * Every child route also declares its own permitted roles via
 * `ROUTE_PERMISSIONS` and shows an inline "Not authorized" surface if the
 * user's roles do not include one of them — the URL is unchanged so the
 * denial is auditable but never leaks restricted data.
 */

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { CuratorShell } from "@/components/curator-portal/CuratorShell";
import { getStudioSession } from "@/lib/curator-portal/studio-auth.functions";
import { StudioSessionProvider } from "@/components/curator-portal/StudioSessionContext";

export const Route = createFileRoute("/curator/_studio")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    try {
      const session = await getStudioSession();
      if (!session.roles || session.roles.length === 0) {
        throw redirect({ to: "/curator/access-denied" });
      }
      return { studioSession: session };
    } catch (err) {
      // Redirects re-throw; anything else is treated as unauthenticated.
      if ((err as { isRedirect?: boolean })?.isRedirect) throw err;
      throw redirect({
        to: "/curator/sign-in",
        search: { redirect: location.pathname },
      });
    }
  },
  component: StudioLayout,
});

function StudioLayout() {
  const { studioSession } = Route.useRouteContext();
  return (
    <StudioSessionProvider value={studioSession}>
      <CuratorShell />
    </StudioSessionProvider>
  );
}
