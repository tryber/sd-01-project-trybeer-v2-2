const express = require('express');
const rescue = require('../../rescue');

const ProductRepository = require('../../infrastructure/product/ProductRepository');

const router = express.Router();

const allProducts = (req, res) => {
  const { email } = req.user;
  return ProductRepository.getProducts(email).then(body =>
    res.status(201).json(body),
  );
};

const updateCart = async (req, res) => {
  const { email } = req.user;
  const { productName, quantity } = req.body;
  const update = await ProductRepository.updateCart(
    email,
    productName,
    quantity,
  );
  return res.status(200).json(update);
};

const checkout = async (req, res) => {
  const { email } = req.user;
  const { data } = await ProductRepository.getProductsInCart(email);
  return res.status(200).json(data);
};

const deleteProductCart = async (req, res) => {
  const { name } = req.params;
  const { email } = req.user;
  const deleteProduct = await ProductRepository.deleteProduct(name, email);
  res.status(200).json(deleteProduct);
};

router.get('/checkout', rescue(checkout));

router.get('/', rescue(allProducts));

router.post('/', rescue(updateCart));

router.delete('/:name', rescue(deleteProductCart));

module.exports = router;
