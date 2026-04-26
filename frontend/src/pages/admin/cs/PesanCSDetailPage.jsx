// Admin - CS Message Detail Page
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PesanCSDetailPage() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // TODO: Fetch message detail
  }, [id]);

  const handleReply = async () => {
    // TODO: Send reply
  };

  if (!message) return <p>Loading...</p>;

  return (
    <div className="pesan-cs-detail-page">
      <div className="message-detail">
        <h2>{message.subject}</h2>
        <p><strong>From:</strong> {message.customer_name}</p>
        <p><strong>Date:</strong> {new Date(message.created_at).toLocaleDateString()}</p>
        <div className="message-content">
          <p>{message.message}</p>
        </div>
      </div>

      {message.reply && (
        <div className="message-reply">
          <h3>Reply</h3>
          <p>{message.reply}</p>
        </div>
      )}

      {!message.reply && (
        <form onSubmit={handleReply} className="reply-form">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            required
          />
          <button type="submit">Send Reply</button>
        </form>
      )}
    </div>
  );
}
