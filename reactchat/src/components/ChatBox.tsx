import React from "react";

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 360,
        maxWidth: "90vw",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid #eee",
          background: "#f7f7f8",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 16 }}>Chat with GPT</span>
        <button
          onClick={onClose}
          aria-label="Close chat"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: "#888",
            padding: 4,
            borderRadius: 4,
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#eee")}
          onMouseOut={(e) => (e.currentTarget.style.background = "none")}
        >
          &#10005;
        </button>
      </div>
      <div
        style={{
          flex: 1,
          padding: 20,
          overflowY: "auto",
          minHeight: 200,
          background: "#fafbfc",
        }}
      >
      </div>
      <div
        style={{
          padding: 16,
          borderTop: "1px solid #eee",
          background: "#fff",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            outline: "none",
            fontSize: 15,
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
