const pool = require('../database/db');

class Product {
  static async getProducts() {
    try {
      const products = pool.query("SELECT * FROM products;");
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  static async addProduct(product) {
    let { imageUrl, name, category, price, stock } = product;
    try {
      const newProduct = await pool.query("INSERT INTO products (image_url, name, category, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [imageUrl, name, category, price, stock]);
      return newProduct;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;