const pool = require('../database/db');

class Product {
  static async getProducts() {
    try {
      const products = pool.query("SELECT * FROM products;");
      return products;
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = Product;