const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/BannerController');

router.get('/getAll', BannerController.getAllBanners);
router.post('/addBanner', BannerController.addBanner);
router.put('/updateBanner', BannerController.updateBanner);
router.delete('/deleteBanner', BannerController.deleteBanner);

module.exports = router;