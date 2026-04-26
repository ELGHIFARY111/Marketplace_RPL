// Shopping Cart Page Template
import { useState, useEffect } from 'react';

export default function KeranjangPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // TODO: Fetch cart items dari API
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    // TODO: Calculate total price
  };

  const handleCheckout = () => {
    // TODO: Redirect ke checkout
  };

  return (
    <div className="keranjang-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Rp {item.price}</p>
                  <input type="number" value={item.quantity} />
                </div>
                <button>Remove</button>
              </div>
            ))}
          </>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
      <div className="cart-summary">
        <h3>Total: Rp {totalPrice}</h3>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
