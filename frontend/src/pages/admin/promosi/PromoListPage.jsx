import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const PromoListPage = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const { data } = await api.get('/promosi');
      setPromos(data);
    } catch (err) {
      console.error('Failed to fetch promos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus promo ini?')) return;
    try {
      await api.delete(`/promosi/${id}`);
      fetchPromos();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus promo');
    }
  };

  const filtered = promos.filter(p =>
    p.nama_produk?.toLowerCase().includes(search.toLowerCase()) ||
    p.nama_promosi?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner text="Memuat data promo..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Promo
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Promosi &gt; promo
        </p>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Cari Promo ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingRight: '2.5rem' }}
          />
          <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}>🔍</span>
        </div>
        <Link to="/admin/promosi/promo/tambah" className="btn" style={{ background: '#4caf50', color: '#fff', border: 'none', whiteSpace: 'nowrap' }}>
          + Tambah Promo
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produk</th>
              <th>Nama Promo</th>
              <th>Diskon</th>
              <th>Mulai</th>
              <th>Selesai</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const now = new Date();
              const start = new Date(p.tgl_mulai);
              const end = new Date(p.tgl_selesai);
              const isActive = now >= start && now <= end;
              return (
                <tr key={p.id_promosi}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{p.nama_produk}</td>
                  <td>{p.nama_promosi}</td>
                  <td>{p.persentase}%</td>
                  <td>{start.toLocaleDateString('id-ID')}</td>
                  <td>{end.toLocaleDateString('id-ID')}</td>
                  <td>
                    <span className={`badge ${isActive ? 'badge-green' : 'badge-red'}`}>
                      {isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Link
                        to={`/admin/promosi/promo/${p.id_promosi}/edit`}
                        className="btn btn-sm"
                        style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id_promosi)}
                        className="btn btn-sm"
                        style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                  Belum ada data promo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromoListPage;
