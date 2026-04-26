const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getKeranjang, addToKeranjang, updateKeranjang, removeFromKeranjang } = require('../controllers/keranjang.controller');

router.get('/',       verifyToken, getKeranjang);
router.post('/',      verifyToken, addToKeranjang);
router.put('/:id',    verifyToken, updateKeranjang);
router.delete('/:id', verifyToken, removeFromKeranjang);

module.exports = router;
