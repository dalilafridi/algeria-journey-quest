/**
 * Ask the Curator — floating museum-guide assistant.
 *
 * A single-conversation, session-only chat that answers strictly from the
 * museum corpus assembled server-side in `src/lib/curator/corpus.ts`.
 * Opens as a right-side drawer on desktop and as a fullscreen sheet on
 * mobile.
 *
 * If the visitor wants persistent chat history later, upgrade to threaded
 * storage per the chat-agent-ui-contract.
 */

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, X, Sparkles, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

const SUGGESTIONS_BY_LANG = {
  en: [
    "Tell me about Jugurtha.",
    "Why was Massinissa important?",
    "Compare the Almohads and Almoravids.",
    "Explain the Black Spring.",
  ],
  fr: [
    "Parle-moi de Jugurtha.",
    "Pourquoi Massinissa était-il important ?",
    "Compare les Almohades et les Almoravides.",
    "Explique le Printemps noir.",
  ],
  ar: [
    "حدّثني عن يوغرطة.",
    "لماذا كان ماسينيسا مهماً؟",
    "قارن بين الموحّدين والمرابطين.",
    "اشرح لي الربيع الأسود.",
  ],
} as const;

const COPY = {
  en: {
    open: "Ask the Curator",
    title: "Ask the Curator",
    subtitle: "A guided voice from the museum",
    empty:
      "Good day. I can only speak from what the museum holds — its figures, eras, regions, culture, cuisine and events. Ask me something, or try one of these:",
    placeholder: "Ask about a figure, era, region…",
    send: "Ask",
    reset: "New question",
    close: "Close",
    thinking: "The curator is thinking…",
  },
  fr: {
    open: "Demander au conservateur",
    title: "Demander au conservateur",
    subtitle: "Une voix guide au cœur du musée",
    empty:
      "Bonjour. Je ne parle que de ce que renferme le musée — ses figures, époques, régions, culture, cuisine et événements. Posez-moi une question, ou essayez celles-ci :",
    placeholder: "Une figure, une époque, une région…",
    send: "Demander",
    reset: "Nouvelle question",
    close: "Fermer",
    thinking: "Le conservateur réfléchit…",
  },
  ar: {
    open: "اسأل القيّم",
    title: "اسأل القيّم",
    subtitle: "صوت مرشد من قلب المتحف",
    empty:
      "أهلاً بك. لا أتحدث إلا ممّا يحفظه المتحف — شخصياته وحقبه ومناطقه وثقافته ومطبخه وأحداثه. اطرح سؤالك، أو جرّب هذه:",
    placeholder: "شخصية، حقبة، منطقة…",
    send: "اسأل",
    reset: "سؤال جديد",
    close: "إغلاق",
    thinking: "القيّم يفكّر…",
  },
} as const;

function getMessageText(m: UIMessage): string {
  return m.parts
    .map((p) => ("text" in p && typeof p.text === "string" ? p.text : ""))
    .join("");
}

const GOLD = "oklch(0.82 0.13 82)";
const INK = "oklch(0.14 0.02 60)";
const PARCHMENT = "oklch(0.97 0.02 82)";

