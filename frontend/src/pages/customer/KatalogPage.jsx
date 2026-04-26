import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const KatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const initialKategori = searchParams.get('kategori') || '';
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState(initialSearch);
  const [selectedKategori, setSelectedKategori] = useState(initialKategori);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // Update URL params
    const params = {};
    if (search) params.q = search;
    if (selectedKategori) params.kategori = selectedKategori;
    setSearchParams(params);
  }, [search, selectedKategori]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/kategori');
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/produk';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedKategori) params.append('kategori', selectedKategori);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const { data } = await api.get(url);
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Katalog Produk</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Sidebar Filters */}
        <div style={{ flex: '1 1 250px', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Filter</h3>
          
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>Pencarian</label>
            <div style={{ display: 'flex' }}>
              <input 
                type="text" 
                placeholder="Cari nama produk..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px 0 0 4px', border: '1px solid var(--border)', background: 'var(--bg-input)', color: '#fff' }}
              />
              <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontWeight: 'bold' }}>
                Cari
              </button>
            </div>
          </form>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>Kategori</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="kategori" 
                  checked={selectedKategori === ''} 
                  onChange={() => setSelectedKategori('')}
                />
                Semua Kategori
              </label>
              {categories.map(cat => (
                <label key={cat.id_kategori} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="kategori" 
                    checked={selectedKategori === cat.id_kategori.toString()} 
                    onChange={() => setSelectedKategori(cat.id_kategori.toString())}
                  />
                  {cat.nama_kategori}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div style={{ flex: '3 1 600px' }}>
          {loading ? (
            <div style={{ padding: '4rem 0' }}>
              <LoadingSpinner text="Memuat produk..." />
            </div>
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard key={product.id_produk} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--bg-card)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Produk tidak ditemukan</h3>
              <p style={{ color: '#888' }}>Coba gunakan kata kunci atau kategori lain.</p>
              <button 
                className="btn btn-outline" 
                style={{ marginTop: '1rem' }}
                onClick={() => { setSearch(''); setSelectedKategori(''); }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KatalogPage;
