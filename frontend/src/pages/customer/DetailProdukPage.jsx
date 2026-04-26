import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const DetailProdukPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Selection states
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedVarian, setSelectedVarian] = useState(null);
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  
  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      const { data } = await api.get(`/produk/${id}`);
      setProduct(data);
      if (data.varian && data.varian.length > 0) {
        setSelectedVarian(data.varian[0]);
      }
    } catch (err) {
      console.error('Failed to fetch product detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk menambah ke keranjang');
      return navigate('/login');
    }
    
    if (!selectedVarian) {
      return alert('Pilih varian produk terlebih dahulu');
    }
    
    if (qty > selectedVarian.stok) {
      return alert('Jumlah melebihi stok yang tersedia');
    }
    
    setAddingToCart(true);
    try {
      await api.post('/keranjang', {
        id_varian: selectedVarian.id_varian,
        qty
      });
      alert('Produk berhasil ditambahkan ke keranjang!');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambahkan ke keranjang');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}><LoadingSpinner text="Memuat detail produk..." /></div>;
  
  if (!product) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Produk tidak ditemukan</h2></div>;

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const photos = product.foto && product.foto.length > 0 
    ? product.foto 
    : [{ file_foto: 'placeholder.jpg' }];

  const activePrice = selectedVarian ? selectedVarian.harga : product.harga;
  const activeStock = selectedVarian ? selectedVarian.stok : product.stok;

  // Group variants by color and size for better UI if we want to separate them.
  // But for now, we'll keep it simple or group them.
  const uniqueColors = [...new Set(product.varian?.map(v => v.warna) || [])];
  const uniqueSizes = [...new Set(product.varian?.map(v => v.ukuran) || [])];

  const handleVariantSelect = (warna, ukuran) => {
    const varian = product.varian.find(v => v.warna === warna && v.ukuran === ukuran);
    if (varian) {
      setSelectedVarian(varian);
      setQty(1);
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', marginBottom: '4rem', alignItems: 'start' }}>
        
        {/* Left: Photos */}
        <div>
          <div style={{ width: '100%', aspectRatio: '4/5', background: '#e9e6df', borderRadius: '32px', overflow: 'hidden', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={photos[selectedPhoto].file_foto !== 'placeholder.jpg' ? `${API_URL}/${photos[selectedPhoto].file_foto}` : 'https://placehold.co/600x800/e9e6df/666?text=Zenvy'} 
              alt={product.nama_produk} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', justifyContent: 'center' }}>
            {photos.map((foto, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedPhoto(index)}
                style={{ 
                  width: '80px', height: '80px', flexShrink: 0, cursor: 'pointer', borderRadius: '16px', overflow: 'hidden',
                  border: selectedPhoto === index ? '2px solid #000' : '2px solid transparent',
                  background: '#e9e6df'
                }}
              >
                <img 
                  src={foto.file_foto !== 'placeholder.jpg' ? `${API_URL}/${foto.file_foto}` : 'https://placehold.co/80x80/e9e6df/666?text=Img'} 
                  alt={`${product.nama_produk} ${index+1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right: Info */}
        <div style={{ padding: '2rem 0' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {product.nama_kategori}
          </p>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: '#000', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            {product.nama_produk}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', color: '#666', fontSize: '1.1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#f59e0b' }}>★</span> {parseFloat(product.rating || 0).toFixed(1)}
            </span>
            <span>|</span>
            <span>{product.total_ulasan || 0} Ulasan</span>
            <span>|</span>
            <span>Terjual: {product.terjual || 0}</span>
          </div>
          
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#000', marginBottom: '2.5rem' }}>
            {formatRupiah(activePrice)}
          </h2>
          
          {/* Variants */}
          {product.varian && product.varian.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              
              {/* Warna */}
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '1rem', color: '#000' }}>Warna</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {uniqueColors.map(warna => (
                    <button
                      key={warna}
                      onClick={() => handleVariantSelect(warna, selectedVarian?.ukuran || uniqueSizes[0])}
                      style={{
                        padding: '0.6rem 1.5rem',
                        background: selectedVarian?.warna === warna ? '#000' : 'transparent',
                        color: selectedVarian?.warna === warna ? '#fff' : '#000',
                        border: '1px solid #000',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                    >
                      {warna}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ukuran */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '1rem', color: '#000' }}>Ukuran</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {uniqueSizes.map(ukuran => {
                    const isAvailable = product.varian.some(v => v.warna === selectedVarian?.warna && v.ukuran === ukuran && v.stok > 0);
                    return (
                      <button
                        key={ukuran}
                        onClick={() => handleVariantSelect(selectedVarian?.warna || uniqueColors[0], ukuran)}
                        disabled={!isAvailable}
                        style={{
                          width: '50px', height: '50px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: selectedVarian?.ukuran === ukuran ? '#000' : 'transparent',
                          color: selectedVarian?.ukuran === ukuran ? '#fff' : (isAvailable ? '#000' : '#ccc'),
                          border: `1px solid ${selectedVarian?.ukuran === ukuran ? '#000' : (isAvailable ? '#ccc' : '#eee')}`,
                          borderRadius: '8px',
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        {ukuran}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          )}
          
          {/* Quantity & Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #ddd', borderRadius: '50px', padding: '0.5rem' }}>
              <button 
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >-</button>
              <input 
                type="number" 
                value={qty} 
                onChange={(e) => setQty(Math.max(1, Math.min(activeStock, parseInt(e.target.value) || 1)))}
                style={{ width: '50px', background: 'transparent', border: 'none', color: '#000', textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 }}
              />
              <button 
                onClick={() => setQty(q => Math.min(activeStock, q + 1))}
                style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >+</button>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ flex: 1, padding: '1.25rem', fontSize: '1.1rem', letterSpacing: '1px' }}
              onClick={handleAddToCart}
              disabled={addingToCart || activeStock === 0}
            >
              {addingToCart ? 'MENAMBAHKAN...' : activeStock === 0 ? 'STOK HABIS' : 'TAMBAH KE KERANJANG'}
            </button>
          </div>

          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '-2rem', marginBottom: '3rem' }}>Stok tersedia: {activeStock} buah</p>
          
          {/* Description */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Deskripsi Produk</h3>
            <div style={{ whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
              {product.deskripsi}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Reviews Section */}
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '4rem', marginTop: '4rem' }}>
        <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '3rem', textAlign: 'center' }}>Ulasan Pembeli</h3>
        {product.ulasan && product.ulasan.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {product.ulasan.map(u => (
              <div key={u.id_ulasan} style={{ background: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: '#f5f2eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {u.nama_lengkap.charAt(0)}
                    </div>
                    <strong style={{ color: '#000' }}>{u.nama_lengkap}</strong>
                  </div>
                  <div style={{ color: '#f59e0b', fontSize: '1.2rem' }}>
                    {'★'.repeat(u.rating)}{'☆'.repeat(5-u.rating)}
                  </div>
                </div>
                <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1rem' }}>{u.komentar}</p>
                <span style={{ color: '#999', fontSize: '0.85rem' }}>
                  {new Date(u.tgl_ulasan).toLocaleDateString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#888', textAlign: 'center', fontSize: '1.1rem' }}>Belum ada ulasan untuk produk ini.</p>
        )}
      </div>
    </div>
  );
};

export default DetailProdukPage;
