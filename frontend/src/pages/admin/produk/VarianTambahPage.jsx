import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const WARNA_OPTIONS = ['Merah', 'Biru', 'Hijau', 'Hitam', 'Putih', 'Kuning', 'Abu-abu', 'Cokelat', 'Orange', 'Ungu'];
const UKURAN_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const VarianTambahPage = () => {
  const { id } = useParams(); // product id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ warna: '', ukuran: '', harga: 0, stok: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/produk/${id}`);
        setProduct(data);
        if (data.harga) setForm(prev => ({ ...prev, harga: data.harga }));
      } catch (err) {
        setError('Gagal memuat data produk');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post(`/produk/${id}/varian`, form);
      alert('Varian berhasil ditambahkan!');
      navigate(`/admin/produk/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambah varian');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate(`/admin/produk/${id}`);

  const adjustNum = (key, delta) => {
    setForm(prev => ({ ...prev, [key]: Math.max(0, Number(prev[key]) + delta) }));
  };

  if (loading) return <LoadingSpinner text="Memuat form varian..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Produk dan Stok{' '}
          <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>
            Produk &gt; detail &gt; variasi tambah
          </span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={handleCancel} className="btn" style={{ background: '#e0e0e0', border: 'none', color: '#111' }}>
          Batal
        </button>
        <button form="varian-tambah-form" type="submit" className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none' }} disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <form id="varian-tambah-form" onSubmit={handleSubmit}>
        {/* SKU - auto-generated placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '140px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>SKU</label>
          <input
            type="text"
            readOnly
            className="form-control"
            value={`M_${Math.floor(100 + Math.random() * 900)}`}
            style={{ maxWidth: '520px', background: '#f0f0f0', cursor: 'not-allowed' }}
          />
        </div>

        {/* Warna */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '140px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Warna</label>
          <select required className="form-control" value={form.warna}
            onChange={e => setForm({ ...form, warna: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }}>
            <option value="">Pilih Warna...</option>
            {WARNA_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>

        {/* Ukuran */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '140px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Ukuran</label>
          <select required className="form-control" value={form.ukuran}
            onChange={e => setForm({ ...form, ukuran: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }}>
            <option value="">Pilih Ukuran...</option>
            {UKURAN_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* Stok - stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '140px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Stok</label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', maxWidth: '520px', width: '100%' }}>
            <button type="button" onClick={() => adjustNum('stok', 1)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', fontWeight: 700 }}>+</button>
            <input type="number" value={form.stok} min={0}
              onChange={e => setForm({ ...form, stok: Math.max(0, Number(e.target.value)) })}
              style={{ flex: 1, border: 'none', background: 'none', textAlign: 'center', fontSize: '1rem', padding: '0.5rem' }} />
            <button type="button" onClick={() => adjustNum('stok', -1)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', fontWeight: 700 }}>−</button>
          </div>
        </div>

        {/* Harga - stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <label style={{ width: '140px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Harga</label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', maxWidth: '520px', width: '100%' }}>
            <button type="button" onClick={() => adjustNum('harga', 1000)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', fontWeight: 700 }}>+</button>
            <input type="number" value={form.harga} min={0}
              onChange={e => setForm({ ...form, harga: Math.max(0, Number(e.target.value)) })}
              style={{ flex: 1, border: 'none', background: 'none', textAlign: 'center', fontSize: '1rem', padding: '0.5rem' }} />
            <button type="button" onClick={() => adjustNum('harga', -1000)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', fontWeight: 700 }}>−</button>
          </div>
        </div>
      </form>

      {/* Existing Variants Table */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />
      <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Variasi Produk</h3>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Warna</th>
              <th>Ukuran</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {product?.varian?.map((v, i) => (
              <tr key={v.id_varian}>
                <td>{i + 1}</td>
                <td>{v.sku || `M_${v.id_varian}`}</td>
                <td>{v.warna}</td>
                <td>{v.ukuran}</td>
                <td>{v.stok}</td>
                <td>{formatRupiah(v.harga)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn btn-sm" style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}>Detail</button>
                    <button className="btn btn-sm" style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}>Edit</button>
                    <button className="btn btn-sm" style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px' }}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {(!product?.varian || product.varian.length === 0) && (
              <tr><td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>Belum ada variasi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VarianTambahPage;
