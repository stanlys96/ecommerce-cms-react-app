const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/getAll/:userId', CartController.getAllCart);
router.post('/updateCart/:method', CartController.updateCart);

module.exports = router;