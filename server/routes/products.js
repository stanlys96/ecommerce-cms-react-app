const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/getAll', ProductController.getAllProducts);
router.post('/addProduct', ProductController.addProduct);
router.put('/updateProduct', ProductController.updateProduct);

module.exports = router;