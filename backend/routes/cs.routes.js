const express = require('express');
const router = express.Router();
const csController = require('../controllers/cs.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes
router.get('/all', authenticateToken, csController.getAllMessages);
router.get('/:id', authenticateToken, csController.getMessageById);
router.get('/', authenticateToken, csController.getUserMessages);
router.post('/', authenticateToken, csController.createMessage);
router.post('/:id/reply', authenticateToken, csController.replyMessage);

module.exports = router;
