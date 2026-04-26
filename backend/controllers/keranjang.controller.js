// Template untuk Cart Controller

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;
    // TODO: Add item ke cart di database
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: Get cart items dari database
    res.json({ message: `Get cart for user ${userId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;
    // TODO: Update cart item di database
    res.json({ message: `Cart item ${cartId} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    // TODO: Delete cart item dari database
    res.json({ message: `Item ${cartId} removed from cart` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: Clear all cart items untuk user
    res.json({ message: `Cart cleared for user ${userId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
