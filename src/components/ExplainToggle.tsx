import { useExplainMode, type ExplainMode } from "@/lib/explainMode";
import { useLang } from "@/lib/i18n";

const LABELS = {
  simple: { en: "Simple", fr: "Simple", ar: "مبسّط" },
  deeper: { en: "Deeper", fr: "Approfondi", ar: "موسّع" },
  title: { en: "Explain it simply", fr: "Explique simplement", ar: "اشرح ببساطة" },
} as const;

export function ExplainToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const [mode, setMode] = useExplainMode();
  const opts: { v: ExplainMode; label: string }[] = [
    { v: "simple", label: LABELS.simple[lang] },
    { v: "deeper", label: LABELS.deeper[lang] },
  ];
  return (
    <div className={"inline-flex items-center gap-2 " + className}>
      <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
        {LABELS.title[lang]}
      </span>
      <div className="inline-flex rounded-full border border-border bg-card overflow-hidden text-xs font-bold">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => setMode(o.v)}
            className={
              "px-3 py-1.5 min-h-[32px] transition " +
              (mode === o.v
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground")
            }
            aria-pressed={mode === o.v}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
