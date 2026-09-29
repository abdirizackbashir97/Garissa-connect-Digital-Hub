// Floating chat widget — WhatsApp-style.
// Purely client-side for now (no backend yet). When the Flask API
// exposes a messaging endpoint, replace the setTimeout auto-reply.

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, Phone } from "lucide-react";

export default function ServiceDetailChat({ service }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  const providerName = service?.provider_name || service?.name || "Provider";

  // Seed the welcome message when opening for the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 1,
          from: "them",
          text: t("serviceDetailPage.chatWelcome", {
            defaultValue: "Hello! Ask us anything about this service.",
          }),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, [open, messages.length, t]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "me", text, time: now },
    ]);
    setInput("");

    // Simulated reply — remove once the backend is wired up
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "them",
          text: t("serviceDetailPage.chatAutoReply", {
            defaultValue:
              "Thanks for your message! We'll get back to you shortly. You can also call us.",
          }),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 900);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={
          open
            ? t("serviceDetailPage.chatClose", { defaultValue: "Close chat" })
            : t("serviceDetailPage.chatTitle", {
                defaultValue: "Chat with provider",
              })
        }
        className="fixed bottom-24 end-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-600 text-white shadow-2xl transition hover:scale-105 hover:bg-brand-green-700 sm:bottom-6 sm:end-6"
      >
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <MessageCircle size={22} aria-hidden="true" />
        )}
        {!open && (
          <span className="absolute -top-1 -end-1 inline-flex h-3 w-3 rounded-full bg-brand-gold-400 ring-2 ring-white" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-x-3 bottom-40 z-40 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-brand-neutral-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-24 sm:end-6 sm:w-[26rem] sm:max-h-[34rem]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-brand-green-700 px-4 py-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
              {providerName.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{providerName}</p>
              <p className="flex items-center gap-1 text-[11px] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold-400" />
                {t("serviceDetailPage.chatOnline", {
                  defaultValue: "Online now · replies in minutes",
                })}
              </p>
            </div>
            {service?.phone && (
              <a
                href={`tel:${service.phone}`}
                aria-label={t("serviceDetailPage.callNow")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
              >
                <Phone size={16} aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("serviceDetailPage.chatClose", {
                defaultValue: "Close chat",
              })}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[#efeae2] px-4 py-4"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                    m.from === "me"
                      ? "rounded-br-md bg-[#d9fdd3] text-brand-neutral-900"
                      : "rounded-bl-md bg-white text-brand-neutral-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                  <p className="mt-1 text-end text-[10px] text-brand-neutral-400">
                    {m.time}
                    {m.from === "me" && (
                      <span className="ms-1 text-brand-green-600">✓✓</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={send}
            className="flex items-center gap-2 border-t border-brand-neutral-200 bg-white px-3 py-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("serviceDetailPage.chatInputPlaceholder", {
                defaultValue: "Type your message…",
              })}
              className="min-w-0 flex-1 rounded-full bg-brand-neutral-100 px-4 py-2.5 text-sm outline-none placeholder:text-brand-neutral-400 focus:ring-2 focus:ring-brand-green-500/30"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={t("serviceDetailPage.chatSend", {
                defaultValue: "Send",
              })}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-600 text-white transition hover:bg-brand-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} className="rtl:rotate-180" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
