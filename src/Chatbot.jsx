import { useState, useRef, useEffect } from "react";

function generateSessionId() {
  return "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
}

const WEBHOOK_URL = import.meta.env.VITE_CHATBOT_WEBHOOK_URL || "";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "أهلاً! 👋 أنا المساعد الذكي لعبدالله لابز.\nكيف أقدر أساعدك اليوم؟" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem("chat_session_id");
    if (stored) return stored;
    const id = generateSessionId();
    sessionStorage.setItem("chat_session_id", id);
    return id;
  });
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || loading) return;
    setInput("");
    setMsgs((p) => [...p, { role: "user", text: txt }]);
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: txt, sessionId }),
      });
      const data = await res.json();
      const reply = data.output || data.response || data.text || data.message || "شكراً لتواصلك! سأعاود الرد قريباً.";
      setMsgs((p) => [...p, { role: "bot", text: reply }]);
    } catch {
      setMsgs((p) => [...p, { role: "bot", text: "عذراً، حدث خطأ. حاول مرة أخرى." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const BotAvatar = () => (
    <img src="/chatbot-icon.png" alt="" style={{
      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
      border: "1px solid rgba(124,58,237,0.2)",
    }} />
  );

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="فتح المحادثة"
        style={{
          position: "fixed", bottom: 28, left: 28, zIndex: 9999,
          width: 60, height: 60, borderRadius: "50%", border: "none",
          background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
          boxShadow: open
            ? "0 0 0 4px rgba(124,58,237,0.25), 0 8px 32px rgba(124,58,237,0.4)"
            : "0 8px 32px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.15)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          transform: open ? "scale(0.9) rotate(90deg)" : "scale(1)",
        }}
      >
        {open ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <img src="/chatbot-icon.png" alt="" style={{ width: 36, height: 36, borderRadius: "50%" }} />
        )}
      </button>

      {/* Chat Window */}
      <div
        dir="rtl"
        style={{
          position: "fixed", bottom: 100, left: 28, zIndex: 9998,
          width: "min(380px, calc(100vw - 40px))",
          height: open ? "min(520px, calc(100vh - 160px))" : 0,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: open ? "auto" : "none",
          borderRadius: 24, overflow: "hidden",
          background: "rgba(10,10,20,0.95)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(124,58,237,0.2)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "18px 22px", display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid rgba(124,58,237,0.12)",
          background: "rgba(124,58,237,0.04)",
        }}>
          <img src="/chatbot-icon.png" alt="" style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "2px solid rgba(124,58,237,0.25)",
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 15, fontWeight: 700, color: "#fff",
            }}>مساعد عبدالله لابز</div>
            <div style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: 11, color: "#A78BFA", display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#22C55E", display: "inline-block",
                boxShadow: "0 0 6px rgba(34,197,94,0.5)",
              }} />
              متصل الآن
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px 18px",
          display: "flex", flexDirection: "column", gap: 12,
          scrollbarWidth: "thin", scrollbarColor: "rgba(124,58,237,0.3) transparent",
        }}>
          {msgs.map((m, i) => (
            <div key={i} style={{
              display: "flex", gap: 8, alignItems: "flex-end",
              flexDirection: m.role === "user" ? "row-reverse" : "row",
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "88%",
            }}>
              {m.role === "bot" ? <BotAvatar /> : (
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="#fff"/>
                    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" fill="#fff"/>
                  </svg>
                </div>
              )}
              <div style={{
                padding: "12px 16px", borderRadius: 16,
                background: m.role === "user"
                  ? "linear-gradient(135deg, #7C3AED, #6D28D9)"
                  : "rgba(255,255,255,0.06)",
                border: m.role === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: 13, lineHeight: 1.8, color: "#fff",
                borderBottomRightRadius: m.role === "user" ? 4 : 16,
                borderBottomLeftRadius: m.role === "bot" ? 4 : 16,
                whiteSpace: "pre-wrap",
              }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{
              display: "flex", gap: 8, alignItems: "flex-end",
              alignSelf: "flex-start", maxWidth: "88%",
            }}>
              <BotAvatar />
              <div style={{
                padding: "12px 20px", borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottomLeftRadius: 4,
                display: "flex", gap: 5, alignItems: "center",
              }}>
                {[0, 1, 2].map(d => (
                  <span key={d} style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#A78BFA", display: "inline-block",
                    animation: `chatDot 1.4s infinite ${d * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "14px 16px", borderTop: "1px solid rgba(124,58,237,0.1)",
          display: "flex", gap: 10, alignItems: "center",
          background: "rgba(124,58,237,0.02)",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="اكتب رسالتك..."
            dir="rtl"
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff", fontSize: 13, outline: "none",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => e.target.style.borderColor = "rgba(124,58,237,0.4)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              width: 42, height: 42, borderRadius: 12, border: "none",
              background: input.trim() && !loading
                ? "linear-gradient(135deg, #7C3AED, #6D28D9)"
                : "rgba(255,255,255,0.05)",
              cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
              boxShadow: input.trim() && !loading ? "0 0 16px rgba(124,58,237,0.3)" : "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                fill={input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.2)"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Typing dots animation */}
      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
