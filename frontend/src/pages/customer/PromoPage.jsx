// Promo Page Template
import { useState, useEffect } from 'react';

export default function PromoPage() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    // TODO: Fetch all promos
  }, []);

  return (
    <div className="promo-page">
      <h1>Special Promotions</h1>
      <div className="promos-grid">
        {promos.map((promo) => (
          <div key={promo.id} className="promo-card">
            <img src={promo.image} alt={promo.title} />
            <h3>{promo.title}</h3>
            <p>{promo.description}</p>
            <p className="discount">Discount: {promo.discount}%</p>
            <p className="valid-until">Until: {new Date(promo.end_date).toLocaleDateString()}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
