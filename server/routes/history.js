const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/TransactionHistoryController');

router.get('/getAll/:user_id', HistoryController.getHistory);
router.post('/addToHistory', HistoryController.addToHistory);

module.exports = router;