import React from "react";

type CheckoutCardProps = {
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  onRemove: () => void;
};

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  productName,
  productImage,
  price,
  quantity,
  onRemove,
}) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        background: "#fff",
      }}
    >
      <img
        src={productImage}
        alt={productName}
        style={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "16px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 8px 0" }}>{productName}</h3>
        <p style={{ margin: 0 }}>Quantity: {quantity}</p>
        <p style={{ margin: "8px 0 0 0", fontWeight: "bold" }}>
          ${(price * quantity).toFixed(2)}
        </p>
      </div>
      <button
        onClick={onRemove}
        style={{
          background: "#ff5252",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default CheckoutCard;
