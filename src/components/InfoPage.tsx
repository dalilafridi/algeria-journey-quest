/**
 * Shared layout for the institutional pages (/about, /sources, /privacy,
 * /terms). Reuses the museum's existing tokens and typography: one visible
 * H1, quiet section plaques, correct direction for Arabic.
 */
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import type { Lang } from "@/lib/i18n";

export interface InfoSection {
  heading: Record<Lang, string>;
  paras?: Record<Lang, string>[];
  bullets?: Record<Lang, string>[];
  postBullets?: Record<Lang, string>[];
}

export function InfoPage({
  lang,
  kicker,
  title,
  intro,
  sections,
  children,
}: {
  lang: Lang;
  kicker: Record<Lang, string>;
  title: Record<Lang, string>;
  intro: Record<Lang, string>;
  sections: InfoSection[];
  children?: ReactNode;
}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <div className="min-h-dvh" dir={dir}>
      <Header />
      <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-10 safe-pb">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {kicker[lang]}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{title[lang]}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro[lang]}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.heading.en} className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">{s.heading[lang]}</h2>
              {s.paras?.map((p) => (
                <p key={p.en} className="text-sm leading-7 text-foreground/85 sm:text-base">
                  {p[lang]}
                </p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul className="list-disc space-y-2 ps-5 text-sm leading-7 text-foreground/85 sm:text-base">
                  {s.bullets.map((b) => (
                    <li key={b.en}>{b[lang]}</li>
                  ))}
                </ul>
              )}
              {s.postBullets?.map((p) => (
                <p key={p.en} className="text-sm leading-7 text-foreground/85 sm:text-base">
                  {p[lang]}
                </p>
              ))}
            </section>
          ))}
        </div>

        {children}
      </main>
    </div>
  );
}

/** Quiet plaque used for contact and cross-links at the end of a page. */
export function InfoPlaque({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 rounded-xl border border-border bg-card/70 p-5 text-sm leading-7 text-foreground/85">
      {children}
    </div>
  );
}
