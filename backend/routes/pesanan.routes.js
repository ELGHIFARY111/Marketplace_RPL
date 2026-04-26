const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  createPesanan, getMyPesanan, getPesananById,
  getAllPesanan, updateStatusPesanan, deletePesanan,
  konfirmasiBayar
} = require('../controllers/pesanan.controller');

// Customer
router.post('/',                          verifyToken, createPesanan);
router.get('/my',                         verifyToken, getMyPesanan);
router.get('/:id',                        verifyToken, getPesananById);
router.post('/:id/bayar', verifyToken, upload.single('bukti_transfer'), konfirmasiBayar);

// Admin
router.get('/',           verifyToken, isAdmin, getAllPesanan);
router.put('/:id/status', verifyToken, isAdmin, updateStatusPesanan);
router.delete('/:id',     verifyToken, isAdmin, deletePesanan);

module.exports = router;
