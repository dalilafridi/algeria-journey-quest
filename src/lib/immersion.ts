import { useEffect, useState } from "react";

const KEY = "algeria-immersion-v1";
const EVT = "immersion-updated";
const CLASS = "immersion-on";

export function getImmersion(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function applyImmersion(on: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle(CLASS, on);
}

export function setImmersion(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {
    /* noop */
  }
  applyImmersion(on);
  window.dispatchEvent(new Event(EVT));
}

export function useImmersion(): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState<boolean>(() => getImmersion());
  useEffect(() => {
    const sync = () => setOn(getImmersion());
    sync();
    applyImmersion(getImmersion());
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return [on, setImmersion];
}
