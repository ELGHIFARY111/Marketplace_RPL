import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError('Password tidak cocok');
    }
    
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, newPassword: form.password });
      alert('Password berhasil direset. Silakan login dengan password baru.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mereset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Token Tidak Valid</h2>
          <p>Link reset password tidak valid atau sudah kadaluarsa.</p>
          <Link to="/forgot-password" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>Minta Link Baru</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Masukkan password baru untuk akun Anda.</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Password Baru</label>
            <input 
              type="password" 
              required
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              placeholder="Minimal 6 karakter"
              minLength={6}
            />
          </div>
          
          <div className="form-group">
            <label>Konfirmasi Password</label>
            <input 
              type="password" 
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              placeholder="Ulangi password baru"
              minLength={6}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
          </button>
        </form>
        
        <div className="auth-footer">
          <Link to="/login">Kembali ke halaman Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
