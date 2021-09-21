const Cart = require('../models/Cart');

class CartController {
  static async getAllCart(req, res, next) {
    const userId = req.params.userId;
    try {
      const getCart = await Cart.getCart(userId);
      res.status(200).json(getCart);
    } catch (err) {
      next(err);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const addToCart = await Cart.addCart(req.body);
      res.status(200).json(addToCart);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;