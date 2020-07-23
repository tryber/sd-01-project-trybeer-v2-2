const express = require('express');
const rescue = require('../../rescue');
const UserRepository = require('../../infrastructure/user/UserRepository');
const verifyJWT = require('../../middlewares/verifyJWT');
const generateJWT = require('../../service/generateJWT');

const router = express.Router();

const postCreateUser = (req, res) => {
  const { name, email, role, password } = req.body;
  const value = { name, email, role, password };
  return UserRepository.createUser(value).then(() => {
    const token = generateJWT(email, role);
    res.status(201).json({ token });
  });
};

const getOneUser = (req, res) => {
  const { email } = req.user;
  return res.status(200).json({ email });
};

const updateUser = (req, res) => {
  const { email } = req.user;
  const { name } = req.body;
  return UserRepository.updateNameUser(name, email).then((body) =>
    res.status(200).json(body)
  );
};

router.post('/', rescue(postCreateUser));

router.get('/', verifyJWT, rescue(getOneUser));

router.put('/', verifyJWT, rescue(updateUser));

module.exports = router;
