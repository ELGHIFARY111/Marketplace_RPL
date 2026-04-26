import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PromosiFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ 
    id_produk: '',
    nama_promosi: '',
    persentase: '',
    tgl_mulai: '',
    tgl_selesai: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const prodRes = await api.get('/produk');
      setProducts(prodRes.data);

      if (isEdit) {
        const { data } = await api.get('/promosi');
        const promo = data.find(p => p.id_promosi.toString() === id);
        if (promo) {
          setForm({ 
            id_produk: promo.id_produk,
            nama_promosi: promo.nama_promosi,
            persentase: promo.persentase,
            // Format to YYYY-MM-DD for input type="date"
            tgl_mulai: new Date(promo.tgl_mulai).toISOString().split('T')[0],
            tgl_selesai: new Date(promo.tgl_selesai).toISOString().split('T')[0]
          });
        } else {
          alert('Promosi tidak ditemukan');
          navigate('/admin/promosi');
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/promosi/${id}`, form);
      } else {
        await api.post('/promosi', form);
      }
      alert(`Promosi berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
      navigate('/admin/promosi');
    } catch (err) {
      alert(err.response?.data?.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} promosi`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/promosi" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>{isEdit ? 'Edit Promosi' : 'Tambah Promosi'}</h1>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Pilih Produk</label>
            <select 
              required
              className="form-control"
              value={form.id_produk}
              onChange={e => setForm({...form, id_produk: e.target.value})}
            >
              <option value="">-- Pilih Produk --</option>
              {products.map(p => (
                <option key={p.id_produk} value={p.id_produk}>{p.nama_produk}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nama Promosi</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={form.nama_promosi}
              onChange={e => setForm({...form, nama_promosi: e.target.value})}
              placeholder="Contoh: Diskon Flash Sale"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Persentase Diskon (%)</label>
            <input 
              type="number" 
              required
              min="1"
              max="100"
              className="form-control"
              value={form.persentase}
              onChange={e => setForm({...form, persentase: e.target.value})}
              placeholder="Contoh: 20"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Tanggal Mulai</label>
              <input 
                type="date" 
                required
                className="form-control"
                value={form.tgl_mulai}
                onChange={e => setForm({...form, tgl_mulai: e.target.value})}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Tanggal Selesai</label>
              <input 
                type="date" 
                required
                className="form-control"
                value={form.tgl_selesai}
                onChange={e => setForm({...form, tgl_selesai: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Promosi')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromosiFormPage;
