import React from "react";

const plans = [
  {
    name: "Basic",
    price: "$5/mo",
    features: [
      "Access to chat rooms",
      "Basic support",
      "Limited message history",
    ],
  },
  {
    name: "Pro",
    price: "$15/mo",
    features: [
      "All Basic features",
      "Priority support",
      "Unlimited message history",
      "File sharing",
    ],
  },
  {
    name: "Premium",
    price: "$30/mo",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom integrations",
      "Early access to new features",
    ],
  },
];

const Subscription: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Choose Your Subscription</h2>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "2rem",
              width: 250,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <h3>{plan.name}</h3>
            <p
              style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}
            >
              {plan.price}
            </p>
            <ul
              style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}
            >
              {plan.features.map((feature) => (
                <li key={feature} style={{ marginBottom: "0.5rem" }}>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
