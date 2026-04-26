import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PromoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id_produk: '',
    nama_promosi: '',
    tgl_mulai: '',
    tgl_selesai: '',
    persentase: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, promoRes] = await Promise.all([
          api.get('/produk'),
          api.get('/promosi'),
        ]);
        setProducts(prodRes.data);
        const promo = promoRes.data.find(p => p.id_promosi.toString() === id);
        if (promo) {
          setForm({
            id_produk: promo.id_produk,
            nama_promosi: promo.nama_promosi,
            tgl_mulai: new Date(promo.tgl_mulai).toISOString().split('T')[0],
            tgl_selesai: new Date(promo.tgl_selesai).toISOString().split('T')[0],
            persentase: promo.persentase,
          });
        } else {
          alert('Promo tidak ditemukan');
          navigate('/admin/promosi/promo');
        }
      } catch (err) {
        setError('Gagal memuat data promo');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put(`/promosi/${id}`, form);
      alert('Promo berhasil diperbarui!');
      navigate('/admin/promosi/promo');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui promo');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/admin/promosi/promo');

  const adjustNum = (delta) => {
    setForm(prev => ({ ...prev, persentase: Math.min(100, Math.max(0, Number(prev.persentase) + delta)) }));
  };

  if (loading) return <LoadingSpinner text="Memuat data promo..." />;

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Promo <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>Edit</span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={handleCancel} className="btn" style={{ background: '#e0e0e0', border: 'none', color: '#111' }}>Batal</button>
        <button form="promo-edit-form" type="submit" className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none' }} disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <form id="promo-edit-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Pilih Produk</label>
          <select required className="form-control" value={form.id_produk}
            onChange={e => setForm({ ...form, id_produk: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }}>
            <option value="">Pilih Produk ...</option>
            {products.map(p => <option key={p.id_produk} value={p.id_produk}>{p.nama_produk}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Nama Promo</label>
          <input type="text" required className="form-control" value={form.nama_promosi}
            onChange={e => setForm({ ...form, nama_promosi: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Tanggal Mulai</label>
          <input type="date" required className="form-control" value={form.tgl_mulai}
            onChange={e => setForm({ ...form, tgl_mulai: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Tanggal Kadaluarsa</label>
          <input type="date" required className="form-control" value={form.tgl_selesai}
            onChange={e => setForm({ ...form, tgl_selesai: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Presentase Diskon</label>
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

export default PromoEditPage;
