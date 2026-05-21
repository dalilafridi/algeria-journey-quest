import { useEffect } from "react";

/**
 * MotionReveal — Phase 9 (+ Phase 12 perf)
 *
 * One IntersectionObserver toggles `data-revealed="true"` on `[data-reveal]`
 * elements. After the transition finishes we clear inline `will-change` to
 * release the GPU layer. New routes are picked up via a throttled
 * MutationObserver so we don't re-scan on every minor DOM change.
 *
 * Honours prefers-reduced-motion (CSS short-circuits the animation).
 */
export function MotionReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onTransitionEnd = (e: TransitionEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.getAttribute("data-revealed") === "true") {
        target.style.willChange = "";
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.setAttribute("data-revealed", "true");
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])",
      );
      nodes.forEach((n, i) => {
        if (reduced) {
          n.setAttribute("data-revealed", "true");
          return;
        }
        if (!n.style.getPropertyValue("--reveal-delay")) {
          n.style.setProperty("--reveal-delay", `${Math.min(i * 40, 320)}ms`);
        }
        n.addEventListener("transitionend", onTransitionEnd, { once: true });
        observer.observe(n);
      });
    };

    scan();

    // Throttled MutationObserver — coalesce bursts of DOM changes into one scan.
    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    };
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

export default MotionReveal;
