import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const KurirListPage = () => {
  const [kurir, setKurir] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKurir();
  }, []);

  const fetchKurir = async () => {
    try {
      const { data } = await api.get('/kurir');
      setKurir(data);
    } catch (err) {
      console.error('Failed to fetch kurir:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus kurir ini?')) return;
    try {
      await api.delete(`/kurir/${id}`);
      fetchKurir();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus kurir');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data kurir..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Kelola Jasa Pengiriman</h1>
        <Link to="/admin/kurir/tambah" className="btn btn-primary">+ Tambah Kurir</Link>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Kurir</th>
                <th>Biaya per Kg</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kurir.map(k => (
                <tr key={k.id_kurir}>
                  <td>{k.id_kurir}</td>
                  <td>{k.nama_kurir}</td>
                  <td>{formatRupiah(k.biaya_per_kg)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/admin/kurir/edit/${k.id_kurir}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Edit</Link>
                      <button 
                        onClick={() => handleDelete(k.id_kurir)}
                        className="btn btn-outline" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ff4444', borderColor: '#ff4444' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {kurir.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>Belum ada data kurir.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KurirListPage;
