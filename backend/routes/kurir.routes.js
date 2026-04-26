const express = require('express');
const router = express.Router();
const kurirController = require('../controllers/kurir.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/', kurirController.getAllShippers);
router.post('/cost', kurirController.getShippingCost);
router.get('/track/:trackingNumber', kurirController.trackShipment);

module.exports = router;
