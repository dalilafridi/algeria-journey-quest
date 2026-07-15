import { Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { t, useLang, type Lang } from "@/lib/i18n";
import { pickOnThisDay, type OnThisDayEntry } from "@/data/onThisDay";

const SERIF = "Georgia, 'Times New Roman', serif";

const TXT = {
  eyebrow: {
    en: "On this day in Algerian history",
    fr: "Ce jour dans l'histoire algérienne",
    ar: "في هذا اليوم من التاريخ الجزائري",
  },
  figure: { en: "Figure of the day", fr: "Figure du jour", ar: "شخصية اليوم" },
  exhibit: { en: "Related exhibit", fr: "Vitrine associée", ar: "المعرض المرتبط" },
  open: { en: "Open exhibit →", fr: "Ouvrir la vitrine →", ar: "افتح المعرض →" },
  openFigure: { en: "Meet the figure →", fr: "Rencontrer la figure →", ar: "تعرّف على الشخصية →" },
  share: { en: "Share postcard", fr: "Partager la carte", ar: "شارك البطاقة" },
  preview: { en: "Preview postcard", fr: "Aperçu de la carte", ar: "معاينة البطاقة" },
  download: { en: "Download postcard", fr: "Télécharger la carte", ar: "تحميل البطاقة" },
  copy: { en: "Copy caption", fr: "Copier la légende", ar: "نسخ التسمية" },
  copied: { en: "Copied", fr: "Copié", ar: "تم النسخ" },
  close: { en: "Close", fr: "Fermer", ar: "إغلاق" },
  from: { en: "from Algeria Through Time", fr: "depuis Algeria Through Time", ar: "من Algeria Through Time" },
  postcardFrom: {
    en: "A postcard from the museum",
    fr: "Une carte postale du musée",
    ar: "بطاقة من المتحف",
  },
} as const;

function useTt() {
  const lang = useLang();
  return { lang, T: (k: keyof typeof TXT) => t(TXT[k], lang) };
}

/* ============================================================ */
/* Home card                                                    */
/* ============================================================ */

export function OnThisDayCard() {
  const { lang, T } = useTt();
  const [previewOpen, setPreviewOpen] = useState(false);
  const entry = useMemo(() => pickOnThisDay(new Date()), []);

  const dateLabel = formatDate(entry, lang);

  return (
    <section className="mx-auto max-w-5xl px-4 pt-10 sm:pt-12">
      <div
        className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 animate-fade-in"
        style={{
          borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--card) 96%, transparent), color-mix(in oklab, var(--card) 88%, transparent))",
          boxShadow: "var(--shadow-soft, 0 20px 60px -30px rgba(0,0,0,0.35))",
        }}
      >
        {/* Gold vertical rule */}
        <div
          className="absolute inset-y-0 start-0 w-1.5"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--accent) 90%, transparent), color-mix(in oklab, var(--primary) 60%, transparent), color-mix(in oklab, var(--accent) 40%, transparent))",
          }}
          aria-hidden
        />

        <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-start">
          {/* Medallion */}
          <div className="justify-self-start md:justify-self-auto">
            <Medallion emoji={entry.medallionEmoji} size={96} />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "color-mix(in oklab, var(--accent-foreground, currentColor) 80%, transparent)" }}
            >
              {T("eyebrow")}
            </div>
            <div
              className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground"
              style={{ fontFamily: SERIF }}
            >
              {dateLabel}
            </div>
            <p
              className="mt-3 text-lg sm:text-xl leading-relaxed text-foreground/95"
              style={{ fontFamily: SERIF }}
            >
              {t(entry.event, lang)}
            </p>

            {/* Figure + exhibit chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                to="/figures/$figureId"
                params={{ figureId: entry.figureId }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-foreground hover:border-amber-500/60 hover:bg-amber-500/5 transition"
                style={{ fontFamily: SERIF }}
              >
                <span className="text-muted-foreground">{T("figure")}:</span>
                <span className="font-semibold">{t(entry.figureName, lang)}</span>
              </Link>
              <ExhibitLink entry={entry} label={T("exhibit") + ": " + t(entry.exhibitLabel, lang)} />
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
                style={{
                  background: "var(--gradient-warm, linear-gradient(135deg, #b8860b, #d4af37))",
                  boxShadow: "var(--shadow-glow, 0 10px 30px -10px rgba(184,134,11,0.5))",
                }}
              >
                <IconPostcard />
                {T("share")}
              </button>
              <ExhibitCTA entry={entry} />
            </div>
          </div>

          {/* Decorative side seal (desktop) */}
          <div className="hidden md:flex flex-col items-center justify-start gap-1 text-amber-700 dark:text-amber-300">
            <span className="text-2xl" style={{ fontFamily: SERIF }}>⚜</span>
            <span
              className="text-[9px] uppercase tracking-[0.35em] opacity-80"
              style={{ fontFamily: SERIF }}
            >
              {T("postcardFrom")}
            </span>
          </div>
        </div>
      </div>

      {previewOpen && (
        <PostcardModal entry={entry} onClose={() => setPreviewOpen(false)} />
      )}
    </section>
  );
}

