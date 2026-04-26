import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const PesananDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Resi form
  const [resi, setResi] = useState('');

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const { data } = await api.get(`/pesanan/${id}`);
      setOrder(data);
      if (data.no_resi) setResi(data.no_resi);
    } catch (err) {
      console.error('Failed to fetch detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!window.confirm(`Ubah status pesanan menjadi ${newStatus}?`)) return;
    
    setUpdating(true);
    try {
      await api.put(`/pesanan/${id}/status`, { 
        status_pesanan: newStatus,
        no_resi: resi
      });
      alert('Status berhasil diupdate');
      fetchDetail();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat detail pesanan..." />;
  if (!order) return <div>Pesanan tidak ditemukan</div>;

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/pesanan" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>Detail Pesanan #{order.no_pesanan}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Informasi Pesanan</h3>
          <p><strong>Tanggal:</strong> {new Date(order.tgl_pesanan).toLocaleString('id-ID')}</p>
          <p><strong>Pelanggan:</strong> {order.nama_lengkap || `User ID ${order.id_user}`}</p>
          <p><strong>Status Pembayaran:</strong> <span style={{ color: order.status_pesanan === 'Belum Bayar' ? '#ff9800' : '#4caf50' }}>{order.status_pesanan === 'Belum Bayar' ? 'Belum Lunas' : 'Sudah Lunas'}</span></p>
          <p><strong>Status Pesanan:</strong> {order.status_pesanan}</p>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Informasi Pengiriman</h3>
          <p><strong>Kurir:</strong> {order.nama_kurir}</p>
          <p><strong>Alamat:</strong> {order.alamat_lengkap || 'Alamat tidak ditemukan (Mock)'}</p>
          
          <div style={{ marginTop: '1rem', background: 'var(--bg)', padding: '1rem', borderRadius: '4px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nomor Resi Pengiriman</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-control" 
                value={resi} 
                onChange={(e) => setResi(e.target.value)} 
                placeholder="Input No Resi..." 
                disabled={order.status_pesanan === 'Selesai' || order.status_pesanan === 'Dibatalkan'}
              />
              <button 
                className="btn btn-outline" 
                onClick={() => handleUpdateStatus(order.status_pesanan)}
                disabled={updating || order.status_pesanan === 'Selesai' || order.status_pesanan === 'Dibatalkan'}
              >
                Simpan Resi
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Proses Pesanan</h3>
        <p style={{ marginBottom: '1rem', color: '#ccc' }}>Ubah status pesanan sesuai dengan proses pengiriman.</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => handleUpdateStatus('Diproses')}
            disabled={updating || order.status_pesanan !== 'Sudah Bayar'}
          >
            Tandai Sedang Diproses
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={() => handleUpdateStatus('Dikirim')}
            disabled={updating || order.status_pesanan !== 'Diproses' || !resi}
          >
            Tandai Sudah Dikirim
          </button>

          <button 
            className="btn btn-outline" 
            style={{ color: '#ff4444', borderColor: '#ff4444' }}
            onClick={() => handleUpdateStatus('Dibatalkan')}
            disabled={updating || order.status_pesanan === 'Selesai' || order.status_pesanan === 'Dikirim'}
          >
            Batalkan Pesanan
          </button>
        </div>
        {order.status_pesanan === 'Diproses' && !resi && (
          <p style={{ color: '#ff9800', marginTop: '0.5rem', fontSize: '0.9rem' }}>*Harap input nomor resi sebelum mengubah status menjadi 'Dikirim'.</p>
        )}
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Daftar Produk</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Varian</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map(item => (
                <tr key={item.id_detail}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img 
                        src={item.file_foto && item.file_foto !== 'placeholder.jpg' ? `${API_URL}/${item.file_foto}` : 'https://placehold.co/40x40/1a1a1a/fff'} 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                        alt=""
                      />
                      {item.nama_produk}
                    </div>
                  </td>
                  <td>{item.warna} - {item.ukuran}</td>
                  <td>{formatRupiah(item.harga)}</td>
                  <td>{item.qty}</td>
                  <td>{formatRupiah(item.harga * item.qty)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right', paddingRight: '1rem' }}>Subtotal Produk:</td>
                <td style={{ fontWeight: 'bold' }}>{formatRupiah(order.items?.reduce((s,i) => s+(i.harga*i.qty), 0) || 0)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right', paddingRight: '1rem' }}>Ongkos Kirim:</td>
                <td style={{ fontWeight: 'bold' }}>{formatRupiah(order.biaya_kurir || 0)}</td>
              </tr>
              {order.diskon_voucher > 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right', paddingRight: '1rem', color: '#4caf50' }}>Diskon Voucher:</td>
                  <td style={{ fontWeight: 'bold', color: '#4caf50' }}>-{formatRupiah(order.diskon_voucher)}</td>
                </tr>
              )}
              <tr>
                <td colSpan="4" style={{ textAlign: 'right', paddingRight: '1rem', fontSize: '1.2rem' }}>Total Belanja:</td>
                <td style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>{formatRupiah(order.total_harga)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesananDetailPage;
