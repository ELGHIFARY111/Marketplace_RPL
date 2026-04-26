const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { getAllVoucher, validateVoucher, createVoucher, updateVoucher, deleteVoucher } = require('../controllers/voucher.controller');

router.get('/',          verifyToken, isAdmin, getAllVoucher);
router.post('/validate', verifyToken, validateVoucher);
router.post('/',         verifyToken, isAdmin, createVoucher);
router.put('/:id',       verifyToken, isAdmin, updateVoucher);
router.delete('/:id',    verifyToken, isAdmin, deleteVoucher);

module.exports = router;
