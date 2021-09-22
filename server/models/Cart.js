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

  static async updateCart(cart, method) {
    try {
      let { user_id, product_id, quantity } = cart;
      const findExistingCart = await pool.query("SELECT C.*, P.stock FROM cart C INNER JOIN products P ON C.product_id = P.product_id WHERE user_id = $1 AND C.product_id = $2", [user_id, product_id]);
      console.log(findExistingCart.rows[0]);
      if (findExistingCart.rowCount == 0) {
        const newCart = await pool.query("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;", [user_id, product_id, quantity]);
        return { ...newCart.rows[0], message: 'Success' };
      } else {
        let currentCart = findExistingCart.rows[0];
        let queryData = {};
        if (method == "add") {
          if (currentCart.quantity + parseInt(quantity) > currentCart.stock) {
            return { message: "Total amount in cart can't exceed total stock!" };
          }
          queryData = await pool.query("UPDATE cart SET quantity = quantity + $3 WHERE user_id = $1 AND product_id = $2 RETURNING *;", [user_id, product_id, quantity]);
        } else if (method == "free") {
          if (quantity <= currentCart.stock) {
            queryData = await pool.query("UPDATE cart SET quantity = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *;", [user_id, product_id, quantity]);
          } else {
            return { message: "Total amount in cart can't exceed total stock!" };
          }
        }
        return { ...queryData.rows[0], message: 'Success' };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Cart;