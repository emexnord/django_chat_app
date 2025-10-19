import React, { useState } from "react";

// /home/emran/devspace/django_chat_app/reactchat/src/components/home/contactus.tsx

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  // honeypot field to catch bots
  _gotcha?: string;
};

type FieldErrors = Partial<Record<keyof ContactForm, string>>;

export default function ContactUs(): JSX.Element {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    _gotcha: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message is too short";
    // optional phone validation
    if (form.phone && !/^[0-9()+\s-]{6,20}$/.test(form.phone)) {
      e.phone = "Invalid phone number";
    }
    // if honeypot has value, treat as bot (set global error)
    if (form._gotcha) e._gotcha = "Spam detected";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMessage(null);
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      // Adjust endpoint to match your backend (Django REST endpoint, etc.)
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server responded ${res.status}`);
      }

      setStatusMessage("Thanks! Your message has been sent.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        _gotcha: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatusMessage(
        "Sorry — something went wrong while sending your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  function update<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // clear field error when user types
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const styles: Record<string, React.CSSProperties> = {
    container: {
      maxWidth: 760,
      margin: "24px auto",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      background: "#ffffff",
      fontFamily:
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
    },
    header: { marginBottom: 12 },
    title: { margin: 0, fontSize: 22 },
    subtitle: { margin: 0, color: "#555", fontSize: 13 },
    form: { display: "grid", gap: 12, marginTop: 12 },
    row: { display: "flex", gap: 12, flexWrap: "wrap" },
    input: {
      flex: 1,
      minWidth: 200,
      padding: "10px 12px",
      fontSize: 14,
      borderRadius: 6,
      border: "1px solid #d0d7de",
      outline: "none",
    },
    textarea: {
      minHeight: 120,
      padding: 12,
      fontSize: 14,
      borderRadius: 6,
      border: "1px solid #d0d7de",
      outline: "none",
      resize: "vertical",
    },
    label: { fontSize: 13, color: "#222", marginBottom: 6 },
    hint: { fontSize: 12, color: "#666" },
    error: { color: "#b91c1c", fontSize: 12, marginTop: 6 },
    actions: { display: "flex", gap: 8, alignItems: "center", marginTop: 6 },
    button: {
      padding: "10px 14px",
      fontSize: 14,
      borderRadius: 6,
      border: "none",
      background: "#0366d6",
      color: "white",
      cursor: "pointer",
    },
    buttonDisabled: { opacity: 0.6, cursor: "not-allowed" },
    status: { marginTop: 8, fontSize: 13 },
    smallMuted: { fontSize: 12, color: "#666" },
    honeypot: { display: "none" },
  };

  return (
    <section style={styles.container} aria-labelledby="contact-heading">
      <header style={styles.header}>
        <h1 id="contact-heading" style={styles.title}>
          Contact Us
        </h1>
        <p style={styles.subtitle}>
          Have a question, feedback, or need help? Send us a message and we'll
          get back to you shortly.
        </p>
      </header>

      <form style={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Name + Email row */}
        <div style={styles.row}>
          <label style={{ flex: 1 }}>
            <div style={styles.label}>Your name</div>
            <input
              style={styles.input}
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
              required
            />
            {errors.name && (
              <div id="error-name" style={styles.error}>
                {errors.name}
              </div>
            )}
          </label>

          <label style={{ flex: 1 }}>
            <div style={styles.label}>Email</div>
            <input
              style={styles.input}
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
              required
            />
            {errors.email && (
              <div id="error-email" style={styles.error}>
                {errors.email}
              </div>
            )}
          </label>
        </div>

        {/* Subject + Phone row */}
        <div style={styles.row}>
          <label style={{ flex: 1 }}>
            <div style={styles.label}>Subject (optional)</div>
            <input
              style={styles.input}
              name="subject"
              type="text"
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              placeholder="How can we help?"
            />
          </label>

          <label style={{ flex: 1 }}>
            <div style={styles.label}>Phone (optional)</div>
            <input
              style={styles.input}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 555 555 5555"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <div style={styles.error}>{errors.phone}</div>}
          </label>
        </div>

        {/* Message */}
        <label>
          <div style={styles.label}>Message</div>
          <textarea
            style={styles.textarea}
            name="message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Write your message..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
            required
          />
          {errors.message && (
            <div id="error-message" style={styles.error}>
              {errors.message}
            </div>
          )}
        </label>

        {/* Honeypot - hidden field for bots */}
        <label style={styles.honeypot} aria-hidden>
          Leave this field empty
          <input
            name="_gotcha"
            value={form._gotcha}
            onChange={(e) => update("_gotcha", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <div style={styles.actions}>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Sending..." : "Send message"}
          </button>

          <div style={styles.smallMuted}>
            Or email us directly at <strong>support@example.com</strong>
          </div>
        </div>

        {statusMessage && <div style={styles.status}>{statusMessage}</div>}
      </form>
    </section>
  );
}
