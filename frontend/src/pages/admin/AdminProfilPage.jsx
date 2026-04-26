import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminProfilPage = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({
    nama_lengkap: '',
    email: '',
    no_telp: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/users/${user.id}`);
      setProfile({
        nama_lengkap: data.nama_lengkap || '',
        email: data.email || '',
        no_telp: data.no_telp || '',
        password: ''
      });
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...profile };
      if (!payload.password) delete payload.password;

      await api.put(`/users/${user.id}`, payload);
      alert('Profil berhasil diperbarui!');
      setUser({ ...user, nama: profile.nama_lengkap });
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat profil..." />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Profil Admin</h1>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nama Lengkap</label>
              <input 
                type="text" 
                required
                className="form-control"
                value={profile.nama_lengkap}
                onChange={e => setProfile({...profile, nama_lengkap: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
              <input 
                type="email" 
                required
                className="form-control"
                value={profile.email}
                onChange={e => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>No. Telepon</label>
              <input 
                type="text" 
                className="form-control"
                value={profile.no_telp}
                onChange={e => setProfile({...profile, no_telp: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Password Baru (Opsional)</label>
              <input 
                type="password" 
                className="form-control"
                value={profile.password}
                onChange={e => setProfile({...profile, password: e.target.value})}
                placeholder="Kosongkan jika tidak diubah"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilPage;
