import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const PesananListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/pesanan');
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data pesanan..." />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Kelola Pesanan</h1>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>No. Pesanan</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Total Belanja</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id_pesanan}>
                  <td>{o.no_pesanan}</td>
                  <td>{new Date(o.tgl_pesanan).toLocaleDateString('id-ID')}</td>
                  <td>{o.nama_lengkap || 'User'}</td>
                  <td>{formatRupiah(o.total_harga)}</td>
                  <td>
                    <span className={`badge badge-${o.status_pesanan === 'Selesai' ? 'success' : o.status_pesanan === 'Belum Bayar' ? 'warning' : o.status_pesanan === 'Dibatalkan' ? 'danger' : 'primary'}`}>
                      {o.status_pesanan}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/pesanan/${o.id_pesanan}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Detail & Proses</Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>Belum ada pesanan masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesananListPage;
