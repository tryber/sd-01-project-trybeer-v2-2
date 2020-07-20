const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const verifyJWT = require('../middlewares/verifyJWT');
const { user, products, login, order } = require('./routes');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public', 'images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/login', login);
app.use('/products', verifyJWT, products);
app.use('/orders', verifyJWT, order);

module.exports = app;
