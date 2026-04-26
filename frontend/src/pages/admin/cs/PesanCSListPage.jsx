// CS Message List Page Template (Admin)
import { useState, useEffect } from 'react';

export default function PesanCSListPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: Fetch all CS messages
  }, []);

  return (
    <div className="pesan-cs-list-page">
      <h1>Customer Service Messages</h1>
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <h4>{msg.subject}</h4>
            <p><strong>From:</strong> {msg.customer_name}</p>
            <p><strong>Date:</strong> {new Date(msg.created_at).toLocaleDateString()}</p>
            <p className="preview">{msg.message}</p>
            <a href={`/admin/cs/${msg.id}`}>View</a>
          </div>
        ))}
      </div>
    </div>
  );
}
