import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const KategoriFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ nama_kategori: '' });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchKategori();
    }
  }, [id]);

  const fetchKategori = async () => {
    try {
      // API doesn't have a specific get by id for kategori, we fetch all and find
      const { data } = await api.get('/kategori');
      const cat = data.find(c => c.id_kategori.toString() === id);
      if (cat) {
        setForm({ nama_kategori: cat.nama_kategori });
      } else {
        alert('Kategori tidak ditemukan');
        navigate('/admin/kategori');
      }
    } catch (err) {
      console.error('Failed to fetch kategori:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/kategori/${id}`, form);
      } else {
        await api.post('/kategori', form);
      }
      alert(`Kategori berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
      navigate('/admin/kategori');
    } catch (err) {
      alert(err.response?.data?.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} kategori`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/kategori" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>{isEdit ? 'Edit Kategori' : 'Tambah Kategori'}</h1>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nama Kategori</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={form.nama_kategori}
              onChange={e => setForm({...form, nama_kategori: e.target.value})}
              placeholder="Contoh: Kemeja Pria"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Kategori')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KategoriFormPage;
