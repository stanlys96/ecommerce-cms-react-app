const pool = require('../database/db');

class Product {
  static async getProducts() {
    try {
      const products = await pool.query("SELECT * FROM products ORDER BY product_id ASC;");
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  static async addProduct(product) {
    let { image_url, name, category, price, stock } = product;
    try {
      const newProduct = await pool.query("INSERT INTO products (image_url, name, category, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [image_url, name, category, price, stock]);
      return newProduct;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateProduct(product) {
    let { id, image_url, name, category, price, stock } = product;
    price = parseInt(price);
    stock = parseInt(stock);
    try {
      const updateProduct = await pool.query("UPDATE products SET image_url = $1, name = $2, category = $3, price = $4, stock = $5 WHERE product_id = $6 RETURNING *;", [image_url, name, category, price, stock, id]);
      return updateProduct;
    } catch (err) {
      console.log(err, "<<<");
    }
  }

  static async deleteProduct(product) {
    let { id } = product;
    try {
      const deleteProduct = await pool.query("DELETE FROM products WHERE product_id = $1 RETURNING *;", [id]);
      return deleteProduct;
    } catch (err) {
      console.log(err);
    }
  }

  static async reduceStock(product) {
    let { product_id, quantity } = product;
    try {
      const reduceStock = await pool.query("UPDATE products SET stock = stock - $1 WHERE product_id = $2 RETURNING *;", [quantity, product_id]);
      return reduceStock;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;