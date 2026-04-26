import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UserFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    nama_lengkap: '',
    email: '',
    password: '',
    no_telp: '',
    role: 'Admin'
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get(`/users/${id}`);
      setForm({ 
        nama_lengkap: data.nama_lengkap,
        email: data.email,
        password: '', // Blank for edit
        no_telp: data.no_telp || '',
        role: data.role
      });
    } catch (err) {
      console.error('Failed to fetch user:', err);
      alert('Pengguna tidak ditemukan');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (isEdit && !payload.password) {
        delete payload.password; // Don't update password if not provided
      }

      if (isEdit) {
        await api.put(`/users/${id}`, payload);
      } else {
        await api.post('/auth/register', payload); // Or a specific admin create user endpoint
      }
      alert(`Pengguna berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
      navigate('/admin/users');
    } catch (err) {
      alert(err.response?.data?.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} pengguna`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/users" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>{isEdit ? 'Edit Pengguna' : 'Tambah Admin / Pengguna'}</h1>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nama Lengkap</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={form.nama_lengkap}
              onChange={e => setForm({...form, nama_lengkap: e.target.value})}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
            <input 
              type="email" 
              required
              className="form-control"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nomor Telepon</label>
            <input 
              type="text" 
              className="form-control"
              value={form.no_telp}
              onChange={e => setForm({...form, no_telp: e.target.value})}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Role</label>
            <select 
              required
              className="form-control"
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>
              {isEdit ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password'}
            </label>
            <input 
              type="password" 
              required={!isEdit}
              className="form-control"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Pengguna')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFormPage;
