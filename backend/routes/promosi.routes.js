const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { getAllPromosi, createPromosi, updatePromosi, deletePromosi } = require('../controllers/promosi.controller');

router.get('/',       getAllPromosi);
router.post('/',      verifyToken, isAdmin, createPromosi);
router.put('/:id',    verifyToken, isAdmin, updatePromosi);
router.delete('/:id', verifyToken, isAdmin, deletePromosi);

module.exports = router;
