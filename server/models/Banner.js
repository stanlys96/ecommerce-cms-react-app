const pool = require('../database/db');

class Banner {
  static async getBanners() {
    try {
      const banners = await pool.query("SELECT * FROM banners ORDER BY banner_id ASC;");
      return banners;
    } catch (err) {
      console.log(err);
    }
  }

  static async addBanner(banner) {
    let { image_url, name, status } = banner;
    try {
      const newBanner = await pool.query("INSERT INTO banners (image_url, name, status) VALUES ($1, $2, $3) RETURNING *;", [image_url, name, status]);
      return newBanner;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateBanner(banner) {
    let { banner_id, image_url, name, status } = banner;
    try {
      const updateBanner = await pool.query("UPDATE banners SET image_url = $1, name = $2, status = $3 WHERE banner_id = $4 RETURNING *;", [image_url, name, status, banner_id]);
      return updateBanner;
    } catch (err) {
      console.log(err, "<<<");
    }
  }

  static async deleteBanner(banner) {
    let { banner_id } = banner;
    try {
      const deleteBanner = await pool.query("DELETE FROM banners WHERE banner_id = $1 RETURNING *;", [banner_id]);
      return deleteBanner;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Banner;