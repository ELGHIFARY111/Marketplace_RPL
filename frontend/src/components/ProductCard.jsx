import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const ProductCard = ({ product }) => {
  const {
    id_produk, nama_produk, nama_kategori,
    foto_utama, harga_min, diskon, rating,
  } = product;

  const hargaDiskon = diskon > 0 ? Math.round(harga_min * (1 - diskon / 100)) : harga_min;

  return (
    <Link to={`/produk/${id_produk}`} className="product-card">
      <div className="product-card-img">
        {foto_utama ? (
          <img src={`${API_URL}/uploads/${foto_utama}`} alt={nama_produk} />
        ) : (
          <span className="no-img">👕</span>
        )}
      </div>
      <div className="product-card-body">
        <p className="product-card-name">{nama_produk}</p>
        <p className="product-card-cat">{nama_kategori}</p>
        <div className="product-card-price">
          <span className="price-current">{harga_min ? formatRupiah(hargaDiskon) : 'Rp -'}</span>
          {diskon > 0 && (
            <>
              <span className="price-original">{formatRupiah(harga_min)}</span>
              <span className="price-badge">{diskon}%</span>
            </>
          )}
        </div>
        {rating > 0 && (
          <div className="rating">
            ⭐ {Number(rating).toFixed(1)} <span>(ulasan)</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
