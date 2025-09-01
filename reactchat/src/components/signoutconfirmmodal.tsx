import React from "react";

type SignOutConfirmModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const SignOutConfirmModal: React.FC<SignOutConfirmModalProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
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
          minWidth: "300px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Sign Out</h2>
        <p>Are you sure you want to sign out?</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <button onClick={onCancel}>Cancel</button>
          <button
            onClick={onConfirm}
            style={{ background: "#d32f2f", color: "#fff" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmModal;
