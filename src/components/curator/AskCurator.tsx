/**
 * Ask the Curator — museum-guide gallery panel.
 *
 * A single-conversation, session-only chat that answers strictly from the
 * museum corpus assembled server-side in `src/lib/curator/corpus.ts`.
 *
 * Visual language: opening the panel should feel like walking through a
 * doorway into another gallery — the museum softly blurs behind a warm
 * parchment veil while a panel slides in, appearing to emerge from the
 * museum wall rather than floating above it.
 */

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Send,
  X,
  RotateCcw,
  BookOpen,
  ScrollText,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

const SUGGESTIONS_BY_LANG = {
  en: [
    "Tell me about Jugurtha",
    "Who was Tin Hinan?",
    "Explain the Numidian Kingdom",
    "Tell me about Emir Abdelkader",
    "Compare the Almohads and Almoravids",
    "What happened during the Black Spring?",
  ],
  fr: [
    "Parle-moi de Jugurtha",
    "Qui était Tin Hinan ?",
    "Explique le royaume numide",
    "Parle-moi de l'Émir Abdelkader",
    "Compare les Almohades et les Almoravides",
    "Que s'est-il passé lors du Printemps noir ?",
  ],
  ar: [
    "حدّثني عن يوغرطة",
    "من هي تين هنان؟",
    "اشرح المملكة النوميدية",
    "حدّثني عن الأمير عبد القادر",
    "قارن بين الموحّدين والمرابطين",
    "ماذا حدث في الربيع الأسود؟",
  ],
} as const;

const THINKING_MESSAGES = {
  en: [
    "Consulting the archives…",
    "Cross-referencing historical sources…",
    "Examining the museum collections…",
    "Searching the catalog…",
  ],
  fr: [
    "Consultation des archives…",
    "Croisement des sources historiques…",
    "Examen des collections du musée…",
    "Recherche dans le catalogue…",
  ],
  ar: [
    "أتصفّح المحفوظات…",
    "أقارن المصادر التاريخية…",
    "أراجع مجموعات المتحف…",
    "أبحث في الفهرس…",
  ],
} as const;

const COPY = {
  en: {
    open: "Ask the Curator",
    kicker: "DZ Odyssey · Museum",
    title: "Ask the Curator",
    subtitle: "A guided voice from within the museum",
    empty:
      "Good day. I speak only from what the museum holds — its figures, eras, regions, culture, cuisine and events. Choose a question below, or ask your own.",
    suggestionsLabel: "Suggested inquiries",
    placeholder: "Ask about a person, era, region, artifact or event…",
    send: "Send",
    reset: "New conversation",
    close: "Close",
    footer:
      "The Curator draws from DZ Odyssey's verified museum archive. Answers may evolve as new discoveries are added.",
    exploreLabel: "Continue through the museum",
    explore: [
      { to: "/chronicle", label: "The Chronicle", hint: "Eras & timeline" },
      { to: "/atlas", label: "Atlas of Figures", hint: "Historical figures" },
      { to: "/map", label: "Regions", hint: "Places & geography" },
      { to: "/culture", label: "Culture & Cuisine", hint: "Living heritage" },
    ],
  },
  fr: {
    open: "Demander au conservateur",
    kicker: "DZ Odyssey · Musée",
    title: "Demander au conservateur",
    subtitle: "Une voix guide au cœur du musée",
    empty:
      "Bonjour. Je ne parle que de ce que renferme le musée — ses figures, époques, régions, culture, cuisine et événements. Choisissez une question ci-dessous, ou posez la vôtre.",
    suggestionsLabel: "Questions suggérées",
    placeholder: "Une personne, une époque, une région, un objet ou un événement…",
    send: "Envoyer",
    reset: "Nouvelle conversation",
    close: "Fermer",
    footer:
      "Le conservateur puise dans les archives vérifiées du musée DZ Odyssey. Les réponses évolueront au fil des nouvelles découvertes.",
    exploreLabel: "Continuer la visite",
    explore: [
      { to: "/chronicle", label: "La Chronique", hint: "Époques & frise" },
      { to: "/atlas", label: "Atlas des figures", hint: "Personnages" },
      { to: "/map", label: "Régions", hint: "Lieux & géographie" },
      { to: "/culture", label: "Culture & cuisine", hint: "Patrimoine vivant" },
    ],
  },
  ar: {
    open: "اسأل القيّم",
    kicker: "DZ Odyssey · المتحف",
    title: "اسأل القيّم",
    subtitle: "صوت مرشد من قلب المتحف",
    empty:
      "أهلاً بك. لا أتحدث إلا ممّا يحفظه المتحف — شخصياته وحقبه ومناطقه وثقافته ومطبخه وأحداثه. اختر سؤالاً أدناه، أو اطرح سؤالك.",
    suggestionsLabel: "أسئلة مقترحة",
    placeholder: "شخصية، حقبة، منطقة، أثر أو حدث…",
    send: "إرسال",
    reset: "محادثة جديدة",
    close: "إغلاق",
    footer:
      "يستند القيّم إلى أرشيف متحف DZ Odyssey الموثّق. قد تتطوّر الإجابات مع اكتشافات جديدة.",
    exploreLabel: "تابع التجوّل في المتحف",
    explore: [
      { to: "/chronicle", label: "السجل التاريخي", hint: "الحقب والخط الزمني" },
      { to: "/atlas", label: "أطلس الشخصيات", hint: "شخصيات تاريخية" },
      { to: "/map", label: "المناطق", hint: "الأماكن والجغرافيا" },
      { to: "/culture", label: "الثقافة والمطبخ", hint: "تراث حيّ" },
    ],
  },
} as const;

