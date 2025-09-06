import React, { useState } from "react";

const InviteUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/chat/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("Invitation sent!");
        setEmail("");
      } else {
        const data = await response.json();
        setStatus(data?.error || "Failed to send invitation.");
      }
    } catch (error) {
      setStatus("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <label>
        Invite user by email:
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          style={{ marginLeft: 8 }}
        />
      </label>
      <button type="submit" disabled={loading || !email}>
        {loading ? "Sending..." : "Invite"}
      </button>
      {status && (
        <div
          style={{
            marginTop: 8,
            color: status === "Invitation sent!" ? "green" : "red",
          }}
        >
          {status}
        </div>
      )}
    </form>
  );
};

export default InviteUser;
