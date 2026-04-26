import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UlasanListPage = () => {
  const [ulasan, setUlasan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUlasan();
  }, []);

  const fetchUlasan = async () => {
    try {
      const { data } = await api.get('/ulasan');
      setUlasan(data);
    } catch (err) {
      console.error('Failed to fetch ulasan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus ulasan ini?')) return;
    try {
      await api.delete(`/ulasan/${id}`);
      fetchUlasan();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus ulasan');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data ulasan..." />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Kelola Ulasan Produk</h1>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Pengguna</th>
                <th>Rating</th>
                <th>Komentar</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ulasan.map(u => (
                <tr key={u.id_ulasan}>
                  <td>{u.nama_produk}</td>
                  <td>{u.nama_lengkap}</td>
                  <td>
                    <span style={{ color: '#ffc107' }}>
                      {'★'.repeat(u.rating)}{'☆'.repeat(5 - u.rating)}
                    </span>
                  </td>
                  <td>{u.komentar}</td>
                  <td>{new Date(u.tgl_ulasan).toLocaleDateString('id-ID')}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(u.id_ulasan)}
                      className="btn btn-outline" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ff4444', borderColor: '#ff4444' }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {ulasan.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>Belum ada ulasan produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UlasanListPage;