function getMessageText(m: UIMessage): string {
  return m.parts
    .map((p) => ("text" in p && typeof p.text === "string" ? p.text : ""))
    .join("");
}

export function AskCurator() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const lang = useLang();
  const rtl = lang === "ar";
  const copy = COPY[lang] ?? COPY.en;
  const suggestions = SUGGESTIONS_BY_LANG[lang] ?? SUGGESTIONS_BY_LANG.en;
  const thinkingList = THINKING_MESSAGES[lang] ?? THINKING_MESSAGES.en;
  const [thinkingIdx, setThinkingIdx] = useState(0);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/curator" }),
    [],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport,
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 260);
  }, [open, messages.length]);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy) return;
    const t = setInterval(() => {
      setThinkingIdx((i) => (i + 1) % thinkingList.length);
    }, 2600);
    return () => clearInterval(t);
  }, [busy, thinkingList.length]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    void sendMessage({ text: trimmed });
  };

  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  const sideClass = isMobile
    ? "inset-x-0 bottom-0 h-[92dvh] rounded-t-[28px] data-[state=closed]:translate-y-full data-[state=open]:translate-y-0"
    : rtl
    ? "inset-y-4 start-4 w-full sm:max-w-[480px] md:max-w-[560px] rounded-[28px] data-[state=closed]:-translate-x-6 data-[state=open]:translate-x-0"
    : "inset-y-4 end-4 w-full sm:max-w-[480px] md:max-w-[560px] rounded-[28px] data-[state=closed]:translate-x-6 data-[state=open]:translate-x-0";

  return (
    <>
      {/* Floating trigger — museum-guide medallion */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={copy.open}
        className={cn(
          "fixed z-[65] group",
          "bottom-[max(env(safe-area-inset-bottom),1rem)] end-4",
          "flex items-center gap-2 rounded-full pe-4 ps-2 py-2",
          "text-sm font-semibold tracking-wide text-[oklch(0.22_0.03_55)]",
          "transition-all hover:scale-[1.03] active:scale-[0.97]",
        )}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.03 82) 0%, oklch(0.88 0.08 72) 100%)",
          boxShadow:
            "0 10px 30px -14px rgba(80,50,20,0.35), inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 1px oklch(0.78 0.08 72 / 0.55)",
        }}
      >
        <span
          aria-hidden
          className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.96 0.03 82) 0%, oklch(0.78 0.10 72) 70%)",
            color: "oklch(0.32 0.06 45)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        >
          <CuratorGlyph />
        </span>
        <span className="hidden sm:inline">{copy.open}</span>
      </button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          {/* Warm parchment veil — softly blurs the museum behind. */}
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-[70]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:duration-500 data-[state=closed]:duration-300",
            )}
            style={{
              background:
                "radial-gradient(120% 90% at 70% 10%, oklch(0.94 0.04 78 / 0.55) 0%, oklch(0.90 0.05 68 / 0.42) 45%, oklch(0.82 0.06 55 / 0.35) 100%)",
              backdropFilter: "blur(10px) saturate(115%)",
            }}
          />

          {/* Panel — emerges from the museum wall */}
          <DialogPrimitive.Content
            dir={rtl ? "rtl" : "ltr"}
            aria-describedby={undefined}
            className={cn(
              "fixed z-[71] flex flex-col overflow-hidden text-foreground",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:duration-500 data-[state=closed]:duration-300",
              "ease-out",
              sideClass,
            )}
            style={{
              background:
                "linear-gradient(180deg, oklch(0.985 0.016 84) 0%, oklch(0.968 0.024 80) 100%)",
              boxShadow:
                "0 40px 90px -40px rgba(80,50,20,0.45), 0 12px 30px -18px rgba(80,50,20,0.25), 0 0 0 1px oklch(0.82 0.05 74 / 0.6)",
            }}
          >
            <DialogPrimitive.Title className="sr-only">
              {copy.title}
            </DialogPrimitive.Title>

            {/* Gallery-entrance header (museum plaque) */}
            <header className="relative shrink-0 px-6 sm:px-8 pt-7 pb-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full shrink-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, oklch(0.95 0.04 82) 0%, oklch(0.78 0.11 68) 72%, oklch(0.52 0.10 52) 100%)",
                    color: "oklch(0.26 0.05 45)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 16px -8px rgba(120,70,30,0.4)",
                  }}
                  aria-hidden
                >
                  <CuratorGlyph large />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.32em]"
                    style={{ color: "oklch(0.55 0.11 55)" }}
                  >
                    {copy.kicker}
                  </div>
                  <h2
                    className="text-[26px] sm:text-[28px] font-semibold leading-tight mt-1.5 text-[oklch(0.20_0.03_45)]"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', var(--font-serif, serif)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {copy.title}
                  </h2>
                  <p
                    className="text-[14px] text-[oklch(0.42_0.03_55)] mt-1 italic"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', var(--font-serif, serif)",
                    }}
                  >
                    {copy.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 -mt-1">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setMessages([])}
                      disabled={busy}
                      aria-label={copy.reset}
                      title={copy.reset}
                      className="flex items-center justify-center min-w-11 min-h-11 rounded-full text-[oklch(0.38_0.04_55)] hover:bg-[oklch(0.88_0.04_78)]/60 hover:text-[oklch(0.22_0.05_45)] transition disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.62_0.14_55)]/60"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={copy.close}
                    className="flex items-center justify-center min-w-11 min-h-11 rounded-full text-[oklch(0.38_0.04_55)] hover:bg-[oklch(0.88_0.04_78)]/60 hover:text-[oklch(0.22_0.05_45)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.62_0.14_55)]/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Museum divider ornament */}
              <div
                aria-hidden
                className="mt-6 flex items-center gap-3"
                style={{ color: "oklch(0.72 0.09 62)" }}
              >
                <span
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.82 0.05 72), transparent)",
                  }}
                />
                <span className="text-[10px] tracking-[0.4em] uppercase">
                  ⵣ
                </span>
                <span
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.82 0.05 72), transparent)",
                  }}
                />
              </div>
            </header>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6 space-y-7"
            >
              {messages.length === 0 && (
                <div className="space-y-7">
                  <p
                    className="text-[oklch(0.30_0.04_45)] leading-relaxed"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', var(--font-serif, serif)",
                      fontSize: "1.12rem",
                    }}
                  >
                    {copy.empty}
                  </p>
                  <div>
                    <div
                      className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 flex items-center"
                      style={{ color: "oklch(0.55 0.11 55)" }}
                    >
                      <ScrollText className="inline w-3 h-3 me-1.5" />
                      {copy.suggestionsLabel}
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {suggestions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => ask(q)}
                          className={cn(
                            "text-start leading-snug rounded-xl px-4 py-3 transition",
                            "bg-[oklch(0.995_0.008_86)] hover:bg-[oklch(0.985_0.018_82)]",
                            "text-[oklch(0.26_0.04_45)]",
                            "border border-[oklch(0.86_0.03_78)]",
                            "hover:border-[oklch(0.72_0.09_65)] hover:shadow-[0_4px_14px_-8px_rgba(120,70,30,0.35)]",
                          )}
                          style={{
                            fontFamily:
                              "'Cormorant Garamond', var(--font-serif, serif)",
                            fontSize: "1.05rem",
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={m.id} className="space-y-4">
                  <CuratorMessage message={m} />
                  {i === lastAssistantIdx && !busy && (
                    <ContinueExploring
                      label={copy.exploreLabel}
                      items={copy.explore}
                      onNavigate={() => setOpen(false)}
                    />
                  )}
                </div>
              ))}

              {busy && <ThinkingIndicator label={thinkingList[thinkingIdx]} />}

              {error && (
                <div
                  className="text-sm rounded-lg px-4 py-3"
                  style={{
                    background: "oklch(0.94 0.04 32)",
                    color: "oklch(0.35 0.10 32)",
                    border: "1px solid oklch(0.78 0.08 32)",
                  }}
                >
                  {error.message}
                </div>
              )}

              {messages.length > 0 && !busy && (
                <p
                  className="text-[12px] leading-relaxed text-[oklch(0.5_0.03_55)] italic pt-3 border-t border-[oklch(0.88_0.03_78)]/60"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', var(--font-serif, serif)",
                  }}
                >
                  {copy.footer}
                </p>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="shrink-0 px-6 sm:px-8 pt-4 pb-[max(env(safe-area-inset-bottom),1.25rem)]"
              style={{
                borderTop: "1px solid oklch(0.85 0.03 78 / 0.7)",
                background: "oklch(0.985 0.014 84 / 0.55)",
              }}
            >
              <div
                className="flex items-end gap-2 rounded-2xl ps-4 pe-2 py-2 bg-[oklch(0.995_0.008_86)]"
                style={{
                  border: "1px solid oklch(0.82 0.04 76)",
                  boxShadow:
                    "inset 0 1px 2px rgba(120,80,40,0.06), 0 2px 10px -6px rgba(120,70,30,0.15)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  rows={1}
                  aria-label={copy.placeholder}
                  placeholder={copy.placeholder}
                  className={cn(
                    "flex-1 resize-none bg-transparent outline-none py-1.5",
                    "text-[14px] leading-relaxed max-h-40",
                    "text-[oklch(0.20_0.03_45)] placeholder:text-[oklch(0.48_0.03_55)]",
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label={copy.send}
                  className="flex items-center justify-center min-w-11 min-h-11 rounded-full shrink-0 transition disabled:opacity-40 disabled:pointer-events-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.62_0.14_55)]/60"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.13 55) 0%, oklch(0.58 0.14 45) 100%)",
                    color: "oklch(0.99 0.01 84)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 10px -4px rgba(140,60,30,0.45)",
                  }}
                >
                  <Send className={cn("w-4 h-4", rtl && "rotate-180")} />
                </button>
              </div>
            </form>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