/* ============================================================ */
/* Sub-components                                                */
/* ============================================================ */

function ExhibitLink({ entry, label }: { entry: OnThisDayEntry; label: string }) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-foreground hover:border-amber-500/60 hover:bg-amber-500/5 transition";
  if (entry.exhibit.kind === "era") {
    return (
      <Link to="/era/$eraId" params={{ eraId: entry.exhibit.id }} className={cls} style={{ fontFamily: SERIF }}>
        {label}
      </Link>
    );
  }
  if (entry.exhibit.kind === "region") {
    return (
      <Link
        to="/region/$regionId"
        params={{ regionId: entry.exhibit.id }}
        className={cls}
        style={{ fontFamily: SERIF }}
      >
        {label}
      </Link>
    );
  }
  return (
    <Link
      to="/figures/$figureId"
      params={{ figureId: entry.exhibit.id }}
      className={cls}
      style={{ fontFamily: SERIF }}
    >
      {label}
    </Link>
  );
}

function ExhibitCTA({ entry }: { entry: OnThisDayEntry }) {
  const { T } = useTt();
  const cls =
    "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition";
  const label = entry.exhibit.kind === "figure" ? T("openFigure") : T("open");
  if (entry.exhibit.kind === "era") {
    return (
      <Link to="/era/$eraId" params={{ eraId: entry.exhibit.id }} className={cls} style={{ fontFamily: SERIF }}>
        {label}
      </Link>
    );
  }
  if (entry.exhibit.kind === "region") {
    return (
      <Link to="/region/$regionId" params={{ regionId: entry.exhibit.id }} className={cls} style={{ fontFamily: SERIF }}>
        {label}
      </Link>
    );
  }
  return (
    <Link to="/figures/$figureId" params={{ figureId: entry.exhibit.id }} className={cls} style={{ fontFamily: SERIF }}>
      {label}
    </Link>
  );
}

function IconPostcard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="6" y1="10" x2="9" y2="10" />
      <line x1="6" y1="14" x2="9" y2="14" />
    </svg>
  );
}

/**
 * Engraved bronze medallion — matches the project's emblem system.
 */
function Medallion({ emoji, size = 96 }: { emoji: string; size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 30% 25%, #f5d78b 0%, #d4af37 45%, #8b6914 100%)",
        boxShadow:
          "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.35), 0 8px 24px -8px rgba(0,0,0,0.45)",
      }}
      aria-hidden
    >
      <div
        className="absolute rounded-full"
        style={{
          inset: 6,
          border: "1px solid rgba(59, 30, 6, 0.35)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      />
      <span
        style={{
          fontSize: size * 0.4,
          filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.35)) drop-shadow(0 -1px 0 rgba(0,0,0,0.35))",
        }}
      >
        {emoji}
      </span>
    </div>
  );
}

/* ============================================================ */
/* Postcard modal + canvas rendering                             */
/* ============================================================ */

