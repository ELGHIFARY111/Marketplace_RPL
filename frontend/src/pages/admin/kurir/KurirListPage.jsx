// Admin - Kurir List Page
import { useState, useEffect } from 'react';

export default function KurirListPage() {
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    // TODO: Fetch couriers dari API
  }, []);

  return (
    <div className="kurir-list-page">
      <h1>Shipping Partners</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Service Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {couriers.map((courier) => (
            <tr key={courier.id}>
              <td>{courier.id}</td>
              <td>{courier.name}</td>
              <td>{courier.service_type}</td>
              <td>{courier.status}</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
