const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_PASSWORD);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_PASSWORD);
}

module.exports = {
  generateToken,
  verifyToken,
}