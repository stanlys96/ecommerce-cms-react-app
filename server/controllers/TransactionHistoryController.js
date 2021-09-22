const TransactionHistory = require('../models/TransactionHistory');

class HistoryController {
  static async getHistory(req, res, next) {
    try {
      const user_id = req.params.userIId;
      const history = await TransactionHistory.getHistory(user_id);
      res.status(200).json(history.rows);
    } catch (err) {
      next(err);
    }
  }

  static async addToHistory(req, res, next) {
    try {
      const newHistory = await TransactionHistory.addToHistory(req.body);
      res.status(200).json(newHistory);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HistoryController;