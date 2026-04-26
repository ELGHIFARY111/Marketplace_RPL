const express = require('express');
const router = express.Router();
const ulasanController = require('../controllers/ulasan.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/', ulasanController.getAllReviews);
router.get('/product/:productId', ulasanController.getProductReviews);

// Protected routes
router.post('/', authenticateToken, ulasanController.createReview);
router.put('/:id', authenticateToken, ulasanController.updateReview);
router.delete('/:id', authenticateToken, ulasanController.deleteReview);

module.exports = router;
