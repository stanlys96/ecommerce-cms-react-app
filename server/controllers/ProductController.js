const Product = require('../models/Product');

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.getProducts();
      res.status(200).json(products.rows);
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

  static async updateProduct(req, res, next) {
    try {
      const updateProduct = await Product.updateProduct(req.body);
      res.status(200).json(updateProduct.rows[0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const deleteProduct = await Product.deleteProduct(req.body);
      res.status(200).json(deleteProduct.rows[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;