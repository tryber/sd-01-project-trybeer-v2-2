const express = require('express');
const rescue = require('../rescue');
const Products = require('../models/products');

const router = express.Router();

const allProducts = (req, res) => {
  const { email } = req.user;
  return Products.getAllProducts(email).then(body => res.status(201).json(body));
};

const updateCart = async (req, res) => {
  const { email } = req.user;
  const { productName, quantity } = req.body;
  const update = await Products.updateCart(email, productName, quantity);
  return res.status(200).json(update);
};

const checkout = async (req, res) => {
  const { email } = req.user;
  const productsCheckout = await Products.getCart(email);
  return res.status(200).json(productsCheckout);
};

const deleteProductCart = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const deleteProduct = await Products.deleteProduct(id, email);
  res.status(200).json(deleteProduct);
};

router.get('/checkout', rescue(checkout));

router.get('/', rescue(allProducts));

router.post('/', rescue(updateCart));

router.delete('/:id', rescue(deleteProductCart));

module.exports = router;
