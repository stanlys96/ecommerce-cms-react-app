const pool = require('../database/db');

class TransactionHistory {
  static async getHistory(user_id) {
    try {
      user_id = parseInt(user_id);
      const history = await pool.query("SELECT * FROM transaction_history WHERE user_id = $1 ORDER BY transaction_id ASC;", [user_id]);
      return history;
    } catch (err) {
      console.log(err);
    }
  }

  static async addToHistory(cart) {
    let { date, image_url, name, quantity, totalPrice, user_id } = cart;
    try {
      quantity = parseInt(quantity);
      totalPrice = parseInt(totalPrice);
      user_id = parseInt(user_id);
      const newHistory = await pool.query("INSERT INTO transaction_history (date, image_url, name, quantity, totalPrice, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [date, image_url, name, quantity, totalPrice, user_id]);
      return newHistory;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TransactionHistory;