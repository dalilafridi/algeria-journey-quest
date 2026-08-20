import { createFileRoute } from "@tanstack/react-router";
import { notFoundResponse } from "@/lib/not-found-response";

export const Route = createFileRoute("/package-lock.json")({
  server: {
    handlers: {
      GET: () => notFoundResponse(),
      HEAD: () => notFoundResponse(),
    },
  },
});
