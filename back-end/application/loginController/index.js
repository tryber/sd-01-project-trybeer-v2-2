const express = require('express');
const rescue = require('../../rescue');
const generateJWT = require('../../service/generateJWT');
const UserRepository = require('../../infrastructure/user/UserRepository');



const router = express.Router();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(422).json({ message: 'Campos vazios!' });

  const users = new UserRepository()

  const user = await users.login(email, password);

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const token = generateJWT(email, user.admin);

  res.status(200).json({ name: user.name, token, email, role: user.admin });
};

router.post('/', rescue(loginUser));

module.exports = router;
