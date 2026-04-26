// Product Detail Page Template
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailProdukPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch product detail dari API
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Add product ke cart
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="detail-produk-page">
      {product ? (
        <div className="product-detail">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">Rp {product.price}</p>
            <p className="description">{product.description}</p>
            <p className="stock">Stock: {product.stock}</p>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}
