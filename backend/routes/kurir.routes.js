const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { getAllKurir, createKurir, updateKurir, deleteKurir } = require('../controllers/kurir.controller');

router.get('/',       getAllKurir);
router.post('/',      verifyToken, isAdmin, createKurir);
router.put('/:id',    verifyToken, isAdmin, updateKurir);
router.delete('/:id', verifyToken, isAdmin, deleteKurir);

module.exports = router;
