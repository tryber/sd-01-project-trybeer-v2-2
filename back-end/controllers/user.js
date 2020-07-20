const express = require('express');
const rescue = require('../rescue');
const User = require('../models/user');
const verifyJWT = require('../middlewares/verifyJWT');
const generateJWT = require('../service/generateJWT');

const router = express.Router();

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User(name, email, password, role);

  return await user.createUser().then(() => {
    const token = generateJWT(email, role);
    res.status(201).json({ name, token, email, role });
  });
};

const getOneUser = async (req, res) => {
  const { email } = req.user;
  return res.status(200).json({ email });
};

const updateUser = async (req, res) => {
  const { email } = req.user;
  const user = new User(req.body.name, email, '', '');
  return user.updateNameUser().then(body => res.status(200).json(body));
};

router.post('/', rescue(createUser));

router.get('/', verifyJWT, rescue(getOneUser));

router.put('/', verifyJWT, rescue(updateUser));

module.exports = router;
