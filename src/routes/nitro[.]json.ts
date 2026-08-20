import { createFileRoute } from "@tanstack/react-router";
import { notFoundResponse } from "@/lib/not-found-response";

export const Route = createFileRoute("/nitro.json")({
  server: {
    handlers: {
      GET: () => notFoundResponse(),
      HEAD: () => notFoundResponse(),
    },
  },
});
