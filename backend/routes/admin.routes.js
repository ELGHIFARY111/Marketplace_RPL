const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middleware/admin.middleware');

router.get('/profile', verifyAdmin, adminController.getAdminProfile);
router.put('/profile', verifyAdmin, adminController.updateAdminProfile);
router.delete('/:id', verifyAdmin, adminController.deleteAdmin);

module.exports = router;