const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
