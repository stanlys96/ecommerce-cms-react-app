const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const productRoutes = require('./products');
const bannerRoutes = require('./banners');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/banners', bannerRoutes);

module.exports = router;