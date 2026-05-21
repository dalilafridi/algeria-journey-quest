/**
 * Ambient atmosphere — a procedurally generated, museum-soft wind/air bed.
 * No external assets, no autoplay. Always opt-in, always low volume,
 * always fades in/out. Designed to feel like distant desert air, not music.
 */
import { useEffect, useState } from "react";

const KEY = "algeria-ambience-v1";
const EVT = "ambience-updated";
const TARGET_VOLUME = 0.06; // very low, museum-safe
const FADE_MS = 1400;

type AmbienceState = {
  ctx: AudioContext | null;
  master: GainNode | null;
  nodes: AudioNode[];
  raf: number | null;
};

const state: AmbienceState = { ctx: null, master: null, nodes: [], raf: null };

export function getAmbiencePref(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function createNoiseBuffer(ctx: AudioContext) {
  const length = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  // brown-ish noise — softer than white
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }
  return buffer;
}

function fadeGain(g: GainNode, to: number, ms: number) {
  const now = g.context.currentTime;
  g.gain.cancelScheduledValues(now);
  g.gain.setValueAtTime(g.gain.value, now);
  g.gain.linearRampToValueAtTime(to, now + ms / 1000);
}

async function start() {
  if (state.ctx) return;
  const Ctx =
    typeof window !== "undefined"
      ? (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)
      : null;
  if (!Ctx) return;
  const ctx = new Ctx();
  try {
    await ctx.resume();
  } catch {
    /* noop */
  }

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Layer 1: soft wind (brown noise → lowpass → slow LFO on gain)
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx);
  noise.loop = true;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 520;
  lp.Q.value = 0.4;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.55;

  // Slow LFO on filter cutoff for breathing motion
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(lp.frequency);
  lfo.start();

  noise.connect(lp).connect(noiseGain).connect(master);
  noise.start();

  // Layer 2: a barely-there drone (warm fifth) — adds cultural depth
  const droneA = ctx.createOscillator();
  droneA.type = "sine";
  droneA.frequency.value = 110; // A2
  const droneB = ctx.createOscillator();
  droneB.type = "sine";
  droneB.frequency.value = 164.81; // E3 (perfect fifth)
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.025;
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 380;
  droneA.connect(droneFilter);
  droneB.connect(droneFilter);
  droneFilter.connect(droneGain).connect(master);
  droneA.start();
  droneB.start();

  state.ctx = ctx;
  state.master = master;
  state.nodes = [noise, lp, noiseGain, lfo, lfoGain, droneA, droneB, droneFilter, droneGain];

  fadeGain(master, TARGET_VOLUME, FADE_MS);
}

function stop() {
  const { ctx, master, nodes } = state;
  if (!ctx || !master) return;
  fadeGain(master, 0, FADE_MS);
  const closeAt = ctx.currentTime + FADE_MS / 1000 + 0.05;
  nodes.forEach((n) => {
    const anyNode = n as AudioScheduledSourceNode;
    if (typeof anyNode.stop === "function") {
      try {
        anyNode.stop(closeAt);
      } catch {
        /* noop */
      }
    }
  });
  setTimeout(() => {
    try {
      ctx.close();
    } catch {
      /* noop */
    }
    state.ctx = null;
    state.master = null;
    state.nodes = [];
  }, FADE_MS + 200);
}

export function setAmbience(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {
    /* noop */
  }
  if (on) {
    void start();
  } else {
    stop();
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVT));
  }
}

export function useAmbience(): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState<boolean>(() => getAmbiencePref());
  useEffect(() => {
    const sync = () => setOn(getAmbiencePref());
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return [on, setAmbience];
}

/** Auto-pause when tab is hidden to be battery/respectful-friendly. */
export function bindAmbienceVisibility() {
  if (typeof document === "undefined") return;
  document.addEventListener("visibilitychange", () => {
    if (!state.master) return;
    fadeGain(state.master, document.hidden ? 0 : TARGET_VOLUME, 800);
  });
}
