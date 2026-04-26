import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const ProdukDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Varian form state
  const [showVarianForm, setShowVarianForm] = useState(false);
  const [varianForm, setVarianForm] = useState({ warna: '', ukuran: '', harga: '', stok: '' });
  const [savingVarian, setSavingVarian] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const { data } = await api.get(`/produk/${id}`);
      setProduct(data);
    } catch (err) {
      console.error('Failed to fetch detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVarian = async (e) => {
    e.preventDefault();
    setSavingVarian(true);
    try {
      await api.post(`/produk/${id}/varian`, varianForm);
      alert('Varian berhasil ditambahkan');
      setShowVarianForm(false);
      setVarianForm({ warna: '', ukuran: '', harga: '', stok: '' });
      fetchDetail();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambah varian');
    } finally {
      setSavingVarian(false);
    }
  };

  const handleDeleteVarian = async (idVarian) => {
    if (!window.confirm('Hapus varian ini?')) return;
    try {
      await api.delete(`/produk/${id}/varian/${idVarian}`);
      fetchDetail();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus varian');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat detail produk..." />;
  if (!product) return <div>Produk tidak ditemukan</div>;

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin/produk" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
          <h1 style={{ margin: 0 }}>Detail Produk</h1>
        </div>
        <Link to={`/admin/produk/edit/${id}`} className="btn btn-primary">Edit Produk</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Informasi Dasar</h3>
          <p><strong>Nama:</strong> {product.nama_produk}</p>
          <p><strong>Kategori:</strong> {product.nama_kategori}</p>
          <p><strong>Harga Dasar:</strong> {formatRupiah(product.harga)}</p>
          <p><strong>Stok Global:</strong> {product.stok}</p>
          <p><strong>Berat:</strong> {product.berat} gram</p>
          <p style={{ marginTop: '1rem' }}><strong>Deskripsi:</strong></p>
          <p style={{ color: '#ccc', whiteSpace: 'pre-wrap' }}>{product.deskripsi}</p>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Foto Produk</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {product.foto?.map((f, i) => (
              <img 
                key={i}
                src={f.file_foto && f.file_foto !== 'placeholder.jpg' ? `${API_URL}/${f.file_foto}` : 'https://placehold.co/100x100/1a1a1a/fff'} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }}
                alt=""
              />
            ))}
            {(!product.foto || product.foto.length === 0) && <p style={{ color: '#888' }}>Belum ada foto.</p>}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>Varian Produk</h3>
          <button className="btn btn-outline" onClick={() => setShowVarianForm(!showVarianForm)}>
            {showVarianForm ? 'Batal' : '+ Tambah Varian'}
          </button>
        </div>

        {showVarianForm && (
          <form onSubmit={handleAddVarian} style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Warna</label>
                <input type="text" className="form-control" required value={varianForm.warna} onChange={e => setVarianForm({...varianForm, warna: e.target.value})} placeholder="Misal: Merah" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Ukuran</label>
                <input type="text" className="form-control" required value={varianForm.ukuran} onChange={e => setVarianForm({...varianForm, ukuran: e.target.value})} placeholder="Misal: XL" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Harga Spesifik</label>
                <input type="number" className="form-control" required value={varianForm.harga} onChange={e => setVarianForm({...varianForm, harga: e.target.value})} placeholder="Rp..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Stok Spesifik</label>
                <input type="number" className="form-control" required value={varianForm.stok} onChange={e => setVarianForm({...varianForm, stok: e.target.value})} placeholder="Jumlah stok" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={savingVarian}>
              {savingVarian ? 'Menyimpan...' : 'Simpan Varian'}
            </button>
          </form>
        )}

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Warna</th>
                <th>Ukuran</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {product.varian?.map(v => (
                <tr key={v.id_varian}>
                  <td>{v.warna}</td>
                  <td>{v.ukuran}</td>
                  <td>{formatRupiah(v.harga)}</td>
                  <td>{v.stok}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteVarian(v.id_varian)}
                      className="btn btn-outline" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ff4444', borderColor: '#ff4444' }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {(!product.varian || product.varian.length === 0) && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>Belum ada varian. Tambahkan varian untuk produk ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetailPage;
