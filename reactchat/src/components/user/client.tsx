import React, { useEffect, useState } from "react";

type Client = {
  id: number;
  name: string;
  email: string;
};

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("/api/clients/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clients");
        return res.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Clients</h2>
      {clients.length === 0 ? (
        <div>No clients found.</div>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>{client.name}</strong> ({client.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientList;
