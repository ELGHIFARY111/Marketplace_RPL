import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const KurirFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    nama_kurir: '',
    biaya_per_kg: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchKurir();
    }
  }, [id]);

  const fetchKurir = async () => {
    try {
      const { data } = await api.get('/kurir');
      const kurir = data.find(k => k.id_kurir.toString() === id);
      if (kurir) {
        setForm({ 
          nama_kurir: kurir.nama_kurir,
          biaya_per_kg: kurir.biaya_per_kg
        });
      } else {
        alert('Kurir tidak ditemukan');
        navigate('/admin/kurir');
      }
    } catch (err) {
      console.error('Failed to fetch kurir:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/kurir/${id}`, form);
      } else {
        await api.post('/kurir', form);
      }
      alert(`Kurir berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
      navigate('/admin/kurir');
    } catch (err) {
      alert(err.response?.data?.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} kurir`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/kurir" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>{isEdit ? 'Edit Kurir' : 'Tambah Kurir'}</h1>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nama Kurir / Layanan</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={form.nama_kurir}
              onChange={e => setForm({...form, nama_kurir: e.target.value})}
              placeholder="Contoh: JNE REG"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Biaya per Kg (Rp)</label>
            <input 
              type="number" 
              required
              className="form-control"
              value={form.biaya_per_kg}
              onChange={e => setForm({...form, biaya_per_kg: e.target.value})}
              placeholder="Contoh: 15000"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Kurir')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KurirFormPage;
