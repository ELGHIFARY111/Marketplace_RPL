const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes (require authentication)
router.get('/profile', authenticateToken, userController.getUserProfile);
router.put('/profile', authenticateToken, userController.updateUserProfile);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
