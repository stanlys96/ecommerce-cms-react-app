const pool = require('../database/db');

class Cart {
  static async getCart(user_id) {
    try {
      const cart = await pool.query("SELECT P.*, C.quantity FROM products P INNER JOIN cart C ON C.product_id = P.product_id INNER JOIN users U ON U.user_id = C.user_id WHERE C.user_id = $1", [user_id]);
      return cart.rows;
    } catch (err) {
      console.log(err);
    }
  }

  static async addCart(cart) {
    try {
      let { user_id, product_id, quantity } = cart;
      const findExistingCart = await pool.query("SELECT * FROM cart WHERE user_id = $1 AND product_id = $2", [user_id, product_id]);
      if (findExistingCart.rowCount == 0) {
        const newCart = await pool.query("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;", [user_id, product_id, quantity]);
        return { ...newCart.rows[0], message: 'Success' };
      } else {
        const addToExistingCart = await pool.query("UPDATE cart SET quantity = quantity + $3 WHERE user_id = $1 AND product_id = $2 RETURNING *;", [user_id, product_id, quantity]);
        return { ...addToExistingCart.rows[0], message: 'Success' };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Cart;