const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/', produkController.getAllProducts);
router.get('/:id', produkController.getProductById);

// Protected routes (require authentication)
router.post('/', authenticateToken, produkController.createProduct);
router.put('/:id', authenticateToken, produkController.updateProduct);
router.delete('/:id', authenticateToken, produkController.deleteProduct);

module.exports = router;
