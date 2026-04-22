import { useEffect, useState } from "react";

export type ExplainMode = "simple" | "deeper";

const KEY = "algeria-history-explain-mode-v1";
const EVT = "explain-mode-updated";

export function getExplainMode(): ExplainMode {
  if (typeof window === "undefined") return "simple";
  try {
    const v = localStorage.getItem(KEY);
    if (v === "simple" || v === "deeper") return v;
  } catch {
    /* noop */
  }
  return "simple";
}

export function setExplainMode(mode: ExplainMode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(EVT));
}

export function useExplainMode(): [ExplainMode, (m: ExplainMode) => void] {
  const [mode, setMode] = useState<ExplainMode>(() => getExplainMode());
  useEffect(() => {
    const update = () => setMode(getExplainMode());
    update();
    window.addEventListener(EVT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return [mode, (m: ExplainMode) => setExplainMode(m)];
}
