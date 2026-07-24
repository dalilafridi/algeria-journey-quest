import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/football")({
  component: () => <Outlet />,
});
