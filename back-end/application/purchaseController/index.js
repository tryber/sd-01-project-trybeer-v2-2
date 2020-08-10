const express = require('express');
const rescue = require('../../rescue');
const PurchaseRepository = require('../../infrastructure/purchase/PurchaseRepository');
const ProductRepository = require('../../infrastructure/product/ProductRepository');

const router = express.Router();

const createOrder = async (req, res) => {
  const { email } = req.user;
  const cartId = await ProductRepository.getCartId(email);
  const { street, number, price, purchaseDate, status = 'Pendente' } = req.body;
  const obj = { street, number, cartId, price, purchaseDate, status };
  return PurchaseRepository.create(obj).then(response =>
    res.status(201).json(response),
  );
};

const allOrders = async (_req, res) =>
  PurchaseRepository.getAll().then(body => res.status(200).json(body));

const userOrders = async (req, res) => {
  const { email } = req.user;
  return PurchaseRepository.getUserOrders(email).then(response =>
    res.status(200).json(response),
  );
};

const orderDetails = async (req, res) => {
  const { email } = req.user;
  const orderId = req.params.id;
  const order = await PurchaseRepository.getDetails(orderId);
  const cartProducts = await ProductRepository.getProductsInCart(
    email,
    order.cart_id,
  );
  return res.status(200).json({ ...order, products: cartProducts.data });
};

const updateOrderState = async (req, res) => {
  const { status } = req.body;
  console.log('status', status);
  const orderId = req.params.id;
  return PurchaseRepository.updateState(orderId, status).then(response =>
    res.status(200).json(response),
  );
};

router.post('/', rescue(createOrder));
router.get('/', rescue(allOrders));
router.get('/user', rescue(userOrders));
router.get('/:id', rescue(orderDetails));
router.put('/:id', rescue(updateOrderState));

module.exports = router;
