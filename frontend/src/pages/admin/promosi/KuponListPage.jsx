import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const KuponListPage = () => {
  const [kupons, setKupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchKupons();
  }, []);

  const fetchKupons = async () => {
    try {
      const { data } = await api.get('/kupon');
      setKupons(data);
    } catch (err) {
      console.error('Failed to fetch kupons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus kupon ini?')) return;
    try {
      await api.delete(`/kupon/${id}`);
      fetchKupons();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus kupon');
    }
  };

  const filtered = kupons.filter(k =>
    k.kode_kupon?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner text="Memuat data kupon..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Kupon
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Promosi &gt; kupon
        </p>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Cari Kode Kupon ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingRight: '2.5rem' }}
          />
          <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}>🔍</span>
        </div>
        <Link to="/admin/promosi/kupon/tambah" className="btn" style={{ background: '#4caf50', color: '#fff', border: 'none', whiteSpace: 'nowrap' }}>
          + Tambah Kupon
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kode Kupon</th>
              <th>Diskon</th>
              <th>Kuota</th>
              <th>Kadaluarsa</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => {
              const isActive = k.tgl_kadaluarsa ? new Date(k.tgl_kadaluarsa) >= new Date() : true;
              return (
                <tr key={k.id_kupon}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 700, letterSpacing: '1px' }}>{k.kode_kupon}</td>
                  <td>{k.persentase_diskon}%</td>
                  <td>{k.kuota}</td>
                  <td>{k.tgl_kadaluarsa ? new Date(k.tgl_kadaluarsa).toLocaleDateString('id-ID') : '-'}</td>
                  <td>
                    <span className={`badge ${isActive ? 'badge-green' : 'badge-red'}`}>
                      {isActive ? 'Aktif' : 'Kadaluarsa'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Link
                        to={`/admin/promosi/kupon/${k.id_kupon}/edit`}
                        className="btn btn-sm"
                        style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(k.id_kupon)}
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
                <td colSpan="7" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                  Belum ada kupon.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KuponListPage;
