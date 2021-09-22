const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const productRoutes = require('./products');
const bannerRoutes = require('./banners');
const cartRoutes = require('./cart');
const historyRoutes = require('./history');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/banners', bannerRoutes);
router.use('/cart', cartRoutes);
router.use('/history', historyRoutes);

module.exports = router;