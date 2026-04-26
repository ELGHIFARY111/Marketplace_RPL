import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PromoTambahPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id_produk: '',
    nama_promosi: '',
    tgl_selesai: '',
    persentase: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/produk');
        setProducts(data);
      } catch (err) {
        setError('Gagal memuat daftar produk');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/promosi', { ...form, tgl_mulai: new Date().toISOString().split('T')[0] });
      alert('Promo berhasil ditambahkan!');
      navigate('/admin/promosi/promo');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambah promo');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/admin/promosi/promo');

  const adjustNum = (delta) => {
    setForm(prev => ({ ...prev, persentase: Math.min(100, Math.max(0, Number(prev.persentase) + delta)) }));
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Promo <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>Tambah</span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={handleCancel} className="btn" style={{ background: '#e0e0e0', border: 'none', color: '#111' }}>
          Batal
        </button>
        <button form="promo-form" type="submit" className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none' }} disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <form id="promo-form" onSubmit={handleSubmit}>
        {/* Pilih Produk */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Pilih Produk</label>
          <select
            required
            className="form-control"
            value={form.id_produk}
            onChange={e => setForm({ ...form, id_produk: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }}
          >
            <option value="">Pilih atau Masukkan Produk ....</option>
            {products.map(p => (
              <option key={p.id_produk} value={p.id_produk}>{p.nama_produk}</option>
            ))}
          </select>
        </div>

        {/* Nama Promosi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Nama Promo</label>
          <input type="text" required className="form-control" placeholder="Masukkan Nama Promo ..."
            value={form.nama_promosi} onChange={e => setForm({ ...form, nama_promosi: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }} />
        </div>

        {/* Tanggal Selesai */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Masukkan Tanggal Kadaluarsa</label>
          <input type="date" required className="form-control" value={form.tgl_selesai}
            onChange={e => setForm({ ...form, tgl_selesai: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }} />
        </div>

        {/* Persentase Diskon - stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Masukkan Presentase Diskon</label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', maxWidth: '520px', width: '100%' }}>
            <button type="button" onClick={() => adjustNum(1)} style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 700 }}>+</button>
            <span style={{ flex: 1, textAlign: 'center', fontSize: '1rem' }}>{form.persentase}%</span>
            <button type="button" onClick={() => adjustNum(-1)} style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 700 }}>−</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromoTambahPage;
