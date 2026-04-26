const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const {
  getAllUsers, getUserById, updateUser, deleteUser
} = require('../controllers/user.controller');

router.get('/',       verifyToken, isAdmin, getAllUsers);
router.get('/:id',    verifyToken, getUserById);
router.put('/:id',    verifyToken, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
