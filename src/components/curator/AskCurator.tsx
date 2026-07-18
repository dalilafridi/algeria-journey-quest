/**
 * Ask the Curator — floating museum-guide assistant.
 *
 * A single-conversation, session-only chat that answers strictly from the
 * museum corpus assembled server-side in `src/lib/curator/corpus.ts`.
 * Opens as a right-side drawer on desktop and as a fullscreen sheet on
 * mobile.
 *
 * Visual language: warm parchment / ivory museum palette — designed to feel
 * like stepping into a curator's private office, not a chatbot window.
 */

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, X, RotateCcw, BookOpen, ScrollText } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
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
    title: "Ask the Curator",
    subtitle: "A guided voice from the museum",
    empty:
      "Good day. I speak only from what the museum holds — its figures, eras, regions, culture, cuisine and events. Choose a question below, or ask your own.",
    suggestionsLabel: "Suggested inquiries",
    placeholder: "Ask about a person, era, region, artifact or event…",
    send: "Send",
    reset: "New conversation",
    close: "Close",
    footer:
      "The Curator draws from DZ Odyssey's verified museum archive. Answers may evolve as new discoveries are added.",
  },
  fr: {
    open: "Demander au conservateur",
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
  },
  ar: {
    open: "اسأل القيّم",
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
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open, messages.length]);

  const busy = status === "submitted" || status === "streaming";

  // Rotate the "consulting the archives…" messages while busy.
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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isMobile ? "bottom" : rtl ? "left" : "right"}
          dir={rtl ? "rtl" : "ltr"}
          className={cn(
            "p-0 border-none flex flex-col overflow-hidden text-foreground",
            "[&>button]:hidden",
            isMobile
              ? "h-[100dvh] max-h-[100dvh] w-full rounded-none"
              : "w-full sm:max-w-[460px] md:max-w-[560px]",
          )}
          style={{
            background:
              "linear-gradient(180deg, oklch(0.982 0.018 84) 0%, oklch(0.965 0.024 82) 100%)",
          }}
        >
          <SheetTitle className="sr-only">{copy.title}</SheetTitle>

          {/* Header */}
          <div
            className="flex items-start gap-3 px-6 pt-6 pb-5"
            style={{
              borderBottom: "1px solid oklch(0.85 0.03 78 / 0.7)",
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.94 0.04 82) 0%, oklch(0.78 0.11 68) 75%, oklch(0.55 0.10 55) 100%)",
                color: "oklch(0.28 0.05 45)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.55), 0 4px 12px -6px rgba(120,70,30,0.35)",
              }}
              aria-hidden
            >
              <CuratorGlyph />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: "oklch(0.55 0.11 55)" }}
              >
                DZ Odyssey · Museum
              </div>
              <div
                className="text-xl font-semibold leading-tight mt-1 text-[oklch(0.22_0.03_45)]"
                style={{ fontFamily: "'Cormorant Garamond', var(--font-serif, serif)" }}
              >
                {copy.title}
              </div>
              <div className="text-[13px] text-[oklch(0.42_0.03_55)] mt-0.5 italic">
                {copy.subtitle}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label={copy.reset}
                  title={copy.reset}
                  className="p-2 rounded-full text-[oklch(0.42_0.03_55)] hover:bg-[oklch(0.88_0.04_78)]/50 hover:text-[oklch(0.28_0.05_45)] transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.close}
                className="p-2 rounded-full text-[oklch(0.42_0.03_55)] hover:bg-[oklch(0.88_0.04_78)]/50 hover:text-[oklch(0.28_0.05_45)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-6"
          >
            {messages.length === 0 && (
              <div className="space-y-6">
                <p
                  className="text-[15px] leading-relaxed text-[oklch(0.32_0.04_45)]"
                  style={{ fontFamily: "'Cormorant Garamond', var(--font-serif, serif)", fontSize: "1.05rem" }}
                >
                  {copy.empty}
                </p>
                <div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.28em] mb-3"
                    style={{ color: "oklch(0.55 0.11 55)" }}
                  >
                    <ScrollText className="inline w-3 h-3 me-1.5 -mt-0.5" />
                    {copy.suggestionsLabel}
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {suggestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className={cn(
                          "text-start text-[14px] leading-snug rounded-xl px-4 py-3 transition",
                          "bg-[oklch(0.995_0.008_86)] hover:bg-[oklch(0.985_0.018_82)]",
                          "text-[oklch(0.28_0.04_45)]",
                          "border border-[oklch(0.86_0.03_78)]",
                          "hover:border-[oklch(0.72_0.09_65)] hover:shadow-[0_4px_14px_-8px_rgba(120,70,30,0.35)]",
                        )}
                        style={{ fontFamily: "'Cormorant Garamond', var(--font-serif, serif)", fontSize: "1.02rem" }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <CuratorMessage key={m.id} message={m} />
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
                className="text-[11px] leading-relaxed text-[oklch(0.5_0.03_55)] italic pt-2 pb-1 border-t border-[oklch(0.88_0.03_78)]/60 mt-6"
                style={{ fontFamily: "'Cormorant Garamond', var(--font-serif, serif)" }}
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
            className="px-5 sm:px-6 pt-4 pb-[max(env(safe-area-inset-bottom),1rem)]"
            style={{
              borderTop: "1px solid oklch(0.85 0.03 78 / 0.7)",
              background: "oklch(0.985 0.014 84 / 0.6)",
            }}
          >
            <div
              className="flex items-end gap-2 rounded-2xl ps-4 pe-2 py-2 bg-[oklch(0.995_0.008_86)]"
              style={{
                border: "1px solid oklch(0.82 0.04 76)",
                boxShadow: "inset 0 1px 2px rgba(120,80,40,0.06), 0 2px 10px -6px rgba(120,70,30,0.15)",
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
                placeholder={copy.placeholder}
                className={cn(
                  "flex-1 resize-none bg-transparent outline-none py-1.5",
                  "text-[14px] leading-relaxed max-h-40",
                  "text-[oklch(0.22_0.03_45)] placeholder:text-[oklch(0.55_0.03_55)]/70",
                )}
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label={copy.send}
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition disabled:opacity-40 disabled:pointer-events-none active:scale-95"
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
        </SheetContent>
      </Sheet>
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
        className="text-[13px] italic text-[oklch(0.42_0.04_55)]"
        style={{ fontFamily: "'Cormorant Garamond', var(--font-serif, serif)", fontSize: "0.98rem" }}
      >
        {label}
      </span>
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
          boxShadow: "0 8px 24px -18px rgba(120,70,30,0.35), 0 1px 0 rgba(255,255,255,0.6) inset",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-y-3 start-0 w-[3px] rounded-full"
          style={{ background: "linear-gradient(180deg, oklch(0.78 0.11 68), oklch(0.55 0.10 55))" }}
        />
        <div
          className={cn(
            "prose prose-sm max-w-none",
            "prose-headings:font-serif prose-headings:text-[oklch(0.24_0.04_45)]",
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-h1:text-lg prose-h2:text-base prose-h3:text-[15px]",
            "prose-h2:mt-4 prose-h2:mb-2 prose-h3:mt-3 prose-h3:mb-1.5",
            "prose-p:text-[oklch(0.28_0.04_45)] prose-p:leading-[1.75] prose-p:my-2.5 prose-p:text-[14.5px]",
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
function CuratorGlyph({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
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
