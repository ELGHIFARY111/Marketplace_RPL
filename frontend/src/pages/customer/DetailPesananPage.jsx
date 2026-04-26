// Order Detail Page Template
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailPesananPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // TODO: Fetch order details
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="detail-pesanan-page">
      <h1>Order Details</h1>
      <div className="order-info">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`status ${order.status}`}>{order.status}</span></p>
      </div>

      <div className="order-items">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>Rp {item.price}</td>
                <td>Rp {item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-total">
        <p><strong>Total Amount:</strong> Rp {order.total_price}</p>
      </div>

      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <p><strong>Address:</strong> {order.shipping_address}</p>
        <p><strong>Shipper:</strong> {order.shipper}</p>
        <p><strong>Tracking Number:</strong> {order.tracking_number}</p>
      </div>
    </div>
  );
}
