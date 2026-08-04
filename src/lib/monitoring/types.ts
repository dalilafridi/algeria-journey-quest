/**
 * Shared, browser-safe monitoring types.
 *
 * Kept free of any server import so both the reporting client and the
 * Studio dashboard can use the same vocabulary.
 */

export type MonitoringEventType =
  | "js_error"
  | "unhandled_rejection"
  | "failed_request"
  | "broken_image"
  | "not_found"
  | "manual";

export type MonitoringSeverity = "error" | "warning" | "info";

export type MonitoringReport = {
  event_type: MonitoringEventType;
  severity?: MonitoringSeverity;
  message: string;
  route?: string | null;
  page_url?: string | null;
  resource_url?: string | null;
  status_code?: number | null;
  stack?: string | null;
  language?: string | null;
  viewport?: string | null;
  occurred_at?: string;
};

export const EVENT_LABEL: Record<MonitoringEventType, string> = {
  js_error: "Script error",
  unhandled_rejection: "Unhandled promise",
  failed_request: "Failed request",
  broken_image: "Broken image",
  not_found: "Missing page (404)",
  manual: "Reported manually",
};
