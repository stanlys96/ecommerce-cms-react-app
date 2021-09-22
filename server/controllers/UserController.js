const User = require('../models/User');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static async registerAsCustomer(req, res, next) {
    try {
      const newUser = await User.registerAsCustomer(req.body);
      if (newUser == "email_exist") {
        res.status(404).json({ message: "Email already registered!" });
      } else {
        res.status(200).json({ ...newUser.rows[0], message: "Success" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async registerAsAdmin(req, res, next) {
    try {
      const newUser = await User.registerAsAdmin(req.body);
      if (newUser == "email_exist") {
        res.status(404).json({ message: "Email already registered!" });
      } else {
        res.status(200).json({ ...newUser.rows[0], message: "Success" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const findUser = await User.login(email);
      if (findUser.rowCount > 0) {
        const loggedInUser = findUser.rows[0];
        const comparedPassword = comparePassword(password, loggedInUser.password);
        if (comparedPassword) {
          const token = generateToken({
            user_id: loggedInUser.user_id,
            first_name: loggedInUser.first_name,
            last_name: loggedInUser.last_name,
            email: loggedInUser.email
          });
          res.status(200).json({
            user_id: loggedInUser.user_id,
            first_name: loggedInUser.first_name,
            last_name: loggedInUser.last_name,
            email: loggedInUser.email,
            token,
            message: "Success"
          });
        } else {
          res.status(404).json({ message: "Email or password is incorrect!" });
        }
      } else {
        res.status(404).json({ message: "Email or password is incorrect!" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;