export function AskCurator() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const lang = useLang();
  const rtl = lang === "ar";
  const copy = COPY[lang] ?? COPY.en;
  const suggestions = SUGGESTIONS_BY_LANG[lang] ?? SUGGESTIONS_BY_LANG.en;

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/curator" }),
    [],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport,
  });

  // Detect viewport size once on the client. The Sheet component adjusts its
  // side/size based on this so mobile visitors get a fullscreen sheet and
  // desktop visitors get a side drawer.
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
          "text-sm font-semibold tracking-wide",
          "transition-all hover:scale-[1.03] active:scale-[0.97]",
        )}
        style={{
          color: INK,
          background:
            "linear-gradient(135deg, oklch(0.94 0.06 82) 0%, oklch(0.86 0.13 82) 45%, oklch(0.7 0.13 78) 100%)",
          boxShadow:
            "0 18px 40px -18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 1px color-mix(in oklab, oklch(0.82 0.13 82) 55%, black)",
        }}
      >
        <span
          aria-hidden
          className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.28 0.04 55) 0%, oklch(0.14 0.02 55) 70%)",
            color: GOLD,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <CuratorGlyph />
        </span>
        <span className="hidden sm:inline">{copy.open}</span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isMobile ? "bottom" : rtl ? "left" : "right"}
          className={cn(
            "p-0 border-none flex flex-col overflow-hidden",
            isMobile
              ? "h-[100dvh] max-h-[100dvh] w-full rounded-none"
              : "w-full sm:max-w-[440px] md:max-w-[520px]",
          )}
          style={{
            background:
              "linear-gradient(180deg, oklch(0.12 0.02 55) 0%, oklch(0.08 0.02 55) 100%)",
            color: PARCHMENT,
          }}
        >
          {/* Header */}
          <div
            className="flex items-start gap-3 px-5 pt-5 pb-4"
            style={{
              borderBottom:
                "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 20%, transparent)",
            }}
          >
            <div
              className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.94 0.12 82) 0%, oklch(0.72 0.13 78) 60%, oklch(0.42 0.09 65) 100%)",
                color: INK,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
              aria-hidden
            >
              <CuratorGlyph />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: "oklch(0.82 0.13 82)" }}
              >
                DZ Odyssey · Museum
              </div>
              <div
                className="text-lg font-semibold leading-tight mt-0.5"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                {copy.title}
              </div>
              <div className="text-xs opacity-70 mt-0.5">{copy.subtitle}</div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label={copy.reset}
                  className="p-2 rounded-full hover:bg-white/5 opacity-70 hover:opacity-100 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.close}
                className="p-2 rounded-full hover:bg-white/5 opacity-70 hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-5"
          >
            {messages.length === 0 && (
              <div className="space-y-4">
                <p
                  className="text-sm leading-relaxed opacity-90"
                  style={{ fontFamily: "var(--font-serif, serif)" }}
                >
                  {copy.empty}
                </p>
                <div className="flex flex-col gap-2">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      className={cn(
                        "text-start text-[13px] leading-snug rounded-xl px-3.5 py-2.5 transition",
                        "hover:bg-white/[0.04]",
                      )}
                      style={{
                        border:
                          "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 22%, transparent)",
                        background:
                          "color-mix(in oklab, oklch(0.82 0.13 82) 5%, transparent)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="me-2 text-[10px] tracking-[0.22em] font-semibold opacity-70"
                        style={{ color: "oklch(0.82 0.13 82)" }}
                      >
                        ❦ ASK
                      </span>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <CuratorMessage key={m.id} message={m} />
            ))}

            {busy && (
              <div className="flex items-center gap-2 text-xs opacity-70 italic">
                <Sparkles
                  className="w-3.5 h-3.5 animate-pulse"
                  style={{ color: GOLD }}
                />
                {copy.thinking}
              </div>
            )}

            {error && (
              <div
                className="text-xs rounded-lg px-3 py-2"
                style={{
                  background: "oklch(0.32 0.12 28 / 0.15)",
                  color: "oklch(0.9 0.08 28)",
                  border: "1px solid oklch(0.5 0.14 28 / 0.4)",
                }}
              >
                {error.message}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="px-4 sm:px-5 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]"
            style={{
              borderTop:
                "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 20%, transparent)",
              background: "color-mix(in oklab, oklch(0.08 0.02 55) 60%, transparent)",
            }}
          >
            <div
              className="flex items-end gap-2 rounded-2xl p-2"
              style={{
                background: "color-mix(in oklab, oklch(0.82 0.13 82) 6%, transparent)",
                border:
                  "1px solid color-mix(in oklab, oklch(0.82 0.13 82) 25%, transparent)",
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
                  "flex-1 resize-none bg-transparent outline-none",
                  "text-sm leading-relaxed max-h-40",
                  "placeholder:opacity-50",
                )}
                style={{ color: PARCHMENT }}
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label={copy.send}
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition disabled:opacity-40 disabled:pointer-events-none active:scale-95"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.92 0.12 82) 0%, oklch(0.72 0.13 78) 55%, oklch(0.42 0.09 65) 100%)",
                  color: INK,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
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

function CuratorMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = getMessageText(message);
  if (!text.trim()) return null;

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.86 0.13 82) 0%, oklch(0.72 0.13 78) 100%)",
            color: INK,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
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
        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-0.5"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.94 0.12 82) 0%, oklch(0.72 0.13 78) 60%, oklch(0.42 0.09 65) 100%)",
          color: INK,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      >
        <CuratorGlyph small />
      </div>
      <div
        className="prose prose-sm prose-invert max-w-none flex-1 leading-relaxed
                   prose-headings:font-serif prose-p:my-2
                   prose-strong:text-[oklch(0.92_0.09_82)]
                   prose-a:text-[oklch(0.86_0.11_82)] prose-a:no-underline hover:prose-a:underline
                   prose-li:my-0.5"
        style={{ color: PARCHMENT }}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
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
