const pool = require('../database/db');

class Banner {
  static async getBanners() {
    try {
      const banners = pool.query("SELECT * FROM banners ORDER BY id ASC;");
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
    let { id, image_url, name, status } = banner;
    try {
      const updateBanner = await pool.query("UPDATE banners SET image_url = $1, name = $2, status = $3 WHERE id = $4 RETURNING *;", [image_url, name, status, id]);
      return updateBanner;
    } catch (err) {
      console.log(err, "<<<");
    }
  }

  static async deleteBanner(banner) {
    let { id } = banner;
    try {
      const deleteBanner = await pool.query("DELETE FROM banners WHERE id = $1 RETURNING *;", [id]);
      return deleteBanner;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Banner;