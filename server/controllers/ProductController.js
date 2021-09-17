const Product = require('../models/Product');

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = Product.getProducts();
      res.status(200).json(products);
    } catch(err) {
      next(err);
    }
  }
}

module.exports = ProductController;