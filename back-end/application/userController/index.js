const express = require('express');
const rescue = require('../../rescue');
const UserRepository  = require('../../infrastructure/user/UserRepository');
const verifyJWT = require('../../middlewares/verifyJWT');
const generateJWT = require('../../service/generateJWT');

const router = express.Router();

const postCreateUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  
  const user = new UserRepository(name, email, role, password);

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
  const user = new UserRepository (req.body.name, email, '', '');
  return user.updateNameUser().then(body => res.status(200).json(body));
};

router.post('/', rescue(postCreateUser));

router.get('/', verifyJWT, rescue(getOneUser));

router.put('/', verifyJWT, rescue(updateUser));

module.exports = router;
