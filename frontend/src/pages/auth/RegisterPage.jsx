import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama_lengkap: '', email: '', password: '', no_telp: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      setSuccess('Registrasi berhasil! Silakan masuk.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
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
          <h1>Registrasi</h1>
          <p>Enter Your Detail Below</p>

          {error   && <div className="auth-error">{error}</div>}
          {success && <div className="auth-error" style={{ background: '#052e16', borderColor: '#166534', color: '#86efac' }}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Nama Lengkap</label>
              <input id="reg-nama" name="nama_lengkap" type="text" className="auth-input"
                placeholder="Ghost Legion" value={form.nama_lengkap} onChange={handleChange} required />
            </div>
            <div className="auth-input-group">
              <label>Email</label>
              <input id="reg-email" name="email" type="email" className="auth-input"
                placeholder="ghostlegion@gmail.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="auth-input-group">
              <label>No. Telepon</label>
              <input id="reg-telp" name="no_telp" type="tel" className="auth-input"
                placeholder="08xxxxxxxxxx" value={form.no_telp} onChange={handleChange} />
            </div>
            <div className="auth-input-group">
              <label>Password</label>
              <input id="reg-password" name="password" type="password" className="auth-input"
                placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>

            <button id="btn-register" type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Mendaftarkan...' : 'Registrasi'}
            </button>
          </form>

          <p className="auth-alt">
            Sudah punya akun? <Link to="/login">Masuk disini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
