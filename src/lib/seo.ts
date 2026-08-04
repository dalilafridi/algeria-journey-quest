/**
 * Shared SEO / social metadata helper for public routes.
 *
 * Every public leaf route calls `pageMeta({...})` inside its `head()` to emit
 * a canonical URL plus consistent Open Graph and Twitter tags. `og:image` /
 * `twitter:image` live at the leaf level only — the root shell no longer
 * hardcodes a global preview image (Phase 1 fix).
 *
 * Usage:
 *   head: () => pageMeta({
 *     path: "/football",
 *     title: "The Hall of Algerian Football — DZ Odyssey",
 *     description: "...",
 *     image: footballHero,     // Vite-bundled asset URL or absolute URL
 *     type: "website",         // or "article" for exhibit-style content
 *   })
 */

import brandCover from "@/assets/brand-cover.png";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

export const SITE_URL = "https://dzodyssey.numeradataworks.com";

/** Absolute URL for the site's default social preview. */
export const DEFAULT_OG_IMAGE = absUrl(brandCover);

export type OgType = "website" | "article";

export interface PageMetaInput {
  /** Path portion of the canonical URL, always starting with "/". */
  path: string;
  /** Plain string (English only) or a reviewed {en, fr, ar} record. */
  title: LocalizedString;
  description: LocalizedString;
  /**
   * Active language for this render. Routes pass `match.context.lang`, which
   * is resolved server side from the dzo_lang cookie and refreshed on the
   * client whenever the visitor switches language.
   */
  lang?: Lang;
  /** Absolute URL or Vite-imported asset path. Falls back to DEFAULT_OG_IMAGE. */
  image?: string;
  type?: OgType;
  /** Set true to emit robots=noindex (e.g. not-found / draft fallbacks). */
  noindex?: boolean;
}

export interface HeadResult {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
}

/** Join a relative path onto the canonical site origin. Idempotent. */
export function absUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + (pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
}

/** Build a full head() result for a public leaf route. */
export function pageMeta(input: PageMetaInput): HeadResult {
  const url = absUrl(input.path);
  const image = absUrl(input.image ?? DEFAULT_OG_IMAGE);
  const type: OgType = input.type ?? "website";
  const lang: Lang = input.lang ?? "en";
  const title = t(input.title, lang);
  const description = t(input.description, lang);
  const ogLocale = lang === "fr" ? "fr_FR" : lang === "ar" ? "ar_DZ" : "en_US";

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:locale", content: ogLocale },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (input.noindex) meta.push({ name: "robots", content: "noindex" });

  // A noindex page (404, personal passport, missing exhibit) must not claim a
  // canonical URL, otherwise crawlers attribute it to a real page.
  return {
    meta,
    links: input.noindex ? [] : [{ rel: "canonical", href: url }],
  };
}

/**
 * Read the active language out of a route match inside `head()`.
 * The root route publishes `lang` on the router context: server side it comes
 * from the dzo_lang cookie / Accept-Language, client side from the visitor's
 * saved choice, and the router is invalidated whenever that choice changes.
 */
export function headLang(match: { context?: unknown } | undefined): Lang {
  const ctx = (match?.context ?? {}) as { lang?: Lang };
  return ctx.lang === "fr" || ctx.lang === "ar" || ctx.lang === "en" ? ctx.lang : "en";
}

/**
 * ", DZ Odyssey" in the active language. Arabic uses the Arabic comma and the
 * transliterated museum name so dynamic titles read naturally in RTL.
 */
export function siteSuffix(lang: Lang): string {
  return lang === "ar" ? "، دي زد أوديسي" : ", DZ Odyssey";
}
