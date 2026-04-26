const express = require('express');
const router = express.Router();
const keranjangController = require('../controllers/keranjang.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes
router.get('/', authenticateToken, keranjangController.getCart);
router.post('/', authenticateToken, keranjangController.addToCart);
router.put('/:cartId', authenticateToken, keranjangController.updateCartItem);
router.delete('/:cartId', authenticateToken, keranjangController.removeFromCart);
router.delete('/', authenticateToken, keranjangController.clearCart);

module.exports = router;
