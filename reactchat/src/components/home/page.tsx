import React, { useEffect, useRef, useState } from "react";

("use client");

type Message = {
  id: string;
  author: "me" | "bot" | string;
  text: string;
  createdAt: string;
};

export default function HomePage(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load recent messages from localStorage (fallback) or initialize sample
    const raw = localStorage.getItem("reactchat:messages");
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
        return;
      } catch {
        // fallthrough to seed
      }
    }

    const seed: Message[] = [
      {
        id: "m1",
        author: "bot",
        text: "Welcome to ReactChat. Type a message and press Enter to send.",
        createdAt: new Date().toISOString(),
      },
    ];
    setMessages(seed);
  }, []);

  useEffect(() => {
    localStorage.setItem("reactchat:messages", JSON.stringify(messages));
    // auto-scroll to bottom when messages change
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const next: Message = {
      id: `${Date.now()}`,
      author: "me",
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    // optimistic update
    setMessages((prev) => [...prev, next]);
    setInput("");
    setSending(true);

    try {
      // Attempt to POST to /api/chat (optional). If your backend isn't ready,
      // this will fail quietly and we'll keep optimistic message only.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        // if backend returns a reply, append it
        if (data?.reply) {
          const botMsg: Message = {
            id: `bot-${Date.now()}`,
            author: "bot",
            text: String(data.reply),
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, botMsg]);
        }
      } else {
        // optional: store error bot reply
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            author: "bot",
            text: "Failed to send message to server.",
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      // network or other error — keep optimistic message only
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: 18 }}>ReactChat</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.messageList} ref={containerRef}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                ...styles.message,
                alignSelf: m.author === "me" ? "flex-end" : "flex-start",
                background: m.author === "me" ? "#0b93f6" : "#e5e5ea",
                color: m.author === "me" ? "white" : "black",
              }}
            >
              <div style={styles.messageText}>{m.text}</div>
              <div style={styles.meta}>
                <small>
                  {m.author === "me"
                    ? "You"
                    : m.author === "bot"
                    ? "Bot"
                    : m.author}{" "}
                  •{" "}
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} style={styles.composer}>
          <input
            aria-label="Message"
            placeholder={sending ? "Sending…" : "Type a message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            disabled={sending}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
          <button
            type="submit"
            style={styles.button}
            disabled={sending || !input.trim()}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid #e6e6e6",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 12,
  },
  messageList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflowY: "auto",
    padding: 8,
    flex: 1,
    marginBottom: 8,
  },
  message: {
    maxWidth: "75%",
    padding: "8px 12px",
    borderRadius: 12,
    boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
  },
  messageText: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  meta: {
    marginTop: 6,
    opacity: 0.75,
    textAlign: "right",
  },
  composer: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: 14,
  },
  button: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    background: "#111827",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
  },
};
