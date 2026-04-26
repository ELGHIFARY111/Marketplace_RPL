import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const RiwayatPembelianPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/pesanan/my-orders');
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Belum Bayar': return <span style={{ background: '#ff9800', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{status}</span>;
      case 'Diproses': return <span style={{ background: '#2196f3', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{status}</span>;
      case 'Dikirim': return <span style={{ background: '#9c27b0', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{status}</span>;
      case 'Selesai': return <span style={{ background: '#4caf50', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{status}</span>;
      case 'Dibatalkan': return <span style={{ background: '#f44336', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{status}</span>;
      default: return <span>{status}</span>;
    }
  };

  if (loading) return <div style={{ padding: '4rem 0' }}><LoadingSpinner text="Memuat riwayat pesanan..." /></div>;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Riwayat Pembelian</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--bg-card)', borderRadius: '8px' }}>
          <h2>Belum ada pesanan</h2>
          <p style={{ color: '#888', marginBottom: '1.5rem' }}>Anda belum pernah melakukan pemesanan.</p>
          <Link to="/katalog" className="btn btn-primary">Mulai Belanja</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id_pesanan} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ color: '#888', marginRight: '1rem' }}>{new Date(order.tgl_pesanan).toLocaleDateString('id-ID')}</span>
                  <strong style={{ color: 'var(--primary)' }}>{order.no_pesanan}</strong>
                </div>
                <div>
                  {getStatusBadge(order.status_pesanan)}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Total Pembayaran</h4>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatRupiah(order.total_harga)}</p>
                </div>
                <Link to={`/pesanan/${order.id_pesanan}`} className="btn btn-outline">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatPembelianPage;
