// Admin - Forgot Password Page
export default function ForgotPasswordPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send reset password email
  };

  return (
    <div className="forgot-password-page">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <p>Enter your email to receive password reset instructions</p>
        <input type="email" placeholder="Email" required />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
