/**
 * Museum Audio Guide — global playback engine.
 *
 * A single <audio> element lives at the app root so playback survives page
 * navigation. Exhibits (figures, eras, regions, cultural topics) hand the
 * guide a title + an ordered list of "segments" (paragraphs). Each segment
 * is fetched on demand from the Lovable AI text-to-speech server function,
 * cached in memory, and the next segment is prefetched while the current
 * one plays. The active segment id is broadcast so <GuideParagraph>
 * wrappers can highlight themselves in sync with the narration.
 *
 * Lock-screen / background: uses the MediaSession API so iOS/Android show
 * artwork, title, and transport controls, and continues playback when the
 * screen locks (subject to browser autoplay/background policies).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateSpeech } from "./tts.functions";

// ---------- Types ----------

export type AudioGuideSegment = {
  /** Stable id used by <GuideParagraph> to highlight the active paragraph. */
  id: string;
  /** Plain narration text. Keep each segment roughly one paragraph (<800 chars). */
  text: string;
};

export type AudioGuide = {
  /** Stable exhibit id (e.g. `figure:massinissa`, `era:numidia`). */
  id: string;
  title: string;
  subtitle?: string;
  /** Optional back-link surfaced by the mini player (e.g. `/figures/$id`). */
  href?: string;
  /** Optional artwork URL for MediaSession lock-screen art. */
  artwork?: string;
  segments: AudioGuideSegment[];
};

export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "ended";
export type PlaybackSpeed = 0.75 | 1 | 1.25;

type AudioGuideCtx = {
  guide: AudioGuide | null;
  status: PlayerStatus;
  index: number;
  activeSegmentId: string | null;
  speed: PlaybackSpeed;
  progress: { current: number; duration: number };
  error: string | null;
  isActive: (guideId: string) => boolean;
  play: (guide: AudioGuide) => Promise<void>;
  pause: () => void;
  resume: () => Promise<void>;
  replay: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  setSpeed: (s: PlaybackSpeed) => void;
  close: () => void;
};

const Ctx = createContext<AudioGuideCtx | null>(null);

// ---------- Provider ----------

