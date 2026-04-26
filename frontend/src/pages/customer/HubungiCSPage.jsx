// Customer Page Template
export default function HubungiCSPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send message to CS
  };

  return (
    <div className="hubungi-cs-page">
      <h1>Contact Customer Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" placeholder="Issue subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="6" placeholder="Describe your issue" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
