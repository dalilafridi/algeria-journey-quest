/**
 * SharePlaque — a museum-style exhibit plaque, the kind mounted beside a
 * historical artifact, rendered entirely as an SVG so it can be displayed crisp
 * on any screen AND exported as a beautiful PNG with zero extra libraries.
 *
 * The plaque carries the full museum language: parchment ground, engraved gold
 * frame, a bronze medallion portrait, name in serif, lifespan / role / region
 * markers, era tag, an optional memorable quote and the DZ Odyssey mark — so a
 * figure becomes an artifact people collect and share, not just a page they
 * read.
 */

import { useMemo, useState } from "react";
import type { Figure } from "@/data/figures";
import { FIGURE_CATEGORIES } from "@/data/figures";
import { legendEraOf } from "@/lib/figureEras";
import { collectionOf } from "@/lib/figureCollections";
import { t, type Lang } from "@/lib/i18n";

/* Brand palette frozen as hex so the exported PNG matches the warm parchment
   identity even outside the live CSS-variable context (canvas / data URL). */
const INK = "#37291c";
const INK_SOFT = "#6b5946";
const PARCHMENT = "#fbf6ec";
const PARCHMENT_DEEP = "#f1e7d4";
const GOLD = "#d9a23f";
const GOLD_BRIGHT = "#f0c259";
const GOLD_DEEP = "#9c6a2b";
const SERIF = "Georgia, 'Times New Roman', serif";

