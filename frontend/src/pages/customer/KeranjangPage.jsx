import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const KeranjangPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/keranjang');
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put(`/keranjang/${id}`, { qty: newQty });
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal update kuantitas');
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm('Hapus produk ini dari keranjang?')) return;
    try {
      await api.delete(`/keranjang/${id}`);
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus produk');
    }
  };

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  if (loading) return <div style={{ padding: '6rem 0', display: 'flex', justifyContent: 'center' }}><LoadingSpinner text="Memuat keranjang..." /></div>;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
  const pajak = subtotal * 0.11; // PPN 11%
  const biayaPengiriman = 15000; // Flat rate for mockup
  const totalBelanja = subtotal + pajak + biayaPengiriman;

  return (
    <div style={{ padding: '3rem 0', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#000', marginBottom: '3rem' }}>Keranjang Belanja</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', background: '#fff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Keranjang Anda masih kosong</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Yuk, cari produk impian Anda sekarang!</p>
          <Link to="/produk" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Mulai Belanja</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
          
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={item.id_keranjang} style={{ display: 'flex', gap: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '120px', height: '120px', flexShrink: 0, borderRadius: '16px', overflow: 'hidden', background: '#e9e6df' }}>
                  <img 
                    src={item.file_foto && item.file_foto !== 'placeholder.jpg' ? `${API_URL}/${item.file_foto}` : 'https://placehold.co/120x120/e9e6df/666?text=Img'} 
                    alt={item.nama_produk}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <Link to={`/produk/${item.id_produk}`} style={{ textDecoration: 'none', color: '#000' }}>
                        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '0.4rem' }}>{item.nama_produk}</h3>
                      </Link>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>Ukuran: <strong>{item.ukuran}</strong> &nbsp;|&nbsp; Warna: <strong>{item.warna}</strong></p>
                    </div>
                    <h4 style={{ color: '#000', fontSize: '1.2rem', fontWeight: 600 }}>{formatRupiah(item.harga)}</h4>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                      <button 
                        onClick={() => updateQty(item.id_keranjang, item.qty - 1)}
                        style={{ width: '36px', height: '36px', background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >-</button>
                      <input 
                        type="number" 
                        value={item.qty} 
                        readOnly
                        style={{ width: '40px', background: 'transparent', border: 'none', color: '#000', textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}
                      />
                      <button 
                        onClick={() => updateQty(item.id_keranjang, item.qty + 1)}
                        style={{ width: '36px', height: '36px', background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={item.qty >= item.stok}
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id_keranjang)}
                      style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                    >Remove</button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', position: 'sticky', top: '100px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Pesanan Anda</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem', color: '#555' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 500, color: '#000' }}>{formatRupiah(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Biaya Pengiriman</span>
                  <span style={{ fontWeight: 500, color: '#000' }}>{formatRupiah(biayaPengiriman)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Pajak (11%)</span>
                  <span style={{ fontWeight: 500, color: '#000' }}>{formatRupiah(pajak)}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#000' }}>
                <span>Total Pembayaran</span>
                <span>{formatRupiah(totalBelanja)}</span>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', letterSpacing: '1px' }}
                onClick={() => navigate('/checkout')}
              >
                BAYAR SEKARANG
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default KeranjangPage;
