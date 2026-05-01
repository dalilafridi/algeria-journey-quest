import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const KEY = "atte-signature-intro-shown-v1";

const LINES = {
  en: "Every land has a story… this is Algeria's.",
  fr: "Chaque terre a une histoire… voici celle de l'Algérie.",
  ar: "لكل أرض قصة… وهذه قصة الجزائر.",
} as const;

/**
 * Signature poetic entry moment.
 * - Non-blocking (pointer-events: none)
 * - Once per browser session
 * - Fades in, holds ~1.4s, fades out
 */
export function SignatureIntro() {
  const lang = useLang();
  const [phase, setPhase] = useState<"idle" | "in" | "out" | "gone">("idle");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* noop */
    }
    // Slight delay so it appears after the splash
    const t1 = setTimeout(() => setPhase("in"), 400);
    const t2 = setTimeout(() => setPhase("out"), 1900);
    const t3 = setTimeout(() => setPhase("gone"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "idle" || phase === "gone") return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center px-6"
      aria-hidden
    >
      <p
        className="max-w-2xl text-center text-xl sm:text-2xl md:text-3xl font-semibold leading-snug"
        style={{
          color: "color-mix(in oklab, var(--foreground) 92%, var(--primary))",
          textShadow: "0 1px 24px color-mix(in oklab, var(--background) 70%, transparent)",
          opacity: phase === "in" ? 1 : 0,
          transform: phase === "in" ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 700ms ease, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
          fontFamily: lang === "ar" ? undefined : "Georgia, 'Times New Roman', serif",
          letterSpacing: "0.005em",
        }}
      >
        {LINES[lang]}
      </p>
    </div>
  );
}

export default SignatureIntro;
