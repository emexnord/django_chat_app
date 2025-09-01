import React from "react";

const SamplePage: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Sample Page</h1>
      <p>This is a simple React page component.</p>
      <button onClick={() => alert("Button clicked!")}>Click Me</button>
    </div>
  );
};

export default SamplePage;
