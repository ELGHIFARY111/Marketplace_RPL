import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAlamat, setSelectedAlamat] = useState(1); // Mock id_alamat for now, ideally fetch from user profile
  const [selectedKurir, setSelectedKurir] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cartRes, courierRes, voucherRes] = await Promise.all([
        api.get('/keranjang'),
        api.get('/kurir'),
        api.get('/voucher')
      ]);
      
      if (cartRes.data.length === 0) {
        alert('Keranjang Anda kosong');
        return navigate('/keranjang');
      }
      
      setCartItems(cartRes.data);
      setCouriers(courierRes.data);
      setVouchers(voucherRes.data.filter(v => new Date(v.batas_waktu) > new Date()));
    } catch (err) {
      console.error('Failed to fetch checkout data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!selectedKurir) return alert('Pilih kurir pengiriman');
    
    setProcessing(true);
    try {
      const payload = {
        id_alamat: selectedAlamat,
        id_kurir: selectedKurir,
        id_voucher: selectedVoucher || null,
        items: cartItems.map(item => ({
          id_varian: item.id_varian,
          qty: item.qty,
          harga: item.harga
        }))
      };
      
      await api.post('/pesanan', payload);
      alert('Pesanan berhasil dibuat!');
      navigate('/riwayat-pembelian');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal membuat pesanan');
    } finally {
      setProcessing(false);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  if (loading) return <div style={{ padding: '4rem 0' }}><LoadingSpinner text="Mempersiapkan checkout..." /></div>;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  
  // Calculate discount
  let diskon = 0;
  if (selectedVoucher) {
    const voucher = vouchers.find(v => v.id_voucher.toString() === selectedVoucher);
    if (voucher && subtotal >= voucher.min_belanja) {
      diskon = (subtotal * voucher.persentase) / 100;
      if (diskon > voucher.maks_potongan) diskon = voucher.maks_potongan;
    } else {
      alert('Minimum belanja tidak terpenuhi untuk voucher ini');
      setSelectedVoucher('');
    }
  }

  // Calculate shipping
  let ongkir = 0;
  if (selectedKurir) {
    const kurir = couriers.find(k => k.id_kurir.toString() === selectedKurir);
    if (kurir) ongkir = kurir.biaya; // Asumsi biaya per pesanan, bisa dikembangkan per kg
  }

  const totalBayar = subtotal - diskon + ongkir;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Left: Detail form */}
        <div style={{ flex: '2 1 600px' }}>
          
          <form id="checkout-form" onSubmit={handleCheckout}>
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>1. Alamat Pengiriman</h3>
              <p style={{ color: '#ccc', marginBottom: '1rem' }}>Saat ini menggunakan alamat default profil Anda.</p>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg)' }}>
                <strong>Rumah</strong><br/>
                Jl. Raya Telang No. 123, Kamal, Bangkalan<br/>
                Jawa Timur, 69162
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>2. Pengiriman</h3>
              <select 
                required
                value={selectedKurir}
                onChange={(e) => setSelectedKurir(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-input)', color: '#fff' }}
              >
                <option value="">-- Pilih Kurir --</option>
                {couriers.map(k => (
                  <option key={k.id_kurir} value={k.id_kurir}>{k.nama_kurir} - {formatRupiah(k.biaya)}</option>
                ))}
              </select>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>3. Voucher / Diskon</h3>
              <select 
                value={selectedVoucher}
                onChange={(e) => setSelectedVoucher(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-input)', color: '#fff' }}
              >
                <option value="">-- Tidak Pakai Voucher --</option>
                {vouchers.map(v => (
                  <option key={v.id_voucher} value={v.id_voucher} disabled={subtotal < v.min_belanja}>
                    {v.kode_voucher} ({v.persentase}% Max {formatRupiah(v.maks_potongan)})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>4. Produk yang Dibeli</h3>
              {cartItems.map(item => (
                <div key={item.id_keranjang} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <img 
                    src={item.file_foto && item.file_foto !== 'placeholder.jpg' ? `${API_URL}/${item.file_foto}` : 'https://placehold.co/60x60/1a1a1a/fff'} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                    alt=""
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.nama_produk}</h4>
                    <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>{item.warna} - {item.ukuran} | {item.qty} x {formatRupiah(item.harga)}</p>
                  </div>
                  <div style={{ fontWeight: 'bold' }}>
                    {formatRupiah(item.harga * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          </form>

        </div>

        {/* Right: Summary */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Ringkasan Belanja</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#ccc' }}>
              <span>Total Harga ({cartItems.length} Produk)</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#ccc' }}>
              <span>Total Ongkos Kirim</span>
              <span>{formatRupiah(ongkir)}</span>
            </div>

            {diskon > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#4caf50' }}>
                <span>Diskon Voucher</span>
                <span>-{formatRupiah(diskon)}</span>
              </div>
            )}
            
            <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total Tagihan</span>
              <span style={{ color: 'var(--primary)' }}>{formatRupiah(totalBayar)}</span>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              disabled={processing}
            >
              {processing ? 'Memproses...' : 'Buat Pesanan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
