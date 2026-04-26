import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const PromosiListPage = () => {
  const [promosi, setPromosi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromosi();
  }, []);

  const fetchPromosi = async () => {
    try {
      const { data } = await api.get('/promosi');
      setPromosi(data);
    } catch (err) {
      console.error('Failed to fetch promosi:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus promosi ini?')) return;
    try {
      await api.delete(`/promosi/${id}`);
      fetchPromosi();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus promosi');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data promosi..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Kelola Promosi</h1>
        <Link to="/admin/promosi/tambah" className="btn btn-primary">+ Tambah Promosi</Link>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Nama Promosi</th>
                <th>Persentase Diskon</th>
                <th>Mulai</th>
                <th>Selesai</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {promosi.map(p => {
                const now = new Date();
                const start = new Date(p.tgl_mulai);
                const end = new Date(p.tgl_selesai);
                const isActive = now >= start && now <= end;

                return (
                  <tr key={p.id_promosi}>
                    <td>{p.nama_produk}</td>
                    <td>{p.nama_promosi}</td>
                    <td>{p.persentase}%</td>
                    <td>{start.toLocaleDateString('id-ID')}</td>
                    <td>{end.toLocaleDateString('id-ID')}</td>
                    <td>
                      <span className={`badge badge-${isActive ? 'success' : 'danger'}`}>
                        {isActive ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/admin/promosi/edit/${p.id_promosi}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Edit</Link>
                        <button 
                          onClick={() => handleDelete(p.id_promosi)}
                          className="btn btn-outline" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ff4444', borderColor: '#ff4444' }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {promosi.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>Belum ada data promosi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PromosiListPage;
