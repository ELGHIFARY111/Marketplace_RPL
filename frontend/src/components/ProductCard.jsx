// ProductCard Component Template
export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">Rp {product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}
