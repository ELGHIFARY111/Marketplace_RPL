import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ProdukListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filtered = products.filter(p =>
    p.nama_produk?.toLowerCase().includes(search.toLowerCase()) ||
    p.nama_kategori?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner text="Memuat data produk..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Produk dan Stok <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>Produk</span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Pencarian ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingRight: '2.5rem', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px' }}
          />
          <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}>🔍</span>
        </div>
        <Link to="/admin/produk/tambah" className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none', whiteSpace: 'nowrap', borderRadius: '8px' }}>
          Tambah +
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id_produk}>
                <td style={{ fontWeight: 600, textAlign: 'center' }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{p.nama_produk}</td>
                <td>{p.nama_kategori}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <Link
                      to={`/admin/produk/${p.id_produk}`}
                      className="btn btn-sm"
                      style={{ background: '#d9d9d9', border: 'none', color: '#222', borderRadius: '6px', padding: '0.3rem 0.9rem' }}
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/admin/produk/edit/${p.id_produk}`}
                      className="btn btn-sm"
                      style={{ background: '#d9d9d9', border: 'none', color: '#222', borderRadius: '6px', padding: '0.3rem 0.9rem' }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id_produk)}
                      className="btn btn-sm"
                      style={{ background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.3rem 0.9rem' }}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                  Belum ada produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProdukListPage;
