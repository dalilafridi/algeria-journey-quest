/**
 * SSR-safe initial-language resolver.
 *
 * Priority: dzo_lang cookie -> Accept-Language header -> "en".
 * Called from the root route's loader so the shell can render the correct
 * <html lang dir> attributes before hydration (no FOUC / no LTR flash for
 * Arabic visitors on hard navigation).
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import type { Lang } from "./i18n";

const SUPPORTED: readonly Lang[] = ["en", "fr", "ar"];

function pickFromCookie(cookie: string | undefined | null): Lang | null {
  if (!cookie) return null;
  const m = /(?:^|;\s*)dzo_lang=(en|fr|ar)/.exec(cookie);
  return m ? (m[1] as Lang) : null;
}

function pickFromAcceptLanguage(header: string | undefined | null): Lang | null {
  if (!header) return null;
  // Parse "fr-FR,fr;q=0.9,en;q=0.8" — pick first supported base tag by q order.
  const parts = header
    .split(",")
    .map((p) => {
      const [tag, ...rest] = p.trim().split(";");
      const qMatch = rest.find((r) => r.trim().startsWith("q="));
      const q = qMatch ? parseFloat(qMatch.split("=")[1]) : 1;
      return { tag: tag.toLowerCase(), q: isNaN(q) ? 1 : q };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of parts) {
    const base = tag.split("-")[0];
    if ((SUPPORTED as readonly string[]).includes(base)) return base as Lang;
  }
  return null;
}

export const resolveInitialLang = createServerFn({ method: "GET" }).handler((): Lang => {
  const cookie = getRequestHeader("cookie");
  return (
    pickFromCookie(cookie) ??
    pickFromAcceptLanguage(getRequestHeader("accept-language")) ??
    "en"
  );
});
