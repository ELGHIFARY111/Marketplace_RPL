// Order History Page Template
import { useState, useEffect } from 'react';

export default function RiwayatPembelianPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user orders dari API
    setLoading(false);
  }, []);

  return (
    <div className="riwayat-pembelian-page">
      <h1>Purchase History</h1>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              <p className="date">Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p className="total">Total: Rp {order.total_price}</p>
              <a href={`/orders/${order.id}`}>View Details</a>
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
}
