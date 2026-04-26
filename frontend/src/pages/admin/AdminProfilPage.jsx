import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminProfilPage = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({
    nama_lengkap: '',
    email: '',
    no_hp: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/users/${user.id}`);
      setProfile({
        nama_lengkap: data.nama_lengkap || '',
        email: data.email || '',
        no_hp: data.no_hp || '',
        password: ''
      });
    } catch (err) {
      setError('Gagal memuat profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...profile };
      if (!payload.password) delete payload.password;
      await api.put(`/users/${user.id}`, payload);
      alert('Profil berhasil diperbarui!');
      setUser({ ...user, nama: profile.nama_lengkap });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat profil..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Profil
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Akun &gt; profil
        </p>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button
          form="profil-form"
          type="submit"
          className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '0.6rem 2rem' }}
          disabled={saving}
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <form id="profil-form" onSubmit={handleSubmit}>
        {[
          { label: 'Nama Lengkap', key: 'nama_lengkap', type: 'text', placeholder: 'Masukkan Nama Lengkap...' },
          { label: 'Email', key: 'email', type: 'email', placeholder: 'Masukkan Email...' },
          { label: 'No. Telepon', key: 'no_hp', type: 'text', placeholder: 'Masukkan No. HP...' },
          { label: 'Password Baru', key: 'password', type: 'password', placeholder: 'Kosongkan jika tidak diubah' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
            <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>{label}</label>
            <input
              type={type}
              className="form-control"
              placeholder={placeholder}
              value={profile[key]}
              onChange={e => setProfile({ ...profile, [key]: e.target.value })}
              required={key !== 'password' && key !== 'no_hp'}
              style={{ maxWidth: '520px', background: '#f0f0f0', border: 'none', borderRadius: '8px' }}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default AdminProfilPage;
