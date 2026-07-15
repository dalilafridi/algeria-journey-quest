/**
 * Museum Audio Guide — presentation layer.
 *
 * Exports:
 * - <AudioGuideButton />   the gold "play the audio guide" button placed on
 *                          any exhibit page (figure / era / region / topic).
 * - <AudioMiniPlayer />    the floating bottom player, mounted once at the
 *                          app root by src/routes/__root.tsx.
 * - <GuideParagraph />     an optional wrapper that gently highlights the
 *                          paragraph currently being narrated.
 */

import { Link } from "@tanstack/react-router";
import { Headphones, Pause, Play, RotateCcw, SkipBack, SkipForward, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  useAudioGuide,
  type AudioGuide,
  type PlaybackSpeed,
} from "@/lib/audioGuide";
import { cn } from "@/lib/utils";

// ---------- Gold play button ----------

export function AudioGuideButton({
  guide,
  label,
  className,
}: {
  guide: AudioGuide;
  label?: string;
  className?: string;
}) {
  const { play, pause, resume, isActive, status } = useAudioGuide();
  const active = isActive(guide.id);
  const isPlaying = active && status === "playing";
  const isPaused = active && status === "paused";
  const isLoading = active && status === "loading";

  const onClick = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      void resume();
    } else {
      void play(guide);
    }
  };

  const text =
    isPlaying
      ? "Pause audio guide"
      : isPaused
        ? "Resume audio guide"
        : isLoading
          ? "Preparing narration…"
          : (label ?? "Listen to this exhibit");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={text}
      aria-pressed={isPlaying}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full py-2 ps-2 pe-4 text-sm font-semibold transition-all",
        "border border-[color:oklch(0.72_0.13_82_/_0.55)] shadow-[0_10px_30px_-10px_color-mix(in_oklab,oklch(0.82_0.13_82)_55%,transparent)]",
        "hover:scale-[1.02] active:scale-[0.98]",
        active
          ? "bg-[oklch(0.14_0.02_60)] text-[oklch(0.92_0.03_82)]"
          : "bg-[oklch(0.18_0.02_55)]/85 backdrop-blur text-[oklch(0.92_0.03_82)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.92 0.12 82) 0%, oklch(0.72 0.13 78) 55%, oklch(0.42 0.09 65) 100%)",
          color: "#1a120a",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1px color-mix(in oklab, oklch(0.82 0.13 82) 55%, black)",
        }}
      >
        {isLoading ? (
          <span className="block w-3.5 h-3.5 rounded-full border-2 border-[#1a120a] border-t-transparent animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" fill="currentColor" />
        ) : (
          <Play className="w-4 h-4 ms-0.5" fill="currentColor" />
        )}
      </span>
      <Headphones className="w-4 h-4 opacity-70" aria-hidden />
      <span className="tracking-wide">{text}</span>
    </button>
  );
}

// ---------- Floating mini player ----------

