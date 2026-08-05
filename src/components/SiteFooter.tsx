/**
 * Subtle institutional footer, shown on every public page below the outlet.
 * Links to the four permanent institutional pages. Deliberately quiet: small
 * type, muted color, existing border and background tokens only.
 */
import { Link } from "@tanstack/react-router";
import { useLang, type Lang } from "@/lib/i18n";

const COPY = {
  label: { en: "Institutional", fr: "Institutionnel", ar: "معلومات مؤسسية" },
  about: { en: "About", fr: "À propos", ar: "حول المتحف" },
  sources: { en: "Sources & Method", fr: "Sources & méthode", ar: "المصادر والمنهج" },
  privacy: { en: "Privacy", fr: "Confidentialité", ar: "الخصوصية" },
  terms: { en: "Terms", fr: "Conditions", ar: "شروط الاستخدام" },
  credits: { en: "Credits", fr: "Crédits", ar: "الاعتمادات" },
  corrections: { en: "Corrections", fr: "Corrections", ar: "التصحيحات" },
  note: {
    en: "DZ Odyssey, an independent digital museum of Algeria.",
    fr: "DZ Odyssey, musée numérique indépendant de l'Algérie.",
    ar: "دي زد أوديسي، متحف رقمي مستقل عن الجزائر.",
  },
} as const satisfies Record<string, Record<Lang, string>>;

export function SiteFooter() {
  const lang = useLang();
  const linkClass =
    "rounded-full px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <footer className="border-t border-border/70 bg-background/60 print:hidden">
      <nav
        aria-label={COPY.label[lang]}
        className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-start"
      >
        <p className="text-xs text-muted-foreground/80">{COPY.note[lang]}</p>
        <ul className="flex flex-wrap items-center justify-center gap-1">
          <li>
            <Link to="/about" className={linkClass}>
              {COPY.about[lang]}
            </Link>
          </li>
          <li>
            <Link to="/sources" className={linkClass}>
              {COPY.sources[lang]}
            </Link>
          </li>
          <li>
            <Link to="/privacy" className={linkClass}>
              {COPY.privacy[lang]}
            </Link>
          </li>
          <li>
            <Link to="/terms" className={linkClass}>
              {COPY.terms[lang]}
            </Link>
          </li>
          <li>
            <Link to="/credits" className={linkClass}>
              {COPY.credits[lang]}
            </Link>
          </li>
          <li>
            <Link to="/about" hash="contact-corrections" className={linkClass}>
              {COPY.corrections[lang]}
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
