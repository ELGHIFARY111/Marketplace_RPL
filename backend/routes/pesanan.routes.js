const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesanan.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes
router.get('/', authenticateToken, pesananController.getUserOrders);
router.post('/', authenticateToken, pesananController.createOrder);
router.get('/:id', authenticateToken, pesananController.getOrderById);
router.put('/:id', authenticateToken, pesananController.updateOrderStatus);

module.exports = router;
