import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-brand-logo">ZENVY</div>
        <p className="auth-brand-tagline">Selamat Datang di masa depan fashion</p>
        <div className="auth-brand-image">🔒</div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-box">
          <h1>Lupa Password?</h1>
          <p>Masukkan Email anda untuk reset password</p>

          {error && <div className="auth-error">{error}</div>}
          {sent  && (
            <div className="auth-error" style={{ background: '#052e16', borderColor: '#166534', color: '#86efac' }}>
              Link reset password telah dikirim ke email Anda.
            </div>
          )}

          {!sent && (
            <form onSubmit={handleSubmit}>
              <div className="auth-input-group">
                <label>Email</label>
                <input id="forgot-email" name="email" type="email" className="auth-input"
                  placeholder="ghostlegion@gmail.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button id="btn-forgot" type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Mengirim...' : 'Kirim'}
              </button>
            </form>
          )}

          <p className="auth-alt">
            <Link to="/login">← Kembali Ke halaman Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