const SPEEDS: PlaybackSpeed[] = [0.75, 1, 1.25];

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioMiniPlayer() {
  const {
    guide,
    status,
    index,
    speed,
    progress,
    error,
    pause,
    resume,
    replay,
    next,
    prev,
    setSpeed,
    close,
  } = useAudioGuide();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !guide) return null;

  const total = guide.segments.length;
  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const durationLabel =
    progress.duration > 0 ? fmt(progress.duration) : "—";
  const pct =
    progress.duration > 0
      ? Math.min(100, (progress.current / progress.duration) * 100)
      : isLoading
        ? 8
        : 0;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] pointer-events-none pb-[max(env(safe-area-inset-bottom),0.75rem)] px-3"
      role="region"
      aria-label="Museum audio guide"
    >
      <div
        className="pointer-events-auto mx-auto max-w-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.02 55) 0%, oklch(0.1 0.02 55) 100%)",
          border: "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 30%, transparent)",
          boxShadow:
            "0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 color-mix(in oklab, oklch(0.82 0.13 82) 15%, transparent)",
          color: "oklch(0.92 0.03 82)",
        }}
      >
        {/* Progress ribbon */}
        <div className="relative h-[3px] bg-white/5">
          <div
            className="absolute inset-y-0 left-0 transition-[width] duration-200"
            style={{
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, oklch(0.82 0.13 82), oklch(0.72 0.11 78))",
              boxShadow: "0 0 12px oklch(0.82 0.13 82 / 0.6)",
            }}
          />
        </div>

        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
          {/* Gold play/pause */}
          <button
            type="button"
            onClick={() => (isPlaying ? pause() : void resume())}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-transform active:scale-95"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.92 0.12 82) 0%, oklch(0.72 0.13 78) 55%, oklch(0.42 0.09 65) 100%)",
              color: "#1a120a",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1px color-mix(in oklab, oklch(0.82 0.13 82) 55%, black)",
            }}
          >
            {isLoading ? (
              <span className="block w-4 h-4 rounded-full border-2 border-[#1a120a] border-t-transparent animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 ms-0.5" fill="currentColor" />
            )}
          </button>

          {/* Title */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Headphones className="w-3.5 h-3.5 opacity-70 shrink-0" aria-hidden />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-70">
                Audio guide
              </span>
            </div>
            {guide.href ? (
              <Link
                to={guide.href}
                className="block text-sm font-semibold leading-tight truncate hover:underline underline-offset-2"
              >
                {guide.title}
              </Link>
            ) : (
              <div className="text-sm font-semibold leading-tight truncate">
                {guide.title}
              </div>
            )}
            <div className="text-[11px] opacity-70 mt-0.5 truncate font-mono">
              {fmt(progress.current)} / {durationLabel}
              <span className="mx-2 opacity-40">·</span>
              {index + 1}/{total}
              {error && (
                <span className="ms-2 text-[oklch(0.75_0.16_28)]">· {error}</span>
              )}
            </div>
          </div>

          {/* Transport */}
          <div className="hidden sm:flex items-center gap-1">
            <IconBtn onClick={() => void prev()} disabled={index <= 0} label="Previous section">
              <SkipBack className="w-4 h-4" />
            </IconBtn>
            <IconBtn onClick={() => void replay()} label="Replay this section">
              <RotateCcw className="w-4 h-4" />
            </IconBtn>
            <IconBtn
              onClick={() => void next()}
              disabled={index >= total - 1}
              label="Next section"
            >
              <SkipForward className="w-4 h-4" />
            </IconBtn>
          </div>

          {/* Speed */}
          <div
            role="group"
            aria-label="Playback speed"
            className="hidden sm:flex items-center rounded-full p-0.5"
            style={{
              background: "color-mix(in oklab, oklch(0.82 0.13 82) 10%, transparent)",
              border: "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 25%, transparent)",
            }}
          >
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10.5px] font-semibold tracking-wide transition",
                  speed === s
                    ? "bg-[oklch(0.82_0.13_82)] text-[#1a120a]"
                    : "text-[oklch(0.92_0.03_82)]/70 hover:text-[oklch(0.92_0.03_82)]",
                )}
                aria-pressed={speed === s}
              >
                {s}×
              </button>
            ))}
          </div>

          {/* Close */}
          <IconBtn onClick={close} label="Close audio guide">
            <X className="w-4 h-4" />
          </IconBtn>
        </div>

        {/* Mobile transport row */}
        <div className="flex sm:hidden items-center justify-between gap-1 px-2 pb-2">
          <IconBtn onClick={() => void prev()} disabled={index <= 0} label="Previous section">
            <SkipBack className="w-4 h-4" />
          </IconBtn>
          <IconBtn onClick={() => void replay()} label="Replay this section">
            <RotateCcw className="w-4 h-4" />
          </IconBtn>
          <IconBtn
            onClick={() => void next()}
            disabled={index >= total - 1}
            label="Next section"
          >
            <SkipForward className="w-4 h-4" />
          </IconBtn>
          <div
            role="group"
            aria-label="Playback speed"
            className="flex items-center rounded-full p-0.5 ms-auto"
            style={{
              background: "color-mix(in oklab, oklch(0.82 0.13 82) 10%, transparent)",
              border: "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 25%, transparent)",
            }}
          >
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10.5px] font-semibold tracking-wide transition",
                  speed === s
                    ? "bg-[oklch(0.82_0.13_82)] text-[#1a120a]"
                    : "text-[oklch(0.92_0.03_82)]/70 hover:text-[oklch(0.92_0.03_82)]",
                )}
                aria-pressed={speed === s}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full transition",
        "text-[oklch(0.92_0.03_82)]/85 hover:text-[oklch(0.92_0.03_82)]",
        "hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none",
      )}
    >
      {children}
    </button>
  );
}

// ---------- Optional paragraph highlighter ----------

export function GuideParagraph({
  guideId,
  segmentId,
  children,
  className,
}: {
  guideId: string;
  segmentId: string;
  children: ReactNode;
  className?: string;
}) {
  const { guide, activeSegmentId } = useAudioGuide();
  const active = guide?.id === guideId && activeSegmentId === segmentId;
  return (
    <div
      data-audio-active={active || undefined}
      className={cn(
        "transition-all duration-300 rounded-md",
        active
          ? "bg-[oklch(0.82_0.13_82_/_0.12)] shadow-[inset_2px_0_0_oklch(0.82_0.13_82)] ps-3"
          : "",
        className,
      )}
    >
      {children}
    </div>
  );
}
