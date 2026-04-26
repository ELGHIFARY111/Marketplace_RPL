const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { getAllKategori, createKategori, updateKategori, deleteKategori } = require('../controllers/kategori.controller');

router.get('/',       getAllKategori);
router.post('/',      verifyToken, isAdmin, createKategori);
router.put('/:id',    verifyToken, isAdmin, updateKategori);
router.delete('/:id', verifyToken, isAdmin, deleteKategori);

module.exports = router;
