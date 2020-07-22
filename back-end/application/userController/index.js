const express = require('express');
const rescue = require('../../rescue');
const UserRepository = require('../../infrastructure/user/UserRepository');
const verifyJWT = require('../../middlewares/verifyJWT');
const generateJWT = require('../../service/generateJWT');

const router = express.Router();

const postCreateUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  const value = { name, email, role, password };
  const user = new UserRepository();
  return await user.createUser(value).then(() => {
    const token = generateJWT(email, role);
    res.status(201).json({ token });
  });
};

const getOneUser = async (req, res) => {
  const { email } = req.user;
  return res.status(200).json({ email });
};

const updateUser = async (req, res) => {
  const { email } = req.user;
  const { name } = req.body,
  const newUser = new UserRepository();
  return newUser.updateNameUser(name, email).then((body) => res.status(200).json(body));
};

router.post('/', rescue(postCreateUser));

router.get('/', verifyJWT, rescue(getOneUser));

router.put('/', verifyJWT, rescue(updateUser));

module.exports = router;
