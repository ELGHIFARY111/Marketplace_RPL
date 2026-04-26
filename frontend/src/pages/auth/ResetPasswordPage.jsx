// Reset Password Page
export default function ResetPasswordPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Reset password with token
  };

  return (
    <div className="reset-password-page">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <input type="password" placeholder="New Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
