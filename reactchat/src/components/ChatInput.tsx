import React, { useState, FormEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = "Type a message...",
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, padding: "8px" }}
        autoComplete="off"
      />
      <button type="submit" disabled={!message.trim()}>
        Send
      </button>
    </form>
  );
};

export default ChatInput;
