const Banner = require('../models/Banner');

class BannerController {
  static async getAllBanners(req, res, next) {
    try {
      const banners = await Banner.getBanners();
      res.status(200).json(banners.rows);
    } catch (err) {
      next(err);
    }
  }

  static async addBanner(req, res, next) {
    try {
      const newBanner = await Banner.addBanner(req.body);
      res.status(200).json(newBanner.rows[0]);
    } catch (err) {
      next(err);
    }
  }

  static async updateBanner(req, res, next) {
    try {
      const updateBanner = await Banner.updateBanner(req.body);
      res.status(200).json(updateBanner.rows[0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const deleteBanner = await Banner.deleteBanner(req.body);
      res.status(200).json(deleteBanner.rows[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BannerController;