export function AudioGuideProvider({ children }: { children: ReactNode }) {
  const generate = useServerFn(generateSpeech);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map()); // segId -> blob URL
  const prefetchingRef = useRef<Set<string>>(new Set());
  const currentTokenRef = useRef(0); // guards against stale async ops

  const [guide, setGuide] = useState<AudioGuide | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [index, setIndex] = useState(0);
  const [speed, setSpeedState] = useState<PlaybackSpeed>(1);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const [error, setError] = useState<string | null>(null);

  // Instantiate the shared audio element once, on the client only.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (audioRef.current) return;
    const a = new Audio();
    a.preload = "auto";
    (a as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  const cacheKey = useCallback(
    (guideId: string, seg: AudioGuideSegment) => `${guideId}::${seg.id}`,
    [],
  );

  const fetchSegment = useCallback(
    async (guideId: string, seg: AudioGuideSegment): Promise<string> => {
      const key = cacheKey(guideId, seg);
      const cached = cacheRef.current.get(key);
      if (cached) return cached;
      const res = await generate({ data: { text: seg.text } });
      const bytes = Uint8Array.from(atob(res.audio), (c) => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: res.mime });
      const url = URL.createObjectURL(blob);
      cacheRef.current.set(key, url);
      return url;
    },
    [cacheKey, generate],
  );

  const prefetchSegment = useCallback(
    (guideId: string, seg: AudioGuideSegment | undefined) => {
      if (!seg) return;
      const key = cacheKey(guideId, seg);
      if (cacheRef.current.has(key) || prefetchingRef.current.has(key)) return;
      prefetchingRef.current.add(key);
      fetchSegment(guideId, seg)
        .catch(() => {
          /* prefetch failures are non-fatal — retry on demand */
        })
        .finally(() => prefetchingRef.current.delete(key));
    },
    [cacheKey, fetchSegment],
  );

  // Set up MediaSession action handlers once.
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    ms.setActionHandler("play", () => {
      void internalResume();
    });
    ms.setActionHandler("pause", () => internalPause());
    ms.setActionHandler("previoustrack", () => {
      void internalStep(-1);
    });
    ms.setActionHandler("nexttrack", () => {
      void internalStep(1);
    });
    return () => {
      try {
        ms.setActionHandler("play", null);
        ms.setActionHandler("pause", null);
        ms.setActionHandler("previoustrack", null);
        ms.setActionHandler("nexttrack", null);
      } catch {
        /* older browsers */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMediaSession = useCallback((g: AudioGuide, i: number) => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: g.title,
        artist: g.subtitle ?? "Museum Audio Guide",
        album: "DZ Odyssey",
        artwork: g.artwork
          ? [{ src: g.artwork, sizes: "512x512", type: "image/png" }]
          : undefined,
      });
      navigator.mediaSession.playbackState = "playing";
      // Chapter position: index of N.
      void i;
    } catch {
      /* not supported */
    }
  }, []);

  // --- Playback primitives (referenced by MediaSession handlers above) ---

  const internalPause = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setStatus("paused");
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.playbackState = "paused";
      } catch {
        /* noop */
      }
    }
  }, []);

  const internalResume = useCallback(async () => {
    const a = audioRef.current;
    if (!a || !a.src) return;
    try {
      await a.play();
      setStatus("playing");
      if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
        try {
          navigator.mediaSession.playbackState = "playing";
        } catch {
          /* noop */
        }
      }
    } catch (e) {
      setError((e as Error).message || "Playback blocked by the browser.");
    }
  }, []);

  const playSegment = useCallback(
    async (g: AudioGuide, i: number, token: number) => {
      const a = audioRef.current;
      const seg = g.segments[i];
      if (!a || !seg) return;
      setStatus("loading");
      setError(null);
      try {
        const url = await fetchSegment(g.id, seg);
        if (token !== currentTokenRef.current) return;
        a.src = url;
        a.playbackRate = speed;
        await a.play();
        if (token !== currentTokenRef.current) return;
        setStatus("playing");
        updateMediaSession(g, i);
        prefetchSegment(g.id, g.segments[i + 1]);
      } catch (e) {
        if (token !== currentTokenRef.current) return;
        setError((e as Error).message || "Audio guide unavailable.");
        setStatus("paused");
      }
    },
    [fetchSegment, prefetchSegment, speed, updateMediaSession],
  );

  const internalStep = useCallback(
    async (dir: 1 | -1) => {
      if (!guide) return;
      const next = index + dir;
      if (next < 0 || next >= guide.segments.length) return;
      currentTokenRef.current += 1;
      setIndex(next);
      await playSegment(guide, next, currentTokenRef.current);
    },
    [guide, index, playSegment],
  );

  // Wire audio element listeners to state.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () =>
      setProgress({ current: a.currentTime || 0, duration: a.duration || 0 });
    const onEnded = () => {
      if (!guide) return;
      const nextIdx = index + 1;
      if (nextIdx < guide.segments.length) {
        currentTokenRef.current += 1;
        setIndex(nextIdx);
        void playSegment(guide, nextIdx, currentTokenRef.current);
      } else {
        setStatus("ended");
      }
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onTime);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onTime);
      a.removeEventListener("ended", onEnded);
    };
  }, [guide, index, playSegment]);

  // Keep playback rate in sync with speed changes.
  useEffect(() => {
    const a = audioRef.current;
    if (a) a.playbackRate = speed;
  }, [speed]);

  // ---------- Public API ----------

  const play = useCallback(
    async (g: AudioGuide) => {
      if (!g.segments.length) return;
      currentTokenRef.current += 1;
      setGuide(g);
      setIndex(0);
      await playSegment(g, 0, currentTokenRef.current);
    },
    [playSegment],
  );

  const replay = useCallback(async () => {
    const a = audioRef.current;
    if (!a || !guide) return;
    a.currentTime = 0;
    if (status !== "playing") await internalResume();
  }, [guide, internalResume, status]);

  const setSpeed = useCallback((s: PlaybackSpeed) => {
    setSpeedState(s);
  }, []);

  const close = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.src = "";
    }
    currentTokenRef.current += 1;
    setGuide(null);
    setStatus("idle");
    setIndex(0);
    setProgress({ current: 0, duration: 0 });
    setError(null);
    // Release blob URLs.
    cacheRef.current.forEach((url) => URL.revokeObjectURL(url));
    cacheRef.current.clear();
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = "none";
      } catch {
        /* noop */
      }
    }
  }, []);

  const isActive = useCallback((id: string) => guide?.id === id, [guide]);

  const activeSegmentId = guide?.segments[index]?.id ?? null;

  const value = useMemo<AudioGuideCtx>(
    () => ({
      guide,
      status,
      index,
      activeSegmentId,
      speed,
      progress,
      error,
      isActive,
      play,
      pause: internalPause,
      resume: internalResume,
      replay,
      next: () => internalStep(1),
      prev: () => internalStep(-1),
      setSpeed,
      close,
    }),
    [
      guide,
      status,
      index,
      activeSegmentId,
      speed,
      progress,
      error,
      isActive,
      play,
      internalPause,
      internalResume,
      replay,
      internalStep,
      setSpeed,
      close,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudioGuide(): AudioGuideCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useAudioGuide must be used inside <AudioGuideProvider>.");
  }
  return ctx;
}
