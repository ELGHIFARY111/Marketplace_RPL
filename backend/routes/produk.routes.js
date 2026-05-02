
const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.get('/', produkController.getAllProducts);
router.get('/:id', produkController.getProductById);


router.post('/',  upload.array('images', 10), produkController.createProduct);
router.put('/:id',  upload.array('images', 10), produkController.updateProduct);
router.delete('/:id',  produkController.deleteProduct);

module.exports = router;