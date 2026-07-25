#!/usr/bin/env node
/**
 * DZ Odyssey — em dash guard.
 *
 * Fails when the em dash character (U+2014) appears in visitor-facing
 * content. Excludes:
 *   - Studio/curator internal admin surfaces
 *   - Source registry (bibliographic titles use em dashes legitimately)
 *   - Code comments (//, *, /*)
 *
 * Run: `node scripts/check-em-dashes.mjs`
 * Wired into `bun run build` via the "prebuild" script in package.json.
 */
import { readFileSync, statSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = "src";
const EM = "\u2014";
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);
const EXCLUDE_SUBSTR = ["curator", "provenance/sources.ts"];

/** @param {string} dir */
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (EXTS.has(p.slice(p.lastIndexOf(".")))) yield p;
  }
}

function isCommentLine(line) {
  const s = line.trimStart();
  return s.startsWith("//") || s.startsWith("*") || s.startsWith("/*");
}

const findings = [];
for (const file of walk(ROOT)) {
  const rel = relative(process.cwd(), file).replace(/\\/g, "/");
  if (EXCLUDE_SUBSTR.some((p) => rel.includes(p))) continue;
  const text = readFileSync(file, "utf8");
  if (!text.includes(EM)) continue;
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (!line.includes(EM)) return;
    if (isCommentLine(line)) return;
    findings.push({ file: rel, line: i + 1, text: line.trim().slice(0, 160) });
  });
}

if (findings.length > 0) {
  console.error(
    `\n\u274c em dash guard: ${findings.length} occurrence(s) in visitor-facing content.\n`
  );
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}`);
    console.error(`    ${f.text}`);
  }
  console.error(
    "\nRewrite the sentence naturally. Do not substitute a spaced hyphen."
  );
  console.error("See docs/EDITORIAL_STANDARDS.md.\n");
  process.exit(1);
}
console.log("\u2713 em dash guard: no visitor-facing em dashes.");
