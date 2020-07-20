const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function verifyJWT(req, res, next) {
  const secret = 'trybeer';
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const { email } = payload;
    const verifyUser = await User.validateEmail(email);
    if (!verifyUser) return res.status(401).json({ message: 'Token inválido!' });
    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = verifyJWT;
