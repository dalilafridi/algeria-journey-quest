import { createFileRoute } from "@tanstack/react-router";
import { notFoundResponse } from "@/lib/not-found-response";

/**
 * Build metadata files land at the deployment root and would otherwise be
 * served as public JSON. This route answers a real HTTP 404 instead.
 */
export const Route = createFileRoute("/package.json")({
  server: {
    handlers: {
      GET: () => notFoundResponse(),
      HEAD: () => notFoundResponse(),
    },
  },
});
