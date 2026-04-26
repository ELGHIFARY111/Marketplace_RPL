import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { User, LogOut } from 'lucide-react';

const ProfilPage = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nama_lengkap: '',
    email: '',
    no_telp: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        password: '' // Don't populate password
      });
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    setSaving(true);
    try {
      const payload = { ...profile };
      if (!payload.password) delete payload.password; // Only send if changed

      await api.put(`/users/${user.id}`, payload);
      alert('Profil berhasil diperbarui!');
      
      // Update context user if name changed
      setUser({ ...user, nama_lengkap: profile.nama_lengkap });
      setIsEditing(false);
      
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div style={{ padding: '6rem 0', display: 'flex', justifyContent: 'center' }}><LoadingSpinner text="Memuat profil..." /></div>;

  return (
    <div style={{ padding: '3rem 0', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <User size={32} />
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#000', margin: 0 }}>Profil</h1>
      </div>

      <div style={{ background: '#fff', padding: '3rem', borderRadius: '32px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)' }}>
        
        {/* Avatar Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eee', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f5f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#000' }}>
              {profile.nama_lengkap.charAt(0)}
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{profile.nama_lengkap}</h2>
              <p style={{ color: '#666', margin: 0 }}>Pelanggan Zenvy</p>
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={() => setIsEditing(!isEditing)}
            style={{ padding: '0.5rem 1.5rem', border: '1px solid #000', background: isEditing ? '#000' : 'transparent', color: isEditing ? '#fff' : '#000', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
          >
            {isEditing ? 'Batal' : 'Edit Profil'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: '#000' }}>Nama Lengkap</label>
              <input 
                type="text" 
                required
                disabled={!isEditing}
                value={profile.nama_lengkap}
                onChange={e => setProfile({...profile, nama_lengkap: e.target.value})}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: isEditing ? '#fff' : '#f9f9f9', color: '#333', fontSize: '1rem', transition: 'all 0.2s' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: '#000' }}>Kata Sandi</label>
              <input 
                type="password" 
                disabled={!isEditing}
                value={profile.password}
                onChange={e => setProfile({...profile, password: e.target.value})}
                placeholder={isEditing ? "Isi untuk mengubah password" : "••••••••"}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: isEditing ? '#fff' : '#f9f9f9', color: '#333', fontSize: '1rem', transition: 'all 0.2s' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: '#000' }}>Email</label>
              <input 
                type="email" 
                required
                disabled={!isEditing}
                value={profile.email}
                onChange={e => setProfile({...profile, email: e.target.value})}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: isEditing ? '#fff' : '#f9f9f9', color: '#333', fontSize: '1rem', transition: 'all 0.2s' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: '#000' }}>No Telepon</label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={profile.no_telp}
                onChange={e => setProfile({...profile, no_telp: e.target.value})}
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #eee', background: isEditing ? '#fff' : '#f9f9f9', color: '#333', fontSize: '1rem', transition: 'all 0.2s' }}
              />
            </div>

          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              type="button" 
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            >
              <LogOut size={20} />
              Keluar
            </button>

            {isEditing && (
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '0.75rem 2.5rem', fontSize: '1rem' }}
                disabled={saving}
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfilPage;
