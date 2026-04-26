import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const ProdukListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/produk');
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus produk ini? Semua data terkait (varian, foto, ulasan) juga akan terhapus.')) return;
    
    try {
      await api.delete(`/produk/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus produk');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data produk..." />;

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Kelola Produk</h1>
        <Link to="/admin/produk/tambah" className="btn btn-primary">+ Tambah Produk</Link>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga Dasar</th>
                <th>Stok Global</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id_produk}>
                  <td>
                    <img 
                      src={p.file_foto && p.file_foto !== 'placeholder.jpg' ? `${API_URL}/${p.file_foto}` : 'https://placehold.co/40x40/1a1a1a/fff'} 
                      alt={p.nama_produk}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td>{p.nama_produk}</td>
                  <td>{p.nama_kategori}</td>
                  <td>{formatRupiah(p.harga)}</td>
                  <td>{p.stok}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/admin/produk/${p.id_produk}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Detail / Varian</Link>
                      <Link to={`/admin/produk/edit/${p.id_produk}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Edit</Link>
                      <button 
                        onClick={() => handleDelete(p.id_produk)}
                        className="btn btn-outline" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ff4444', borderColor: '#ff4444' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>Belum ada produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProdukListPage;