function ThinkingIndicator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div
        aria-hidden
        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.94 0.04 82) 0%, oklch(0.80 0.10 68) 75%)",
          color: "oklch(0.32 0.06 45)",
        }}
      >
        <BookOpen className="w-4 h-4 animate-pulse" />
      </div>
      <span
        className="italic text-[oklch(0.42_0.04_55)]"
        style={{
          fontFamily: "'Cormorant Garamond', var(--font-serif, serif)",
          fontSize: "1rem",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ContinueExploring({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; label: string; hint: string }>;
  onNavigate: () => void;
}) {
  return (
    <div className="ms-12 sm:ms-14">
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 flex items-center"
        style={{ color: "oklch(0.55 0.11 55)" }}
      >
        <Compass className="inline w-3 h-3 me-1.5" />
        {label}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition",
              "bg-[oklch(0.995_0.008_86)] hover:bg-[oklch(0.985_0.018_82)]",
              "border border-[oklch(0.87_0.03_78)] hover:border-[oklch(0.72_0.09_65)]",
            )}
          >
            <div className="min-w-0">
              <div
                className="text-[14px] font-semibold text-[oklch(0.26_0.05_45)] truncate"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', var(--font-serif, serif)",
                  fontSize: "1.02rem",
                }}
              >
                {it.label}
              </div>
              <div className="text-[11px] text-[oklch(0.5_0.03_55)] truncate">
                {it.hint}
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 shrink-0 text-[oklch(0.55_0.11_55)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function CuratorMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = getMessageText(message);
  if (!text.trim()) return null;

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-[14px] leading-relaxed"
          style={{
            background: "oklch(0.92 0.04 62)",
            color: "oklch(0.28 0.05 45)",
            border: "1px solid oklch(0.85 0.06 62)",
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div
        aria-hidden
        className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 mt-1"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.94 0.04 82) 0%, oklch(0.78 0.11 68) 75%, oklch(0.55 0.10 55) 100%)",
          color: "oklch(0.28 0.05 45)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
        }}
      >
        <CuratorGlyph small />
      </div>
      <article
        className={cn(
          "relative flex-1 rounded-2xl px-5 py-4",
          "bg-[oklch(0.995_0.008_86)]",
          "border border-[oklch(0.87_0.03_78)]",
        )}
        style={{
          boxShadow:
            "0 8px 24px -18px rgba(120,70,30,0.35), 0 1px 0 rgba(255,255,255,0.6) inset",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-y-3 start-0 w-[3px] rounded-full"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.78 0.11 68), oklch(0.55 0.10 55))",
          }}
        />
        <div
          className={cn(
            "prose prose-sm max-w-none",
            "prose-headings:font-serif prose-headings:text-[oklch(0.24_0.04_45)]",
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-h1:text-lg prose-h2:text-base prose-h3:text-[15px]",
            "prose-h2:mt-5 prose-h2:mb-2 prose-h3:mt-3 prose-h3:mb-1.5",
            "prose-h2:pb-1 prose-h2:border-b prose-h2:border-[oklch(0.88_0.03_78)]",
            "prose-p:text-[oklch(0.28_0.04_45)] prose-p:leading-[1.8] prose-p:my-3 prose-p:text-[14.5px]",
            "prose-strong:text-[oklch(0.42_0.13_45)] prose-strong:font-semibold",
            "prose-em:text-[oklch(0.38_0.08_55)]",
            "prose-a:text-[oklch(0.48_0.14_45)] prose-a:no-underline hover:prose-a:underline",
            "prose-li:text-[oklch(0.28_0.04_45)] prose-li:my-1 prose-li:leading-relaxed",
            "prose-ul:my-2 prose-ol:my-2",
            "prose-blockquote:border-s-2 prose-blockquote:border-[oklch(0.78_0.11_68)]",
            "prose-blockquote:text-[oklch(0.35_0.05_55)] prose-blockquote:italic prose-blockquote:ps-4",
            "prose-hr:border-[oklch(0.88_0.03_78)]",
          )}
        >
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

/** Simple museum-curator glyph — a bust-in-frame silhouette. */
function CuratorGlyph({
  small = false,
  large = false,
}: {
  small?: boolean;
  large?: boolean;
}) {
  const size = large ? 24 : small ? 16 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5c2.2 0 4 1.9 4 4.2s-1.8 4.2-4 4.2S8 10 8 7.7s1.8-4.2 4-4.2Z"
        fill="currentColor"
      />
      <path
        d="M4.5 20c.6-3.8 3.7-6.4 7.5-6.4s6.9 2.6 7.5 6.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
