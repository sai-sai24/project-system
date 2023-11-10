const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct, getAdminProducts} = require('../controllers/productController');


router.get('/products',  getProducts)
router.get('/product/:id', getSingleProduct);

module.exports = router;