const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucher.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/', voucherController.getAllVouchers);
router.post('/validate', voucherController.validateVoucher);

// Protected routes
router.post('/', authenticateToken, voucherController.createVoucher);
router.get('/:id', authenticateToken, voucherController.getVoucherById);

module.exports = router;
