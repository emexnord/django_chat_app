import React, { useState } from "react";

const PasswordReset: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        // Replace with your API endpoint
        try {
            // Example: await fetch("/api/password-reset/", { ... })
            setSubmitted(true);
        } catch (err) {
            setError("Failed to send reset email. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto", padding: "2rem", border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Password Reset</h2>
            {submitted ? (
                <p>
                    If an account with that email exists, a password reset link has been sent.
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        style={{ display: "block", width: "100%", margin: "1rem 0", padding: "0.5rem" }}
                    />
                    <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                        Send Reset Link
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            )}
        </div>
    );
};

export default PasswordReset;