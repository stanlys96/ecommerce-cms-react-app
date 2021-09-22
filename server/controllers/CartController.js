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

  static async updateCart(req, res, next) {
    try {
      const updateCart = await Cart.updateCart(req.body, req.params.method);
      res.status(200).json(updateCart);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;