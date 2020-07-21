const express = require('express');
const rescue = require('../rescue');
const userLogin = require('../models/login');
const generateJWT = require('../service/generateJWT');

const router = express.Router();

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) return res.status(422).json({ message: 'Campos vazios!' });
  const user = await userLogin(email, password);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const token = generateJWT(email, user.admin);
  res.status(200).json({ name: user.name, token, email, role: user.admin });
};

router.post('/', rescue(login));

module.exports = router;
