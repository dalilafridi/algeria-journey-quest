/**
 * /curator — bare layout.
 *
 * Renders `<Outlet />` only. No auth gate, no CuratorShell.
 *
 * - Authenticated Studio pages live under the pathless `_studio` layout
 *   (`src/routes/curator/_studio/route.tsx`) which enforces auth + roles
 *   server-side and mounts the Studio shell.
 * - Public Studio surfaces (`/curator/sign-in`, `/curator/access-denied`)
 *   are siblings of `_studio` and render their own standalone shell.
 */

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/curator")({
  component: () => <Outlet />,
});
