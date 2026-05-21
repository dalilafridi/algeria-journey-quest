import { useEffect, useState } from "react";

const KEY = "dz-showcase-mode-v1";
const EVT = "showcase-updated";

export function isShowcaseOn(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("showcase-on");
}

export function setShowcase(on: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("showcase-on", on);
  try {
    if (on) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(EVT));
}

/** Hook for components that want to react to showcase state changes. */
export function useShowcase(): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState<boolean>(() => isShowcaseOn());
  useEffect(() => {
    const update = () => setOn(isShowcaseOn());
    update();
    window.addEventListener(EVT, update);
    return () => window.removeEventListener(EVT, update);
  }, []);
  return [on, setShowcase];
}
