const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/getAll/:userId', CartController.getAllCart);
router.post('/addToCart', CartController.addToCart);

module.exports = router;