function PostcardModal({ entry, onClose }: { entry: OnThisDayEntry; onClose: () => void }) {
  const { lang, T } = useTt();
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dateLabel = formatDate(entry, lang);
  const caption =
    `“${t(entry.event, lang)}” — ${dateLabel}\n` +
    `— ${t(entry.figureName, lang)} · ${t(TXT.from, lang)}`;

  const downloadPostcard = async () => {
    const canvas = renderPostcardCanvas(entry, lang);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `algeria-through-time-${entry.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Also try native share when available.
    if (navigator.canShare) {
      try {
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png"),
        );
        if (blob) {
          const file = new File([blob], `${entry.id}.png`, { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: t(TXT.postcardFrom, lang),
              text: caption,
              files: [file],
            });
          }
        }
      } catch {
        // Silent — the download already worked.
      }
    }
  };

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={T("preview")}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-background p-4 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div
            className="text-xs uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300"
            style={{ fontFamily: SERIF }}
          >
            {T("preview")}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label={T("close")}
          >
            ✕
          </button>
        </div>

        <PostcardPreview entry={entry} lang={lang} />

        <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
          <button
            type="button"
            onClick={copyCaption}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-muted transition"
            style={{ fontFamily: SERIF }}
          >
            {copied ? T("copied") : T("copy")}
          </button>
          <button
            type="button"
            onClick={downloadPostcard}
            className="rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            style={{
              background: "var(--gradient-warm, linear-gradient(135deg, #b8860b, #d4af37))",
              boxShadow: "var(--shadow-glow, 0 10px 30px -10px rgba(184,134,11,0.5))",
            }}
          >
            {T("download")}
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

/**
 * DOM preview of the postcard (what the user sees in the modal).
 * The actual downloaded PNG is drawn separately on <canvas> for pixel-perfect
 * sizing (1200×750), but the visual language is identical.
 */
function PostcardPreview({ entry, lang }: { entry: OnThisDayEntry; lang: Lang }) {
  const dateLabel = formatDate(entry, lang);
  const { T } = useTt();
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        aspectRatio: "8 / 5",
        background:
          "radial-gradient(ellipse at 20% 15%, #fbf3d9 0%, #f2e3b8 45%, #e6d19a 100%)",
        boxShadow: "inset 0 0 0 6px #d4af37, inset 0 0 0 8px rgba(0,0,0,0.15), 0 20px 60px -30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Corner flourishes */}
      <Flourish position="tl" />
      <Flourish position="tr" />
      <Flourish position="bl" />
      <Flourish position="br" />

      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col text-[#3b2a10]">
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.28em]" style={{ fontFamily: SERIF }}>
          <span>{T("eyebrow")}</span>
          <span>ⵣ</span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Medallion emoji={entry.medallionEmoji} size={56} />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.28em] opacity-70" style={{ fontFamily: SERIF }}>
              {dateLabel}
            </div>
            <div className="text-base sm:text-lg font-semibold leading-tight" style={{ fontFamily: SERIF }}>
              {t(entry.figureName, lang)}
            </div>
          </div>
        </div>

        <p
          className="mt-4 text-sm sm:text-base leading-relaxed"
          style={{ fontFamily: SERIF }}
        >
          {t(entry.event, lang)}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="text-[10px] sm:text-xs italic opacity-70" style={{ fontFamily: SERIF }}>
            {t(entry.imageCaption, lang)}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.28em] opacity-80" style={{ fontFamily: SERIF }}>
            {t(TXT.from, lang)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Flourish({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const style: React.CSSProperties = { position: "absolute", width: 42, height: 42, color: "#8b6914", opacity: 0.6 };
  if (position === "tl") { style.top = 12; style.left = 12; }
  if (position === "tr") { style.top = 12; style.right = 12; style.transform = "scaleX(-1)"; }
  if (position === "bl") { style.bottom = 12; style.left = 12; style.transform = "scaleY(-1)"; }
  if (position === "br") { style.bottom = 12; style.right = 12; style.transform = "scale(-1,-1)"; }
  return (
    <svg viewBox="0 0 40 40" style={style} aria-hidden>
      <path d="M4 4 L20 4 M4 4 L4 20 M4 4 Q14 14 20 20" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="4" cy="4" r="1.6" fill="currentColor" />
    </svg>
  );
}

/* ============================================================ */
/* Canvas renderer (PNG download)                                */
/* ============================================================ */

function renderPostcardCanvas(entry: OnThisDayEntry, lang: Lang): HTMLCanvasElement {
  const W = 1200;
  const H = 750;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Parchment gradient
  const grad = ctx.createRadialGradient(W * 0.25, H * 0.2, 60, W * 0.5, H * 0.6, W);
  grad.addColorStop(0, "#fbf3d9");
  grad.addColorStop(0.5, "#f2e3b8");
  grad.addColorStop(1, "#e6d19a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle grain
  ctx.save();
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = Math.random() < 0.5 ? "#8b6914" : "#c9a34a";
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }
  ctx.restore();

  // Gold border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, W - 40, H - 40);
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 2;
  ctx.strokeRect(35, 35, W - 70, H - 70);

  // Corner flourishes
  ctx.strokeStyle = "#8b6914";
  ctx.lineWidth = 2;
  const drawFlourish = (x: number, y: number, sx: number, sy: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sx, sy);
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(48, 0);
    ctx.moveTo(0, 0); ctx.lineTo(0, 48);
    ctx.moveTo(0, 0); ctx.quadraticCurveTo(30, 30, 48, 48);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#8b6914";
    ctx.fill();
    ctx.restore();
  };
  drawFlourish(60, 60, 1, 1);
  drawFlourish(W - 60, 60, -1, 1);
  drawFlourish(60, H - 60, 1, -1);
  drawFlourish(W - 60, H - 60, -1, -1);

  const isRTL = lang === "ar";
  ctx.direction = isRTL ? "rtl" : "ltr";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#3b2a10";

  const leftX = isRTL ? W - 90 : 90;
  const rightX = isRTL ? 90 : W - 90;
  ctx.textAlign = isRTL ? "right" : "left";

  // Eyebrow
  ctx.fillStyle = "#6b4a0f";
  ctx.font = "600 22px Georgia, 'Times New Roman', serif";
  ctx.fillText(t(TXT.eyebrow, lang).toUpperCase(), leftX, 80);

  // Right sigil
  ctx.textAlign = isRTL ? "left" : "right";
  ctx.font = "36px Georgia, serif";
  ctx.fillText("ⵣ", rightX, 70);

  // Medallion
  const medX = isRTL ? W - 150 : 150;
  const medY = 165;
  drawMedallion(ctx, medX, medY, 60, entry.medallionEmoji);

  // Date + figure
  ctx.textAlign = isRTL ? "right" : "left";
  ctx.fillStyle = "#6b4a0f";
  ctx.font = "500 18px Georgia, serif";
  const infoX = isRTL ? W - 230 : 230;
  ctx.fillText(formatDate(entry, lang).toUpperCase(), infoX, 145);
  ctx.fillStyle = "#3b2a10";
  ctx.font = "700 34px Georgia, serif";
  ctx.fillText(t(entry.figureName, lang), infoX, 175);

  // Event text — wrap
  ctx.fillStyle = "#2b1e08";
  ctx.font = "500 26px Georgia, serif";
  const lineHeight = 38;
  const maxWidth = W - 180;
  const eventText = t(entry.event, lang);
  const wrapX = isRTL ? W - 90 : 90;
  wrapText(ctx, eventText, wrapX, 300, maxWidth, lineHeight);

  // Footer caption + source
  ctx.fillStyle = "#6b4a0f";
  ctx.font = "italic 20px Georgia, serif";
  ctx.textAlign = isRTL ? "right" : "left";
  ctx.fillText(t(entry.imageCaption, lang), leftX, H - 110);

  ctx.font = "600 18px Georgia, serif";
  ctx.textAlign = isRTL ? "left" : "right";
  ctx.fillText(t(TXT.from, lang).toUpperCase(), rightX, H - 110);

  // Bottom rule
  ctx.strokeStyle = "#c9a34a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(90, H - 80);
  ctx.lineTo(W - 90, H - 80);
  ctx.stroke();

  // Exhibit line
  ctx.fillStyle = "#8b6914";
  ctx.font = "500 16px Georgia, serif";
  ctx.textAlign = isRTL ? "right" : "left";
  ctx.fillText(t(entry.exhibitLabel, lang), leftX, H - 65);

  return canvas;
}

function drawMedallion(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  emoji: string,
) {
  const grad = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.4, r * 0.1, cx, cy, r);
  grad.addColorStop(0, "#f5d78b");
  grad.addColorStop(0.45, "#d4af37");
  grad.addColorStop(1, "#8b6914");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "rgba(59,30,6,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${Math.floor(r * 0.9)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", Georgia, serif`;
  ctx.fillText(emoji, cx, cy + 2);
  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(/\s+/);
  let line = "";
  let cursorY = y;
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + " " + words[i] : words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = words[i];
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursorY);
}

/* ============================================================ */
/* Helpers                                                       */
/* ============================================================ */

function formatDate(entry: OnThisDayEntry, lang: Lang): string {
  const locale = lang === "fr" ? "fr-FR" : lang === "ar" ? "ar" : "en-US";
  const monthName = new Date(2000, entry.month - 1, entry.day).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
  });
  const yearLabel = entry.yearLabel ?? String(entry.year);
  return `${monthName} · ${yearLabel}`;
}
