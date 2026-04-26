import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const DetailPesananPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const { data } = await api.get(`/pesanan/${id}`);
      setOrder(data);
    } catch (err) {
      console.error('Failed to fetch order detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBayar = async () => {
    if (!window.confirm('Simulasi pembayaran sukses?')) return;
    try {
      await api.put(`/pesanan/${id}/bayar`);
      alert('Pembayaran berhasil dikonfirmasi!');
      fetchDetail();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal konfirmasi pembayaran');
    }
  };

  if (loading) return <div style={{ padding: '4rem 0' }}><LoadingSpinner text="Memuat detail pesanan..." /></div>;
  if (!order) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Pesanan tidak ditemukan</h2></div>;

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/riwayat-pembelian')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem' }}>
        &larr; Kembali ke Riwayat
      </button>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Detail Pesanan</h1>
            <p style={{ color: '#888' }}>No. Pesanan: <strong style={{ color: '#fff' }}>{order.no_pesanan}</strong></p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ marginBottom: '0.5rem', color: '#888' }}>Status Pesanan</p>
            <h3 style={{ color: 'var(--primary)' }}>{order.status_pesanan}</h3>
          </div>
        </div>

        {order.status_pesanan === 'Belum Bayar' && (
          <div style={{ background: 'rgba(255, 152, 0, 0.1)', border: '1px solid #ff9800', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ color: '#ff9800', marginBottom: '0.5rem' }}>Menunggu Pembayaran</h3>
            <p style={{ marginBottom: '1rem' }}>Silakan selesaikan pembayaran sebesar <strong>{formatRupiah(order.total_harga)}</strong> sebelum {new Date(new Date(order.tgl_pesanan).getTime() + 24*60*60*1000).toLocaleString('id-ID')}</p>
            <button className="btn btn-primary" onClick={handleBayar}>Konfirmasi Pembayaran (Simulasi)</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#ccc' }}>Informasi Pengiriman</h3>
            <div style={{ padding: '1rem', background: 'var(--bg)', borderRadius: '4px' }}>
              <p><strong>Kurir:</strong> {order.nama_kurir}</p>
              <p><strong>No. Resi:</strong> {order.no_resi || '-'}</p>
              <p style={{ marginTop: '0.5rem' }}><strong>Alamat:</strong></p>
              <p style={{ color: '#aaa' }}>{order.alamat_lengkap || 'Alamat tidak ditemukan (Mock)'}</p>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#ccc' }}>Rincian Harga</h3>
            <div style={{ padding: '1rem', background: 'var(--bg)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal Produk</span>
                <span>{formatRupiah(order.items?.reduce((s,i) => s+(i.harga*i.qty), 0) || 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Ongkos Kirim</span>
                <span>{formatRupiah(order.biaya_kurir || 0)}</span>
              </div>
              {order.diskon_voucher > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#4caf50' }}>
                  <span>Diskon Voucher</span>
                  <span>-{formatRupiah(order.diskon_voucher)}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                <span>Total Belanja</span>
                <span style={{ color: 'var(--primary)' }}>{formatRupiah(order.total_harga)}</span>
              </div>
            </div>
          </div>
        </div>

        <h3 style={{ marginBottom: '1rem', color: '#ccc', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Daftar Produk</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {order.items?.map(item => (
            <div key={item.id_detail} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg)', borderRadius: '4px' }}>
              <img 
                src={item.file_foto && item.file_foto !== 'placeholder.jpg' ? `${API_URL}/${item.file_foto}` : 'https://placehold.co/80x80/1a1a1a/fff'} 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                alt=""
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '0.25rem' }}>{item.nama_produk}</h4>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Varian: {item.warna} - {item.ukuran}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.qty} x {formatRupiah(item.harga)}</span>
                  <strong style={{ color: 'var(--primary)' }}>{formatRupiah(item.harga * item.qty)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPesananPage;
