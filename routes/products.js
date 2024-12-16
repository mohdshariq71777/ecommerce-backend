const express = require('express');
const router = express.Router();
const productController=require('../controllers/products')

router.get('/get-main-categories',productController.getMainCategories);
router.get('/get-type-categories',productController.getTypeCategories);
router.get('/get-categories',productController.getCategories);
router.get('/get-products',productController.getProducts);

module.exports = router;