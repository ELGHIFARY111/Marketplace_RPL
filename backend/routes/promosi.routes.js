const express = require('express');
const router = express.Router();
const promiController = require('../controllers/promosi.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/', promiController.getAllPromos);
router.get('/:id', promiController.getPromoById);

// Protected routes
router.post('/', authenticateToken, promiController.createPromo);
router.put('/:id', authenticateToken, promiController.updatePromo);

module.exports = router;
