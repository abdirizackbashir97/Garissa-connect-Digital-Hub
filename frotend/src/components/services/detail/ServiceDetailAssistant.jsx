import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkles, X, Send, Mic, MicOff, Phone, Copy, Check,
} from "lucide-react";

import {
  getAssistantReply,
  getSuggestions,
  detectLanguage,
  timeGreeting,
} from "../../../services/aiAssistant";

let ID = 0;
const nid = () => ++ID;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ServiceDetailAssistant({ service }) {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [listening, setListening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const cancelRef = useRef(false);

  const lang = (i18n.language || "en").split("-")[0];
  const providerName =
    service?.provider_name || service?.name || "GarissaConnect";

  const ctx = {
    name: service?.name,
    category: service?.category_name,
    location: service?.location,
    phone: service?.phone,
    isVerified: service?.is_verified === 1,
  };

  const now = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ---------- Welcome on first open ----------
  useEffect(() => {
    if (!open || messages.length > 0) return;
    const hi = timeGreeting(lang);
    const w1 = {
      en: `${hi} 👋 I'm your GarissaConnect assistant.`,
      sw: `${hi} 👋 Mimi ni msaidizi wako wa GarissaConnect.`,
      so: `${hi} 👋 Waxaan ahay kaaliyahaaga GarissaConnect.`,
      ar: `${hi} 👋 أنا مساعد GarissaConnect الخاص بك.`,
    };
    const w2 = {
      en: `Ask me anything about **${service?.name || "this service"}** — in any language.`,
      sw: `Niulize chochote kuhusu **${service?.name || "huduma hii"}** — kwa lugha yoyote.`,
      so: `I weydii wax kasta oo ku saabsan **${service?.name || "adeeggan"}** — luqad kasta.`,
      ar: `اسألني أي شيء عن **${service?.name || "هذه الخدمة"}** — بأي لغة.`,
    };
    setMessages([
      { id: nid(), from: "ai", text: w1[lang] || w1.en, time: now() },
      { id: nid(), from: "ai", text: w2[lang] || w2.en, time: now() },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ---------- Auto-scroll ----------
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, typingText]);

  // ---------- Focus input on open ----------
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 180);
  }, [open]);

  // ---------- Cancel typing on real unmount ----------
  useEffect(() => {
    return () => {
      cancelRef.current = true;
    };
  }, []);

  // ---------- Character-by-character typing ----------
  function typeOut(text) {
    return new Promise((resolve) => {
      let i = 0;
      setTypingText("");
      const step = () => {
        if (cancelRef.current) return resolve();
        i = Math.min(text.length, i + 2 + Math.floor(Math.random() * 2));
        setTypingText(text.slice(0, i));
        if (i >= text.length) setTimeout(resolve, 100);
        else setTimeout(step, 20 + Math.random() * 25);
      };
      step();
    });
  }

  // ---------- Send a message ----------
  async function send(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || typing) return;

    // ★ IMPORTANT: reset cancel flag at the start of every send().
    // Without this, React StrictMode's mount/unmount/mount cycle in
    // development leaves cancelRef.current === true forever, and the
    // reply loop exits immediately (dots flash, no message arrives).
    cancelRef.current = false;

    setMessages((m) => [
      ...m,
      { id: nid(), from: "user", text: trimmed, time: now() },
    ]);
    setInput("");
    setTyping(true);

    let pack;
    try {
      pack = await getAssistantReply(trimmed, ctx);
    } catch (e) {
      console.error("[assistant] reply failed:", e);
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: nid(),
          from: "ai",
          text: "Sorry, something went wrong.",
          time: now(),
        },
      ]);
      return;
    }

    const list = Array.isArray(pack?.messages) ? pack.messages : [];
    if (list.length === 0) {
      console.warn("[assistant] empty reply pack", pack);
      setTyping(false);
      return;
    }

    for (let k = 0; k < list.length; k++) {
      const { text: msgText, delay } = list[k];
      await sleep(delay ?? 500);
      if (cancelRef.current) return;

      const isLast = k === list.length - 1;

      if (isLast) {
        setTyping(true);
        await sleep(180);
        setTyping(false);
        await typeOut(msgText);
        setTypingText("");
        setMessages((m) => [
          ...m,
          { id: nid(), from: "ai", text: msgText, time: now() },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { id: nid(), from: "ai", text: msgText, time: now() },
        ]);
      }
    }
    setTyping(false);
  }

  // ---------- Voice input ----------
  function toggleVoice() {
    const SR =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) {
      alert("Voice input isn't supported here. Try Chrome or Edge.");
      return;
    }
    const rec = new SR();
    rec.lang =
      { en: "en-US", sw: "sw-KE", so: "so-SO", ar: "ar-SA" }[lang] || "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = (e) => send(e.results[0][0].transcript);
    rec.start();
  }

  async function copyMsg(id, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    } catch {}
  }

  const inputLang = detectLanguage(input);
  const badge = { en: "EN", sw: "SW", so: "SO", ar: "AR" }[inputLang];
  const hasUser = messages.some((m) => m.from === "user");

  return (
    <>
      {/* Floating "Ask AI" button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close" : "Open AI assistant"}
        className="group fixed bottom-24 end-4 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-700 ps-4 pe-5 py-3.5 text-sm font-semibold text-white shadow-2xl transition hover:scale-105 sm:bottom-6 sm:end-6"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          {open ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <>
              <Sparkles size={18} aria-hidden="true" />
              <span className="absolute -top-1 -end-1 h-2 w-2 rounded-full bg-brand-gold-400 ring-2 ring-brand-green-700" />
            </>
          )}
        </span>
        <span className="hidden sm:inline">
          {t("serviceDetailPage.assistantButton", { defaultValue: "Ask AI" })}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-24 sm:end-6 sm:h-[36rem] sm:max-h-[82vh] sm:w-[26rem] sm:rounded-2xl sm:border sm:border-brand-neutral-200 sm:shadow-2xl">
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-brand-neutral-200 bg-white px-4 py-3.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-700 text-white">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-brand-neutral-900">
                {providerName}
                <span className="rounded-full bg-brand-gold-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-gold-600">
                  AI
                </span>
              </p>
              <p className="flex items-center gap-1 text-[11px] text-brand-neutral-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green-500" />
                {typing ? "typing…" : "Online · any language"}
              </p>
            </div>
            {service?.phone && (
              <a
                href={`tel:${service.phone}`}
                aria-label="Call"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-neutral-500 hover:bg-brand-neutral-100 hover:text-brand-green-700"
              >
                <Phone size={16} aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-neutral-500 hover:bg-brand-neutral-100"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3.5 overflow-y-auto bg-brand-neutral-50 px-4 py-5"
          >
            {messages.map((m) => (
              <Bubble
                key={m.id}
                message={m}
                onCopy={() => copyMsg(m.id, m.text)}
                copied={copiedId === m.id}
              />
            ))}

            {typingText && (
              <div className="flex items-start gap-2.5">
                <AIAvatar />
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-brand-neutral-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-brand-neutral-800 shadow-sm">
                  <Md text={typingText} />
                  <span className="ms-0.5 inline-block h-4 w-0.5 -mb-0.5 animate-pulse bg-brand-green-600" />
                </div>
              </div>
            )}

            {typing && !typingText && (
              <div className="flex items-start gap-2.5">
                <AIAvatar />
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-brand-neutral-200 bg-white px-4 py-3">
                  <Dot delay="0s" />
                  <Dot delay="0.15s" />
                  <Dot delay="0.3s" />
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          {!hasUser && !typing && (
            <div className="border-t border-brand-neutral-200 bg-white px-3 pt-3 pb-1">
              <div className="flex flex-wrap gap-1.5">
                {getSuggestions(lang).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-brand-neutral-200 bg-white px-3 py-1.5 text-xs text-brand-neutral-700 transition hover:border-brand-green-300 hover:bg-brand-green-50 hover:text-brand-green-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2 border-t border-brand-neutral-200 bg-white px-3 py-3"
          >
            <span className="mb-2.5 inline-flex h-6 w-8 items-center justify-center rounded-md bg-brand-neutral-100 text-[10px] font-bold tracking-wider text-brand-neutral-500">
              {input ? badge : "·"}
            </span>

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask anything, in any language…"
              className="min-w-0 flex-1 resize-none rounded-xl border border-brand-neutral-200 bg-brand-neutral-50 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-brand-neutral-400 focus:border-brand-green-400 focus:bg-white focus:ring-2 focus:ring-brand-green-500/20"
              style={{ maxHeight: 96 }}
            />

            <button
              type="button"
              onClick={toggleVoice}
              aria-label="Voice input"
              className={`mb-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                listening
                  ? "bg-red-100 text-red-600 animate-pulse"
                  : "text-brand-neutral-500 hover:bg-brand-neutral-100"
              }`}
            >
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="mb-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-600 text-white transition hover:bg-brand-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} className="rtl:rotate-180" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* ---------------- Sub-components ---------------- */

function AIAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-600 to-brand-green-700 text-white">
      <Sparkles size={13} aria-hidden="true" />
    </span>
  );
}

function Bubble({ message, onCopy, copied }) {
  const isUser = message.from === "user";
  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      {isUser ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-neutral-200 text-[11px] font-semibold text-brand-neutral-700">
          You
        </span>
      ) : (
        <AIAvatar />
      )}
      <div
        className={`group relative max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-md bg-brand-green-600 text-white"
            : "rounded-bl-md border border-brand-neutral-200 bg-white text-brand-neutral-800"
        }`}
      >
        <Md text={message.text} />
        <p
          className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
            isUser ? "text-white/70" : "text-brand-neutral-400"
          }`}
        >
          {message.time}
          {isUser && <span className="text-white/85">✓✓</span>}
        </p>
        {!isUser && (
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy"
            className="absolute -top-2 end-2 hidden h-6 w-6 items-center justify-center rounded-full border border-brand-neutral-200 bg-white text-brand-neutral-500 shadow-sm hover:text-brand-green-700 group-hover:flex"
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
          </button>
        )}
      </div>
    </div>
  );
}

function Md({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="whitespace-pre-wrap break-words">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-brand-neutral-300"
      style={{ animationDelay: delay, animationDuration: "0.9s" }}
    />
  );
}