import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AkunEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    no_hp: '',
    level_akses: 'customer',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`);
        setForm({
          nama_lengkap: data.nama_lengkap || '',
          email: data.email || '',
          no_hp: data.no_hp || '',
          level_akses: data.level_akses || 'customer',
        });
      } catch (err) {
        setError('Gagal memuat data akun');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put(`/users/${id}`, form);
      alert('Akun berhasil diperbarui!');
      navigate('/admin/akun');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui akun');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/admin/akun');

  if (loading) return <LoadingSpinner text="Memuat data akun..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Akun dan Akses <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>Akun &gt; edit</span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={handleCancel} className="btn" style={{ background: '#e0e0e0', border: 'none', color: '#111' }}>
          Batal
        </button>
        <button
          form="akun-edit-form"
          type="submit"
          className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none' }}
          disabled={saving}
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <form id="akun-edit-form" onSubmit={handleSubmit}>
        {[
          { label: 'Nama Lengkap', key: 'nama_lengkap', type: 'text', placeholder: 'Masukkan Nama Lengkap ...' },
          { label: 'Email', key: 'email', type: 'email', placeholder: 'Masukkan Email ...' },
          { label: 'No. HP', key: 'no_hp', type: 'text', placeholder: 'Masukkan No. HP ...' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
            <label style={{ width: '220px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>{label}</label>
            <input
              type={type}
              required
              className="form-control"
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{ maxWidth: '500px' }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '220px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Level Akses</label>
          <select
            required
            className="form-control"
            value={form.level_akses}
            onChange={e => setForm({ ...form, level_akses: e.target.value })}
            style={{ maxWidth: '500px' }}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default AkunEditPage;
