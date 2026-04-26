const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { sendPesan, getMyPesan, getAllPesan, replyPesan } = require('../controllers/cs.controller');

router.post('/',         verifyToken, sendPesan);
router.get('/my',        verifyToken, getMyPesan);
router.get('/',          verifyToken, isAdmin, getAllPesan);
router.put('/:id/reply', verifyToken, isAdmin, replyPesan);

module.exports = router;