/** Naive word-wrap by approximate character budget per line. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
      if (lines.length === maxLines - 1) break;
    } else {
      line = next;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  // If we truncated, add an ellipsis to the last line.
  const consumed = lines.join(" ").split(/\s+/).filter(Boolean).length;
  if (consumed < words.length && lines.length > 0) {
    lines[lines.length - 1] = `${lines[lines.length - 1]}…`;
  }
  return lines;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const W = 880;
const H = 1120;

function buildPlaqueSVG(opts: {
  emoji: string;
  name: string;
  eraTag: string;
  role: string;
  lifespan: string;
  region: string;
  quote?: string;
  emblem: string;
}): string {
  const { emoji, name, eraTag, role, lifespan, region, quote, emblem } = opts;

  const nameLines = wrap(name, 18, 2);
  const nameSize = nameLines.length > 1 ? 64 : 78;
  let nameStartY = 700;
  const nameTspans = nameLines
    .map((ln, i) => `<tspan x="${W / 2}" y="${nameStartY + i * (nameSize + 6)}">${esc(ln)}</tspan>`)
    .join("");
  const nameBlockH = nameLines.length * (nameSize + 6);

  let cursor = nameStartY + nameBlockH + 8;

  // Role · lifespan
  const metaLine = [role, lifespan].filter(Boolean).join("  ·  ");
  const metaSvg = metaLine
    ? `<text x="${W / 2}" y="${cursor}" text-anchor="middle" font-family="${SERIF}" font-size="26" fill="${INK_SOFT}" font-style="italic">${esc(metaLine)}</text>`
    : "";
  if (metaLine) cursor += 44;

  // Region marker
  const regionSvg = region
    ? `<text x="${W / 2}" y="${cursor}" text-anchor="middle" font-family="${SERIF}" font-size="22" letter-spacing="2" fill="${GOLD_DEEP}">◈  ${esc(region.toUpperCase())}</text>`
    : "";
  if (region) cursor += 30;

  // Quote block
  let quoteSvg = "";
  if (quote) {
    cursor += 34;
    const qLines = wrap(quote, 42, 4);
    const qSize = 28;
    quoteSvg += `<line x1="${W / 2 - 60}" y1="${cursor - 22}" x2="${W / 2 + 60}" y2="${cursor - 22}" stroke="${GOLD}" stroke-width="2" />`;
    quoteSvg += `<text x="${W / 2}" y="${cursor + 14}" text-anchor="middle" font-family="${SERIF}" font-size="${qSize}" fill="${INK}" font-style="italic">`;
    quoteSvg += qLines
      .map((ln, i) => `<tspan x="${W / 2}" y="${cursor + 14 + i * (qSize + 8)}">${i === 0 ? "“" : ""}${esc(ln)}${i === qLines.length - 1 ? "”" : ""}</tspan>`)
      .join("");
    quoteSvg += `</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${SERIF}">
  <defs>
    <radialGradient id="ground" cx="50%" cy="30%" r="85%">
      <stop offset="0%" stop-color="${PARCHMENT}"/>
      <stop offset="100%" stop-color="${PARCHMENT_DEEP}"/>
    </radialGradient>
    <radialGradient id="disc" cx="38%" cy="30%" r="75%">
      <stop offset="0%" stop-color="${GOLD_BRIGHT}"/>
      <stop offset="45%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_DEEP}"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#ground)"/>

  <!-- engraved double frame -->
  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" fill="none" stroke="${GOLD_DEEP}" stroke-width="2" opacity="0.55"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.7"/>

  <!-- faint watermark -->
  <text x="${W / 2}" y="${H / 2 + 120}" text-anchor="middle" font-size="640" fill="${GOLD_DEEP}" opacity="0.05" font-weight="bold">ⵣ</text>

  <!-- top mark -->
  <text x="${W / 2}" y="108" text-anchor="middle" font-size="20" letter-spacing="6" fill="${GOLD_DEEP}" font-weight="bold">ⵣ  HALL OF LEGENDS  ⵣ</text>
  <text x="${W / 2}" y="150" text-anchor="middle" font-size="22" letter-spacing="4" fill="${INK_SOFT}">${esc(eraTag.toUpperCase())}</text>
  <line x1="${W / 2 - 70}" y1="178" x2="${W / 2 + 70}" y2="178" stroke="${GOLD}" stroke-width="2"/>

  <!-- medallion -->
  <circle cx="${W / 2}" cy="400" r="180" fill="url(#disc)" stroke="${GOLD_DEEP}" stroke-width="3"/>
  <circle cx="${W / 2}" cy="400" r="162" fill="none" stroke="${PARCHMENT}" stroke-width="2" opacity="0.5"/>
  <circle cx="${W / 2}" cy="400" r="148" fill="none" stroke="${GOLD_DEEP}" stroke-width="1.5" opacity="0.4"/>
  <text x="${W / 2}" y="466" text-anchor="middle" font-size="190">${esc(emoji)}</text>
  <!-- emblem seal -->
  <circle cx="${W / 2 + 132}" cy="512" r="34" fill="${PARCHMENT}" stroke="${GOLD_DEEP}" stroke-width="2"/>
  <text x="${W / 2 + 132}" y="524" text-anchor="middle" font-size="34" fill="${GOLD_DEEP}">${esc(emblem)}</text>

  <!-- name -->
  <text text-anchor="middle" font-size="${nameSize}" font-weight="bold" fill="${INK}">${nameTspans}</text>

  ${metaSvg}
  ${regionSvg}
  ${quoteSvg}

  <!-- footer -->
  <text x="${W / 2}" y="${H - 58}" text-anchor="middle" font-size="20" letter-spacing="4" fill="${GOLD_DEEP}" font-weight="bold">DZ ODYSSEY</text>
  <text x="${W / 2}" y="${H - 34}" text-anchor="middle" font-size="15" letter-spacing="2" fill="${INK_SOFT}">A MUSEUM OF ALGERIAN HISTORY</text>
</svg>`;
}

export function SharePlaque({ figure: f, lang }: { figure: Figure; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const eraDef = legendEraOf(f.category);
  const categoryDef = FIGURE_CATEGORIES.find((c) => c.id === f.category);
  const collection = collectionOf(f.id);

  const svg = useMemo(
    () =>
      buildPlaqueSVG({
        emoji: f.emoji,
        name: t(f.displayName, lang),
        eraTag: t(eraDef.label, lang),
        role: categoryDef ? t(categoryDef.label, lang) : "",
        lifespan: t(f.era, lang),
        region: t(f.regionLabel, lang),
        quote: f.extended?.keyLesson ? t(f.extended.keyLesson, lang) : undefined,
        emblem: collection.emblem,
      }),
    [f, lang, eraDef, categoryDef, collection],
  );

  const dataUrl = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    [svg],
  );

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/figures/${f.id}`
      : `/figures/${f.id}`;

  // ---- Labels ----
  const headingLabel =
    lang === "fr" ? "Plaque d'exposition" : lang === "ar" ? "لوحة المعرض" : "Exhibit plaque";
  const introLabel =
    lang === "fr"
      ? "Emportez cette plaque de musée — partagez-la ou collectionnez-la."
      : lang === "ar"
        ? "خذ لوحة المتحف هذه — شاركها أو اجمعها."
        : "Take this museum plaque with you — share it or collect it.";
  const copyLabel = lang === "fr" ? "Copier le lien" : lang === "ar" ? "نسخ الرابط" : "Copy link";
  const copiedLabel = lang === "fr" ? "Lien copié !" : lang === "ar" ? "تم النسخ!" : "Link copied!";
  const downloadLabel =
    lang === "fr" ? "Télécharger en PNG" : lang === "ar" ? "تنزيل PNG" : "Download PNG";
  const downloadingLabel =
    lang === "fr" ? "Préparation…" : lang === "ar" ? "جارٍ التحضير…" : "Preparing…";
  const shareLabel = lang === "fr" ? "Partager" : lang === "ar" ? "مشاركة" : "Share";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function downloadPng() {
    setDownloading(true);
    try {
      const scale = 2;
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("svg load failed"));
        img.src = dataUrl;
      });
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no ctx");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      await new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${f.id}-plaque.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
          }
          resolve();
        }, "image/png");
      });
    } catch {
      /* export failed silently */
    } finally {
      setDownloading(false);
    }
  }

  async function nativeShare() {
    const title = `${t(f.displayName, lang)} — Hall of Legends`;
    const text = f.extended?.keyLesson ? t(f.extended.keyLesson, lang) : t(f.fact, lang);
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  }

  return (
    <div className="grid gap-5 sm:grid-cols-[minmax(0,260px)_1fr] items-center">
      {/* Plaque preview */}
      <div
        className="rounded-2xl overflow-hidden border mx-auto w-full max-w-[260px]"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 38%, var(--border))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <img
          src={dataUrl}
          alt={`${t(f.displayName, lang)} — ${headingLabel}`}
          className="block w-full h-auto"
          loading="lazy"
          width={W}
          height={H}
        />
      </div>

      {/* Share controls */}
      <div className="min-w-0">
        <div
          className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1.5"
          style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))" }}
        >
          {headingLabel}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{introLabel}</p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={downloadPng}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:opacity-60 min-h-11"
            style={{ background: "var(--gradient-warm)" }}
          >
            <span aria-hidden>⬇</span>
            {downloading ? downloadingLabel : downloadLabel}
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:border-primary/50 min-h-11"
            style={{
              borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
              background: "color-mix(in oklab, var(--brand-gold) 8%, var(--card))",
              color: "var(--brand-gold-deep)",
            }}
          >
            <span aria-hidden>{copied ? "✓" : "🔗"}</span>
            {copied ? copiedLabel : copyLabel}
          </button>
          <button
            type="button"
            onClick={nativeShare}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:border-primary/50 min-h-11"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <span aria-hidden>↗</span>
            {shareLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePlaque;
