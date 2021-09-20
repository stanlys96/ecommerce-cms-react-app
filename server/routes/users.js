const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/registerAsAdmin', UserController.registerAsAdmin);
router.post('/registerAsCustomer', UserController.registerAsCustomer);
router.post('/login', UserController.login);
router.get('/getAll', UserController.getAllUsers);

module.exports = router;