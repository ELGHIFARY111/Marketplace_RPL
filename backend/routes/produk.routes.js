const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const upload = require('../middleware/upload.middleware');


router.get('/', produkController.getAllProducts);
router.get('/:id', produkController.getProductById);
router.get('/:id/varian', produkController.getVarianByProductId);


router.post('/', authenticateToken, upload.array('images', 10), produkController.createProduct);
router.put('/:id', authenticateToken, upload.array('images', 10), produkController.updateProduct);
router.delete('/:id', authenticateToken, produkController.deleteProduct);

module.exports = router;