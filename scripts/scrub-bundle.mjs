#!/usr/bin/env node
/**
 * DZ Odyssey, deployment bundle scrubber.
 *
 * The hosting asset layer serves a few build metadata files that sit at the
 * root of the deployment bundle, above the worker, so route handlers cannot
 * answer them. This step removes what is not needed at runtime and strips
 * framework and version details from what is.
 *
 * Runs after `vite build` through the "postbuild" script.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
if (!existsSync(dist)) process.exit(0);

// Not read by the runtime; pure build residue.
for (const file of ["package-lock.json", "bun.lockb", "yarn.lock"]) {
  const p = join(dist, file);
  if (existsSync(p)) {
    rmSync(p);
    console.log(`[scrub-bundle] removed dist/${file}`);
  }
}

// Kept because the hosting layer reads the entry and public dir from it,
// but reduced to those keys so no framework or version data is public.
const nitroPath = join(dist, "nitro.json");
if (existsSync(nitroPath)) {
  try {
    const meta = JSON.parse(readFileSync(nitroPath, "utf8"));
    writeFileSync(
      nitroPath,
      JSON.stringify(
        {
          serverEntry: meta.serverEntry ?? "server/index.mjs",
          publicDir: meta.publicDir ?? "client",
          preset: meta.preset ?? "cloudflare-module",
        },
        null,
        2,
      ),
    );
    console.log("[scrub-bundle] stripped dist/nitro.json metadata");
  } catch {
    /* leave the file untouched if it cannot be parsed */
  }
}
