// Katalog Page Template
import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';

export default function KatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch products from API
    setLoading(false);
  }, []);

  return (
    <div className="katalog-page">
      <h1>Product Catalog</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
