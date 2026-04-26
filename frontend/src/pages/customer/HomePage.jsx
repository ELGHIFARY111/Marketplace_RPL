import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [promoProducts, setPromoProducts]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [allRes, promoRes] = await Promise.all([
          api.get('/produk'),
          api.get('/produk?promo=true'),
        ]);
        setFeaturedProducts(allRes.data.slice(0, 8));
        setPromoProducts(promoRes.data.filter(p => p.diskon > 0).slice(0, 4));
      } catch {
        setFeaturedProducts([]);
        setPromoProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ background: '#e9e6df', borderRadius: '32px', margin: '0 1.5rem', minHeight: '600px' }}>
        <div className="hero-content">
          <p className="hero-tag" style={{ color: '#000', fontWeight: 600 }}>New Collection 2026</p>
          <h1 className="hero-title" style={{ color: '#000', fontFamily: 'var(--font-heading)' }}>
            Rasa Autentik,<br />Kualitas Premium
          </h1>
          <p className="hero-sub" style={{ color: '#444' }}>
            Temukan koleksi fashion terbaik kami — dari kaos kasual hingga jaket premium,
            semua tersedia dengan kualitas yang tidak mengecewakan.
          </p>
          <Link to="/produk" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Mulai Belanja →</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="page-section">
        <div className="container">
          <h2 className="section-title">Produk Unggulan</h2>
          {loading ? (
            <LoadingSpinner />
          ) : featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.map(p => <ProductCard key={p.id_produk} product={p} />)}
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem 0' }}>
              Belum ada produk. <Link to="/admin/produk/tambah" style={{ color: '#000', fontWeight: 'bold' }}>Tambah produk</Link>
            </p>
          )}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/produk" className="btn btn-outline" style={{ padding: '0.75rem 2.5rem' }}>Lihat Semua Produk →</Link>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      {promoProducts.length > 0 && (
        <section className="page-section" style={{ background: '#f5f2eb' }}>
          <div className="container">
            <h2 className="section-title">Sedang Promo</h2>
            <div className="product-grid">
              {promoProducts.map(p => <ProductCard key={p.id_produk} product={p} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/promo" className="btn btn-outline" style={{ padding: '0.75rem 2.5rem' }}>Lihat Semua Promo →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Feature Highlights */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🚀', title: 'Pengiriman Cepat', desc: 'Dikirim dalam 1-3 hari kerja ke seluruh Indonesia' },
              { icon: '🔒', title: 'Pembayaran Aman', desc: 'Transaksi terlindungi dengan sistem keamanan terkini' },
              { icon: '↩️', title: 'Mudah Dikembalikan', desc: 'Produk dapat dikembalikan jika tidak sesuai' },
              { icon: '💬', title: 'Customer Service', desc: 'Tim CS kami siap membantu 7 hari seminggu' },
            ].map((f) => (
              <div key={f.title} style={{
                background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', borderRadius: '24px',
                padding: '2rem', textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ color: '#000', fontSize: '1.1rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>{f.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
