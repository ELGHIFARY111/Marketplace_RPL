// Admin - Promo List Page
import { useState, useEffect } from 'react';

export default function PromoListPage() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    // TODO: Fetch promos dari API
  }, []);

  return (
    <div className="promo-list-page">
      <div className="page-header">
        <h1>Promotions</h1>
        <a href="/admin/promo/tambah">Add Promo</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Discount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promos.map((promo) => (
            <tr key={promo.id}>
              <td>{promo.id}</td>
              <td>{promo.title}</td>
              <td>{promo.discount}%</td>
              <td>{new Date(promo.start_date).toLocaleDateString()}</td>
              <td>{new Date(promo.end_date).toLocaleDateString()}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
