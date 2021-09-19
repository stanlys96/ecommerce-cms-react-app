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

  static async updateProduct(product) {
    let { id, imageUrl, name, category, price, stock } = product;
    try {
      const updateProduct = await pool.query("UPDATE products SET image_url = $1, name = $2, category = $3, price, $4, stock = $5 WHERE id = $6 RETURNING *;", [imageUrl, name, category, price, stock, id]);
      return updateProduct;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProduct(product) {
    let { id } = product;
    try {
      const deleteProduct = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *;", [id]);
      return deleteProduct;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;