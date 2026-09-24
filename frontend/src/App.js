import React, { useEffect, useState } from "react";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch(() => {
        setBackendStatus("DOWN");
      });

    fetch("/api/message")
      .then((response) => response.json())
      .then((data) => {
        setBackendMessage(data.message);
      })
      .catch(() => {
        setBackendMessage("Backend is unavailable");
      });
  }, []);

  return (
    <div>
      <h1>Three Tier Application</h1>

      <h2>Frontend</h2>
      <p>Status: UP</p>

      <h2>Backend</h2>
      <p>Status: {backendStatus}</p>
      <p>Message: {backendMessage}</p>

      <h2>Architecture</h2>
      <p>React → Node.js → PostgreSQL + Redis</p>
    </div>
  );
}

export default App;
