import React, { useState } from "react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Handle error if needed
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Thank you for contacting us! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              Message:
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>
          </div>
          <button type="submit" style={{ padding: "8px 16px" }}>
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
