import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout for /curator/sources — children provide index, /new, and /$sourceId.
export const Route = createFileRoute("/curator/_studio/sources")({
  component: () => <Outlet />,
});
