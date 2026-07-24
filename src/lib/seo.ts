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

export const SITE_URL = "https://dzodyssey.numeradataworks.com";

/** Absolute URL for the site's default social preview. */
export const DEFAULT_OG_IMAGE = absUrl(brandCover);

export type OgType = "website" | "article";

export interface PageMetaInput {
  /** Path portion of the canonical URL, always starting with "/". */
  path: string;
  title: string;
  description: string;
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

  const meta: Array<Record<string, string>> = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.noindex) meta.push({ name: "robots", content: "noindex" });

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
