const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { addUlasan, getUlasanByProduk } = require('../controllers/ulasan.controller');

router.get('/produk/:id_produk', getUlasanByProduk);
router.post('/',                 verifyToken, addUlasan);

module.exports = router;
