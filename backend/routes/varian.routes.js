const express = require('express');
const router = express.Router();
const varianController = require('../controllers/varian.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/', varianController.getAllVarians);
router.get('/:id', varianController.getVarianById);

router.post('/', authenticateToken, varianController.createVarian);
router.put('/:id', authenticateToken, varianController.updateVarian);
router.delete('/:id', authenticateToken, varianController.deleteVarian);

module.exports = router;
