import { useEffect } from "react";

/**
 * MotionReveal — Phase 9
 *
 * Mounts a single, app-wide IntersectionObserver that toggles a
 * `data-revealed` attribute on any element marked with `[data-reveal]`.
 * Pairs with the CSS in styles.css (Phase 9 block) to produce a calm,
 * cinematic fade/slide-in as content scrolls into view.
 *
 * Cheap: one observer, observes lazily via MutationObserver so new
 * routes are picked up without re-mounting. Fully respects
 * prefers-reduced-motion (CSS short-circuits the animation).
 */
export function MotionReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        // Stagger siblings slightly for cinematic rhythm.
        if (!n.style.getPropertyValue("--reveal-delay")) {
          n.style.setProperty("--reveal-delay", `${Math.min(i * 40, 320)}ms`);
        }
        observer.observe(n);
      });
    };

    scan();

    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

export default MotionReveal;
