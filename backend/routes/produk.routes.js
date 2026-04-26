const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  getAllProduk, getProdukById, createProduk, updateProduk, deleteProduk,
  addFoto, deleteFoto,
  getVarianByProduk, addVarian, updateVarian, deleteVarian
} = require('../controllers/produk.controller');

// Produk
router.get('/',          getAllProduk);
router.get('/:id',       getProdukById);
router.post('/',         verifyToken, isAdmin, createProduk);
router.put('/:id',       verifyToken, isAdmin, updateProduk);
router.delete('/:id',    verifyToken, isAdmin, deleteProduk);

// Foto
router.post('/:id/foto',         verifyToken, isAdmin, upload.array('foto', 10), addFoto);
router.delete('/foto/:id_foto',  verifyToken, isAdmin, deleteFoto);

// Varian
router.get('/:id/varian',        getVarianByProduk);
router.post('/:id/varian',       verifyToken, isAdmin, addVarian);
router.put('/varian/:id_varian', verifyToken, isAdmin, updateVarian);
router.delete('/varian/:id_varian', verifyToken, isAdmin, deleteVarian);

module.exports = router;
