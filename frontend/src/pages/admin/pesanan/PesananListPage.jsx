// Order List Page Template (Admin)
import { useState, useEffect } from 'react';

export default function PesananListPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: Fetch all orders dari API
  }, []);

  return (
    <div className="pesanan-list-page">
      <h1>Orders Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name}</td>
              <td>Rp {order.total_price}</td>
              <td>{order.status}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                <button>View</button>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
