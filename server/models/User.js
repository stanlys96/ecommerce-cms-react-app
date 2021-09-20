const pool = require('../database/db');
const { hashPassword } = require('../helpers/bcrypt');

class User {
  static async registerAsCustomer(user) {
    try {
      let { first_name, last_name, email, password } = user;
      const findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (findUser.rowCount > 0) {
        return "email_exist";
      } else {
        password = hashPassword(password);
        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [first_name, last_name, email, password, "customer"]);
        return newUser;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static async registerAsAdmin(user) {
    try {
      let { first_name, last_name, email, password } = user;
      const findUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (findUser.rowCount > 0) {
        return "email_exist";
      } else {
        password = hashPassword(password);
        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [first_name, last_name, email, password, "admin"]);
        return newUser;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static async login(email) {
    try {
      const findUser = await pool.query("SELECT * FROM users WHERE email = $1;", [email]);
      return findUser;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllUsers() {
    try {
      const users = await pool.query("SELECT * FROM users;");
      return users;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = User;