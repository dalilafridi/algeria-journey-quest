/**
 * Production monitoring client.
 *
 * Captures, de-duplicates and batches front-end failures, then ships them to
 * the public ingest endpoint. Everything here is best-effort: monitoring must
 * never break the museum, so every path is wrapped defensively and failures
 * are swallowed silently.
 */

import type { MonitoringReport } from "./types";

const ENDPOINT = "/api/public/monitoring/report";
const FLUSH_MS = 4000;
const MAX_BATCH = 20;
/** Same message + route reported more than this in one session is dropped. */
const MAX_PER_FINGERPRINT = 3;

let installed = false;
let queue: MonitoringReport[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
const seen = new Map<string, number>();

/** Browser-extension and benign platform noise we never want to alert on. */
const IGNORED = [
  "ResizeObserver loop",
  "Script error.",
  "chrome-extension://",
  "moz-extension://",
  "safari-extension://",
  "Non-Error promise rejection captured",
  "hydrated but some attributes",
];

function isNoise(message: string, url?: string | null) {
  const hay = `${message} ${url ?? ""}`;
  return IGNORED.some((n) => hay.includes(n));
}

function truncate(value: string | null | undefined, max: number) {
  if (!value) return null;
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function flush(useBeacon = false) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (queue.length === 0) return;
  const events = queue.slice(0, MAX_BATCH);
  queue = queue.slice(MAX_BATCH);
  const body = JSON.stringify({ events });
  try {
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
      // Marked so the fetch wrapper never reports its own traffic.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).catch(() => undefined);
  } catch {
    /* monitoring must never throw */
  }
}

function schedule() {
  if (timer) return;
  timer = setTimeout(() => flush(false), FLUSH_MS);
}

export function report(event: MonitoringReport) {
  if (typeof window === "undefined") return;
  try {
    const message = truncate(event.message, 500) ?? "Unknown error";
    if (isNoise(message, event.resource_url ?? event.page_url)) return;
    const key = `${event.event_type}|${message}|${window.location.pathname}`;
    const count = seen.get(key) ?? 0;
    if (count >= MAX_PER_FINGERPRINT) return;
    seen.set(key, count + 1);

    queue.push({
      ...event,
      message,
      severity: event.severity ?? "error",
      route: event.route ?? window.location.pathname,
      page_url: truncate(event.page_url ?? window.location.href, 800),
      resource_url: truncate(event.resource_url, 800),
      stack: truncate(event.stack, 4000),
      language: event.language ?? (document.documentElement.lang || null),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      occurred_at: event.occurred_at ?? new Date().toISOString(),
    });
    if (queue.length >= MAX_BATCH) flush(false);
    else schedule();
  } catch {
    /* noop */
  }
}

export function installMonitoring() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (e: ErrorEvent) => {
    const target = e.target as HTMLElement | null;
    // Resource-level failures (images, media) bubble as capture-phase errors
    // with a target element rather than an ErrorEvent message.
    if (target && target !== (window as unknown as HTMLElement)) {
      const tag = target.tagName?.toLowerCase();
      if (tag === "img" || tag === "source" || tag === "video" || tag === "audio") {
        const src =
          (target as HTMLImageElement).currentSrc || (target as HTMLImageElement).src || "";
        if (!src) return;
        report({
          event_type: "broken_image",
          severity: "warning",
          message: `Media failed to load: ${src.split("/").pop() ?? src}`,
          resource_url: src,
        });
        return;
      }
    }
    if (!e.message) return;
    report({
      event_type: "js_error",
      message: e.message,
      resource_url: e.filename || null,
      stack: e.error?.stack ?? null,
    });
  }, true);

  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    const reason = e.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === "string"
          ? reason
          : "Unhandled promise rejection";
    report({
      event_type: "unhandled_rejection",
      message,
      stack: reason instanceof Error ? (reason.stack ?? null) : null,
    });
  });

  // Failed network requests (server functions, API routes, third-party media).
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url.includes(ENDPOINT)) return originalFetch(input, init);
    try {
      const res = await originalFetch(input, init);
      if (res.status >= 500 || res.status === 429) {
        report({
          event_type: "failed_request",
          message: `Request failed with ${res.status} ${res.statusText || ""}`.trim(),
          resource_url: url,
          status_code: res.status,
        });
      }
      return res;
    } catch (err) {
      report({
        event_type: "failed_request",
        message: `Network request failed: ${(err as Error)?.message ?? "unknown"}`,
        resource_url: url,
        status_code: null,
      });
      throw err;
    }
  };

  window.addEventListener("pagehide", () => flush(true));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
}

export function reportNotFound(pathname: string) {
  report({
    event_type: "not_found",
    severity: "warning",
    message: `Missing page: ${pathname}`,
    route: pathname,
  });
}
