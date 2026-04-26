const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategori.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public routes
router.get('/', kategoriController.getAllCategories);
router.get('/:id', kategoriController.getCategoryById);

// Protected routes
router.post('/', authenticateToken, kategoriController.createCategory);
router.put('/:id', authenticateToken, kategoriController.updateCategory);
router.delete('/:id', authenticateToken, kategoriController.deleteCategory);

module.exports = router;
