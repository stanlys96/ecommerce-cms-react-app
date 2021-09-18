const Product = require('../models/Product');

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.getProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const newProduct = await Product.addProduct(req.body);
      res.status(200).json(newProduct.rows[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;