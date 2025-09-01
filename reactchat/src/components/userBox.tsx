import React from "react";

type UserBoxProps = {
  username: string;
  avatarUrl?: string;
  isOnline?: boolean;
  onClick?: () => void;
};

const UserBox: React.FC<UserBoxProps> = ({
  username,
  avatarUrl,
  isOnline = false,
  onClick,
}) => (
  <div
    className="user-box"
    style={{
      display: "flex",
      alignItems: "center",
      padding: "8px",
      cursor: onClick ? "pointer" : "default",
      borderBottom: "1px solid #eee",
    }}
    onClick={onClick}
  >
    <img
      src={
        avatarUrl ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(username)
      }
      alt={username}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        marginRight: 12,
        objectFit: "cover",
        border: isOnline ? "2px solid #4caf50" : "2px solid #ccc",
      }}
    />
    <div>
      <div style={{ fontWeight: 500 }}>{username}</div>
      <div style={{ fontSize: 12, color: isOnline ? "#4caf50" : "#888" }}>
        {isOnline ? "Online" : "Offline"}
      </div>
    </div>
  </div>
);

export default UserBox;
