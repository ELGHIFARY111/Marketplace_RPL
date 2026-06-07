const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middleware/admin.middleware');

router.get('/profile', verifyAdmin, adminController.getAdminProfile);
router.put('/profile', verifyAdmin, adminController.updateAdminProfile);
router.get('/dashboard-stats', verifyAdmin, adminController.getDashboardStats);
router.delete('/:id', verifyAdmin, adminController.deleteAdmin);

// User and Access Management routes
router.get('/users', verifyAdmin, adminController.getAllUsers);
router.get('/users/:id', verifyAdmin, adminController.getUserById);
router.post('/users', verifyAdmin, adminController.createUser);
router.put('/users/:id', verifyAdmin, adminController.updateUser);
router.delete('/users/:id', verifyAdmin, adminController.deleteUserAdmin);

module.exports = router;