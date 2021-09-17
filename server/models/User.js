const pool = require('../database/db');
const { hashPassword } = require('../helpers/bcrypt');

class User {
  static async register(user) {
    try {
      let { first_name, last_name, email, password } = user;
      const findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (findUser.rowCount > 0) {
        return "email_exist";
      } else {
        password = hashPassword(password);
        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;", [first_name, last_name, email, password]);
        return newUser;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static async login(email) {
    const findUser = await pool.query("SELECT * FROM users WHERE email = $1;", [email]);
    return findUser;
  }

  static async getAllUsers() {
    const users = await pool.query("SELECT * FROM users");
    return users;
  }
}

module.exports = User;