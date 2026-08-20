/**
 * Plain HTTP 404 used by the routes that shadow build metadata files
 * (/package.json, /package-lock.json, /nitro.json). Kept text/plain so no
 * framework or build information travels with the response.
 */
export function notFoundResponse(): Response {
  return new Response("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
