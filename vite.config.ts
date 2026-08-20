import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Production security headers.
 *
 * Applied to every response through Nitro route rules, which also emit the
 * static asset `_headers` file for the hosting layer.
 *
 * CSP notes:
 *  - 'unsafe-inline' is required for scripts because the SSR shell inlines the
 *    language bootstrap and the hydration payload, and for styles because
 *    Tailwind/Radix write inline style attributes.
 *  - frame-ancestors is 'self' only in production. The editor preview build
 *    (`--mode development`) additionally allows the preview host so the
 *    project can still be reviewed inside an iframe.
 *  - frame-src only allows the YouTube players used by the listening room.
 *  - The AI gateway is called server side only, so it is not in connect-src.
 */
const IS_PREVIEW_BUILD = process.argv.join(" ").includes("--mode development");

const FRAME_ANCESTORS = IS_PREVIEW_BUILD
  ? "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://*.lovable.app"
  : "frame-ancestors 'self'";

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  FRAME_ANCESTORS,
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = {
  "content-security-policy": CSP,
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy":
    "accelerometer=(), autoplay=(self), camera=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=(), browsing-topics=(), interest-cohort=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "cross-origin-opener-policy": "same-origin",
  "x-frame-options": "SAMEORIGIN",
};

// `routeRules` is forwarded to Nitro but is not part of the wrapper's narrow
// option type, so the object is cast at the boundary.
export default defineConfig({
  nitro: {
    routeRules: {
      "/**": { headers: SECURITY_HEADERS },
    },
  } as never,
});
