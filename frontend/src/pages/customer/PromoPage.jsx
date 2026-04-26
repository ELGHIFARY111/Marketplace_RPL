import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const PromoPage = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      // Mocking promo logic by fetching all products and pretending some are on promo
      // Ideally, there would be a dedicated /promosi endpoint for customer
      const { data } = await api.get('/produk');
      // Just filter to show some products as "promo"
      setPromos(data.slice(0, 4)); 
    } catch (err) {
      console.error('Failed to fetch promos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '4rem 0' }}><LoadingSpinner text="Memuat promo..." /></div>;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Promo & Diskon Spesial</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>Nikmati penawaran terbaik dari Zenvy Apparel minggu ini!</p>
      
      {promos.length > 0 ? (
        <div className="product-grid">
          {promos.map(product => (
            <ProductCard key={product.id_produk} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--bg-card)', borderRadius: '8px' }}>
          <h3>Belum ada promo saat ini</h3>
          <p style={{ color: '#888' }}>Cek kembali nanti untuk penawaran menarik lainnya.</p>
        </div>
      )}
    </div>
  );
};

export default PromoPage;
