import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Production security headers.
 *
 * Applied to every response through Nitro route rules, which also emit the
 * static asset `_headers` file for the hosting layer.
 *
 * CSP notes:
 *  - 'unsafe-inline' is required for scripts because the SSR shell inlines the
 *    language bootstrap and TanStack Start's hydration payload, and for styles
 *    because Tailwind/Radix write inline style attributes.
 *  - frame-ancestors keeps the site un-embeddable except by the Lovable editor
 *    preview, which needs to iframe it.
 *  - frame-src only allows the YouTube players used by the listening room.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://ai.gateway.lovable.dev",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://*.lovable.app",
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
