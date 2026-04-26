import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token, {
        nama_lengkap: res.data.nama_lengkap,
        level_akses: res.data.level_akses,
      });
      navigate(res.data.level_akses === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-brand-logo">ZENVY</div>
        <p className="auth-brand-tagline">Selamat Datang di masa depan fashion</p>
        <div className="auth-brand-image">👕</div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-box">
          <h1>Masuk</h1>
          <p>Masukkan Detail Anda Dibawah</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="ghostlegion@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Link to="/forgot-password" className="auth-forgot">
              Lupa kata sandi? Klik disini
            </Link>

            <button id="btn-login" type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="auth-alt">
            Belum punya akun?{' '}
            <Link to="/register">Registrasi disini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
