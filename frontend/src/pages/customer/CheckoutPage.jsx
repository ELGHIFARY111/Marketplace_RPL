// Checkout Page Template
import { useState } from 'react';

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState({
    shipping_address: '',
    shipping_method: 'regular',
    payment_method: 'bank_transfer'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Process checkout
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {/* Order items akan ditampilkan di sini */}
          <div className="total-section">
            <p><strong>Subtotal:</strong> Rp 0</p>
            <p><strong>Shipping:</strong> Rp 0</p>
            <p><strong>Tax:</strong> Rp 0</p>
            <h3><strong>Total:</strong> Rp 0</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Shipping Information</h2>
          <textarea
            placeholder="Shipping Address"
            value={orderData.shipping_address}
            onChange={(e) => setOrderData({
              ...orderData,
              shipping_address: e.target.value
            })}
            required
          />

          <h3>Shipping Method</h3>
          <select value={orderData.shipping_method} onChange={(e) => setOrderData({
            ...orderData,
            shipping_method: e.target.value
          })}>
            <option value="regular">Regular (3-5 days)</option>
            <option value="express">Express (1-2 days)</option>
            <option value="overnight">Overnight</option>
          </select>

          <h3>Payment Method</h3>
          <select value={orderData.payment_method} onChange={(e) => setOrderData({
            ...orderData,
            payment_method: e.target.value
          })}>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="credit_card">Credit Card</option>
            <option value="e_wallet">E-Wallet</option>
          </select>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}
