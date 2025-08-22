import React, { useState } from "react";

interface OtpPopupProps {
  email: string;
  onVerify: (otp: string) => void;
  onClose: () => void;
}

const OtpPopup: React.FC<OtpPopupProps> = ({ email, onVerify, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && idx < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    setError("");
    onVerify(otpValue);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "320px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Email Verification</h2>
        <p>
          Enter the 6-digit OTP sent to <b>{email}</b>
        </p>
        <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "1.5rem",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          ))}
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>
        )}
        <button
          onClick={handleVerify}
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "8px",
          }}
        >
          Verify
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            background: "#f5f5f5",
            color: "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;
